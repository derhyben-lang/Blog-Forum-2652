import { db } from "@/db";
import { forumThreads, forumCategories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const threads = await db
      .select({
        id: forumThreads.id,
        categoryId: forumThreads.categoryId,
        title: forumThreads.title,
        slug: forumThreads.slug,
        authorName: forumThreads.authorName,
        createdAt: forumThreads.createdAt,
        replyCount: forumThreads.replyCount,
        categoryName: forumCategories.name,
      })
      .from(forumThreads)
      .leftJoin(forumCategories, eq(forumThreads.categoryId, forumCategories.id))
      .orderBy(desc(forumThreads.createdAt));

    return NextResponse.json(threads);
  } catch (error) {
    console.error("Error fetching threads:", error);
    return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 });
  }
}
