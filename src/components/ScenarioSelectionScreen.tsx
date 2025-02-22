import React from 'react';
import styled from 'styled-components';
import { SCENARIOS, ScenarioType } from '../types';
import '@fontsource/press-start-2p';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 40px;
    background-color: #000;
    color: #fff;
    font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h2`
    font-size: 32px;
    text-align: center;
    margin-bottom: 40px;
    text-shadow: 0 0 10px #fff;
`;

const ScenariosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
`;

const ScenarioCard = styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 2px solid #fff;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.disabled ? 0.5 : 1};
    
    &:hover {
        transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
        background-color: ${props => props.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    }
`;

const ScenarioTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 15px;
    color: #0ff;
`;

const ScenarioDescription = styled.p`
    font-size: 12px;
    line-height: 1.6;
    margin: 0;
`;

const BackButton = styled.button`
    font-family: 'Press Start 2P', cursive;
    font-size: 16px;
    padding: 15px 30px;
    margin-top: 40px;
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #fff;
        color: #000;
    }
`;

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