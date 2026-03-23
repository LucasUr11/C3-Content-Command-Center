import { VideoContent } from "@/types/content";
import { CalendarClock } from "lucide-react";

interface UpcomingPublicationsProps {
  items: VideoContent[];
}

const statusBadge: Record<string, string> = {
  Editado: "bg-primary/15 text-primary",
  Grabado: "bg-yellow-500/15 text-yellow-500",
  Guion: "bg-blue-500/15 text-blue-400",
};

export function UpcomingPublications({ items }: UpcomingPublicationsProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <CalendarClock className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
          Próximas publicaciones
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2.5 hover:border-primary/20 transition-colors duration-150"
          >
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">{item.title}</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {item.platform} · {item.publishDate}
              </p>
            </div>
            <span className={`font-mono text-[10px] font-medium shrink-0 ml-3 rounded-full px-2 py-0.5 ${statusBadge[item.status] || "bg-secondary text-muted-foreground"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
