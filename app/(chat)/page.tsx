import { cookies } from "next/headers";

import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { FloatingChat } from "@/components/FloatingChat";
import { Chat } from "@/components/chat";

export default async function Page({
    searchParams,
}: {
  searchParams: { embed?: string };
}) {

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const chatId = generateUUID();
  const initialChatModel =
    modelIdFromCookie?.value || DEFAULT_CHAT_MODEL;
    const isEmbed = searchParams?.embed === "true";

  return (
     <>
      {isEmbed ? (
        // 🧩 EMBED MODE → Only chat window
         <div className="h-screen w-full flex flex-col">
          {/* 🔵 CHATBOT HEADER */}
          <div className="h-14 bg-blue-600 text-white flex items-center justify-between px-4 shrink-0">
            <span className="font-semibold">Chatbot</span>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.parent.postMessage("closeChat", "*");
                }
              }}
              className="text-white text-xl leading-none hover:opacity-80"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        <div className="flex-1 overflow-hidden">
          <Chat
            id={chatId}
  initialMessages={[]}
  initialChatModel={initialChatModel}
  initialVisibilityType="public"
  isReadonly={false}
  autoResume={true}
          />
        </div>
        </div>
      ) : (
        // 💬 NORMAL MODE → Floating launcher
        <FloatingChat
          chatId={chatId}
          initialChatModel={initialChatModel}
        />
      )}

      <DataStreamHandler />
    </>
  );
}