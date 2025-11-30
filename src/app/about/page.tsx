import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, MessageSquare, Lightbulb, Target, Heart } from "lucide-react";

export const metadata = {
  title: "À propos de nous - Blog & Forum Tech",
  description: "Découvrez qui nous sommes, notre mission et notre vision pour la communauté tech francophone",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              À propos de nous
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Mission
            </h1>
            <p className="text-xl text-muted-foreground">
              Créer un espace d'apprentissage, de partage et d'entraide pour tous les passionnés de développement web et de technologies
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Notre Histoire
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Blog & Forum Tech</strong> est né d'une passion commune pour le développement web et le désir de créer un espace francophone où les développeurs, débutants comme expérimentés, peuvent apprendre et grandir ensemble.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous croyons fermement que le partage de connaissances et l'entraide sont les clés du succès dans le monde du développement. C'est pourquoi nous avons créé cette plateforme qui combine blog éducatif et forum communautaire.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chaque jour, nous travaillons pour offrir du contenu de qualité, des tutoriels pratiques et un espace d'échange bienveillant où chacun peut poser ses questions et partager son expertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Les principes qui guident notre communauté au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Apprentissage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous croyons en l'apprentissage continu et mettons à disposition des ressources de qualité pour progresser à son rythme.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  L'entraide et le respect sont au cœur de notre communauté. Chaque question mérite une réponse constructive.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Bienveillance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Un environnement positif et encourageant où chacun peut apprendre sans crainte du jugement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce Que Nous Offrons</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une plateforme complète pour apprendre et échanger
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Blog Tech</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tutoriels détaillés sur le développement web</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Articles sur les dernières tendances tech</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Guides pratiques et best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Analyses approfondies de technologies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Forum Communautaire</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Posez vos questions techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Partagez vos projets et expériences</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Débattez des meilleures pratiques</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Connectez-vous avec d'autres développeurs</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-t py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Rejoignez Notre Communauté
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Que vous soyez débutant ou expert, vous avez votre place parmi nous. Ensemble, nous apprenons et grandissons chaque jour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/blog">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="pt-6">
                    <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Explorer le Blog</p>
                  </CardContent>
                </Card>
              </a>
              <a href="/forum">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                  <CardContent className="pt-6">
                    <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Rejoindre le Forum</p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
