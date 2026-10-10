import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { SAFETY_ALERTS } from '../data/alertsData';

export const AlertsView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Food Safety &amp; Quality Advisories</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Live monitoring updates from FSSAI FoSCoS portal, PCCOE Canteen Audit Committee, and Tech4Food surveillance.
        </p>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {SAFETY_ALERTS.map((alert) => {
          const isUrgent = alert.type === 'urgent';
          const isWarning = alert.type === 'warning';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all ${
                isUrgent
                  ? 'bg-rose-50/50 border-rose-200'
                  : isWarning
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {isUrgent ? (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  <span className="text-base font-bold text-slate-900">{alert.title}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {alert.source}
                  </span>
                  <span className="text-slate-400">{alert.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {alert.summary}
              </p>

              {alert.affectedProducts && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-bold text-slate-700">Affected Food Categories: </span>
                  {alert.affectedProducts.map((p, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div className="text-slate-700">
                  <span className="font-bold">Required Protocol: </span>
                  {alert.actionRequired}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
