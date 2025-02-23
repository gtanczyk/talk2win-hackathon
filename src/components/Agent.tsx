import React, { useEffect } from 'react';
import { Agent as AgentType, ScenarioType } from '../types';
import {
  StyledAgent,
  AgentPosition,
  Head,
  Eyes,
  Mouth,
  Body,
  Arm,
  Legs,
  Leg,
  SpeechBubble,
  ThinkBubble,
  VikingHelmet,
  Sword,
  Shield,
} from './Agent.styles';
import { AgentSound } from './AgentSound';
import { Hat as PoliticalHat } from './AgentAccessories.styles';

export const Agent: React.FC<AgentType & { scenarioType: ScenarioType }> = ({
  x,
  y,
  mood,
  facialExpression,
  bodyLanguageExpression,
  thinkingState,
  hat,
  spokenText,
  scenarioType,
}) => {
  const [delayedSpokenText, setDelayedSpokenText] = React.useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedSpokenText(spokenText);
    }, Math.random() * 5000 + 1000);
    return () => clearTimeout(timeout);
  }, [spokenText]);

  const isPoliticalRally = scenarioType === ScenarioType.POLITICAL_RALLY;
  const isWarrior = scenarioType === ScenarioType.WARRIORS_TO_BATTLE;

  return (
    <AgentPosition x={x} y={y}>
      <StyledAgent mood={mood} bodyLanguage={bodyLanguageExpression}>
        {thinkingState && <ThinkBubble>{thinkingState}</ThinkBubble>}
        {delayedSpokenText && <SpeechBubble>{spokenText}</SpeechBubble>}
        {delayedSpokenText && <AgentSound text={delayedSpokenText} scenarioType={scenarioType} />}

        {isPoliticalRally && hat && <PoliticalHat />}
        {isWarrior && <VikingHelmet />}

        {/* Render glasses before eyes if in layoffs scenario */}
        <Head expression={facialExpression}>
          <Eyes expression={facialExpression} />
          <Mouth expression={facialExpression} />
        </Head>

        <Body bodyLanguage={bodyLanguageExpression}>
          <Arm side="left" bodyLanguage={bodyLanguageExpression} />
          <Arm side="right" bodyLanguage={bodyLanguageExpression} />
          {isWarrior && (
            <>
              <Shield side="left" />
              <Sword side="right" />
            </>
          )}
        </Body>

        <Legs>
          <Leg />
          <Leg />
        </Legs>
      </StyledAgent>
    </AgentPosition>
  );
};
