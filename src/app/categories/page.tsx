import { db } from "@/db";
import { blogPosts, blogCategories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, ArrowRight, BookOpen } from "lucide-react";

async function getCategoriesWithCounts() {
  const categories = await db.select().from(blogCategories).orderBy(blogCategories.name);
  
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.categoryId, category.id));
      
      return {
        ...category,
        postCount: posts.length,
      };
    })
  );
  
  return categoriesWithCounts;
}

export const metadata = {
  title: "Catégories - Blog & Forum Tech",
  description: "Découvrez tous nos articles classés par catégories",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <FolderOpen className="w-3 h-3 mr-1" />
              Organisation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catégories d'Articles
            </h1>
            <p className="text-lg text-muted-foreground">
              Explorez nos articles par thématique pour trouver exactement ce qui vous intéresse
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary">
                      {category.postCount} {category.postCount === 1 ? "article" : "articles"}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Voir les articles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Aucune catégorie</h3>
            <p className="text-muted-foreground">
              Les catégories seront bientôt disponibles.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
