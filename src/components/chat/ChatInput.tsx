'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { useChatContext } from '@/lib/context/ChatContext';
import { Button } from '@/components/ui/button';

export default function ChatInput() {
  const { input, handleInputChange, handleSubmit, isLoading } = useChatContext();
  
  // Ensure input is always a string
  const safeInput = input || '';

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border p-4 bg-background"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={safeInput}
          onChange={handleInputChange}
          placeholder="Tapez votre message..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 bg-background text-foreground"
        />
        <Button
          type="submit"
          disabled={isLoading || safeInput.trim() === ''}
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}