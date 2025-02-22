import React from 'react';
import {
  StatusBarContainer,
  StatusText,
  InputContainer,
  TextInput,
  SubmitButton,
  MicrophoneButton,
  ErrorMessage,
} from './StatusBar.styles';

interface StatusBarProps {
  isProcessingInput: boolean;
  isSpeechRecognitionActive: boolean;
  userInput: string;
  speechRecognitionError: string | null;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  handleSubmit: () => void;
  toggleSpeechRecognition: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isProcessingInput,
  isSpeechRecognitionActive,
  userInput,
  speechRecognitionError,
  handleInputChange,
  handleKeyPress,
  handleSubmit,
  toggleSpeechRecognition,
}) => {
  return (
    <StatusBarContainer>
      <StatusText>
        {isProcessingInput
          ? 'Processing...'
          : isSpeechRecognitionActive
          ? 'Listening...'
          : 'Ready to speak...'}
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
        <SubmitButton
          onClick={handleSubmit}
          disabled={isProcessingInput || !userInput.trim()}
        >
          SEND
        </SubmitButton>
      </InputContainer>
      {speechRecognitionError && (
        <ErrorMessage>{speechRecognitionError}</ErrorMessage>
      )}
    </StatusBarContainer>
  );
};