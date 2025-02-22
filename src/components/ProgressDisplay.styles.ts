import styled, { keyframes } from 'styled-components';

export const progressPulse = keyframes`
  0% { box-shadow: 0 0 5px #0ff; }
  50% { box-shadow: 0 0 15px #0ff; }
  100% { box-shadow: 0 0 5px #0ff; }
`;

export const scoreFlash = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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
`;

export const ProgressBarOuter = styled.div`
  width: 100%;
  height: 24px;
  background-color: #000;
  border: 2px solid #fff;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
`;

export const ProgressBarInner = styled.div<{ progress: number; isHighScore: boolean }>`
  width: ${(props) => Math.min(Math.max(props.progress, 0), 100)}%;
  height: 100%;
  background-color: ${(props) => (props.isHighScore ? '#0f0' : '#0ff')};
  transition: width 0.5s ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
    animation: ${progressPulse} 2s infinite;
  }
`;

export const ProgressText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  text-shadow: 2px 2px #000;
  z-index: 1;
  pointer-events: none;
  line-height: 24px;
  font-weight: bold;
`;

export const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`;

export const ScoreText = styled.span<{ isHighScore?: boolean; isNew?: boolean }>`
  color: ${(props) => (props.isHighScore ? '#0f0' : '#0ff')};
  text-shadow: ${(props) => (props.isHighScore ? '0 0 5px #0f0' : 'none')};
  font-size: ${(props) => (props.isHighScore ? '14px' : '12px')};
  font-weight: ${(props) => (props.isHighScore ? 'bold' : 'normal')};
  animation: ${(props) => (props.isNew ? scoreFlash : 'none')} 0.5s ease-out;

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
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatLabel = styled.span`
  color: #888;
`;

export const StatValue = styled.span<{ highlight?: boolean }>`
  color: ${(props) => (props.highlight ? '#0f0' : '#fff')};
  font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
`;