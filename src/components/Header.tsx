import React from 'react';
import { 
  Scan, 
  Home, 
  History, 
  Bell, 
  User, 
  UtensilsCrossed,
  ShieldCheck,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FoodScanItem } from '../types/food';

interface HeaderProps {
  currentTab: 'home' | 'scan' | 'canteen' | 'history' | 'alerts';
  onSelectTab: (tab: 'home' | 'scan' | 'canteen' | 'history' | 'alerts') => void;
  onOpenScanModal: () => void;
  onSelectProductAndShowReport: (product: FoodScanItem) => void;
  user: { name: string; email: string } | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenComplaintsList: () => void;
  complaintCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenScanModal,
  onSelectProductAndShowReport,
  user,
  onOpenAuthModal,
  onLogout,
  onOpenComplaintsList,
  complaintCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 12 21a9.94 9.94 0 0 0 7.07-2.93A10.05 10.05 0 0 0 22 11c0-4.42-3.58-8-8-8a8 8 0 0 0-4.5 1.38C12 5.5 15.5 6.5 17 8z"/>
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                FoodScan <span className="text-emerald-600">AI</span>
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-wide">
                Scan • Analyze • Monitor
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'home'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={onOpenScanModal}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'scan'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Scan className="w-4 h-4 text-emerald-600" />
              <span>Scan & Check</span>
            </button>

            <button
              onClick={() => onSelectTab('canteen')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'canteen'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Canteen Menu</span>
            </button>

            <button
              onClick={() => onSelectTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'history'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>

            <button
              onClick={() => onSelectTab('alerts')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentTab === 'alerts'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>
          </nav>

          {/* Search Bar & User Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar with live autocomplete and Show Report button */}
            <SearchBar
              onSelectProductAndShowReport={onSelectProductAndShowReport}
              className="w-44 sm:w-64 lg:w-80"
              placeholder="Search product (e.g. Lay's, Poha, Maggi)..."
            />

            {/* User Profile / Complaints */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenComplaintsList}
                  title="My Defect Complaints"
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  {complaintCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {complaintCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2 pl-1 pr-2 py-1 bg-slate-100/80 rounded-full border border-slate-200/80">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold text-slate-700 max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <button
                    onClick={onLogout}
                    title="Log out"
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-colors shadow-xs"
                title="Account / Complaints"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
