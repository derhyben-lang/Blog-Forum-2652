import { db } from "@/db";
import { blogComments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const postId = parseInt(formData.get("postId") as string);
    const authorName = formData.get("authorName") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const content = formData.get("content") as string;

    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (!authorEmail.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    await db.insert(blogComments).values({
      postId,
      authorName,
      authorEmail,
      content,
      createdAt: new Date().toISOString(),
    });

    // Redirect back to the blog post
    const referer = request.headers.get("referer") || "/blog";
    return NextResponse.redirect(new URL(referer + "?comment=success", request.url), 303);
  } catch (error) {
    console.error("Comment submission error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la publication du commentaire" },
      { status: 500 }
    );
  }
}
