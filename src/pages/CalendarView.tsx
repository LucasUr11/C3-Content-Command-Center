import { useContent } from "@/hooks/useContent";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { es } from "date-fns/locale"; // Para que esté en español
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CalendarView() {
  const { contents, addContent } = useContent();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  // Lógica para generar los días del calendario
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

  const handleDayClick = (day: Date, videos: any[]) => {
  if (videos.length > 0) {
    navigate(`/editor?id=${videos[0].id}`);
  } else {
    // Ya NO mandamos createdAt acá, porque el Hook lo hace por nosotros
    const createdVideo = addContent({
      title: "Nueva Idea Tech",
      platform: "TikTok",
      status: "Idea",
      category: "Hardware",
      script: "",
      publishDate: day.toISOString(), 
    });
    
    if (createdVideo) {
      navigate(`/editor?id=${createdVideo.id}`);
    }
  }
};

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header del Calendario */}
      <div className="flex items-center justify-between bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-cyan-500" />
          <h1 className="text-xl font-bold text-white capitalize">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grilla de Días */}
      <div className="grid grid-cols-7 gap-px bg-zinc-800/50 border border-zinc-800 rounded-2xl overflow-hidden flex-1">
        {/* Nombres de los días */}
        {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map((d) => (
          <div key={d} className="bg-zinc-900/60 p-2 text-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
            {d}
          </div>
        ))}

        {/* Celdas de los días */}
        {calendarDays.map((day, idx) => {
          const dayVideos = contents.filter(v => v.publishDate && isSameDay(new Date(v.publishDate), day));

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(day, dayVideos)} // <--- AGREGAMOS ESTO
              className={`min-h-[120px] p-2 border-t border-zinc-800/30 transition-all cursor-pointer
        hover:bg-zinc-800/20 group
        ${!isSameDay(day, monthStart) && day < monthStart ? 'opacity-20' : ''}
        ${day > monthEnd ? 'opacity-20' : ''}
        ${isToday(day) ? 'bg-cyan-500/5' : 'bg-zinc-900/20'}
      `}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs font-mono ${isToday(day) ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
                  {format(day, "d")}
                </span>
                {/* Un icono de '+' que aparece al hacer hover si el día está vacío */}
                {dayVideos.length === 0 && (
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 text-xs">+</span>
                )}
              </div>

              <div className="mt-2 space-y-1">
                {dayVideos.map(video => (
                  <div
                    key={video.id}
                    className="text-[9px] p-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-200 truncate font-medium hover:bg-cyan-500/20"
                  >
                    {video.title}
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