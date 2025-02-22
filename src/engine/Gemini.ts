import {
  FunctionCallingMode,
  FunctionDeclaration,
  GenerationConfig,
  GoogleGenerativeAI,
  SchemaType,
} from '@google/generative-ai';
import { Agent, Mood, FacialExpression, BodyLanguageExpression } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

// Define the function schema for handling agent state updates
const functionSchema: FunctionDeclaration = {
  name: 'updateAgentsState',
  description: 'Update the state of agents based on user input',
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      goal: {
        type: SchemaType.NUMBER,
        description: 'Percentage representing the goal achievement (e.g., % of warriors encouraged to fight)',
      },
      agents: {
        type: SchemaType.ARRAY,
        description: 'Array of agents with updated states',
        items: {
          type: SchemaType.OBJECT,
          properties: {
            id: {
              type: SchemaType.STRING,
              description: 'Unique identifier for the agent',
            },
            mood: {
              type: SchemaType.STRING,
              enum: Object.values(Mood),
              description: 'Current mood of the agent',
            },
            thinking_about: {
              type: SchemaType.STRING,
              description: 'Current thoughts of the agent',
            },
            saying: {
              type: SchemaType.STRING,
              description: 'What the agent is currently saying',
            },
            face_expression: {
              type: SchemaType.STRING,
              enum: Object.values(FacialExpression),
              description: 'Current facial expression of the agent',
            },
            body_language: {
              type: SchemaType.STRING,
              enum: Object.values(BodyLanguageExpression),
              description: 'Current body language of the agent',
            },
          },
          required: ['id', 'mood', 'thinking_about', 'saying', 'face_expression', 'body_language'],
        },
      },
    },
    required: ['goal', 'agents'],
  },
};

const systemPrompt = `You are responsible for maintaining state of AI agents which represent humans.
Each human can have the following properties:
- mood (${Object.values(Mood).join(', ')})
- thinking about something (string)
- saying something (string)
- face expression (${Object.values(FacialExpression).join(', ')})
- body language (${Object.values(BodyLanguageExpression).join(', ')})
- unique id (string)

You need to maintain 50 ai agents. The agents are reacting to user messages. User is speaking to them.
Agents are supposed to react to those speeches. After each user message, update the state of agents.

You are a commander preparing people for battle, you must encourage them to fight!

The response should contain:
1. A score representing the goal: % of warriors who decide to fight
2. Updated states for agents that have changed

Additional difficulty: warriors are demotivated at the beginning, and afraid`;

type GeminiAgent = {
  id: string;
  mood: string;
  thinking_about: string;
  saying: string;
  face_expression: string;
  body_language: string;
};

const mapGeminiResponseToAgent = (geminiAgent: GeminiAgent): Agent => {
  return {
    id: geminiAgent.id,
    x: Math.random() * 800 + 100, // Random x position between 100 and 900
    y: Math.random() * 400 + 50, // Random y position between 50 and 450
    mood: geminiAgent.mood as Mood,
    facialExpression: geminiAgent.face_expression as FacialExpression,
    bodyLanguageExpression: geminiAgent.body_language as BodyLanguageExpression,
    thinkingState: geminiAgent.thinking_about,
    spokenText: geminiAgent.saying,
  };
};

export const getResponse = async (userInput: string): Promise<{ agents: Agent[]; goal: number }> => {
  try {
    const chat = model.startChat({
      generationConfig,
      systemInstruction: {
        role: 'system',
        parts: [{ text: systemPrompt }],
      },
      tools: [{ functionDeclarations: [functionSchema] }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingMode.ANY,
          allowedFunctionNames: ['updateAgentsState'],
        },
      },
      history: [],
    });

    // Add the system prompt and function schema
    await chat.sendMessage(systemPrompt);

    // Send user input and expect a function call
    const result = await chat.sendMessage(userInput);

    const response = result.response;
    const functionCall = response.functionCalls()?.[0];

    if (!functionCall || functionCall.name !== 'updateAgentsState' || !functionCall.args) {
      throw new Error('Invalid or missing function call in response');
    }

    const functionArgs = functionCall.args as { goal: number; agents: GeminiAgent[] };
    const agents = functionArgs.agents.map(mapGeminiResponseToAgent);

    return {
      agents,
      goal: functionArgs.goal,
    };
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw error;
  }
};
