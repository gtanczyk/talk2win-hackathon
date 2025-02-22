import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const floatFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100px) scale(0.5);
  }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 9000;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
`;

export const StatusText = styled.span`
  font-size: 14px;
  color: #0ff;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
  font-weight: 500;
  position: relative;
  z-index: 9001;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 9001;
`;

export const TextInput = styled.input`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 12px 15px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: 2px solid #0ff;
  flex: 1;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  transition: all 0.2s ease;
  position: relative;
  z-index: 9001;

  &:focus {
    border-color: #fff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
    background-color: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    border-color: #666;
  }

  &::placeholder {
    color: rgba(0, 255, 255, 0.5);
  }
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
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 0 10px ${(props) => (props.isListening ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 255, 0.3)')};
  position: relative;
  z-index: 9001;

  ${(props) =>
    props.isListening &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}

  &:hover {
    background-color: ${(props) => (props.isListening ? '#ff3333' : '#fff')};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
    animation: none;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff3333;
  font-size: 12px;
  margin-top: 5px;
  padding: 4px 8px;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 4px;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.3);
  position: relative;
  z-index: 9001;
`;

export const FloatingText = styled.div`
  position: fixed;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  pointer-events: none;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(0, 255, 255, 0.3);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.6)
  );
  padding: 10px 20px;
  border-radius: 8px;
  white-space: nowrap;
  z-index: 9999;
  animation: 3s ${floatFadeOut} 3s ease-out forwards;
  backdrop-filter: blur(4px);
`;