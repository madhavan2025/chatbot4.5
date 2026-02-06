import { cookies } from "next/headers";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";


export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <ChatPage params={props.params} />
    </Suspense>
  );
}

async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
 const isServerConnected = false;
  if (!isServerConnected) {
    redirect("/"); // Next.js will navigate to '/'
  }
    const uiMessages: any[] = [];

  const cookieStore = cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  return (
    <>
      <Chat
       autoResume={true}
        id={id}
        initialChatModel={chatModelFromCookie?.value ?? DEFAULT_CHAT_MODEL}
        initialMessages={uiMessages}
        initialVisibilityType="public"
        isReadonly={false}
      />
      <DataStreamHandler />
    </>
  );
}
