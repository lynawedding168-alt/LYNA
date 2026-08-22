import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  Fingerprint,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface SecuritySettingsViewProps {
  appPin: string;
  setAppPin: (pin: string) => void;
  biometricEnabled: boolean;
  setBiometricEnabled: (enabled: boolean) => void;
  onLockApp: () => void;
}

export const SecuritySettingsView: React.FC<SecuritySettingsViewProps> = ({
  appPin,
  setAppPin,
  biometricEnabled,
  setBiometricEnabled,
  onLockApp
}) => {
  const [pinInput, setPinInput] = useState(appPin);
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput && pinInput.length < 4) {
      setMsg({ type: 'error', text: 'លេខកូដ PIN ត្រូវតែមានយ៉ាងតិច ៤ ខ្ទង់!' });
      return;
    }

    if (pinInput && confirmPinInput && pinInput !== confirmPinInput) {
      setMsg({ type: 'error', text: 'លេខកូដ PIN ផ្ទៀងផ្ទាត់មិនត្រូវគ្នាទេ!' });
      return;
    }

    setAppPin(pinInput);
    setConfirmPinInput('');
    setMsg({
      type: 'success',
      text: pinInput ? 'បានកំណត់ PIN សុវត្ថិភាពជោគជ័យ!' : 'បានលុប PIN សុវត្ថិភាព!'
    });
  };

  const handleRemovePin = () => {
    setAppPin('');
    setPinInput('');
    setConfirmPinInput('');
    setMsg({ type: 'success', text: 'បានដោះលេខកូដ PIN រួចរាល់!' });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-emerald-400" />
          ការកំណត់សោសុវត្ថិភាព (Security & Privacy)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          កំណត់លេខកូដ PIN, ស្កេនម្រាមដៃ (Fingerprint) និង Face ID ដើម្បីការពារទិន្នន័យគម្រោង
        </p>
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          {msg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        {/* PIN Setup Form */}
        <form onSubmit={handleSavePin} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-400" />
                <span>លេខកូដសម្ងាត់ PIN (៤ ទៅ ៦ ខ្ទង់)</span>
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                {appPin
                  ? 'PIN បច្ចុប្បន្នត្រូវបានបើកដំណើរការ'
                  : 'មិនទាន់បានកំណត់លេខកូដ PIN ទេ'}
              </p>
            </div>
            {appPin && (
              <span className="text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                PIN សកម្ម
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="បញ្ចូលលេខកូដ PIN ថ្មី..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 tracking-widest text-center"
              />
            </div>
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="ផ្ទៀងផ្ទាត់ PIN ម្ដងទៀត..."
                value={confirmPinInput}
                onChange={(e) => setConfirmPinInput(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 tracking-widest text-center"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>រក្សាទុកលេខកូដ PIN</span>
            </button>
            {appPin && (
              <button
                type="button"
                onClick={handleRemovePin}
                className="bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white px-3 py-2 rounded-xl text-xs transition border border-rose-500/20"
              >
                ដកលេខកូដ PIN ចេញ
              </button>
            )}
          </div>
        </form>

        <hr className="border-slate-800" />

        {/* Biometrics Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <span>ស្កេនម្រាមដៃ / ផ្ទៃមុខ (Biometrics & Face ID)</span>
            </div>
            <div className="text-xs text-slate-400">
              បើកដំណើរការដោះសោកម្មវិធីភ្លាមៗដោយប្រើ Fingerprint ឬ Face ID
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={biometricEnabled}
              onChange={(e) => setBiometricEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <hr className="border-slate-800" />

        {/* Quick Lock Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>ចាក់សោកម្មវិធីភ្លាមៗ</span>
            </div>
            <div className="text-xs text-slate-400">
              ចាក់សោអេក្រង់ឥឡូវនេះ (តម្រូវឱ្យមាន PIN ឬស្កេនម្រាមដៃដើម្បីចូលវិញ)
            </div>
          </div>
          <button
            onClick={onLockApp}
            disabled={!appPin && !biometricEnabled}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 hover:text-emerald-400 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ចាក់សោឥឡូវនេះ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
