import { db } from "@/db/client";
import { knowledge_source } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorised";
import { client } from "@/lib/openAi";
import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const user = await isAuthorized();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const messages: ChatMessage[] = body.messages;
    const knowledgeSourceIds: string[] = body.knowledge_source_ids || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 },
      );
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "No user message provided" },
        { status: 400 },
      );
    }

    let context = "";

    if (knowledgeSourceIds.length > 0) {
      const sources = await db
        .select({ content: knowledge_source.content })
        .from(knowledge_source)
        .where(
          and(
            eq(knowledge_source.user_email, user.email),
            inArray(knowledge_source.id, knowledgeSourceIds),
          ),
        );

      context = sources
        .map((source) => source.content)
        .filter(Boolean)
        .join("\n\n")
        .slice(0, 3000);
    }

    const systemPrompt = `
You are Sarah, a professional, calm, and reliable customer support AI.

Answer using the provided knowledge context when it is relevant.
If the answer is not in the context, say you are not sure and offer to create a support ticket.
Keep answers very short, usually one or two sentences.

Context:
${context}
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
${systemPrompt}

Conversation:
${messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join("\n")}
`,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      response:
        response.text?.trim() ||
        "I'm sorry, I couldn't generate a response right now.",
    });
  } catch (error) {
    console.error("Test chat error", error);
    return NextResponse.json(
      { response: "Sorry, I'm having trouble right now. Please try again." },
      { status: 500 },
    );
  }
}
