"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé avec succès ! Nous vous répondrons bientôt.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Mail className="w-3 h-3 mr-1" />
              Contactez-nous
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nous Sommes à Votre Écoute
            </h1>
            <p className="text-xl text-muted-foreground">
              Une question, une suggestion ou besoin d'aide ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jean@exemple.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre demande ou votre question..."
                      className="min-h-[200px] resize-none"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  contact@blog-forum-tech.fr
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Réponse sous 24-48h
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Posez vos questions directement sur le forum pour obtenir l'aide de la communauté
                </p>
                <a href="/forum">
                  <Button variant="outline" size="sm" className="w-full">
                    Accéder au Forum
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Horaires</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lundi - Vendredi<br />
                  9h00 - 18h00 (CET)
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Paris, France<br />
                  Communauté francophone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 border-t py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comment contribuer au blog ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Si vous souhaitez publier un article sur notre blog, contactez-nous par email avec votre proposition. Nous recherchons toujours des contributeurs passionnés !
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comment signaler un problème technique ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Utilisez le formulaire de contact ci-dessus en décrivant le problème rencontré. Incluez des captures d'écran si possible pour nous aider à mieux comprendre.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Puis-je suggérer des sujets d'articles ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolument ! Vos suggestions sont les bienvenues. Envoyez-nous vos idées via le formulaire de contact et nous ferons de notre mieux pour les traiter.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
