import { ContentStatus } from "@/types/content";

interface StatusDistributionProps {
  distribution: Record<ContentStatus, number>;
  total: number;
}

const statusConfig: Record<ContentStatus, { color: string; bg: string }> = {
  Idea: { color: "bg-muted-foreground", bg: "bg-muted-foreground/20" },
  Guion: { color: "bg-blue-400", bg: "bg-blue-400/20" },
  Grabado: { color: "bg-yellow-500", bg: "bg-yellow-500/20" },
  Editado: { color: "bg-primary", bg: "bg-primary/20" },
  Publicado: { color: "bg-emerald-300", bg: "bg-emerald-300/20" },
};

export function StatusDistribution({ distribution, total }: StatusDistributionProps) {
  const statuses: ContentStatus[] = ["Idea", "Guion", "Grabado", "Editado", "Publicado"];

  return (
    <div className="rounded-lg border border-border bg-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: "240ms" }}>
      <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
        Pipeline
      </h3>
      {/* Bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-secondary mb-4">
        {statuses.map((s) => {
          const pct = total > 0 ? (distribution[s] / total) * 100 : 0;
          if (pct === 0) return null;
          return (
            <div
              key={s}
              className={`${statusConfig[s].color} transition-all duration-500`}
              style={{ width: `${pct}%` }}
            />
          );
        })}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-5 gap-2">
        {statuses.map((s) => (
          <div key={s} className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {distribution[s]}
            </p>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <div className={`h-1.5 w-1.5 rounded-full ${statusConfig[s].color}`} />
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                {s}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
