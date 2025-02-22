import React, { useEffect, useRef, useState } from 'react';
import { ScenarioType, SCENARIOS, Agent } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { getResponse } from '../engine/Gemini';
import { Container, Header, Title, BackButton, Content, PlaceholderText } from './ScenarioScreen.styles';
import { ProgressDisplay } from './ProgressDisplay';
import { AgentStage } from './AgentStage';
import { GameInput } from './GameInput';

interface ScenarioScreenProps {
  scenarioType: ScenarioType;
  onBack: () => void;
}

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({ scenarioType, onBack }) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  const engineRef = useRef<ScenarioEngine | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isProcessingInput, setIsProcessingInput] = useState(false);
  const [goalProgress, setGoalProgress] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  if (!scenario) {
    return (
      <Container>
        <PlaceholderText>Error: Scenario not found</PlaceholderText>
        <BackButton onClick={onBack}>BACK</BackButton>
      </Container>
    );
  }

  useEffect(() => {
    engineRef.current = new ScenarioEngine(scenarioType);
    setAgents(engineRef.current.getAgents());
    setGoalProgress(0);
    setHighScore(0);
    setIsNewHighScore(false);

    // Start periodic updates
    const updateInterval = setInterval(() => {
      if (engineRef.current) {
        engineRef.current.update();
        setAgents(engineRef.current.getAgents());
      }
    }, 100); // Update every 100ms for smooth animations

    // Cleanup
    return () => {
      clearInterval(updateInterval);
      engineRef.current?.cleanup();
    };
  }, [scenarioType]);

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || !engineRef.current || isProcessingInput) return;
    setIsProcessingInput(true);

    try {
      const currentAgents = engineRef.current.getAgents();
      const response = await getResponse(userInput, currentAgents);

      if (response && response.agents) {
        engineRef.current.update(response.agents);
        setAgents(engineRef.current.getAgents());

        // Update progress and high score
        if (response.goal) {
          setGoalProgress(response.goal);
          if (response.goal > highScore) {
            setHighScore(response.goal);
            setIsNewHighScore(true);
            // Reset new high score flag after animation
            setTimeout(() => setIsNewHighScore(false), 1000);
          }
        }
        lastUpdateTimeRef.current = Date.now();
      }
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsProcessingInput(false);
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

        <ProgressDisplay
          goalProgress={goalProgress}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          lastUpdateTime={lastUpdateTimeRef.current}
        />

        <AgentStage agents={agents} />
      </Content>

      <GameInput isProcessingInput={isProcessingInput} onSubmit={handleSubmit} />
    </Container>
  );
};
