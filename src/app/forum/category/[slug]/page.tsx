import { db } from "@/db";
import { forumCategories, forumThreads } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Clock, User } from "lucide-react";

async function getCategory(slug: string) {
  const category = await db
    .select()
    .from(forumCategories)
    .where(eq(forumCategories.slug, slug))
    .limit(1);
  
  return category[0] || null;
}

async function getCategoryThreads(categoryId: number) {
  const threads = await db
    .select()
    .from(forumThreads)
    .where(eq(forumThreads.categoryId, categoryId))
    .orderBy(desc(forumThreads.lastReplyAt), desc(forumThreads.createdAt));
  
  return threads;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) {
    return {
      title: "Catégorie non trouvée",
    };
  }
  
  return {
    title: `${category.name} - Forum`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  
  if (!category) {
    notFound();
  }
  
  const threads = await getCategoryThreads(category.id);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/forum">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au forum
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Discussions</h2>
              <Badge variant="secondary">
                {threads.length} discussion{threads.length !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Link href="/forum/new-thread">
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                Nouvelle discussion
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {threads.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Aucune discussion</h3>
                  <p className="text-muted-foreground mb-4">
                    Soyez le premier à créer une discussion dans cette catégorie !
                  </p>
                  <Link href="/forum/new-thread">
                    <Button>Créer une discussion</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              threads.map((thread) => (
                <Link key={thread.id} href={`/forum/thread/${thread.slug}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl hover:text-primary transition-colors mb-2">
                            {thread.title}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{thread.authorName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <time>
                                {new Date(thread.createdAt).toLocaleDateString("fr-FR")}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>
                                {thread.replyCount} réponse{thread.replyCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        {thread.lastReplyAt && (
                          <div className="text-sm text-muted-foreground text-right whitespace-nowrap">
                            Dernière réponse<br />
                            {new Date(thread.lastReplyAt).toLocaleDateString("fr-FR")}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
