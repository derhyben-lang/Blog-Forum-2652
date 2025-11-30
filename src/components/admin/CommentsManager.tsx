"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Comment {
  id: number;
  postId: number;
  postTitle?: string;
  postSlug?: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export default function CommentsManager() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/admin/comments");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Erreur lors du chargement des commentaires");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) return;

    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Commentaire supprimé avec succès");
        fetchComments();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
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
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Commentaires</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Aucun commentaire
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.postTitle}</span>
                      {comment.postSlug && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            window.open(`/blog/${comment.postSlug}`, "_blank")
                          }
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{comment.authorName}</div>
                      <div className="text-xs text-muted-foreground">
                        {comment.authorEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm">{comment.content}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comment.id)}
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
  );
}
