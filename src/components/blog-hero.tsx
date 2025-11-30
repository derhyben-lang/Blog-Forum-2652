"use client";

import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

export function BlogHero() {
  return (
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
          
          <NewsletterForm variant="compact" />
        </div>
      </div>
    </section>
  );
}