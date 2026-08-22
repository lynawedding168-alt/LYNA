import React, { useState } from 'react';
import {
  Camera,
  CircleDollarSign,
  CheckCircle2,
  ClockAlert,
  Plus,
  ArrowRight,
  MapPin,
  Calendar,
  Phone,
  Layers,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { Project } from '../types';

interface DashboardViewProps {
  projects: Project[];
  onAddProject: () => void;
  onViewProjects: () => void;
  onSelectProject: (p: Project) => void;
  hideFinancials: boolean;
  onToggleHideFinancials: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onAddProject,
  onViewProjects,
  onSelectProject,
  hideFinancials,
  onToggleHideFinancials
}) => {

  const totalRevenue = projects.reduce((acc, p) => acc + (p.totalPrice || 0), 0);
  const totalDeposit = projects.reduce((acc, p) => acc + (p.deposit || 0), 0);
  const pendingBalance = totalRevenue - totalDeposit;
  const upcomingShoots = projects.filter(
    (p) => p.status === 'Booking' || p.status === 'Shooting'
  ).length;
  const editingCount = projects.filter((p) => p.status === 'Editing').length;
  const deliveredCount = projects.filter((p) => p.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">ផ្ទាំងទិន្នន័យសង្ខេប (Dashboard)</h2>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              Real-time Overview
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ទិដ្ឋភាពទូទៅនៃកាលវិភាគថត ប្រាក់ចំណូល និងស្ថានភាពគម្រោងទាំងអស់
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onToggleHideFinancials}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm ${
              hideFinancials
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-slate-800/90 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
            }`}
            title={hideFinancials ? 'ចុចដើម្បីបង្ហាញទឹកប្រាក់ (ទាមទារផ្ទៀងផ្ទាត់)' : 'ចុចដើម្បីលាក់ទឹកប្រាក់'}
          >
            {hideFinancials ? (
              <>
                <EyeOff className="w-4 h-4 text-amber-400" />
                <span>បានលាក់ទឹកប្រាក់ (ចុចបើក)</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>លាក់ទឹកប្រាក់ (Privacy)</span>
              </>
            )}
          </button>
          <button
            onClick={onAddProject}
            className="flex-1 sm:flex-initial bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>បន្ថែមគម្រោងថ្មី</span>
          </button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md cursor-pointer">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">ការថតដែលត្រូវមកដល់</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {upcomingShoots} <span className="text-sm font-medium text-slate-400">គម្រោង</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold">{editingCount} កំពុង Edit</span>
            <span>•</span>
            <span>{deliveredCount} បានប្រគល់</span>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md cursor-pointer">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">ប្រាក់ចំណូលសរុប (Total Revenue)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleHideFinancials}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title={hideFinancials ? 'ចុចដើម្បីផ្ទៀងផ្ទាត់បង្ហាញប្រាក់' : 'លាក់ប្រាក់ចំណូល'}
              >
                {hideFinancials ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <CircleDollarSign className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 tracking-tight flex items-center gap-2">
            {hideFinancials ? (
              <span className="tracking-widest text-slate-400 text-2xl select-none">••••••••</span>
            ) : (
              `$${totalRevenue.toLocaleString()}`
            )}
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            {hideFinancials ? (
              'គិតជាប្រាក់រៀល ≈ •••••••• ៛'
            ) : (
              `គិតជាប្រាក់រៀល ≈ ${(totalRevenue * 4100).toLocaleString()} ៛`
            )}
          </div>
        </div>

        {/* Card 3: Deposits */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md cursor-pointer">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">ប្រាក់កក់ទទួលបាន (Deposits)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleHideFinancials}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title={hideFinancials ? 'ចុចដើម្បីផ្ទៀងផ្ទាត់បង្ហាញប្រាក់' : 'លាក់ប្រាក់កក់'}
              >
                {hideFinancials ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight flex items-center gap-2">
            {hideFinancials ? (
              <span className="tracking-widest text-slate-400 text-2xl select-none">••••••••</span>
            ) : (
              `$${totalDeposit.toLocaleString()}`
            )}
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            {hideFinancials ? (
              '•••• នៃតម្លៃសរុប'
            ) : totalRevenue > 0 ? (
              `${Math.round((totalDeposit / totalRevenue) * 100)}% នៃតម្លៃសរុប`
            ) : (
              'មិនទាន់មានប្រាក់កក់'
            )}
          </div>
        </div>

        {/* Card 4: Remaining Balance */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md cursor-pointer">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">ប្រាក់នៅខ្វះ (Remaining Balance)</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleHideFinancials}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title={hideFinancials ? 'ចុចដើម្បីផ្ទៀងផ្ទាត់បង្ហាញប្រាក់' : 'លាក់ប្រាក់នៅខ្វះ'}
              >
                {hideFinancials ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <ClockAlert className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight flex items-center gap-2">
            {hideFinancials ? (
              <span className="tracking-widest text-slate-400 text-2xl select-none">••••••••</span>
            ) : (
              `$${pendingBalance.toLocaleString()}`
            )}
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            {hideFinancials ? '••••••••••••••••••••' : 'ត្រូវទូទាត់បង្គ្រប់ពេលប្រគល់ការងារ'}
          </div>
        </div>
      </div>

      {/* Recent Projects List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm transition-all duration-300 transform hover:border-slate-700/80">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              គម្រោងថតថ្មីៗ (Recent Projects)
            </h3>
            <p className="text-xs text-slate-400">គម្រោងដែលបានកត់ត្រាចុងក្រោយបង្អស់</p>
          </div>
          <button
            onClick={onViewProjects}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 hover:underline"
          >
            <span>មើលគម្រោងទាំងអស់ ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
            <Camera className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p>មិនទាន់មានទិន្នន័យគម្រោងថតនៅឡើយទេ</p>
            <button
              onClick={onAddProject}
              className="mt-3 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg hover:bg-emerald-500/30"
            >
              + បង្កើតគម្រោងដំបូង
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => {
              const remaining = p.totalPrice - p.deposit;
              const completedGear = p.equipmentChecklist?.filter((g) => g.checked).length || 0;
              const totalGear = p.equipmentChecklist?.length || 0;

              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="p-4 bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 transition-all duration-300 transform hover:scale-[1.012] hover:shadow-lg active:scale-[0.99] cursor-pointer group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {p.eventType}
                      </span>
                      <h4 className="font-bold text-slate-100 group-hover:text-emerald-400 transition">
                        {p.title}
                      </h4>
                      <StatusBadge status={p.status} />
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {p.clientName} ({p.clientPhone || 'គ្មានលេខ'})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {p.shootingDate} ម៉ោង {p.shootingTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {p.location}
                      </span>
                    </div>

                    {totalGear > 0 && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-0.5">
                        <span className="text-slate-500">គ្រឿងកាមេរ៉ា:</span>
                        <span className="font-semibold text-emerald-400">
                          {completedGear}/{totalGear} បានរៀបចំ
                        </span>
                        {p.collaborators && p.collaborators.length > 0 && (
                          <>
                            <span className="text-slate-700">•</span>
                            <span className="text-slate-400">
                              ក្រុមការងារ: {p.collaborators.map((c) => c.name).join(', ')}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-right text-xs bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800/80 min-w-[130px] shrink-0">
                    <div className="text-slate-400">
                      សរុប:{' '}
                      <strong className="text-slate-200">
                        {hideFinancials ? '••••' : `$${p.totalPrice}`}
                      </strong>
                    </div>
                    <div className="text-slate-400">
                      កក់:{' '}
                      <strong className="text-emerald-400">
                        {hideFinancials ? '••••' : `$${p.deposit}`}
                      </strong>
                    </div>
                    <div className="text-slate-400 pt-0.5 border-t border-slate-800 mt-0.5">
                      ខ្វះ:{' '}
                      <strong className="text-amber-400">
                        {hideFinancials ? '••••' : `$${remaining}`}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    Booking: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    Shooting: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Editing: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    Delivered: 'bg-slate-500/15 text-slate-300 border-slate-500/30'
  };

  const labels: Record<string, string> = {
    Booking: 'បានកក់ទុក (Booking)',
    Shooting: 'កំពុងថត (Shooting)',
    Editing: 'កំពុងកាត់ត (Editing)',
    Delivered: 'បានប្រគល់ (Delivered)'
  };

  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
        styles[status] || styles.Booking
      }`}
    >
      {labels[status] || status}
    </span>
  );
};
