import React from 'react';
import '@fontsource/press-start-2p';
import {
  Container,
  Content,
  VictoryTitle,
  VictoryMessage,
  BackButton,
  StarContainer,
  Star,
} from './ScenarioVictoryScreen.styles';

interface ScenarioVictoryScreenProps {
  onBack: () => void;
}

export const ScenarioVictoryScreen: React.FC<ScenarioVictoryScreenProps> = ({
  onBack,
}) => {
  return (
    <Container>
      <Content>
        {/* Add decorative stars */}
        <StarContainer>
          <Star delay={0} />
          <Star delay={0.2} />
          <Star delay={0.4} />
        </StarContainer>

        <VictoryTitle>VICTORY!</VictoryTitle>
        <VictoryMessage>
          Congratulations! You have achieved 100% success in this mission!
        </VictoryMessage>
        
        <BackButton onClick={onBack}>
          BACK TO SCENARIOS
        </BackButton>
      </Content>
    </Container>
  );
};