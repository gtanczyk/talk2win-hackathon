import React, { useEffect, useRef, useState } from 'react';
import { ScenarioType, SCENARIOS, Agent, GameState } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { GeminiHistory, getResponse } from '../engine/Gemini';
import { Container, Content } from './ScenarioScreen.styles';
import { AgentStage } from './AgentStage';
import { TopProgressBar } from './TopProgressBar';
import { GameInput } from './GameInput';
import { ScenarioIntroScreen } from './ScenarioIntroScreen';
import { ScenarioVictoryScreen } from './ScenarioVictoryScreen';
import { GameOverScreen } from './GameOverScreen';

interface ScenarioScreenProps {
  scenarioType: ScenarioType;
  onBack: () => void;
}

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({ scenarioType, onBack }) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  const engineRef = useRef<ScenarioEngine | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isProcessingInput, setIsProcessingInput] = useState(false);
  const [goalProgress, setGoalProgress] = useState<number | undefined>(undefined);
  const [highScore, setHighScore] = useState(0);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const historyRef = useRef<GeminiHistory>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);

  if (!scenario) {
    return null;
  }

  useEffect(() => {
    engineRef.current = new ScenarioEngine(scenarioType);
    engineRef.current.setGameState(gameState);
    setAgents(engineRef.current.getAgents());
    setHighScore(0);

    // Start periodic updates only when in PLAYING state
    let updateInterval: NodeJS.Timeout | null = null;

    if (gameState === GameState.PLAYING) {
      updateInterval = setInterval(() => {
        if (engineRef.current) {
          engineRef.current.update();
          setAgents(engineRef.current.getAgents());
        }
      }, 100); // Update every 100ms for smooth animations
    }

    // Cleanup
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      engineRef.current?.cleanup();
    };
  }, [scenarioType, gameState]);

  // Check for victory or game over conditions
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      if (goalProgress! >= 100) {
        setTimeout(() => {
          setGameState(GameState.VICTORY);
        }, 3000);
      } else if (goalProgress! <= 0) {
        setGameState(GameState.GAME_OVER);
      }
    }
  }, [goalProgress, gameState]);

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || !engineRef.current || isProcessingInput) return;
    setIsProcessingInput(true);

    try {
      const currentAgents = engineRef.current.getAgents();
      const response = await getResponse(historyRef.current, userInput, scenarioType, currentAgents);

      if (response && response.agents) {
        engineRef.current.update(response.agents);
        setAgents(engineRef.current.getAgents());

        // Update progress and high score
        if (response.goal >= 0) {
          setGoalProgress(response.goal);
          if (response.goal > highScore) {
            setHighScore(response.goal);
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

  const handleStartGame = () => {
    setGameState(GameState.PLAYING);
  };

  const handleRetry = () => {
    historyRef.current = []; // Clear conversation history
    setGameState(GameState.PLAYING); // Reset to playing state
    if (engineRef.current) {
      engineRef.current = new ScenarioEngine(scenarioType); // Reset engine
      setAgents(engineRef.current.getAgents());
      setGoalProgress(undefined); // Reset to 50%
    }
  };

  // Render different screens based on game state
  if (gameState === GameState.INTRO) {
    return <ScenarioIntroScreen scenarioType={scenarioType} onStartGame={handleStartGame} />;
  }

  if (gameState === GameState.VICTORY) {
    return <ScenarioVictoryScreen onBack={onBack} />;
  }

  if (gameState === GameState.GAME_OVER) {
    return <GameOverScreen onRetry={handleRetry} onBack={onBack} />;
  }

  return (
    <Container>
      {goalProgress && <TopProgressBar progress={goalProgress} highScore={highScore} />}
      <Content>
        <AgentStage agents={agents} scenarioType={scenarioType} />
      </Content>

      <GameInput isProcessingInput={isProcessingInput} onSubmit={handleSubmit} />
    </Container>
  );
};
