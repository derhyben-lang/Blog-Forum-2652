import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Politique de Confidentialité - RGPD",
  description: "Notre politique de confidentialité et traitement des données personnelles",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Shield className="w-3 h-3 mr-1" />
              Confidentialité
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-muted-foreground">
              Conforme au Règlement Général sur la Protection des Données (RGPD)
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Collecte des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Nous collectons uniquement les données que vous nous fournissez volontairement :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Newsletter</strong> : Votre adresse email pour vous envoyer nos articles</li>
                <li><strong>Commentaires</strong> : Nom, email et contenu du commentaire</li>
                <li><strong>Forum</strong> : Nom d'utilisateur, email et contenus publiés</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Utilisation des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Vos données sont utilisées uniquement pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vous envoyer la newsletter (si vous vous êtes abonné)</li>
                <li>Afficher vos commentaires et publications sur le blog/forum</li>
                <li>Vous contacter en cas de besoin concernant votre contenu</li>
                <li>Améliorer nos services</li>
              </ul>
              <p className="font-semibold">
                Nous ne vendons jamais vos données à des tiers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Le traitement de vos données personnelles est basé sur :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consentement</strong> : Pour la newsletter, vous donnez votre consentement explicite via la case à cocher</li>
                <li><strong>Intérêt légitime</strong> : Pour gérer les commentaires et le forum</li>
                <li><strong>Exécution d'un contrat</strong> : Pour fournir les services demandés</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Vos données sont conservées :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Newsletter</strong> : Jusqu'à votre désinscription</li>
                <li><strong>Commentaires/Forum</strong> : Tant que le contenu est publié (ou jusqu'à demande de suppression)</li>
                <li><strong>Logs techniques</strong> : Maximum 12 mois</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Vos droits (RGPD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès</strong> : Demander une copie de vos données</li>
                <li><strong>Droit de rectification</strong> : Corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : Demander la suppression de vos données</li>
                <li><strong>Droit d'opposition</strong> : Vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : Récupérer vos données dans un format structuré</li>
                <li><strong>Droit de retrait du consentement</strong> : Vous désabonner à tout moment</li>
              </ul>
              <p className="pt-4">
                Pour exercer ces droits, contactez-nous à : <strong>privacy@votredomaine.com</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Mises à jour de sécurité régulières</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Nous utilisons des cookies techniques nécessaires au fonctionnement du site. 
                Aucun cookie de tracking ou publicitaire n'est utilisé sans votre consentement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Désinscription de la newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Vous pouvez vous désabonner à tout moment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>En cliquant sur le lien de désinscription dans chaque email</li>
                <li>En nous contactant directement à : newsletter@votredomaine.com</li>
                <li>Via votre espace personnel (si connecté)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Transferts de données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Vos données sont hébergées dans l'Union Européenne et ne sont pas transférées en dehors 
                de l'UE sans garanties appropriées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact & Réclamations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong>Responsable du traitement des données :</strong><br />
                [Votre Nom/Entreprise]<br />
                Email : privacy@votredomaine.com
              </p>
              <p className="pt-4">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation 
                auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) :
              </p>
              <p>
                <strong>CNIL</strong><br />
                3 Place de Fontenoy<br />
                TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Tél : 01 53 73 22 22<br />
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  www.cnil.fr
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Cette politique de confidentialité peut être mise à jour. La date de dernière modification 
                est indiquée ci-dessous. Nous vous encourageons à consulter régulièrement cette page.
              </p>
              <p className="pt-4 text-sm">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <Link href="/blog">
              <button className="text-primary hover:underline">
                ← Retour au blog
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
