"use server";

// 🔹 UI-only version: no DB
export async function getSuggestions({
  documentId,
}: {
  documentId: string;
}) {
  // Return empty array or mock suggestions
  return [];
}
