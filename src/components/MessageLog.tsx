import React from 'react';
import { MessageContainer, Message } from './MessageLog.styles';

export interface MessageItem {
  id: string;
  text: string;
}

interface MessageLogProps {
  messages: MessageItem[];
}

export const MessageLog: React.FC<MessageLogProps> = ({ messages }) => {
  return (
    <MessageContainer>
      {messages.map((message) => (
        <Message key={message.id}>
          {message.text}
        </Message>
      ))}
    </MessageContainer>
  );
};