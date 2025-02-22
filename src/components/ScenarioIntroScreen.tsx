import React from 'react';
import { ScenarioType, SCENARIOS } from '../types';
import '@fontsource/press-start-2p';
import {
  Container,
  Title,
  Description,
  StartButton,
  Content,
} from './ScenarioIntroScreen.styles';

interface ScenarioIntroScreenProps {
  scenarioType: ScenarioType;
  onStartGame: () => void;
}

export const ScenarioIntroScreen: React.FC<ScenarioIntroScreenProps> = ({
  scenarioType,
  onStartGame,
}) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);

  if (!scenario) {
    return null;
  }

  return (
    <Container>
      <Content>
        <Title>{scenario.title}</Title>
        <Description>{scenario.description}</Description>
        <StartButton onClick={onStartGame}>START MISSION</StartButton>
      </Content>
    </Container>
  );
};