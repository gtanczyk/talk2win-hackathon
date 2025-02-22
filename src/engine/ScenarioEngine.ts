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

  public update(deltaTime: number): void {
    // Stub implementation for the update method
    const currentTime = Date.now();
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

  private updateAgentState(agent: Agent): void {
    // Stub implementation for agent state updates
    const randomMood = Object.values(Mood)[Math.floor(Math.random() * Object.values(Mood).length)];

    const randomFacialExpression =
      Object.values(FacialExpression)[Math.floor(Math.random() * Object.values(FacialExpression).length)];

    const randomBodyLanguage =
      Object.values(BodyLanguageExpression)[Math.floor(Math.random() * Object.values(BodyLanguageExpression).length)];

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
      [ScenarioType.WARRIORS_TO_BATTLE]: ['For glory!', 'We fight!', 'To battle!', 'Victory awaits!'],
      [ScenarioType.ANNOUNCE_LAYOFFS]: ['Oh no...', 'What next?', 'Need to update my resume', "Didn't expect this"],
      [ScenarioType.POLITICAL_RALLY]: ['Yes!', 'Good point!', 'I agree!', 'Tell us more!'],
    };

    const scenarioSpeeches = speeches[this.scenarioType] || [];
    return scenarioSpeeches[Math.floor(Math.random() * scenarioSpeeches.length)] || '';
  }
}
