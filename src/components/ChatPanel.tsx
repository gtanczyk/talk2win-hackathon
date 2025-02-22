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
  NotificationBadge,
} from './ChatPanel.styles';

interface ChatPanelProps {
  messages: Message[];
  maxMessages?: number;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  maxMessages = 50,
}: ChatPanelProps) => {
  // Panel state
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  // Unread messages tracking
  const [unreadCount, setUnreadCount] = useState(0);
  const prevMessagesLength = useRef(messages.length);
  const messageListRef = useRef<HTMLDivElement>(null);

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

  // Update unread count when new messages arrive
  useEffect(() => {
    const hasNewMessages = messages.length > prevMessagesLength.current;
    
    if (hasNewMessages && !isOpen) {
      // Only increment unread count when panel is closed
      setUnreadCount(prev => prev + (messages.length - prevMessagesLength.current));
    }
    
    prevMessagesLength.current = messages.length;
  }, [messages, isOpen]);

  // Auto-scroll to bottom when new messages arrive if shouldAutoScroll is true
  useEffect(() => {
    const hasNewMessages = messages.length > prevMessagesLength.current;
    
    if (isOpen && messageListRef.current && shouldAutoScroll && hasNewMessages) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isOpen, shouldAutoScroll]);

  // Handle panel toggle and reset unread count
  const togglePanel = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      // Reset unread count when opening the panel
      setUnreadCount(0);
    }
  };

  // Get the most recent messages based on maxMessages
  const recentMessages = messages.slice(-maxMessages);

  // Display unread count with a max of 99+
  const displayUnreadCount = unreadCount > 99 ? '99+' : unreadCount.toString();

  return (
    <>
      <ChatButton 
        onClick={togglePanel}
        isOpen={isOpen}
        aria-label={isOpen ? "Close chat" : `Open chat ${unreadCount > 0 ? `(${unreadCount} unread messages)` : ''}`}
        aria-expanded={isOpen}
      >
        {isOpen ? '' : 'CHAT'}
        {!isOpen && unreadCount > 0 && (
          <NotificationBadge 
            count={unreadCount}
            role="status"
            aria-label={`${unreadCount} unread messages`}
          >
            {displayUnreadCount}
          </NotificationBadge>
        )}
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
}
