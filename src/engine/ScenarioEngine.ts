import { Agent, ScenarioType, Mood, FacialExpression, BodyLanguageExpression } from '../types';

export class ScenarioEngine {
  private agents: Agent[] = [];
  private scenarioType: ScenarioType;
  private lastUpdateTime: number = 0;

  constructor(scenarioType: ScenarioType) {
    this.scenarioType = scenarioType;
    this.initializeAgents();
  }

  private initializeAgents() {
    // Initialize different number of agents based on scenario type
    const count = this.getInitialAgentCount();

    for (let i = 0; i < count; i++) {
      this.agents.push(this.createAgent(i));
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

    return {
      id: `agent-${index}`,
      x: 100 + col * 80, // Space agents horizontally
      y: 50 + row * 60, // Space agents vertically
      mood: Mood.NEUTRAL,
      facialExpression: FacialExpression.NEUTRAL,
      bodyLanguageExpression: BodyLanguageExpression.STANDING,
      thinkingState: '',
      spokenText: '',
    };
  }

  public getAgents(): Agent[] {
    return [...this.agents];
  }

  public update(deltaTime: number, newAgents?: Agent[]): void {
    const currentTime = Date.now();
    
    // If new agents are provided, update the existing agents
    if (newAgents) {
      this.updateAgentsFromResponse(newAgents);
      return;
    }

    // Fallback to random updates if no new agents provided
    if (currentTime - this.lastUpdateTime < 1000) {
      return; // Update only once per second
    }
    this.lastUpdateTime = currentTime + deltaTime;

    // Randomly update some agents for demonstration
    this.agents.forEach((agent) => {
      if (Math.random() < 0.1) {
        // 10% chance to update each agent
        this.updateAgentState(agent);
      }
    });
  }

  private updateAgentsFromResponse(newAgents: Agent[]): void {
    // Update existing agents with new states while preserving positions
    newAgents.forEach((newAgent) => {
      const existingAgent = this.agents.find(a => a.id === newAgent.id);
      if (existingAgent) {
        // Preserve the position of the existing agent
        const { x, y } = existingAgent;
        Object.assign(existingAgent, newAgent, { x, y });
      } else {
        // If it's a new agent, add it to the list with a random position
        this.agents.push({
          ...newAgent,
          x: Math.random() * 800 + 100, // Random x position between 100 and 900
          y: Math.random() * 400 + 50,  // Random y position between 50 and 450
        });
      }
    });

    // Remove agents that are no longer in the new state
    this.agents = this.agents.filter(agent => 
      newAgents.some(newAgent => newAgent.id === agent.id)
    );
  }

  private updateAgentState(agent: Agent): void {
    // Fallback random state updates
    const randomMood = Object.values(Mood)[Math.floor(Math.random() * Object.values(Mood).length)];

    const randomFacialExpression =
      Object.values(FacialExpression)[Math.floor(Math.random() * Object.values(FacialExpression).length)];

    const randomBodyLanguage =
      Object.values(BodyLanguageExpression)[Math.floor(Math.random() * Object.values(BodyLanguageExpression).length)];

    // Adjust probability of hostile actions based on scenario type
    if (this.scenarioType === ScenarioType.POLITICAL_RALLY) {
      // Higher chance of hostile actions in political rallies
      if (Math.random() < 0.3) {
        const hostileActions = [
          BodyLanguageExpression.THROWING_OBJECT,
          BodyLanguageExpression.HOSTILE_GESTURE,
          BodyLanguageExpression.PROJECTILE_THROW
        ];
        agent.bodyLanguageExpression = hostileActions[Math.floor(Math.random() * hostileActions.length)];
        agent.mood = Mood.ANGRY;
        return;
      }
    }

    agent.mood = randomMood as Mood;
    agent.facialExpression = randomFacialExpression as FacialExpression;
    agent.bodyLanguageExpression = randomBodyLanguage as BodyLanguageExpression;

    // Random thinking or speaking
    if (Math.random() < 0.3) {
      agent.thinkingState = this.getRandomThought();
      agent.spokenText = '';
    } else if (Math.random() > 0.6) {
      agent.spokenText = this.getRandomSpeech();
      agent.thinkingState = '';
    } else {
      agent.thinkingState = '';
      agent.spokenText = '';
    }
  }

  private getRandomThought(): string {
    const thoughts = ['Hmm...', 'Not sure about this...', 'Interesting...', 'Maybe...', 'Should I...?'];
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  private getRandomSpeech(): string {
    const speeches: Partial<Record<ScenarioType, string[]>> = {
      [ScenarioType.WARRIORS_TO_BATTLE]: [
        'For glory!', 'We fight!', 'To battle!', 'Victory awaits!',
        'Take this!', 'Feel my wrath!', 'For honor!'
      ],
      [ScenarioType.ANNOUNCE_LAYOFFS]: [
        'Oh no...', 'What next?', 'Need to update my resume', "Didn't expect this",
        'This is unfair!', 'How could they?', 'We deserve better!'
      ],
      [ScenarioType.POLITICAL_RALLY]: [
        'Yes!', 'Good point!', 'I agree!', 'Tell us more!',
        'Boo!', 'Get off the stage!', 'We oppose this!', 'Take that!'
      ],
    };

    const scenarioSpeeches = speeches[this.scenarioType] || [];
    return scenarioSpeeches[Math.floor(Math.random() * scenarioSpeeches.length)] || '';
  }
}