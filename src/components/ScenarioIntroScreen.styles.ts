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
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 0 0 10px #fff;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #0ff;
  animation: ${fadeIn} 0.5s ease-out 0.2s backwards;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StartButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  padding: 20px 40px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #0ff;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out 0.4s backwards;

  &:hover {
    background-color: #0ff;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px 30px;
  }
`;