import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff; }
  50% { box-shadow: 0 0 10px #0088ff, 0 0 20px #0088ff, 0 0 30px #0088ff; }
  100% { box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff; }
`;

const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const glowEffect = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const NotificationBadge = styled.div<{ count: number }>`
  position: absolute;
  top: -8px;
  left: -2px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #0ff;
  color: #000;
  border-radius: 10px;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${({ count }) => (count > 0 ? 1 : 0)};
  transform: ${({ count }) => (count > 0 ? 'scale(1)' : 'scale(0.5)')};
  pointer-events: none;
  z-index: 1002;
  box-shadow: 0 0 10px #0ff,
              0 0 20px rgba(0, 255, 255, 0.5);
  animation: ${pulseAnimation} 2s infinite ease-in-out;

  &:hover {
    background: #0088ff;
    box-shadow: 0 0 15px #0088ff,
                0 0 30px rgba(0, 136, 255, 0.5);
  }

  @media (max-width: 768px) {
    top: -6px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    font-size: 9px;
  }
`;

// Components
export const ScrollIndicator = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 255, 255, 0.2);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'scale(1)' : 'scale(0.8)'};
  transition: all 0.3s ease;
  z-index: 1002;

  &:hover {
    background: rgba(0, 255, 255, 0.4);
  }

  &::after {
    content: '↓';
    color: #fff;
    font-size: 16px;
  }
`;

export const ChatContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-320px')};
  top: 60px;
  width: 320px;
  height: calc(100vh - 160px);
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-left: 2px solid #0ff;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  }
`;

export const ChatButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '320px' : '0')};
  top: 50%;
  transform: translateY(-50%);
  background-color: #0ff;
  border: none;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1001;
  display: flex;
  align-items: center;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);

  @media (max-width: 768px) {
    right: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  }

  &:hover {
    background-color: #0088ff;
    box-shadow: 0 0 20px rgba(0, 136, 255, 0.4);
  }

  &:before {
    content: ${({ isOpen }) => (isOpen ? '"×"' : '"☰"')};
    font-size: 20px;
    margin-right: ${({ isOpen }) => (isOpen ? '0' : '8px')};
  }
`;

export const Header = styled.div`
  padding: 12px;
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 0.9) 0%,
    rgba(0, 255, 255, 1) 50%,
    rgba(0, 255, 255, 0.9) 100%
  );
  color: #000;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid #0ff;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 255, 255, 0.5);
    animation: ${scanlineAnimation} 2s linear infinite;
    opacity: 0.5;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 136, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    animation: ${glowAnimation} 2s infinite;
    &:after {
      left: 100%;
    }
  }
`;

export const HeaderTitle = styled.span`
  position: relative;
  z-index: 2;
  
  &:before, &:after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &:before {
    transform: translateX(-1px);
    color: #0ff;
  }

  &:after {
    transform: translateX(1px);
    color: #0088ff;
  }

  ${Header}:hover &:before {
    transform: translateX(-2px);
    opacity: 0.8;
  }

  ${Header}:hover &:after {
    transform: translateX(2px);
    opacity: 0.8;
  }
`;

export const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  perspective: 1000px;
  scroll-behavior: smooth;
  min-height: 0;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0ff, #0088ff);
    border-radius: 3px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #0088ff, #0ff);
  }
`;

export const MessageItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  min-width: 0;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;

  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.4);
    transform: translateX(-2px);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, #0ff, #0088ff);
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }

  &:hover:after {
    transform: scaleY(1);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 255, 255, 0) 0%,
      rgba(0, 255, 255, 0.1) 50%,
      rgba(0, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: ${glowEffect} 1.5s linear infinite;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export const MessageText = styled.div`
  color: white;
  word-wrap: break-word;
  white-space: pre-wrap;
  transition: all 0.2s ease;
  padding: 4px 0;
  line-height: 1.6;
  width: 100%;
  min-width: 0;
  font-size: 11px;
  
  ${MessageItem}:hover & {
    transform: translateX(2px);
  }
`;

export const AgentId = styled.div`
  color: #0ff;
  margin-bottom: 4px;
  font-size: 8px;
  transition: all 0.2s ease;
  
  ${MessageItem}:hover & {
    color: #0088ff;
    transform: translateX(4px);
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
  }
`;

export const Timestamp = styled.div`
  color: #888;
  font-size: 8px;
  margin-top: 4px;
  text-align: right;
  transition: all 0.2s ease;
  
  ${MessageItem}:hover & {
    color: #0ff;
    transform: translateX(-2px);
  }
`;

// Optional: Add input area components if needed
export const InputArea = styled.div`
  padding: 16px;
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  display: flex;
  gap: 8px;
`;

export const Input = styled.textarea`
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  resize: none;
  min-height: 40px;
  
  &:focus {
    outline: none;
    border-color: #0ff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  }
`;

export const SendButton = styled.button`
  background: #0ff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  color: black;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0088ff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
`;