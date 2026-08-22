import React from 'react';
import { XCircle, LogOut } from 'lucide-react';
import { AppUser } from '../types';

interface RejectedScreenProps {
  user: AppUser;
  onLogout: () => void;
}

export const RejectedScreen: React.FC<RejectedScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center selection:bg-rose-500">
      <div className="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mx-auto border border-rose-500/30">
          <XCircle className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">គណនីមិនត្រូវបានអនុញ្ញាត</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            គណនី <strong className="text-rose-300 font-mono">({user.email})</strong> ត្រូវបានបដិសេធ ឬមិនទាន់ទទួលបានសិទ្ធិចូលដំណើរការប្រព័ន្ធឡើយ។
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>ត្រឡប់ក្រោយ / ចាកចេញ</span>
        </button>
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        អ្នកបង្កើតកម្មវិធី KEO LYNA
      </footer>
    </div>
  );
};
