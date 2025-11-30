import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        authorName: body.authorName,
        featuredImageUrl: body.featuredImageUrl || null,
        isFeatured: body.isFeatured,
      })
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
