import { useMemo } from "react";
import { Video, Lightbulb, Clock, CheckCircle2 } from "lucide-react";
import { mockContent } from "@/data/mock-content";
import { ContentStatus } from "@/types/content";
import { MetricCard } from "@/components/MetricCard";
import { StatusDistribution } from "@/components/StatusDistribution";
import { RecentIdeas } from "@/components/RecentIdeas";
import { UpcomingPublications } from "@/components/UpcomingPublications";

export default function Overview() {
  const stats = useMemo(() => {
    const total = mockContent.length;
    const ideas = mockContent.filter((c) => c.status === "Idea");
    const pending = mockContent.filter((c) => c.status !== "Publicado");
    const published = mockContent.filter((c) => c.status === "Publicado");
    const upcoming = mockContent
      .filter((c) => c.publishDate && c.status !== "Publicado")
      .sort((a, b) => (a.publishDate! > b.publishDate! ? 1 : -1));

    const distribution = mockContent.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
      },
      {} as Record<ContentStatus, number>
    );
    // ensure all keys exist
    (["Idea", "Guion", "Grabado", "Editado", "Publicado"] as ContentStatus[]).forEach((s) => {
      if (!distribution[s]) distribution[s] = 0;
    });

    const nextPub = upcoming[0];

    return { total, ideas, pending, published, upcoming, distribution, nextPub };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="opacity-0 animate-fade-in">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Estado actual del pipeline de contenido
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total videos"
          value={stats.total}
          icon={Video}
          detail="En todas las plataformas"
          index={0}
        />
        <MetricCard
          label="Ideas"
          value={stats.ideas.length}
          icon={Lightbulb}
          detail="Sin desarrollar"
          index={1}
        />
        <MetricCard
          label="Pendientes"
          value={stats.pending.length}
          icon={Clock}
          detail="En progreso"
          index={2}
        />
        <MetricCard
          label="Publicados"
          value={stats.published.length}
          icon={CheckCircle2}
          detail="Completados"
          index={3}
        />
      </div>

      {/* Pipeline bar */}
      <StatusDistribution distribution={stats.distribution} total={stats.total} />

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentIdeas ideas={stats.ideas} />
        <UpcomingPublications items={stats.upcoming} />
      </div>
    </div>
  );
}
