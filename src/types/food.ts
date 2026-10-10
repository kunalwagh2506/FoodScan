export type FoodCategory = 
  | 'Cooked Canteen Meal' 
  | 'Packaged Snack' 
  | 'Fresh Produce' 
  | 'Dairy Product' 
  | 'Beverage' 
  | 'Grain & Pulse';

export type FoodScope = 'indian_meal' | 'global_packaged';

export interface NutrientItem {
  name: string;
  amount: number;
  unit: string;
  dvPercent: number; // Daily Value % based on 2000 kcal ICMR/WHO guidelines
  iconType: 'flame' | 'wheat' | 'sugar' | 'droplet' | 'protein' | 'leaf' | 'salt';
  statusColor?: 'emerald' | 'amber' | 'rose' | 'blue';
}

export interface VitaminMineralItem {
  code: string; // 'A', 'B1', 'B3', 'B6', 'B9', 'C', 'D', 'E', 'K', 'Ca', 'Fe', 'Mg'
  name: string;
  amount: string;
  dvPercent: number;
  colorClass: string; // styling for badge
}

export interface QualityMetric {
  title: string;
  status: 'Excellent' | 'Good' | 'Fresh' | 'Recent' | 'Valid' | 'Not detected' | 'Attention' | 'Inspection required' | 'Clear';
  subtitle: string;
  type: 'freshness' | 'appearance' | 'preparation' | 'contaminants' | 'packaging' | 'readability' | 'expiry';
  level: 'positive' | 'warning' | 'danger';
}

export interface HealthImpactItem {
  title: string;
  description: string;
  type: 'positive' | 'moderate' | 'high';
  tag: string; // e.g. "Positive", "Moderate Concern", "High Concern"
}

export interface IngredientItem {
  name: string;
  detail?: string;
  icon?: string; // photo/icon path or placeholder
  imageUrl?: string;
}

export interface RegulatoryInfo {
  name: string;
  badge: string;
  countryCode: string;
  flag: string;
  portalUrl?: string;
  verified: boolean;
  notes?: string;
}

export interface DataConfidenceInfo {
  score: number; // 0 - 100
  label: string; // e.g. "Verified Label Data" or "Estimated Recipe Composition"
  isEstimated: boolean;
  databaseSource: string; // e.g. "ICMR-NIN Indian Food Composition Tables (2017)" or "Open Food Facts & Brand Packaging OCR"
  notes: string;
}

export interface FoodScanItem {
  id: string;
  name: string;
  subtitle: string;
  category: FoodCategory;
  scope: FoodScope; // 'indian_meal' (India only) or 'global_packaged' (Worldwide)
  countryOfOrigin: string; // e.g. 'India', 'United States', 'Japan', 'South Korea'
  countryFlag: string; // '🇮🇳', '🇺🇸', '🇯🇵', '🇰🇷', '🇬🇧', '🇨🇭'
  verified: boolean;
  tags: string[]; // ['Cooked Meal', 'Vegetarian', 'Balanced'] or ['Packaged Snack', 'FSSAI Licensed']
  primaryImage: string;
  thumbnails: string[];
  
  // Left meta table
  mealType?: string; // Lunch, Breakfast, Dinner, Snack
  mainItems?: string;
  brand?: string;
  manufacturer?: string;
  fssaiLicenceNo?: string;
  barcode?: string;
  netWeight?: string;
  estimatedWeight?: string;
  categoryDetail?: string;
  servingSize: string; // '1 plate' or '30 g' or '1 unit'
  preparationTime?: string;
  cookingMethod?: string;
  storageCondition?: string;
  lastScanned: string;
  officialLink?: string;
  officialLinkText?: string;

  // Regulatory body & Data confidence
  regulatoryBody?: RegulatoryInfo;
  dataConfidence: DataConfidenceInfo;

  // Middle column - Scoring
  overallScore: number; // 0 - 100
  scoreLabel: string; // "Excellent", "Healthy", "Good", "Attention Needed"
  scoreDescription: string;
  checklist: {
    nutrition: boolean;
    ingredients: boolean;
    qualityCheck: boolean;
    freshlyPrepared?: boolean;
    fssaiLicence?: boolean;
    healthImpact: boolean;
  };

  // Nutrition toggle data
  nutritionPerServing: NutrientItem[];
  nutritionPer100g: NutrientItem[];
  servingLabel: string; // 'Per Plate' or 'Per Serving (30 g)'
  servingSubtext: string; // 'For 1 plate (approx. 450 g)' or 'Per 100 g (approx.)'

  // Quality analysis
  qualityMetrics: QualityMetric[];

  // Health impacts
  healthImpacts: HealthImpactItem[];

  // Right column
  quickVerdict: {
    title: string;
    description: string;
    type: 'positive' | 'warning' | 'danger';
  };
  vitaminsAndMinerals: VitaminMineralItem[];
  ingredientsList: IngredientItem[];
  allergenWarning?: string;
  rawIngredientsText?: string;
  
  // Recommended consumption
  recommendedPortion: {
    size: string;
    detail: string;
  };
  recommendedFrequency: {
    frequency: string;
    detail: string;
    caution?: boolean;
  };
  
  // OCR & Verification fields
  verifiedViaOCR?: boolean;
  nutritionLabelPhoto?: string;
  ocrExtractedText?: string;
  requiresNutritionLabelPhoto?: boolean;

  // Limitations note
  notes?: string;
}

export interface DefectComplaint {
  id: string;
  ticketId: string;
  productId: string;
  productName: string;
  brandOrProvider: string;
  category: FoodCategory;
  countryOfOrigin?: string;
  countryFlag?: string;
  defectType: 'damaged_packaging' | 'visible_spoilage' | 'expired_date' | 'foreign_object' | 'mismatch' | 'other_defect';
  defectTitle: string;
  description: string;
  batchNumber?: string;
  mfgDate?: string;
  expiryDate?: string;
  recipientType: 
    | 'canteen_manager' 
    | 'fssai_authority' 
    | 'fda_authority' 
    | 'fsa_authority' 
    | 'mfds_authority' 
    | 'caa_authority' 
    | 'manufacturer';
  recipientName: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  evidenceImageUrl?: string;
  createdAt: string;
  status: 'Submitted' | 'Under Investigation' | 'Inspector Assigned' | 'Resolved' | 'Closed';
  timeline: {
    date: string;
    status: string;
    note: string;
  }[];
}

export interface CanteenMenuItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  price: number;
  available: boolean;
  description: string;
  ingredients: string[];
  prepTime: string;
  storageTemp: string;
  inspectionPassed: boolean;
  inspectorName: string;
  calories: number;
  protein: number;
  isVegetarian: boolean;
}

export interface SafetyAlert {
  id: string;
  title: string;
  type: 'urgent' | 'warning' | 'info';
  source: 'FSSAI FoSCoS' | 'PCCOE Canteen Committee' | 'WHO Guidelines' | 'National Recall';
  date: string;
  summary: string;
  affectedProducts?: string[];
  actionRequired: string;
}
