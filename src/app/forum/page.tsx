import { db } from "@/db";
import { forumCategories, forumThreads } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";

export const metadata = {
  title: "Forum - Discussions & Communauté",
  description: "Rejoignez notre communauté et participez aux discussions",
};

async function getCategories() {
  const categories = await db
    .select()
    .from(forumCategories)
    .orderBy(forumCategories.id);
  
  return categories;
}

async function getRecentThreads() {
  const threads = await db
    .select()
    .from(forumThreads)
    .orderBy(desc(forumThreads.createdAt))
    .limit(10);
  
  return threads;
}

async function getThreadsByCategory(categoryId: number) {
  const threads = await db
    .select()
    .from(forumThreads)
    .where(eq(forumThreads.categoryId, categoryId))
    .orderBy(desc(forumThreads.lastReplyAt), desc(forumThreads.createdAt))
    .limit(5);
  
  return threads;
}

export default async function ForumPage() {
  const categories = await getCategories();
  const recentThreads = await getRecentThreads();
  
  // Get thread counts for each category
  const categoriesWithThreads = await Promise.all(
    categories.map(async (category) => {
      const threads = await getThreadsByCategory(category.id);
      return {
        ...category,
        threads,
      };
    })
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Users className="w-3 h-3 mr-1" />
              Forum
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Discussions & Communauté
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez notre communauté, posez vos questions et partagez vos connaissances avec d'autres passionnés.
            </p>
            <Link href="/forum/new-thread">
              <Button size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Créer une discussion
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Categories */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Catégories</h2>
            </div>

            {categoriesWithThreads.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/forum/category/${category.slug}`}>
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                      </Link>
                      <CardDescription className="mt-2">
                        {category.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {category.postCount}
                    </Badge>
                  </div>
                </CardHeader>
                
                {category.threads.length > 0 && (
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Discussions récentes
                      </h4>
                      {category.threads.map((thread) => (
                        <Link
                          key={thread.id}
                          href={`/forum/thread/${thread.slug}`}
                          className="block"
                        >
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate hover:text-primary transition-colors">
                                {thread.title}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span>Par {thread.authorName}</span>
                                <span>•</span>
                                <span>{thread.replyCount} réponse{thread.replyCount !== 1 ? "s" : ""}</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(thread.createdAt).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentThreads.slice(0, 5).map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/forum/thread/${thread.slug}`}
                    className="block"
                  >
                    <div className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                        {thread.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(thread.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Catégories</span>
                  <span className="font-bold">{categories.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Discussions</span>
                  <span className="font-bold">
                   { categories.reduce((acc, cat) => acc + (cat.postCount ?? 0), 0) }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="font-bold">
                    {recentThreads.reduce((acc, thread) => acc + thread.replyCount, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Rejoignez la discussion</CardTitle>
                <CardDescription>
                  Partagez vos idées et apprenez des autres membres de la communauté
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/forum/new-thread">
                  <Button className="w-full">
                    Créer une discussion
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
