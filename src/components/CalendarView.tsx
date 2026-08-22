import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Camera,
  CalendarCheck2,
  Phone
} from 'lucide-react';
import { Project } from '../types';

interface CalendarViewProps {
  projects: Project[];
  onSelectProject?: (p: Project) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ projects, onSelectProject }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString().split('T')[0]
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const monthNamesKhmer = [
    'មករា (January)',
    'កុម្ភៈ (February)',
    'មីនា (March)',
    'មេសា (April)',
    'ឧសភា (May)',
    'មិថុនា (June)',
    'កក្កដា (July)',
    'សីហា (August)',
    'កញ្ញា (September)',
    'តុលា (October)',
    'វិច្ឆិកា (November)',
    'ធ្នូ (December)'
  ];

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  const selectedDateShoots = selectedDate
    ? projects.filter((p) => p.shootingDate === selectedDate)
    : [];

  const selectedDateDeliveries = selectedDate
    ? projects.filter((p) => p.deliveryDeadline === selectedDate)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-emerald-400" />
            កាលវិភាគថតរូប (Schedule Calendar)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ពិនិត្យថ្ងៃខែត្រូវចុះថត Call Time និងថ្ងៃកំណត់ប្រគល់រូបជូនភ្ញៀវ
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-between sm:justify-start">
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-slate-800 rounded-lg transition"
          >
            ថ្ងៃនេះ
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition"
              title="ខែមុន"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs sm:text-sm min-w-[140px] text-center text-slate-100">
              ខែ{monthNamesKhmer[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition"
              title="ខែបន្ទាប់"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        {/* Day Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 mb-2 py-2 border-b border-slate-800">
          <div className="text-rose-400">អាទិត្យ (Sun)</div>
          <div>ច័ន្ទ (Mon)</div>
          <div>អង្គារ (Tue)</div>
          <div>ពុធ (Wed)</div>
          <div>ព្រហស្បតិ៍ (Thu)</div>
          <div>សុក្រ (Fri)</div>
          <div className="text-emerald-400">សៅរ៍ (Sat)</div>
        </div>

        {/* Day Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Empty leading cells */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="h-20 sm:h-28 bg-slate-950/20 rounded-xl border border-slate-900/40 opacity-40"
            />
          ))}

          {/* Actual Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
              dayNum
            ).padStart(2, '0')}`;
            const dayShoots = projects.filter((p) => p.shootingDate === dateStr);
            const dayDeliveries = projects.filter((p) => p.deliveryDeadline === dateStr);
            const isToday =
              new Date().toISOString().split('T')[0] === dateStr;
            const isSelected = selectedDate === dateStr;

            return (
              <div
                key={dayNum}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-20 sm:h-28 rounded-xl p-1.5 sm:p-2 flex flex-col justify-between transition cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                    : isToday
                    ? 'bg-slate-850/80 border-slate-700'
                    : 'bg-slate-950/60 border-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      isToday
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : isSelected
                        ? 'text-emerald-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayShoots.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-16">
                  {dayShoots.map((s) => (
                    <div
                      key={s.id}
                      className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded truncate font-medium flex items-center gap-1"
                      title={`${s.shootingTime} - ${s.title}`}
                    >
                      <Camera className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{s.shootingTime} {s.title}</span>
                    </div>
                  ))}

                  {dayDeliveries.map((d) => (
                    <div
                      key={`del-${d.id}`}
                      className="text-[9px] bg-purple-500/20 border border-purple-500/30 text-purple-200 px-1 py-0.5 rounded truncate flex items-center gap-1"
                      title={`ប្រគល់រូប: ${d.title}`}
                    >
                      <span>📦 ប្រគល់ {d.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Panel */}
      {selectedDate && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-400" />
              <span>កាលវិភាគសម្រាប់ថ្ងៃទី: <strong className="text-emerald-400">{selectedDate}</strong></span>
            </h3>
            <span className="text-xs text-slate-400">
              {selectedDateShoots.length} គម្រោងថត | {selectedDateDeliveries.length} ការប្រគល់
            </span>
          </div>

          {selectedDateShoots.length === 0 && selectedDateDeliveries.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              គ្មានកាលវិភាគថត ឬប្រគល់រូបនៅថ្ងៃនេះទេ។
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateShoots.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onSelectProject && onSelectProject(s)}
                  className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-4 space-y-2 hover:border-emerald-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ថតរូប: {s.eventType}
                    </span>
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {s.shootingTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm">{s.title}</h4>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{s.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{s.clientName} ({s.clientPhone || 'គ្មានលេខ'})</span>
                    </div>
                  </div>

                  {s.collaborators && s.collaborators.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <strong className="text-slate-300">ក្រុមការងារ:</strong>{' '}
                      {s.collaborators.map((c) => `${c.name} (${c.role})`).join(', ')}
                    </div>
                  )}
                </div>
              ))}

              {selectedDateDeliveries.map((d) => (
                <div
                  key={`del-card-${d.id}`}
                  className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      ថ្ងៃប្រគល់រូបថត (Delivery Deadline)
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      នៅខ្វះ: ${d.totalPrice - d.deposit}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm">{d.title}</h4>
                  <div className="text-xs text-slate-400">
                    អតិថិជន: {d.clientName} ({d.clientPhone})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
