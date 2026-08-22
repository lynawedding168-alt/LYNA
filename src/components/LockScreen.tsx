import React, { useState } from 'react';
import { Lock, Fingerprint, KeyRound, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface LockScreenProps {
  appPin: string;
  biometricEnabled: boolean;
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  appPin,
  biometricEnabled,
  onUnlock
}) => {
  const [inputPin, setInputPin] = useState('');
  const [error, setError] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === appPin) {
      onUnlock();
    } else {
      setError(true);
      setInputPin('');
    }
  };

  const handleDigitClick = (digit: string) => {
    if (inputPin.length < 6) {
      const newPin = inputPin + digit;
      setInputPin(newPin);
      setError(false);

      if (appPin && newPin === appPin) {
        setTimeout(() => {
          onUnlock();
        }, 150);
      }
    }
  };

  const handleBackspace = () => {
    setInputPin(inputPin.slice(0, -1));
    setError(false);
  };

  const handleSimulateBiometrics = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onUnlock();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-emerald-500">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/10">
          <Lock className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            កម្មវិធីត្រូវបានចាក់សោ
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            សូមបញ្ចូលលេខកូដសម្ងាត់ PIN ឬស្កេនម្រាមដៃ / Face ID
          </p>
        </div>

        {/* PIN Dots */}
        <div className="flex justify-center space-x-3 py-1">
          {[0, 1, 2, 3, 4, 5].slice(0, Math.max(4, appPin.length || 4)).map((idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 border ${
                idx < inputPin.length
                  ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-sm shadow-emerald-400/50'
                  : 'bg-slate-950 border-slate-700'
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="text-xs text-rose-400 font-semibold animate-shake">
            លេខកូដ PIN មិនត្រឹមត្រូវ! សូមព្យាយាមម្តងទៀត។
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigitClick(num)}
              className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-lg font-bold text-slate-100 transition active:scale-90 flex items-center justify-center shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 transition active:scale-90 flex items-center justify-center"
          >
            លុប
          </button>
          <button
            type="button"
            onClick={() => handleDigitClick('0')}
            className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-lg font-bold text-slate-100 transition active:scale-90 flex items-center justify-center shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => {
              if (inputPin === appPin) onUnlock();
              else if (inputPin) setError(true);
            }}
            className="h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 text-xs font-bold text-slate-950 transition active:scale-90 flex items-center justify-center"
          >
            យល់ព្រម
          </button>
        </div>

        {/* Biometrics Button */}
        {biometricEnabled && (
          <div className="pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleSimulateBiometrics}
              disabled={isScanning}
              className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm group"
            >
              <Fingerprint
                className={`w-5 h-5 text-emerald-400 group-hover:scale-110 transition ${
                  isScanning ? 'animate-pulse' : ''
                }`}
              />
              <span>
                {isScanning
                  ? 'កំពុងផ្ទៀងផ្ទាត់ Biometrics / Face ID...'
                  : 'ស្កេនម្រាមដៃ / Face ID ដោះសោ'}
              </span>
            </button>
          </div>
        )}
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        អ្នកបង្កើតកម្មវិធី KEO LYNA
      </footer>
    </div>
  );
};
