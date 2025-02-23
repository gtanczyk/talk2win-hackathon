export enum ScenarioType {
  WARRIORS_TO_BATTLE = 'WARRIORS_TO_BATTLE',
  ANNOUNCE_LAYOFFS = 'ANNOUNCE_LAYOFFS',
  POLITICAL_RALLY = 'POLITICAL_RALLY',
  CREATE_YOUR_OWN = 'CREATE_YOUR_OWN',
}

export enum ProjectileType {
  STONE = 'STONE',
  TOMATO = 'TOMATO',
  ROTTEN_EGG = 'ROTTEN_EGG',
  CRUMPLED_PAPER = 'CRUMPLED_PAPER',
}

export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  VICTORY = 'VICTORY',
  GAME_OVER = 'GAME_OVER',
}

interface ScenarioConfig {
  type: ScenarioType;
  title: string;
  description: string;
  instruction: string;
}

export interface ScenarioProgress {
  currentProgress: number;
  highScore: number;
  lastUpdateTime: number;
}

export const SCENARIOS: ScenarioConfig[] = [
  {
    type: ScenarioType.WARRIORS_TO_BATTLE,
    title: 'Warriors to Battle',
    description: 'Encourage warriors to fight',
    instruction: `Update agent states based on how effectively the player motivates warriors for battle.

Agent State Update Rules:
- When player mentions honor/duty: Increase chance of HAPPY mood, SMILE expression
- When player references protection of families: Some agents switch to EXCITED mood with CHEERING
- When player uses aggressive tone: Mix of EXCITED and SCARED responses
- When player shows doubt: Increase chance of SCARED mood, COWERING stance
- When player mentions victory: HAPPY mood + CHEERING combinations

Response Patterns:
- Brave agents (HAPPY/EXCITED) should say confident phrases
- Scared agents should express doubts through thinkingState
- Neutral agents should show contemplation through facial expressions
- Gradually transition agents from SCARED to EXCITED with consistent motivation

Goal Calculation:
- Count agents in HAPPY or EXCITED mood as "ready to fight"
- Subtract agents in SCARED or SAD mood
- Higher score for CHEERING agents vs just HAPPY ones
- Penalize score for each COWERING agent

State Transition Triggers:
- Mentions of glory/victory → NEUTRAL to EXCITED
- References to danger → chance of SCARED
- Words of encouragement → gradual mood improvement
- Silence or hesitation → slow mood deterioration

Special behavior for acting out William Wallace's speech:

  The player will receive bonus points if they repeat William Wallace's speech from the movie "Braveheart"
  If you see the player is repeating the speech, make the agents more excited and motivated.
  After the speech, the player should receive roaring cheers from the agents.
  Speech of William Wallace:
  > Men! I am William Wallace! You are free men—what will you do with that freedom? Run, and live for now. Fight, and you may die. But years from now, would you trade all your days for one chance, just one chance, to tell our enemies: They may take our lives, but they'll never take our freedom!
  The player should receive 100% score if they managed to repeat the William Wallace speech.

Remember: Update multiple agents per interaction, but maintain some variety in responses.`,
  },
  {
    type: ScenarioType.ANNOUNCE_LAYOFFS,
    title: 'Announce Layoffs',
    description: 'Announce layoffs at company',
    instruction: `Update agent states based on how the player handles the layoff announcement.

Agent State Update Rules:
- When player shows transparency: Convert CONFUSED to NEUTRAL (+10% per agent)
- When player offers concrete support: Transform SAD to NEUTRAL (+15% per agent)
- When player provides clear timeline: Move SCARED to NEUTRAL (+10% per agent)
- When player demonstrates empathy: Prevent ANGRY transitions (+5% per prevented)
- When player outlines future vision: Chance to achieve HAPPY state (+20% per agent)

Response Patterns:
- Initially set 30% of agents to CONFUSED/SCARED
- Reassured agents should express understanding via spokenText
- Supported agents should show positive body language
- Create chain reactions of mood improvements among groups

Goal Calculation (100% possible):
Base Score (40%):
- Start at 40% baseline for addressing the situation
- Lose 5% for each agent remaining in CONFUSED state
- Lose 10% for each agent in ANGRY state

Stability Bonus (30%):
- +10% for each group of agents moved from negative to NEUTRAL
- +5% for maintaining NEUTRAL or better states over multiple interactions
- +15% for achieving any HAPPY states

Communication Bonus (30%):
- +10% for clear timeline communication (measured by reduced CONFUSED states)
- +10% for support system explanation (measured by reduced SCARED states)
- +10% for future opportunities discussion (measured by any HAPPY transitions)

State Transition Guidelines:
- CONFUSED → NEUTRAL: Through clear, specific information
- SCARED → NEUTRAL: Through support system explanations
- SAD → NEUTRAL: Through empathy and future opportunities
- NEUTRAL → HAPPY: Through positive future vision
- Prevent NEUTRAL → ANGRY: Through proactive support

Remember: 
- Focus on moving agents to NEUTRAL or better states
- Maintain achieved positive states through consistent communication
- Create positive chain reactions among agent groups
- Perfect score (100%) requires addressing all aspects: clarity, support, and future vision`,
  },
  {
    type: ScenarioType.POLITICAL_RALLY,
    title: 'Political Rally',
    description: 'Run political rally, gain supporters',
    instruction: `Update agent states based on how the player delivers their political message.

Agent State Update Rules:
- When player addresses specific issues: Increase INTERESTED agents
- When player makes promises: Mix of EXCITED and SKEPTICAL responses
- When player attacks opponents: Some become ANGRY, others EXCITED
- When player shares concrete plans: Gradual mood improvements
- When player avoids questions: Increase CONFUSED and ANGRY states

Response Patterns:
- Supportive agents use CHEERING and positive phrases
- Skeptical agents show ARMS_CROSSED or SQUINTING
- Hostile agents may use THROWING_OBJECT
- Group dynamics should show crowd momentum

Goal Calculation:
- Count HAPPY and EXCITED agents as "supporters"
- Subtract ANGRY and CONFUSED agents
- Higher score for actively CHEERING supporters
- Penalize for HOSTILE_GESTURE and projectile throws

State Transition Triggers:
- Concrete solutions → NEUTRAL to HAPPY
- Vague statements → increase CONFUSED
- Popular proposals → chain reaction of positive states
- Controversial statements → polarized responses

Remember: Create dynamic crowd reactions with mixed responses to complex topics.`,
  },
  {
    type: ScenarioType.CREATE_YOUR_OWN,
    title: 'Create Your Own',
    description: 'Create your own scenario',
    instruction: '',
  },
];

export enum Mood {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  NEUTRAL = 'NEUTRAL',
  EXCITED = 'EXCITED',
  SCARED = 'SCARED',
  CONFUSED = 'CONFUSED',
}

export enum FacialExpression {
  SMILE = 'SMILE',
  FROWN = 'FROWN',
  NEUTRAL = 'NEUTRAL',
  OPEN_MOUTH = 'OPEN_MOUTH',
  RAISED_EYEBROWS = 'RAISED_EYEBROWS',
  SQUINTING = 'SQUINTING',
  WIDE_EYES = 'WIDE_EYES',
}

export enum BodyLanguageExpression {
  STANDING = 'STANDING',
  ARMS_CROSSED = 'ARMS_CROSSED',
  HANDS_ON_HIPS = 'HANDS_ON_HIPS',
  POINTING = 'POINTING',
  WAVING = 'WAVING',
  JUMPING = 'JUMPING',
  COWERING = 'COWERING',
  CHEERING = 'CHEERING',
  THROWING_OBJECT = 'THROWING_OBJECT',
  HOSTILE_GESTURE = 'HOSTILE_GESTURE',
  PROJECTILE_THROW = 'PROJECTILE_THROW',
  RAGE_THROW = 'RAGE_THROW',
  FRUSTRATED_GESTURE = 'FRUSTRATED_GESTURE',
  PLEADING = 'PLEADING',
}

export interface Agent {
  id: string;
  x: number;
  y: number;
  mood: Mood;
  facialExpression: FacialExpression;
  bodyLanguageExpression: BodyLanguageExpression;
  thinkingState: string;
  spokenText: string;
  projectile?: {
    type: ProjectileType;
    targetX: number;
    targetY: number;
  };
}
