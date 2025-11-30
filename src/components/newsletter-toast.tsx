"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function NewsletterToast() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (!message) return;

    switch (message) {
      case "subscribed":
        toast.success("Inscription réussie !", {
          description: "Vous recevrez nos prochains articles par email.",
        });
        break;
      case "already_subscribed":
        toast.info("Déjà inscrit", {
          description: "Cette adresse email est déjà abonnée à la newsletter.",
        });
        break;
      case "invalid_email":
        toast.error("Email invalide", {
          description: "Veuillez saisir une adresse email valide.",
        });
        break;
      case "consent_required":
        toast.error("Consentement requis", {
          description: "Vous devez accepter la politique de confidentialité pour vous abonner.",
        });
        break;
      case "error":
        toast.error("Erreur", {
          description: "Une erreur est survenue. Veuillez réessayer.",
        });
        break;
    }

    // Clean URL after showing toast
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("message");
      window.history.replaceState({}, "", url.toString());
    }
  }, [message]);

  return null;
}