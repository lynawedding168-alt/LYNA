import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  Camera,
  CalendarDays,
  Users,
  Shield,
  UserCheck,
  Sparkles,
  Settings,
  X,
  Menu,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { ActiveTab, AppUser } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: AppUser;
  projectsCount: number;
  pendingUsersCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currentUser,
  projectsCount,
  pendingUsersCount,
  onLogout
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        id="sidebar-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-200 cursor-pointer"
        aria-hidden="true"
      />

      {/* Drawer Sidebar Panel */}
      <aside
        id="app-sidebar-drawer"
        className="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-slate-900 border-r border-slate-800 p-4 sm:p-5 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out"
        aria-label="បញ្ជីមុខងារចម្បង"
      >
        <div className="space-y-4">
          {/* Drawer Header with Title & Close (X) */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-slate-100 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Menu className="w-4 h-4" />
              </div>
              <span>បញ្ជីមុខងារ (Menu)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition cursor-pointer"
              title="បិទផ្ទាំងម៉ឺនុយ (Close)"
              aria-label="បិទម៉ឺនុយ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile Mini Card */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/40 object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-200 truncate">
                  {currentUser.name}
                </span>
                {currentUser.email.toLowerCase() === 'lynakeo096@gmail.com' && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {currentUser.email}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-1">
            <button
              onClick={() => handleSelectTab('dashboard')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard
                  className={`w-4 h-4 ${
                    activeTab === 'dashboard' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>ផ្ទាំងព័ត៌មាន (Dashboard)</span>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('projects')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Camera
                  className={`w-4 h-4 ${
                    activeTab === 'projects' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>គម្រោងថត (Projects)</span>
              </div>
              {projectsCount > 0 && (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {projectsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleSelectTab('calendar')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CalendarDays
                  className={`w-4 h-4 ${
                    activeTab === 'calendar' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>កាលវិភាគ (Calendar)</span>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('collaborators')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'collaborators'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users
                  className={`w-4 h-4 ${
                    activeTab === 'collaborators' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>ក្រុមការងារ (Team)</span>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('security')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Shield
                  className={`w-4 h-4 ${
                    activeTab === 'security' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>សោសុវត្ថិភាព (Lock)</span>
              </div>
            </button>

            <button
              onClick={() => handleSelectTab('settings')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings
                  className={`w-4 h-4 ${
                    activeTab === 'settings' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span>ការកំណត់ (Settings)</span>
              </div>
            </button>

            {currentUser.role === 'admin' && (
              <div className="pt-3 border-t border-slate-800 mt-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-3 mb-1.5 tracking-wider">
                  ផ្ទាំងគ្រប់គ្រងម្ចាស់ App
                </div>
                <button
                  onClick={() => handleSelectTab('admin')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition w-full text-left cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <UserCheck
                      className={`w-4 h-4 ${
                        activeTab === 'admin' ? 'text-amber-400' : 'text-slate-400'
                      }`}
                    />
                    <span>អនុញ្ញាត Gmail (Users)</span>
                  </div>
                  {pendingUsersCount > 0 && (
                    <span className="bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2 py-0.5 rounded-full animate-bounce">
                      {pendingUsersCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Logout Action Button inside Menu */}
            <div className="pt-3 border-t border-slate-800 mt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition w-full text-left text-rose-400 hover:text-rose-200 hover:bg-rose-500/15 border border-rose-500/20 hover:border-rose-500/40 cursor-pointer shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>ចាកចេញពីគណនី (Log Out)</span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* Quick Summary Tip / Footer */}
        <div className="mt-6 p-3 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>គន្លឹះរហ័ស</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ពិនិត្យកាលវិភាគ ១ ថ្ងៃមុនចេញថត ដើម្បីសាកថ្ម និងរៀបចំបញ្ជីកាមេរ៉ាឱ្យបានរួចរាល់។
          </p>
        </div>
      </aside>
    </>
  );
};

