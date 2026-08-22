import React from 'react';
import { Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center bg-slate-950 border-t border-slate-850 text-slate-400 text-sm font-medium tracking-wide flex items-center justify-center gap-2">
      <Code2 className="w-4 h-4 text-emerald-400" />
      <span>អ្នកបង្កើតកម្មវិធី <strong className="text-slate-200 font-bold">KEO LYNA</strong></span>
      <span className="text-slate-600">|</span>
      <span className="text-xs text-slate-500">PhotoPro Management Suite</span>
    </footer>
  );
};
