import { db } from "@/db";
import { forumThreads, forumReplies } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const thread = await db
      .select()
      .from(forumThreads)
      .where(eq(forumThreads.slug, slug))
      .limit(1);

    if (!thread || thread.length === 0) {
      return NextResponse.json(
        { error: "Discussion non trouvée" },
        { status: 404 }
      );
    }

    const replies = await db
      .select()
      .from(forumReplies)
      .where(eq(forumReplies.threadId, thread[0].id))
      .orderBy(forumReplies.createdAt);

    return NextResponse.json({
      thread: thread[0],
      replies,
    });
  } catch (error) {
    console.error("Error fetching thread:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la discussion" },
      { status: 500 }
    );
  }
}
