import { useState, useEffect } from 'react';

// 1. Definimos la interfaz para que todo el proyecto hable el mismo idioma
export interface VideoContent {
    id: string;
    title: string;
    platform: 'TikTok' | 'YouTube' | 'Instagram';
    status: 'Idea' | 'Scripting' | 'Recording' | 'Editing' | 'Published';
    category: string;
    script: string;
    publishDate?: string; // La fecha se guarda como string ISO
    createdAt: string;
}

export const useContent = () => {
    // 2. Cargamos los datos iniciales del localStorage
    const [contents, setContents] = useState<VideoContent[]>(() => {
        const saved = localStorage.getItem('c3-content-data');
        return saved ? JSON.parse(saved) : [];
    });

    // 3. Cada vez que 'contents' cambia, actualizamos el localStorage
    useEffect(() => {
        localStorage.setItem('c3-content-data', JSON.stringify(contents));
    }, [contents]);

    // 4. Función para agregar contenido (ahora devuelve el objeto creado)
    const addContent = (newVideo: Omit<VideoContent, 'id' | 'createdAt'>) => {
        const videoWithId: VideoContent = {
            ...newVideo,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        setContents((prev) => [...prev, videoWithId]);
        return videoWithId;
    };

    // 5. Función para actualizar (Clave para el Calendario y Kanban)
    const updateContent = (id: string, updates: Partial<VideoContent>) => {
        setContents((prev) => {
            const newContents = prev.map((item) =>
                item.id === id ? { ...item, ...updates } : item
            );
            // Forzamos el guardado para evitar desfases en la navegación
            localStorage.setItem('c3-content-data', JSON.stringify(newContents));
            return newContents;
        });
    };

    // 6. Función para eliminar
    const deleteContent = (id: string) => {
        setContents((prev) => prev.filter((item) => item.id !== id));
    };

    return {
        contents,
        addContent,
        updateContent,
        deleteContent,
    };
};