import { db } from "@/db";
import { forumReplies, forumThreads } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const replies = await db
      .select({
        id: forumReplies.id,
        threadId: forumReplies.threadId,
        authorName: forumReplies.authorName,
        content: forumReplies.content,
        createdAt: forumReplies.createdAt,
        threadTitle: forumThreads.title,
        threadSlug: forumThreads.slug,
      })
      .from(forumReplies)
      .leftJoin(forumThreads, eq(forumReplies.threadId, forumThreads.id))
      .orderBy(desc(forumReplies.createdAt));

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}
