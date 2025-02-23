import React from 'react';
import '@fontsource/press-start-2p';
import {
  Container,
  Content,
  DefeatTitle,
  DefeatMessage,
  BackButton,
  StarContainer,
  Star,
} from './ScenarioDefeatScreen.styles';

interface ScenarioDefeatScreenProps {
  onBack: () => void;
}

export const ScenarioDefeatScreen: React.FC<ScenarioDefeatScreenProps> = ({
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

        <DefeatTitle>GAME OVER!</DefeatTitle>
        <DefeatMessage>
          Unfortunately, you were not successful in this mission. Try again!
        </DefeatMessage>
        
        <BackButton onClick={onBack}>
          BACK TO SCENARIOS
        </BackButton>
      </Content>
    </Container>
  );
};