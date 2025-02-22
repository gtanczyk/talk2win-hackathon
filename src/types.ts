export enum ScenarioType {
    WARRIORS_TO_BATTLE = 'WARRIORS_TO_BATTLE',
    ANNOUNCE_LAYOFFS = 'ANNOUNCE_LAYOFFS',
    POLITICAL_RALLY = 'POLITICAL_RALLY',
    CREATE_YOUR_OWN = 'CREATE_YOUR_OWN'
}

export interface ScenarioConfig {
    type: ScenarioType;
    title: string;
    description: string;
}

export const SCENARIOS: ScenarioConfig[] = [
    {
        type: ScenarioType.WARRIORS_TO_BATTLE,
        title: 'Warriors to Battle',
        description: 'Encourage warriors to fight (goal: high % of warriors encouraged to fight)'
    },
    {
        type: ScenarioType.ANNOUNCE_LAYOFFS,
        title: 'Announce Layoffs',
        description: 'Announce layoffs at company (goal: low % of people who will resign additionally because of layoffs)'
    },
    {
        type: ScenarioType.POLITICAL_RALLY,
        title: 'Political Rally',
        description: 'Run political rally (goal: % of people becoming supporters)'
    },
    {
        type: ScenarioType.CREATE_YOUR_OWN,
        title: 'Create Your Own',
        description: 'Create your own scenario'
    }
];