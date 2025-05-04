
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about crops, fertilizers, or farming..."
        className="flex-1"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={disabled || !message.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="icon" 
        disabled={true} // Disabled for now, would be enabled in future versions
        title="Voice input (coming soon)"
      >
        <Mic className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
