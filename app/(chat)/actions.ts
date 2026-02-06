"use server";

import { generateText, type UIMessage } from "ai";
import { cookies } from "next/headers";
import type { VisibilityType } from "@/components/visibility-selector";
import { titlePrompt } from "@/lib/ai/prompts";
import { getTitleModel } from "@/lib/ai/providers";
import { getTextFromMessage } from "@/lib/utils";

/**
 * Save selected chat model in cookies (still works in UI-only)
 */
export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

/**
 * Generate a chat title from a user message
 */
export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text } = await generateText({
    model: getTitleModel(),
    system: titlePrompt,
    prompt: getTextFromMessage(message),
  });
  return text
    .replace(/^[#*"\s]+/, "")
    .replace(/["]+$/, "")
    .trim();
}

/**
 * UI-only version: delete trailing messages in memory
 */
export async function deleteTrailingMessages({
  messages,
  id,
}: {
  messages: UIMessage[];
  id: string;
}) {
  const index = messages.findIndex((msg) => msg.id === id);
  if (index === -1) return messages;

  // Return messages up to the given message (inclusive)
  return messages.slice(0, index + 1);
}

/**
 * UI-only version: update chat visibility in memory
 */
export async function updateChatVisibility({
  chat,
  visibility,
}: {
  chat: { id: string; visibility: VisibilityType };
  visibility: VisibilityType;
}) {
  // Just update the local object
  return { ...chat, visibility };
}
