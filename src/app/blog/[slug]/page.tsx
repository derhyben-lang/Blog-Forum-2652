import { db } from "@/db";
import { blogPosts, blogComments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, User, MessageCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ShareButtons } from "@/components/share-buttons";

async function getPost(slug: string) {
  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  
  return post[0] || null;
}

async function getComments(postId: number) {
  const comments = await db
    .select()
    .from(blogComments)
    .where(eq(blogComments.postId, postId))
    .orderBy(desc(blogComments.createdAt));
  
  return comments;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const comments = await getComments(post.id);
  
  // Construct full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://blog-tech.vercel.app";
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8">
          {post.isFeatured && (
            <Badge className="mb-4" variant="secondary">
              Article en vedette
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.publishedAt!).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length} commentaire{comments.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="my-8 p-6 bg-muted/50 rounded-lg border">
          <ShareButtons 
            title={post.title}
            url={articleUrl}
            description={post.excerpt || undefined}
          />
        </div>

        <Separator className="my-12" />

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Commentaires ({comments.length})
          </h2>

          {/* Comment Form */}
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">Laisser un commentaire</h3>
            </CardHeader>
            <CardContent>
              <form action="/api/blog/comments" method="POST" className="space-y-4">
                <input type="hidden" name="postId" value={post.id} />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="authorName">Nom *</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="authorEmail">Email *</Label>
                    <Input
                      id="authorEmail"
                      name="authorEmail"
                      type="email"
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Commentaire *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    required
                    rows={4}
                    placeholder="Partagez vos réflexions..."
                  />
                </div>
                
                <Button type="submit">
                  Publier le commentaire
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </CardContent>
              </Card>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{comment.authorName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </article>
    </div>
  );
}