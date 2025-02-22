import React from 'react';
import { Agent as AgentType } from '../types';
import {
    StyledAgent,
    Head,
    Eyes,
    Mouth,
    Body,
    Arm,
    Legs,
    Leg,
    SpeechBubble,
    ThinkBubble
} from './Agent.styles';

interface AgentProps extends AgentType {}

export const Agent: React.FC<AgentProps> = ({
    x,
    y,
    mood,
    facialExpression,
    bodyLanguageExpression,
    thinkingState,
    spokenText
}) => {
    return (
        <StyledAgent 
            x={x} 
            y={y} 
            mood={mood}
            bodyLanguage={bodyLanguageExpression}
        >
            {spokenText && <SpeechBubble>{spokenText}</SpeechBubble>}
            {thinkingState && <ThinkBubble>{thinkingState}</ThinkBubble>}
            
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
    );
};