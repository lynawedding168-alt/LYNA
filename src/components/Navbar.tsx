import React from 'react';
import { Camera, Lock, Menu } from 'lucide-react';
import { AppUser } from '../types';

interface NavbarProps {
  currentUser: AppUser;
  appPin: string;
  onLockApp: () => void;
  onLogout?: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
  pendingUsersCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  appPin,
  onLockApp,
  onToggleSidebar,
  isSidebarOpen,
  pendingUsersCount = 0
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2.5 sm:space-x-3.5">
        {/* Hamburger Menu Button (សញ្ញាត្រេបី) */}
        <button
          onClick={onToggleSidebar}
          className={`p-2 sm:p-2.5 rounded-xl border transition flex items-center justify-center relative cursor-pointer ${
            isSidebarOpen
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 border-slate-700/80 hover:border-emerald-500/30'
          }`}
          title="បើកផ្ទាំងម៉ឺនុយ (Menu)"
          aria-label="បើកម៉ឺនុយ"
        >
          <Menu className="w-5 h-5" />
          {pendingUsersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse border-2 border-slate-900" />
          )}
        </button>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-lg sm:text-xl shadow-lg shadow-emerald-500/20 shrink-0">
          <Camera className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <h1 className="font-bold text-base sm:text-lg leading-tight tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
              CAMERA MAN Project
            </h1>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              v2.5 Pro
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 truncate max-w-[140px] sm:max-w-none">ប្រព័ន្ធគ្រប់គ្រងគម្រោងថតរូប</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {appPin && (
          <button
            onClick={onLockApp}
            className="p-2 sm:px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="ចាក់សោ App (Lock App)"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">ចាក់សោ</span>
          </button>
        )}
      </div>
    </header>
  );
};
