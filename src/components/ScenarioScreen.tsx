import React from 'react';
import styled from 'styled-components';
import { ScenarioType, SCENARIOS } from '../types';
import '@fontsource/press-start-2p';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
    background-color: #000;
    color: #fff;
    font-family: 'Press Start 2P', cursive;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid #fff;
`;

const Title = styled.h2`
    font-size: 24px;
    margin: 0;
    color: #0ff;
`;

const BackButton = styled.button`
    font-family: 'Press Start 2P', cursive;
    font-size: 16px;
    padding: 10px 20px;
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

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
`;

const PlaceholderText = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 20px 0;
    color: #888;
`;

const StatusBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.9);
    border-top: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StatusText = styled.span`
    font-size: 14px;
    color: #0ff;
`;

interface ScenarioScreenProps {
    scenarioType: ScenarioType;
    onBack: () => void;
}

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({
    scenarioType,
    onBack
}) => {
    const scenario = SCENARIOS.find(s => s.type === scenarioType);

    if (!scenario) {
        return <Container>
            <PlaceholderText>Error: Scenario not found</PlaceholderText>
            <BackButton onClick={onBack}>BACK</BackButton>
        </Container>;
    }

    return (
        <Container>
            <Header>
                <Title>{scenario.title}</Title>
                <BackButton onClick={onBack}>BACK</BackButton>
            </Header>
            
            <Content>
                <PlaceholderText>
                    {scenario.description}
                </PlaceholderText>
                <PlaceholderText>
                    Microphone input and speech-to-text conversion will be implemented here.
                </PlaceholderText>
            </Content>

            <StatusBar>
                <StatusText>Ready to start speaking...</StatusText>
            </StatusBar>
        </Container>
    );
};