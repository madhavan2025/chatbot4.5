"use client";

import { useState,useEffect } from "react";
import type { Attachment, ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";
import { ChatStatus } from "ai";

import { ListingsCarousel } from "@/components/listings-carousel";
import { ContentListing } from "../components/ContentListing";
import { MiniForm } from "../components/MiniForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Artifact } from "./artifact";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  autoResume = false, // ✅ default value goes here
}: {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  autoResume?: boolean; // ✅ optional in type
}) {
  /* ---------------- UI STATE ONLY ---------------- */
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showListings, setShowListings] = useState(false);
  const [showContentList, setShowContentList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [showCreditCardAlert, setShowCreditCardAlert] = useState(false);
   const status: ChatStatus = "ready"; 
   const addToolApprovalResponse = async () => {};
  const regenerate = async () => {};

const selectedModelId = initialChatModel;
const stop = async () => {};
const votes: { chatId: string; messageId: string; isUpvoted: boolean }[] = [];
const selectedVisibilityType = initialVisibilityType; // UI stub


  /* ---------------- NO-OP UI HANDLERS ---------------- */

  const sendMessage = async (
  message?: {
    role?: "user" | "assistant" | "system";
    parts?: ChatMessage["parts"];
    text?: string;
  }
) => {
  if (!message) return;

  const text =
    message.text ??
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(" ") ??
    "";

  const lower = text.toLowerCase();

  setMessages((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      role: message.role ?? "user",
      parts:
        message.parts ??
        (message.text
          ? [{ type: "text", text: message.text }]
          : []),
    },
  ]);

  if (
    lower.includes("show") &&
    (lower.includes("product") ||
      lower.includes("products") ||
      lower.includes("listing"))
  ) {
    setShowListings(true);
    addAssistantMessage("Here are some products you might like 👇");
    return;
  }
  
   if (lower.includes("show") && (lower.includes("form") || lower.includes("forms"))) {
    setShowForm(true);
    addAssistantMessage("Please share your details 👇");
    return;
  }

    if (lower.includes("recommend")) setShowContentList(true);

  if (lower.includes("hide") || lower.includes("close")) {
    setShowListings(false);
    addAssistantMessage("I’ve hidden the listings. What would you like to do next?");
    return;
  }

  addAssistantMessage("Hi 😊 What can I help you with today?");
};

function addAssistantMessage(text: string) {
  setMessages((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: text,
      parts: [{ type: "text", text }],
    },
  ]);
}


function getMessageText(message?: ChatMessage): string {
  if (!message) return "";

  // Runtime check for ai-sdk injected content
  if (
    typeof (message as unknown as { content?: unknown }).content === "string"
  ) {
    return (message as unknown as { content: string }).content;
  }

  // Fallback to typed parts
  return (
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? ""
  );
}

const lastUserMessage = [...messages]
  .reverse()
  .find((m) => m.role === "user");

const lastUserText = getMessageText(lastUserMessage).toLowerCase();


useEffect(() => {
  if (!lastUserText) return;

  if (
    lastUserText.includes("show") &&
    (lastUserText.includes("product") ||
      lastUserText.includes("products") ||
      lastUserText.includes("listing"))
  ) {
    setShowListings(true);
  }
  if (lastUserText.includes("show") && (lastUserText.includes("form") || lastUserText.includes("forms"))) {
    setShowForm(true);
  }

  if (
    lastUserText.includes("hide") ||
    lastUserText.includes("close")
  ) {
    setShowListings(false);
    setShowForm(false);
  }
}, [lastUserText]);





  return (
    <>
<div className="flex h-full min-w-0 flex-col bg-background">
  
  
   
   
<div className="flex-1 overflow-y-auto min-h-0">
   <>
            {showListings && (
              <div className="px-2 pt-3 space-y-3">
                <ListingsCarousel />
                <ContentListing />
              </div>
            )}

            {showForm && (
              <div className="px-2 pt-3">
                <MiniForm />
              </div>
            )}
          </>

  <Messages
    chatId={id}
    isArtifactVisible={false}
    isReadonly={isReadonly}
    messages={messages}
    setMessages={setMessages}
    status={status}
    addToolApprovalResponse={addToolApprovalResponse}
    votes={votes}
    regenerate={regenerate}
    selectedModelId={selectedModelId}
  />

  <div className="h-24" />
</div>

    

  {/* Sticky input */}
  {!isReadonly && (
    <div className="sticky bottom-0 mx-auto w-full max-w-4xl bg-background px-2 pb-3 md:px-4 md:pb-4">
      <MultimodalInput
        chatId={id}
        input={input}
        messages={messages}
        attachments={attachments}
        setInput={setInput}
        setMessages={setMessages}
        setAttachments={setAttachments}
        sendMessage={sendMessage}
        status={status}
        stop={stop}
        selectedVisibilityType={selectedVisibilityType}
        selectedModelId={selectedModelId}
      />
    </div>
  )}
</div>


     <Artifact
  chatId={id}
  input={input}
  messages={messages}
  attachments={attachments}
  isReadonly={isReadonly}
  selectedModelId={selectedModelId}
  selectedVisibilityType={initialVisibilityType}
  sendMessage={sendMessage}
  setInput={setInput}
  setMessages={setMessages}
  setAttachments={setAttachments}
  status={status}
  addToolApprovalResponse={addToolApprovalResponse}
  regenerate={regenerate}
  stop={stop}
  votes={votes}
/>


      <AlertDialog
        open={showCreditCardAlert}
        onOpenChange={setShowCreditCardAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate AI Gateway</AlertDialogTitle>
            <AlertDialogDescription>
              Please activate Vercel AI Gateway to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Activate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
