"use client";
import { X } from "lucide-react";
export function EmbedChatHeader() {
  const closeChat = () => {
    window.parent.postMessage("closeChat", "*");
  };

  return (
    <div className="h-14 bg-blue-600 text-white flex items-center justify-between px-4 shrink-0">
      <span className="font-semibold">Chatbot</span>
      <button
        onClick={closeChat}
        className="text-white text-xl leading-none hover:opacity-80"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
}
