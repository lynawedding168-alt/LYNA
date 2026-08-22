import React, { useState } from 'react';
import {
  Search,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Users,
  CheckSquare,
  Square,
  FileText,
  Edit2,
  Trash2,
  Receipt,
  ExternalLink,
  Tag,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Project, ProjectStatus } from '../types';
import { StatusBadge } from './DashboardView';

interface ProjectsViewProps {
  projects: Project[];
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onToggleChecklist: (projectId: string, itemId: number) => void;
  onOpenInvoice: (project: Project) => void;
  hideFinancials: boolean;
  onToggleHideFinancials: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onToggleChecklist,
  onOpenInvoice,
  hideFinancials,
  onToggleHideFinancials
}) => {

  const [activeTabType, setActiveTabType] = useState<string>('All');

  const statusList = [
    { key: 'All', label: 'ទាំងអស់ (All)' },
    { key: 'Booking', label: 'បានកក់ (Booking)' },
    { key: 'Shooting', label: 'កំពុងថត (Shooting)' },
    { key: 'Editing', label: 'កំពុង Edit (Editing)' },
    { key: 'Delivered', label: 'បានប្រគល់ (Delivered)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            បញ្ជីគម្រោងថត និង Note (Projects & Gear)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            គ្រប់គ្រងរាល់កាលវិភាគថត ក្រុមការងារ ឧបករណ៍ Checklists និងវិក្កយបត្រ
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
            <span>បន្ថែមការថតថ្មី</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ស្វែងរកតាមចំណងជើង ឈ្មោះភ្ញៀវ លេខទូរស័ព្ទ ឬទីតាំង..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 text-slate-200 placeholder-slate-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
            >
              សម្អាត
            </button>
          )}
        </div>

        <div className="flex space-x-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 overflow-x-auto shrink-0">
          {statusList.map((st) => (
            <button
              key={st.key}
              onClick={() => setFilterStatus(st.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                filterStatus === st.key
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <AlertCircle className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <h3 className="text-slate-300 font-bold text-base">មិនមានគម្រោងថតត្រូវស្វែងរកឃើញឡើយ</h3>
          <p className="text-slate-500 text-xs mt-1">
            សូមសាកល្បងផ្លាស់ប្តូរពាក្យស្វែងរក ឬបន្ថែមគម្រោងថតថ្មី។
          </p>
          <button
            onClick={onAddProject}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>បង្កើតគម្រោងថតថ្មី</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((p) => {
            const remaining = p.totalPrice - p.deposit;
            const completedGear =
              p.equipmentChecklist?.filter((item) => item.checked).length || 0;
            const totalGear = p.equipmentChecklist?.length || 0;

            return (
              <div
                key={p.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.015] hover:shadow-2xl flex flex-col justify-between shadow-sm relative group"
              >
                <div>
                  {/* Top Row: Event badge & Status */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-500/15 px-2.5 py-0.5 rounded-full border border-teal-500/30 inline-block">
                          {p.eventType}
                        </span>
                        {p.driveLink && (
                          <a
                            href={p.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-0.5 rounded-full border border-slate-700 inline-flex items-center gap-1 transition"
                            title="បើកតំណភ្ជាប់រូបថត Drive / Cloud"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Drive</span>
                          </a>
                        )}
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-100 leading-snug">
                        {p.title}
                      </h3>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>

                  {/* Details Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/70 p-3.5 rounded-xl mb-4 border border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">
                        <strong>ភ្ញៀវ:</strong> {p.clientName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>
                        <strong>ទូរស័ព្ទ:</strong>{' '}
                        {p.clientPhone ? (
                          <a
                            href={`tel:${p.clientPhone}`}
                            className="text-emerald-400 hover:underline"
                          >
                            {p.clientPhone}
                          </a>
                        ) : (
                          'គ្មាន'
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>
                        <strong>ថ្ងៃថត:</strong> {p.shootingDate} ({p.shootingTime})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>
                        <strong>ថ្ងៃប្រគល់:</strong> {p.deliveryDeadline || 'មិនទាន់កំណត់'}
                      </span>
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex items-start gap-1.5 pt-1 border-t border-slate-800/60">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong>ទីតាំង:</strong> {p.location || 'មិនទាន់បញ្ជាក់'}
                      </span>
                    </div>
                  </div>

                  {/* Collaborators / Team Members */}
                  {p.collaborators && p.collaborators.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>អ្នករួមការងារជាមួយ (Collaborators & Team):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.collaborators.map((c, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center gap-1.5"
                          >
                            <strong className="text-emerald-300">{c.name}</strong>
                            <span className="text-slate-400">({c.role})</span>
                            {c.phone && (
                              <span className="text-slate-500 text-[10px]">[{c.phone}]</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Equipment Checklist */}
                  {p.equipmentChecklist && p.equipmentChecklist.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
                          <span>បញ្ជីគ្រឿងឧបករណ៍ត្រូវយកទៅ (Gear Checklist):</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-bold">
                          {completedGear}/{totalGear}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {p.equipmentChecklist.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-950 transition"
                          >
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => onToggleChecklist(p.id, item.id)}
                              className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            <span
                              className={`truncate ${
                                item.checked
                                  ? 'text-emerald-400 font-medium'
                                  : 'text-slate-200'
                              }`}
                            >
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {p.notes && (
                    <div className="text-xs text-slate-300 bg-amber-500/10 border-l-2 border-amber-500 p-2.5 rounded-r-lg mb-4 leading-relaxed">
                      <strong className="text-amber-400">Note:</strong> {p.notes}
                    </div>
                  )}
                </div>

                {/* Footer Bar: Pricing & Actions */}
                <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                  <div className="text-slate-300 flex flex-wrap items-center gap-2">
                    <span>
                      តម្លៃ:{' '}
                      <strong className="text-teal-300 font-bold">
                        {hideFinancials ? '••••' : `$${p.totalPrice}`}
                      </strong>
                    </span>
                    <span className="text-slate-600">|</span>
                    <span>
                      កក់:{' '}
                      <strong className="text-emerald-400 font-bold">
                        {hideFinancials ? '••••' : `$${p.deposit}`}
                      </strong>
                    </span>
                    <span className="text-slate-600">|</span>
                    <span>
                      ខ្វះ:{' '}
                      <strong
                        className={`font-bold ${
                          remaining > 0 ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {hideFinancials ? '••••' : `$${remaining}`}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => onOpenInvoice(p)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-400 rounded-lg transition flex items-center gap-1 border border-slate-700"
                      title="ទាញយក ឬមើលវិក្កយបត្រ (Invoice)"
                    >
                      <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Invoice</span>
                    </button>

                    <button
                      onClick={() => onEditProject(p)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 rounded-lg transition border border-slate-700"
                      title="កែប្រែគម្រោង (Edit)"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteProject(p.id)}
                      className="p-1.5 bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg transition border border-rose-500/20"
                      title="លុបគម្រោង (Delete)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
