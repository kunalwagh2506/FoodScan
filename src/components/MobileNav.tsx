import React from 'react';
import { Home, Scan, UtensilsCrossed, History, Bell } from 'lucide-react';

interface MobileNavProps {
  currentTab: 'home' | 'scan' | 'canteen' | 'history' | 'alerts';
  onSelectTab: (tab: 'home' | 'scan' | 'canteen' | 'history' | 'alerts') => void;
  onOpenScanModal: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenScanModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-colors ${
            currentTab === 'home' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onSelectTab('canteen')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-colors ${
            currentTab === 'canteen' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span>Canteen</span>
        </button>

        {/* Floating Scan Button */}
        <button
          onClick={onOpenScanModal}
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Scan className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-emerald-800 mt-0.5">Scan</span>
        </button>

        <button
          onClick={() => onSelectTab('history')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-colors ${
            currentTab === 'history' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <History className="w-5 h-5" />
          <span>History</span>
        </button>

        <button
          onClick={() => onSelectTab('alerts')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-colors ${
            currentTab === 'alerts' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span>Alerts</span>
        </button>
      </div>
    </div>
  );
};
