import React, { useMemo } from 'react';
import { Agent as AgentType, ScenarioType } from '../types';
import { Agent } from './Agent';
import { Projectile } from './Projectile';
import { Stage } from './AgentStage.styles';
import { WarriorsToBattleBackground, AnnounceLayoffsBackground, PoliticalRallyBackground } from './backgrounds';

interface AgentStageProps {
  agents: AgentType[];
  scenarioType: ScenarioType;
}

// Using a more specific type for the memoized component
const AgentWithProjectile = React.memo<AgentType>((agent) => (
  <React.Fragment>
    <Agent {...agent} />
    {agent.projectile && (
      <Projectile
        type={agent.projectile.type}
        x={agent.x}
        y={agent.y}
        targetX={agent.projectile.targetX}
        targetY={agent.projectile.targetY}
      />
    )}
  </React.Fragment>
));

AgentWithProjectile.displayName = 'AgentWithProjectile';

// Use more specific return type instead of React.FC
export const AgentStage = ({ agents, scenarioType }: AgentStageProps): JSX.Element => {
  const sortedAgents = useMemo(() => agents.sort((a, b) => a.y - b.y), [agents]);

  return (
    <Stage scenarioType={scenarioType}>
      {scenarioType === ScenarioType.WARRIORS_TO_BATTLE && <WarriorsToBattleBackground />}
      {scenarioType === ScenarioType.ANNOUNCE_LAYOFFS && <AnnounceLayoffsBackground />}
      {scenarioType === ScenarioType.POLITICAL_RALLY && <PoliticalRallyBackground />}
      {sortedAgents.map((agent) => (
        <AgentWithProjectile key={agent.id} {...agent} />
      ))}
      </Stage>);
};
// Using React.memo to optimize rendering
export const MemoizedAgentStage = React.memo(AgentStage);
