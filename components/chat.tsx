"use client";

import { useState,useEffect } from "react";
import type { Attachment, ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";
import { ChatStatus } from "ai";

import { ListingsCarousel } from "@/components/listings-carousel";
import { ContentListing } from "../components/ContentListing";
import { MiniForm } from "./MiniForm";
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




async function getForm(id: string) {
  const res = await fetch(`/api/forms/${id}`);
  if (!res.ok) throw new Error("Failed to fetch form");
  return res.json();
}

async function getContents() {
  const res = await fetch("/api/contents");
  if (!res.ok) throw new Error("Failed to fetch contents");
  return res.json();
}



export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
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
    
      const [formConfig, setFormConfig] = useState<any>(null);
      const [contents, setContents] = useState<any[]>([]);

  const [showCreditCardAlert, setShowCreditCardAlert] = useState(false);
 const [status, setStatus] = useState<ChatStatus>("ready"); 
   const addToolApprovalResponse = async () => {};
  const regenerate = async () => {};

const selectedModelId = initialChatModel;
const stop = async () => {};
const votes: { chatId: string; messageId: string; isUpvoted: boolean }[] = [];
const selectedVisibilityType = initialVisibilityType; // UI stub

const [listingType, setListingType] = useState<"type1" | "type2" | null>(null);

  /* ---------------- NO-OP UI HANDLERS ---------------- */

useEffect(() => {
    async function fetchData() {
      try {

        const fetchedForm = await getForm("contactForm");
        setFormConfig(fetchedForm);

        const fetchedContents = await getContents();   // ✅ ADD THIS
      setContents(fetchedContents); 
      } catch (error) {
        console.error("Failed to fetch products or form:", error);
      }
    }

    fetchData();
  }, []);

   const sendMessage = async (
  message?: {
    role?: "user" | "assistant" | "system";
    parts?: ChatMessage["parts"];
    text?: string;
  }
) => {
  if (!message) return;
  setStatus("submitted");

  const text =
    message.text ??
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join(" ") ??
    "";

  const lower = text.toLowerCase();

  // 1. Create the User Message object
  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: message.role ?? "user",
    parts: message.parts ?? (message.text ? [{ type: "text", text: message.text }] : []),
    metadata: { createdAt: new Date().toISOString() },
  };

  // 2. Logic to determine Assistant Response and UI Toggles
  let assistantText = "No results found.";
  let displayListings = false;
  let displayContent = false;
  let displayForm = false;
  let newListingType: "type1" | "type2" | null = null;

  if (lower === "hi" || lower === "hello") {
    assistantText = "Hi 😊 What can I help you with today?";
  } 
  else if (lower.includes("show products type1")) {
    assistantText = "Here is a product you might like 👇";
    displayListings = true;
    newListingType = "type1";
  } 
  else if (lower.includes("show products type2")) {
    assistantText = "Here are some products you might like 👇";
    displayListings = true;
    newListingType = "type2";
  } 
  else if (lower.includes("show contents") || lower.includes("recommend")) {
    assistantText = "Here are some contents 👇";
    displayContent = true;
  } 
  else if (lower.includes("show") && (lower.includes("form") || lower.includes("forms"))) {
    assistantText = "Here is the form 👇";
    displayForm = true;
  } 
  else if (lower.includes("hide") || lower.includes("close")) {
    assistantText = "I’ve hidden the listings. What would you like to do next?";
    // All displays remain false
  }

  // 3. Create Assistant Message object
  const assistantMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    parts: [{ type: "text", text: assistantText }],
    metadata: { createdAt: new Date().toISOString() },
  };

  // 4. Update Chat History (Adding BOTH messages at once prevents the empty screen)
  setMessages((prev) => [...prev, userMessage, assistantMessage]);

  // 5. Update UI Visibility States
  setShowListings(displayListings);
  setListingType(newListingType);
  setShowContentList(displayContent);
  setShowForm(displayForm);
  
  setStatus("ready");
};
  





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
     setShowContentList(false);
  }
}, [lastUserText]);





  return (
    <>
<div className="flex h-full min-w-0 flex-col items-center ">
  
  
   
   
<div className="flex-1 overflow-y-auto min-h-0">
  <div className="mx-auto w-full max-w-4xl flex flex-col">
      

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

 {showListings && listingType && (
  <div className="px-2 pt-3 ">
    <ListingsCarousel
      style={listingType} // type1 or type2
    />
  </div>
)}


{showContentList && (
   <div className="px-2 pt-3">
  <ContentListing
    items={contents}
    count={contents.length}
  />
  </div>
)}


            {showForm && formConfig &&( 
            <div className="px-2 pt-3">
            <MiniForm config={formConfig} />
            </div>)}
     
  
</div>
</div>
    

  {/* Sticky input */}
  {!isReadonly && (
    <div className="sticky bottom-0 mx-auto w-full max-w-4xl  px-2 pb-3 md:px-4 md:pb-4"
    >
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
