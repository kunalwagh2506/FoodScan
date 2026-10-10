import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Trash2, 
  Download, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Scale
} from 'lucide-react';
import { FoodScanItem, FoodCategory } from '../types/food';

interface HistoryViewProps {
  historyItems: FoodScanItem[];
  onSelectScan: (item: FoodScanItem) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyItems,
  onSelectScan,
  onClearHistory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredItems = historyItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      item.scope === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const exportHistoryJson = () => {
    const blob = new Blob([JSON.stringify(historyItems, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodscan-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scan History</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse and review your locally recorded food scans, nutrition estimates, and quality reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {historyItems.length > 0 && (
            <>
              <button
                onClick={exportHistoryJson}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={onClearHistory}
                className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category & Scope Filters */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Scans' },
            { id: 'indian_meal', label: '🇮🇳 Indian Meals' },
            { id: 'global_packaged', label: '🌍 Global Packaged' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter past scans..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* List */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="text-base font-bold text-slate-700">No scans match your criteria</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Use the Scan &amp; Check feature or test the sample presets to populate your monitoring record.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectScan(item)}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-emerald-500/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{item.subtitle}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{item.lastScanned}</div>
                  </div>

                  {/* Score badge */}
                  <div className="text-right shrink-0">
                    <span className={`text-sm font-extrabold px-2 py-1 rounded-lg ${
                      item.overallScore >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.overallScore >= 60
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.overallScore}/100
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">{item.category}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
