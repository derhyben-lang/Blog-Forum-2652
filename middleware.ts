import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Not authenticated - redirect to login
    if (!session?.user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Authenticated but not admin - forbidden
    const userRole = (session.user as any).role || "user";
    if (userRole !== "admin") {
      return NextResponse.json(
        { error: "Accès refusé. Droits administrateur requis." },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};