import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
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

export const MicrophoneButton = styled.button<{ isListening: boolean }>`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: ${props => (props.isListening ? '#ff0000' : '#0ff')};
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

  ${props =>
    props.isListening &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}

  &:hover {
    background-color: ${props => (props.isListening ? '#ff3333' : '#fff')};
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