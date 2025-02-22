import React from 'react';
import styled from 'styled-components';
import { Agent as AgentType, Mood, FacialExpression, BodyLanguageExpression } from '../types';

interface StyledAgentProps {
    x: number;
    y: number;
    mood: Mood;
    bodyLanguage: BodyLanguageExpression;
}

const StyledAgent = styled.div<StyledAgentProps>`
    position: absolute;
    left: ${props => props.x}px;
    bottom: ${props => props.y}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: bottom center;
    transition: all 0.3s ease;
    
    /* Body language animations */
    animation: ${props => {
        switch (props.bodyLanguage) {
            case BodyLanguageExpression.JUMPING:
                return 'jump 1s infinite';
            case BodyLanguageExpression.WAVING:
                return 'wave 1s infinite';
            case BodyLanguageExpression.CHEERING:
                return 'cheer 1s infinite';
            default:
                return 'none';
        }
    }};

    /* Mood-based colors */
    filter: ${props => {
        switch (props.mood) {
            case Mood.HAPPY:
                return 'brightness(1.2)';
            case Mood.SAD:
                return 'brightness(0.8)';
            case Mood.ANGRY:
                return 'sepia(0.5) hue-rotate(-20deg)';
            default:
                return 'none';
        }
    }};

    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }

    @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(5deg); }
    }

    @keyframes cheer {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

const Head = styled.div<{ expression: FacialExpression }>`
    width: 40px;
    height: 40px;
    background-color: #ffdbac;
    border-radius: 50%;
    position: relative;
    border: 2px solid #000;
`;

const Eyes = styled.div<{ expression: FacialExpression }>`
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    top: 30%;
    
    &::before, &::after {
        content: '';
        width: 6px;
        height: ${props => props.expression === FacialExpression.WIDE_EYES ? '8px' : '4px'};
        background-color: #000;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
`;

const Mouth = styled.div<{ expression: FacialExpression }>`
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: ${props => {
        switch (props.expression) {
            case FacialExpression.SMILE:
                return '10px';
            case FacialExpression.OPEN_MOUTH:
                return '12px';
            default:
                return '2px';
        }
    }};
    background-color: ${props => props.expression === FacialExpression.OPEN_MOUTH ? '#000' : 'transparent'};
    border: 2px solid #000;
    border-radius: ${props => {
        switch (props.expression) {
            case FacialExpression.SMILE:
                return '0 0 10px 10px';
            case FacialExpression.FROWN:
                return '10px 10px 0 0';
            default:
                return '2px';
        }
    }};
`;

const Body = styled.div<{ bodyLanguage: BodyLanguageExpression }>`
    width: 30px;
    height: 40px;
    background-color: #6b8e23;
    border-radius: 10px;
    position: relative;
    transform: ${props => 
        props.bodyLanguage === BodyLanguageExpression.ARMS_CROSSED ? 'scale(1.1, 0.9)' : 'none'
    };
`;

const Arm = styled.div<{ side: 'left' | 'right', bodyLanguage: BodyLanguageExpression }>`
    width: 20px;
    height: 8px;
    background-color: #6b8e23;
    position: absolute;
    top: 10px;
    ${props => props.side === 'left' ? 'left: -18px' : 'right: -18px'};
    transform-origin: ${props => props.side === 'left' ? 'right' : 'left'} center;
    transform: ${props => {
        switch (props.bodyLanguage) {
            case BodyLanguageExpression.HANDS_ON_HIPS:
                return 'rotate(45deg)';
            case BodyLanguageExpression.POINTING:
                return props.side === 'right' ? 'rotate(-45deg)' : 'none';
            case BodyLanguageExpression.WAVING:
                return props.side === 'right' ? 'rotate(-45deg)' : 'none';
            default:
                return 'none';
        }
    }};
`;

const Legs = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20px;
`;

const Leg = styled.div`
    width: 8px;
    height: 15px;
    background-color: #6b8e23;
`;

const SpeechBubble = styled.div`
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border: 2px solid #000;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #000;
    }
`;

const ThinkBubble = styled.div`
    position: absolute;
    top: -40px;
    right: -80px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 10px;
    max-width: 100px;
    font-style: italic;
    color: #666;
`;

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