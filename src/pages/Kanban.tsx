import { useSearchParams, useNavigate } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { Calendar as CalendarIcon, MoreVertical, Plus, Layout, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COLUMNS = [
  { id: "Idea", title: "Ideas" },
  { id: "Scripting", title: "Guionando" },
  { id: "Recording", title: "Grabando" },
  { id: "Editing", title: "Editando" },
  { id: "Published", title: "Publicado" },
];

export default function Kanban() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { contents, updateContent, deleteContent } = useContent();

  // 1. Detectamos si venimos del Calendario para asignar una fecha
  const assignDate = searchParams.get("assignDate");

  const handleCardClick = (id: string) => {
    if (assignDate) {
      // MODO PLANIFICADOR: Guardamos la fecha y volvemos al calendario
      updateContent(id, { publishDate: assignDate });
      navigate("/calendar");
    } else {
      // MODO NORMAL: Vamos al editor
      navigate(`/editor?id=${id}`);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Pipeline de Contenido</h1>
          <p className="text-zinc-500 text-sm font-mono uppercase text-[10px] tracking-widest mt-1">C3_CONTENT_COMMAND_CENTER_</p>
        </div>
      </div>

      {/* Banner de Modo Planificador */}
      {assignDate && (
        <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl flex justify-between items-center ring-1 ring-cyan-500/30 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-xl">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Acción Requerida</p>
              <p className="text-sm text-zinc-300">Seleccioná un video para el <span className="text-white font-bold">{new Date(assignDate).toLocaleDateString('es-AR')}</span></p>
            </div>
          </div>
          <button
            onClick={() => navigate("/kanban")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase rounded-xl transition-all"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Tablero Kanban */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        {COLUMNS.map((column) => (
          <div key={column.id} className="w-80 flex-shrink-0 flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">{column.title}</h3>
                <span className="text-[10px] text-zinc-600 font-mono">[{contents.filter(c => c.status === column.id).length}]</span>
              </div>
            </div>

            <div className="flex-1 space-y-3 p-3 bg-zinc-900/20 rounded-3xl border border-zinc-800/30 overflow-y-auto min-h-[500px]">
              {contents
                .filter((item) => item.status === column.id)
                .map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleCardClick(video.id)}
                    className={`group relative p-4 bg-zinc-900/80 border border-zinc-800/50 rounded-2xl transition-all cursor-pointer
                              ${assignDate ? 'hover:border-cyan-500 hover:bg-cyan-500/5 ring-1 ring-transparent hover:ring-cyan-500/20' : 'hover:border-zinc-600 hover:bg-zinc-800/50'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-[9px] font-mono bg-zinc-800/50 border-zinc-700 text-zinc-500">
                        {video.platform}
                      </Badge>

                      <div className="flex gap-1">
                        {/* BOTÓN ELIMINAR */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Evita que se abra el editor al borrar
                            if (confirm('¿Estás seguro de eliminar esta idea?')) {
                              deleteContent(video.id);
                            }
                          }}
                          className="text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button className="text-zinc-700 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200 mb-4 leading-snug group-hover:text-white transition-colors">
                      {video.title}
                    </h4>

                    {/* Meta Info: Fecha y Categoría */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800/50">
                      {video.publishDate ? (
                        <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[9px] bg-cyan-500/5 px-2 py-1 rounded-md">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{new Date(video.publishDate).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-zinc-600 italic tracking-tight uppercase">Sin agendar</span>
                      )}

                      <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                        {video.category}
                      </div>
                    </div>
                  </div>
                ))}

              {contents.filter(c => c.status === column.id).length === 0 && (
                <div className="h-24 border-2 border-dashed border-zinc-800/50 rounded-2xl flex items-center justify-center">
                  <span className="text-[10px] text-zinc-700 uppercase font-bold tracking-widest">Vacío</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}