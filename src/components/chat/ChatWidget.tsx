'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Trash2 } from 'lucide-react';
import { useChatContext } from '@/lib/context/ChatContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { Button } from '@/components/ui/button';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { messages, isLoading, clearChat } = useChatContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClearChat = () => {
    if (confirm('Voulez-vous vraiment effacer toute la conversation ?')) {
      clearChat();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[380px] h-[600px] bg-card border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h2 className="font-semibold">Assistant IA</h2>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  onClick={handleClearChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary-foreground/10"
                  title="Effacer la conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary-foreground/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Container */}
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Input Area */}
          <ChatInput />
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
