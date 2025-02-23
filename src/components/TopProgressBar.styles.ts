import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #0ff; }
  50% { box-shadow: 0 0 15px #0ff; }
  100% { box-shadow: 0 0 5px #0ff; }
`;

export const TopProgressBarContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  z-index: 1000;
  font-family: 'Press Start 2P', cursive;
`;

export const ProgressBarOuter = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #0ff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 1px solid #fff;
    pointer-events: none;
  }

  animation: ${glowAnimation} 2s infinite;
`;

export const ProgressBarInner = styled.div<{ progress: number }>`
  width: ${(props) => Math.min(Math.max(props.progress, 0), 100)}%;
  height: 100%;
  background-color: #0ff;
  transition: width 0.3s ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  }
`;

export const ProgressText = styled.div`
  position: fixed;
  top: 10px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 10px;
  line-height: 20px;
  text-shadow: 2px 2px #000;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: difference;
`;
