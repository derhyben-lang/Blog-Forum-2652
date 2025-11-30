import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogCategories } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(blogCategories)
      .orderBy(asc(blogCategories.name));

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}