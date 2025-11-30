import { db } from "@/db";
import { forumCategories } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.select().from(forumCategories);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
