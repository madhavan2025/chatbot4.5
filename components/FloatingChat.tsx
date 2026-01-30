"use client";

import React, { useState,useEffect } from "react";
import { Chat } from "./chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";
import { isEmbedMode } from "@/lib/isEmbed";

interface FloatingChatProps {
  chatId: string;
  initialMessages?: ChatMessage[];
  initialChatModel?: string;
  initialVisibilityType?: VisibilityType;
  isReadonly?: boolean;
  autoResume?: boolean;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({
  chatId,
  initialMessages = [],
  initialChatModel = DEFAULT_CHAT_MODEL,
  initialVisibilityType = "public",
  isReadonly = false,
  autoResume = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
   const [isEmbed, setIsEmbed] = useState(false);

   useEffect(() => {
    setIsEmbed(isEmbedMode());
  }, []);

  // 🚫 DO NOT render floating launcher inside iframe
  if (isEmbed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}

      {/* Floating Chat */}
      {isOpen && (
        <div className="w-[360px] h-[520px] bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
            <span className="font-semibold">Chatbot</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-hidden">
            <Chat
              id={chatId}
              initialMessages={initialMessages}
              initialChatModel={initialChatModel}
              initialVisibilityType={initialVisibilityType}
              isReadonly={isReadonly}
              autoResume={autoResume}
            />
          </div>
        </div>
      )}
    </div>
  );
};