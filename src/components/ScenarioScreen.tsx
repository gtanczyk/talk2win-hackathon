import React, { useEffect, useRef, useState } from 'react';
import { ScenarioType, SCENARIOS, Agent } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { getResponse } from '../engine/Gemini';
import {
  Container,
  Header,
  Title,
  BackButton,
  Content,
  PlaceholderText,
} from './ScenarioScreen.styles';
import { StatusBar } from './StatusBar';
import { ProgressDisplay } from './ProgressDisplay';
import { AgentStage } from './AgentStage';

interface ScenarioScreenProps {
  scenarioType: ScenarioType;
  onBack: () => void;
}

export const ScenarioScreen: React.FC<ScenarioScreenProps> = ({ scenarioType, onBack }) => {
  const scenario = SCENARIOS.find((s) => s.type === scenarioType);
  const engineRef = useRef<ScenarioEngine | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessingInput, setIsProcessingInput] = useState(false);
  const [goalProgress, setGoalProgress] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [scenarioType]);

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechRecognitionError('Speech recognition is not supported in your browser.');
      return;
    }

    if (isSpeechRecognitionActive) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsSpeechRecognitionActive(true);
        setSpeechRecognitionError(null);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setUserInput(transcript);
      };

      recognition.onerror = (event) => {
        setSpeechRecognitionError(`Error: ${event.error}`);
        setIsSpeechRecognitionActive(false);
      };

      recognition.onend = () => {
        setIsSpeechRecognitionActive(false);
      };

      recognition.start();
    } catch {
      setSpeechRecognitionError('Failed to initialize speech recognition.');
      setIsSpeechRecognitionActive(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
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

      setUserInput('');
      if (isSpeechRecognitionActive && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsProcessingInput(false);
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

        <ProgressDisplay
          goalProgress={goalProgress}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          lastUpdateTime={lastUpdateTimeRef.current}
        />

        <AgentStage agents={agents} />
      </Content>

      <StatusBar
        isProcessingInput={isProcessingInput}
        isSpeechRecognitionActive={isSpeechRecognitionActive}
        userInput={userInput}
        speechRecognitionError={speechRecognitionError}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
        toggleSpeechRecognition={toggleSpeechRecognition}
      />
    </Container>
  );
};