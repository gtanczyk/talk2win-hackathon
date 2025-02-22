import React, { useRef, useState } from 'react';
import {
  Container,
  StatusText,
  InputContainer,
  TextInput,
  SubmitButton,
  MicrophoneButton,
  ErrorMessage,
} from './GameInput.styles';

interface GameInputProps {
  isProcessingInput: boolean;
  onSubmit: (text: string) => void;
}

export const GameInput: React.FC<GameInputProps> = ({ isProcessingInput, onSubmit }) => {
  const [userInput, setUserInput] = useState('');
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && userInput.trim()) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!userInput.trim() || isProcessingInput) return;

    onSubmit(userInput);
    setUserInput('');

    if (isSpeechRecognitionActive && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

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

  return (
    <Container>
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
    </Container>
  );
};
