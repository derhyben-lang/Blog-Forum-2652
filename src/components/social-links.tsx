import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "X (Twitter)",
      url: "https://twitter.com",
      icon: Twitter,
      color: "hover:text-sky-500",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Telegram",
      url: "https://t.me",
      icon: Send,
      color: "hover:text-blue-500",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: Linkedin,
      color: "hover:text-blue-700",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Suivez-nous sur ${social.name}`}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${social.color}`}
            >
              <Icon className="w-5 h-5" />
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
