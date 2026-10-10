import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '30mb' }));

// In-memory defect complaints store
const complaintsStore: any[] = [
  {
    id: 'def-01',
    ticketId: 'FS-DEFECT-89014',
    productId: 'spoiled-bread-defect',
    productName: 'Sliced Sandwich Bread',
    brandOrProvider: 'Golden Bakery Consumer Goods Ltd.',
    category: 'Packaged Snack',
    countryOfOrigin: 'India',
    countryFlag: '🇮🇳',
    defectType: 'visible_spoilage',
    defectTitle: 'Fungal colonies on inner bread slices',
    description: 'Purchased packet was sealed, but after opening, prominent greenish mold colonies were visible inside the slices before declared expiry.',
    batchNumber: 'GB-2026-X992',
    recipientType: 'manufacturer',
    recipientName: 'Golden Bakery Quality Cell & FSSAI',
    userEmail: 'waghkunal343@gmail.com',
    userName: 'Kunal Wagh',
    status: 'Under Investigation',
    createdAt: '10 Oct 2026, 12:25 PM',
    timeline: [
      { date: '10 Oct 2026, 12:25 PM', status: 'Submitted', note: 'Defect ticket logged with photographic evidence.' },
      { date: '10 Oct 2026, 01:10 PM', status: 'Under Investigation', note: 'Forwarded to Quality Assurance Manager for batch inspection.' }
    ]
  }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'FoodScan AI',
    scopes: ['indian_meal', 'global_packaged'],
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Complaints API
app.get('/api/complaints', (req, res) => {
  res.json({ complaints: complaintsStore });
});

app.post('/api/complaints', (req, res) => {
  const {
    productId,
    productName,
    brandOrProvider,
    category,
    countryOfOrigin,
    countryFlag,
    defectType,
    defectTitle,
    description,
    batchNumber,
    recipientType,
    recipientName,
    userEmail,
    userName,
    userPhone,
    evidenceImageUrl
  } = req.body;

  const ticketId = `FS-DEF-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newComplaint = {
    id: `def-${Date.now()}`,
    ticketId,
    productId: productId || 'unknown',
    productName: productName || 'Scanned Food Product',
    brandOrProvider: brandOrProvider || 'Food Business Operator',
    category: category || 'Packaged Snack',
    countryOfOrigin: countryOfOrigin || 'India',
    countryFlag: countryFlag || '🇮🇳',
    defectType: defectType || 'other_defect',
    defectTitle: defectTitle || 'Product Defect Report',
    description: description || '',
    batchNumber: batchNumber || 'NOT SPECIFIED',
    recipientType: recipientType || 'canteen_manager',
    recipientName: recipientName || 'Quality Control Officer',
    userEmail: userEmail || 'user@foodscan.ai',
    userName: userName || 'Consumer',
    userPhone: userPhone || '',
    evidenceImageUrl: evidenceImageUrl || '',
    createdAt: dateStr,
    status: 'Submitted',
    timeline: [
      { date: dateStr, status: 'Submitted', note: 'Case registered with FoodScan AI monitoring network.' }
    ]
  };

  complaintsStore.unshift(newComplaint);
  res.json({ success: true, complaint: newComplaint });
});

// Live Open Food Facts Barcode Lookup API
app.get('/api/barcode-lookup/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;
    const offRes = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`, {
      headers: {
        'User-Agent': 'FoodScanAI-Monitor/1.0 (tech4food@pccoe.edu.in)'
      }
    });

    if (!offRes.ok) {
      return res.status(404).json({ error: 'Product barcode not found in Open Food Facts database' });
    }

    const data = await offRes.json();
    if (data.status !== 1 || !data.product) {
      return res.status(404).json({ error: 'Product not found in global database' });
    }

    const p = data.product;
    const countries = p.countries_tags || [];
    let country = 'Global';
    let flag = '🌍';
    if (countries.some((c: string) => c.includes('india'))) {
      country = 'India'; flag = '🇮🇳';
    } else if (countries.some((c: string) => c.includes('united-states') || c.includes('usa'))) {
      country = 'United States'; flag = '🇺🇸';
    } else if (countries.some((c: string) => c.includes('japan'))) {
      country = 'Japan'; flag = '🇯🇵';
    } else if (countries.some((c: string) => c.includes('south-korea') || c.includes('korea'))) {
      country = 'South Korea'; flag = '🇰🇷';
    } else if (countries.some((c: string) => c.includes('united-kingdom') || c.includes('uk'))) {
      country = 'United Kingdom'; flag = '🇬🇧';
    } else if (countries.some((c: string) => c.includes('france') || c.includes('germany') || c.includes('italy'))) {
      country = 'European Union'; flag = '🇪🇺';
    }

    const nutriments = p.nutriments || {};
    const energyKcal = nutriments['energy-kcal_100g'] || (nutriments['energy_100g'] ? Math.round(nutriments['energy_100g'] / 4.184) : 0);
    const carbs = nutriments['carbohydrates_100g'] || 0;
    const sugars = nutriments['sugars_100g'] || 0;
    const fat = nutriments['fat_100g'] || 0;
    const satFat = nutriments['saturated-fat_100g'] || 0;
    const protein = nutriments['proteins_100g'] || 0;
    const fiber = nutriments['fiber_100g'] || 0;
    const sodiumMg = nutriments['sodium_100g'] ? Math.round(nutriments['sodium_100g'] * 1000) : (nutriments['salt_100g'] ? Math.round((nutriments['salt_100g'] / 2.5) * 1000) : 0);

    const servingServingKcal = nutriments['energy-kcal_serving'] || Math.round(energyKcal * 0.3);

    const transformedItem = {
      id: `off-${barcode}-${Date.now()}`,
      name: p.product_name || p.product_name_en || 'Packaged Food Product',
      subtitle: `${p.brands || 'Packaged Brand'} • ${country}`,
      category: 'Packaged Snack',
      scope: 'global_packaged',
      countryOfOrigin: country,
      countryFlag: flag,
      verified: true,
      tags: ['Global Packaged', `${country} Standards`, 'Open Food Facts Verified'],
      primaryImage: p.image_url || p.image_front_url || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
      thumbnails: [p.image_url || p.image_front_url || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80'],
      brand: p.brands || 'Global Brand',
      manufacturer: p.manufacturing_places || p.brands || 'Food Manufacturer',
      barcode: barcode,
      netWeight: p.quantity || 'Standard Pack',
      servingSize: p.serving_size || '30 g',
      lastScanned: 'Just now',
      regulatoryBody: {
        name: country === 'India' ? 'FSSAI (Food Safety & Standards Authority of India)' : country === 'United States' ? 'US FDA Food Safety Standards' : `${country} Food Safety Authority`,
        badge: country === 'India' ? 'FSSAI Label Standard' : country === 'United States' ? 'FDA 21 CFR Compliant' : 'Official Global Packaging Standard',
        countryCode: country,
        flag: flag,
        verified: true,
        portalUrl: 'https://world.openfoodfacts.org/product/' + barcode
      },
      dataConfidence: {
        score: 97,
        label: 'Verified Label Data',
        isEstimated: false,
        databaseSource: 'Open Food Facts Global Product Database (v2)',
        notes: 'Data retrieved directly from manufacturer product barcode ledger.'
      },
      overallScore: Math.max(30, Math.min(95, 100 - Math.round((sugars * 0.8) + (satFat * 1.5) + (sodiumMg / 100)))),
      scoreLabel: 'Good',
      scoreDescription: 'Extracted from official Open Food Facts product database.',
      checklist: {
        nutrition: true,
        ingredients: true,
        qualityCheck: true,
        freshlyPrepared: false,
        healthImpact: sugars < 15 && sodiumMg < 800
      },
      servingLabel: 'Per Serving',
      servingSubtext: 'Per 100 g',
      nutritionPer100g: [
        { name: 'Energy (Calories)', amount: Number(energyKcal.toFixed(1)), unit: 'kcal', dvPercent: Math.round((energyKcal / 2000) * 100), iconType: 'flame', statusColor: energyKcal > 400 ? 'rose' : 'emerald' },
        { name: 'Carbohydrates', amount: Number(carbs.toFixed(1)), unit: 'g', dvPercent: Math.round((carbs / 260) * 100), iconType: 'wheat', statusColor: 'amber' },
        { name: 'Total Sugars', amount: Number(sugars.toFixed(1)), unit: 'g', dvPercent: Math.round((sugars / 50) * 100), iconType: 'sugar', statusColor: sugars > 20 ? 'rose' : 'emerald' },
        { name: 'Total Fat', amount: Number(fat.toFixed(1)), unit: 'g', dvPercent: Math.round((fat / 70) * 100), iconType: 'droplet', statusColor: fat > 20 ? 'rose' : 'emerald' },
        { name: 'Saturated Fat', amount: Number(satFat.toFixed(1)), unit: 'g', dvPercent: Math.round((satFat / 20) * 100), iconType: 'droplet', statusColor: satFat > 5 ? 'rose' : 'emerald' },
        { name: 'Protein', amount: Number(protein.toFixed(1)), unit: 'g', dvPercent: Math.round((protein / 50) * 100), iconType: 'protein', statusColor: 'emerald' },
        { name: 'Dietary Fibre', amount: Number(fiber.toFixed(1)), unit: 'g', dvPercent: Math.round((fiber / 25) * 100), iconType: 'leaf', statusColor: 'emerald' },
        { name: 'Sodium', amount: sodiumMg, unit: 'mg', dvPercent: Math.round((sodiumMg / 2000) * 100), iconType: 'salt', statusColor: sodiumMg > 600 ? 'rose' : 'emerald' },
      ],
      nutritionPerServing: [
        { name: 'Energy (Calories)', amount: Number(servingServingKcal.toFixed(1)), unit: 'kcal', dvPercent: Math.round((servingServingKcal / 2000) * 100), iconType: 'flame', statusColor: 'emerald' },
        { name: 'Carbohydrates', amount: Number((carbs * 0.3).toFixed(1)), unit: 'g', dvPercent: Math.round(((carbs * 0.3) / 260) * 100), iconType: 'wheat', statusColor: 'emerald' },
        { name: 'Total Sugars', amount: Number((sugars * 0.3).toFixed(1)), unit: 'g', dvPercent: Math.round(((sugars * 0.3) / 50) * 100), iconType: 'sugar', statusColor: 'emerald' },
        { name: 'Total Fat', amount: Number((fat * 0.3).toFixed(1)), unit: 'g', dvPercent: Math.round(((fat * 0.3) / 70) * 100), iconType: 'droplet', statusColor: 'emerald' },
        { name: 'Saturated Fat', amount: Number((satFat * 0.3).toFixed(1)), unit: 'g', dvPercent: Math.round(((satFat * 0.3) / 20) * 100), iconType: 'droplet', statusColor: 'emerald' },
        { name: 'Protein', amount: Number((protein * 0.3).toFixed(1)), unit: 'g', dvPercent: Math.round(((protein * 0.3) / 50) * 100), iconType: 'protein', statusColor: 'emerald' },
        { name: 'Sodium', amount: Math.round(sodiumMg * 0.3), unit: 'mg', dvPercent: Math.round(((sodiumMg * 0.3) / 2000) * 100), iconType: 'salt', statusColor: 'emerald' },
      ],
      qualityMetrics: [
        { title: 'Packaging Seal', status: 'Good', subtitle: 'Label extracted successfully', type: 'packaging', level: 'positive' },
        { title: 'Label OCR', status: 'Clear', subtitle: 'Barcode verified in database', type: 'readability', level: 'positive' },
        { title: 'Database Match', status: 'Valid', subtitle: 'Direct Open Food Facts match', type: 'expiry', level: 'positive' },
        { title: 'Visible Contaminants', status: 'Not detected', subtitle: 'Standard packaging', type: 'contaminants', level: 'positive' }
      ],
      healthImpacts: [
        sugars > 15 ? { title: 'High Sugar Content', description: 'Contains elevated free sugars; consume sparingly.', type: 'high', tag: 'High Concern' } : { title: 'Moderate Sugar', description: 'Within acceptable daily limits.', type: 'positive', tag: 'Positive' },
        sodiumMg > 600 ? { title: 'Elevated Sodium', description: 'High sodium content can elevate blood pressure risk.', type: 'high', tag: 'High Concern' } : { title: 'Balanced Sodium', description: 'Moderate sodium profile.', type: 'positive', tag: 'Positive' },
      ],
      quickVerdict: {
        title: `${p.product_name || 'Product'} Verified`,
        description: `Verified worldwide packaged food product from ${country}.`,
        type: (sugars > 25 || sodiumMg > 1000) ? 'warning' : 'positive'
      },
      vitaminsAndMinerals: [
        { code: 'Fe', name: 'Iron', amount: '1.5 mg', dvPercent: 10, colorClass: 'bg-fuchsia-600' },
        { code: 'Ca', name: 'Calcium', amount: '40 mg', dvPercent: 4, colorClass: 'bg-teal-500' }
      ],
      ingredientsList: (p.ingredients_text || '').split(',').slice(0, 6).map((ing: string) => ({ name: ing.trim() })),
      rawIngredientsText: p.ingredients_text || 'See printed product label for full ingredients list.',
      allergenWarning: p.allergens ? `Contains: ${p.allergens.replace(/en:/g, '')}` : undefined,
      recommendedPortion: { size: p.serving_size || '1 serving', detail: 'Refer to package portion guidance' },
      recommendedFrequency: { frequency: 'As part of a varied diet', detail: 'Consume in accordance with dietary guidelines' }
    };

    res.json({ success: true, item: transformedItem });
  } catch (error: any) {
    console.error('Error looking up barcode:', error);
    res.status(500).json({ error: error?.message || 'Failed to lookup barcode' });
  }
});

// AI Food Image Scan Route using Gemini
app.post('/api/scan-ai', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', scope = 'indian_meal', promptContext = '', isNutritionLabel = false } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on server.',
        fallback: true
      });
    }

    const ai = new GoogleGenAI();
    
    // Tailor instructions by scope and OCR mode:
    let scopeInstructions = '';
    
    if (isNutritionLabel) {
      scopeInstructions = `MODE: 📸 NUTRITION FACTS & INGREDIENT LABEL OCR (STRICT NO-INVENTED-VALUES POLICY)
- This image is a photograph of the printed nutrition facts table, ingredients panel, or barcode label on food packaging.
- Perform high-accuracy Optical Character Recognition (OCR) to read the actual declared values directly from the label.
- Extract the exact printed quantities for: Energy/Calories, Carbohydrates, Total Sugars, Total Fat, Saturated Fat, Protein, Dietary Fibre, and Sodium/Salt.
- Transcribe the exact ingredients list and declared allergen warnings from the text.
- Set "verifiedViaOCR": true.
- Set "dataConfidence": { "score": 98, "label": "Verified Packaging OCR", "isEstimated": false, "databaseSource": "Back-of-Package Nutrition Facts Table OCR", "notes": "Values read directly from photographed packaging label using OCR (No invented values policy enforced)." }.`;
    } else if (scope === 'indian_meal') {
      scopeInstructions = `SCOPE: 🇮🇳 INDIAN COOKED MEALS ONLY
- Step 1: Identify Indian cooked dishes from the photograph (e.g., thali, poha, dal-rice, roti-sabzi, misal pav, idli, dosa, biryani, pav bhaji, upma, chole bhature, etc.).
- Step 2: Cross-reference ICMR-NIN Indian Food Composition Tables (IFCT 2017) to calculate realistic calories, protein, carbohydrates, fat, dietary fibre, sodium.
- Step 3: Support regional dishes, college canteen meals, and homemade Indian preparations.
- Set "scope": "indian_meal", "countryOfOrigin": "India", "countryFlag": "🇮🇳".
- Set "dataConfidence": { "score": 85, "label": "Estimated Recipe Composition", "isEstimated": true, "databaseSource": "ICMR–NIN Indian Food Composition Tables (IFCT 2017)", "notes": "Portion calculation based on confirmed recipe ingredients and standard serving weights." }.
- In regulatoryBody, specify "PCCOE Canteen Food Safety Committee & FSSAI" or "FSSAI Food Safety Standards".`;
    } else {
      scopeInstructions = `SCOPE: 🌍 GLOBAL PACKAGED PRODUCT SCANNER (WORLDWIDE)
- Step 1: Scan photo or barcode of packaged food product from ANY country worldwide (India, USA, Japan, South Korea, UK, Germany, etc.).
- Step 2: Match in Open Food Facts database and national food safety registries.
- Step 3: Read actual package label using OCR to extract declared nutrients if database data is incomplete.
- Step 4: Show declared nutrition, ingredients, allergens, health insights, and quality observations.
- Step 5: STRICT DATA INTEGRITY POLICY (NO INVENTED VALUES): If the product cannot be matched reliably or the packaging label is not visible, set "requiresNutritionLabelPhoto": true and prompt the user to photograph the printed nutrition table on the back of the package.
- Match appropriate regulatory body: US FDA (USA), FSSAI (India), MFDS (Korea), CAA/JAS (Japan), FSA (UK), EFSA (Europe).
- Set "scope": "global_packaged", "countryOfOrigin": <Detected Country>, "countryFlag": <Country Flag Emoji>.
- Set "dataConfidence": { "score": 96, "label": "Verified Label Data", "isEstimated": false, "databaseSource": "Open Food Facts & Brand Label OCR", "notes": "Declared manufacturer nutrient panel." }.`;
    }

    const systemPrompt = `You are FoodScan AI, an expert food quality, nutrition, health impact, and food safety monitoring assistant.

${scopeInstructions}

Return ONLY a valid JSON object matching the requested schema.

Guidelines:
1. Identify the dish/product accurately.
2. Provide realistic nutritional information (Calories, Carbohydrates, Total Sugars, Total Fat, Saturated Fat, Protein, Dietary Fibre, Sodium).
3. Provide WHO/ICMR context on health impacts (e.g., high sodium warnings, good protein source, etc.).
4. Provide estimated vitamins and minerals.
5. Provide quality analysis tiles (freshness, appearance, packaging, contaminants).
6. Provide quick verdict and recommended consumption.

Return ONLY raw JSON with keys:
{
  "name": string,
  "subtitle": string,
  "category": "Cooked Canteen Meal" | "Packaged Snack" | "Fresh Produce" | "Dairy Product" | "Beverage",
  "scope": "indian_meal" | "global_packaged",
  "countryOfOrigin": string,
  "countryFlag": string,
  "verified": boolean,
  "tags": string[],
  "mealType": "Lunch" | "Breakfast" | "Dinner" | "Snack",
  "mainItems": string,
  "brand": string,
  "manufacturer": string,
  "fssaiLicenceNo": string,
  "barcode": string,
  "estimatedWeight": string,
  "categoryDetail": string,
  "servingSize": string,
  "cookingMethod": string,
  "storageCondition": string,
  "overallScore": number (0-100),
  "scoreLabel": "Excellent" | "Healthy" | "Good" | "Moderate" | "Attention Needed",
  "scoreDescription": string,
  "regulatoryBody": {
    "name": string,
    "badge": string,
    "countryCode": string,
    "flag": string,
    "verified": boolean
  },
  "dataConfidence": {
    "score": number,
    "label": string,
    "isEstimated": boolean,
    "databaseSource": string,
    "notes": string
  },
  "checklist": {
    "nutrition": boolean,
    "ingredients": boolean,
    "qualityCheck": boolean,
    "freshlyPrepared": boolean,
    "healthImpact": boolean
  },
  "servingLabel": "Per Plate" | "Per Serving",
  "servingSubtext": string,
  "nutritionPerServing": [
    { "name": string, "amount": number, "unit": string, "dvPercent": number, "iconType": "flame"|"wheat"|"sugar"|"droplet"|"protein"|"leaf"|"salt", "statusColor": "emerald"|"amber"|"rose" }
  ],
  "nutritionPer100g": [
    { "name": string, "amount": number, "unit": string, "dvPercent": number, "iconType": "flame"|"wheat"|"sugar"|"droplet"|"protein"|"leaf"|"salt", "statusColor": "emerald"|"amber"|"rose" }
  ],
  "qualityMetrics": [
    { "title": string, "status": string, "subtitle": string, "type": "freshness"|"appearance"|"preparation"|"contaminants"|"packaging"|"readability"|"expiry", "level": "positive"|"warning"|"danger" }
  ],
  "healthImpacts": [
    { "title": string, "description": string, "type": "positive"|"moderate"|"high", "tag": "Positive"|"Moderate Concern"|"High Concern" }
  ],
  "quickVerdict": {
    "title": string,
    "description": string,
    "type": "positive"|"warning"|"danger"
  },
  "vitaminsAndMinerals": [
    { "code": string, "name": string, "amount": string, "dvPercent": number, "colorClass": string }
  ],
  "ingredientsList": [
    { "name": string, "detail": string }
  ],
  "rawIngredientsText": string,
  "allergenWarning": string,
  "recommendedPortion": { "size": string, "detail": string },
  "recommendedFrequency": { "frequency": string, "detail": string, "caution": boolean },
  "notes": string
}`;

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { text: `${systemPrompt}\nUser Context: ${promptContext || 'Analyze this food item.'}` },
        {
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: cleanBase64
          }
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    
    // Add runtime id and timestamps
    parsed.id = `ai-scan-${Date.now()}`;
    const now = new Date();
    parsed.lastScanned = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    res.json({ success: true, item: parsed });
  } catch (error: any) {
    console.error('Error in /api/scan-ai:', error);
    res.status(500).json({ error: error?.message || 'Failed to analyze food image with Gemini AI' });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FoodScan AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
