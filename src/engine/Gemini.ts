import {
  Content,
  FunctionCallingMode,
  FunctionDeclaration,
  GenerationConfig,
  GoogleGenerativeAI,
  SchemaType,
} from '@google/generative-ai';
import { Agent, Mood, FacialExpression, BodyLanguageExpression, ScenarioType, SCENARIOS } from '../types';

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
              description: 'Unique identifier for the agent, must match the ID from the conversation history',
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
              description: 'What the agent is currently saying, leave empty if silent',
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
          required: ['id', 'mood', 'thinking_about', 'face_expression', 'body_language'],
        },
      },
    },
    required: ['goal', 'agents'],
  },
};

type GeminiAgent = {
  id: string;
  mood: string;
  thinking_about: string;
  saying: string;
  face_expression: string;
  body_language: string;
};

const getSystemPrompt = (scenarioType: ScenarioType): string => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  if (!scenario) {
    throw new Error(`Invalid scenario type: ${scenarioType}`);
  }

  return `You are responsible for maintaining state of AI agents which represent humans.
Each human can have the following properties:
- mood (${Object.values(Mood).join(', ')})
- thinking about something (string)
- saying something (string), leave empty if character should be silent
- face expression (${Object.values(FacialExpression).join(', ')})
- body language (${Object.values(BodyLanguageExpression).join(', ')})
- unique id (string, the same value as provided in the conversation history)

You need to maintain the state of ai agents. The agents are reacting to user messages. User is speaking to them.
Agents are supposed to react to those speeches. After each user message, update the state of agents, provide updates for agents which actually changed their state, skip unchanged agents.

${scenario.instruction}`;
};

const formatAgentForHistory = (agent: Agent): GeminiAgent => ({
  id: agent.id,
  mood: agent.mood,
  thinking_about: agent.thinkingState,
  saying: agent.spokenText,
  face_expression: agent.facialExpression,
  body_language: agent.bodyLanguageExpression,
});

export type GeminiHistory = Content[];

export const getResponse = async (
  history: GeminiHistory,
  userInput: string,
  scenarioType: ScenarioType,
  currentAgents: Agent[],
): Promise<{ agents: Agent[]; goal: number }> => {
  try {
    // If there are current agents, add their state to the history
    if (currentAgents?.length && history.length === 0) {
      const agentsState = currentAgents.map(formatAgentForHistory);
      history.push({
        role: 'user',
        parts: [{ text: `Current agents state: \n\n\`\`\`json\n${JSON.stringify(agentsState, null, 2)}\n\`\`\`` }],
      });
    }

    const chat = model.startChat({
      generationConfig,
      systemInstruction: {
        role: 'system',
        parts: [{ text: getSystemPrompt(scenarioType) }],
      },
      history,
      tools: [{ functionDeclarations: [functionSchema] }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingMode.ANY,
          allowedFunctionNames: ['updateAgentsState'],
        },
      },
    });

    const result = await chat.sendMessage(userInput);

    const response = result.response;
    const functionCall = response.functionCalls()?.[0];

    if (!functionCall || functionCall.name !== 'updateAgentsState' || !functionCall.args) {
      throw new Error('Invalid or missing function call in response');
    }

    const functionArgs = functionCall.args as { goal: number; agents: GeminiAgent[] };

    const updatedAgentsMap = new Map(functionArgs.agents?.map((agent) => [agent.id, agent]));

    return {
      agents: currentAgents.map((currentAgent) => {
        const geminiAgent = updatedAgentsMap.get(currentAgent.id);
        if (!geminiAgent) {
          return currentAgent;
        }

        return {
          ...currentAgent,
          mood: geminiAgent.mood as Mood,
          facialExpression: geminiAgent.face_expression as FacialExpression,
          bodyLanguageExpression: geminiAgent.body_language as BodyLanguageExpression,
          thinkingState: geminiAgent.thinking_about === '...' ? '' : geminiAgent.thinking_about,
          spokenText: geminiAgent.saying === '...' ? '' : geminiAgent.saying,
        };
      }),
      goal: functionArgs.goal,
    };
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw error;
  }
};