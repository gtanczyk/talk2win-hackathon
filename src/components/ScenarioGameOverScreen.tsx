import React from 'react';
import { Container, Title, Message, ButtonContainer } from './ScenarioGameOverScreen.styles';

interface ScenarioGameOverScreenProps {
 onBack: () => void;
}

export const ScenarioGameOverScreen: React.FC<ScenarioGameOverScreenProps> = ({ onBack }) => {
 return (
 <Container>
 <Title>Game Over</Title>
 <Message>Time's up! Better luck next time.</Message>
 <ButtonContainer  onClick={onBack}>
        Back to Main Menu
 </ButtonContainer>
 </Container>
 );
};
