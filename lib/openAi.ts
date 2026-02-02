import OpenAI from "openai";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false, // for development - in production make it true
});

const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    //@ts-ignore
    agent: url.toString().startsWith("https") ? agent : undefined,
  });
};

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch: customFetch,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function summarizeMarkdown(markdown: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.1,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: `
        You are a data summarization engine for an AI chatbot.

        Task:
        - Convert the input website content, markdown, text, or CSV data into a concise, clean summary suitable for LLM context usage.

        Rules:
        - Output only plain text; no markdown, bullet points, headings, or lists.
        - Write as one continuous paragraph.
        - Remove navigation, menus, buttons, CTAs, pricing tables, sponsors, ads, testimonials, charts, UI labels, emojis, and marketing fluff.
        - Remove repetition; keep only factual, informational content useful for customer support.
        - Do not copy sentences verbatim unless necessary.
        - Compress aggressively while preserving meaning.
        - Ensure the final summary is under 2000 words.

        Note: The result will be stored as long-term context for a chatbot.
      `,
        },
        {
          role: "user",
          content: markdown,
        },
      ],
    });

    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizationMarkdown:", error);
    throw error;
  }
}

export async function summarizeConversation(messages: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      temperature: 0.3,

      max_tokens: 500,

      messages: [
        {
          role: "system",

          content:
            "Summarize the following conversation history into a concise paragraph, preserving key details and user intent.The final output MUST be under 2000 words.",
        },

        ...messages,
      ],
    });

    return completion.choices[0].message.content?.trim() ?? "";
  } catch (error) {
    console.error("Error in summarizeConversation:", error);

    throw error;
  }
}