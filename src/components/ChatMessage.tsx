
import React from 'react';
import { cn } from '@/lib/utils';

export type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp?: string;
}

const ChatMessage = ({ content, type, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn('flex flex-col mb-4', type === 'user' ? 'items-end' : 'items-start')}>
      <div className={cn(
        type === 'user' ? 'chat-message-user' : 'chat-message-bot'
      )}>
        {content}
      </div>
      {timestamp && (
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      )}
    </div>
  );
};

export default ChatMessage;
