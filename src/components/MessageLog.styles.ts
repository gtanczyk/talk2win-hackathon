import styled, { keyframes } from 'styled-components';

const moveUpAndFade = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

export const MessageContainer = styled.div`
  position: fixed;
  bottom: 120px; /* Position above the input container */
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* Allow clicking through the messages */
  z-index: 1000;
  padding: 20px;
  gap: 10px; /* Space between messages */
`;

export const Message = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 16px;
  text-align: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  animation: 3s ${moveUpAndFade} 5s ease-out forwards;
  max-width: 600px;
  word-wrap: break-word; /* Handle long words */
`;
