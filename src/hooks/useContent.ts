import { useState, useEffect } from 'react';
import { VideoContent } from '../types/content';

export const useContent = () => {
    const [contents, setContents] = useState<VideoContent[]>([]);

    // 1. Cargar datos de LocalStorage al montar el componente
    useEffect(() => {
        const saved = localStorage.getItem('c3-content-data');
        if (saved) {
            try {
                setContents(JSON.parse(saved));
            } catch (e) {
                console.error("Error cargando datos de LocalStorage", e);
            }
        }
    }, []);

    // 2. Guardar en LocalStorage cada vez que contents cambie
    useEffect(() => {
        localStorage.setItem('c3-content-data', JSON.stringify(contents));
    }, [contents]);

    // 3. Función para agregar una nueva idea
    const addContent = (newVideo: Omit<VideoContent, 'id'>) => {
        const videoWithId: VideoContent = {
            ...newVideo,
            id: crypto.randomUUID()
        };
        setContents(prev => [...prev, videoWithId]);
    };

    // 4. Función para actualizar (guiones, estados, etc)
    const updateContent = (id: string, updates: Partial<VideoContent>) => {
        setContents(prev => prev.map(item =>
            item.id === id ? { ...item, ...updates } : item
        ));
    };

    // 5. Función para borrar (por si te arrepentís de una idea)
    const deleteContent = (id: string) => {
        setContents(prev => prev.filter(item => item.id !== id));
    };

    return { contents, addContent, updateContent, deleteContent };
};