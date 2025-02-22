import React from 'react';
import { SCENARIOS, ScenarioType } from '../types';
import '@fontsource/press-start-2p';
import {
    Container,
    Title,
    ScenariosGrid,
    ScenarioCard,
    ScenarioTitle,
    ScenarioDescription,
    BackButton
} from './ScenarioSelectionScreen.styles';

interface ScenarioSelectionScreenProps {
    onScenarioSelect: (scenario: ScenarioType) => void;
    onBack: () => void;
}

export const ScenarioSelectionScreen: React.FC<ScenarioSelectionScreenProps> = ({
    onScenarioSelect,
    onBack
}) => {
    return (
        <Container>
            <Title>Select Scenario</Title>
            <ScenariosGrid>
                {SCENARIOS.map((scenario) => (
                    <ScenarioCard 
                        key={scenario.type}
                        onClick={() => scenario.type !== ScenarioType.CREATE_YOUR_OWN && onScenarioSelect(scenario.type)}
                        disabled={scenario.type === ScenarioType.CREATE_YOUR_OWN}
                    >
                        <ScenarioTitle>{scenario.title}</ScenarioTitle>
                        <ScenarioDescription>{scenario.description}</ScenarioDescription>
                    </ScenarioCard>
                ))}
            </ScenariosGrid>
            <BackButton onClick={onBack}>
                BACK
            </BackButton>
        </Container>
    );
};