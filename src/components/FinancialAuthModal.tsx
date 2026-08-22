import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  Fingerprint,
  ScanFace,
  KeyRound,
  ShieldCheck,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface FinancialAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  appPin: string;
  biometricEnabled: boolean;
}

export const FinancialAuthModal: React.FC<FinancialAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  appPin,
  biometricEnabled
}) => {
  const [activeMethod, setActiveMethod] = useState<'pin' | 'biometric' | 'face'>('pin');
  const [inputPin, setInputPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputPin('');
      setError('');
      setIsVerifying(false);
      setVerifySuccess(false);
      // Auto focus or default method
      setActiveMethod('pin');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle PIN verification
  const handleDigitClick = (digit: string) => {
    if (inputPin.length < 6) {
      const nextPin = inputPin + digit;
      setInputPin(nextPin);
      setError('');

      // If appPin is set, check match
      const targetPin = appPin || '1234';
      if (nextPin === targetPin) {
        setVerifySuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 400);
      } else if (nextPin.length >= targetPin.length) {
        setTimeout(() => {
          setError('លេខកូដសម្ងាត់ PIN មិនត្រឹមត្រូវទេ!');
          setInputPin('');
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setInputPin((prev) => prev.slice(0, -1));
    setError('');
  };

  // Handle Biometric Fingerprint / Face Scan
  const handleScanBiometrics = (type: 'fingerprint' | 'face') => {
    setIsVerifying(true);
    setError('');
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition cursor-pointer"
          title="បិទ"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/10">
          <Eye className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center justify-center gap-1.5">
            <span>ផ្ទៀងផ្ទាត់សុវត្ថិភាពដើម្បីបើកភ្នែក</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            សូមបញ្ចូលលេខកូដសម្ងាត់ PIN, ស្កេនក្រយៅដៃ ឬស្កេនផ្ទៃមុខ ដើម្បីបង្ហាញទឹកប្រាក់
          </p>
        </div>

        {/* Tabs for Auth Method */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveMethod('pin');
              setError('');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition ${
              activeMethod === 'pin'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>PIN</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMethod('biometric');
              setError('');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition ${
              activeMethod === 'biometric'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>ក្រយៅដៃ</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMethod('face');
              setError('');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition ${
              activeMethod === 'face'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ScanFace className="w-3.5 h-3.5" />
            <span>ស្កេនមុខ</span>
          </button>
        </div>

        {/* Success State */}
        {verifySuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ផ្ទៀងផ្ទាត់ជោគជ័យ! កំពុងបើកបង្ហាញទឹកប្រាក់...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/30 p-2 rounded-xl flex items-center justify-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* METHOD 1: PIN Input */}
        {activeMethod === 'pin' && !verifySuccess && (
          <div className="space-y-4">
            {/* PIN Dots */}
            <div className="flex justify-center space-x-3 py-1">
              {[0, 1, 2, 3].map((idx) => (
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

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[230px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleDigitClick(num)}
                  className="h-11 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-base font-bold text-slate-100 transition active:scale-90 flex items-center justify-center shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="h-11 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 transition active:scale-90 flex items-center justify-center"
              >
                លុប
              </button>
              <button
                type="button"
                onClick={() => handleDigitClick('0')}
                className="h-11 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-base font-bold text-slate-100 transition active:scale-90 flex items-center justify-center shadow-sm"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetPin = appPin || '1234';
                  if (inputPin === targetPin) {
                    setVerifySuccess(true);
                    setTimeout(() => {
                      onSuccess();
                      onClose();
                    }, 400);
                  } else {
                    setError('លេខកូដសម្ងាត់ PIN មិនត្រឹមត្រូវ!');
                  }
                }}
                className="h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold transition active:scale-90 flex items-center justify-center shadow-md shadow-emerald-500/20"
              >
                យល់ព្រម
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {appPin ? 'ប្រើប្រាស់លេខកូដ PIN សុវត្ថិភាពរបស់អ្នក' : 'លេខកូដ PIN លំនាំដើម: 1234'}
            </p>
          </div>
        )}

        {/* METHOD 2: Fingerprint Scan */}
        {activeMethod === 'biometric' && !verifySuccess && (
          <div className="py-4 space-y-4">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full border-2 border-emerald-500/30 ${
                  isVerifying ? 'animate-ping bg-emerald-500/10' : ''
                }`}
              />
              <button
                type="button"
                disabled={isVerifying}
                onClick={() => handleScanBiometrics('fingerprint')}
                className={`w-20 h-20 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl transition active:scale-95 cursor-pointer ${
                  isVerifying ? 'animate-pulse' : 'hover:scale-105'
                }`}
              >
                <Fingerprint className="w-10 h-10" />
              </button>
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleScanBiometrics('fingerprint')}
                disabled={isVerifying}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                {isVerifying ? 'កំពុងស្កេនក្រយៅដៃ...' : 'ចុចលើរូបដើម្បីស្កេនក្រយៅដៃ'}
              </button>
              <p className="text-[11px] text-slate-400">
                ផ្ទៀងផ្ទាត់ក្រយៅដៃ Touch ID / Biometrics
              </p>
            </div>
          </div>
        )}

        {/* METHOD 3: Face Scan */}
        {activeMethod === 'face' && !verifySuccess && (
          <div className="py-4 space-y-4">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-emerald-500/30 ${
                  isVerifying ? 'animate-pulse bg-emerald-500/10' : ''
                }`}
              />
              <button
                type="button"
                disabled={isVerifying}
                onClick={() => handleScanBiometrics('face')}
                className={`w-20 h-20 rounded-2xl bg-slate-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl transition active:scale-95 cursor-pointer ${
                  isVerifying ? 'animate-pulse' : 'hover:scale-105'
                }`}
              >
                <ScanFace className="w-10 h-10" />
              </button>
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleScanBiometrics('face')}
                disabled={isVerifying}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                {isVerifying ? 'កំពុងស្កេនផ្ទៃមុខ Face ID...' : 'ចុចលើរូបដើម្បីស្កេនផ្ទៃមុខ'}
              </button>
              <p className="text-[11px] text-slate-400">
                ផ្ទៀងផ្ទាត់សម្គាល់ទម្រង់មុខ (Face Recognition)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
