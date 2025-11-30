import { db } from "@/db";
import { blogPosts, blogCategories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, BookOpen } from "lucide-react";
import Image from "next/image";

async function getCategoryBySlug(slug: string) {
  const categories = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.slug, slug))
    .limit(1);
  
  return categories[0];
}

async function getPostsByCategory(categoryId: number) {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.categoryId, categoryId))
    .orderBy(desc(blogPosts.publishedAt));
  
  return posts;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Catégorie introuvable",
    };
  }
  
  return {
    title: `${category.name} - Blog & Forum Tech`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  const posts = await getPostsByCategory(category.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux catégories
              </Button>
            </Link>
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="w-3 h-3 mr-1" />
              Catégorie
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {category.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
                  {post.featuredImageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <time>
                        {new Date(post.publishedAt!).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Par {post.authorName}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 max-w-2xl mx-auto">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Aucun article dans cette catégorie</h3>
            <p className="text-muted-foreground mb-6">
              Les articles de cette catégorie seront bientôt disponibles.
            </p>
            <Link href="/blog">
              <Button>
                Voir tous les articles
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
