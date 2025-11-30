import { db } from "@/db";
import { blogPosts, forumThreads } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Calendar, ArrowRight, Star, Users, Target, Zap } from "lucide-react";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { Suspense } from "react";

async function getFeaturedPosts() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isFeatured, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);
  
  return posts;
}

async function getRecentPosts() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt))
    .limit(6);
  
  return posts;
}

async function getRecentThreads() {
  const threads = await db
    .select()
    .from(forumThreads)
    .orderBy(desc(forumThreads.createdAt))
    .limit(5);
  
  return threads;
}

export default async function Home() {
  const [featuredPosts, recentPosts, recentThreads] = await Promise.all([
    getFeaturedPosts(),
    getRecentPosts(),
    getRecentThreads(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-background border-b overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary">
              <Star className="w-3 h-3 mr-1" />
              Bienvenue
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Blog & Forum Tech
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez nos articles sur le développement web, partagez vos idées et rejoignez une communauté passionnée de développeurs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="w-full sm:w-auto">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explorer le Blog
                </Button>
              </Link>
              <Link href="/forum">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Rejoindre le Forum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About/Presentation Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              Qui sommes-nous ?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Une Communauté Passionnée par la Tech
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nous sommes une plateforme dédiée aux développeurs francophones qui souhaitent apprendre, 
              partager et grandir ensemble dans le monde du développement web et des technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Contenu de Qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Des tutoriels détaillés, des guides pratiques et des articles approfondis sur les dernières technologies
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Communauté Active</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Un forum bienveillant où poser vos questions, partager vos projets et échanger avec d'autres développeurs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Toujours à Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suivez les dernières tendances, frameworks et best practices du monde du développement web
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/about">
              <Button variant="outline" size="lg">
                En savoir plus sur nous
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-3xl font-bold">Articles en vedette</h2>
            </div>
            <Link href="/blog">
              <Button variant="ghost">
                Voir tout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
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
        </section>
      )}

      {/* Recent Posts & Forum Activity - Two Columns */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Blog Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Articles récents</h2>
                </div>
                <Link href="/blog">
                  <Button variant="ghost" size="sm">
                    Voir tout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentPosts.slice(0, 5).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="hover:shadow-md transition-shadow group">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.authorName}</span>
                          <span>•</span>
                          <time>
                            {new Date(post.publishedAt!).toLocaleDateString("fr-FR")}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Forum Threads */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Discussions récentes</h2>
                </div>
                <Link href="/forum">
                  <Button variant="ghost" size="sm">
                    Voir tout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentThreads.map((thread) => (
                  <Link key={thread.id} href={`/forum/thread/${thread.slug}`}>
                    <Card className="hover:shadow-md transition-shadow group">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {thread.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{thread.authorName}</span>
                          <span>•</span>
                          <span>{thread.replyCount} réponse{thread.replyCount !== 1 ? "s" : ""}</span>
                          <span>•</span>
                          <time>
                            {new Date(thread.createdAt).toLocaleDateString("fr-FR")}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <Suspense fallback={<div className="h-64" />}>
          <NewsletterForm variant="default" />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-t border-b py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Explorez nos articles</CardTitle>
                <CardDescription>
                  Des tutoriels, des guides et des insights sur le développement web moderne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog">
                  <Button className="w-full">
                    Voir le blog
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Rejoignez la communauté</CardTitle>
                <CardDescription>
                  Posez vos questions, partagez vos expériences et apprenez avec d'autres développeurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/forum">
                  <Button className="w-full">
                    Accéder au forum
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}