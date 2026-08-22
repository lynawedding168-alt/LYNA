import React from 'react';
import { X, Printer, Camera, CheckCircle, Calendar, MapPin, Phone, User, Receipt } from 'lucide-react';
import { Project } from '../types';

interface InvoiceModalProps {
  project: Project | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const remaining = Math.max(0, project.totalPrice - project.deposit);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 my-8 shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">
              បង្កាន់ដៃកក់ & វិក្កយបត្រ (Invoice / Receipt)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>បោះពុម្ព (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="space-y-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800 print:bg-white print:border-none print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-800 print:border-slate-300 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-black text-white print:text-black">
                  PHOTO PRO STUDIO
                </h2>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                សេវាកម្មថតរូប និងវីដេអូអាជីព (Professional Photo & Video)
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 print:text-slate-600">
              <div className="font-bold text-slate-200 print:text-black text-sm">
                លេខកូដ: #{project.id.toUpperCase().slice(0, 8)}
              </div>
              <div>កាលបរិច្ឆេទចេញ: {new Date().toLocaleDateString('km-KH')}</div>
            </div>
          </div>

          {/* Client & Event Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 print:bg-slate-50 p-3.5 rounded-xl border border-slate-800 print:border-slate-200 space-y-1.5">
              <div className="text-slate-400 print:text-slate-500 font-semibold uppercase text-[10px]">
                ព័ត៌មានអតិថិជន (Client Info)
              </div>
              <div className="font-bold text-slate-100 print:text-black text-sm">
                {project.clientName}
              </div>
              <div className="text-slate-300 print:text-slate-700 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                <span>{project.clientPhone || 'គ្មានលេខ'}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 print:bg-slate-50 p-3.5 rounded-xl border border-slate-800 print:border-slate-200 space-y-1.5">
              <div className="text-slate-400 print:text-slate-500 font-semibold uppercase text-[10px]">
                ព័ត៌មានកម្មវិធី (Event Details)
              </div>
              <div className="font-bold text-slate-100 print:text-black text-sm">
                {project.title}
              </div>
              <div className="text-slate-300 print:text-slate-700">
                ប្រភេទ: <strong className="text-emerald-400 print:text-emerald-700">{project.eventType}</strong>
              </div>
              <div className="text-slate-300 print:text-slate-700">
                ថ្ងៃថត: {project.shootingDate} ({project.shootingTime})
              </div>
              <div className="text-slate-300 print:text-slate-700 truncate">
                ទីតាំង: {project.location || 'មិនទាន់បញ្ជាក់'}
              </div>
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="border border-slate-800 print:border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 print:bg-slate-100 text-slate-400 print:text-slate-600 border-b border-slate-800 print:border-slate-200">
                <tr>
                  <th className="p-3">ការពិពណ៌នាសេវាកម្ម</th>
                  <th className="p-3 text-right">តម្លៃ ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                <tr>
                  <td className="p-3">
                    <div className="font-bold text-slate-200 print:text-black">
                      កញ្ចប់សេវាថតរូប {project.eventType} - {project.title}
                    </div>
                    <div className="text-slate-400 print:text-slate-500 text-[11px] mt-0.5">
                      ថ្ងៃប្រគល់រូប: {project.deliveryDeadline || 'តាមការព្រមព្រៀង'}
                    </div>
                  </td>
                  <td className="p-3 text-right font-bold text-slate-200 print:text-black">
                    ${project.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div className="flex justify-end text-xs">
            <div className="w-64 space-y-2 bg-slate-900/60 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-200">
              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>តម្លៃសរុប (Total):</span>
                <span className="font-bold text-slate-200 print:text-black">${project.totalPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-400 print:text-emerald-700">
                <span>ប្រាក់កក់ទទួលបាន (Deposit):</span>
                <span className="font-bold">${project.deposit}</span>
              </div>
              <div className="flex justify-between text-amber-400 print:text-amber-700 pt-2 border-t border-slate-800 print:border-slate-300 font-bold text-sm">
                <span>ប្រាក់នៅខ្វះ (Balance Due):</span>
                <span>${remaining}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-[11px] text-slate-500 print:text-slate-600 pt-4 border-t border-slate-800 print:border-slate-200">
            សូមអរគុណដែលបានជឿទុកចិត្ត និងជ្រើសរើសសេវាកម្មថតរូបរបស់យើងខ្ញុំ!
          </div>
        </div>
      </div>
    </div>
  );
};
