import { useSearchParams } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { useEffect, useState } from "react";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Obtenemos el ID de la URL
  const { contents, updateContent } = useContent();
  
  // Buscamos el video específico
  const currentVideo = contents.find((v) => v.id === id);

  if (!currentVideo) {
    return <div className="p-10 text-center">Seleccioná un video para editar</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <input
          value={currentVideo.title}
          onChange={(e) => updateContent(currentVideo.id, { title: e.target.value })}
          className="text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 w-full text-cyan-400"
        />
        <div className="text-xs font-mono text-zinc-500">ID: {currentVideo.id.slice(0,8)}</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lado izquierdo: El Guion */}
        <div className="md:col-span-2 space-y-4">
          <label className="text-sm font-medium text-zinc-400">Guion del Video</label>
          <textarea
            value={currentVideo.script}
            onChange={(e) => updateContent(currentVideo.id, { script: e.target.value })}
            placeholder="Escribí acá el contenido para Entre Líneas un Mate..."
            className="w-full h-[500px] p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-cyan-500 outline-none resize-none font-mono text-sm leading-relaxed"
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