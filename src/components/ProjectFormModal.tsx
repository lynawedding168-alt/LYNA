import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Camera,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  CheckSquare,
  FileText,
  Link,
  Phone,
  Sparkles
} from 'lucide-react';
import { Project, EventType, ProjectStatus, Collaborator, EquipmentItem } from '../types';

interface ProjectFormModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (projectData: Omit<Project, 'id' | 'userEmail'>) => void;
}

const EVENT_TYPE_OPTIONS: { value: EventType; label: string }[] = [
  { value: 'Wedding', label: 'Wedding (អាពាហ៍ពិពាហ៍)' },
  { value: 'Pre-Wedding', label: 'Pre-Wedding (ថតក្រៅឆាក)' },
  { value: 'Birthday', label: 'Birthday (ខួបកំណើត)' },
  { value: 'Event', label: 'Event / កម្មវិធីសម្ពោធ & ជប់លៀង' },
  { value: 'Product', label: 'Product (ថតផ្សព្វផ្សាយផលិតផល)' },
  { value: 'Portrait', label: 'Portrait (ថតរូបទោល / Profile)' },
  { value: 'Graduation', label: 'Graduation (ថតទទួលសញ្ញាបត្រ)' }
];

const DEFAULT_GEAR_TEMPLATES = [
  'Sony A7IV / FX3 Body x2',
  'Lens 24-70mm f2.8 & 85mm f1.4',
  'Lens 70-200mm f2.8 GM',
  'Godox V1 Flash x2 + Transceiver',
  'Godox AD200Pro + Softbox Grid',
  'DJI RS3 Pro Gimbal + Extra Batteries',
  'SD Memory Cards 128GB V90 x4',
  'DJI Mavic 3 Pro Drone + 3 Batteries',
  'Reflector 5-in-1 + C-Stand'
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(project?.title || '');
  const [eventType, setEventType] = useState<EventType>(project?.eventType || 'Wedding');
  const [clientName, setClientName] = useState(project?.clientName || '');
  const [clientPhone, setClientPhone] = useState(project?.clientPhone || '');
  const [location, setLocation] = useState(project?.location || '');
  const [shootingDate, setShootingDate] = useState(
    project?.shootingDate || new Date().toISOString().split('T')[0]
  );
  const [shootingTime, setShootingTime] = useState(project?.shootingTime || '07:00');
  const [deliveryDeadline, setDeliveryDeadline] = useState(
    project?.deliveryDeadline ||
      new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'Booking');
  const [totalPrice, setTotalPrice] = useState<number>(project?.totalPrice || 0);
  const [deposit, setDeposit] = useState<number>(project?.deposit || 0);
  const [driveLink, setDriveLink] = useState(project?.driveLink || '');
  const [notes, setNotes] = useState(project?.notes || '');

  const [collaborators, setCollaborators] = useState<Collaborator[]>(
    project?.collaborators && project.collaborators.length > 0
      ? project.collaborators
      : [{ name: '', role: 'Second Camera', phone: '' }]
  );

  const [equipmentChecklist, setEquipmentChecklist] = useState<EquipmentItem[]>(
    project?.equipmentChecklist && project.equipmentChecklist.length > 0
      ? project.equipmentChecklist
      : [
          { id: 1, name: 'Sony Camera Body + ថ្មបម្រុង', checked: true },
          { id: 2, name: 'Lens 24-70mm f2.8 & 85mm', checked: true },
          { id: 3, name: 'Godox Flash V1 x2', checked: false },
          { id: 4, name: 'SD Cards 128GB x4', checked: true }
        ]
  );

  const [newGearText, setNewGearText] = useState('');

  // Add Collaborator
  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, { name: '', role: '', phone: '' }]);
  };

  const handleUpdateCollaborator = (
    index: number,
    field: keyof Collaborator,
    value: string
  ) => {
    const updated = [...collaborators];
    updated[index] = { ...updated[index], [field]: value };
    setCollaborators(updated);
  };

  const handleRemoveCollaborator = (index: number) => {
    setCollaborators(collaborators.filter((_, i) => i !== index));
  };

  // Gear Checklist Management
  const handleAddGearItem = () => {
    if (!newGearText.trim()) return;
    setEquipmentChecklist([
      ...equipmentChecklist,
      { id: Date.now(), name: newGearText.trim(), checked: false }
    ]);
    setNewGearText('');
  };

  const handleToggleGearItem = (id: number) => {
    setEquipmentChecklist(
      equipmentChecklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveGearItem = (id: number) => {
    setEquipmentChecklist(equipmentChecklist.filter((item) => item.id !== id));
  };

  const handleAddTemplateGear = (templateName: string) => {
    if (equipmentChecklist.some((g) => g.name === templateName)) return;
    setEquipmentChecklist([
      ...equipmentChecklist,
      { id: Date.now() + Math.floor(Math.random() * 1000), name: templateName, checked: false }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !clientName.trim()) {
      alert('សូមបញ្ចូលចំណងជើងគម្រោង និងឈ្មោះអតិថិជន!');
      return;
    }

    const cleanCollaborators = collaborators.filter((c) => c.name.trim().length > 0);

    onSave({
      title: title.trim(),
      eventType,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      location: location.trim(),
      shootingDate,
      shootingTime,
      deliveryDeadline,
      status,
      totalPrice: Number(totalPrice) || 0,
      deposit: Number(deposit) || 0,
      collaborators: cleanCollaborators,
      equipmentChecklist,
      notes: notes.trim(),
      driveLink: driveLink.trim()
    });
  };

  const remainingBalance = Math.max(0, (Number(totalPrice) || 0) - (Number(deposit) || 0));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-5 sm:p-7 space-y-5 my-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              <span>{project ? 'កែប្រែគម្រោងថតរូប' : 'បន្ថែមគម្រោងថតរូបថ្មី'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              បញ្ចូលព័ត៌មានលម្អិត កាលវិភាគ តម្លៃ ក្រុមការងារ និងគ្រឿងឧបករណ៍
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">
                ចំណងជើងគម្រោងថត (Project Title) *
              </label>
              <input
                type="text"
                required
                placeholder="ឧ. អាពាហ៍ពិពាហ៍ លោក សុខ & កញ្ញា ចាន់"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ប្រភេទការថត (Event Type)
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              >
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ស្ថានភាពគម្រោង (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="Booking">បានកក់ (Booking)</option>
                <option value="Shooting">កំពុងថត (Shooting)</option>
                <option value="Editing">កំពុង Edit (Editing)</option>
                <option value="Delivered">បានប្រគល់ (Delivered)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ឈ្មោះអតិថិជន (Client Name) *
              </label>
              <input
                type="text"
                required
                placeholder="ឈ្មោះភ្ញៀវ ឬក្រុមហ៊ុន..."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                លេខទូរស័ព្ទភ្ញៀវ (Phone Number)
              </label>
              <input
                type="tel"
                placeholder="012 345 678..."
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ថ្ងៃត្រូវចុះថត (Shooting Date)
              </label>
              <input
                type="date"
                required
                value={shootingDate}
                onChange={(e) => setShootingDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ម៉ោងទៅដល់ / Call Time
              </label>
              <input
                type="time"
                value={shootingTime}
                onChange={(e) => setShootingTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ថ្ងៃកំណត់ប្រគល់រូប (Delivery Deadline)
              </label>
              <input
                type="date"
                value={deliveryDeadline}
                onChange={(e) => setDeliveryDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ទីតាំងថត (Location)
              </label>
              <input
                type="text"
                placeholder="ឈ្មោះសណ្ឋាគារ ហាង ឬអាសយដ្ឋាន..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Pricing & Deposit */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>តម្លៃសេវាកម្ម និងប្រាក់កក់ (Financials)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 text-xs mb-1">តម្លៃសរុប ($)</label>
                <input
                  type="number"
                  min="0"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs mb-1">ប្រាក់កក់មុន ($)</label>
                <input
                  type="number"
                  min="0"
                  value={deposit}
                  onChange={(e) => setDeposit(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs mb-1">ប្រាក់នៅខ្វះ (Balance)</label>
                <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 text-amber-400 font-bold">
                  ${remainingBalance}
                </div>
              </div>
            </div>
          </div>

          {/* Collaborators */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>អ្នករួមការងារជាមួយ (Collaborators & Crew)</span>
              </label>
              <button
                type="button"
                onClick={handleAddCollaborator}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>បន្ថែមសមាជិក</span>
              </button>
            </div>

            <div className="space-y-2">
              {collaborators.map((c, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ឈ្មោះជាង..."
                    value={c.name}
                    onChange={(e) => handleUpdateCollaborator(index, 'name', e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    list="collaborator-roles-list"
                    placeholder="តួនាទី (ឧ. ជាងរង, ដ្រូន, ភ្លើង...)"
                    value={c.role}
                    onChange={(e) => handleUpdateCollaborator(index, 'role', e.target.value)}
                    className="w-40 sm:w-48 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    placeholder="លេខទូរស័ព្ទ..."
                    value={c.phone || ''}
                    onChange={(e) => handleUpdateCollaborator(index, 'phone', e.target.value)}
                    className="w-28 sm:w-36 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCollaborator(index)}
                    className="text-slate-500 hover:text-rose-400 p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Checklist */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>បញ្ជីគ្រឿងឧបករណ៍ និងកាមេរ៉ា (Gear Checklist)</span>
              </label>
              <span className="text-slate-500 text-[11px]">
                {equipmentChecklist.filter((g) => g.checked).length}/{equipmentChecklist.length}{' '}
                បានត្រៀម
              </span>
            </div>

            {/* Quick Template Chips */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              {DEFAULT_GEAR_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddTemplateGear(tmpl)}
                  className="text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg border border-slate-800 transition"
                >
                  + {tmpl}
                </button>
              ))}
            </div>

            {/* Checklist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-1 bg-slate-950/50 rounded-xl border border-slate-800">
              {equipmentChecklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800"
                >
                  <label className="flex items-center space-x-2 text-xs text-slate-200 cursor-pointer truncate flex-1">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleGearItem(item.id)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span className={item.checked ? 'text-emerald-400 font-medium truncate' : 'text-slate-200 truncate'}>
                      {item.name}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveGearItem(item.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Gear Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="បញ្ចូលគ្រឿងកាមេរ៉ាផ្ទាល់ខ្លួនបន្ថែម..."
                value={newGearText}
                onChange={(e) => setNewGearText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGearItem();
                  }
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddGearItem}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                + បញ្ចូល
              </button>
            </div>
          </div>

          {/* Drive Link & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-cyan-400" />
                <span>តំណភ្ជាប់ Google Drive / Cloud Link</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/drive/folders/..."
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>កំណត់ចំណាំពិសេស (Special Notes)</span>
              </label>
              <input
                type="text"
                placeholder="ឧ. ភ្ញៀវស្នើសុំរូប Highlight 10 សន្លឹកមុន..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Datalist for suggested roles */}
          <datalist id="collaborator-roles-list">
            <option value="Second Camera (ជាងរង)" />
            <option value="Main Camera (ជាងមេ)" />
            <option value="Drone Pilot (អ្នកហោះដ្រូន)" />
            <option value="Lighting / ជំនួយការភ្លើង" />
            <option value="Makeup / ជាងតុបតែង" />
            <option value="Hair Stylist (ជាងធ្វើសក់)" />
            <option value="Photo Editor (អ្នកកាត់តរូប)" />
            <option value="Video Editor (អ្នកកាត់តវីដេអូ)" />
            <option value="Livestream Operator" />
            <option value="Sound Recordist" />
            <option value="Assistant (ជំនួយការទូទៅ)" />
          </datalist>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-semibold transition"
            >
              បោះបង់ (Cancel)
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition active:scale-95 cursor-pointer"
            >
              រក្សាទុកគម្រោង (Save Project)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
