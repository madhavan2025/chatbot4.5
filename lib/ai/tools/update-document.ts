import { tool, type UIMessageStreamWriter } from "ai";
import { z } from "zod";
import type { ChatMessage } from "@/lib/types";

// Stub: simulate a database document
async function getDocumentById({ id }: { id: string }) {
  return {
    id,
    title: "Demo Document",
    kind: "text" as "text" | "code" | "image" | "sheet",
    content: "This is a demo document content.",
  };
}

// Stub: simulate handlers
const documentHandlersByArtifactKind = [
  {
    kind: "text" as const,
    onUpdateDocument: async ({ document, description, dataStream }: any) => {
      // Simulate streaming updates to UI
      dataStream.write({
        type: "data-suggestion",
        data: {
          id: "suggestion-1",
          originalText: document.content,
          suggestedText: document.content + " (updated)",
          description,
          documentId: document.id,
          isResolved: false,
          userId: "ui-stub-user",
          createdAt: new Date(),
          documentCreatedAt: new Date(),
        },
        transient: true,
      });
    },
  },
];

type UpdateDocumentProps = {
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

export const updateDocument = ({ dataStream }: UpdateDocumentProps) =>
  tool({
    description: "Update a document with the given description.",
    inputSchema: z.object({
      id: z.string().describe("The ID of the document to update"),
      description: z
        .string()
        .describe("The description of changes that need to be made"),
    }),
    execute: async ({ id, description }) => {
      const document = await getDocumentById({ id });

      if (!document) {
        return {
          error: "Document not found",
        };
      }

      dataStream.write({
        type: "data-clear",
        data: null,
        transient: true,
      });

      const documentHandler = documentHandlersByArtifactKind.find(
        (handler) => handler.kind === document.kind
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${document.kind}`);
      }

      await documentHandler.onUpdateDocument({
        document,
        description,
        dataStream,
      });

      dataStream.write({ type: "data-finish", data: null, transient: true });

      return {
        id,
        title: document.title,
        kind: document.kind, // already narrowed to "text" | "code" | "image" | "sheet"
        content: "The document has been updated successfully.",
      };
    },
  });
