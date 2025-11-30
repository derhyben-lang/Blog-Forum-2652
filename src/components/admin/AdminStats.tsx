"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Mail, Users, TrendingUp } from "lucide-react";

interface Stats {
  totalPosts: number;
  totalComments: number;
  totalSubscribers: number;
  totalThreads: number;
  recentPosts: number;
  recentComments: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalComments: 0,
    totalSubscribers: 0,
    totalThreads: 0,
    recentPosts: 0,
    recentComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Articles",
      value: stats.totalPosts,
      icon: FileText,
      description: `${stats.recentPosts} ce mois-ci`,
      color: "text-blue-500",
    },
    {
      title: "Commentaires",
      value: stats.totalComments,
      icon: MessageSquare,
      description: `${stats.recentComments} cette semaine`,
      color: "text-green-500",
    },
    {
      title: "Abonnés Newsletter",
      value: stats.totalSubscribers,
      icon: Mail,
      description: "Actifs",
      color: "text-purple-500",
    },
    {
      title: "Discussions Forum",
      value: stats.totalThreads,
      icon: Users,
      description: "Total",
      color: "text-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Nouveaux articles ce mois
              </span>
              <span className="font-semibold">{stats.recentPosts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Commentaires cette semaine
              </span>
              <span className="font-semibold">{stats.recentComments}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
