'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';

interface ChatContextType {
  messages: any[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  append: (message: any) => Promise<void>;
  setMessages: (messages: any[]) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  const {
    messages,
  
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialInput: '',
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem('chatHistory');
      if (saved && messages.length === 0) {
        try {
          const parsedMessages = JSON.parse(saved);
          if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
            setMessages(parsedMessages);
          }
        } catch (e) {
          console.error('Failed to load chat history');
        }
      }
    }
  }, [isMounted, messages.length, setMessages]);

  // Persist to localStorage
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input: input ?? '',
        handleInputChange,
        handleSubmit,
        isLoading,
        append,
        setMessages,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}
