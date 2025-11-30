import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const categoryId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { name, slug, description } = body;

    // Build update object with only provided fields
    const updateData: {
      name?: string;
      slug?: string;
      description?: string | null;
    } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Name must be a non-empty string', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string' || slug.trim().length === 0) {
        return NextResponse.json(
          { error: 'Slug must be a non-empty string', code: 'INVALID_SLUG' },
          { status: 400 }
        );
      }
      updateData.slug = slug.trim().toLowerCase();
    }

    if (description !== undefined) {
      updateData.description = description ? description.trim() : null;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update', code: 'NO_UPDATE_FIELDS' },
        { status: 400 }
      );
    }

    // Update the category
    const updated = await db
      .update(blogCategories)
      .set(updateData)
      .where(eq(blogCategories.id, categoryId))
      .returning();

    // Check if category was found
    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Category not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const categoryId = parseInt(id);

    // Delete the category
    await db
      .delete(blogCategories)
      .where(eq(blogCategories.id, categoryId));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}