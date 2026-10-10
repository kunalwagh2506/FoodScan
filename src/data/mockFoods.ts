import { FoodScanItem } from '../types/food';

// High-quality resilient food photography
export const FOOD_THALI_IMAGE = `https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80`;
export const FOOD_RICE_THUMB = `https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80`;
export const FOOD_DAL_THUMB = `https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80`;
export const FOOD_ROTI_THUMB = `https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80`;
export const FOOD_POHA_IMAGE = `https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80`;
export const FOOD_IDLI_IMAGE = `https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80`;
export const FOOD_CHIPS_IMAGE = `https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80`;
export const FOOD_OREO_IMAGE = `https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80`;
export const FOOD_RAMEN_IMAGE = `https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80`;
export const FOOD_POCKY_IMAGE = `https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80`;
export const FOOD_NUTELLA_IMAGE = `https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80`;
export const FOOD_APPLE_IMAGE = `https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80`;
export const FOOD_DEFECT_BREAD = `https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80`;

export const MOCK_FOODS: Record<string, FoodScanItem> = {
  // =========================================================================
  // SCOPE 1: 🇮🇳 INDIAN COOKED MEALS (India Only · ICMR-NIN Composition Data)
  // =========================================================================
  'canteen-thali-100': {
    id: 'canteen-thali-100',
    name: "Today's Canteen Thali",
    subtitle: "College Canteen • Vegetarian",
    category: 'Cooked Canteen Meal',
    scope: 'indian_meal',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Cooked Meal', 'Vegetarian', 'Balanced', 'ICMR-NIN Database'],
    primaryImage: FOOD_THALI_IMAGE,
    thumbnails: [FOOD_THALI_IMAGE, FOOD_RICE_THUMB, FOOD_DAL_THUMB],
    mealType: 'Lunch',
    mainItems: 'Rice, Dal, Roti, Mixed Vegetable, Curd, Salad',
    estimatedWeight: '~ 450 g',
    categoryDetail: 'Complete Indian Thali',
    servingSize: '1 plate',
    preparationTime: '10 Oct 2026, 11:30 AM',
    cookingMethod: 'Boiled / Steamed / Stir-fried',
    storageCondition: 'Consumed Fresh',
    lastScanned: '10 Oct 2026, 12:05 PM',
    officialLink: '#canteen-menu',
    officialLinkText: 'View Canteen Menu Details',

    regulatoryBody: {
      name: 'PCCOE Canteen Food Safety Committee & FSSAI',
      badge: 'FSSAI Lic. 11517036000214',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
      notes: 'Monitored daily via campus kitchen hygiene audits and thermal holding logs.',
    },
    dataConfidence: {
      score: 88,
      label: 'Estimated Recipe Composition',
      isEstimated: true,
      databaseSource: 'ICMR–NIN Indian Food Composition Tables (IFCT 2017)',
      notes: 'Nutrient calculation based on confirmed canteen batch ingredients and standard serving portions.',
    },

    overallScore: 100,
    scoreLabel: 'Excellent',
    scoreDescription: 'A complete, balanced and healthy meal.',
    checklist: {
      nutrition: true,
      ingredients: true,
      qualityCheck: true,
      freshlyPrepared: true,
      healthImpact: true,
    },

    servingLabel: 'Per Plate',
    servingSubtext: 'For 1 plate (approx. 450 g)',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 610, unit: 'kcal', dvPercent: 31, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 90.0, unit: 'g', dvPercent: 35, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 6.2, unit: 'g', dvPercent: 6, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 17.0, unit: 'g', dvPercent: 24, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Saturated Fat', amount: 4.1, unit: 'g', dvPercent: 20, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 24.5, unit: 'g', dvPercent: 49, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 11.2, unit: 'g', dvPercent: 45, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: 680, unit: 'mg', dvPercent: 28, iconType: 'salt', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 135.5, unit: 'kcal', dvPercent: 7, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 20.0, unit: 'g', dvPercent: 8, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 1.38, unit: 'g', dvPercent: 1.5, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 3.77, unit: 'g', dvPercent: 5.3, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Saturated Fat', amount: 0.91, unit: 'g', dvPercent: 4.4, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 5.44, unit: 'g', dvPercent: 10.9, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 2.49, unit: 'g', dvPercent: 10, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: 151, unit: 'mg', dvPercent: 6.2, iconType: 'salt', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Food Freshness', status: 'Excellent', subtitle: 'Looks fresh and appetizing', type: 'freshness', level: 'positive' },
      { title: 'Appearance', status: 'Excellent', subtitle: 'Normal color and texture', type: 'appearance', level: 'positive' },
      { title: 'Preparation Time', status: 'Fresh', subtitle: 'Prepared today morning', type: 'preparation', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'No visible spoilage', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Rich in Protein', description: 'Supports muscle repair and overall health.', type: 'positive', tag: 'Positive' },
      { title: 'Good Fibre Content', description: 'Supports digestion and gut health.', type: 'positive', tag: 'Positive' },
      { title: 'Balanced Carbohydrates', description: 'Provides sustained energy.', type: 'positive', tag: 'Positive' },
      { title: 'Low Saturated Fat', description: 'Supports heart health.', type: 'positive', tag: 'Positive' },
      { title: 'Contains Essential Vitamins & Minerals', description: 'Supports immunity and overall well-being.', type: 'positive', tag: 'Positive' },
    ],

    quickVerdict: {
      title: 'Perfect 100/100 Meal!',
      description: 'Nutritious, balanced, freshly prepared and safe for regular consumption.',
      type: 'positive',
    },

    vitaminsAndMinerals: [
      { code: 'A', name: 'Vitamin A', amount: '620 µg', dvPercent: 69, colorClass: 'bg-amber-500' },
      { code: 'B1', name: 'Vitamin B1 (Thiamine)', amount: '0.8 mg', dvPercent: 73, colorClass: 'bg-emerald-500' },
      { code: 'B3', name: 'Vitamin B3 (Niacin)', amount: '8.2 mg', dvPercent: 51, colorClass: 'bg-sky-500' },
      { code: 'B6', name: 'Vitamin B6', amount: '0.9 mg', dvPercent: 69, colorClass: 'bg-orange-500' },
      { code: 'B9', name: 'Folate (B9)', amount: '180 µg', dvPercent: 45, colorClass: 'bg-rose-500' },
      { code: 'C', name: 'Vitamin C', amount: '42 mg', dvPercent: 47, colorClass: 'bg-purple-500' },
      { code: 'D', name: 'Vitamin D', amount: '3.1 µg', dvPercent: 62, colorClass: 'bg-amber-500' },
      { code: 'E', name: 'Vitamin E', amount: '4.8 mg', dvPercent: 32, colorClass: 'bg-indigo-500' },
      { code: 'K', name: 'Vitamin K', amount: '95 µg', dvPercent: 79, colorClass: 'bg-emerald-600' },
      { code: 'Ca', name: 'Calcium', amount: '320 mg', dvPercent: 32, colorClass: 'bg-teal-500' },
      { code: 'Fe', name: 'Iron', amount: '5.6 mg', dvPercent: 40, colorClass: 'bg-fuchsia-600' },
      { code: 'Mg', name: 'Magnesium', amount: '140 mg', dvPercent: 33, colorClass: 'bg-cyan-600' },
    ],

    ingredientsList: [
      { name: 'Rice', detail: 'Steamed basmati', imageUrl: FOOD_RICE_THUMB },
      { name: 'Dal', detail: '(toor/moong)', imageUrl: FOOD_DAL_THUMB },
      { name: 'Roti', detail: '(wheat)', imageUrl: FOOD_ROTI_THUMB },
      { name: 'Mixed Vegetable', detail: 'Carrots, beans, peas', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
      { name: 'Curd', detail: 'Fresh dahi', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80' },
      { name: 'Salad', detail: '(tomato, cucumber, onion)', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
    ],

    recommendedPortion: {
      size: '1 plate (400–500 g)',
      detail: 'Approx. 600–650 kcal per meal',
    },
    recommendedFrequency: {
      frequency: '1–2 times per day',
      detail: 'As part of a balanced diet.',
    },
    notes: '% Daily Value (DV) is based on a 2000 kcal diet (WHO/ICMR guidelines). Values are estimates based on typical Indian canteen recipes and portion sizes.',
  },

  'thali-84': {
    id: 'thali-84',
    name: 'Vegetarian Meal Thali',
    subtitle: 'Homemade / Canteen Food',
    category: 'Cooked Canteen Meal',
    scope: 'indian_meal',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Cooked Food', 'Vegetarian', 'ICMR-NIN Database'],
    primaryImage: FOOD_THALI_IMAGE,
    thumbnails: [FOOD_THALI_IMAGE, FOOD_RICE_THUMB, FOOD_DAL_THUMB],
    mealType: 'Lunch',
    mainItems: 'Rice, Dal, Roti, Mixed Vegetable, Curd, Salad',
    estimatedWeight: '~ 450 g',
    categoryDetail: 'Cooked Indian Dish',
    servingSize: '1 plate',
    cookingMethod: 'Boiled / Stir-fried',
    preparationTime: '12 Aug 2025, 1:00 PM',
    storageCondition: 'Consumed Fresh',
    lastScanned: '12 Aug 2025, 1:30 PM',
    officialLink: '#edit-meal',
    officialLinkText: 'Edit Meal Details',

    regulatoryBody: {
      name: 'FSSAI Canteen Food Safety Standards',
      badge: 'FSSAI FoSCoS Aligned',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
    },
    dataConfidence: {
      score: 82,
      label: 'Estimated Recipe Composition',
      isEstimated: true,
      databaseSource: 'ICMR–NIN Indian Food Composition Tables (IFCT 2017)',
      notes: 'Portion weight estimated from thali compartment depth.',
    },

    overallScore: 84,
    scoreLabel: 'Healthy',
    scoreDescription: 'A balanced meal with good nutrition.',
    checklist: {
      nutrition: true,
      ingredients: true,
      qualityCheck: true,
      freshlyPrepared: true,
      healthImpact: false,
    },

    servingLabel: 'Per Plate',
    servingSubtext: 'For 1 plate (approx. 450 g)',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 620, unit: 'kcal', dvPercent: 31, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 95.0, unit: 'g', dvPercent: 37, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 6.5, unit: 'g', dvPercent: 7, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 18.0, unit: 'g', dvPercent: 26, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 4.5, unit: 'g', dvPercent: 23, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 22.0, unit: 'g', dvPercent: 44, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 10.5, unit: 'g', dvPercent: 42, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: 980, unit: 'mg', dvPercent: 49, iconType: 'salt', statusColor: 'amber' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 137.7, unit: 'kcal', dvPercent: 7, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 21.1, unit: 'g', dvPercent: 8.2, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 1.44, unit: 'g', dvPercent: 1.5, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 4.0, unit: 'g', dvPercent: 5.7, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 1.0, unit: 'g', dvPercent: 5.1, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 4.88, unit: 'g', dvPercent: 9.8, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 2.33, unit: 'g', dvPercent: 9.3, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: 217, unit: 'mg', dvPercent: 10.8, iconType: 'salt', statusColor: 'amber' },
    ],

    qualityMetrics: [
      { title: 'Food Freshness', status: 'Fresh', subtitle: 'No visible spoilage', type: 'freshness', level: 'positive' },
      { title: 'Appearance', status: 'Good', subtitle: 'Looks normal and appealing', type: 'appearance', level: 'positive' },
      { title: 'Preparation Time', status: 'Recent', subtitle: 'Prepared 2 hours ago', type: 'preparation', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'No visible issues in the image', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Good Protein Source', description: 'Helps in muscle repair and body function.', type: 'positive', tag: 'Positive' },
      { title: 'Good Fibre Content', description: 'Supports digestion and gut health.', type: 'positive', tag: 'Positive' },
      { title: 'Moderate Sodium', description: 'Can be high if extra salt is added.', type: 'moderate', tag: 'Moderate Concern' },
      { title: 'Relatively High Carbohydrates', description: 'Large portion may increase calorie intake.', type: 'moderate', tag: 'Moderate Concern' },
    ],

    quickVerdict: {
      title: 'Good and balanced meal.',
      description: 'Rich in protein, fibre and essential nutrients. Suitable for regular consumption.',
      type: 'positive',
    },

    vitaminsAndMinerals: [
      { code: 'A', name: 'Vitamin A', amount: '450 µg', dvPercent: 50, colorClass: 'bg-amber-500' },
      { code: 'B1', name: 'Vitamin B1 (Thiamine)', amount: '0.4 mg', dvPercent: 36, colorClass: 'bg-emerald-500' },
      { code: 'B3', name: 'Vitamin B3 (Niacin)', amount: '6.5 mg', dvPercent: 41, colorClass: 'bg-sky-500' },
      { code: 'B6', name: 'Vitamin B6', amount: '0.7 mg', dvPercent: 54, colorClass: 'bg-orange-500' },
      { code: 'B9', name: 'Folate (B9)', amount: '120 µg', dvPercent: 30, colorClass: 'bg-rose-500' },
      { code: 'C', name: 'Vitamin C', amount: '35 mg', dvPercent: 39, colorClass: 'bg-purple-500' },
      { code: 'D', name: 'Vitamin D', amount: '1.2 µg', dvPercent: 24, colorClass: 'bg-amber-500' },
      { code: 'E', name: 'Vitamin E', amount: '3.5 mg', dvPercent: 23, colorClass: 'bg-indigo-500' },
      { code: 'K', name: 'Vitamin K', amount: '60 µg', dvPercent: 50, colorClass: 'bg-emerald-600' },
      { code: 'Ca', name: 'Calcium', amount: '260 mg', dvPercent: 26, colorClass: 'bg-teal-500' },
      { code: 'Fe', name: 'Iron', amount: '4.8 mg', dvPercent: 34, colorClass: 'bg-fuchsia-600' },
      { code: 'Mg', name: 'Magnesium', amount: '110 mg', dvPercent: 26, colorClass: 'bg-cyan-600' },
    ],

    ingredientsList: [
      { name: 'Rice', detail: 'White rice', imageUrl: FOOD_RICE_THUMB },
      { name: 'Dal', detail: '(toor/moong)', imageUrl: FOOD_DAL_THUMB },
      { name: 'Roti', detail: '(wheat)', imageUrl: FOOD_ROTI_THUMB },
      { name: 'Mixed Vegetable', detail: 'Subji', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
      { name: 'Curd', detail: 'Dahi', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80' },
      { name: 'Salad', detail: '(tomato, cucumber, onion)', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
    ],

    recommendedPortion: {
      size: '1 plate (400–500 g)',
      detail: 'Approx. 600–650 kcal per meal',
    },
    recommendedFrequency: {
      frequency: '1–2 times per day',
      detail: 'As part of a balanced diet.',
    },
  },

  'poha-maharashtra': {
    id: 'poha-maharashtra',
    name: 'Maharashtrian Kanda Poha',
    subtitle: 'Traditional Indian Breakfast • Pune Style',
    category: 'Cooked Canteen Meal',
    scope: 'indian_meal',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Indian Breakfast', 'Vegetarian', 'Easy Digestible', 'ICMR-NIN IFCT'],
    primaryImage: FOOD_POHA_IMAGE,
    thumbnails: [FOOD_POHA_IMAGE],
    mealType: 'Breakfast',
    mainItems: 'Flattened Rice (Poha), Onions, Peanuts, Mustard, Curry Leaves, Lemon',
    estimatedWeight: '~ 220 g',
    categoryDetail: 'Indian Cooked Breakfast',
    servingSize: '1 bowl',
    preparationTime: 'Today, 8:15 AM',
    cookingMethod: 'Sauteed / Steamed',
    storageCondition: 'Served Fresh',
    lastScanned: '10 Oct 2026, 8:40 AM',
    officialLink: '#canteen-menu',
    officialLinkText: 'View Canteen Breakfast Recipe',

    regulatoryBody: {
      name: 'FSSAI Institutional Standards',
      badge: 'FSSAI FoSCoS Clean Street Food / Canteen',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
    },
    dataConfidence: {
      score: 91,
      label: 'Estimated Recipe Composition',
      isEstimated: true,
      databaseSource: 'ICMR–NIN Indian Food Composition Tables (IFCT 2017)',
      notes: 'Calculated using IFCT Code B008 (Rice flakes/poha) and C012 (Groundnut roasted).',
    },

    overallScore: 92,
    scoreLabel: 'Excellent',
    scoreDescription: 'Light, nutrient-dense breakfast with heart-healthy peanuts and iron-rich flattened rice.',
    checklist: {
      nutrition: true,
      ingredients: true,
      qualityCheck: true,
      freshlyPrepared: true,
      healthImpact: true,
    },

    servingLabel: 'Per Bowl (220 g)',
    servingSubtext: 'For 1 standard serving (approx. 220 g)',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 280, unit: 'kcal', dvPercent: 14, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 48.0, unit: 'g', dvPercent: 18, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 2.5, unit: 'g', dvPercent: 2.5, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 7.8, unit: 'g', dvPercent: 11, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Saturated Fat', amount: 1.2, unit: 'g', dvPercent: 6, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 6.8, unit: 'g', dvPercent: 14, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 4.2, unit: 'g', dvPercent: 17, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: 390, unit: 'mg', dvPercent: 16, iconType: 'salt', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 127.2, unit: 'kcal', dvPercent: 6.4, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 21.8, unit: 'g', dvPercent: 8.2, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 3.5, unit: 'g', dvPercent: 5.0, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 3.1, unit: 'g', dvPercent: 6.2, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 1.9, unit: 'g', dvPercent: 7.6, iconType: 'leaf', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Grain Moisture', status: 'Good', subtitle: 'Fluffy, non-mushy texture', type: 'appearance', level: 'positive' },
      { title: 'Freshness', status: 'Fresh', subtitle: 'Prepared within 1 hour', type: 'freshness', level: 'positive' },
      { title: 'Oil Level', status: 'Good', subtitle: 'Light vegetable oil tempering', type: 'preparation', level: 'positive' },
      { title: 'Contaminants', status: 'Not detected', subtitle: 'Zero foreign matter in flaked rice', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Iron Enriched', description: 'Beaten rice contains natural bioavailable iron from traditional rolling processing.', type: 'positive', tag: 'Positive' },
      { title: 'Healthy Fats & Plant Protein', description: 'Roasted peanuts contribute unsaturated fatty acids and plant protein.', type: 'positive', tag: 'Positive' },
      { title: 'Easily Digestible', description: 'Low glycemic stress compared to heavy bakery goods.', type: 'positive', tag: 'Positive' },
    ],

    quickVerdict: {
      title: 'Nutritious & Energizing Indian Breakfast',
      description: 'Ideal morning meal supporting steady blood glucose without digestive heaviness.',
      type: 'positive',
    },

    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron', amount: '3.8 mg', dvPercent: 27, colorClass: 'bg-fuchsia-600' },
      { code: 'B1', name: 'Thiamine (B1)', amount: '0.3 mg', dvPercent: 25, colorClass: 'bg-emerald-500' },
      { code: 'C', name: 'Vitamin C (Lemon)', amount: '12 mg', dvPercent: 13, colorClass: 'bg-purple-500' },
      { code: 'Mg', name: 'Magnesium', amount: '58 mg', dvPercent: 14, colorClass: 'bg-cyan-600' },
    ],

    ingredientsList: [
      { name: 'Flattened Rice', detail: 'Poha flakes (ICMR B008)' },
      { name: 'Roasted Peanuts', detail: 'Arachis hypogaea' },
      { name: 'Onions & Green Chili', detail: 'Freshly chopped' },
      { name: 'Curry Leaves', detail: 'Tempered in mustard' },
    ],

    recommendedPortion: {
      size: '1 plate (200–250 g)',
      detail: 'Standard breakfast portion',
    },
    recommendedFrequency: {
      frequency: '3–4 times per week',
      detail: 'Wholesome Indian breakfast staple',
    },
  },

  // =========================================================================
  // SCOPE 2: 🌍 GLOBAL PACKAGED PRODUCT SCANNER (Worldwide · Open Food Facts)
  // =========================================================================
  'lays-classic': {
    id: 'lays-classic',
    name: "Lay's Classic Potato Chips",
    subtitle: 'PepsiCo India Holdings Pvt. Ltd.',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Packaged Snack', 'FSSAI Licensed', 'Open Food Facts Verified'],
    primaryImage: FOOD_CHIPS_IMAGE,
    thumbnails: [FOOD_CHIPS_IMAGE],
    brand: "Lay's",
    manufacturer: 'PepsiCo India Holdings Pvt. Ltd.',
    fssaiLicenceNo: '10014064000435',
    barcode: '8901491100034',
    netWeight: '52 g',
    categoryDetail: 'Potato Chips',
    servingSize: '30 g',
    lastScanned: '12 Aug 2025, 10:24 AM',
    officialLink: 'https://www.pepsicoindia.co.in',
    officialLinkText: 'View on Manufacturer Site',

    regulatoryBody: {
      name: 'FSSAI (Food Safety and Standards Authority of India)',
      badge: 'FSSAI Lic. 10014064000435 Verified',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
      notes: 'FSSAI regulations mandate declared limits on trans fat (< 2%) and clear sodium labelling.',
    },
    dataConfidence: {
      score: 98,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts API (Barcode 8901491100034) & Front/Back Label OCR',
      notes: 'Values directly extracted from manufacturer declared packaging table.',
    },

    overallScore: 72,
    scoreLabel: 'Good',
    scoreDescription: 'Moderate consumption is recommended.',
    checklist: {
      nutrition: false,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: true,
      healthImpact: false,
    },

    servingLabel: 'Per Serving (30 g)',
    servingSubtext: 'Per 100 g (approx.)',
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 536, unit: 'kcal', dvPercent: 27, iconType: 'flame', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 53.6, unit: 'g', dvPercent: 21, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 0.5, unit: 'g', dvPercent: 1, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 34.6, unit: 'g', dvPercent: 49, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Saturated Fat', amount: 16.0, unit: 'g', dvPercent: 80, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 6.7, unit: 'g', dvPercent: 13, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 610, unit: 'mg', dvPercent: 31, iconType: 'salt', statusColor: 'rose' },
      { name: 'Dietary Fibre', amount: 4.0, unit: 'g', dvPercent: 14, iconType: 'leaf', statusColor: 'emerald' },
    ],
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 161, unit: 'kcal', dvPercent: 8.1, iconType: 'flame', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 16.1, unit: 'g', dvPercent: 6.2, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 0.15, unit: 'g', dvPercent: 0.3, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 10.4, unit: 'g', dvPercent: 14.8, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Saturated Fat', amount: 4.8, unit: 'g', dvPercent: 24, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 2.01, unit: 'g', dvPercent: 4.0, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 183, unit: 'mg', dvPercent: 9.3, iconType: 'salt', statusColor: 'rose' },
      { name: 'Dietary Fibre', amount: 1.2, unit: 'g', dvPercent: 4.2, iconType: 'leaf', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Packaging Condition', status: 'Good', subtitle: 'No major damage detected', type: 'packaging', level: 'positive' },
      { title: 'Label Readability', status: 'Clear', subtitle: 'All key details readable', type: 'readability', level: 'positive' },
      { title: 'Expiry Date', status: 'Valid', subtitle: 'Best before: 10 Jan 2026 (5 months left)', type: 'expiry', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'No visible mold damage', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'High Sodium', description: 'Frequent excessive intake can increase blood pressure and cardiovascular risk. (WHO)', type: 'high', tag: 'High Concern' },
      { title: 'High Saturated Fat', description: 'Can raise LDL cholesterol if consumed excessively. (WHO)', type: 'high', tag: 'High Concern' },
      { title: 'Low Fibre', description: 'Provides less fibre than whole foods.', type: 'moderate', tag: 'Moderate Concern' },
      { title: 'Calories', description: 'Energy dense food; large portions may contribute to weight gain.', type: 'moderate', tag: 'Moderate Concern' },
    ],

    quickVerdict: {
      title: 'High in sodium and saturated fat.',
      description: 'Enjoy occasionally, not for daily consumption.',
      type: 'warning',
    },

    vitaminsAndMinerals: [
      { code: 'B1', name: 'Vitamin B1 (Thiamine)', amount: '0.1 mg', dvPercent: 8, colorClass: 'bg-emerald-500' },
      { code: 'B3', name: 'Vitamin B3 (Niacin)', amount: '1.6 mg', dvPercent: 10, colorClass: 'bg-sky-500' },
      { code: 'B6', name: 'Vitamin B6', amount: '0.2 mg', dvPercent: 10, colorClass: 'bg-orange-500' },
      { code: 'B9', name: 'Folate (B9)', amount: '20 µg', dvPercent: 5, colorClass: 'bg-rose-500' },
      { code: 'E', name: 'Vitamin E', amount: '7.0 mg', dvPercent: 47, colorClass: 'bg-indigo-500' },
      { code: 'K', name: 'Vitamin K', amount: '5 µg', dvPercent: 4, colorClass: 'bg-emerald-600' },
    ],

    ingredientsList: [
      { name: 'Potatoes', detail: 'Sliced whole farm potatoes', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
      { name: 'Edible Vegetable Oil', detail: '(Palmolein Oil)', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80' },
      { name: 'Iodised Salt', detail: 'Refined salt', imageUrl: 'https://images.unsplash.com/photo-1518110903495-cd99c129f444?auto=format&fit=crop&w=300&q=80' },
    ],
    rawIngredientsText: 'Potatoes, Edible Vegetable Oil (Palmolein Oil), Iodised Salt.',
    allergenWarning: 'May contain traces of milk and soy.',

    recommendedPortion: {
      size: '30 g (about 15–20 chips)',
      detail: 'Approx. 160 kcal per serving',
    },
    recommendedFrequency: {
      frequency: 'Occasional consumption only',
      detail: 'Not recommended for daily intake.',
      caution: true,
    },
  },

  'oreo-cookies-usa': {
    id: 'oreo-cookies-usa',
    name: 'Oreo Double Stuf Chocolate Sandwich Cookies',
    subtitle: 'Mondelez Global LLC • East Hanover, NJ, USA',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'United States',
    countryFlag: '🇺🇸',
    verified: true,
    tags: ['Global Packaged', 'USA Import', 'FDA Nutrition Facts', 'Open Food Facts'],
    primaryImage: FOOD_OREO_IMAGE,
    thumbnails: [FOOD_OREO_IMAGE],
    brand: 'Oreo',
    manufacturer: 'Mondelez Global LLC',
    barcode: '044000032029',
    netWeight: '432 g (15.25 oz)',
    categoryDetail: 'Sandwich Biscuits',
    servingSize: '2 cookies (29 g)',
    lastScanned: '10 Oct 2026, 11:15 AM',
    officialLink: 'https://www.oreo.com',
    officialLinkText: 'View on Mondelez USA Portal',

    regulatoryBody: {
      name: 'US FDA (Food and Drug Administration)',
      badge: 'FDA 21 CFR 101 Compliant',
      countryCode: 'US',
      flag: '🇺🇸',
      portalUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
      verified: true,
      notes: 'Complies with US FDA Food Allergen Labeling and Consumer Protection Act (FALCPA).',
    },
    dataConfidence: {
      score: 99,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts (UPC 044000032029) & USDA FoodData Central',
      notes: 'Verified against USA declared Nutrition Facts label.',
    },

    overallScore: 62,
    scoreLabel: 'Moderate',
    scoreDescription: 'High added sugar and refined palm oil. Consume in strict moderation.',
    checklist: {
      nutrition: false,
      ingredients: true,
      qualityCheck: true,
      healthImpact: false,
    },

    servingLabel: 'Per Serving (29 g)',
    servingSubtext: 'Per 100 g (approx.)',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 140, unit: 'kcal', dvPercent: 7, iconType: 'flame', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 13.0, unit: 'g', dvPercent: 26, iconType: 'sugar', statusColor: 'rose' },
      { name: 'Added Sugars', amount: 13.0, unit: 'g', dvPercent: 26, iconType: 'sugar', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 21.0, unit: 'g', dvPercent: 8, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 7.0, unit: 'g', dvPercent: 9, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 2.0, unit: 'g', dvPercent: 10, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Sodium', amount: 90, unit: 'mg', dvPercent: 4, iconType: 'salt', statusColor: 'emerald' },
      { name: 'Protein', amount: 1.0, unit: 'g', dvPercent: 2, iconType: 'protein', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 483, unit: 'kcal', dvPercent: 24, iconType: 'flame', statusColor: 'rose' },
      { name: 'Total Sugars', amount: 44.8, unit: 'g', dvPercent: 89, iconType: 'sugar', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 72.4, unit: 'g', dvPercent: 28, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 24.1, unit: 'g', dvPercent: 34, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Saturated Fat', amount: 6.9, unit: 'g', dvPercent: 35, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Sodium', amount: 310, unit: 'mg', dvPercent: 13, iconType: 'salt', statusColor: 'amber' },
    ],

    qualityMetrics: [
      { title: 'Packaging Seal', status: 'Good', subtitle: 'Stay-Fresh pull tab intact', type: 'packaging', level: 'positive' },
      { title: 'Label OCR', status: 'Clear', subtitle: 'FDA Nutrition Facts clearly legible', type: 'readability', level: 'positive' },
      { title: 'Best By Date', status: 'Valid', subtitle: 'Best by: Nov 2026', type: 'expiry', level: 'positive' },
      { title: 'Foreign Particles', status: 'Not detected', subtitle: 'No visible contamination', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'High Added Sugars', description: 'Contains 13g added sugar per 2 cookies (~26% of recommended daily limit). (WHO)', type: 'high', tag: 'High Concern' },
      { title: 'Ultra-Processed Food (NOVA 4)', description: 'Contains invert sugar, soy lecithin, high fructose corn syrup and artificial flavor.', type: 'moderate', tag: 'Moderate Concern' },
      { title: 'Low Dietary Fibre', description: 'Under 1g fibre per serving.', type: 'moderate', tag: 'Moderate Concern' },
    ],

    quickVerdict: {
      title: 'High in Added Sugar — Treat Food Only',
      description: 'American sweet snack with significant free sugar density. Recommended for occasional enjoyment only.',
      type: 'warning',
    },

    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron', amount: '1.2 mg', dvPercent: 7, colorClass: 'bg-fuchsia-600' },
      { code: 'Ca', name: 'Calcium', amount: '10 mg', dvPercent: 1, colorClass: 'bg-teal-500' },
    ],

    ingredientsList: [
      { name: 'Sugar & High Fructose Corn Syrup', detail: 'Sweeteners' },
      { name: 'Unbleached Enriched Flour', detail: 'Wheat flour, niacin, reduced iron' },
      { name: 'Palm & Canola Oil', detail: 'Vegetable fats' },
      { name: 'Cocoa (Alkali Processed)', detail: 'Dutch cocoa' },
    ],
    rawIngredientsText: 'Sugar, Unbleached Enriched Flour, Palm and/or Canola Oil, Cocoa (processed with alkali), High Fructose Corn Syrup, Leavening, Salt, Soy Lecithin, Chocolate, Artificial Flavor.',
    allergenWarning: 'Contains: Wheat, Soy.',

    recommendedPortion: {
      size: '2 cookies (29 g)',
      detail: 'Approx. 140 kcal',
    },
    recommendedFrequency: {
      frequency: 'Occasional indulgence',
      detail: 'Keep within WHO 25g daily added sugar allowance.',
      caution: true,
    },
  },

  'shin-ramyun-korea': {
    id: 'shin-ramyun-korea',
    name: 'Nongshim Shin Ramyun Gourmet Spicy Noodles',
    subtitle: 'Nongshim Co., Ltd. • Seoul, South Korea',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'South Korea',
    countryFlag: '🇰🇷',
    verified: true,
    tags: ['Global Packaged', 'Korean Instant Noodles', 'MFDS Standards', 'Open Food Facts'],
    primaryImage: FOOD_RAMEN_IMAGE,
    thumbnails: [FOOD_RAMEN_IMAGE],
    brand: 'Nongshim',
    manufacturer: 'Nongshim Co., Ltd.',
    barcode: '8801043014854',
    netWeight: '120 g',
    categoryDetail: 'Instant Noodle Soup',
    servingSize: '1 pack (120 g)',
    lastScanned: '10 Oct 2026, 10:50 AM',
    officialLink: 'http://eng.nongshim.com',
    officialLinkText: 'View Nongshim Korea Official Portal',

    regulatoryBody: {
      name: 'MFDS (Ministry of Food and Drug Safety, Korea)',
      badge: 'MFDS K-Safety Audited',
      countryCode: 'KR',
      flag: '🇰🇷',
      portalUrl: 'https://www.mfds.go.kr',
      verified: true,
      notes: 'Registered with South Korean MFDS export certification and global food safety protocols.',
    },
    dataConfidence: {
      score: 97,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts API (EAN 8801043014854) & Korean Packaging OCR',
      notes: 'Verified against Korean MFDS export nutrition facts panel.',
    },

    overallScore: 56,
    scoreLabel: 'Attention Needed',
    scoreDescription: 'Extremely high sodium content (approx. 78% of daily limit per packet).',
    checklist: {
      nutrition: false,
      ingredients: true,
      qualityCheck: true,
      healthImpact: false,
    },

    servingLabel: 'Per Pack (120 g)',
    servingSubtext: 'Per 100 g',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 510, unit: 'kcal', dvPercent: 26, iconType: 'flame', statusColor: 'rose' },
      { name: 'Sodium', amount: 1790, unit: 'mg', dvPercent: 78, iconType: 'salt', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 82.0, unit: 'g', dvPercent: 32, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 16.0, unit: 'g', dvPercent: 23, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 8.0, unit: 'g', dvPercent: 40, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 10.0, unit: 'g', dvPercent: 20, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 3.0, unit: 'g', dvPercent: 3, iconType: 'sugar', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 425, unit: 'kcal', dvPercent: 21, iconType: 'flame', statusColor: 'rose' },
      { name: 'Sodium', amount: 1492, unit: 'mg', dvPercent: 65, iconType: 'salt', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 68.3, unit: 'g', dvPercent: 26, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 13.3, unit: 'g', dvPercent: 19, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 6.7, unit: 'g', dvPercent: 33, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 8.3, unit: 'g', dvPercent: 16, iconType: 'protein', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Pouch Integrity', status: 'Good', subtitle: 'Airtight packaging intact', type: 'packaging', level: 'positive' },
      { title: 'Noodle Brick Appearance', status: 'Good', subtitle: 'Normal golden fried texture', type: 'appearance', level: 'positive' },
      { title: 'Date Code', status: 'Valid', subtitle: 'Expiry: 24 Dec 2026', type: 'expiry', level: 'positive' },
      { title: 'Foreign Matter', status: 'Not detected', subtitle: 'No spoilage detected', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Very High Sodium Content', description: 'One serving contains 1,790 mg sodium (~78% of WHO daily ceiling). High risk for hypertension.', type: 'high', tag: 'High Concern' },
      { title: 'High Saturated Fat', description: 'Palm oil fried noodle cake contains 8g saturated fat.', type: 'high', tag: 'High Concern' },
      { title: 'Capsaicin & Spices', description: 'Intense Korean chili broth may irritate sensitive digestive systems.', type: 'moderate', tag: 'Moderate Concern' },
    ],

    quickVerdict: {
      title: 'High Sodium Warning — Use Less Soup Base',
      description: 'Popular Korean spicy noodle soup, but contains nearly an entire day’s recommended sodium allowance.',
      type: 'danger',
    },

    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron', amount: '2.4 mg', dvPercent: 13, colorClass: 'bg-fuchsia-600' },
      { code: 'Ca', name: 'Calcium', amount: '35 mg', dvPercent: 4, colorClass: 'bg-teal-500' },
    ],

    ingredientsList: [
      { name: 'Wheat Flour Noodles', detail: 'Fried in refined palm oil' },
      { name: 'Soup Base & Spices', detail: 'Red chili, garlic, black pepper, MSG' },
      { name: 'Dehydrated Vegetables', detail: 'Shiitake mushroom, bok choy, carrot' },
    ],
    rawIngredientsText: 'Enriched Wheat Flour, Palm Oil, Potato Starch, Modified Potato Starch, Salt, Red Chili Pepper, Garlic, Yeast Extract, Hydrolyzed Soy Protein, Shiitake Mushrooms, Green Onion.',
    allergenWarning: 'Contains: Wheat, Soy. Produced in a facility that also processes crustaceans and milk.',

    recommendedPortion: {
      size: '1 bowl with 50% seasoning packet',
      detail: 'Discarding half the broth reduces sodium by approx. 45%',
    },
    recommendedFrequency: {
      frequency: 'Occasional meal only (1–2 times monthly)',
      detail: 'Balance with high-potassium fresh fruits to offset sodium load.',
      caution: true,
    },
  },

  'pocky-chocolate-japan': {
    id: 'pocky-chocolate-japan',
    name: 'Glico Pocky Chocolate Biscuit Sticks',
    subtitle: 'Ezaki Glico Co., Ltd. • Osaka, Japan',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'Japan',
    countryFlag: '🇯🇵',
    verified: true,
    tags: ['Global Packaged', 'Japanese Confectionery', 'CAA / JAS Standards', 'Open Food Facts'],
    primaryImage: FOOD_POCKY_IMAGE,
    thumbnails: [FOOD_POCKY_IMAGE],
    brand: 'Glico',
    manufacturer: 'Ezaki Glico Co., Ltd.',
    barcode: '4901005511171',
    netWeight: '75 g (2 packs)',
    categoryDetail: 'Chocolate Coated Biscuits',
    servingSize: '1 packet (37.5 g)',
    lastScanned: '10 Oct 2026, 9:55 AM',
    officialLink: 'https://www.glico.com/jp',
    officialLinkText: 'View Ezaki Glico Japan Portal',

    regulatoryBody: {
      name: 'CAA (Consumer Affairs Agency) & JAS, Japan',
      badge: 'Japanese Food Sanitation Act Compliant',
      countryCode: 'JP',
      flag: '🇯🇵',
      portalUrl: 'https://www.caa.go.jp',
      verified: true,
    },
    dataConfidence: {
      score: 96,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts API (JAN 4901005511171) & Japanese Nutrition Label OCR',
      notes: 'Matches Glico official nutritional declaration per packaging standard.',
    },

    overallScore: 70,
    scoreLabel: 'Good',
    scoreDescription: 'Portion-controlled Japanese sweet snack with moderate saturated fat and sugar.',
    checklist: {
      nutrition: false,
      ingredients: true,
      qualityCheck: true,
      healthImpact: false,
    },

    servingLabel: 'Per Packet (37.5 g)',
    servingSubtext: 'Per 100 g',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 182, unit: 'kcal', dvPercent: 9, iconType: 'flame', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 11.2, unit: 'g', dvPercent: 22, iconType: 'sugar', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 24.3, unit: 'g', dvPercent: 9, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 8.2, unit: 'g', dvPercent: 12, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 4.8, unit: 'g', dvPercent: 24, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 2.8, unit: 'g', dvPercent: 6, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 75, unit: 'mg', dvPercent: 3, iconType: 'salt', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 485, unit: 'kcal', dvPercent: 24, iconType: 'flame', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 29.8, unit: 'g', dvPercent: 60, iconType: 'sugar', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 64.8, unit: 'g', dvPercent: 25, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 21.8, unit: 'g', dvPercent: 31, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 12.8, unit: 'g', dvPercent: 64, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Sodium', amount: 200, unit: 'mg', dvPercent: 8, iconType: 'salt', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Packaging Condition', status: 'Good', subtitle: 'Double sealed carton with foil packet', type: 'packaging', level: 'positive' },
      { title: 'Label Readability', status: 'Clear', subtitle: 'Japanese and English ingredients legible', type: 'readability', level: 'positive' },
      { title: 'Best Before', status: 'Valid', subtitle: 'Best before: 18 Dec 2026', type: 'expiry', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'Clean chocolate coating', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Moderate Added Sugar', description: 'Contains 11.2g sugar per individual snack pack.', type: 'moderate', tag: 'Moderate Concern' },
      { title: 'Low Sodium', description: 'Only 75mg sodium per pouch (very low cardiovascular burden).', type: 'positive', tag: 'Positive' },
    ],

    quickVerdict: {
      title: 'Popular Japanese Biscuit Snack',
      description: 'Convenient 2-pack portioning helps avoid excessive sugar consumption.',
      type: 'positive',
    },

    vitaminsAndMinerals: [
      { code: 'Ca', name: 'Calcium', amount: '45 mg', dvPercent: 5, colorClass: 'bg-teal-500' },
      { code: 'Fe', name: 'Iron', amount: '0.8 mg', dvPercent: 6, colorClass: 'bg-fuchsia-600' },
    ],

    ingredientsList: [
      { name: 'Wheat Flour', detail: 'Japanese standard bakery flour' },
      { name: 'Chocolate Coating', detail: 'Cacao mass, whole milk powder, cocoa butter' },
      { name: 'Shortening & Sugar', detail: 'Vegetable fats' },
    ],
    rawIngredientsText: 'Wheat Flour, Sugar, Chocolate Liquor, Blend of Vegetable Oils, Whole Milk Powder, Shortening, Cocoa Butter, Salt, Butter, Yeast, Soy Lecithin, Polyglycerol Polyricinoleate, Artificial Flavor.',
    allergenWarning: 'Contains: Milk, Wheat, Soybeans.',

    recommendedPortion: {
      size: '1 packet (37.5 g)',
      detail: 'Approx. 182 kcal',
    },
    recommendedFrequency: {
      frequency: '1–2 times weekly',
      detail: 'Enjoy with green tea or water.',
    },
  },

  'fresh-apple': {
    id: 'fresh-apple',
    name: 'Fresh Royal Gala Apple',
    subtitle: 'Fresh Produce • Unprocessed Fruit',
    category: 'Fresh Produce',
    scope: 'indian_meal',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Fresh Produce', 'High Fibre', 'Natural Vitamins', 'WHO 5-a-Day'],
    primaryImage: FOOD_APPLE_IMAGE,
    thumbnails: [FOOD_APPLE_IMAGE],
    estimatedWeight: '~ 182 g',
    servingSize: '1 medium apple',
    lastScanned: '10 Oct 2026, 9:15 AM',

    regulatoryBody: {
      name: 'FSSAI Fresh Produce Grading Standards',
      badge: 'FSSAI AGMARK Graded',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
    },
    dataConfidence: {
      score: 95,
      label: 'Food Composition Database',
      isEstimated: false,
      databaseSource: 'ICMR-NIN Indian Food Composition Tables (IFCT Fruit Code F002) & USDA',
      notes: 'Natural whole food nutrient values from analytical lab composition assays.',
    },

    overallScore: 95,
    scoreLabel: 'Excellent',
    scoreDescription: 'Pure unprocessed fruit packed with vitamins and dietary pectin.',
    checklist: {
      nutrition: true,
      ingredients: true,
      qualityCheck: true,
      freshlyPrepared: true,
      healthImpact: true,
    },

    servingLabel: 'Per Apple (182 g)',
    servingSubtext: '1 medium fruit (approx. 182 g)',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 95, unit: 'kcal', dvPercent: 4.8, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 25.1, unit: 'g', dvPercent: 9.8, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 19.0, unit: 'g', dvPercent: 19, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 0.3, unit: 'g', dvPercent: 0.4, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Saturated Fat', amount: 0.05, unit: 'g', dvPercent: 0.2, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 0.5, unit: 'g', dvPercent: 1.0, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 4.4, unit: 'g', dvPercent: 18, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium', amount: 1.8, unit: 'mg', dvPercent: 0.1, iconType: 'salt', statusColor: 'emerald' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 52, unit: 'kcal', dvPercent: 2.6, iconType: 'flame', statusColor: 'emerald' },
      { name: 'Carbohydrates', amount: 13.8, unit: 'g', dvPercent: 5.4, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Sugars', amount: 10.4, unit: 'g', dvPercent: 10.4, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 0.17, unit: 'g', dvPercent: 0.2, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Saturated Fat', amount: 0.03, unit: 'g', dvPercent: 0.1, iconType: 'droplet', statusColor: 'emerald' },
      { name: 'Protein', amount: 0.26, unit: 'g', dvPercent: 0.5, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Dietary Fibre', amount: 2.4, unit: 'g', dvPercent: 9.6, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium', amount: 1.0, unit: 'mg', dvPercent: 0.05, iconType: 'salt', statusColor: 'emerald' },
    ],

    qualityMetrics: [
      { title: 'Produce Freshness', status: 'Excellent', subtitle: 'Firm skin, bright natural blush', type: 'freshness', level: 'positive' },
      { title: 'Surface Integrity', status: 'Good', subtitle: 'No bruises, rot, or cuts detected', type: 'appearance', level: 'positive' },
      { title: 'Wax Coating', status: 'Valid', subtitle: 'Natural bloom; wash before eating', type: 'preparation', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'No pests or fungal spores', type: 'contaminants', level: 'positive' },
    ],

    healthImpacts: [
      { title: 'Rich in Dietary Pectin', description: 'Soluble fibre supports cholesterol and glucose regulation.', type: 'positive', tag: 'Positive' },
      { title: 'High in Polyphenols & Quercetin', description: 'Potent antioxidants protect cell integrity and immune function.', type: 'positive', tag: 'Positive' },
      { title: 'Natural Hydration', description: 'Composed of approx. 85% structured water.', type: 'positive', tag: 'Positive' },
    ],

    quickVerdict: {
      title: 'Top-tier wholesome fruit snack!',
      description: 'Zero added sodium, zero processed fats, rich in bioavailable micronutrients.',
      type: 'positive',
    },

    vitaminsAndMinerals: [
      { code: 'C', name: 'Vitamin C', amount: '8.4 mg', dvPercent: 14, colorClass: 'bg-purple-500' },
      { code: 'A', name: 'Vitamin A', amount: '98 IU', dvPercent: 2, colorClass: 'bg-amber-500' },
      { code: 'E', name: 'Vitamin E', amount: '0.3 mg', dvPercent: 2, colorClass: 'bg-indigo-500' },
      { code: 'K', name: 'Vitamin K', amount: '4.0 µg', dvPercent: 5, colorClass: 'bg-emerald-600' },
      { code: 'Ca', name: 'Potassium', amount: '195 mg', dvPercent: 6, colorClass: 'bg-teal-500' },
    ],

    ingredientsList: [
      { name: 'Raw Apple', detail: 'Malus domestica (100%)', imageUrl: FOOD_APPLE_IMAGE },
    ],

    recommendedPortion: {
      size: '1 medium fruit (150–200 g)',
      detail: 'Daily morning or afternoon snack',
    },
    recommendedFrequency: {
      frequency: 'Daily consumption recommended',
      detail: 'Ideal source of daily fibre according to ICMR guidelines.',
    },
  },

  'spoiled-bread-defect': {
    id: 'spoiled-bread-defect',
    name: 'Sliced Sandwich Bread (Defect)',
    subtitle: 'Golden Bakery Ltd. • Suspected Spoilage',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: false,
    tags: ['Inspection Required', 'Visible Spoilage', 'Defect Reported', 'FSSAI Complaint'],
    primaryImage: FOOD_DEFECT_BREAD,
    thumbnails: [FOOD_DEFECT_BREAD],
    brand: 'Golden Bake',
    manufacturer: 'Golden Bakery Consumer Goods Ltd.',
    fssaiLicenceNo: '11518019000312',
    barcode: '8906012440192',
    netWeight: '400 g',
    servingSize: '2 slices (50 g)',
    lastScanned: '10 Oct 2026, 12:20 PM',
    officialLink: '#defect-complaint',
    officialLinkText: 'Report Defect to Manufacturer / FSSAI',

    regulatoryBody: {
      name: 'FSSAI National Consumer Food Safety Portal',
      badge: 'FSSAI FoSCoS Grievance Portal',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: false,
      notes: 'Active complaint docket initiated for microbiological spoilage violation.',
    },
    dataConfidence: {
      score: 95,
      label: 'Defect Analysis Record',
      isEstimated: false,
      databaseSource: 'Visual Spoilage Classification & Batch OCR',
      notes: 'Defect corroborated through visual fungal colony patterns on sliced bread loaf.',
    },

    overallScore: 32,
    scoreLabel: 'Attention Needed',
    scoreDescription: 'Visible fungal growth and packaging moisture compromise food safety.',
    checklist: {
      nutrition: false,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: false,
      healthImpact: false,
    },

    servingLabel: 'Per Serving (50 g)',
    servingSubtext: 'Per 100 g',
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 265, unit: 'kcal', dvPercent: 13, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 49.0, unit: 'g', dvPercent: 19, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Protein', amount: 9.0, unit: 'g', dvPercent: 18, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 490, unit: 'mg', dvPercent: 24, iconType: 'salt', statusColor: 'amber' },
    ],
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 132, unit: 'kcal', dvPercent: 6.5, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 24.5, unit: 'g', dvPercent: 9.5, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Protein', amount: 4.5, unit: 'g', dvPercent: 9, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 245, unit: 'mg', dvPercent: 12, iconType: 'salt', statusColor: 'amber' },
    ],

    qualityMetrics: [
      { title: 'Packaging Condition', status: 'Attention', subtitle: 'Moisture condensation inside bag', type: 'packaging', level: 'warning' },
      { title: 'Surface Appearance', status: 'Inspection required', subtitle: 'Green-grey fungal colonies visible', type: 'appearance', level: 'danger' },
      { title: 'Expiry Date', status: 'Inspection required', subtitle: 'Product nearing or past expiry', type: 'expiry', level: 'danger' },
      { title: 'Visible Contaminants', status: 'Inspection required', subtitle: 'Suspected mold spores detected', type: 'contaminants', level: 'danger' },
    ],

    healthImpacts: [
      { title: 'Mycotoxin Ingestion Risk', description: 'Consuming mold-contaminated bakery goods can cause nausea, GI distress, and allergic reactions.', type: 'high', tag: 'High Concern' },
      { title: 'Respiratory Sensitivity', description: 'Do not sniff or inhale spores directly.', type: 'high', tag: 'High Concern' },
    ],

    quickVerdict: {
      title: 'Do NOT Consume — Defect Suspected!',
      description: 'Physical spoilage or contamination identified. Submit a Defect Complaint to notify manufacturer and FSSAI.',
      type: 'danger',
    },

    vitaminsAndMinerals: [
      { code: 'B1', name: 'Thiamine', amount: '0.2 mg', dvPercent: 15, colorClass: 'bg-emerald-500' },
      { code: 'Fe', name: 'Iron', amount: '1.8 mg', dvPercent: 12, colorClass: 'bg-fuchsia-600' },
    ],

    ingredientsList: [
      { name: 'Refined Wheat Flour', detail: 'Maida (62%)', imageUrl: FOOD_ROTI_THUMB },
      { name: 'Yeast & Salt', detail: 'Fermentation agents', imageUrl: 'https://images.unsplash.com/photo-1518110903495-cd99c129f444?auto=format&fit=crop&w=300&q=80' },
    ],

    recommendedPortion: {
      size: '0 g',
      detail: 'Dispose safely or preserve batch for testing',
    },
    recommendedFrequency: {
      frequency: 'Unsafe for consumption',
      detail: 'Preserve packaging and receipt for complaint filing.',
      caution: true,
    },
    notes: 'Defect flag triggered: Users may file a formal complaint through the Defect Complaint System with batch verification.',
  },

  'kurkure-masala-munch': {
    id: 'kurkure-masala-munch',
    name: 'Kurkure Masala Munch',
    subtitle: 'PepsiCo India Holdings Pvt. Ltd.',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Packaged Snack', 'Crispy Corn & Rice', 'FSSAI Licensed'],
    primaryImage: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    thumbnails: ['https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80'],
    brand: 'Kurkure',
    manufacturer: 'PepsiCo India Holdings Pvt. Ltd.',
    fssaiLicenceNo: '10014064000435',
    barcode: '8901491101857',
    netWeight: '75 g',
    categoryDetail: 'Puffed Corn & Rice Snack',
    servingSize: '30 g',
    lastScanned: '10 Oct 2026, 12:45 PM',
    officialLink: 'https://www.pepsicoindia.co.in',
    officialLinkText: 'View on Manufacturer Site',
    regulatoryBody: {
      name: 'FSSAI (Food Safety and Standards Authority of India)',
      badge: 'FSSAI Lic. 10014064000435 Verified',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
      notes: 'FSSAI regulations mandate declared limits on trans fat (< 2%) and sodium labelling.',
    },
    dataConfidence: {
      score: 96,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts API & OCR Back-Label Table',
      notes: 'Values directly extracted from manufacturer declared packaging table.',
    },
    overallScore: 64,
    scoreLabel: 'Moderate',
    scoreDescription: 'High in sodium and refined carbohydrates. Consume occasionally.',
    checklist: {
      nutrition: false,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: true,
      healthImpact: false,
    },
    servingLabel: 'Per Serving (30 g)',
    servingSubtext: 'Per 100 g',
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 561, unit: 'kcal', dvPercent: 28, iconType: 'flame', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 56.4, unit: 'g', dvPercent: 22, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 1.8, unit: 'g', dvPercent: 2, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 35.2, unit: 'g', dvPercent: 50, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Saturated Fat', amount: 15.8, unit: 'g', dvPercent: 79, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 5.8, unit: 'g', dvPercent: 12, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 840, unit: 'mg', dvPercent: 42, iconType: 'salt', statusColor: 'rose' },
    ],
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 168, unit: 'kcal', dvPercent: 8.4, iconType: 'flame', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 16.9, unit: 'g', dvPercent: 6.5, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 10.6, unit: 'g', dvPercent: 15.1, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 1.74, unit: 'g', dvPercent: 3.5, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 252, unit: 'mg', dvPercent: 12.6, iconType: 'salt', statusColor: 'rose' },
    ],
    qualityMetrics: [
      { title: 'Packaging Seal', status: 'Good', subtitle: 'Hermetically nitrogen flushed', type: 'packaging', level: 'positive' },
      { title: 'Crispness Index', status: 'Excellent', subtitle: 'Normal moisture content', type: 'freshness', level: 'positive' },
      { title: 'Expiry Date', status: 'Valid', subtitle: 'Best before 6 months from manufacture', type: 'expiry', level: 'positive' },
      { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'Clean visual inspection', type: 'contaminants', level: 'positive' },
    ],
    healthImpacts: [
      { title: 'High Sodium Snack', description: 'Frequent excessive intake can elevate blood pressure (WHO guidelines).', type: 'high', tag: 'High Concern' },
      { title: 'Saturated Fats', description: 'Fried in palmolein oil, limiting daily intake is advised for heart health.', type: 'high', tag: 'High Concern' },
    ],
    quickVerdict: {
      title: 'Spicy packaged snack — enjoy in moderation',
      description: 'Ultra-processed savory snack with elevated sodium levels. Best as an occasional treat.',
      type: 'warning',
    },
    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron', amount: '1.2 mg', dvPercent: 8, colorClass: 'bg-fuchsia-600' },
      { code: 'B1', name: 'Thiamine', amount: '0.1 mg', dvPercent: 8, colorClass: 'bg-emerald-500' },
    ],
    ingredientsList: [
      { name: 'Rice Meal & Corn Meal', detail: 'Cereal flour base (48%)' },
      { name: 'Edible Vegetable Oil', detail: 'Palmolein oil' },
      { name: 'Spices & Condiments', detail: 'Chili powder, onion powder, coriander, garlic' },
      { name: 'Iodised Salt', detail: 'Refined salt' },
    ],
    recommendedPortion: { size: '30 g', detail: 'About 1 small bowl' },
    recommendedFrequency: { frequency: 'Occasional only', detail: 'Not recommended for daily consumption', caution: true },
  },

  'maggi-noodles': {
    id: 'maggi-noodles',
    name: 'Maggi 2-Minute Masala Noodles',
    subtitle: 'Nestlé India Ltd.',
    category: 'Packaged Snack',
    scope: 'global_packaged',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Instant Noodles', 'FSSAI Licensed', 'Iron Fortified'],
    primaryImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    thumbnails: ['https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80'],
    brand: 'Maggi',
    manufacturer: 'Nestlé India Limited',
    fssaiLicenceNo: '10012011000168',
    barcode: '8901058852230',
    netWeight: '70 g',
    categoryDetail: 'Instant Wheat Noodles with Masala Tastemaker',
    servingSize: '70 g (1 pack)',
    lastScanned: '10 Oct 2026, 01:15 PM',
    officialLink: 'https://www.maggi.in',
    officialLinkText: 'View on Manufacturer Site',
    regulatoryBody: {
      name: 'FSSAI (Food Safety and Standards Authority of India)',
      badge: 'FSSAI Lic. 10012011000168 Verified',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
    },
    dataConfidence: {
      score: 97,
      label: 'Verified Label Data',
      isEstimated: false,
      databaseSource: 'Open Food Facts & Brand Back-of-Pack Table',
      notes: 'Standard single-serve pack nutritional panel data.',
    },
    overallScore: 61,
    scoreLabel: 'Moderate',
    scoreDescription: 'Convenient instant noodle, but high in refined wheat (Maida) and sodium.',
    checklist: {
      nutrition: false,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: true,
      healthImpact: false,
    },
    servingLabel: 'Per Pack (70 g)',
    servingSubtext: 'Per 100 g',
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 427, unit: 'kcal', dvPercent: 21, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 63.5, unit: 'g', dvPercent: 24, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Sugars', amount: 2.2, unit: 'g', dvPercent: 2, iconType: 'sugar', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 15.7, unit: 'g', dvPercent: 22, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 6.8, unit: 'g', dvPercent: 34, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 8.0, unit: 'g', dvPercent: 16, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 1220, unit: 'mg', dvPercent: 61, iconType: 'salt', statusColor: 'rose' },
      { name: 'Dietary Fibre', amount: 3.6, unit: 'g', dvPercent: 14, iconType: 'leaf', statusColor: 'emerald' },
    ],
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 299, unit: 'kcal', dvPercent: 15, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: 44.5, unit: 'g', dvPercent: 17, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Total Fat', amount: 11.0, unit: 'g', dvPercent: 16, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Protein', amount: 5.6, unit: 'g', dvPercent: 11, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 854, unit: 'mg', dvPercent: 43, iconType: 'salt', statusColor: 'rose' },
    ],
    qualityMetrics: [
      { title: 'Tastemaker Sachet Seal', status: 'Good', subtitle: 'Intact moisture-proof pouch', type: 'packaging', level: 'positive' },
      { title: 'Noodle Cake Freshness', status: 'Good', subtitle: 'Normal dry texture', type: 'freshness', level: 'positive' },
      { title: 'Expiry Date', status: 'Valid', subtitle: '9 months from packaging date', type: 'expiry', level: 'positive' },
    ],
    healthImpacts: [
      { title: 'High Sodium Tastemaker', description: 'Single serving delivers over 40% of adult daily sodium allowance.', type: 'high', tag: 'High Concern' },
      { title: 'Refined Wheat Flour Base', description: 'High glycemic index carbohydrates with lower fibre.', type: 'moderate', tag: 'Moderate Concern' },
    ],
    quickVerdict: {
      title: 'Comfort food — balance with added vegetables',
      description: 'Best enjoyed with added fresh veggies (peas, carrots) and using half the tastemaker to lower sodium.',
      type: 'warning',
    },
    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron (Fortified)', amount: '3.7 mg', dvPercent: 26, colorClass: 'bg-fuchsia-600' },
      { code: 'Ca', name: 'Calcium', amount: '102 mg', dvPercent: 10, colorClass: 'bg-teal-500' },
    ],
    ingredientsList: [
      { name: 'Refined Wheat Flour (Maida)', detail: 'Noodle cake base (82%)' },
      { name: 'Palm Oil', detail: 'Edible vegetable oil' },
      { name: 'Tastemaker Spice Blend', detail: 'Hydrolysed groundnut protein, onion, garlic, coriander' },
      { name: 'Iodised Salt', detail: 'Flavor enhancer' },
    ],
    recommendedPortion: { size: '1 pack (70 g)', detail: 'Cooked with water' },
    recommendedFrequency: { frequency: '1–2 times a week max', detail: 'Moderate intake due to sodium', caution: true },
  },

  'amul-butter': {
    id: 'amul-butter',
    name: 'Amul Salted Butter',
    subtitle: 'Gujarat Co-operative Milk Marketing Federation (GCMMF)',
    category: 'Dairy Product',
    scope: 'global_packaged',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    verified: true,
    tags: ['Dairy Product', 'FSSAI Licensed', 'Pure Milk Fat'],
    primaryImage: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
    thumbnails: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80'],
    brand: 'Amul',
    manufacturer: 'GCMMF Ltd. Anand, Gujarat',
    fssaiLicenceNo: '10012021000071',
    barcode: '8901262010051',
    netWeight: '100 g',
    categoryDetail: 'Pasteurised Table Butter',
    servingSize: '10 g (1 cube)',
    lastScanned: '10 Oct 2026, 01:20 PM',
    officialLink: 'https://amul.com',
    officialLinkText: 'View Amul Product Range',
    regulatoryBody: {
      name: 'FSSAI (Food Safety and Standards Authority of India)',
      badge: 'FSSAI Lic. 10012021000071 Verified',
      countryCode: 'IN',
      flag: '🇮🇳',
      portalUrl: 'https://foscos.fssai.gov.in',
      verified: true,
    },
    dataConfidence: {
      score: 99,
      label: 'Verified Dairy Registry',
      isEstimated: false,
      databaseSource: 'Amul Certified Nutrition Panel & FSSAI Standards',
      notes: 'Minimum 80% milk fat compliance according to FSSAI butter guidelines.',
    },
    overallScore: 70,
    scoreLabel: 'Good in Moderation',
    scoreDescription: 'Pure dairy product rich in Vitamin A; use mindful portion sizes.',
    checklist: {
      nutrition: true,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: true,
      healthImpact: false,
    },
    servingLabel: 'Per Serving (10 g)',
    servingSubtext: 'Per 100 g',
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: 722, unit: 'kcal', dvPercent: 36, iconType: 'flame', statusColor: 'rose' },
      { name: 'Carbohydrates', amount: 0.0, unit: 'g', dvPercent: 0, iconType: 'wheat', statusColor: 'emerald' },
      { name: 'Total Fat', amount: 80.0, unit: 'g', dvPercent: 114, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Saturated Fat', amount: 51.0, unit: 'g', dvPercent: 255, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Protein', amount: 0.5, unit: 'g', dvPercent: 1, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Sodium', amount: 830, unit: 'mg', dvPercent: 41, iconType: 'salt', statusColor: 'rose' },
    ],
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: 72.2, unit: 'kcal', dvPercent: 3.6, iconType: 'flame', statusColor: 'amber' },
      { name: 'Total Fat', amount: 8.0, unit: 'g', dvPercent: 11.4, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Saturated Fat', amount: 5.1, unit: 'g', dvPercent: 25.5, iconType: 'droplet', statusColor: 'rose' },
      { name: 'Sodium', amount: 83, unit: 'mg', dvPercent: 4.1, iconType: 'salt', statusColor: 'emerald' },
    ],
    qualityMetrics: [
      { title: 'Cold Chain Compliance', status: 'Good', subtitle: 'Kept refrigerated at 4°C', type: 'preparation', level: 'positive' },
      { title: 'Color & Texture', status: 'Excellent', subtitle: 'Characteristic golden yellow churned butter', type: 'appearance', level: 'positive' },
      { title: 'Expiry Date', status: 'Valid', subtitle: 'Best before 12 months from manufacturing', type: 'expiry', level: 'positive' },
    ],
    healthImpacts: [
      { title: 'Natural Vitamin A Source', description: 'Essential for vision, immune function, and skin health.', type: 'positive', tag: 'Positive' },
      { title: 'High Saturated Animal Fat', description: 'Should be consumed in measured portions (10–15g/day).', type: 'moderate', tag: 'Moderate Concern' },
    ],
    quickVerdict: {
      title: 'Nutrient-rich traditional butter — enjoy in measured portions',
      description: 'Free from artificial colors; pure pasteurised butter.',
      type: 'positive',
    },
    vitaminsAndMinerals: [
      { code: 'A', name: 'Vitamin A', amount: '650 µg', dvPercent: 72, colorClass: 'bg-amber-500' },
      { code: 'D', name: 'Vitamin D', amount: '1.5 µg', dvPercent: 30, colorClass: 'bg-amber-500' },
    ],
    ingredientsList: [
      { name: 'Pasteurised Cream (Cow & Buffalo Milk)', detail: '80% milk fat' },
      { name: 'Common Salt', detail: '2.5% seasoning' },
      { name: 'Annatto (Natural Colour)', detail: 'Natural plant extract' },
    ],
    recommendedPortion: { size: '10 g (1 cube)', detail: 'Spread on roti or toast' },
    recommendedFrequency: { frequency: 'Daily in moderation', detail: 'Up to 10g daily for active adults' },
  },
};

/**
 * Helper to retrieve an existing food item or synthesize a high-quality FoodScanItem
 * for any custom user search query.
 */
export function getOrGenerateFoodItem(query: string): FoodScanItem {
  const trimmed = query.trim().toLowerCase();
  
  // Direct match from MOCK_FOODS
  const found = Object.values(MOCK_FOODS).find(
    (item) => item.name.toLowerCase().includes(trimmed) || item.id.toLowerCase() === trimmed
  );
  if (found) return found;

  // Synthesize realistic FoodScanItem for custom searched dish or product
  const isIndian = /thali|poha|roti|dal|sabzi|misal|idli|dosa|biryani|paneer|curd|samosa|chai|vada/i.test(query);
  const title = query.charAt(0).toUpperCase() + query.slice(1);

  return {
    id: `search-${Date.now()}`,
    name: title,
    subtitle: isIndian ? 'Indian Food Composition Assessment' : 'Global Food Composition Analysis',
    category: isIndian ? 'Cooked Canteen Meal' : 'Packaged Snack',
    scope: isIndian ? 'indian_meal' : 'global_packaged',
    countryOfOrigin: isIndian ? 'India' : 'International',
    countryFlag: isIndian ? '🇮🇳' : '🌍',
    verified: true,
    tags: [isIndian ? 'Indian Dish' : 'Packaged Food', 'AI Analyzed', 'FoodScan Verified'],
    primaryImage: isIndian 
      ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    thumbnails: [
      isIndian 
        ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80'
    ],
    brand: isIndian ? 'Traditional Indian Cuisine' : 'Brand / Food Producer',
    manufacturer: isIndian ? 'Prepared Fresh / Kitchen' : 'Consumer Packaged Goods',
    servingSize: isIndian ? '1 serving (approx. 250 g)' : '1 serving (40 g)',
    lastScanned: 'Just now (Instant Search)',
    regulatoryBody: {
      name: isIndian ? 'FSSAI Food Safety Standards' : 'Food & Drug Regulatory Authority',
      badge: 'FSSAI FoSCoS Aligned',
      countryCode: isIndian ? 'IN' : 'GLOBAL',
      flag: isIndian ? '🇮🇳' : '🌍',
      verified: true,
    },
    dataConfidence: {
      score: 85,
      label: 'AI-Generated Nutrient Estimate',
      isEstimated: true,
      databaseSource: isIndian ? 'ICMR–NIN Indian Food Composition Tables (IFCT)' : 'Open Food Facts Global Catalog',
      notes: `Automated nutrient and ingredient profile estimated for "${query}".`,
    },
    overallScore: isIndian ? 82 : 68,
    scoreLabel: isIndian ? 'Healthy' : 'Moderate',
    scoreDescription: isIndian ? 'Balanced nutrient profile with traditional preparation.' : 'Snack food with moderate energy density.',
    checklist: {
      nutrition: true,
      ingredients: true,
      fssaiLicence: true,
      qualityCheck: true,
      freshlyPrepared: isIndian,
      healthImpact: true,
    },
    servingLabel: isIndian ? 'Per Serving' : 'Per 100 g',
    servingSubtext: isIndian ? 'Estimated per typical plate' : 'Standard nutrition basis',
    nutritionPerServing: [
      { name: 'Energy (Calories)', amount: isIndian ? 340 : 185, unit: 'kcal', dvPercent: isIndian ? 17 : 9, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: isIndian ? 46.0 : 24.0, unit: 'g', dvPercent: isIndian ? 18 : 9, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Protein', amount: isIndian ? 9.5 : 3.5, unit: 'g', dvPercent: isIndian ? 19 : 7, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Total Fat', amount: isIndian ? 11.2 : 8.8, unit: 'g', dvPercent: isIndian ? 16 : 12, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Dietary Fibre', amount: isIndian ? 5.2 : 2.1, unit: 'g', dvPercent: isIndian ? 21 : 8, iconType: 'leaf', statusColor: 'emerald' },
      { name: 'Sodium (estimated)', amount: isIndian ? 420 : 310, unit: 'mg', dvPercent: isIndian ? 21 : 15, iconType: 'salt', statusColor: 'amber' },
    ],
    nutritionPer100g: [
      { name: 'Energy (Calories)', amount: isIndian ? 136 : 462, unit: 'kcal', dvPercent: 7, iconType: 'flame', statusColor: 'amber' },
      { name: 'Carbohydrates', amount: isIndian ? 18.4 : 60.0, unit: 'g', dvPercent: 7, iconType: 'wheat', statusColor: 'amber' },
      { name: 'Protein', amount: isIndian ? 3.8 : 8.7, unit: 'g', dvPercent: 8, iconType: 'protein', statusColor: 'emerald' },
      { name: 'Total Fat', amount: isIndian ? 4.5 : 22.0, unit: 'g', dvPercent: 6, iconType: 'droplet', statusColor: 'amber' },
      { name: 'Sodium', amount: isIndian ? 168 : 775, unit: 'mg', dvPercent: 8, iconType: 'salt', statusColor: 'amber' },
    ],
    qualityMetrics: [
      { title: 'Freshness Indicator', status: 'Good', subtitle: 'Normal sensory indicators', type: 'freshness', level: 'positive' },
      { title: 'Physical Appearance', status: 'Good', subtitle: 'Appetizing visual appearance', type: 'appearance', level: 'positive' },
      { title: 'Contaminants', status: 'Not detected', subtitle: 'No visible foreign items', type: 'contaminants', level: 'positive' },
    ],
    healthImpacts: [
      { title: 'Energy & Macronutrients', description: `Provides energy and essential nutrients suitable for regular diets.`, type: 'positive', tag: 'Positive' },
      { title: 'Mindful Portion Control', description: 'Monitor portion sizes according to your daily caloric needs.', type: 'moderate', tag: 'Moderate Concern' },
    ],
    quickVerdict: {
      title: `${title} Nutritional Overview`,
      description: 'Comprehensive nutrient breakdown estimated based on food composition databases.',
      type: 'positive',
    },
    vitaminsAndMinerals: [
      { code: 'Fe', name: 'Iron', amount: '2.4 mg', dvPercent: 17, colorClass: 'bg-fuchsia-600' },
      { code: 'Ca', name: 'Calcium', amount: '80 mg', dvPercent: 8, colorClass: 'bg-teal-500' },
      { code: 'B1', name: 'Thiamine', amount: '0.2 mg', dvPercent: 15, colorClass: 'bg-emerald-500' },
    ],
    ingredientsList: [
      { name: title, detail: 'Primary food ingredient' },
      { name: isIndian ? 'Traditional Spices & Seasoning' : 'Flavourings & Seasoning', detail: 'Natural components' },
    ],
    recommendedPortion: { size: isIndian ? '1 standard plate' : '1 single serving', detail: 'Standard balanced portion' },
    recommendedFrequency: { frequency: 'Normal dietary consumption', detail: 'Balanced diet guidelines' },
  };
}
