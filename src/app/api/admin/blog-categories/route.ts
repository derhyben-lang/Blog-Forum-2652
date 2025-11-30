import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogCategories } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const categories = await db.select()
      .from(blogCategories)
      .orderBy(desc(blogCategories.createdAt));

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ 
        error: "Name is required",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!slug) {
      return NextResponse.json({ 
        error: "Slug is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedSlug = slug.trim().toLowerCase();
    const sanitizedDescription = description ? description.trim() : null;

    // Insert new category
    const newCategory = await db.insert(blogCategories)
      .values({
        name: sanitizedName,
        slug: sanitizedSlug,
        description: sanitizedDescription,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}