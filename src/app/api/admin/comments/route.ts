import { db } from "@/db";
import { blogComments, blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const comments = await db
      .select({
        id: blogComments.id,
        postId: blogComments.postId,
        authorName: blogComments.authorName,
        authorEmail: blogComments.authorEmail,
        content: blogComments.content,
        createdAt: blogComments.createdAt,
        postTitle: blogPosts.title,
        postSlug: blogPosts.slug,
      })
      .from(blogComments)
      .leftJoin(blogPosts, eq(blogComments.postId, blogPosts.id))
      .orderBy(desc(blogComments.createdAt));

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
