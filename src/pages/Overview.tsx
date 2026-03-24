import { useMemo } from "react";
import { Video, Lightbulb, Clock, CheckCircle2, Plus } from "lucide-react";
import { useContent } from "@/hooks/useContent"; // Tu nuevo motor
import { ContentStatus } from "@/types/content";
import { MetricCard } from "@/components/MetricCard";
import { StatusDistribution } from "@/components/StatusDistribution";
import { RecentIdeas } from "@/components/RecentIdeas";
import { UpcomingPublications } from "@/components/UpcomingPublications";
import { Button } from "@/components/ui/button"; // Asumiendo que usas shadcn o similar

export default function Overview() {
  // 1. Traemos los datos y la función de crear del Hook
  const { contents, addContent } = useContent();

  // 2. Adaptamos los cálculos para que usen 'contents'
  const stats = useMemo(() => {
    const total = contents.length;
    const ideas = contents.filter((c) => c.status === "Idea");
    const pending = contents.filter((c) => c.status !== "Publicado");
    const published = contents.filter((c) => c.status === "Publicado");
    const upcoming = contents
      .filter((c) => c.publishDate && c.status !== "Publicado")
      .sort((a, b) => (a.publishDate! > b.publishDate! ? 1 : -1));

    // Distribución para la barra de progreso
    const distribution = contents.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
      },
      {} as Record<ContentStatus, number>
    );

    // Aseguramos que todos los estados existan en el gráfico
    (["Idea", "Guion", "Grabado", "Editado", "Publicado"] as ContentStatus[]).forEach((s) => {
      if (!distribution[s]) distribution[s] = 0;
    });

    return { total, ideas, pending, published, upcoming, distribution };
  }, [contents]); // No olvides el array de dependencia [contents]

  // 3. Función para crear una idea rápida de Entre Líneas un Mate
  const handleQuickIdea = () => {
    addContent({
      title: "Nueva Idea Tech",
      platform: "TikTok",
      status: "Idea",
      category: "Hardware",
      script: "",
      publishDate: null,
    } as any); // El 'as any' es temporal, deberías ajustar tu función 'addContent' para que acepte un objeto sin 'id' y 'createdAt', o generar esos campos automáticamente dentro de la función.
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header con Botón de Acción */}
      <div className="flex justify-between items-end opacity-0 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestión de contenido para Entre Líneas un Mate
          </p>
        </div>

        <Button
          onClick={handleQuickIdea}
          className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Idea
        </Button>
      </div>

      {/* Metric cards (Ahora dinámicas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total videos"
          value={stats.total}
          icon={Video}
          detail="Pipeline completo"
          index={0}
        />
        <MetricCard
          label="Ideas"
          value={stats.ideas.length}
          icon={Lightbulb}
          detail="Para desarrollar"
          index={1}
        />
        <MetricCard
          label="Pendientes"
          value={stats.pending.length}
          icon={Clock}
          detail="En producción"
          index={2}
        />
        <MetricCard
          label="Publicados"
          value={stats.published.length}
          icon={CheckCircle2}
          detail="En redes"
          index={3}
        />
      </div>

      {/* Pipeline bar */}
      <StatusDistribution distribution={stats.distribution} total={stats.total} />

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Asegúrate de pasar 'ideas' y 'items' (o como se llamen los props en tus componentes) */}
        <RecentIdeas ideas={stats.ideas} />
        <UpcomingPublications items={stats.upcoming} />
      </div>
    </div>
  );
}