"use client";

import React, { useState,useEffect } from "react";
import { Chat } from "./chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";
import { isEmbedMode } from "@/lib/isEmbed";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
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
     const [isFullScreen, setIsFullScreen] = useState(false);
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
          className="flex items-center justify-center"
        >
         <Image
  src="/images/comment.png"
  alt="Chat"
  width={60}
  height={60}
  className="object-contain"
/>


        </button>
      )}

      {/* Floating Chat */}
      {isOpen && (
          <div
          className={`bg-white border shadow-2xl flex flex-col overflow-hidden transition-all duration-300
            ${
              isFullScreen
                ? "fixed inset-0 rounded-none"
                : "w-[360px] h-[520px] rounded-xl"
            }
          `}
        >
       <div className="flex items-center justify-between px-4 py-3 bg-[#6FA8E8] text-white">
  <span className="font-semibold">Chatbot</span>
      <div className="flex items-center gap-3">
              {/* Expand / Minimize Button */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="hover:opacity-80"
              >
                {isFullScreen ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>
  <button onClick={() => setIsOpen(false)}>✕</button>
</div>
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