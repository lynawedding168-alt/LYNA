import React, { useState, useRef } from 'react';
import {
  Settings,
  User,
  Shield,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Calendar,
  Save,
  Download,
  Upload,
  Lock,
  LogOut,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Camera,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import { AppUser, Project } from '../types';

interface SettingsViewProps {
  currentUser: AppUser;
  onUpdateUser: (updatedUser: AppUser) => void;
  projects: Project[];
  onImportProjects: (importedProjects: Project[]) => void;
  appPin: string;
  setAppPin: (pin: string) => void;
  biometricEnabled: boolean;
  setBiometricEnabled: (enabled: boolean) => void;
  onLogout: () => void;
  onLockApp: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onUpdateUser,
  projects,
  onImportProjects,
  appPin,
  setAppPin,
  biometricEnabled,
  setBiometricEnabled,
  onLogout,
  onLockApp
}) => {
  // Profile edit state
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || 'lynakeo096@gmail.com');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [studioName, setStudioName] = useState(() => {
    return localStorage.getItem('photopro_studio_name') || 'LYNA WEDDING & PHOTOGRAPHY';
  });
  const [studioAddress, setStudioAddress] = useState(() => {
    return localStorage.getItem('photopro_studio_address') || 'រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា';
  });

  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Google Profile Preset Avatars
  const googlePresets = [
    { name: 'Google Blue', bg: '1a73e8' },
    { name: 'Google Emerald', bg: '0f9d58' },
    { name: 'Google Purple', bg: '7c3aed' },
    { name: 'Google Amber', bg: 'ea4335' },
    { name: 'Google Dark', bg: '1e293b' }
  ];

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('ទំហំរូបភាពធំពេក សូមជ្រើសរើសរូបភាពក្រោម 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to Google Initial Avatar
  const handleResetGoogleAvatar = (bgHex: string = '1a73e8') => {
    const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || currentUser.email.split('@')[0]
    )}&background=${bgHex}&color=ffffff&size=256&bold=true&font-size=0.45`;
    setAvatar(newAvatar);
  };

  // Handle Save Profile & Studio
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase() || 'lynakeo096@gmail.com';
    onUpdateUser({
      ...currentUser,
      name,
      email: cleanEmail,
      phone,
      avatar
    });
    localStorage.setItem('photopro_studio_name', studioName);
    localStorage.setItem('photopro_studio_address', studioAddress);

    setSavedNotice('បានរក្សាទុកការកំណត់ជោគជ័យ!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  // Export JSON Backup
  const handleExportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            version: '2.5',
            exportDate: new Date().toISOString(),
            user: currentUser,
            projects: projects
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `photopro_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && Array.isArray(parsed.projects)) {
            onImportProjects(parsed.projects);
            setSavedNotice(`បាននាំចូលគម្រោងចំនួន ${parsed.projects.length} ជោគជ័យ!`);
            setTimeout(() => setSavedNotice(null), 4000);
          } else {
            alert('ឯកសារ JSON មិនត្រឹមត្រូវតាមទម្រង់!');
          }
        } catch {
          alert('មិនអាចអានឯកសារ JSON បានទេ!');
        }
      };
    }
  };

  const isPrimaryOwner =
    currentUser.email.toLowerCase() === 'lynakeo096@gmail.com';

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-emerald-400" />
            ការកំណត់ប្រព័ន្ធ (Settings & Profile)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            គ្រប់គ្រងគណនីម្ចាស់កម្មសិទ្ធិ ព័ត៌មានស្ទូឌីយោ និងការបម្រុងទុកទិន្នន័យ
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onLockApp}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>ចាក់សោ</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>ចាកចេញ</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 p-3.5 rounded-xl flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Section 1: Profile & Ownership */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2.5">
              <User className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-base">
                ព័ត៌មានម្ចាស់គណនី (Account & Ownership)
              </h3>
            </div>
            {isPrimaryOwner ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ម្ចាស់កម្មសិទ្ធិ (Master Owner)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
                {currentUser.role === 'admin' ? 'អ្នកគ្រប់គ្រង (Admin)' : 'សមាជិក (Member)'}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative group">
                <img
                  src={avatar}
                  alt={name || currentUser.name}
                  className="w-24 h-24 rounded-full bg-slate-950 border-2 border-emerald-500/40 object-cover shadow-xl"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-950/70 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition text-[11px] text-emerald-400 font-bold gap-1 cursor-pointer"
                >
                  <Camera className="w-5 h-5 text-emerald-400" />
                  <span>ប្តូររូប</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upload រូបថត</span>
              </button>

              <div className="text-[11px] text-slate-400 font-medium mt-1">
                ម៉ូដពណ៌ Google / Gmail:
              </div>
              <div className="flex items-center gap-1.5">
                {googlePresets.map((preset) => (
                  <button
                    key={preset.bg}
                    type="button"
                    title={preset.name}
                    onClick={() => handleResetGoogleAvatar(preset.bg)}
                    className="w-5 h-5 rounded-full border border-slate-600 hover:scale-110 transition shadow"
                    style={{ backgroundColor: `#${preset.bg}` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  ឈ្មោះម្ចាស់គណនី (Display Name)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="ឧ. KEO LYNA"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>អ៊ីមែល Gmail (Google Account)</span>
                  </label>
                  {email.toLowerCase() === 'lynakeo096@gmail.com' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEmail('lynakeo096@gmail.com')}
                      className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      ប្រើ lynakeo096@gmail.com
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/90 rounded-xl p-2.5 pr-10 text-sm text-slate-100 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner"
                    placeholder="lynakeo096@gmail.com"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                      Gmail
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  គណនី Gmail ម្ចាស់កម្មសិទ្ធិសម្រាប់ចូលប្រើប្រាស់ និងការពារសុវត្ថិភាព
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  លេខទូរស័ព្ទទំនាក់ទំនង (Phone Number)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="ឧ. 096 888 9999"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  កាលបរិច្ឆេទចូលរួម (Member Since)
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser.joinedAt || '2025-01-01'}
                  className="w-full bg-slate-950/50 border border-slate-850 rounded-xl p-2.5 text-sm text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Studio Branding & Invoice Details */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-800/80 pb-3">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">
              ព័ត៌មានស្ទូឌីយោ និងបង្កាន់ដៃ (Studio & Invoice Branding)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                ឈ្មោះស្ទូឌីយោ / យីហោ (Studio Name)
              </label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                placeholder="ឧ. LYNA WEDDING & PHOTO PRO"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                អាសយដ្ឋានស្ទូឌីយោ (Studio Address / Location)
              </label>
              <input
                type="text"
                value={studioAddress}
                onChange={(e) => setStudioAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                placeholder="ឧ. រាជធានីភ្នំពេញ"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Security & Access Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-base">
                សុវត្ថិភាព និងលេខសម្ងាត់ (Security Status)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              PIN: {appPin ? 'បានកំណត់ (៤ ខ្ទង់)' : 'មិនទាន់កំណត់'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-200">លេខកូដសម្ងាត់ PIN</div>
                <div className="text-xs text-slate-400">
                  {appPin ? 'ចាក់សោស្វ័យប្រវត្តិកំពុងដំណើរការ' : 'មិនទាន់មាន PIN សុវត្ថិភាព'}
                </div>
              </div>
              <button
                type="button"
                onClick={onLockApp}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-lg border border-slate-700 transition"
              >
                {appPin ? 'សាកល្បងចាក់សោ' : 'កំណត់ PIN'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-200">
                  ស្កេនម្រាមដៃ / Face ID
                </div>
                <div className="text-xs text-slate-400">
                  {biometricEnabled ? 'បានបើកដំណើរការ' : 'បានបិទ'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={biometricEnabled}
                  onChange={(e) => setBiometricEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>រក្សាទុកការកំណត់</span>
          </button>
        </div>
      </form>

      {/* Section 4: Data Backup & Restore */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center space-x-2.5 border-b border-slate-800/80 pb-3">
          <Download className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">
            បម្រុងទុក និងនាំចូលទិន្នន័យ (Data Backup & Restore)
          </h3>
        </div>

        <p className="text-xs text-slate-400">
          លោកអ្នកអាចទាញយកឯកសារបម្រុងទុក (JSON Backup) នៃរាល់គម្រោងថតរូប និងបញ្ជីការងារទាំងអស់
          ដើម្បីរក្សាទុកក្នុងកុំព្យូទ័រ ឬទូរស័ព្ទដៃដោយសុវត្ថិភាព។
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>ទាញយកទិន្នន័យបម្រុងទុក (Export Backup)</span>
          </button>

          <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition cursor-pointer">
            <Upload className="w-4 h-4 text-teal-400" />
            <span>នាំចូលទិន្នន័យ (Import Backup)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
