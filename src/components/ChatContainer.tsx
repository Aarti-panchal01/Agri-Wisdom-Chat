
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: string;
}

interface ChatContainerProps {
  initialMessages?: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatContainer = ({ 
  initialMessages = [], 
  onSendMessage,
  isLoading = false
}: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add messages to the local state when they come through props
  useEffect(() => {
    if (initialMessages.length > messages.length) {
      setMessages(initialMessages);
    }
  }, [initialMessages, messages.length]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    onSendMessage(message);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              content={message.content}
              type={message.type} 
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex space-x-2 p-3 bg-muted rounded-lg self-start max-w-[80%] animate-pulse-subtle">
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></div>
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300"></div>
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-600"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
