import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || "",
        content: body.content,
        authorName: body.authorName,
        featuredImageUrl: body.featuredImageUrl || null,
        publishedAt: body.publishedAt || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isFeatured: body.isFeatured || false,
      })
      .returning();

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
