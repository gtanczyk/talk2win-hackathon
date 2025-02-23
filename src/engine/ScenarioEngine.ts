import {
  Agent,
  ScenarioType,
  Mood,
  FacialExpression,
  BodyLanguageExpression,
  ScenarioProgress,
  GameState,
} from '../types';

export class ScenarioEngine {
  private agents: Agent[] = [];
  private scenarioType: ScenarioType;
  private updateInterval: NodeJS.Timeout | null = null;
  private lastUpdateTime: number = 0;
  private currentProgress: number = 50; // Initialize to 50%
  private highScore: number = 0;
  private gameState: GameState = GameState.INTRO;

  constructor(scenarioType: ScenarioType) {
    this.scenarioType = scenarioType;
    this.initializeAgents();
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

  private getInitialAgentCount(): number {
    switch (this.scenarioType) {
      case ScenarioType.WARRIORS_TO_BATTLE:
        return 10;
      case ScenarioType.ANNOUNCE_LAYOFFS:
        return 10;
      case ScenarioType.POLITICAL_RALLY:
        return 10;
      default:
        return 5;
    }
  }

  private createAgent(index: number): Agent {
    // Calculate position in a grid-like pattern
    const row = Math.floor(index / 5);
    const col = index % 5;
    const x = (col + Math.random() - Math.random()) * 190;
    const y = (row + Math.random() - Math.random()) * 90;

    return {
      id: `agent-${index}`,
      x,
      y,
      mood: Object.values(Mood).sort(() => Math.random() - 0.5)[0],
      facialExpression: Object.values(FacialExpression).sort(() => Math.random() - 0.5)[0],
      bodyLanguageExpression: Object.values(BodyLanguageExpression).sort(() => Math.random() - 0.5)[0],
      thinkingState: '',
      spokenText: '',
      hat: this.scenarioType === ScenarioType.POLITICAL_RALLY && Math.random() > 0.1,
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

  public setGameState(newState: GameState) {
    const oldState = this.gameState;
    this.gameState = newState;

    // Handle state transitions
    if (oldState !== newState) {
      if (newState === GameState.PLAYING) {
        // Start periodic updates when entering PLAYING state
        this.startPeriodicUpdates();
      } else {
        // Clean up interval when leaving PLAYING state
        this.cleanup();
      }
    }

    // Reset progress when starting a new game
    if (newState === GameState.INTRO) {
      this.currentProgress = 50; // Reset to 50% when starting new game
    }
  }

  private checkGameConditions() {
    if (this.gameState !== GameState.PLAYING) {
      return;
    }

    // Check for game over condition (0% or less)
    if (this.currentProgress <= 0) {
      this.setGameState(GameState.GAME_OVER);
      return;
    }

    // Check for victory condition (100% or more)
    if (this.currentProgress >= 100) {
      this.setGameState(GameState.VICTORY);
      return;
    }
  }

  public update(newAgents?: Agent[], newProgress?: number): void {
    // Only process updates in PLAYING state
    if (this.gameState !== GameState.PLAYING) {
      return;
    }

    const currentTime = Date.now();

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

        // Check for victory or game over conditions after updating progress
        this.checkGameConditions();
      }
      return;
    }
  }

  private updateAgentsFromResponse(newAgents: Agent[]): void {
    // Clear speaking and thinking states for all agents
    this.agents.forEach((agent) => {
      agent.spokenText = '';
      agent.thinkingState = '';
    });

    // Update existing agents with new states while preserving positions and projectiles
    newAgents.forEach((newAgent) => {
      const existingAgent = this.agents.find((a) => a.id === newAgent.id);
      if (existingAgent) {
        // Preserve the position of the existing agent
        const { x, y, projectile } = existingAgent;

        // Update the existing agent with new state
        Object.assign(existingAgent, newAgent, {
          x,
          y,
          projectile,
        });
      } else {
        // If it's a new agent, add it to the list with a random position and current timestamps
        this.agents.push({
          ...newAgent,
          x: Math.random() * 800 + 100, // Random x position between 100 and 900
          y: Math.random() * 400 + 50, // Random y position between 50 and 450
        });
      }
    });
  }
}
