import React, { useState, useEffect } from 'react';
import { ProjectileType } from '../types';
import {
    ProjectileContainer,
    SplatterEffect,
    ProjectileComponents
} from './Projectile.styles';

interface ProjectileProps {
    type: ProjectileType;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    targetIsHost?: boolean;
    onAnimationEnd?: () => void;
}

export const Projectile: React.FC<ProjectileProps> = ({
    type,
    x,
    y,
    targetX,
    targetY,
    targetIsHost = false,
    onAnimationEnd
}) => {
    const [showSplatter, setShowSplatter] = useState(false);
    const ProjectileComponent = ProjectileComponents[type];

    useEffect(() => {
        // Set up the animation end handler
        const handleAnimationEnd = () => {
            setShowSplatter(true);
            setTimeout(() => {
                if (onAnimationEnd) {
                    onAnimationEnd();
                }
            }, 500); // Wait for splatter animation to complete
        };

        // Trigger the splatter effect when the projectile reaches its target
        const animationDuration = 1000; // 1s for throw animation
        const timer = setTimeout(handleAnimationEnd, animationDuration);

        return () => {
            clearTimeout(timer);
        };
    }, [onAnimationEnd]);

    return (
        <ProjectileContainer
            x={x}
            y={y}
            targetX={targetX}
            targetY={targetY}
            targetIsHost={targetIsHost}
        >
            <ProjectileComponent targetIsHost={targetIsHost} />
            <SplatterEffect type={type} show={showSplatter} />
        </ProjectileContainer>
    );
};

;