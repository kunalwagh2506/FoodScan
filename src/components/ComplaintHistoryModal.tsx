import React from 'react';
import { 
  ShieldCheck, 
  X, 
  Clock, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { DefectComplaint } from '../types/food';

interface ComplaintHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: DefectComplaint[];
}

export const ComplaintHistoryModal: React.FC<ComplaintHistoryModalProps> = ({
  isOpen,
  onClose,
  complaints,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">My Defect Complaints &amp; Tracking</h3>
              <p className="text-xs text-slate-500">Official food safety complaint ledger and case status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of complaints */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {complaints.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div className="text-sm font-bold text-slate-800">No active defect reports</div>
              <p className="text-xs text-slate-400">
                You have not filed any product defect complaints yet.
              </p>
            </div>
          ) : (
            complaints.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        {c.ticketId}
                      </span>
                      <span className="text-sm font-bold text-slate-900">{c.productName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Dispatched to: <span className="font-semibold text-slate-700">{c.recipientName}</span>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 shrink-0">
                    {c.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-700">Issue Reported: </span>
                  {c.description}
                </div>

                {/* Timeline */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Investigation Log
                  </div>
                  <div className="space-y-1.5">
                    {c.timeline?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700">{step.status}</span>
                          <span className="text-slate-400"> ({step.date}): </span>
                          <span className="text-slate-600">{step.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
