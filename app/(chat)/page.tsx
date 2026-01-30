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
        <div className="h-screen w-full">
          <Chat
            id={chatId}
  initialMessages={[]}
  initialChatModel={initialChatModel}
  initialVisibilityType="public"
  isReadonly={false}
  autoResume={true}
          />
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