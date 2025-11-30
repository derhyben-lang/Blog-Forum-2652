import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts, forumThreads } from "@/db/schema";
import { like, or, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = `%${query}%`;

    // Search blog posts
    const posts = await db
      .select()
      .from(blogPosts)
      .where(
        or(
          like(blogPosts.title, searchTerm),
          like(blogPosts.excerpt, searchTerm),
          like(blogPosts.content, searchTerm)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(5);

    // Search forum threads
    const threads = await db
      .select()
      .from(forumThreads)
      .where(
        or(
          like(forumThreads.title, searchTerm),
          like(forumThreads.body, searchTerm)
        )
      )
      .orderBy(desc(forumThreads.createdAt))
      .limit(5);

    // Combine and format results
    const results = [
      ...posts.map((post) => ({
        type: "blog" as const,
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || "",
        slug: post.slug,
        authorName: post.authorName,
        date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      })),
      ...threads.map((thread) => ({
        type: "forum" as const,
        id: thread.id,
        title: thread.title,
        excerpt: thread.content.substring(0, 150) + "...",
        slug: thread.slug,
        authorName: thread.authorName,
        date: thread.createdAt.toISOString(),
      })),
    ].slice(0, 10); // Limit to 10 total results

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
