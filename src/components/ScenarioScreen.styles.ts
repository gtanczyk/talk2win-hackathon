import styled, { css, keyframes } from 'styled-components';

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #fff;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #0ff;
`;

export const BackButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export const Stage = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

export const PlaceholderText = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
  color: #888;
`;

export const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  border-top: 2px solid #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const StatusText = styled.span`
  font-size: 14px;
  color: #0ff;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;

export const TextInput = styled.input`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: 2px solid #0ff;
  flex: 1;
  outline: none;

  &:focus {
    border-color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px 20px;
  background-color: #0ff;
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
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

export const MicrophoneButton = styled.button<{ isListening: boolean }>`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: ${(props) => (props.isListening ? '#ff0000' : '#0ff')};
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${(props) =>
    props.isListening &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}

  &:hover {
    background-color: ${(props) => (props.isListening ? '#ff3333' : '#fff')};
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
    animation: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
`;