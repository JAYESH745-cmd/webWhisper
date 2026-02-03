import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

/**
 * Count tokens for plain text (Gemini)
 */
export async function countTokens(text: string): Promise<number> {
  const result = await client.models.countTokens({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text }],
      },
    ],
  });

  return result.totalTokens ?? 0;
}

/**
 * Count tokens for conversation messages (Gemini)
 */
export async function countConversationTokens(
  messages: { role: string; content: string }[]
): Promise<number> {
  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const result = await client.models.countTokens({
    model: "gemini-2.5-flash-lite",
    contents,
  });

  return result.totalTokens ?? 0;
}
