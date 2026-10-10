import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Scale, 
  Clock, 
  FileText,
  UtensilsCrossed,
  Package
} from 'lucide-react';
import { FoodScanItem } from '../types/food';
import { MOCK_FOODS, getOrGenerateFoodItem } from '../data/mockFoods';

interface SearchBarProps {
  onSelectProductAndShowReport: (product: FoodScanItem) => void;
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectProductAndShowReport,
  className = '',
  placeholder = "Search product (e.g. Lay's, Poha, Thali)...",
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allFoods = Object.values(MOCK_FOODS);

  // Filter matches
  const trimmed = query.trim().toLowerCase();
  const matchedFoods = trimmed
    ? allFoods.filter((item) => {
        return (
          item.name.toLowerCase().includes(trimmed) ||
          item.subtitle?.toLowerCase().includes(trimmed) ||
          item.brand?.toLowerCase().includes(trimmed) ||
          item.category?.toLowerCase().includes(trimmed) ||
          item.mainItems?.toLowerCase().includes(trimmed) ||
          item.tags?.some((t) => t.toLowerCase().includes(trimmed))
        );
      })
    : [];

  const handleSelect = (item: FoodScanItem) => {
    onSelectProductAndShowReport(item);
    setIsOpen(false);
    setQuery('');
  };

  const handleGenerateAndShowReport = (customQuery: string) => {
    const generated = getOrGenerateFoodItem(customQuery);
    onSelectProductAndShowReport(generated);
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (matchedFoods.length > 0) {
        handleSelect(matchedFoods[0]);
      } else if (trimmed) {
        handleGenerateAndShowReport(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Score badge helper
  const getScoreBadge = (score: number) => {
    if (score >= 90) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: `${score}/100 Excellent` };
    if (score >= 70) return { bg: 'bg-sky-50 text-sky-700 border-sky-200', text: `${score}/100 Good` };
    if (score >= 50) return { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: `${score}/100 Moderate` };
    return { bg: 'bg-rose-50 text-rose-700 border-rose-200', text: `${score}/100 Alert` };
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Results Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 text-left transition-all max-h-[80vh] sm:max-h-120 flex flex-col">
          {/* Header Row */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>
              {trimmed ? `Search Results (${matchedFoods.length})` : 'Popular Food Products'}
            </span>
            <span className="text-[10px] lowercase font-normal text-slate-400">
              press enter to show report
            </span>
          </div>

          <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
            {/* If Query has matches */}
            {matchedFoods.length > 0 && (
              <div>
                {matchedFoods.map((item) => {
                  const scoreBadge = getScoreBadge(item.overallScore);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70 shrink-0 relative shadow-2xs">
                          {item.primaryImage ? (
                            <img
                              src={item.primaryImage}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        {/* Text Details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-xs shrink-0">{item.countryFlag}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-slate-500 truncate">
                              {item.subtitle || item.category}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${scoreBadge.bg}`}>
                              {scoreBadge.text}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Prominent Action Button: Show Report */}
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(item);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 group-hover:bg-emerald-600"
                        >
                          <span>Show Report</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Custom AI Query Option if user typed a custom query */}
            {trimmed && (
              <div className="p-3.5 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-emerald-950 truncate">
                      AI Food Analysis for &ldquo;{query}&rdquo;
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      Calculate nutrition, ingredients &amp; safety report
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleGenerateAndShowReport(query)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 transition-transform active:scale-95"
                >
                  <span>Show Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* If Query has NO matches and no custom query was clicked */}
            {trimmed && matchedFoods.length === 0 && (
              <div className="p-6 text-center text-slate-500">
                <p className="text-sm font-semibold text-slate-700">No exact match for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-1">
                  Click &ldquo;Show Report&rdquo; above to run instant AI nutritional analysis.
                </p>
              </div>
            )}

            {/* Default Quick Picks when query is empty */}
            {!trimmed && (
              <div className="divide-y divide-slate-100">
                {allFoods.slice(0, 6).map((item) => {
                  const scoreBadge = getScoreBadge(item.overallScore);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="p-3 sm:p-3.5 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70 shrink-0 relative shadow-2xs">
                          {item.primaryImage ? (
                            <img
                              src={item.primaryImage}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                              <Package className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-xs shrink-0">{item.countryFlag}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-500 truncate">
                              {item.subtitle || item.category}
                            </span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${scoreBadge.bg}`}>
                              {item.overallScore}/100
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(item);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 shrink-0"
                      >
                        <span>Show Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
