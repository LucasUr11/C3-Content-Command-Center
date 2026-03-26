import { useContent } from "@/hooks/useContent";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CalendarView() {
  const { contents } = useContent();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  // Lógica para generar los días del calendario
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const handleDayClick = (day: Date, dayVideos: any[]) => {
    if (dayVideos.length > 0) {
      // Si ya hay videos, vamos al editor del primero
      navigate(`/editor?id=${dayVideos[0].id}`);
    } else {
      // Si está vacío, vamos al Kanban con la fecha en la URL
      navigate(`/kanban?assignDate=${day.toISOString()}`);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header del Calendario */}
      <div className="flex items-center justify-between bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <CalendarIcon className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">
              {format(currentDate, "MMMM yyyy")}
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono">Planificación de Contenido_</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-zinc-800/50 p-1 rounded-xl border border-zinc-700/50">
          <button onClick={prevMonth} className="p-2 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-[10px] font-bold uppercase text-zinc-400 hover:text-white transition-colors">
            Hoy
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grilla de Días */}
      <div className="grid grid-cols-7 gap-px bg-zinc-800/50 border border-zinc-800 rounded-2xl overflow-hidden flex-1 shadow-2xl">
        {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map((d) => (
          <div key={d} className="bg-zinc-900/80 p-3 text-center text-[10px] font-black uppercase text-zinc-500 tracking-widest border-b border-zinc-800">
            {d}
          </div>
        ))}

        {calendarDays.map((day, idx) => {
          // FILTRO ROBUSTO: Comparamos Año, Mes y Día ignorando las horas
          const dayVideos = contents.filter(v => {
            if (!v.publishDate) return false;
            const vDate = new Date(v.publishDate);
            return vDate.getFullYear() === day.getFullYear() &&
              vDate.getMonth() === day.getMonth() &&
              vDate.getDate() === day.getDate();
          });

          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(day, dayVideos)}
              className={`min-h-[120px] p-2 transition-all cursor-pointer group relative
                ${!isCurrentMonth ? 'bg-zinc-950/40 opacity-30' : 'bg-zinc-900/20 hover:bg-zinc-800/40'}
                ${isToday(day) ? 'ring-1 ring-inset ring-cyan-500/30 bg-cyan-500/5' : ''}
                border-r border-b border-zinc-800/30
              `}
            >
              <span className={`text-[10px] font-mono ${isToday(day) ? 'text-cyan-400 font-bold underline underline-offset-4' : 'text-zinc-600'}`}>
                {format(day, "d")}
              </span>

              <div className="mt-2 space-y-1">
                {dayVideos.map(video => (
                  <div
                    key={video.id}
                    className="text-[9px] p-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-200 truncate font-bold shadow-sm"
                  >
                    {video.title}
                  </div>
                ))}
              </div>

              {/* Indicador visual de que se puede agregar algo */}
              {isCurrentMonth && dayVideos.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-xs">+</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}