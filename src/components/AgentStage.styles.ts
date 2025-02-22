
import styled, { keyframes, css } from 'styled-components';
import { ScenarioType } from '../types';

const cloudMove = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 0;
  }
`;

export const flagWave = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.15; }
  100% { opacity: 0.1; }
`;

const windowLightPulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 0.6; }
  100% { opacity: 0.4; }
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

const spotlightSweep = keyframes`
  0% { opacity: 0.3; transform: translateX(-100%) rotate(-45deg); }
  50% { opacity: 0.7; transform: translateX(0) rotate(0deg); }
  100% { opacity: 0.3; transform: translateX(100%) rotate(45deg); }
`;

interface StageProps {
  scenarioType: ScenarioType;
}

// Office background components
export const OfficeWall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%);
  z-index: 1;
`;

export const  OfficeFloor = styled.div`
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

export const OfficeWindow = styled.div`
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

export const WindowLight = styled.div`
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

export const OfficeDesk = styled.div`
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

export const Computer = styled.div`
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

export const OfficeChair = styled.div`
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

export const Plant = styled.div`
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


export const Stage = styled.div<StageProps>`
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 600px;
  overflow: hidden;

  ${({ scenarioType }) => {
    switch (scenarioType) {
      case ScenarioType.WARRIORS_TO_BATTLE:
        return css`
          background: \n            /* Sky gradient */\n            linear-gradient(\n              to bottom,\n              #87CEEB 0%,    /* Light sky blue */\n              #4682B4 30%,    /* Darker sky blue */\n              #90EE90 30%,   /* Light green */\n              #228B22 100%   /* Forest green */\n            );\n          background-blend-mode: normal;\n          \n          /* Subtle cloud effect */\n          &::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 60%;\n            background: linear-gradient(\n              to bottom,\n              rgba(255, 255, 255, 0.1) 0%,\n              transparent 100%\n            );\n            animation: ${cloudMove} 60s linear infinite;\n            pointer-events: none;\n          }\n\n          /* Ground texture */\n          &::after {\n            content: '';\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            height: 40%;\n            background: linear-gradient(\n              to bottom,\n              transparent,\n              rgba(0, 100, 0, 0.1)\n            );\n            pointer-events: none;\n          }\n        `;

      case ScenarioType.ANNOUNCE_LAYOFFS:
        return css`
          position: relative;\n          \n          /* Base office components */\n          ${OfficeWall} {\n            opacity: 1;
          }\n          \n          /* Windows */\n          ${OfficeWindow}:first-of-type {\n            left: 6.25%;\n            top: 8.33%;\n          }\n          \n          ${OfficeWindow}:last-of-type {\n            left: 37.5%;\n            top: 8.33%;\n          }\n          \n          /* Window light effect */\n          ${WindowLight} {\n            opacity: 0.5;
          }\n          \n          /* Desks */\n          ${OfficeDesk}:first-of-type {\n            left: 12.5%;\n            bottom: 33.33%;\n          }\n          \n          ${OfficeDesk}:last-of-type {\n            left: 50%;\n            bottom: 33.33%;\n          }\n          \n          /* Office ambiance */\n          &::after {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: linear-gradient(\n              to bottom,\n              rgba(0, 0, 50, 0.05) 0%,\n              rgba(0, 0, 50, 0.02) 100%\n            );\n            pointer-events: none;\n            z-index: 10;\n          }\n        `;

        case ScenarioType.POLITICAL_RALLY:
          return css`
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

          /* Campaign Sign on Podium */
          > .podium-sign {
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
          }

          /* Crowd (simplified) */
          > .crowd {
            position: absolute;
            top: 10%;
            left: 5%;
            right: 5%;
            bottom: 40%; /* Above stage */
            display: grid;
            grid-template-columns: repeat(auto-fill, 20px); /* Small crowd elements */
            grid-gap: 5px;
            z-index: 2;
          }

          > .crowd > div {
            width: 20px;
            height: 20px;
            background-color: rgba(200, 200, 200, 0.7); /* Light grey for faces */
            border-radius: 50%;
            box-shadow: 0px 2px 4px rgba(0,0,0,0.2); /* Crowd depth */
          }

          /* Campaign Banners */
          > .banner {
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
          }

          > .banner.left { left: 10%; }
          > .banner.right { right: 10%; }

          /* Spotlights */
          > .spotlight {
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%);
            opacity: 0.3;
            z-index: 4;
            pointer-events: none; /* Click-through */
            animation: ${spotlightSweep} 10s infinite; /* Sweep animation */
          }

           /* Presidential Seal */
           > .presidential-seal {
              position: absolute;
              left: 50%;
              bottom: calc(30% + 95px); /* Adjust as needed */
              transform: translateX(-50%);
              width: 40px;  /* Adjust size as needed */
              height: 40px; /* Adjust size as needed */
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%231f618d" /><text x="50" y="60" font-family="Arial" font-size="10" fill="white" text-anchor="middle">SEAL</text></svg>') no-repeat center center; /* Placeholder */
              background-size: cover;
              z-index: 12;
           }

           /* Microphones */
          > .microphones {
            position: absolute;
            left: 50%;
            bottom: calc(30% + 40px); /* Adjust based on podium height */
            transform: translateX(-50%);
            width: 30px;
            height: 40px; /* Extend above podium */
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 40"><rect x="10" y="0" width="10" height="30" fill="%23333" /><circle cx="15" cy="35" r="4" fill="%23333" /></svg>') no-repeat center center;  /* Basic mic shape */
            background-size: cover;
            z-index: 13;
          }

          /* Confetti (animated) */
          > .confetti {
            position: absolute;
            width: 5px;
            height: 10px;
            background-color: #f1c40f; /* Example color */
            opacity: 0;
            z-index: 1;
            pointer-events: none; /* Click-through */
            animation: ${confettiFall} 3s linear infinite; /* Fall animation */
          }
        `;

      default:
        return 'background: rgba(0, 0, 0, 0.2);'; // Default background
    }
  }}
`;
