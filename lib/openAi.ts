import { GoogleGenAI } from "@google/genai";

export const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

/**
 * Summarize markdown / website content
 */
export async function summarizeMarkdown(markdown: string) {
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a data summarization engine for an AI chatbot.

IMPORTANT GENERATION CONSTRAINTS:
- Be concise and deterministic
- Do NOT exceed reasonable length
- Avoid creative language

Task:
Convert the input website content, markdown, text, or CSV data into a concise, clean summary suitable for LLM context usage.

Rules:
- Output only plain text
- One continuous paragraph
- Remove navigation, menus, CTAs, ads, fluff, UI text
- Preserve only factual, support-relevant information
- Aggressively compress while preserving meaning
- Final output must be under 2000 words
Note: The result will be stored as long-term context for a chatbot.

INPUT:
${markdown}
              `,
            },
          ],
        },
      ],
    });

    return response.text?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeMarkdown (Gemini):", error);
    throw error;
  }
}

/**
 * Summarize conversation history
 */
export async function summarizeConversation(messages: any[]) {
  try {
    const conversationText = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are summarizing conversation history for long-term chatbot memory.

IMPORTANT:
- Be concise
- Preserve user intent and key facts
- Avoid unnecessary detail
- No formatting, no bullets

Summarize the following conversation into ONE paragraph.
The final output MUST be under 2000 words.

Conversation:
${conversationText}
              `,
            },
          ],
        },
      ],
    });

    return response.text?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeConversation (Gemini):", error);
    throw error;
  }
}
