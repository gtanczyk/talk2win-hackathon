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
    text-shadow: 0 0 10px #f00;
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 20px #f00, 0 0 30px #f00;
  }
  100% {
    transform: scale(1);
    text-shadow: 0 0 10px #f00;
  }
`;

const twinkle = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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

export const DefeatTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
  color: #f00;
  animation: ${pulse} 2s infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const DefeatMessage = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #fff;
  animation: ${fadeIn} 0.5s ease-out 0.3s backwards;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BackButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  padding: 20px 40px;
  background-color: transparent;
  color: #f00;
  border: 2px solid #f00;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out 0.6s backwards;

  &:hover {
    background-color: #f00;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px 30px;
  }
`;

export const StarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export const Star = styled.div<{ delay: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #f00;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  animation: ${twinkle} 1.5s infinite ${props => props.delay}s;

  &:nth-child(1) {
    top: 20%;
    left: 20%;
  }

  &:nth-child(2) {
    top: 30%;
    right: 20%;
  }

  &:nth-child(3) {
    bottom: 30%;
    left: 50%;
  }
`;