import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, session } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Extract Bearer token from Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'NO_TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Query session and join with user to get requesting user details
    const sessionData = await db
      .select({
        userId: session.userId,
        sessionId: session.id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
      })
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.token, token))
      .limit(1);

    // Verify session exists and user is admin
    if (sessionData.length === 0 || sessionData[0].userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required', code: 'NOT_ADMIN' },
        { status: 403 }
      );
    }

    // Fetch all users
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(desc(user.createdAt));

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}