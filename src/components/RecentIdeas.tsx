import { VideoContent } from "@/types/content";
import { Lightbulb, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@/hooks/useContent";

interface RecentIdeasProps {
  ideas: VideoContent[];
}

const platformColor: Record<string, string> = {
  YouTube: "text-red-400",
  TikTok: "text-foreground",
  Instagram: "text-pink-400",
};

export function RecentIdeas({ ideas }: RecentIdeasProps) {

  const navigate = useNavigate();
  const { contents, deleteContent } = useContent();

  return (
    <div className="rounded-lg border border-border bg-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: "320ms" }}>

      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
          Ideas recientes
        </h3>
      </div>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            onClick={() => navigate(`/editor?id=${idea.id}`)}
            className="cursor-pointer hover:bg-zinc-800/50 transition-colors ..."
          >
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">{idea.title}</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {idea.category} · {idea.createdAt}
              </p>
            </div>
            <span className={`font-mono text-[10px] font-medium shrink-0 ml-3 ${platformColor[idea.platform] || "text-muted-foreground"}`}>
              {idea.platform}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // CRÍTICO: Para que no se abra el editor al querer borrar
                if (window.confirm("¿Eliminar esta idea permanentemente?")) {
                  deleteContent(idea.id);
                }
              }}
              className="p-1.5 rounded-md text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
              title="Eliminar idea"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
