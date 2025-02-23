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
  DEFEAT = 'DEFEAT',
}

interface ScenarioConfig {
  type: ScenarioType;
  title: string;
  description: string;
  instruction: string;
  timeLimit: number; // Time limit in seconds
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
    description: 'Encourage warriors to fight (goal: high % of warriors encouraged to fight)',
    instruction: 'You are a commander preparing people for battle, you must encourage them to fight!',
    timeLimit: 180, // 3 minutes
  },
  {
    type: ScenarioType.ANNOUNCE_LAYOFFS,
    title: 'Announce Layoffs',
    description: 'Announce layoffs at company (goal: low % of people who will resign additionally because of layoffs)',
    instruction: 'You are a manager announcing company layoffs, you need to keep morale high and minimize the number of people who will resign.',
    timeLimit: 240, // 4 minutes
  },
  {
    type: ScenarioType.POLITICAL_RALLY,
    title: 'Political Rally',
    description: 'Run political rally (goal: % of people becoming supporters)',
    instruction: 'You are a politician running a rally, you need to convince as many people as possible to become your supporters.',
    timeLimit: 300, // 5 minutes
  },
  {
    type: ScenarioType.CREATE_YOUR_OWN,
    title: 'Create Your Own',
    description: 'Create your own scenario',
    instruction: '',
    timeLimit: 300, // 5 minutes
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
  lastSpokenTime: number;
  lastThoughtTime: number;
  projectile?: {
    type: ProjectileType;
    targetX: number;
    targetY: number;
  };
}

export interface Message {
  agentId: string;
  text: string;
  timestamp: number;
}