"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  authorName: string;
  publishedAt: Date | null;
  featuredImageUrl: string | null;
  isFeatured: boolean;
}

interface BlogPostsGridProps {
  featuredPosts: BlogPost[];
  regularPosts: BlogPost[];
}

export function BlogPostsGrid({ featuredPosts, regularPosts }: BlogPostsGridProps) {
  return (
    <>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-3xl font-bold">Articles en vedette</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
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
                    <CardTitle className="group-hover:text-primary transition-colors">
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

      {/* All Posts */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8">Tous les articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
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
                  <CardTitle className="group-hover:text-primary transition-colors">
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
    </>
  );
}