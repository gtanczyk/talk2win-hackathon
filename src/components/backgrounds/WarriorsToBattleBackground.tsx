import React from 'react';
import styled, { keyframes } from 'styled-components';

const cloudMove = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 0;
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Sky gradient */
  background: linear-gradient(
    to bottom,
    #87CEEB 0%,    /* Light sky blue */
    #4682B4 30%,   /* Darker sky blue */
    #90EE90 30%,   /* Light green */
    #228B22 100%   /* Forest green */
  );
  background-blend-mode: normal;
  
  /* Subtle cloud effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 100%
    );
    animation: ${cloudMove} 60s linear infinite;
    pointer-events: none;
  }

  /* Ground texture */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 100, 0, 0.1)
    );
    pointer-events: none;
  }
`;

export const WarriorsToBattleBackground: React.FC = () => {
  return <BackgroundContainer />;
};

// Enable debugging in development
if (process.env.NODE_ENV === 'development') {
  WarriorsToBattleBackground.displayName = 'WarriorsToBattleBackground';
}