import { db } from "@/db";
import { blogPosts, blogComments, newsletterSubscribers, forumThreads } from "@/db/schema";
import { sql, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7)).toISOString();

    const [
      totalPosts,
      totalComments,
      totalSubscribers,
      totalThreads,
      recentPosts,
      recentComments,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(blogPosts),
      db.select({ count: sql<number>`count(*)` }).from(blogComments),
      db.select({ count: sql<number>`count(*)` }).from(newsletterSubscribers),
      db.select({ count: sql<number>`count(*)` }).from(forumThreads),
      db.select({ count: sql<number>`count(*)` }).from(blogPosts).where(gte(blogPosts.createdAt, oneMonthAgo)),
      db.select({ count: sql<number>`count(*)` }).from(blogComments).where(gte(blogComments.createdAt, oneWeekAgo)),
    ]);

    return NextResponse.json({
      totalPosts: Number(totalPosts[0]?.count || 0),
      totalComments: Number(totalComments[0]?.count || 0),
      totalSubscribers: Number(totalSubscribers[0]?.count || 0),
      totalThreads: Number(totalThreads[0]?.count || 0),
      recentPosts: Number(recentPosts[0]?.count || 0),
      recentComments: Number(recentComments[0]?.count || 0),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
