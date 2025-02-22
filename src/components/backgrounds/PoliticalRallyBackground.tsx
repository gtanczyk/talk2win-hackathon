import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const spotlightSweep = keyframes`
  0% { opacity: 0.3; transform: translateX(-100%) rotate(-45deg); }
  50% { opacity: 0.7; transform: translateX(0) rotate(0deg); }
  100% { opacity: 0.3; transform: translateX(100%) rotate(45deg); }
`;

const confettiFall = keyframes`
  from {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateY(0) rotate(720deg);
    opacity: 0;
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #2c3e50 0%, #4ca1af 100%); /* Dark auditorium */

  /* Stage Platform */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%; /* Stage height */
    background: #c0392b; /* Red stage */
    border-top: 5px solid #922b21; /* Darker trim */
    box-shadow: 0px -10px 20px rgba(0,0,0,0.4); /* Subtle shadow */
    z-index: 5;
  }

  /* Podium */
  &::after {
    content: '';
    position: absolute;
    bottom: 30%; /* Align with stage */
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 120px;
    background: #2980b9; /* Blue podium */
    border: 3px solid #1f618d;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
    z-index: 10;
  }
`;

const PodiumSign = styled.div`
  position: absolute;
  bottom: 35%; /* Position on podium */
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 5px 10px;
  border: 2px solid #1f618d;
  border-radius: 5px;
  font-size: 14px;
  color: #c0392b;
  z-index: 11;
  text-transform: uppercase;
  font-weight: bold;
`;

const CrowdContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  right: 5%;
  bottom: 40%; /* Above stage */
  display: grid;
  grid-template-columns: repeat(auto-fill, 20px); /* Small crowd elements */
  grid-gap: 5px;
  z-index: 2;
`;

const CrowdMember = styled.div`
  width: 20px;
  height: 20px;
  background-color: rgba(200, 200, 200, 0.7); /* Light grey for faces */
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2); /* Crowd depth */
`;

const Banner = styled.div`
  position: absolute;
  top: 10%;
  width: 150px;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  color: #c0392b;
  border: 2px solid #1f618d;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  z-index: 3;

  &.left { left: 10%; }
  &.right { right: 10%; }
`;

const Spotlight = styled.div`
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%);
  opacity: 0.3;
  z-index: 4;
  pointer-events: none;
  animation: ${spotlightSweep} 10s infinite;
`;

const PresidentialSeal = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(30% + 95px);
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%231f618d" /><text x="50" y="60" font-family="Arial" font-size="10" fill="white" text-anchor="middle">SEAL</text></svg>') no-repeat center center;
  background-size: cover;
  z-index: 12;
`;

const Microphones = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(30% + 40px);
  transform: translateX(-50%);
  width: 30px;
  height: 40px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 40"><rect x="10" y="0" width="10" height="30" fill="%23333" /><circle cx="15" cy="35" r="4" fill="%23333" /></svg>') no-repeat center center;
  background-size: cover;
  z-index: 13;
`;

const Confetti = styled.div`
  position: absolute;
  width: 5px;
  height: 10px;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  animation: ${confettiFall} 3s linear infinite;
`;

export const PoliticalRallyBackground: React.FC = () => {
  // Generate crowd grid
  const crowdElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < 100; i++) {
      elements.push(
        <CrowdMember
          key={`crowd-${i}`}
          style={{
            opacity: Math.random() * 0.5 + 0.5,
            transform: `scale(${Math.random() * 0.3 + 0.7})`,
          }}
        />
      );
    }
    return elements;
  }, []);

  // Generate confetti elements
  const confettiElements = useMemo(() => {
    const elements = [];
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
    for (let i = 0; i < 50; i++) {
      elements.push(
        <Confetti
          key={`confetti-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      );
    }
    return elements;
  }, []);

  return (
    <BackgroundContainer>
      <CrowdContainer>
        {crowdElements}
      </CrowdContainer>

      <Banner className="left">VOTE 2025</Banner>
      <Banner className="right">VICTORY!</Banner>

      <Spotlight style={{ left: '20%' }} />
      <Spotlight style={{ left: '80%' }} />

      <PodiumSign>VICTORY 2025</PodiumSign>
      <PresidentialSeal />
      <Microphones />

      {confettiElements}
    </BackgroundContainer>
  );
};

// Enable debugging in development
if (process.env.NODE_ENV === 'development') {
  PoliticalRallyBackground.displayName = 'PoliticalRallyBackground';
}