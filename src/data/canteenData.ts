import { CanteenMenuItem } from '../types/food';

export interface StorageLog {
  id: string;
  item: string;
  timestamp: string;
  temperature: string;
  standardTemp: string;
  status: 'Normal' | 'Warning' | 'Critical';
  loggedBy: string;
  notes: string;
}

export interface InspectionRecord {
  id: string;
  date: string;
  area: string;
  rating: number; // out of 100
  inspector: string;
  status: 'Passed' | 'Action Required' | 'Scheduled';
  hygieneChecks: {
    kitchenCleanliness: boolean;
    oilQualityTpm: string; // Total Polar Materials e.g. < 15%
    waterTesting: boolean;
    storageTempCompliant: boolean;
    workerGearCompliant: boolean;
  };
  notes: string;
}

export const CANTEEN_MENU_ITEMS: CanteenMenuItem[] = [
  {
    id: 'thali-lunch-today',
    name: "Today's Special Vegetarian Thali",
    category: 'Lunch',
    price: 90,
    available: true,
    description: 'Basmati rice, toor dal tadka, 2 soft wheat rotis, seasonal mixed veg sabzi, curd, and fresh kachumber salad.',
    ingredients: ['Basmati Rice', 'Toor Dal', 'Whole Wheat Flour', 'Cauliflower & Green Peas', 'Fresh Curd', 'Cucumber', 'Tomato', 'Mustard Seeds', 'Coriander'],
    prepTime: 'Today, 11:15 AM',
    storageTemp: '68°C (Hot Holding)',
    inspectionPassed: true,
    inspectorName: 'Dr. P. Sharma (PCCOE Food Quality Officer)',
    calories: 610,
    protein: 24.5,
    isVegetarian: true,
  },
  {
    id: 'dal-rice-combo',
    name: 'Jeera Rice & Yellow Dal Tadka',
    category: 'Lunch',
    price: 60,
    available: true,
    description: 'Fragrant cumin-tempered rice served with rich protein-packed yellow lentil curry.',
    ingredients: ['Rice', 'Moong/Toor Dal', 'Cumin Seeds', 'Ghee', 'Turmeric', 'Green Chilli'],
    prepTime: 'Today, 11:30 AM',
    storageTemp: '70°C (Hot Holding)',
    inspectionPassed: true,
    inspectorName: 'Dr. P. Sharma',
    calories: 420,
    protein: 14.0,
    isVegetarian: true,
  },
  {
    id: 'poha-breakfast',
    name: 'Maharashtrian Kanda Poha',
    category: 'Breakfast',
    price: 35,
    available: true,
    description: 'Flattened rice cooked with golden onions, roasted peanuts, curry leaves, and lemon wedge.',
    ingredients: ['Flattened Rice (Poha)', 'Onion', 'Peanuts', 'Curry Leaves', 'Mustard', 'Lemon', 'Turmeric'],
    prepTime: 'Today, 7:45 AM',
    storageTemp: 'Room Temp / Freshly served',
    inspectionPassed: true,
    inspectorName: 'Dr. P. Sharma',
    calories: 280,
    protein: 6.2,
    isVegetarian: true,
  },
  {
    id: 'idli-sambar',
    name: 'Steamed Idli with Drumstick Sambar',
    category: 'Breakfast',
    price: 45,
    available: true,
    description: 'Fermented rice & urad dal steamed cakes with fresh coconut chutney and vegetable sambar.',
    ingredients: ['Rice & Urad Dal Batter', 'Toor Dal', 'Drumsticks', 'Fresh Coconut', 'Curry Leaves'],
    prepTime: 'Today, 8:00 AM',
    storageTemp: 'Steamed fresh on order',
    inspectionPassed: true,
    inspectorName: 'Dr. P. Sharma',
    calories: 310,
    protein: 9.8,
    isVegetarian: true,
  },
  {
    id: 'misal-pav',
    name: 'Kolhapuri Misal Pav',
    category: 'Snacks',
    price: 55,
    available: true,
    description: 'Sprouted moth bean spicy curry topped with farsan, chopped onion, and served with pav.',
    ingredients: ['Sprouted Matki Beans', 'Farsan', 'Onion', 'Pav (Bakery)', 'Garam Masala'],
    prepTime: 'Today, 10:30 AM',
    storageTemp: 'Hot Curry Vat 72°C',
    inspectionPassed: true,
    inspectorName: 'Dr. P. Sharma',
    calories: 490,
    protein: 16.2,
    isVegetarian: true,
  },
];

export const CANTEEN_STORAGE_LOGS: StorageLog[] = [
  {
    id: 'log-01',
    item: 'Hot Holding Bain-Marie (Thali Sabzi & Dal)',
    timestamp: '10 Oct 2026, 12:00 PM',
    temperature: '68.5°C',
    standardTemp: '≥ 63.0°C (FSSAI Warm Hold)',
    status: 'Normal',
    loggedBy: 'K. Patel (Head Chef)',
    notes: 'Optimal hot holding maintained without bacterial danger zone risk.',
  },
  {
    id: 'log-02',
    item: 'Walk-in Dairy Refrigerator (Curd & Milk)',
    timestamp: '10 Oct 2026, 11:30 AM',
    temperature: '3.8°C',
    standardTemp: '< 5.0°C (Cold Storage)',
    status: 'Normal',
    loggedBy: 'S. Kulkarni (Store Supervisor)',
    notes: 'Curd batches inspected; batch expiry date checked.',
  },
  {
    id: 'log-03',
    item: 'Cooking Oil Fryer (Frying Oil TPM)',
    timestamp: '10 Oct 2026, 10:15 AM',
    temperature: '172°C',
    standardTemp: 'TPM < 25% (FSSAI Rule)',
    status: 'Normal',
    loggedBy: 'K. Patel (Head Chef)',
    notes: 'Testo 270 probe measurement: TPM at 13.5%. Fresh oil blend.',
  },
];

export const CANTEEN_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'insp-2026-10-10',
    date: '10 Oct 2026',
    area: 'Central Kitchen & Serving Counters',
    rating: 98,
    inspector: 'Dr. P. Sharma, Food Safety Auditor',
    status: 'Passed',
    hygieneChecks: {
      kitchenCleanliness: true,
      oilQualityTpm: '13.5% (Safe, Max 25%)',
      waterTesting: true,
      storageTempCompliant: true,
      workerGearCompliant: true,
    },
    notes: 'All hygiene and food preservation standards satisfied. Prep timestamps strictly logged.',
  },
  {
    id: 'insp-2026-10-03',
    date: '03 Oct 2026',
    area: 'Raw Vegetable & Dry Grain Storage',
    rating: 95,
    inspector: 'Audit Committee PCCOE',
    status: 'Passed',
    hygieneChecks: {
      kitchenCleanliness: true,
      oilQualityTpm: '14.2% (Safe)',
      waterTesting: true,
      storageTempCompliant: true,
      workerGearCompliant: true,
    },
    notes: 'Dry storage pallet clearance verified. Zero pest activity.',
  },
];
