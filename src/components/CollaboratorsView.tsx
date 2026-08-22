import React, { useMemo, useState } from 'react';
import {
  Users,
  User,
  Phone,
  Calendar,
  Briefcase,
  Search,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';

interface CollaboratorsViewProps {
  projects: Project[];
}

export const CollaboratorsView: React.FC<CollaboratorsViewProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Aggregate all collaborators from projects and summarize their gigs
  const allCollabs = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        roles: Set<string>;
        phones: Set<string>;
        gigs: { projectTitle: string; date: string; time: string; role: string }[];
      }
    >();

    projects.forEach((p) => {
      if (p.collaborators) {
        p.collaborators.forEach((c) => {
          if (!c.name.trim()) return;
          const key = c.name.trim().toLowerCase();
          if (!map.has(key)) {
            map.set(key, {
              name: c.name.trim(),
              roles: new Set<string>(),
              phones: new Set<string>(),
              gigs: []
            });
          }

          const entry = map.get(key)!;
          if (c.role) entry.roles.add(c.role);
          if (c.phone) entry.phones.add(c.phone);
          entry.gigs.push({
            projectTitle: p.title,
            date: p.shootingDate,
            time: p.shootingTime,
            role: c.role
          });
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.gigs.length - a.gigs.length);
  }, [projects]);

  const filteredCollabs = allCollabs.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Array.from(c.roles).some((r: string) => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            ដៃគូសហការ និងក្រុមការងារ (Team & Crew)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            បញ្ជីឈ្មោះអ្នកថតរង (2nd Cam) ជាងភ្លើង ជាងតុបតែង និង Editor ដែលធ្លាប់ធ្វើការជាមួយ
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-bold">
          សរុប: {allCollabs.length} នាក់
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="ស្វែងរកតាមឈ្មោះ ឬតួនាទី (2nd Cam, Drone, Lighting...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 text-slate-200"
        />
      </div>

      {/* Grid */}
      {filteredCollabs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-400 text-sm">
          <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
          <p>មិនទាន់មានដៃគូសហការត្រូវបានបញ្ជាក់ក្នុងគម្រោងនៅឡើយទេ</p>
          <p className="text-xs text-slate-500 mt-1">
            ពេលអ្នកបង្កើត ឬកែប្រែគម្រោងថត សូមបញ្ចូលឈ្មោះសមាជិកក្រុមការងារនៅទីនោះ។
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCollabs.map((c, index) => {
            const roleArray = Array.from(c.roles);
            const phoneArray = Array.from(c.phones);

            return (
              <div
                key={index}
                className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md space-y-4"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">{c.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {roleArray.map((r, ri) => (
                          <span
                            key={ri}
                            className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-medium border border-emerald-500/20"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {phoneArray.length > 0 && (
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800 mb-3">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{phoneArray.join(', ')}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-500" />
                      <span>គម្រោងដែលបានចូលរួម ({c.gigs.length}):</span>
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {c.gigs.map((g, gi) => (
                        <div
                          key={gi}
                          className="text-[11px] text-slate-300 bg-slate-950/40 p-1.5 rounded border border-slate-800/80 flex justify-between items-center"
                        >
                          <span className="truncate max-w-[170px]" title={g.projectTitle}>
                            {g.projectTitle}
                          </span>
                          <span className="text-[10px] text-slate-500 shrink-0">{g.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                  <span>បទពិសោធន៍ជាមួយ Studio</span>
                  <span className="text-emerald-400 font-bold">{c.gigs.length} ការងារ</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
