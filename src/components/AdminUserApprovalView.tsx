import React, { useState } from 'react';
import {
  UserCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  UserX,
  Mail,
  UserPlus
} from 'lucide-react';
import { AppUser, UserStatus } from '../types';
import { PRIMARY_OWNER_EMAILS } from '../data/initialData';

interface AdminUserApprovalViewProps {
  users: AppUser[];
  onUpdateStatus: (email: string, status: UserStatus) => void;
  onUpdateRole?: (email: string, role: 'admin' | 'user') => void;
  onDeleteUser?: (email: string) => void;
  onAddUser?: (user: AppUser) => void;
}

export const AdminUserApprovalView: React.FC<AdminUserApprovalViewProps> = ({
  users,
  onUpdateStatus,
  onUpdateRole,
  onDeleteUser,
  onAddUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) return;
    if (users.some((u) => u.email.toLowerCase() === newEmail.trim().toLowerCase())) {
      alert('Gmail នេះមានក្នុងប្រព័ន្ធរួចហើយ!');
      return;
    }

    if (onAddUser) {
      onAddUser({
        email: newEmail.trim().toLowerCase(),
        name: newName.trim() || newEmail.split('@')[0],
        status: 'approved',
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${newEmail.trim()}`,
        joinedAt: new Date().toISOString().split('T')[0]
      });
    }

    setNewEmail('');
    setNewName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-400" />
            គ្រប់គ្រងការអនុញ្ញាត Gmail (Admin Control Panel)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ក្នុងនាមជាម្ចាស់ App អ្នកអាចអនុញ្ញាត (Approve) ឬបដិសេធ (Reject) Gmail ផ្សេងៗដែលចង់ចូលប្រើ
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 stroke-[3]" />
          <span>បន្ថែមអ្នកប្រើថ្មី</span>
        </button>
      </div>

      {/* Add User Form */}
      {isAdding && (
        <form
          onSubmit={handleCreateUser}
          className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-3"
        >
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>បន្ថែម និងអនុញ្ញាត Gmail ដោយផ្ទាល់</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="email"
              required
              placeholder="បញ្ចូលអាសយដ្ឋាន Gmail..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="ឈ្មោះអ្នកថតរូប ឬ Studio..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-600"
            >
              បង្កើត និងអនុញ្ញាតភ្លាមៗ
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="ស្វែងរកតាម Gmail ឬឈ្មោះ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 text-slate-200"
        />
      </div>

      {/* User Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">អ្នកប្រើប្រាស់ (User)</th>
                <th className="p-4">Gmail</th>
                <th className="p-4">តួនាទី (Role)</th>
                <th className="p-4">ស្ថានភាព (Status)</th>
                <th className="p-4 text-right">សកម្មភាព (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map((u) => {
                const isOwner = PRIMARY_OWNER_EMAILS.includes(u.email.toLowerCase());

                return (
                  <tr key={u.email} className="hover:bg-slate-950/40 transition">
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 object-cover shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-200 flex items-center gap-1.5">
                          {u.name}
                          {isOwner && (
                            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                              Owner
                            </span>
                          )}
                        </div>
                        {u.joinedAt && (
                          <div className="text-[10px] text-slate-500">
                            ចូលរួម: {u.joinedAt}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-slate-300 font-mono text-xs">{u.email}</td>

                    <td className="p-4">
                      {u.role === 'admin' ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> ម្ចាស់ / Admin
                        </span>
                      ) : (
                        <span className="text-slate-400">អ្នកថតរូបទូទៅ (User)</span>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${
                          u.status === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : u.status === 'pending'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {u.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {u.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>}
                        {u.status === 'rejected' && <XCircle className="w-3 h-3" />}
                        {u.status === 'approved'
                          ? 'បានអនុញ្ញាត'
                          : u.status === 'pending'
                          ? 'រង់ចាំពិនិត្យ'
                          : 'បានបដិសេធ'}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      {!isOwner && (
                        <>
                          {u.status !== 'approved' && (
                            <button
                              onClick={() => onUpdateStatus(u.email, 'approved')}
                              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold rounded-lg text-xs transition border border-emerald-500/30"
                              title="អនុញ្ញាតឱ្យចូលប្រើប្រាស់"
                            >
                              អនុញ្ញាត (Approve)
                            </button>
                          )}

                          {u.status !== 'rejected' && (
                            <button
                              onClick={() => onUpdateStatus(u.email, 'rejected')}
                              className="px-2.5 py-1 bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white font-bold rounded-lg text-xs transition border border-rose-500/20"
                              title="បដិសេធការចូលប្រើ"
                            >
                              បដិសេធ (Reject)
                            </button>
                          )}

                          {onDeleteUser && (
                            <button
                              onClick={() => {
                                if (confirm(`តើអ្នកពិតជាចង់លុបគណនី ${u.email} មែនទេ?`)) {
                                  onDeleteUser(u.email);
                                }
                              }}
                              className="p-1 text-slate-500 hover:text-rose-400"
                              title="លុបចេញពីបញ្ជី"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
