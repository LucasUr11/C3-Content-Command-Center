import { useSearchParams, useNavigate } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { Calendar as CalendarIcon, MoreVertical, Plus } from "lucide-react";
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
  const { contents, updateContent } = useContent();

  // 1. Detectamos si venimos del Calendario con una fecha para asignar
  const assignDate = searchParams.get("assignDate");

  const handleCardClick = (id: string) => {
    if (assignDate) {
      // SI ESTAMOS EN MODO ASIGNACIÓN:
      // Guardamos la fecha en la idea y volvemos al calendario
      updateContent(id, { publishDate: assignDate });
      navigate("/calendar");
    } else {
      // MODO NORMAL:
      // Vamos al editor para trabajar en el guion
      navigate(`/editor?id=${id}`);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* HEADER DEL KANBAN */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline de Contenido</h1>
          <p className="text-zinc-500 text-sm">Gestioná tus reviews y tutoriales de hardware</p>
        </div>
      </div>

      {/* BANNER DE MODO ASIGNACIÓN (Solo se ve si venís del calendario) */}
      {assignDate && (
        <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl flex justify-between items-center ring-1 ring-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <CalendarIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Modo Planificador</p>
              <p className="text-sm text-zinc-300">Seleccioná un video para el <span className="text-white font-bold">{new Date(assignDate).toLocaleDateString('es-AR')}</span></p>
            </div>
          </div>
          <button
            onClick={() => navigate("/kanban")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* COLUMNAS */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {COLUMNS.map((column) => (
          <div key={column.id} className="w-80 flex-shrink-0 flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-tighter">{column.title}</h3>
                <span className="bg-zinc-800 text-zinc-500 text-[10px] px-2 py-0.5 rounded-full">
                  {contents.filter(c => c.status === column.id).length}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 p-2 bg-zinc-900/20 rounded-2xl border border-zinc-800/30 overflow-y-auto">
              {contents
                .filter((item) => item.status === column.id)
                .map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleCardClick(video.id)}
                    className={`group relative p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl transition-all cursor-pointer
                              ${assignDate ? 'hover:border-cyan-500 ring-offset-2 ring-offset-black hover:ring-2 hover:ring-cyan-500/20' : 'hover:border-zinc-600'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[9px] uppercase bg-zinc-800/50 border-zinc-700 text-zinc-500">
                        {video.platform}
                      </Badge>
                      <button className="text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200 mb-3 group-hover:text-white transition-colors">
                      {video.title}
                    </h4>

                    {/* INDICADOR DE FECHA (Lo que pediste) */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/50">
                      {video.publishDate ? (
                        <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px]">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{new Date(video.publishDate).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-zinc-600 italic">Sin fecha</span>
                      )}

                      <div className="flex -space-x-2">
                        {/* Placeholder para avatares o prioridad si quisieras agregar */}
                        <div className="w-5 h-5 rounded-full bg-zinc-800 border-2 border-zinc-900" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}