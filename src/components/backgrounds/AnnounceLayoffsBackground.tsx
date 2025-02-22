import React from 'react';
import styled, { keyframes } from 'styled-components';

const windowLightPulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 0.6; }
  100% { opacity: 0.4; }
`;

// Office background components
const OfficeWall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%);
  z-index: 1;
`;

const OfficeFloor = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: repeating-conic-gradient(
    from 0deg,
    #D3D3D3 0deg 90deg,
    #C8C8C8 90deg 180deg
  ) 50% 50% / 50px 50px;
  z-index: 2;
`;

const OfficeWindow = styled.div`
  position: absolute;
  width: 25%;
  height: 50%;
  background: #A5D6FF;
  border: 10px solid #666;
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 10px;
    height: 100%;
    background: #666;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 10px;
    background: #666;
    transform: translateY(-50%);
  }
`;

const WindowLight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: ${windowLightPulse} 4s ease-in-out infinite;
  z-index: 2;
`;

const OfficeDesk = styled.div`
  position: absolute;
  width: 25%;
  height: 10%;
  background: #8B4513;
  border: 2px solid #5C2C0C;
  z-index: 4;

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -13.33%;
    width: 5%;
    height: 133.33%;
    background: #8B4513;
  }

  &::before {
    left: 5%;
  }

  &::after {
    right: 5%;
  }
`;

const Computer = styled.div`
  position: absolute;
  width: 70%;
  height: 150%;
  background: #333;
  border: 2px solid #222;
  top: -150%;
  left: 15%;
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 28.57%;
    height: 11.11%;
    background: #222;
  }

  &::after {
    content: '';
    position: absolute;
    top: 22.22%;
    left: 14.29%;
    width: 71.43%;
    height: 66.67%;
    background: #87CEEB;
  }
`;

const OfficeChair = styled.div`
  position: absolute;
  width: 40%;
  height: 5%;
  background: #333;
  bottom: -20%;
  left: 30%;
  z-index: 6;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 25%;
    height: 600%;
    background: #333;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -700%;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #222;
    border-radius: 50%;
  }
`;

const Plant = styled.div`
  position: absolute;
  width: 40px;
  height: 60px;
  background: #654321;
  bottom: 30%;
  right: 10%;
  z-index: 7;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: #228B22;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -10px;
    width: 50px;
    height: 50px;
    background: #32CD32;
    border-radius: 50%;
    box-shadow: 60px 0 0 #32CD32;
  }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Office ambiance */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 50, 0.05) 0%,
      rgba(0, 0, 50, 0.02) 100%
    );
    pointer-events: none;
    z-index: 10;
  }
`;

export const AnnounceLayoffsBackground: React.FC = () => {
  return (
    <BackgroundContainer>
      <OfficeWall />
      <OfficeFloor />
      <WindowLight />
      <div className="relative" style={{ zIndex: 2 }}>
        <OfficeWindow style={{ left: '6.25%', top: '8.33%' }} />
        <OfficeWindow style={{ left: '37.5%', top: '8.33%' }} />
      </div>
      <div className="relative" style={{ zIndex: 3 }}>
        <OfficeDesk style={{ left: '12.5%', bottom: '33.33%' }}>
          <Computer />
          <OfficeChair />
        </OfficeDesk>
        <OfficeDesk style={{ left: '50%', bottom: '33.33%' }}>
          <Computer />
          <OfficeChair />
        </OfficeDesk>
      </div>
      <Plant style={{ zIndex: 4 }} />
    </BackgroundContainer>
  );
};

// Enable debugging in development
if (process.env.NODE_ENV === 'development') {
  AnnounceLayoffsBackground.displayName = 'AnnounceLayoffsBackground';
}