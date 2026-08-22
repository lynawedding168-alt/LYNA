import React, { useState } from 'react';
import { Camera, ShieldCheck, Sparkles, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { PRIMARY_OWNER_EMAILS } from '../data/initialData';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  registeredUsers: { email: string; name: string; role: string; status: string }[];
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, registeredUsers }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert('សូមបញ្ចូល Gmail ឱ្យបានត្រឹមត្រូវ!');
      return;
    }
    onLogin(email.trim());
  };

  const handleQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    onLogin(userEmail);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 text-3xl font-black mx-auto shadow-lg shadow-emerald-500/20">
            <Camera className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            ចូលប្រើប្រាស់ CAMERA MAN Project
          </h2>
          <p className="text-xs text-slate-400">
            ប្រព័ន្ធគ្រប់គ្រងគម្រោងថតរូប កាលវិភាគ និងប្រាក់ចំណូល
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">
              អាសយដ្ឋាន Gmail (Email Login)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                placeholder="បញ្ចូល Gmail របស់អ្នក (ឧ. lynakeo096@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition placeholder-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>ចូលប្រើដោយ Gmail</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Logins */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400">
            គណនីម្ចាស់កម្មសិទ្ធិ (Master Owner Account):
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('lynakeo096@gmail.com')}
              className="text-left bg-slate-950 hover:bg-slate-850 p-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 flex items-center justify-between text-xs transition"
            >
              <div className="flex items-center gap-2.5 truncate">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-200 truncate">KEO LYNA</div>
                  <div className="text-[11px] text-slate-400 truncate">lynakeo096@gmail.com</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md font-bold shrink-0">
                ម្ចាស់កម្មសិទ្ធិ (Admin)
              </span>
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-850">
          <strong>ចំណាំ:</strong> ម្ចាស់ App ({PRIMARY_OWNER_EMAILS[0]}) នឹងទទួលបានសិទ្ធិជាម្ចាស់
          Admin ដោយស្វ័យប្រវត្តិ។
        </div>
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        អ្នកបង្កើតកម្មវិធី KEO LYNA
      </footer>
    </div>
  );
};
