import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogCategories, blogPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        { 
          error: 'Slug parameter is required',
          code: 'MISSING_SLUG'
        },
        { status: 400 }
      );
    }

    // Fetch category by slug
    const category = await db.select()
      .from(blogCategories)
      .where(eq(blogCategories.slug, slug))
      .limit(1);

    // Return 404 if category not found
    if (category.length === 0) {
      return NextResponse.json(
        { 
          error: 'Category not found',
          code: 'CATEGORY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Fetch all blog posts belonging to this category
    const posts = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.categoryId, category[0].id))
      .orderBy(desc(blogPosts.publishedAt));

    // Return category with its posts
    return NextResponse.json({
      category: category[0],
      posts: posts
    });

  } catch (error) {
    console.error('GET category by slug error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}