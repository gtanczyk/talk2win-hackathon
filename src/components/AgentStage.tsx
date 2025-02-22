import React from 'react';
import { Agent as AgentType, ScenarioType } from '../types';
import { Agent } from './Agent';
import { Projectile } from './Projectile';
import { Stage } from './AgentStage.styles';

interface AgentStageProps {
  agents: AgentType[];
  scenarioType: ScenarioType;
}

export const AgentStage: React.FC<AgentStageProps> = ({ agents, scenarioType }) => {
  return (
    <Stage>
      {agents
        .sort((l, r) => (l.y < r.y ? -1 : 1)) // Sort by y position for proper layering
        .map((agent) => (
          <React.Fragment key={agent.id}>
            <Agent {...agent} scenarioType={scenarioType} />
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
        ))}
    </Stage>
  );
};
