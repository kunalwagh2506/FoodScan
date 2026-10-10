import React, { useState } from 'react';
import { User, X, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onLoginSuccess({ name, email });
    onClose();
  };

  const handleQuickLogin = (role: 'student' | 'auditor') => {
    if (role === 'student') {
      onLoginSuccess({
        name: 'Kunal Wagh',
        email: 'waghkunal343@gmail.com',
      });
    } else {
      onLoginSuccess({
        name: 'Dr. P. Sharma',
        email: 'auditor.quality@pccoe.edu.in',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">FoodScan AI Account</h3>
              <p className="text-xs text-slate-500">Required for formal defect complaint tracking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick preset buttons */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              One-Click Quick Login
            </span>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickLogin('student')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    Kunal Wagh (Student)
                  </div>
                  <div className="text-[11px] text-slate-500">waghkunal343@gmail.com · PCCOE Pune</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleQuickLogin('auditor')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    Dr. P. Sharma (Canteen Auditor)
                  </div>
                  <div className="text-[11px] text-slate-500">auditor.quality@pccoe.edu.in · Quality Cell</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-[11px] text-slate-400 uppercase font-bold">
              Or Enter Details
            </span>
          </div>

          {/* Custom form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Kunal Wagh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. user@pccoe.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all mt-2"
            >
              Sign In &amp; Continue
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
