import { SafetyAlert } from '../types/food';

export const SAFETY_ALERTS: SafetyAlert[] = [
  {
    id: 'alert-01',
    title: 'FSSAI Advisory: Limits on Total Polar Compounds (TPC) in Reheated Oils',
    type: 'warning',
    source: 'FSSAI FoSCoS',
    date: '08 Oct 2026',
    summary: 'All institutional canteens must ensure cooking oil Total Polar Compounds remain strictly below 25%. FoodScan AI monitoring logs integrated with canteen fryer sensors.',
    affectedProducts: ['Deep-fried canteen snacks', 'Farsan', 'Batata Vada'],
    actionRequired: 'Canteen managers must log TPM readings before lunch batch preparation.',
  },
  {
    id: 'alert-02',
    title: 'PCCOE Canteen Audit: 100% Water Quality & Reverse Osmosis Certification',
    type: 'info',
    source: 'PCCOE Canteen Committee',
    date: '10 Oct 2026',
    summary: 'Quarterly microbiological and heavy metal lab testing for canteen drinking water tanks completed with zero pathogen detected.',
    actionRequired: 'Safe for student drinking and cooking water use.',
  },
  {
    id: 'alert-03',
    title: 'Packaged Food Notice: Verify Expiry & Batch Code on Dairy Products',
    type: 'urgent',
    source: 'National Recall',
    date: '05 Oct 2026',
    summary: 'Advisory on verifying cold chain integrity for pasteurised milk and flavored yoghurts during high ambient temperatures.',
    affectedProducts: ['Dairy pouches', 'Pasteurised Paneer', 'Flavored Milk'],
    actionRequired: 'Scan packaging seal condition and check temperature stamp before consumption.',
  },
];
