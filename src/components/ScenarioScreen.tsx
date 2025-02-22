import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ScenarioType, SCENARIOS, Agent } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { Agent as AgentComponent } from './Agent';
import { getResponse } from '../engine/Gemini';

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

const Stage = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
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
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StatusText = styled.span`
  font-size: 14px;
  color: #0ff;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;

const TextInput = styled.input`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: 2px solid #0ff;
  flex: 1;
  outline: none;

  &:focus {
    border-color: #fff;
  }
`;

const SubmitButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px 20px;
  background-color: #0ff;
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

interface ScenarioScreenProps {
  scenarioType: ScenarioType;
  onBack: () => void;
}

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({ scenarioType, onBack }) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  const engineRef = useRef<ScenarioEngine | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const animationFrameRef = useRef<number>();

  if (!scenario) {
    return (
      <Container>
        <PlaceholderText>Error: Scenario not found</PlaceholderText>
        <BackButton onClick={onBack}>BACK</BackButton>
      </Container>
    );
  }

  useEffect(() => {
    // Initialize the engine
    engineRef.current = new ScenarioEngine(scenarioType);
    setAgents(engineRef.current.getAgents());

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      engineRef.current = null;
    };
  }, [scenarioType]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim() || !engineRef.current || isLoading) return;

    setIsLoading(true);
    try {
      // Get current agents state
      const currentAgents = engineRef.current.getAgents();
      
      // Pass current agents to getResponse
      const response = await getResponse(userInput, currentAgents);
      
      if (response && response.agents) {
        engineRef.current.update(0, response.agents);
        setAgents(engineRef.current.getAgents());
      }
      
      setUserInput('');
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Container>
      <Header>
        <Title>{scenario.title}</Title>
        <BackButton onClick={onBack}>BACK</BackButton>
      </Header>

      <Content>
        <PlaceholderText>{scenario.description}</PlaceholderText>
        <Stage>
          {agents.map((agent) => (
            <AgentComponent key={agent.id} {...agent} />
          ))}
        </Stage>
      </Content>
      <StatusBar>
        <StatusText>
          {isLoading ? 'Processing...' : 'Ready to speak...'}
        </StatusText>
        <InputContainer>
          <TextInput
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <SubmitButton onClick={handleSubmit} disabled={isLoading || !userInput.trim()}>
            SEND
          </SubmitButton>
        </InputContainer>
      </StatusBar>
    </Container>
  );
};