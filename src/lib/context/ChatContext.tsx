"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useChat } from "@ai-sdk/react";

type ChatContextType = {
  messages: any[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { messages, append, isLoading } = useChat({
    api: "/api/chat",
  });

  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    append({ role: "user", content: input });
    setInput("");
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
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
