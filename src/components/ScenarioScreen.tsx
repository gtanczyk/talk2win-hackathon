import React, { useEffect, useRef, useState } from 'react';
import { ScenarioType, SCENARIOS, Agent, GameState, Message } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { GeminiHistory, getResponse } from '../engine/Gemini';
import { Container, Content, TopContainer, TimerContainer, TimerText } from './ScenarioScreen.styles';
import { AgentStage } from './AgentStage';
import { TopProgressBar } from './TopProgressBar';
import { GameInput } from './GameInput';
import { ScenarioIntroScreen } from './ScenarioIntroScreen';
import { ScenarioVictoryScreen } from './ScenarioVictoryScreen';
import { ChatPanel } from './ChatPanel';

interface ScenarioScreenProps {
  scenarioType: ScenarioType;
  onBack: () => void;
}

const INITIAL_TIME = 300; 

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({ scenarioType, onBack }) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  const engineRef = useRef<ScenarioEngine | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isProcessingInput, setIsProcessingInput] = useState(false);
  const [goalProgress, setGoalProgress] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const historyRef = useRef<GeminiHistory>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!scenario) {
    return null;
  }

  useEffect(() => {
    engineRef.current = new ScenarioEngine(scenarioType);
    engineRef.current.setGameState(gameState);
    setAgents(engineRef.current.getAgents());
    setGoalProgress(0);
    setHighScore(0);
    setConversationHistory([]);
    setTimeLeft(INITIAL_TIME);

    // Start periodic updates only when in PLAYING state
    let updateInterval: NodeJS.Timeout | null = null;

    if (gameState === GameState.PLAYING) {
      updateInterval = setInterval(() => {
        if (engineRef.current) {
          engineRef.current.update();
          setAgents(engineRef.current.getAgents());
          // Update conversation history
          setConversationHistory(engineRef.current.getConversationHistory());
        }
      }, 100); // Update every 100ms for smooth animations

      // Start timer countdown
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up - end the game
            setGameState(GameState.VICTORY);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      engineRef.current?.cleanup();
    };
  }, [scenarioType, gameState]);

  // Check for victory condition
  useEffect(() => {
    if ((goalProgress >= 100 || timeLeft === 0) && gameState === GameState.PLAYING) {
      setGameState(GameState.VICTORY);
    }
  }, [goalProgress, timeLeft, gameState]);

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || !engineRef.current || isProcessingInput) return;
    setIsProcessingInput(true);

    try {
      const currentAgents = engineRef.current.getAgents();
      const response = await getResponse(historyRef.current, userInput, scenarioType, currentAgents);

      if (response && response.agents) {
        engineRef.current.update(response.agents);
        setAgents(engineRef.current.getAgents());
        // Update conversation history after agent updates
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
    setTimeLeft(INITIAL_TIME);
    engineRef.current?.setGameState(GameState.PLAYING);
  };

  // Render different screens based on game state
  if (gameState === GameState.INTRO) {
    return <ScenarioIntroScreen scenarioType={scenarioType} onStartGame={handleStartGame} />;
  }

  if (gameState === GameState.VICTORY) {
    return <ScenarioVictoryScreen onBack={onBack} />;
  }

  return (
    <Container>
      <TopContainer>
        <TopProgressBar progress={goalProgress} highScore={highScore} />
        <TimerContainer>
          <TimerText>{formatTime(timeLeft)}</TimerText>
        </TimerContainer>
      </TopContainer>
      <Content>
        <AgentStage agents={agents} scenarioType={scenarioType}/>
        {gameState === GameState.PLAYING && (
          <ChatPanel messages={conversationHistory} maxMessages={50} />
        )}
      </Content>
      <GameInput isProcessingInput={isProcessingInput} onSubmit={handleSubmit} />
    </Container>
  );
};