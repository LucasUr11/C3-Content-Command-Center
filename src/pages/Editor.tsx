import { useSearchParams } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { useEffect, useState } from "react";
import { VideoContent } from "@/types/content";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Obtenemos el ID de la URL
  const { contents, updateContent } = useContent();

  // Buscamos el video específico
  const currentVideo = contents.find((v) => v.id === id);

  const handleUpdate = (updates: Partial<VideoContent>) => {
    if (id) updateContent(id, updates);
  };

  if (!currentVideo) {
    return <div className="p-10 text-center">Seleccioná un video para editar</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">

        <input
          value={currentVideo.title}
          onChange={(e) => handleUpdate({ title: e.target.value })}
          className="w-full bg-transparent border-none text-4xl font-black tracking-tighter 
             text-white placeholder:text-zinc-800 focus:ring-0 mb-2"
          placeholder="Título del video..."
        />
        <div className="text-xs font-mono text-zinc-500">ID: {currentVideo.id.slice(0, 8)}</div>

      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-2 flex flex-col space-y-4 h-full">

          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
              Guion del Video
            </label>
            <span className="text-[10px] font-mono text-cyan-500/50 uppercase">
              Auto-save activo
            </span>
          </div>

          <textarea
            value={currentVideo.script}
            onChange={(e) => handleUpdate({ script: e.target.value })}
            placeholder="Empezá a escribir tu próximo éxito tech..."
            className="w-full h-[600px] p-8 bg-zinc-900/20 border border-zinc-800/50 
               rounded-2xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 
               outline-none resize-none font-mono text-sm leading-relaxed 
               text-zinc-300 placeholder:text-zinc-700 transition-all duration-300
               scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          />

        </div>

        {/* Lado derecho: Configuración rápida */}
        <div className="space-y-6 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800">
          <div>
            <label className="text-xs text-zinc-500 uppercase">Plataforma</label>
            <select
              value={currentVideo.platform}
              onChange={(e) => updateContent(currentVideo.id, { platform: e.target.value as any })}
              className="w-full bg-zinc-800 border-none rounded mt-1 text-sm"
            >
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase">Estado</label>
            <select
              value={currentVideo.status}
              onChange={(e) => updateContent(currentVideo.id, { status: e.target.value as any })}
              className="w-full bg-zinc-800 border-none rounded mt-1 text-sm text-cyan-500"
            >
              <option value="Idea">Idea</option>
              <option value="Guion">Guion</option>
              <option value="Grabado">Grabado</option>
              <option value="Publicado">Publicado</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}