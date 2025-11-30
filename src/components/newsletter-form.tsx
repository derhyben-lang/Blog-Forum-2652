"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

interface NewsletterFormProps {
  variant?: "default" | "compact";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Merci ! Vous êtes maintenant abonné à notre newsletter.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "compact") {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Abonnez-vous à notre newsletter</CardTitle>
          <CardDescription>
            Recevez les derniers articles directement dans votre boîte mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
              className="w-full"
              disabled={isSubmitting}
            />
            
            {/* RGPD Consent */}
            <div className="flex items-start gap-2 text-left">
              <Checkbox 
                id="consent" 
                name="consent" 
                required 
                className="mt-1"
                disabled={isSubmitting}
              />
              <label 
                htmlFor="consent" 
                className="text-sm text-muted-foreground leading-tight cursor-pointer"
              >
                J'accepte de recevoir des emails de la part de ce site et je comprends que je peux me désabonner à tout moment. 
                En soumettant ce formulaire, j'accepte que mes données soient utilisées conformément à la{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  politique de confidentialité
                </Link>.
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Inscription en cours..." : "S'abonner"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl mb-2">
          Restez informé
        </CardTitle>
        <CardDescription className="text-base">
          Abonnez-vous à notre newsletter pour recevoir les derniers articles et actualités directement dans votre boîte mail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "..." : "S'abonner"}
            </Button>
          </div>
          
          {/* RGPD Consent */}
          <div className="flex items-start gap-2 text-left">
            <Checkbox 
              id="consent-home" 
              name="consent" 
              required 
              className="mt-1"
              disabled={isSubmitting}
            />
            <label 
              htmlFor="consent-home" 
              className="text-sm text-muted-foreground leading-tight cursor-pointer"
            >
              J'accepte de recevoir des emails de la part de ce site et je comprends que je peux me désabonner à tout moment. 
              En soumettant ce formulaire, j'accepte que mes données soient utilisées conformément à la{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                politique de confidentialité
              </Link>.
            </label>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
