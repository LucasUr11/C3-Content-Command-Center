import { useSearchParams } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { Badge } from "@/components/ui/badge";
import { Save, Clock, Type, Layout } from "lucide-react";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const { contents, updateContent } = useContent();
  const id = searchParams.get("id");
  const currentVideo = contents.find((v) => v.id === id);

  if (!id || !currentVideo) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-600 font-mono uppercase text-xs tracking-widest">
        <Layout className="w-4 h-4 mr-2 opacity-20" />
        Seleccioná un contenido para empezar_
      </div>
    );
  }

  // Lógica de métricas: 150 palabras por minuto es el estándar de locución
  const wordCount = currentVideo.script.trim().split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round((wordCount / 150) * 60);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      {/* TOOLBAR SUPERIOR */}
      <div className="flex items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
        <div className="flex flex-col">
          <input
            value={currentVideo.title}
            onChange={(e) => updateContent(id, { title: e.target.value })}
            className="bg-transparent text-xl font-bold text-white outline-none border-b border-transparent focus:border-cyan-500/30 transition-all"
            placeholder="Título del video..."
          />
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-[10px] uppercase bg-zinc-800/50 border-zinc-700 text-zinc-400">
              {currentVideo.platform}
            </Badge>
            <Badge className="text-[10px] uppercase bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              {currentVideo.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-tighter">Status</p>
            <div className="flex items-center gap-2 text-cyan-500/80">
              <Save className="w-3 h-3" />
              <span className="text-[10px] font-mono uppercase">Sincronizado</span>
            </div>
          </div>
        </div>
      </div>

      {/* AREA DE ESCRITURA Y MÉTRICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <textarea
            value={currentVideo.script}
            onChange={(e) => updateContent(id, { script: e.target.value })}
            className="flex-1 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6 text-zinc-300 shadow-inner 
                     focus:outline-none focus:border-cyan-500/30 transition-all resize-none leading-relaxed font-serif text-lg"
            placeholder="Escribí el guion de tu próximo video aquí..."
          />
        </div>

        {/* SIDEBAR DE MÉTRICAS */}
        <div className="space-y-4">
          <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Type className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Lectura</span>
              </div>
              <p className="text-2xl font-black text-white">{wordCount} <span className="text-xs text-zinc-600 uppercase">Palabras</span></p>
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Duración Est.</span>
              </div>
              <p className="text-2xl font-black text-cyan-500">{estimatedSeconds}s</p>
              <p className="text-[9px] text-zinc-600 mt-1 italic leading-tight">
                * Calculado a un ritmo de locución de 150 ppm.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()} // Un extra divertido para guiones físicos
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-[10px] uppercase font-bold transition-all"
          >
            Exportar Guion (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}