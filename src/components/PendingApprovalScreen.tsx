import React from 'react';
import { ClockAlert, LogOut, ShieldAlert } from 'lucide-react';
import { AppUser } from '../types';

interface PendingApprovalScreenProps {
  user: AppUser;
  onLogout: () => void;
}

export const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({
  user,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center selection:bg-amber-500">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mx-auto border border-amber-500/30">
          <ClockAlert className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            រង់ចាំការអនុញ្ញាតពីម្ចាស់ App
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            គណនី Gmail <strong className="text-amber-300 font-mono">({user.email})</strong> របស់អ្នកត្រូវបានចុះឈ្មោះរួចរាល់។ សូមរង់ចាំម្ចាស់ App <strong className="text-emerald-400">(KEO LYNA)</strong> ពិនិត្យ និងចុច Approve ក្នុង Admin Panel ជាមុនសិន។
          </p>
        </div>

        <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
          ស្ថានភាពបច្ចុប្បន្ន: <span className="text-amber-400 font-bold">រង់ចាំការត្រួតពិនិត្យ (Pending Approval)</span>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>ចាកចេញ ឬប្តូរគណនី</span>
        </button>
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        អ្នកបង្កើតកម្មវិធី KEO LYNA
      </footer>
    </div>
  );
};
