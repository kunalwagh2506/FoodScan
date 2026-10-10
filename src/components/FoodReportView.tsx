import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  Flame, 
  Scale, 
  Calendar, 
  Maximize2, 
  Plus, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Leaf, 
  Droplet, 
  Wheat, 
  Sparkles,
  Info,
  Edit3,
  Trash2,
  ImageOff,
  RotateCcw
} from 'lucide-react';
import { FoodScanItem, NutrientItem } from '../types/food';

interface FoodReportViewProps {
  item: FoodScanItem;
  onOpenCanteenMenu?: () => void;
  onOpenDefectReport: (item: FoodScanItem) => void;
  onSelectPhotoAdd?: () => void;
  onUpdateItem?: (updatedItem: FoodScanItem) => void;
}

export const FoodReportView: React.FC<FoodReportViewProps> = ({
  item,
  onOpenCanteenMenu,
  onOpenDefectReport,
  onSelectPhotoAdd,
  onUpdateItem,
}) => {
  const [nutritionView, setNutritionView] = useState<'serving' | '100g'>('serving');
  const [activeImage, setActiveImage] = useState<string | null>(item.primaryImage);
  const [thumbnails, setThumbnails] = useState<string[]>(item.thumbnails || (item.primaryImage ? [item.primaryImage] : []));
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);
  const [previouslyDeletedImage, setPreviouslyDeletedImage] = useState<string | null>(null);

  // Sync state whenever product item changes
  useEffect(() => {
    setActiveImage(item.primaryImage || null);
    setThumbnails(item.thumbnails || (item.primaryImage ? [item.primaryImage] : []));
    setShowDeleteModal(false);
    setDeleteToast(null);
  }, [item.id, item.primaryImage]);

  const handleDeleteActiveImage = () => {
    if (!activeImage) return;
    const removedUrl = activeImage;
    setPreviouslyDeletedImage(removedUrl);
    const updatedThumbs = thumbnails.filter((t) => t !== removedUrl);
    setThumbnails(updatedThumbs);
    const nextImg = updatedThumbs.length > 0 ? updatedThumbs[0] : null;
    setActiveImage(nextImg);
    setShowDeleteModal(false);
    setDeleteToast('Image deleted successfully.');
    setTimeout(() => setDeleteToast(null), 5000);

    if (onUpdateItem) {
      onUpdateItem({
        ...item,
        primaryImage: nextImg || '',
        thumbnails: updatedThumbs,
      });
    }
  };

  const handleRestoreImage = () => {
    const toRestore = previouslyDeletedImage || item.primaryImage;
    if (!toRestore) return;
    const restoredThumbs = [...thumbnails, toRestore];
    setThumbnails(restoredThumbs);
    setActiveImage(toRestore);
    setDeleteToast(null);
    if (onUpdateItem) {
      onUpdateItem({
        ...item,
        primaryImage: toRestore,
        thumbnails: restoredThumbs,
      });
    }
  };

  // Pick active nutrition array
  const currentNutrients: NutrientItem[] =
    nutritionView === 'serving' ? item.nutritionPerServing : item.nutritionPer100g;

  // Icon selector for nutrient item
  const renderNutrientIcon = (iconType: NutrientItem['iconType'], colorClass?: string) => {
    switch (iconType) {
      case 'flame':
        return <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />;
      case 'wheat':
        return <Wheat className="w-4 h-4 text-amber-600" />;
      case 'sugar':
        return <Layers className="w-4 h-4 text-slate-400" />;
      case 'droplet':
        return <Droplet className="w-4 h-4 text-amber-500 fill-amber-500/30" />;
      case 'protein':
        return (
          <div className="w-4 h-4 rounded-sm bg-emerald-600/20 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
            P
          </div>
        );
      case 'leaf':
        return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'salt':
        return (
          <div className="w-4 h-4 rounded-sm bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-[10px]">
            Na
          </div>
        );
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  // Score circle calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (item.overallScore / 100) * circumference;

  const getScoreStrokeColor = (score: number) => {
    if (score >= 90) return 'stroke-emerald-500';
    if (score >= 75) return 'stroke-emerald-400';
    if (score >= 50) return 'stroke-amber-500';
    return 'stroke-rose-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 75) return 'text-emerald-700';
    if (score >= 50) return 'text-amber-700';
    return 'text-rose-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 3-Column Layout Matching Reference Images */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Food Image, Badges, Details & Actions       */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            
            {/* Primary Image or Deleted Placeholder */}
            {activeImage ? (
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group shadow-inner">
                <img
                  src={activeImage}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />

                {/* Category Pill on top-left of image */}
                <div className="absolute top-3 left-3 bg-emerald-600/95 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {item.category === 'Cooked Canteen Meal' ? 'Canteen Food' : item.category}
                </div>

                {/* Delete Image Button on Top-Right */}
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="absolute top-3 right-3 px-2.5 py-1.5 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg backdrop-blur-xs transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold cursor-pointer hover:scale-105 active:scale-95"
                  title="Delete this image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Image</span>
                </button>

                {/* Expand Image Button on Bottom-Right */}
                <button
                  type="button"
                  onClick={() => setIsImageZoomed(true)}
                  className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-xs transition-colors"
                  title="View full image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Image Deleted Placeholder State */
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-2.5">
                  <ImageOff className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-bold text-slate-800">Image Deleted</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  No image is currently attached to this product report.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onSelectPhotoAdd}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRestoreImage}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Image Thumbnails & Actions */}
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {thumbnails.map((thumb, idx) => (
                  <div key={idx} className="relative group/thumb">
                    <button
                      type="button"
                      onClick={() => setActiveImage(thumb)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === thumb ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={thumb} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                    {/* Remove individual thumbnail button on hover */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = thumbnails.filter((_, i) => i !== idx);
                        setThumbnails(updated);
                        if (activeImage === thumb) {
                          setActiveImage(updated.length > 0 ? updated[0] : null);
                        }
                      }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity shadow-xs text-[10px]"
                      title="Remove this photo"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={onSelectPhotoAdd}
                  className="w-14 h-14 rounded-lg border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-emerald-700 transition-colors"
                  title="Add photo to scan"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[9px] font-semibold">Add Photo</span>
                </button>
              </div>

              {/* Explicit Image Management Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {activeImage && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 rounded-xl border border-rose-200 font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Image</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onSelectPhotoAdd}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-200 font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{activeImage ? 'Replace Photo' : 'Upload Photo'}</span>
                </button>
              </div>
            </div>

            {/* Product Title & Subtitle */}
            <div className="mt-5">
              {/* Scope & Country Badge */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                {item.scope === 'indian_meal' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-900 border border-orange-200 text-[11px] font-bold">
                    <span>🇮🇳</span>
                    <span>Indian Meal Analyzer</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-bold">
                    <span>🌍</span>
                    <span>Global Packaged Scanner</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                  <span>{item.countryFlag}</span>
                  <span>{item.countryOfOrigin}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {item.name}
                </h1>
                {item.verified && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-600 text-white shrink-0" />
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{item.subtitle}</p>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {item.tags.map((tag, idx) => {
                  let style = 'bg-slate-100 text-slate-700 border-slate-200';
                  let hasCheck = false;
                  if (tag.toLowerCase().includes('cooked') || tag.toLowerCase().includes('packaged')) {
                    style = 'bg-sky-50 text-sky-700 border-sky-200/70 font-medium';
                  } else if (tag.toLowerCase().includes('veg') || tag.toLowerCase().includes('fssai') || tag.toLowerCase().includes('verified')) {
                    style = 'bg-emerald-50 text-emerald-700 border-emerald-200/70 font-medium';
                    hasCheck = true;
                  } else if (tag.toLowerCase().includes('balanced') || tag.toLowerCase().includes('healthy')) {
                    style = 'bg-amber-50 text-amber-800 border-amber-200/70 font-medium';
                  } else if (tag.toLowerCase().includes('defect') || tag.toLowerCase().includes('inspection')) {
                    style = 'bg-rose-50 text-rose-700 border-rose-200/70 font-medium';
                  }

                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${style}`}
                    >
                      {hasCheck && <Check className="w-3 h-3 stroke-[3]" />}
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Details Key-Value List */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm">
              {/* Country of Origin row */}
              <div className="flex items-start justify-between gap-3 text-slate-600">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  Country of Origin
                </span>
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <span>{item.countryFlag}</span>
                  <span>{item.countryOfOrigin}</span>
                </span>
              </div>

              {/* Regulatory Body row */}
              {item.regulatoryBody && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    Regulatory Standard
                  </span>
                  <span className="font-semibold text-emerald-800 text-right text-xs max-w-[190px]">
                    {item.regulatoryBody.badge}
                  </span>
                </div>
              )}
              {item.mealType && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    Meal Type
                  </span>
                  <span className="font-semibold text-slate-900 text-right">{item.mealType}</span>
                </div>
              )}

              {item.mainItems && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
                    <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                    Main Items
                  </span>
                  <span className="font-medium text-slate-800 text-right max-w-[200px]">
                    {item.mainItems}
                  </span>
                </div>
              )}

              {item.brand && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    Brand
                  </span>
                  <span className="font-semibold text-slate-900 text-right">{item.brand}</span>
                </div>
              )}

              {item.manufacturer && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    Manufacturer
                  </span>
                  <span className="font-medium text-slate-800 text-right max-w-[190px]">
                    {item.manufacturer}
                  </span>
                </div>
              )}

              {item.fssaiLicenceNo && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    FSSAI Licence No.
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-900 flex items-center gap-1">
                    {item.fssaiLicenceNo}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 text-white inline shrink-0" />
                  </span>
                </div>
              )}

              {item.barcode && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Scale className="w-4 h-4 text-slate-400 shrink-0" />
                    Barcode
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-900">{item.barcode}</span>
                </div>
              )}

              {item.estimatedWeight && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Scale className="w-4 h-4 text-slate-400 shrink-0" />
                    Estimated Weight
                  </span>
                  <span className="font-semibold text-slate-900">{item.estimatedWeight}</span>
                </div>
              )}

              {item.netWeight && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Scale className="w-4 h-4 text-slate-400 shrink-0" />
                    Net Weight
                  </span>
                  <span className="font-semibold text-slate-900">{item.netWeight}</span>
                </div>
              )}

              {item.categoryDetail && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                    Category
                  </span>
                  <span className="font-semibold text-slate-900">{item.categoryDetail}</span>
                </div>
              )}

              {item.servingSize && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Flame className="w-4 h-4 text-slate-400 shrink-0" />
                    Serving Size
                  </span>
                  <span className="font-semibold text-slate-900">{item.servingSize}</span>
                </div>
              )}

              {item.preparationTime && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    Preparation Time
                  </span>
                  <span className="font-medium text-slate-800 text-right">{item.preparationTime}</span>
                </div>
              )}

              {item.cookingMethod && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Flame className="w-4 h-4 text-slate-400 shrink-0" />
                    Cooking Method
                  </span>
                  <span className="font-medium text-slate-800 text-right">{item.cookingMethod}</span>
                </div>
              )}

              {item.storageCondition && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                    Storage Condition
                  </span>
                  <span className="font-semibold text-slate-900">{item.storageCondition}</span>
                </div>
              )}

              {item.lastScanned && (
                <div className="flex items-start justify-between gap-3 text-slate-600">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    Last Scanned
                  </span>
                  <span className="font-medium text-slate-700">{item.lastScanned}</span>
                </div>
              )}
            </div>

            {/* Official Link Button */}
            <div className="mt-5 space-y-2">
              {item.officialLink && (
                <button
                  onClick={onOpenCanteenMenu}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-sky-100/90 hover:bg-sky-200/90 text-sky-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  <span>{item.officialLinkText || 'View Canteen Menu Details'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}

              {/* Defect Complaint Button */}
              <button
                onClick={() => onOpenDefectReport(item)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-sm font-semibold rounded-xl border border-slate-200 hover:border-rose-200 transition-colors group"
              >
                <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
                <span>Report a Defect / Formal Complaint</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTER COLUMN: Meal Score, Nutrition Table, Quality & Health */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Overall Meal Score Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h2 className="text-base font-bold text-slate-800 tracking-tight mb-4">
              {item.category === 'Cooked Canteen Meal' ? 'Overall Meal Score' : 'Overall Rating'}
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              {/* Score Meter & Verdict */}
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-28 h-28 -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-slate-100"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r={radius}
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className={`${getScoreStrokeColor(item.overallScore)} transition-all duration-1000`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.overallScore}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 -mt-1">
                      /100
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <span className={`text-xl font-bold ${getScoreTextColor(item.overallScore)}`}>
                      {item.scoreLabel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-[210px] leading-snug">
                    {item.scoreDescription}
                  </p>
                </div>
              </div>

              {/* Checklist Badges on Right */}
              <div className="flex flex-col gap-2 shrink-0 self-center sm:self-auto border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                  <span>Nutrition</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                  <span>Ingredients</span>
                </div>
                {item.checklist.fssaiLicence && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                    <span>FSSAI Licence</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                  <span>Quality Check</span>
                </div>
                {item.checklist.freshlyPrepared && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                    <span>Freshly Prepared</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  {item.checklist.healthImpact ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 fill-amber-500 text-white" />
                  )}
                  <span>Health Impact</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Confidence & Source Card (Distinguishing Estimates vs Verified Labels & 5-Step Policy) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.dataConfidence.isEstimated 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.dataConfidence.isEstimated ? (
                    <Scale className="w-5 h-5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">
                      {item.dataConfidence.label}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.dataConfidence.isEstimated
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.dataConfidence.score}% Confidence
                    </span>
                    {item.verifiedViaOCR && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                        ✓ Package Label OCR
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700">Source: </span>
                    {item.dataConfidence.databaseSource}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {item.dataConfidence.notes}
                  </div>
                </div>
              </div>

              {/* Action Button: Photograph Nutrition Label (Step 3 & 5) */}
              <button
                type="button"
                onClick={onSelectPhotoAdd}
                className="self-stretch sm:self-auto px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="Photograph packaging nutrition table to verify via OCR"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Snap Nutrition Label (OCR)</span>
              </button>
            </div>

            {/* 5-Step Scanning Protocol Guarantee Badge */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>No-Invented-Values Policy:</strong> If product is unverified, user is prompted for label photo.</span>
              </span>
            </div>
          </div>

          {/* 2. Nutritional Information Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Nutritional Information <span className="text-xs font-normal text-slate-500">(Estimated)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {nutritionView === 'serving' ? item.servingSubtext : 'Per 100 g (approx.)'}
                </p>
              </div>

              {/* Toggle Segment Per Plate / Per 100 g */}
              <div className="inline-flex p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setNutritionView('serving')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    nutritionView === 'serving'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.servingLabel}
                </button>
                <button
                  onClick={() => setNutritionView('100g')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    nutritionView === '100g'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Per 100 g
                </button>
              </div>
            </div>

            {/* Nutrients List Rows */}
            <div className="space-y-3">
              {currentNutrients.map((nutrient, idx) => {
                // Color bar depending on status
                let barColor = 'bg-emerald-500';
                if (nutrient.statusColor === 'amber') barColor = 'bg-amber-500';
                if (nutrient.statusColor === 'rose') barColor = 'bg-rose-500';

                return (
                  <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                    {/* Nutrient Icon & Label */}
                    <div className="flex items-center gap-2.5 w-40 sm:w-44 shrink-0">
                      {renderNutrientIcon(nutrient.iconType)}
                      <span className="text-slate-700 font-medium truncate">{nutrient.name}</span>
                    </div>

                    {/* Amount */}
                    <div className="font-bold text-slate-900 tabular-nums w-20 text-right shrink-0">
                      {nutrient.amount} <span className="text-[11px] font-normal text-slate-500">{nutrient.unit}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 max-w-[120px] h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${Math.min(nutrient.dvPercent, 100)}%` }}
                      ></div>
                    </div>

                    {/* % DV */}
                    <div className="text-[11px] font-semibold text-slate-500 tabular-nums w-10 text-right">
                      {nutrient.dvPercent}%
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nutrition Footnote */}
            <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
              {item.notes || '% Daily Value (DV) is based on a 2000 kcal diet (WHO/ICMR guidelines). Values are estimates based on typical Indian canteen recipes and portion sizes.'}
            </p>
          </div>

          {/* 3. Quality Analysis (Image + Canteen Data) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Quality Analysis <span className="text-xs font-normal text-slate-500">({item.category === 'Cooked Canteen Meal' ? 'Image + Canteen Data' : 'Image + Label'})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {item.qualityMetrics.map((qm, idx) => {
                const isPositive = qm.level === 'positive';
                const isWarning = qm.level === 'warning';
                const isDanger = qm.level === 'danger';

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      isDanger
                        ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                        : isWarning
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/40 border-emerald-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {isDanger ? (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white shrink-0" />
                      )}
                      <span className="text-xs font-semibold truncate">{qm.title}</span>
                    </div>

                    <div>
                      <div className={`text-sm font-bold ${
                        isDanger ? 'text-rose-700' : isWarning ? 'text-amber-700' : 'text-emerald-700'
                      }`}>
                        {qm.status}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                        {qm.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Health Impact Analysis */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2 mb-4">
              <span className="text-rose-500">❤️</span>
              Health Impact Analysis
            </h2>

            <div className="space-y-3">
              {item.healthImpacts.map((hi, idx) => {
                const isHigh = hi.type === 'high';
                const isMod = hi.type === 'moderate';

                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100"
                  >
                    <div className="flex items-start gap-2.5">
                      {isHigh ? (
                        <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      ) : isMod ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white mt-0.5 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {hi.title}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {hi.description}
                        </p>
                      </div>
                    </div>

                    {/* Status Tag */}
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800'
                          : isMod
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {hi.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Quick Verdict, Vitamins, Ingredients & Portions */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* 1. Quick Verdict Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {item.quickVerdict.type === 'danger' ? (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              ) : item.quickVerdict.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" />
              )}
              <span>Quick Verdict</span>
            </div>

            <div className={`text-base font-bold ${
              item.quickVerdict.type === 'danger'
                ? 'text-rose-700'
                : item.quickVerdict.type === 'warning'
                ? 'text-amber-700'
                : 'text-emerald-700'
            }`}>
              {item.quickVerdict.title}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {item.quickVerdict.description}
            </p>
          </div>

          {/* 2. Vitamins & Minerals Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <span className="text-sky-600">💧</span>
                Vitamins &amp; Minerals <span className="text-xs font-normal text-slate-400">(Estimated)</span>
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              {item.servingSubtext}
            </p>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {item.vitaminsAndMinerals.map((vm, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full ${vm.colorClass} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                      {vm.code}
                    </span>
                    <span className="font-medium text-slate-700 truncate max-w-[120px]">{vm.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 tabular-nums">{vm.amount}</span>
                    <span className="font-bold text-emerald-600 text-[11px] tabular-nums w-8 text-right">{vm.dvPercent}%</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 pt-2 text-[10px] text-slate-400 border-t border-slate-100">
              Note: Values are estimated based on verified food composition databases (ICMR-NIN / USDA / Open Food Facts).
            </p>
          </div>

          {/* 3. Ingredients (Detected / Entered) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-blue-600" />
              Ingredients <span className="text-xs font-normal text-slate-400">(Detected / Entered)</span>
            </h2>

            {item.ingredientsList && item.ingredientsList.length > 0 && (
              <div className="grid grid-cols-3 gap-2.5 text-center">
                {item.ingredientsList.map((ing, idx) => (
                  <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 mb-1.5 shadow-inner">
                      {ing.imageUrl ? (
                        <img src={ing.imageUrl} alt={ing.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-800 font-bold text-xs">
                          {ing.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{ing.name}</span>
                    {ing.detail && (
                      <span className="text-[10px] text-slate-400 line-clamp-1">{ing.detail}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {item.rawIngredientsText && (
              <div className="mt-3 p-2.5 rounded-lg bg-slate-50 text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Ingredients (as per label): </span>
                {item.rawIngredientsText}
              </div>
            )}

            {/* Allergen Warning Box if present */}
            {item.allergenWarning && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold">Allergen Information: </span>
                  {item.allergenWarning}
                </div>
              </div>
            )}
          </div>

          {/* 4. Recommended Consumption */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Recommended Consumption
            </h2>

            {/* Suitable Portion Size */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                  Suitable Portion Size
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {item.recommendedPortion.size}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {item.recommendedPortion.detail}
                </div>
              </div>
            </div>

            {/* Recommended Frequency */}
            <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              item.recommendedFrequency.caution
                ? 'bg-rose-50/70 border-rose-100 text-rose-900'
                : 'bg-rose-50/40 border-rose-100 text-slate-900'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                item.recommendedFrequency.caution ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                  Recommended Frequency
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {item.recommendedFrequency.frequency}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {item.recommendedFrequency.detail}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Image Modal */}
      {isImageZoomed && activeImage && (
        <div
          onClick={() => setIsImageZoomed(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={activeImage}
              alt="Enlarged Food"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 bg-white/90 text-slate-900 px-3 py-1.5 rounded-full font-bold text-xs"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* Delete Image Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Product Image?</h3>
                <p className="text-xs text-slate-500">This will remove the photo from this report</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 my-3 leading-relaxed">
              Are you sure you want to delete this photo from the FoodScan AI report for{' '}
              <strong className="text-slate-900">{item.name}</strong>? You can restore the photo or upload a replacement at any time.
            </p>

            {activeImage && (
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 my-3 mx-auto">
                <img src={activeImage} alt="To delete" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteActiveImage}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Toast Notification */}
      {deleteToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5">
          <span>{deleteToast}</span>
          <button
            onClick={handleRestoreImage}
            className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};
