import { db } from "@/db/client";
import { chatBotMetadata, conversation, messages } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorised";
import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await isAuthorized();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: conversationId } = await params;

    const [conv] = await db
      .select()
      .from(conversation)
      .where(eq(conversation.id, conversationId));

    if (!conv) {
      return NextResponse.json(
        { error: "Not Found Conversation" },
        { status: 404 },
      );
    }

    const [bot] = await db
      .select()
      .from(chatBotMetadata)
      .where(
        and(
          eq(chatBotMetadata.id, conv.chatbot_id),
          eq(chatBotMetadata.user_email, user.email),
        ),
      );

      if(!bot){
        return NextResponse.json({error:"Forbiddden"},{status:403})

      }

      const msgs = await db.select().from(messages).where(eq(messages.conversation_id,conversationId)).orderBy(asc(messages.created_at))

      return NextResponse.json({messages:msgs})



       
  } catch (error) {
     console.error("Fetch conversations messages Error:",error)
        return NextResponse.json(
            {error:"Internal server Error"},
            {status:500}
        )
  }
}