import { db } from "@/db";
import { forumReplies, forumThreads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { threadId, authorName, content } = body;

    if (!threadId || !authorName || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Insert the reply
    const result = await db.insert(forumReplies).values({
      threadId,
      authorName,
      content,
      createdAt: now,
    });

    // Update thread reply count and lastReplyAt
    const thread = await db
      .select()
      .from(forumThreads)
      .where(eq(forumThreads.id, threadId))
      .limit(1);

    if (thread[0]) {
      await db
        .update(forumThreads)
        .set({
          replyCount: thread[0].replyCount + 1,
          lastReplyAt: now,
        })
        .where(eq(forumThreads.id, threadId));
    }

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Erreur lors de la publication de la réponse" },
      { status: 500 }
    );
  }
}
