"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Home, Info, Mail, Search, Shield, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SearchDialog } from "@/components/search-dialog";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isAdmin = pathname.startsWith("/admin");
  
  const userRole = session?.user ? (session.user as any).role : null;
  const isAdminUser = userRole === "admin";

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("bearer_token");

    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (error?.code) {
      toast.error("Erreur lors de la déconnexion");
      setIsLoggingOut(false);
    } else {
      localStorage.removeItem("bearer_token");
      toast.success("Déconnecté avec succès");
      refetch();
      router.push("/");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Blog & Forum Tech</span>
              <span className="inline sm:hidden whitespace-nowrap">B&F Tech</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/">
                <Button 
                  variant={isActive("/") ? "default" : "ghost"} 
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Accueil
                </Button>
              </Link>
              <Link href="/blog">
                <Button 
                  variant={isActive("/blog") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Button>
              </Link>
              <Link href="/forum">
                <Button 
                  variant={isActive("/forum") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Forum
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant={isActive("/about") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Info className="w-4 h-4" />
                  À propos
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant={isActive("/contact") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
              </Link>
              
              <div className="border-l h-8" />
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(true)}
                title="Rechercher"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              {/* Admin button - only show for admin users */}
              {isAdminUser && (
                <Link href="/admin">
                  <Button 
                    variant={isAdmin ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              )}

              {/* Auth buttons */}
              {!isPending && !session?.user ? (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      {session.user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </nav>

            {/* Mobile Menu */}
            <nav className="flex md:hidden items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link href="/blog">
                <Button variant="ghost" size="icon">
                  <BookOpen className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </Link>
              {isAdminUser && (
                <Link href="/admin">
                  <Button variant="ghost" size="icon">
                    <Shield className="w-5 h-5" />
                  </Button>
                </Link>
              )}
              {!isPending && !session?.user && (
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <LogIn className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};