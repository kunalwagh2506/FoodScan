import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Thermometer, 
  ShieldCheck, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Droplet, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { CANTEEN_MENU_ITEMS, CANTEEN_STORAGE_LOGS, CANTEEN_INSPECTIONS } from '../data/canteenData';
import { CanteenMenuItem } from '../types/food';

interface CanteenDashboardProps {
  onSelectMenuItemForScan: (menuItem: CanteenMenuItem) => void;
}

export const CanteenDashboard: React.FC<CanteenDashboardProps> = ({
  onSelectMenuItemForScan,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'storage' | 'inspections'>('menu');
  const [menuItems, setMenuItems] = useState(CANTEEN_MENU_ITEMS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'>('Lunch');
  const [newItemPrice, setNewItemPrice] = useState(60);
  const [newItemCalories, setNewItemCalories] = useState(450);
  const [newItemProtein, setNewItemProtein] = useState(15);
  const [newItemIngredients, setNewItemIngredients] = useState('');

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const newItem: CanteenMenuItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      price: newItemPrice,
      available: true,
      description: 'Freshly prepared meal verified by Canteen Quality Committee.',
      ingredients: newItemIngredients.split(',').map((s) => s.trim()).filter(Boolean),
      prepTime: 'Today, 11:45 AM',
      storageTemp: '65°C (Warm Hold)',
      inspectionPassed: true,
      inspectorName: 'Dr. P. Sharma',
      calories: newItemCalories,
      protein: newItemProtein,
      isVegetarian: true,
    };

    setMenuItems([newItem, ...menuItems]);
    setShowAddModal(false);
    setNewItemName('');
    setNewItemIngredients('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-100 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            PCCOE Pune College Canteen • FSSAI Lic: 11517036000214
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Canteen Menu &amp; Safety Monitoring Portal
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
            Maintained in accordance with Tech4Food standards. Track daily recipes, ingredient portioning, thermal storage logs, and official hygiene inspection records.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Daily Menu Item</span>
            </button>
            <div className="text-xs text-emerald-200">
              Kitchen Inspection Status: <span className="text-white font-bold">Passed (98/100)</span>
            </div>
          </div>
        </div>

        {/* Decorative circle graphic */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-600/20 blur-2xl pointer-events-none"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 py-3 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'menu'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Daily Menu &amp; Recipes ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('storage')}
          className={`flex items-center gap-2 py-3 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'storage'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>Temperature &amp; Storage Logs</span>
        </button>

        <button
          onClick={() => setActiveTab('inspections')}
          className={`flex items-center gap-2 py-3 px-1 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'inspections'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Inspection &amp; Hygiene Audits</span>
        </button>
      </div>

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                    {item.category}
                  </span>
                  <span className="text-base font-extrabold text-slate-900 tabular-nums">
                    ₹{item.price}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Nutrition pills */}
                <div className="flex items-center gap-3 mt-4 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1 text-amber-600">
                    <Flame className="w-3.5 h-3.5" />
                    {item.calories} kcal
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="font-bold">P</span> {item.protein}g protein
                  </span>
                </div>

                {/* Ingredients list */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Storage & Prep */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.prepTime}
                  </span>
                  <span className="font-medium text-emerald-600">
                    {item.storageTemp}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectMenuItemForScan(item)}
                className="mt-5 w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Complete AI Quality Report</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Storage Tab */}
      {activeTab === 'storage' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Temperature &amp; Storage Conditions</h3>
              <p className="text-xs text-slate-500">Automated probe telemetry cross-referenced against FSSAI food holding safety guidelines</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {CANTEEN_STORAGE_LOGS.map((log) => (
              <div key={log.id} className="p-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-900">{log.item}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {log.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{log.notes}</p>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Logged by {log.loggedBy} · {log.timestamp}
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                    {log.temperature}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Standard: {log.standardTemp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspections Tab */}
      {activeTab === 'inspections' && (
        <div className="space-y-4">
          {CANTEEN_INSPECTIONS.map((insp) => (
            <div key={insp.id} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{insp.area}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {insp.status} ({insp.rating}/100)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Audited on {insp.date} by {insp.inspector}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-slate-500">Kitchen Cleanliness</div>
                  <div className="font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-slate-500">Cooking Oil (TPM)</div>
                  <div className="font-bold text-slate-900 mt-1">
                    {insp.hygieneChecks.oilQualityTpm}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-slate-500">RO Drinking Water</div>
                  <div className="font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Zero Coliform
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-slate-500">Thermal Holding</div>
                  <div className="font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50">
                  <div className="text-slate-500">Staff Protective Gear</div>
                  <div className="font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gloves &amp; Aprons
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-900">Auditor Notes: </span>
                {insp.notes}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Daily Canteen Menu Item</h3>
            <form onSubmit={handleAddNewItem} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matar Paneer with Jeera Rice"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meal Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e: any) => setNewItemCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Calories (kcal)</label>
                  <input
                    type="number"
                    value={newItemCalories}
                    onChange={(e) => setNewItemCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={newItemProtein}
                    onChange={(e) => setNewItemProtein(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Paneer, Green Peas, Tomatoes, Garam Masala"
                  value={newItemIngredients}
                  onChange={(e) => setNewItemIngredients(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  Save Menu Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
