"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MessageCircle, User, Clock, Send } from "lucide-react";
import Link from "next/link";

type Thread = {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  authorName: string;
  createdAt: string;
  replyCount: number;
  lastReplyAt: string | null;
};

type Reply = {
  id: number;
  threadId: number;
  authorName: string;
  content: string;
  createdAt: string;
};

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: "",
    content: "",
  });

  useEffect(() => {
    fetchThreadData();
  }, [slug]);

  const fetchThreadData = async () => {
    try {
      const response = await fetch(`/api/forum/threads/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setThread(data.thread);
        setReplies(data.replies);
      }
    } catch (error) {
      console.error("Error fetching thread:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thread) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/forum/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: thread.id,
          ...formData,
        }),
      });

      if (response.ok) {
        setFormData({ authorName: "", content: "" });
        fetchThreadData(); // Refresh replies
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Discussion non trouvée</h1>
          <Link href="/forum">
            <Button>Retour au forum</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/forum">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au forum
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Thread Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{thread.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{thread.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <time>
                {new Date(thread.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{replies.length} réponse{replies.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Replies */}
        <section className="space-y-6 mb-12">
          {replies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Aucune réponse pour le moment. Soyez le premier à répondre !
              </CardContent>
            </Card>
          ) : (
            replies.map((reply, index) => (
              <Card key={reply.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <h4 className="font-semibold">{reply.authorName}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(reply.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{reply.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </section>

        <Separator className="my-8" />

        {/* Reply Form */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Send className="w-6 h-6" />
            Répondre à cette discussion
          </h2>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Votre nom *</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) =>
                      setFormData({ ...formData, authorName: e.target.value })
                    }
                    required
                    placeholder="Votre nom"
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Votre réponse *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    rows={6}
                    placeholder="Partagez votre réponse..."
                    disabled={submitting}
                  />
                </div>

                <Button type="submit" disabled={submitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? "Publication..." : "Publier la réponse"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
