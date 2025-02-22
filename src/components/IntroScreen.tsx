import React from 'react';
import '@fontsource/press-start-2p';
import { Container, Title, StartButton } from './IntroScreen.styles';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <Container>
      <Title>TALK 2 WIN</Title>
      <StartButton onClick={onStart}>START</StartButton>
    </Container>
  );
};
