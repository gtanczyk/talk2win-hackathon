import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    text-shadow: 0 0 10px #0f0;
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 20px #0f0, 0 0 30px #0f0;
  }
  100% {
    transform: scale(1);
    text-shadow: 0 0 10px #0f0;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
  color: #0f0;
  animation: ${pulse} 2s infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Message = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #fff;
  animation: ${fadeIn} 0.5s ease-out 0.3s backwards;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ButtonContainer = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  padding: 20px 40px;
  background-color: transparent;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out 0.6s backwards;

  &:hover {
    background-color: #0f0;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px 30px;
  }
`;

