import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import {
  ChatContainer,
  ChatButton,
  MessageList,
  MessageItem,
  AgentId,
  MessageText,
  Timestamp,
  Header,
} from './ChatPanel.styles';

interface ChatPanelProps {
  messages: Message[];
  maxMessages?: number;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  maxMessages = 50,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messageListRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);

  // Format timestamp to display only hours:minutes:seconds
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Handle scroll events to determine if user has scrolled up
  const handleScroll = () => {
    if (!messageListRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    
    setShouldAutoScroll(isAtBottom);
  };

  // Auto-scroll to bottom when new messages arrive if shouldAutoScroll is true
  useEffect(() => {
    const hasNewMessages = messages.length > prevMessagesLength.current;
    
    if (isOpen && messageListRef.current && shouldAutoScroll && hasNewMessages) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
    
    prevMessagesLength.current = messages.length;
  }, [messages, isOpen, shouldAutoScroll]);

  // Get the most recent messages based on maxMessages
  const recentMessages = messages.slice(-maxMessages);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatButton 
        onClick={togglePanel}
        isOpen={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? '' : 'CHAT'}
      </ChatButton>

      <ChatContainer 
        isOpen={isOpen}
        role="complementary"
        aria-label="Chat messages"
      >
        <Header>CONVERSATION LOG</Header>
        <MessageList 
          ref={messageListRef}
          onScroll={handleScroll}
        >
          {recentMessages.map((message, index) => (
            <MessageItem 
              key={`${message.agentId}-${message.timestamp}-${index}`}
              role="article"
            >
              <AgentId>{message.agentId}</AgentId>
              <MessageText>{message.text}</MessageText>
              <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>
            </MessageItem>
          ))}
        </MessageList>
      </ChatContainer>
    </>
  );
};