import { useContent } from "@/hooks/useContent";
import { ContentStatus, VideoContent } from "@/types/content";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Trash2, Layers } from "lucide-react";

const COLUMNS: ContentStatus[] = ["Idea", "Guion", "Grabado", "Editado", "Publicado"];

export default function Kanban() {

  const { contents, deleteContent } = useContent();
  const navigate = useNavigate();

  // Función para obtener los videos de cada columna
  const getColumnContent = (status: ContentStatus) => {
    return contents.filter((c) => c.status === status);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Layers className="w-5 h-5 text-cyan-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase">Estados</h1>
          <p className="text-xs text-zinc-500 font-mono">Visualización de procesos activos</p>
        </div>
      </div>

      {/* Contenedor de Columnas */}
      <div className="flex gap-4 overflow-x-auto pb-6 h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-zinc-800">
        {COLUMNS.map((status) => {
          const columnItems = getColumnContent(status);

          return (
            <div
              key={status}
              className="flex-shrink-0 w-72 flex flex-col bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden"
            >
              {/* Header de Columna */}
              <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/20 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {status}
                </span>
                <Badge variant="outline" className="text-[10px] bg-zinc-800/50 border-zinc-700 text-cyan-500">
                  {columnItems.length}
                </Badge>
              </div>

              {/* Lista de Tarjetas */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {columnItems.length === 0 && (
                  <div className="h-20 border-2 border-dashed border-zinc-800/30 rounded-xl flex items-center justify-center">
                    <span className="text-[10px] uppercase text-zinc-700 font-bold">Vacío</span>
                  </div>
                )}

                {columnItems.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => navigate(`/editor?id=${video.id}`)}
                    className="group p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl hover:border-cyan-500/40 
                               hover:bg-zinc-800/40 transition-all cursor-pointer relative overflow-hidden"
                  >
                    {/* Indicador de plataforma */}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-mono text-cyan-500/70 px-1.5 py-0.5 border border-cyan-500/20 rounded">
                        {video.platform.toUpperCase()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // CRÍTICO: Para que no se abra el editor al querer borrar
                          if (window.confirm("¿Eliminar esta idea permanentemente?")) {
                            deleteContent(video.id);
                          }
                        }}
                        className="p-1.5 rounded-md text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
                        title="Eliminar idea"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200 leading-tight group-hover:text-white transition-colors">
                      {video.title}
                    </h4>

                    {/* Info extra sutil */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-zinc-700 border border-zinc-900" />
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono">
                        {video.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}