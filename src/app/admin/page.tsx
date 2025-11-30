"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, FileText, MessageSquare, Mail, Users, Tag, Loader2, UserCog } from "lucide-react";
import BlogPostsManager from "@/components/admin/BlogPostsManager";
import CommentsManager from "@/components/admin/CommentsManager";
import NewsletterManager from "@/components/admin/NewsletterManager";
import ForumManager from "@/components/admin/ForumManager";
import AdminStats from "@/components/admin/AdminStats";
import CategoriesManager from "@/components/admin/CategoriesManager";
import ForumUsersManager from "@/components/admin/ForumUsersManager";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Protect admin page - redirect if not authenticated or not admin
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/admin");
    } else if (!isPending && session?.user) {
      const userRole = (session.user as any).role || "user";
      if (userRole !== "admin") {
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  // Show loading while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!session?.user || (session.user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <LayoutDashboard className="w-8 h-8" />
                Administration
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez votre blog, forum et abonnés
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Interface Admin
              </Badge>
              <Badge variant="default" className="text-sm">
                {session.user.name}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Tableau de bord</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">Catégories</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Commentaires</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Newsletter</span>
            </TabsTrigger>
            <TabsTrigger value="forum" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Forum</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <UserCog className="w-4 h-4" />
              <span className="hidden sm:inline">Utilisateurs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminStats />
          </TabsContent>

          <TabsContent value="posts">
            <BlogPostsManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="comments">
            <CommentsManager />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterManager />
          </TabsContent>

          <TabsContent value="forum">
            <ForumManager />
          </TabsContent>

          <TabsContent value="users">
            <ForumUsersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}