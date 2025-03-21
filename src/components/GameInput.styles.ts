import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
