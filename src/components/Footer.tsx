import Link from "next/link";
import { BookOpen, MessageSquare, Mail, Info, Home } from "lucide-react";
import { SocialLinks } from "@/components/social-links";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Blog & Forum Tech</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre communauté francophone pour apprendre et partager sur le développement web
            </p>
            
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-semibold mb-3 text-sm">Suivez-nous</h4>
              <SocialLinks />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories du Blog */}
          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  JavaScript & TypeScript
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Design & UX
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  DevOps & Cloud
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Blog & Forum Tech. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};