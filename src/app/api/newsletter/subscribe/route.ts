import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const consent = formData.get("consent");

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.redirect(
        new URL("/blog?message=invalid_email", request.url),
        303
      );
    }

    // Validate RGPD consent
    if (!consent || consent !== "on") {
      return NextResponse.redirect(
        new URL("/blog?message=consent_required", request.url),
        303
      );
    }

    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
     .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.redirect(
        new URL("/blog?message=already_subscribed", request.url),
        303
      );
    }

    // Insert new subscriber
    await db.insert(newsletterSubscribers).values({
      email,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    });

    return NextResponse.redirect(
      new URL("/blog?message=subscribed", request.url),
      303
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.redirect(
      new URL("/blog?message=error", request.url),
      303
    );
  }
}
