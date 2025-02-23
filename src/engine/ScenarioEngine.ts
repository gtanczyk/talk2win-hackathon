import { Agent, ScenarioType, Mood, FacialExpression, BodyLanguageExpression, ScenarioProgress, GameState, Message } from '../types';

// Define scenario configuration type
interface ScenarioConfig {
  type: ScenarioType;
  timeLimit: number;
}

const SPEECH_DURATION = 5000; // Duration in milliseconds for speech to remain visible
const THOUGHT_DURATION = 6000; // Duration in milliseconds for thoughts to remain visible
const MAX_MESSAGES = 50; // Maximum number of messages to store in history

export class ScenarioEngine {
  private agents: Agent[] = [];
  private scenarioType: ScenarioType;
  private updateInterval: NodeJS.Timeout | null = null;
  private lastUpdateTime: number = 0;
  private currentProgress: number = 0;
  private highScore: number = 0;
  private gameState: GameState = GameState.INTRO;
  private timeLeft: number = 0;
  private conversationHistory: Message[] = [];
  
  // Define SCENARIOS as a private static readonly array
  private static readonly SCENARIOS: ScenarioConfig[] = [
    {
      type: ScenarioType.WARRIORS_TO_BATTLE,
      timeLimit: 300,
    },
    {
      type: ScenarioType.ANNOUNCE_LAYOFFS,
      timeLimit: 240,
    },
    {
      type: ScenarioType.POLITICAL_RALLY,
      timeLimit: 180,
    },
  ];

  constructor(scenarioType: ScenarioType) {
    this.scenarioType = scenarioType;
    this.initializeAgents();
    
    // Initialize time limit based on scenario
    const scenario = ScenarioEngine.SCENARIOS.find(s => s.type === scenarioType);
    if (scenario) {
      this.timeLeft = scenario.timeLimit;
    }
    this.startPeriodicUpdates();
  }

  private initializeAgents() {
    // Initialize different number of agents based on scenario type
    const count = this.getInitialAgentCount();

    for (let i = 0; i < count; i++) {
      this.agents.push(this.createAgent(i));
    }

    // Center agents horizontally
    const minX = Math.min(...this.agents.map((agent) => agent.x));
    const maxX = Math.max(...this.agents.map((agent) => agent.x));
    const minY = Math.min(...this.agents.map((agent) => agent.y));
    const maxY = Math.max(...this.agents.map((agent) => agent.y));
    const offsetX = (maxX - minX) / 2;
    const offsetY = (maxY - minY) / 2;

    this.agents.forEach((agent) => {
      agent.x = agent.x - minX - offsetX;
      agent.y = agent.y - minY - offsetY;
    });
  }

  private startPeriodicUpdates() {
    // Update only when in PLAYING state
    if (this.gameState === GameState.PLAYING) {
      // Update every 2 seconds
      this.updateInterval = setInterval(() => {
        this.update();
      }, 2000);
    }
  }

  public cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private checkDefeatCondition(): void {
    if (this.timeLeft <= 0 && this.gameState === GameState.PLAYING) {
      this.setGameState(GameState.DEFEAT);
      // Stop periodic updates
      this.cleanup();
    }
  }

  private getInitialAgentCount(): number {
    switch (this.scenarioType) {
      case ScenarioType.WARRIORS_TO_BATTLE:
        return 10;
      case ScenarioType.ANNOUNCE_LAYOFFS:
        return 15;
      case ScenarioType.POLITICAL_RALLY:
        return 20;
      default:
        return 5;
    }
  }

  private createAgent(index: number): Agent {
    // Calculate position in a grid-like pattern
    const row = Math.floor(index / 5);
    const col = index % 5;
    const currentTime = Date.now();
    const x = (col + Math.random() - Math.random()) * 110;
    const y = (row + Math.random() - Math.random()) * 50;

    return {
      id: `agent-${index}`,
      x,
      y,
      mood: Mood.NEUTRAL,
      facialExpression: FacialExpression.NEUTRAL,
      bodyLanguageExpression: BodyLanguageExpression.STANDING,
      thinkingState: '',
      spokenText: '',
      lastSpokenTime: currentTime,
      lastThoughtTime: currentTime,
    };
  }

  public getAgents(): Agent[] {
    return [...this.agents];
  }

  public getProgress(): ScenarioProgress {
    return {
      currentProgress: this.currentProgress,
      highScore: this.highScore,
      lastUpdateTime: this.lastUpdateTime,
    };
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public getTimeLeft(): number {
    return this.timeLeft;
  }

  public setGameState(newState: GameState) {
    const oldState = this.gameState;
    this.gameState = newState;

    // Handle state transitions
    if (oldState !== newState) {
      if (newState === GameState.PLAYING) {
        // Start periodic updates when entering PLAYING state
        this.startPeriodicUpdates();
      } else if (newState === GameState.DEFEAT) {
        this.cleanup(); // Ensure cleanup on defeat
      } else {
        // Clean up interval when leaving PLAYING state
        this.cleanup();
      }
    }

    // Reset progress and conversation history when starting a new game
    if (newState === GameState.INTRO) {
      this.currentProgress = 0;
      this.conversationHistory = [];
      this.timeLeft = ScenarioEngine.SCENARIOS.find(s => s.type === this.scenarioType)?.timeLimit || 0;
    }
  }

  private checkVictoryCondition() {
    if (this.currentProgress >= 100 && this.gameState === GameState.PLAYING) {
      this.setGameState(GameState.VICTORY);
    }
  }

  private clearExpiredText(): void {
    const currentTime = Date.now();

    this.agents.forEach((agent) => {
      // Clear speech if it has expired
      if (agent.spokenText && currentTime - agent.lastSpokenTime > SPEECH_DURATION) {
        agent.spokenText = '';
      }

      // Clear thoughts if they have expired
      if (agent.thinkingState && currentTime - agent.lastThoughtTime > THOUGHT_DURATION) {
        agent.thinkingState = '';
      }
    });
  }

  // Conversation history methods
  public addMessage(agentId: string, text: string): void {
    if (!text.trim()) return;

    const message: Message = {
      agentId,
      text: text.trim(),
      timestamp: Date.now(),
    };

    this.conversationHistory.push(message);

    // Keep only the last MAX_MESSAGES messages
    if (this.conversationHistory.length > MAX_MESSAGES) {
      this.conversationHistory = this.conversationHistory.slice(-MAX_MESSAGES);
    }
  }

  public getConversationHistory(): Message[] {
    return [...this.conversationHistory];
  }

  public getRecentMessages(count: number = 10): Message[] {
    return [...this.conversationHistory].slice(-count);
  }

  public getAgentMessages(agentId: string, count?: number): Message[] {
    const messages = this.conversationHistory.filter(msg => msg.agentId === agentId);
    return count ? messages.slice(-count) : messages;
  }

  public update(newAgents?: Agent[], newProgress?: number): void {
    // Only process updates in PLAYING state
    if (this.gameState !== GameState.PLAYING) {
      return;
    }

    const currentTime = Date.now();

    // Clear expired text first
    this.clearExpiredText();

    // Update time left if in PLAYING state
    if (this.gameState === GameState.PLAYING && this.timeLeft > 0) {
      this.timeLeft -= 1;
      this.checkDefeatCondition();
    }

    // If new agents are provided, update the existing agents
    if (newAgents) {
      this.updateAgentsFromResponse(newAgents);

      // Update progress if provided
      if (typeof newProgress === 'number') {
        this.currentProgress = newProgress;
        if (newProgress > this.highScore) {
          this.highScore = newProgress;
        }
        this.lastUpdateTime = currentTime;

        // Check for victory condition after updating progress
        this.checkVictoryCondition();
      }
    }
  }

  private updateAgentsFromResponse(newAgents: Agent[]): void {
    const currentTime = Date.now();

    // Update existing agents with new states while preserving positions and projectiles
    newAgents.forEach((newAgent) => {
      const existingAgent = this.agents.find((a) => a.id === newAgent.id);
      if (existingAgent) {
        // Preserve the position of the existing agent
        const { x, y, projectile } = existingAgent;

        // Update timestamps only if text has changed
        const updateSpokenTime = newAgent.spokenText !== existingAgent.spokenText;
        const updateThoughtTime = newAgent.thinkingState !== existingAgent.thinkingState;

        // Add new spoken text to conversation history if it changed
        if (updateSpokenTime && newAgent.spokenText) {
          this.addMessage(newAgent.id, newAgent.spokenText);
        }

        // Update progress state
        const progressState = {
          currentProgress: this.currentProgress,
          highScore: this.highScore,
          lastUpdateTime: currentTime,
        };

        // Update the existing agent with new state
        Object.assign(existingAgent, newAgent, {
          x,
          y,
          projectile,
          lastSpokenTime: updateSpokenTime ? currentTime : existingAgent.lastSpokenTime,
          lastThoughtTime: updateThoughtTime ? currentTime : existingAgent.lastThoughtTime,
          progressState,
        });
      } else {
        // If it's a new agent, add it to the list with a random position and current timestamps
        const newAgentWithPosition = {
          ...newAgent,
          x: Math.random() * 800 + 100, // Random x position between 100 and 900
          y: Math.random() * 400 + 50, // Random y position between 50 and 450
          lastSpokenTime: currentTime,
          lastThoughtTime: currentTime,
        };

        // Add initial spoken text to conversation history if present
        if (newAgent.spokenText) {
          this.addMessage(newAgent.id, newAgent.spokenText);
        }

        this.agents.push(newAgentWithPosition);
      }
    });

    // Remove agents that are no longer in the new state
    this.agents = this.agents.filter((agent) => newAgents.some((newAgent) => newAgent.id === agent.id));
  }
}