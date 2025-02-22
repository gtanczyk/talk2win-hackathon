import React from 'react';
import '@fontsource/press-start-2p';
import {
  Container,
  Content,
  GameOverTitle,
  GameOverMessage,
  RetryButton,
  BackButton,
} from './GameOverScreen.styles';

interface GameOverScreenProps {
  onRetry: () => void;
  onBack: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  onRetry,
  onBack,
}) => {
  return (
    <Container>
      <Content>
        <GameOverTitle>GAME OVER</GameOverTitle>
        <GameOverMessage>
          Your progress has reached 0%. The crowd is not responding well to your approach.
        </GameOverMessage>
        
        <RetryButton onClick={onRetry}>
          TRY AGAIN
        </RetryButton>
        
        <BackButton onClick={onBack}>
          BACK TO SCENARIOS
        </BackButton>
      </Content>
    </Container>
  );
};