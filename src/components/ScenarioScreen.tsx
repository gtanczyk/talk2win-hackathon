import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ScenarioType, SCENARIOS, Agent } from '../types';
import '@fontsource/press-start-2p';
import { ScenarioEngine } from '../engine/ScenarioEngine';
import { Agent as AgentComponent } from './Agent';
import { getResponse } from '../engine/Gemini';
import { Projectile } from './Projectile';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

// Progress tracking animations
const progressPulse = keyframes`
  0% { box-shadow: 0 0 5px #0ff; }
  50% { box-shadow: 0 0 15px #0ff; }
  100% { box-shadow: 0 0 5px #0ff; }
`;

const scoreFlash = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #0ff;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 5px;
    background: linear-gradient(45deg, #0ff, transparent);
    opacity: 0.3;
    z-index: -1;
  }
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 24px;
  background-color: #000;
  border: 2px solid #fff;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
`;

const ProgressBarInner = styled.div<{ progress: number; isHighScore: boolean }>`
  width: ${(props) => Math.min(Math.max(props.progress, 0), 100)}%;
  height: 100%;
  background-color: ${(props) => (props.isHighScore ? '#0f0' : '#0ff')};
  transition: width 0.5s ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
    animation: ${progressPulse} 2s infinite;
  }
`;

const ProgressText = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  text-shadow: 2px 2px #000;
  z-index: 1;
  pointer-events: none;
  line-height: 24px;
  font-weight: bold;
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`;

const ScoreText = styled.span<{ isHighScore?: boolean; isNew?: boolean }>`
  color: ${(props) => (props.isHighScore ? '#0f0' : '#0ff')};
  text-shadow: ${(props) => (props.isHighScore ? '0 0 5px #0f0' : 'none')};
  font-size: ${(props) => (props.isHighScore ? '14px' : '12px')};
  font-weight: ${(props) => (props.isHighScore ? 'bold' : 'normal')};
  animation: ${(props) => (props.isNew ? scoreFlash : 'none')} 0.5s ease-out;

  &::before {
    content: ${(props) => (props.isHighScore ? '"★ "' : '""')};
  }
`;

const ProgressStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  font-size: 10px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  color: #888;
`;

const StatValue = styled.span<{ highlight?: boolean }>`
  color: ${(props) => (props.highlight ? '#0f0' : '#fff')};
  font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
`;

const MicrophoneButton = styled.button<{ isListening: boolean }>`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: ${(props) => (props.isListening ? '#ff0000' : '#0ff')};
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${(props) =>
    props.isListening &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}

  &:hover {
    background-color: ${(props) => (props.isListening ? '#ff3333' : '#fff')};
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
    animation: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
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

  const formatTimeSinceUpdate = () => {
    const seconds = Math.floor((Date.now() - lastUpdateTimeRef.current) / 1000);
    return seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <Container>
      <Header>
        <Title>{scenario.title}</Title>
        <BackButton onClick={onBack}>BACK</BackButton>
      </Header>

      <Content>
        <PlaceholderText>{scenario.description}</PlaceholderText>

        <ProgressContainer>
          <ProgressBarOuter>
            <ProgressText>{Math.round(goalProgress)}%</ProgressText>
            <ProgressBarInner progress={goalProgress} isHighScore={goalProgress >= highScore} />
          </ProgressBarOuter>

          <ScoreDisplay>
            <ScoreText>Current: {Math.round(goalProgress)}%</ScoreText>
            <ScoreText isHighScore isNew={isNewHighScore}>
              Best: {Math.round(highScore)}%
            </ScoreText>
          </ScoreDisplay>

          <ProgressStats>
            <StatRow>
              <StatLabel>Last Update:</StatLabel>
              <StatValue>{formatTimeSinceUpdate()}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Progress Rate:</StatLabel>
              <StatValue highlight={goalProgress > 0}>
                {goalProgress > 0
                  ? `+${(goalProgress / Math.max(1, (Date.now() - lastUpdateTimeRef.current) / 1000)).toFixed(1)}%/s`
                  : 'N/A'}
              </StatValue>
            </StatRow>
          </ProgressStats>
        </ProgressContainer>

        <Stage>
          {agents.map((agent) => (
            <React.Fragment key={agent.id}>
              <AgentComponent {...agent} />
              {agent.projectile && (
                <Projectile
                  type={agent.projectile.type}
                  x={agent.x}
                  y={agent.y}
                  targetX={agent.projectile.targetX}
                  targetY={agent.projectile.targetY}
                />
              )}
            </React.Fragment>
          ))}
        </Stage>
      </Content>

      <StatusBar>
        <StatusText>
          {isProcessingInput ? 'Processing...' : isSpeechRecognitionActive ? 'Listening...' : 'Ready to speak...'}
        </StatusText>
        <InputContainer>
          <TextInput
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isProcessingInput || isSpeechRecognitionActive}
            placeholder={isSpeechRecognitionActive ? 'Listening...' : 'Type your message...'}
          />
          <MicrophoneButton
            onClick={toggleSpeechRecognition}
            disabled={isProcessingInput}
            isListening={isSpeechRecognitionActive}
            title={isSpeechRecognitionActive ? 'Stop listening' : 'Start listening'}
          >
            🎤
          </MicrophoneButton>
          <SubmitButton onClick={handleSubmit} disabled={isProcessingInput || !userInput.trim()}>
            SEND
          </SubmitButton>
        </InputContainer>
        {speechRecognitionError && <ErrorMessage>{speechRecognitionError}</ErrorMessage>}
      </StatusBar>
    </Container>
  );
};
