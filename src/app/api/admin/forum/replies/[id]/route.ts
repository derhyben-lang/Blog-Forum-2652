import { db } from "@/db";
import { forumReplies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(forumReplies).where(eq(forumReplies.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json({ error: "Failed to delete reply" }, { status: 500 });
  }
}
