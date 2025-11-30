"use client";

import { Facebook, Twitter, Linkedin, Send, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export const ShareButtons = ({ title, url, description }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: "hover:bg-blue-700 hover:text-white",
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
      color: "hover:bg-blue-500 hover:text-white",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié !", {
        description: "Le lien a été copié dans le presse-papier",
      });
    } catch (error) {
      toast.error("Erreur", {
        description: "Impossible de copier le lien",
      });
    }
  };

  const handleShare = (shareUrl: string) => {
    // Check if we're in an iframe
    const isInIframe = typeof window !== "undefined" && window.self !== window.top;
    
    if (isInIframe) {
      // Send message to parent to open in new tab
      window.parent.postMessage(
        { type: "OPEN_EXTERNAL_URL", data: { url: shareUrl } },
        "*"
      );
    } else {
      // Open normally in new tab
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Partager :
      </span>
      {shareLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.name}
            variant="outline"
            size="icon"
            onClick={() => handleShare(social.url)}
            className={`transition-colors ${social.color}`}
            title={`Partager sur ${social.name}`}
          >
            <Icon className="w-4 h-4" />
          </Button>
        );
      })}
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        className="transition-colors hover:bg-gray-600 hover:text-white"
        title="Copier le lien"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
