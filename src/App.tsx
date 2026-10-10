import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FoodReportView } from './components/FoodReportView';
import { ScanModal } from './components/ScanModal';
import { CanteenDashboard } from './components/CanteenDashboard';
import { HistoryView } from './components/HistoryView';
import { AlertsView } from './components/AlertsView';
import { ComplaintModal } from './components/ComplaintModal';
import { ComplaintHistoryModal } from './components/ComplaintHistoryModal';
import { AuthModal } from './components/AuthModal';
import { MobileNav } from './components/MobileNav';
import { FoodScanItem, DefectComplaint, CanteenMenuItem } from './types/food';
import { MOCK_FOODS } from './data/mockFoods';
import { 
  Scan, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function App() {
  // Current active food scan item (Defaults to Lay's Classic Potato Chips)
  const [currentFood, setCurrentFood] = useState<FoodScanItem>(MOCK_FOODS['lays-classic']);
  const [currentTab, setCurrentTab] = useState<'home' | 'scan' | 'canteen' | 'history' | 'alerts'>('home');

  // Authentication state
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Kunal Wagh',
    email: 'waghkunal343@gmail.com',
  });

  // Complaints list
  const [complaints, setComplaints] = useState<DefectComplaint[]>(() => {
    const saved = localStorage.getItem('foodscan_complaints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // History list (Defaults to Lay's Classic, not all demo items)
  const [historyItems, setHistoryItems] = useState<FoodScanItem[]>(() => {
    const saved = localStorage.getItem('foodscan_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [MOCK_FOODS['lays-classic']];
  });

  // Modals
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isComplaintHistoryOpen, setIsComplaintHistoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('foodscan_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('foodscan_history', JSON.stringify(historyItems));
  }, [historyItems]);

  // Handle product selected from Search with "Show Report"
  const handleSelectProductAndShowReport = (product: FoodScanItem) => {
    setCurrentFood(product);
    setCurrentTab('home');

    // Add to recent history if not duplicate id
    setHistoryItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered];
    });
  };

  // Handle successful scan
  const handleScanComplete = (item: FoodScanItem) => {
    setCurrentFood(item);
    setCurrentTab('home');

    // Add to history if not duplicate id
    setHistoryItems((prev) => {
      const filtered = prev.filter((p) => p.id !== item.id);
      return [item, ...filtered];
    });
  };

  // Handle complaint submission
  const handleComplaintSubmitted = (newComplaint: DefectComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  // Canteen item selection to view report
  const handleSelectCanteenItemForReport = (menuItem: CanteenMenuItem) => {
    if (menuItem.id === 'thali-lunch-today') {
      setCurrentFood(MOCK_FOODS['canteen-thali-100']);
    } else {
      // Build a dynamic food scan item for this canteen meal
      const dynamicMeal: FoodScanItem = {
        ...MOCK_FOODS['canteen-thali-100'],
        id: `canteen-${menuItem.id}`,
        name: menuItem.name,
        subtitle: `College Canteen • ${menuItem.category}`,
        mealType: menuItem.category,
        overallScore: 92,
        scoreLabel: 'Excellent',
        scoreDescription: 'Freshly cooked meal prepared under FSSAI canteen standards.',
        mainItems: menuItem.ingredients.slice(0, 4).join(', '),
        nutritionPerServing: [
          { name: 'Energy (Calories)', amount: menuItem.calories, unit: 'kcal', dvPercent: Math.round((menuItem.calories / 2000) * 100), iconType: 'flame', statusColor: 'emerald' },
          { name: 'Protein', amount: menuItem.protein, unit: 'g', dvPercent: Math.round((menuItem.protein / 50) * 100), iconType: 'protein', statusColor: 'emerald' },
          { name: 'Carbohydrates', amount: 62.0, unit: 'g', dvPercent: 24, iconType: 'wheat', statusColor: 'emerald' },
          { name: 'Total Fat', amount: 11.0, unit: 'g', dvPercent: 16, iconType: 'droplet', statusColor: 'emerald' },
          { name: 'Dietary Fibre', amount: 7.5, unit: 'g', dvPercent: 30, iconType: 'leaf', statusColor: 'emerald' },
          { name: 'Sodium (estimated)', amount: 540, unit: 'mg', dvPercent: 22, iconType: 'salt', statusColor: 'emerald' },
        ],
        ingredientsList: menuItem.ingredients.map((ing) => ({ name: ing })),
        lastScanned: 'Today, 12:10 PM',
      };
      setCurrentFood(dynamicMeal);
    }
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-16 md:pb-6">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onSelectProductAndShowReport={handleSelectProductAndShowReport}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => setUser(null)}
        onOpenComplaintsList={() => setIsComplaintHistoryOpen(true)}
        complaintCount={complaints.length}
      />

      {/* Product Status Ribbon (No demo clutter, clean single-product presentation) */}
      <div className="bg-slate-900 text-white px-4 py-2.5 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold tracking-wider uppercase text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
              {currentFood.scope === 'indian_meal' ? '🇮🇳 Indian Cooked Meal' : '🌍 Global Packaged Snack'}
            </span>
            <span className="text-slate-300 font-medium text-[11px] sm:text-xs">
              Viewing Report for <strong className="text-white">{currentFood.name}</strong> · {currentFood.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors text-xs shadow-xs cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Scan / Upload Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <FoodReportView
            item={currentFood}
            onOpenCanteenMenu={() => setCurrentTab('canteen')}
            onOpenDefectReport={() => setIsComplaintModalOpen(true)}
            onSelectPhotoAdd={() => setIsScanModalOpen(true)}
            onUpdateItem={(updated) => setCurrentFood(updated)}
          />
        )}

        {currentTab === 'canteen' && (
          <CanteenDashboard
            onSelectMenuItemForScan={handleSelectCanteenItemForReport}
          />
        )}

        {currentTab === 'history' && (
          <HistoryView
            historyItems={historyItems}
            onSelectScan={(item) => {
              setCurrentFood(item);
              setCurrentTab('home');
            }}
            onClearHistory={() => setHistoryItems([])}
          />
        )}

        {currentTab === 'alerts' && <AlertsView />}
      </main>

      {/* Modals */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
        initialScope={currentFood.scope}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        product={currentFood}
        user={user}
        onRequireLogin={() => {
          setIsComplaintModalOpen(false);
          setIsAuthModalOpen(true);
        }}
        onComplaintSubmitted={handleComplaintSubmitted}
      />

      <ComplaintHistoryModal
        isOpen={isComplaintHistoryOpen}
        onClose={() => setIsComplaintHistoryOpen(false)}
        complaints={complaints}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenScanModal={() => setIsScanModalOpen(true)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">FoodScan AI</span>
            <span>·</span>
            <span>Tech4Food PCCOE Pune Competition</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Theme: MONITOR</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Grounded in ICMR-NIN Indian Food Composition Tables (2017), WHO Health Guidelines &amp; FSSAI Standards.
          </div>
        </div>
      </footer>

    </div>
  );
}
