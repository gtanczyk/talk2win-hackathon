import React from 'react';
import { Agent as AgentType } from '../types';
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

export const Agent: React.FC<AgentType> = ({
  x,
  y,
  mood,
  facialExpression,
  bodyLanguageExpression,
  thinkingState,
  spokenText,
}) => {
  return (
    <AgentPosition x={x} y={y}>
      <StyledAgent mood={mood} bodyLanguage={bodyLanguageExpression}>
        {spokenText && <SpeechBubble>{spokenText}</SpeechBubble>}
        {thinkingState && <ThinkBubble>{thinkingState}</ThinkBubble>}
        {spokenText && <AgentSound text={spokenText} />}

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
