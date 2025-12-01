"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { createClient } from "@ai-sdk/openai";

type ChatContextType = {
  messages: any[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const client = createClient({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: "/api/chat",  // Custom endpoint for proxy
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const { messages, sendMessage, status } = useChat({
    client,  // Use the client for /api/chat proxy
  });

  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  const clearChat = () => {
    setInput("");
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading: status === "streaming" || status === "submitted",
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
};
