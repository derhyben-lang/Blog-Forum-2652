import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { BlogPostsGrid } from "@/components/blog-posts-grid";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

async function getBlogPosts() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt))
    .limit(50);
  
  return posts;
}

async function getFeaturedPosts() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isFeatured, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);
  
  return posts;
}

export default async function BlogPage() {
  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedPosts(),
  ]);

  const regularPosts = allPosts.filter(post => !post.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Articles & Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez nos derniers articles sur le développement web, la technologie, le design et bien plus encore.
            </p>
          </div>
        </div>
      </section>
      
      <<BlogPostsGrid
  featuredPosts={featuredPosts.map(post => ({
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    isFeatured: !!post.isFeatured,   // ← cette ligne en plus résout tout
  }))}
  regularPosts={regularPosts.map(post => ({
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    isFeatured: !!post.isFeatured,   // ← et ici aussi
  }))}
/>
/>
    </div>
  );
}
