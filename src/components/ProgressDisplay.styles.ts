import styled, { keyframes } from 'styled-components';

const progressLoop = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const progressPulse = keyframes`
  0% { box-shadow: 0 0 5px #0ff; }
  50% { box-shadow: 0 0 15px #0ff, 0 0 30px #0ff; }
  100% { box-shadow: 0 0 5px #0ff; }
`;

const scoreFlash = keyframes`
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.5); }
  100% { transform: scale(1); filter: brightness(1); }
`;

const borderGlow = keyframes`
  0% { border-color: #0ff; }
  50% { border-color: #0088ff; }
  100% { border-color: #0ff; }
`;

const scanline = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const glitch = keyframes`
  0% { clip-path: inset(50% 0 30% 0); }
  20% { clip-path: inset(20% 0 60% 0); }
  40% { clip-path: inset(40% 0 40% 0); }
  60% { clip-path: inset(80% 0 5% 0); }
  80% { clip-path: inset(10% 0 85% 0); }
  100% { clip-path: inset(40% 0 50% 0); }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #0ff;
  border-radius: 4px;
  position: relative;
  animation: ${borderGlow} 2s infinite;
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 5px;
    background: linear-gradient(45deg, #0ff, transparent);
    opacity: 0.3;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0ff, transparent);
    animation: ${scanline} 2s linear infinite;
  }
`;

export const ProgressBarOuter = styled.div`
  width: 100%;
  height: 24px;
  background-color: #000;
  border: 2px solid #fff;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 45%, rgba(0, 255, 255, 0.1) 50%, transparent 55%);
    background-size: 200% 200%;
    animation: ${scanline} 3s linear infinite;
  }
`;

export const ProgressBarInner = styled.div<{ progress: number; isHighScore: boolean }>`
  width: ${(props) => Math.min(Math.max(props.progress, 0), 100)}%;
  height: 100%;
  background: ${(props) => props.isHighScore ? 
    'linear-gradient(90deg, #0f0, #0ff, #0f0)' : 
    'linear-gradient(90deg, #0ff, #0088ff, #0ff)'};
  background-size: 200% 100%;
  transition: width 1s ease-out;
  position: relative;
  animation: ${progressLoop} 2s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 1.5s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 15px ${props => props.isHighScore ? '#0f0' : '#0ff'};
    animation: ${progressPulse} 2s infinite;
  }
`;

export const ProgressText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
  z-index: 1;
  pointer-events: none;
  line-height: 24px;
  font-weight: bold;
  font-family: 'Press Start 2P', monospace;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${glitch} 2s infinite;
    opacity: 0.5;
  }
`;

export const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(45deg);
    animation: ${scanline} 3s linear infinite;
  }
`;

export const ScoreText = styled.span<{ isHighScore?: boolean; isNew?: boolean }>`
  color: ${(props) => (props.isHighScore ? '#0f0' : '#0ff')};
  text-shadow: ${(props) => (props.isHighScore ? '0 0 5px #0f0, 0 0 10px #0f0' : '0 0 5px #0ff')};
  font-size: ${(props) => (props.isHighScore ? '14px' : '12px')};
  font-weight: ${(props) => (props.isHighScore ? 'bold' : 'normal')};
  animation: ${(props) => (props.isNew ? scoreFlash : 'none')} 0.5s ease-out;
  font-family: 'Press Start 2P', monospace;

  &::before {
    content: ${(props) => (props.isHighScore ? '"★ "' : '""')};
  }
`;

export const ProgressStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  font-size: 10px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0ff, transparent);
    animation: ${scanline} 2s linear infinite;
  }
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 4px 8px;
  
  &:hover {
    background: rgba(0, 255, 255, 0.05);
  }
`;

export const StatLabel = styled.span`
  color: #888;
  transition: color 0.2s ease;

  ${StatRow}:hover & {
    color: #0ff;
  }
`;

export const StatValue = styled.span<{ highlight?: boolean }>`
  color: ${(props) => (props.highlight ? '#0f0' : '#fff')};
  font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
  text-shadow: ${(props) => (props.highlight ? '0 0 5px #0f0' : 'none')};
  transition: all 0.2s ease;

  ${StatRow}:hover & {
    transform: scale(1.05);
  }
`;