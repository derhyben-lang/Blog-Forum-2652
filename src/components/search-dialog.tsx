"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  type: "blog" | "forum";
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  authorName: string;
  date: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    const url = result.type === "blog" ? `/blog/${result.slug}` : `/forum/thread/${result.slug}`;
    router.push(url);
    onOpenChange(false);
    setQuery("");
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Rechercher</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des articles ou discussions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun résultat trouvé</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-2 py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      {result.type === "blog" ? (
                        <BookOpen className="w-4 h-4 text-primary" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {result.type === "blog" ? "Article" : "Discussion"}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        {result.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{result.authorName}</span>
                        <span>•</span>
                        <time>{new Date(result.date).toLocaleDateString("fr-FR")}</time>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Commencez à taper pour rechercher...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
