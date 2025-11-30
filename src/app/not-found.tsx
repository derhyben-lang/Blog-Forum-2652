import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, BookOpen, MessageSquare, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <div className="relative -mt-8">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
              <Search className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Page introuvable
          </h2>
          <p className="text-lg text-muted-foreground">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5 mr-2" />
              Voir le blog
            </Button>
          </Link>
        </div>

        {/* Suggestions Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/blog">
            <Card className="hover:shadow-lg transition-shadow text-left">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Explorez nos articles</CardTitle>
                <CardDescription>
                  Découvrez des tutoriels et guides sur le développement web
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/forum">
            <Card className="hover:shadow-lg transition-shadow text-left">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Rejoignez le forum</CardTitle>
                <CardDescription>
                  Posez vos questions à la communauté de développeurs
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Besoin d'aide ? <Link href="/contact" className="text-primary hover:underline">Contactez-nous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
