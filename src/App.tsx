import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  Camera,
  Calendar,
  AlertTriangle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  AppUser,
  Project,
  ActiveTab,
  UserStatus
} from './types';
import {
  INITIAL_PROJECTS,
  INITIAL_USERS,
  PRIMARY_OWNER_EMAILS
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { ProjectsView } from './components/ProjectsView';
import { CalendarView } from './components/CalendarView';
import { CollaboratorsView } from './components/CollaboratorsView';
import { SecuritySettingsView } from './components/SecuritySettingsView';
import { SettingsView } from './components/SettingsView';
import { AdminUserApprovalView } from './components/AdminUserApprovalView';
import { ProjectFormModal } from './components/ProjectFormModal';
import { InvoiceModal } from './components/InvoiceModal';
import { LockScreen } from './components/LockScreen';
import { LoginScreen } from './components/LoginScreen';
import { PendingApprovalScreen } from './components/PendingApprovalScreen';
import { RejectedScreen } from './components/RejectedScreen';
import { FinancialAuthModal } from './components/FinancialAuthModal';

export function App() {
  // Users state
  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem('photopro_users');
      if (!saved) return INITIAL_USERS;
      const parsed: AppUser[] = JSON.parse(saved);
      // Clean up previous dummy demo accounts and ensure lynakeo096@gmail.com is master
      const filtered = parsed.filter(
        (u) =>
          u.email.toLowerCase() !== 'keolyna@gmail.com' &&
          u.email.toLowerCase() !== 'dara.photo@gmail.com' &&
          u.email.toLowerCase() !== 'sreynea.media@gmail.com' &&
          u.email.toLowerCase() !== 'lynawedding168@gmail.com'
      );
      const hasLynaKeo096 = filtered.some(
        (u) => u.email.toLowerCase() === 'lynakeo096@gmail.com'
      );
      if (!hasLynaKeo096) {
        return INITIAL_USERS;
      }
      // Migrate any legacy dicebear avatar to Google/Gmail profile avatar
      return filtered.map((u) => {
        if (!u.avatar || u.avatar.includes('dicebear.com')) {
          return {
            ...u,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              u.name || u.email.split('@')[0]
            )}&background=1a73e8&color=ffffff&size=256&bold=true&font-size=0.45`
          };
        }
        return u;
      });
    } catch {
      return INITIAL_USERS;
    }
  });

  // Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('photopro_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Current Logged in User
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('photopro_current_user');
      if (saved) {
        const parsed: AppUser = JSON.parse(saved);
        if (!parsed.avatar || parsed.avatar.includes('dicebear.com')) {
          parsed.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            parsed.name || parsed.email.split('@')[0]
          )}&background=1a73e8&color=ffffff&size=256&bold=true&font-size=0.45`;
        }
        return parsed;
      }
      return INITIAL_USERS[0]; // Default to Keo Lyna for instant preview
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Security Lock States
  const [appPin, setAppPin] = useState<string>(() => {
    return localStorage.getItem('photopro_app_pin') || '';
  });

  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(() => {
    return localStorage.getItem('photopro_bio_enabled') === 'true';
  });

  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Financial Privacy Eye State (Default hidden on app open: true)
  const [hideFinancials, setHideFinancials] = useState<boolean>(true);
  const [isFinancialAuthModalOpen, setIsFinancialAuthModalOpen] = useState<boolean>(false);

  const handleToggleFinancials = () => {
    if (hideFinancials) {
      // User wants to open eye to view financials: require authentication!
      setIsFinancialAuthModalOpen(true);
    } else {
      // User wants to hide financials: hide immediately without challenge
      setHideFinancials(true);
    }
  };

  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [invoiceProject, setInvoiceProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationAlert, setNotificationAlert] = useState<{
    count: number;
    projects: Project[];
  } | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('photopro_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('photopro_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('photopro_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('photopro_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('photopro_app_pin', appPin);
  }, [appPin]);

  useEffect(() => {
    localStorage.setItem('photopro_bio_enabled', String(biometricEnabled));
  }, [biometricEnabled]);

  // Check 1-Day Notification Alert
  useEffect(() => {
    if (!currentUser) return;
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    const myUpcomingProjects = projects.filter(
      (p) =>
        (p.userEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          currentUser.role === 'admin') &&
        (p.shootingDate === tomorrowStr || p.shootingDate === todayStr)
    );

    if (myUpcomingProjects.length > 0) {
      setNotificationAlert({
        count: myUpcomingProjects.length,
        projects: myUpcomingProjects
      });
    } else {
      setNotificationAlert(null);
    }
  }, [currentUser, projects]);

  // Handle Login
  const handleGmailLogin = (emailInput: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const isOwner = PRIMARY_OWNER_EMAILS.some(
      (oe) => oe.toLowerCase() === cleanEmail
    );

    let existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existingUser) {
      const newUser: AppUser = {
        email: cleanEmail,
        name: isOwner ? 'KEO LYNA (ម្ចាស់កម្មសិទ្ធិ)' : cleanEmail.split('@')[0],
        status: isOwner ? 'approved' : 'pending',
        role: isOwner ? 'admin' : 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          cleanEmail.split('@')[0]
        )}&background=1a73e8&color=ffffff&size=256&bold=true&font-size=0.45`,
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
    } else {
      // If owner, ensure approved & admin
      if (isOwner && (existingUser.status !== 'approved' || existingUser.role !== 'admin')) {
        const updated = { ...existingUser, status: 'approved' as UserStatus, role: 'admin' as const };
        setUsers((prev) => prev.map((u) => (u.email === cleanEmail ? updated : u)));
        setCurrentUser(updated);
      } else {
        setCurrentUser(existingUser);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // User Management
  const handleUpdateUserStatus = (email: string, status: UserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, status } : u))
    );
    if (currentUser && currentUser.email === email) {
      setCurrentUser((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDeleteUser = (email: string) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  };

  const handleAddUser = (user: AppUser) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleUpdateCurrentUser = (updatedUser: AppUser) => {
    const prevEmail = currentUser?.email;
    setCurrentUser(updatedUser);
    setUsers((prev) => {
      if (prevEmail && prevEmail !== updatedUser.email) {
        return prev.map((u) => (u.email === prevEmail ? updatedUser : u));
      }
      const exists = prev.some((u) => u.email === updatedUser.email);
      if (exists) {
        return prev.map((u) => (u.email === updatedUser.email ? updatedUser : u));
      }
      return [...prev, updatedUser];
    });
  };

  const handleImportProjects = (importedProjects: Project[]) => {
    setProjects(importedProjects);
  };

  // Project CRUD
  const handleSaveProject = (projectData: Omit<Project, 'id' | 'userEmail'>) => {
    if (!currentUser) return;

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? { ...projectData, id: p.id, userEmail: editingProject.userEmail }
            : p
        )
      );
    } else {
      const newProj: Project = {
        ...projectData,
        id: 'proj_' + Date.now(),
        userEmail: currentUser.email,
        createdAt: new Date().toISOString()
      };
      setProjects((prev) => [newProj, ...prev]);
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('តើអ្នកពិតជាចង់លុបគម្រោងថតនេះមែនទេ?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleChecklist = (projId: string, itemId: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projId) return p;
        const updatedChecklist = (p.equipmentChecklist || []).map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        return { ...p, equipmentChecklist: updatedChecklist };
      })
    );
  };

  // Projects Filtered for Current User (Admin sees all or can filter)
  const userProjects = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'admin') {
      return projects;
    }
    return projects.filter(
      (p) => p.userEmail.toLowerCase() === currentUser.email.toLowerCase()
    );
  }, [projects, currentUser]);

  const filteredProjects = useMemo(() => {
    return userProjects.filter((p) => {
      const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.clientPhone && p.clientPhone.includes(searchQuery));
      return matchesStatus && matchesSearch;
    });
  }, [userProjects, filterStatus, searchQuery]);

  const pendingUsersCount = useMemo(() => {
    return users.filter((u) => u.status === 'pending').length;
  }, [users]);

  // Lock Screen Check
  if (isLocked) {
    return (
      <LockScreen
        appPin={appPin}
        biometricEnabled={biometricEnabled}
        onUnlock={() => setIsLocked(false)}
      />
    );
  }

  // Login Check
  if (!currentUser) {
    return (
      <LoginScreen
        onLogin={handleGmailLogin}
        registeredUsers={users}
      />
    );
  }

  // Pending Status Screen
  if (currentUser.status === 'pending') {
    return <PendingApprovalScreen user={currentUser} onLogout={handleLogout} />;
  }

  // Rejected Status Screen
  if (currentUser.status === 'rejected') {
    return <RejectedScreen user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        appPin={appPin}
        onLockApp={() => setIsLocked(true)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        pendingUsersCount={pendingUsersCount}
      />

      {/* 1-Day Notification Alert Banner */}
      {notificationAlert && (
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border-b border-amber-500/30 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-amber-200 text-xs sm:text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="font-bold text-amber-300">
                សាររំលឹកការងារថត (Reminder Alert):
              </span>{' '}
              អ្នកមាន <strong>{notificationAlert.count} គម្រោង</strong> ត្រូវចុះថតនៅថ្ងៃនេះ/ស្អែក (
              {notificationAlert.projects.map((p) => p.title).join(', ')})
            </div>
          </div>
          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-lg hover:bg-amber-400 transition"
            >
              ពិនិត្យកាលវិភាគ
            </button>
            <button
              onClick={() => setNotificationAlert(null)}
              className="text-slate-400 hover:text-white p-1"
              title="បិទការរំលឹក"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col">
        {/* Sidebar Drawer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          projectsCount={userProjects.length}
          pendingUsersCount={pendingUsersCount}
          onLogout={handleLogout}
        />

        {/* Dynamic Views */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={userProjects}
              onAddProject={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
              onViewProjects={() => setActiveTab('projects')}
              onSelectProject={(p) => {
                setEditingProject(p);
                setIsProjectModalOpen(true);
              }}
              hideFinancials={hideFinancials}
              onToggleHideFinancials={handleToggleFinancials}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={filteredProjects}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddProject={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
              onEditProject={(p) => {
                setEditingProject(p);
                setIsProjectModalOpen(true);
              }}
              onDeleteProject={handleDeleteProject}
              onToggleChecklist={handleToggleChecklist}
              onOpenInvoice={(p) => setInvoiceProject(p)}
              hideFinancials={hideFinancials}
              onToggleHideFinancials={handleToggleFinancials}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              projects={userProjects}
              onSelectProject={(p) => {
                setEditingProject(p);
                setIsProjectModalOpen(true);
              }}
            />
          )}

          {activeTab === 'collaborators' && (
            <CollaboratorsView projects={userProjects} />
          )}

          {activeTab === 'security' && (
            <SecuritySettingsView
              appPin={appPin}
              setAppPin={setAppPin}
              biometricEnabled={biometricEnabled}
              setBiometricEnabled={setBiometricEnabled}
              onLockApp={() => setIsLocked(true)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              onUpdateUser={handleUpdateCurrentUser}
              projects={userProjects}
              onImportProjects={handleImportProjects}
              appPin={appPin}
              setAppPin={setAppPin}
              biometricEnabled={biometricEnabled}
              setBiometricEnabled={setBiometricEnabled}
              onLogout={handleLogout}
              onLockApp={() => setIsLocked(true)}
            />
          )}

          {activeTab === 'admin' && currentUser.role === 'admin' && (
            <AdminUserApprovalView
              users={users}
              onUpdateStatus={handleUpdateUserStatus}
              onDeleteUser={handleDeleteUser}
              onAddUser={handleAddUser}
            />
          )}
        </main>
      </div>

      {/* Project Add / Edit Modal */}
      {isProjectModalOpen && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}

      {/* Invoice Modal */}
      {invoiceProject && (
        <InvoiceModal
          project={invoiceProject}
          onClose={() => setInvoiceProject(null)}
        />
      )}

      {/* Financial Security Auth Modal */}
      <FinancialAuthModal
        isOpen={isFinancialAuthModalOpen}
        onClose={() => setIsFinancialAuthModalOpen(false)}
        onSuccess={() => {
          setHideFinancials(false);
          setIsFinancialAuthModalOpen(false);
        }}
        appPin={appPin}
        biometricEnabled={biometricEnabled}
      />

      {/* Footer with user requested authorship */}
      <Footer />
    </div>
  );
}

export default App;
