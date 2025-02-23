import React, { useEffect, useRef, useState } from 'react';
import { ScenarioType, SCENARIOS, Agent, GameState, Message } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { GeminiHistory, getResponse } from '../engine/Gemini';
import { Container, Content, BackButton, TimeLeft } from './ScenarioScreen.styles';
import { AgentStage } from './AgentStage';
import { TopProgressBar } from './TopProgressBar';
import { GameInput } from './GameInput';
import { ScenarioIntroScreen } from './ScenarioIntroScreen';
import { ScenarioVictoryScreen } from './ScenarioVictoryScreen';
import { ChatPanel } from './ChatPanel';
import { ScenarioDefeatScreen } from './ScenarioDefeatScreen';

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
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const historyRef = useRef<GeminiHistory>([]);
  const [timeLeft, setTimeLeft] = useState(scenario?.timeLimit || 0);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);

  if (!scenario) {
    return null;
  }

  useEffect(() => {
    // Initialize engine and game state
    engineRef.current = new ScenarioEngine(scenarioType);
    engineRef.current.setGameState(gameState);
    setAgents(engineRef.current.getAgents());
    setGoalProgress(0);
    setHighScore(0);
    setConversationHistory([]);
    setTimeLeft(scenario?.timeLimit || 0);

    // Start periodic updates only when in PLAYING state
    let updateInterval: NodeJS.Timeout | null = null;

    if (gameState === GameState.PLAYING) {
      updateInterval = setInterval(() => {
        if (engineRef.current) {
          engineRef.current.update();
          setAgents(engineRef.current.getAgents());
          setConversationHistory(engineRef.current.getConversationHistory());
        }
      }, 100); // Update every 100ms for smooth animations
    }

    // Cleanup function
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      engineRef.current?.cleanup();
    };
  }, [scenarioType, gameState, scenario?.timeLimit]);

  // Countdown timer effect
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    
    if (gameState === GameState.PLAYING && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            // Trigger defeat when timer reaches 0
            setGameState(GameState.DEFEAT);
            if (engineRef.current) {
              engineRef.current.setGameState(GameState.DEFEAT);
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    // Cleanup timer
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [gameState]);

  // Check for victory condition
  useEffect(() => {
    if (goalProgress >= 100 && gameState === GameState.PLAYING) {
      setGameState(GameState.VICTORY);
      if (engineRef.current) {
        engineRef.current.setGameState(GameState.VICTORY);
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
        setConversationHistory(engineRef.current.getConversationHistory());

        // Update progress and high score
        if (response.goal) {
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
    if (engineRef.current) {
      engineRef.current.setGameState(GameState.PLAYING);
    }
  };
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    // Clean up and reset game state
    if (engineRef.current) {
      engineRef.current.cleanup();
    }
    setGameState(GameState.INTRO);
    onBack();
  };

  // Render different screens based on game state
  if (gameState === GameState.INTRO) {
    return <ScenarioIntroScreen scenarioType={scenarioType} onStartGame={handleStartGame} />;
  }

  if (gameState === GameState.VICTORY) {
    return <ScenarioVictoryScreen onBack={onBack} />;
  }

  if (gameState === GameState.DEFEAT) {
    return <ScenarioDefeatScreen onBack={onBack} />;
  }

  return (
    <Container>
      <TopProgressBar 
        progress={goalProgress} 
      />
      
      
  
      <BackButton onClick={handleBack}>Back</BackButton>
      <TimeLeft> {formatTime(timeLeft)} </TimeLeft>  
      <Content>
        <AgentStage agents={agents} scenarioType={scenarioType} />
        {gameState === GameState.PLAYING && (
          <ChatPanel messages={conversationHistory} maxMessages={50} />
        )}
      </Content>
      <GameInput 
        isProcessingInput={isProcessingInput} 
        onSubmit={handleSubmit} 
      />
    </Container>
  );
};