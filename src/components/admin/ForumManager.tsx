"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ForumCategory {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  postCount: number;
}

interface ForumThread {
  id: number;
  categoryId: number;
  categoryName?: string;
  title: string;
  slug: string;
  authorName: string;
  createdAt: string;
  replyCount: number;
}

interface ForumReply {
  id: number;
  threadId: number;
  threadTitle?: string;
  threadSlug?: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export default function ForumManager() {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, threadsRes, repliesRes] = await Promise.all([
        fetch("/api/admin/forum/categories"),
        fetch("/api/admin/forum/threads"),
        fetch("/api/admin/forum/replies"),
      ]);

      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data);
      }
      if (threadsRes.ok) {
        const data = await threadsRes.json();
        setThreads(data);
      }
      if (repliesRes.ok) {
        const data = await repliesRes.json();
        setReplies(data);
      }
    } catch (error) {
      console.error("Error fetching forum data:", error);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteThread = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette discussion ?")) return;

    try {
      const response = await fetch(`/api/admin/forum/threads/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Discussion supprimée avec succès");
        fetchData();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Error deleting thread:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleDeleteReply = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return;

    try {
      const response = await fetch(`/api/admin/forum/replies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Réponse supprimée avec succès");
        fetchData();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chargement...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="categories" className="space-y-4">
      <TabsList>
        <TabsTrigger value="categories">Catégories</TabsTrigger>
        <TabsTrigger value="threads">Discussions</TabsTrigger>
        <TabsTrigger value="replies">Réponses</TabsTrigger>
      </TabsList>

      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle>Catégories du Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discussions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.postCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="threads">
        <Card>
          <CardHeader>
            <CardTitle>Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Réponses</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Aucune discussion
                    </TableCell>
                  </TableRow>
                ) : (
                  threads.map((thread) => (
                    <TableRow key={thread.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {thread.title}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              window.open(`/forum/thread/${thread.slug}`, "_blank")
                            }
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{thread.categoryName}</TableCell>
                      <TableCell>{thread.authorName}</TableCell>
                      <TableCell>{thread.replyCount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(thread.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteThread(thread.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="replies">
        <Card>
          <CardHeader>
            <CardTitle>Réponses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Discussion</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Contenu</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {replies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Aucune réponse
                    </TableCell>
                  </TableRow>
                ) : (
                  replies.map((reply) => (
                    <TableRow key={reply.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {reply.threadTitle}
                          {reply.threadSlug && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                window.open(`/forum/thread/${reply.threadSlug}`, "_blank")
                              }
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{reply.authorName}</TableCell>
                      <TableCell>
                        <p className="line-clamp-2 text-sm">{reply.content}</p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteReply(reply.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
