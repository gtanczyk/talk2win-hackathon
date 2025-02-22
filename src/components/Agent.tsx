import React from 'react';
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
} from './Agent.styles';
import { AgentSound } from './AgentSound';

export const Agent: React.FC<AgentType & { scenarioType: ScenarioType }> = ({
  x,
  y,
  mood,
  facialExpression,
  bodyLanguageExpression,
  thinkingState,
  spokenText,
  scenarioType,
}) => {
  return (
    <AgentPosition x={x} y={y}>
      <StyledAgent mood={mood} bodyLanguage={bodyLanguageExpression}>
        {spokenText && <SpeechBubble>{spokenText}</SpeechBubble>}
        {thinkingState && <ThinkBubble>{thinkingState}</ThinkBubble>}
        {spokenText && <AgentSound text={spokenText} scenarioType={scenarioType} />}

        <Head expression={facialExpression}>
          <Eyes expression={facialExpression} />
          <Mouth expression={facialExpression} />
        </Head>

        <Body bodyLanguage={bodyLanguageExpression}>
          <Arm side="left" bodyLanguage={bodyLanguageExpression} />
          <Arm side="right" bodyLanguage={bodyLanguageExpression} />
        </Body>

        <Legs>
          <Leg />
          <Leg />
        </Legs>
      </StyledAgent>
    </AgentPosition>
  );
};
