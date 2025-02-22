import styled, { keyframes } from 'styled-components';
import { ProjectileType } from '../types';

export const projectileGlow = keyframes`
    0% { filter: brightness(1) drop-shadow(0 0 2px rgba(255, 215, 0, 0.5)); }
    50% { filter: brightness(1.2) drop-shadow(0 0 4px rgba(255, 215, 0, 0.8)); }
    100% { filter: brightness(1) drop-shadow(0 0 2px rgba(255, 215, 0, 0.5)); }
`;

export const splatterAnimation = keyframes`
    0% { 
        transform: scale(1); 
        opacity: 1; 
    }
    50% { 
        transform: scale(1.5); 
        opacity: 0.7; 
    }
    100% { 
        transform: scale(2); 
        opacity: 0; 
    }
`; 

export const throwAnimation = (targetX: number, targetY: number, targetIsHost: boolean) => keyframes`
    0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
    }
    25% {
        transform: translate(${targetX * 0.25}px, ${-Math.abs(targetY) * 1.2}px) 
                  rotate(${targetIsHost ? '180deg' : '90deg'}) 
                  scale(${targetIsHost ? 1.1 : 1});
        opacity: ${targetIsHost ? 1 : 0.9};
    }
    50% {
        transform: translate(${targetX * 0.5}px, ${-Math.abs(targetY) * 1.5}px) 
                  rotate(${targetIsHost ? '360deg' : '180deg'}) 
                  scale(${targetIsHost ? 1.3 : 1});
        opacity: ${targetIsHost ? 1 : 0.8};
    }
    75% {
        transform: translate(${targetX * 0.75}px, ${-Math.abs(targetY) * 0.8}px) 
                  rotate(${targetIsHost ? '540deg' : '270deg'}) 
                  scale(${targetIsHost ? 1.4 : 1});
        opacity: ${targetIsHost ? 1 : 0.9};
    }
    100% {
        transform: translate(${targetX}px, ${targetY}px) 
                  rotate(${targetIsHost ? '720deg' : '360deg'}) 
                  scale(${targetIsHost ? 1.5 : 1});
        opacity: 1;
    }
`;

interface ProjectileContainerProps {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    targetIsHost: boolean;
}

export const ProjectileContainer = styled.div<ProjectileContainerProps>`
    position: absolute;
    left: ${props => props.x}px;
    bottom: ${props => props.y}px;
    animation: ${props => throwAnimation(props.targetX - props.x, props.targetY - props.y, props.targetIsHost)} 1s ease-in forwards;
    ${props => props.targetIsHost && `
        animation: ${projectileGlow} 0.5s infinite;
        z-index: 3;
    `}
`;

export const SplatterEffect = styled.div<{ type: ProjectileType; show: boolean }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => {
        switch (props.type) {
            case ProjectileType.TOMATO:
                return 'rgba(255, 99, 71, 0.8)';
            case ProjectileType.ROTTEN_EGG:
                return 'rgba(240, 230, 140, 0.8)';
            case ProjectileType.STONE:
                return 'rgba(128, 128, 128, 0.8)';
            case ProjectileType.CRUMPLED_PAPER:
                return 'rgba(255, 255, 255, 0.8)';
            default:
                return 'rgba(255, 255, 255, 0.8)';
        }
    }};
    animation: ${props => props.show ? splatterAnimation : 'none'} 0.5s ease-out forwards;
    pointer-events: none;
`;

export const StoneProjectile = styled.div<{ targetIsHost?: boolean }>`
    width: ${props => props.targetIsHost ? '14px' : '12px'};
    height: ${props => props.targetIsHost ? '14px' : '12px'};
    background-color: #808080;
    border-radius: 50%;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.3);
    ${props => props.targetIsHost && `
        background-color: #a0a0a0;
        box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.3),
                    0 0 5px rgba(255, 215, 0, 0.5);
    `}
`;

export const TomatoProjectile = styled.div<{ targetIsHost?: boolean }>`
    width: ${props => props.targetIsHost ? '16px' : '14px'};
    height: ${props => props.targetIsHost ? '16px' : '14px'};
    background-color: #ff6347;
    border-radius: 50%;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: 50%;
        width: 4px;
        height: 6px;
        background-color: #228B22;
        transform: translateX(-50%) rotate(15deg);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: 50%;
        width: 4px;
        height: 6px;
        background-color: #228B22;
        transform: translateX(-50%) rotate(-15deg);
    }

    ${props => props.targetIsHost && `
        background-color: #ff4500;
        box-shadow: 0 0 5px rgba(255, 99, 71, 0.5);
    `}
`;

export const RottenEggProjectile = styled.div<{ targetIsHost?: boolean }>`
    width: ${props => props.targetIsHost ? '15px' : '13px'};
    height: ${props => props.targetIsHost ? '18px' : '16px'};
    background-color: #f0e68c;
    border-radius: 50% 50% 45% 45%;
    position: relative;
    transform: rotate(-30deg);
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, #bdb76b 25%, transparent 25%),
                    linear-gradient(-45deg, #bdb76b 25%, transparent 25%);
        background-size: 4px 4px;
        border-radius: inherit;
        opacity: 0.5;
    }

    ${props => props.targetIsHost && `
        background-color: #daa520;
        box-shadow: 0 0 6px rgba(218, 165, 32, 0.6);
    `}
`;

export const CrumpledPaperProjectile = styled.div<{ targetIsHost?: boolean }>`
    width: ${props => props.targetIsHost ? '18px' : '16px'};
    height: ${props => props.targetIsHost ? '18px' : '16px'};
    background-color: #fff;
    position: relative;
    clip-path: polygon(
        50% 0%, 80% 20%, 100% 50%, 80% 80%,
        50% 100%, 20% 80%, 0% 50%, 20% 20%
    );
    
    &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 25%),
                    linear-gradient(-135deg, #f0f0f0 25%, #e0e0e0 25%);
        background-size: 6px 6px;
        clip-path: inherit;
    }

    ${props => props.targetIsHost && `
        background-color: #f8f8f8;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
        &::before {
            background: linear-gradient(135deg, #fff 25%, #f0f0f0 25%),
                        linear-gradient(-135deg, #fff 25%, #f0f0f0 25%);
        }
    `}
`;

export const ProjectileComponents: Record<ProjectileType, React.FC<{targetIsHost?: boolean}>> = {
    [ProjectileType.STONE]: StoneProjectile,
    [ProjectileType.TOMATO]: TomatoProjectile,
    [ProjectileType.ROTTEN_EGG]: RottenEggProjectile,
    [ProjectileType.CRUMPLED_PAPER]: CrumpledPaperProjectile,
};