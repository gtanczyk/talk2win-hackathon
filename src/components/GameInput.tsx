import React, { useRef, useState } from 'react';
import { Container, InputContainer, TextInput, MicrophoneButton } from './GameInput.styles';
import { MessageLog, MessageItem } from './MessageLog';

interface GameInputProps {
  isProcessingInput: boolean;
  onSubmit: (text: string) => Promise<void>;
}

export const GameInput: React.FC<GameInputProps> = ({ isProcessingInput, onSubmit }) => {
  const [userInput, setUserInput] = useState('');
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [, setSpeechRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const transcriptRef = useRef<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && userInput.trim()) {
      handleSubmit(userInput.trim());
    }
  };

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || isProcessingInput) return;

    const newMessage: MessageItem = {
      id: Date.now().toString(),
      text: userInput,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await onSubmit(userInput);
    setUserInput('');

    if (isSpeechRecognitionActive && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Remove the message after animation completes
    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== newMessage.id));
    }, 10000);
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
        transcriptRef.current = '';
        setUserInput('');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setUserInput(transcript);
        transcriptRef.current = transcript;
      };

      recognition.onerror = (event) => {
        setSpeechRecognitionError(`Error: ${event.error}`);
        setIsSpeechRecognitionActive(false);
      };

      recognition.onend = async () => {
        await handleSubmit(transcriptRef.current);
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
      <MessageLog messages={messages} />
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
      </InputContainer>
    </Container>
  );
};
