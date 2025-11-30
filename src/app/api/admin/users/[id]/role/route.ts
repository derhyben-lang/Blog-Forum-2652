import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, session } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract and validate Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'NO_TOKEN' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Query session and join with user to verify admin access
    const sessionResult = await db
      .select({
        userId: session.userId,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
      })
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.token, token))
      .limit(1);

    if (sessionResult.length === 0 || sessionResult[0].userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required', code: 'NOT_ADMIN' },
        { status: 403 }
      );
    }

    // Extract id from params
    const { id } = await params;

    // Validate id parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || (role !== 'user' && role !== 'admin')) {
      return NextResponse.json(
        { error: 'Role must be either \'user\' or \'admin\'', code: 'INVALID_ROLE' },
        { status: 400 }
      );
    }

    // Update user with new role
    const updated = await db
      .update(user)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();

    // Check if user was found and updated
    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}