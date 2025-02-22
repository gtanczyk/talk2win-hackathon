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
            case BodyLanguageExpression.THROWING_OBJECT:
                return 'throwObject 1s infinite';
            case BodyLanguageExpression.HOSTILE_GESTURE:
                return 'hostileGesture 1.5s infinite';
            case BodyLanguageExpression.PROJECTILE_THROW:
                return 'projectileThrow 0.8s infinite';
            case BodyLanguageExpression.RAGE_THROW:
                return 'rageThrow 0.6s infinite';
            case BodyLanguageExpression.FRUSTRATED_GESTURE:
                return 'frustratedGesture 2s infinite';
            case BodyLanguageExpression.PLEADING:
                return 'pleading 1.5s infinite';
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
            case Mood.EXCITED:
                return 'brightness(1.3) saturate(1.2)';
            case Mood.SCARED:
                return 'brightness(0.9) sepia(0.2)';
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

    @keyframes throwObject {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-15deg); }
        50% { transform: rotate(30deg); }
        75% { transform: rotate(15deg); }
        100% { transform: rotate(0deg); }
    }

    @keyframes hostileGesture {
        0% { transform: translateX(0) rotate(0deg); }
        20% { transform: translateX(-5px) rotate(-5deg); }
        40% { transform: translateX(5px) rotate(5deg); }
        60% { transform: translateX(-3px) rotate(-3deg); }
        80% { transform: translateX(3px) rotate(3deg); }
        100% { transform: translateX(0) rotate(0deg); }
    }

    @keyframes projectileThrow {
        0% { transform: rotate(0deg) translateY(0); }
        25% { transform: rotate(-20deg) translateY(-5px); }
        50% { transform: rotate(40deg) translateY(0); }
        75% { transform: rotate(20deg) translateY(-3px); }
        100% { transform: rotate(0deg) translateY(0); }
    }

    @keyframes rageThrow {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-15deg); }
        50% { transform: scale(1.2) rotate(30deg); }
        75% { transform: scale(1.1) rotate(-10deg); }
        100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes frustratedGesture {
        0% { transform: translateY(0) rotate(0deg); }
        15% { transform: translateY(-5px) rotate(-3deg); }
        30% { transform: translateY(0) rotate(3deg); }
        45% { transform: translateY(-3px) rotate(-2deg); }
        60% { transform: translateY(0) rotate(2deg); }
        75% { transform: translateY(-2px) rotate(-1deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }

    @keyframes pleading {
        0% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-3px) scale(1.05); }
        50% { transform: translateY(0) scale(1); }
        75% { transform: translateY(-2px) scale(1.03); }
        100% { transform: translateY(0) scale(1); }
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
        height: ${props => {
            switch (props.expression) {
                case FacialExpression.WIDE_EYES:
                    return '8px';
                case FacialExpression.SQUINTING:
                    return '2px';
                default:
                    return '4px';
            }
        }};
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
    transform: ${props => {
        switch (props.bodyLanguage) {
            case BodyLanguageExpression.ARMS_CROSSED:
                return 'scale(1.1, 0.9)';
            case BodyLanguageExpression.PLEADING:
                return 'scale(0.95, 1.05)';
            default:
                return 'none';
        }
    }};
`;

const Arm = styled.div<{ side: 'left' | 'right', bodyLanguage: BodyLanguageExpression }>`
    width: 20px;
    height: 8px;
    background-color: #6b8e23;
    position: absolute;
    top: 10px;
    ${props => props.side === 'left' ? 'left: -18px' : 'right: -18px'};
    transform-origin: ${props => props.side === 'left' ? 'right' : 'left'} center;
    transition: transform 0.3s ease;
    transform: ${props => {
        switch (props.bodyLanguage) {
            case BodyLanguageExpression.HANDS_ON_HIPS:
                return 'rotate(45deg)';
            case BodyLanguageExpression.POINTING:
                return props.side === 'right' ? 'rotate(-45deg)' : 'none';
            case BodyLanguageExpression.WAVING:
                return props.side === 'right' ? 'rotate(-45deg)' : 'none';
            case BodyLanguageExpression.THROWING_OBJECT:
                return props.side === 'right' ? 'rotate(-120deg)' : 'rotate(30deg)';
            case BodyLanguageExpression.HOSTILE_GESTURE:
                return props.side === 'right' ? 'rotate(-60deg)' : 'rotate(60deg)';
            case BodyLanguageExpression.PROJECTILE_THROW:
                return props.side === 'right' ? 'rotate(-135deg)' : 'rotate(45deg)';
            case BodyLanguageExpression.RAGE_THROW:
                return props.side === 'right' ? 'rotate(-150deg)' : 'rotate(60deg)';
            case BodyLanguageExpression.FRUSTRATED_GESTURE:
                return props.side === 'right' ? 'rotate(-30deg)' : 'rotate(30deg)';
            case BodyLanguageExpression.PLEADING:
                return props.side === 'right' ? 'rotate(-15deg)' : 'rotate(15deg)';
            default:
                return 'none';
        }
    }};
    animation: ${props => {
        switch (props.bodyLanguage) {
            case BodyLanguageExpression.THROWING_OBJECT:
                return props.side === 'right' ? 'throwArm 1s infinite' : 'none';
            case BodyLanguageExpression.HOSTILE_GESTURE:
                return 'shakeArm 1.5s infinite';
            case BodyLanguageExpression.PROJECTILE_THROW:
                return props.side === 'right' ? 'projectileArm 0.8s infinite' : 'none';
            case BodyLanguageExpression.RAGE_THROW:
                return props.side === 'right' ? 'rageArm 0.6s infinite' : 'none';
            case BodyLanguageExpression.FRUSTRATED_GESTURE:
                return 'frustratedArm 2s infinite';
            case BodyLanguageExpression.PLEADING:
                return 'pleadingArm 1.5s infinite';
            default:
                return 'none';
        }
    }};

    @keyframes throwArm {
        0% { transform: rotate(-45deg); }
        25% { transform: rotate(-90deg); }
        50% { transform: rotate(-120deg); }
        75% { transform: rotate(-90deg); }
        100% { transform: rotate(-45deg); }
    }

    @keyframes shakeArm {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(30deg); }
        75% { transform: rotate(-30deg); }
        100% { transform: rotate(0deg); }
    }

    @keyframes projectileArm {
        0% { transform: rotate(-45deg); }
        25% { transform: rotate(-100deg); }
        50% { transform: rotate(-135deg); }
        75% { transform: rotate(-100deg); }
        100% { transform: rotate(-45deg); }
    }

    @keyframes rageArm {
        0% { transform: rotate(-60deg); }
        25% { transform: rotate(-120deg); }
        50% { transform: rotate(-150deg); }
        75% { transform: rotate(-120deg); }
        100% { transform: rotate(-60deg); }
    }

    @keyframes frustratedArm {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(20deg); }
        50% { transform: rotate(-20deg); }
        75% { transform: rotate(10deg); }
        100% { transform: rotate(0deg); }
    }

    @keyframes pleadingArm {
        0% { transform: rotate(15deg); }
        50% { transform: rotate(30deg); }
        100% { transform: rotate(15deg); }
    }
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