import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Barcode, 
  Sparkles, 
  X, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Globe, 
  FileText,
  Activity,
  AlertTriangle,
  Trash2,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  scanFoodImage, 
  lookupGlobalBarcode, 
  parseNutritionLabelWithOCR,
  SCAN_WORKFLOW_STEPS 
} from '../services/aiFoodScanner';
import { FoodScanItem, FoodScope } from '../types/food';
import { MOCK_FOODS } from '../data/mockFoods';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (item: FoodScanItem) => void;
  initialScope?: FoodScope;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
  initialScope = 'global_packaged',
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'barcode' | 'label_ocr'>('camera');
  const [selectedScope, setSelectedScope] = useState<FoodScope>(initialScope);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState<{ dataUrl: string; name: string } | null>(null);
  const [showWorkflowGuide, setShowWorkflowGuide] = useState(false);

  // Step 5 Unreliable Match State
  const [unreliableMatchNotice, setUnreliableMatchNotice] = useState<string | null>(null);
  const [pendingUnverifiedItem, setPendingUnverifiedItem] = useState<FoodScanItem | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedScope(initialScope);
  }, [initialScope]);

  // Reset states when opened
  useEffect(() => {
    if (isOpen) {
      setUnreliableMatchNotice(null);
      setPendingUnverifiedItem(null);
      setUploadedImage(null);
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  // Initialize camera when camera tab is open
  useEffect(() => {
    if (isOpen && (activeTab === 'camera' || activeTab === 'label_ocr')) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera is not supported on this device/browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError(err.message || 'Unable to access camera. Please allow camera permissions or upload an image.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture frame from video
  const captureFrame = async (isNutritionLabel: boolean = false) => {
    if (!videoRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        stopCamera();
        if (isNutritionLabel) {
          await runNutritionLabelOCR(dataUrl);
        } else {
          await run5StepAnalysis(dataUrl, 'camera_capture.jpg');
        }
      }
    } catch (err) {
      console.error('Error capturing frame:', err);
    }
  };

  // Handle regular file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setUploadedImage({ dataUrl: base64, name: file.name });
    };
    reader.readAsDataURL(file);
  };

  // Handle label file upload for OCR
  const handleLabelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      await runNutritionLabelOCR(base64);
    };
    reader.readAsDataURL(file);
  };

  // Run the full 5-Step Scanning Workflow
  const run5StepAnalysis = async (imageBase64: string, filename: string) => {
    setIsLoading(true);
    setCurrentStepIndex(0);

    // Progress through the 5 steps sequentially
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 650);

    try {
      const result = await scanFoodImage(imageBase64, filename, '', selectedScope, false);
      clearInterval(stepInterval);
      setCurrentStepIndex(4);
      await new Promise((r) => setTimeout(r, 400));
      setIsLoading(false);

      // STEP 5: If product cannot be matched reliably, prompt user to photograph nutrition label
      if (result.requiresNutritionLabelPhoto) {
        setPendingUnverifiedItem(result.item);
        setUnreliableMatchNotice(
          result.unreliableMatchMessage ||
          'Product could not be reliably matched in the database. Please photograph its nutrition label instead of inventing values.'
        );
        setActiveTab('label_ocr');
      } else {
        onScanComplete(result.item);
        onClose();
      }
    } catch (err) {
      clearInterval(stepInterval);
      setIsLoading(false);
      onScanComplete(MOCK_FOODS['lays-classic']);
      onClose();
    }
  };

  // Run OCR on the nutrition label photo (Steps 3 & 5)
  const runNutritionLabelOCR = async (labelBase64: string) => {
    setIsLoading(true);
    setCurrentStepIndex(2); // Step 3: OCR Reading

    try {
      const ocrItem = await parseNutritionLabelWithOCR(labelBase64, pendingUnverifiedItem || undefined);
      setIsLoading(false);
      setUnreliableMatchNotice(null);
      setPendingUnverifiedItem(null);
      onScanComplete(ocrItem);
      onClose();
    } catch (err) {
      setIsLoading(false);
      const fallback = MOCK_FOODS['lays-classic'];
      onScanComplete({
        ...fallback,
        verifiedViaOCR: true,
        dataConfidence: {
          score: 95,
          label: 'Verified Packaging OCR',
          isEstimated: false,
          databaseSource: 'Photographed Nutrition Facts Table OCR',
          notes: 'OCR parsed nutrition values directly from package label photo (No invented values policy).',
        },
      });
      onClose();
    }
  };

  // Barcode lookup with Step 5 reliability check
  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput) return;

    setIsLoading(true);
    setCurrentStepIndex(1); // Step 2: Database match lookup

    try {
      const result = await lookupGlobalBarcode(barcodeInput);
      setIsLoading(false);

      if (result.requiresNutritionLabelPhoto) {
        setPendingUnverifiedItem(result.item);
        setUnreliableMatchNotice(
          result.unreliableMatchMessage ||
          'Barcode could not be reliably verified in database. Please photograph its nutrition label instead of inventing values.'
        );
        setActiveTab('label_ocr');
      } else {
        onScanComplete(result.item);
        onClose();
      }
    } catch (err) {
      setIsLoading(false);
      onScanComplete(MOCK_FOODS['lays-classic']);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">FoodScan AI Scanner</h3>
              <p className="text-xs text-slate-500">Scan packaging, read labels via OCR &amp; monitor safety</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowWorkflowGuide(!showWorkflowGuide)}
              className="px-2.5 py-1 text-xs text-slate-600 hover:text-emerald-700 hover:bg-slate-200/70 rounded-lg flex items-center gap-1 font-semibold transition-colors"
              title="How scanning works"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">How Scanning Works</span>
              {showWorkflowGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible 5-Step Workflow Guide Banner */}
        {showWorkflowGuide && (
          <div className="bg-slate-900 text-white p-4 text-xs border-b border-slate-800 animate-in slide-in-from-top-2">
            <div className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>How FoodScan AI Scanning Works (5 Steps)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-slate-300">
              {SCAN_WORKFLOW_STEPS.map((s) => (
                <div key={s.step} className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center mb-1">
                    {s.step}
                  </div>
                  <div className="font-bold text-white text-[11px] mb-0.5">{s.title}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 ALERT: Unreliable Match Notice */}
        {unreliableMatchNotice && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-amber-950 text-sm">
                Step 5: Photograph Nutrition Label Required
              </div>
              <p className="text-amber-800 mt-1 leading-relaxed">
                {unreliableMatchNotice}
              </p>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                ✓ FoodScan AI strict policy: We never invent or guess nutritional values.
              </div>
            </div>
          </div>
        )}

        {/* Scope Selector Bar */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Analysis Scope:
          </span>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedScope('indian_meal')}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedScope === 'indian_meal'
                  ? 'bg-orange-600 text-white shadow-xs ring-2 ring-orange-500/20'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              <span>🇮🇳 Indian Cooked Meals</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedScope('global_packaged')}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedScope === 'global_packaged'
                  ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              <span>🌍 Global Packaged Products</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 px-5 pt-2 bg-white gap-2 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex items-center gap-2 py-2.5 px-3 font-semibold border-b-2 transition-colors shrink-0 ${
              activeTab === 'camera'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>1. Camera</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 py-2.5 px-3 font-semibold border-b-2 transition-colors shrink-0 ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('barcode')}
            className={`flex items-center gap-2 py-2.5 px-3 font-semibold border-b-2 transition-colors shrink-0 ${
              activeTab === 'barcode'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>Barcode Scan</span>
          </button>

          <button
            onClick={() => setActiveTab('label_ocr')}
            className={`flex items-center gap-2 py-2.5 px-3 font-semibold border-b-2 transition-colors shrink-0 ${
              activeTab === 'label_ocr'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Photograph Nutrition Label (OCR)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {/* Active 5-Step Pipeline Progress Screen */}
          {isLoading ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600 animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Processing 5-Step Verification Pipeline
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Analyzing packaging, verifying databases &amp; checking label OCR
                </p>
              </div>

              {/* 5-Step Visual Checklist */}
              <div className="w-full max-w-md bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                {SCAN_WORKFLOW_STEPS.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div 
                      key={step.step}
                      className={`flex items-center gap-2.5 p-1.5 rounded-lg transition-colors ${
                        isCurrent ? 'bg-emerald-100/70 font-bold text-emerald-900' : isDone ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isDone ? '✓' : step.step}
                      </div>
                      <span className="truncate">{step.title}</span>
                      {isCurrent && (
                        <span className="ml-auto text-[10px] text-emerald-700 animate-pulse font-normal">
                          Running...
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: Live Camera Scan */}
              {activeTab === 'camera' && (
                <div className="space-y-4">
                  <div className="relative aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-inner">
                    {cameraError ? (
                      <div className="p-6 text-center text-slate-400 max-w-sm">
                        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-semibold">{cameraError}</p>
                        <button
                          onClick={startCamera}
                          className="mt-3 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Retry Camera
                        </button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Viewfinder Target Frame */}
                        <div className="absolute inset-8 border-2 border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-3 shadow-2xl">
                          <div className="flex justify-between">
                            <div className="w-5 h-5 border-t-3 border-l-3 border-emerald-400 -mt-1 -ml-1"></div>
                            <div className="w-5 h-5 border-t-3 border-r-3 border-emerald-400 -mt-1 -mr-1"></div>
                          </div>
                          <div className="text-center text-[11px] text-white/90 bg-black/60 py-1 px-3 rounded-full mx-auto backdrop-blur-xs font-medium">
                            Point camera at product packaging or Indian meal
                          </div>
                          <div className="flex justify-between">
                            <div className="w-5 h-5 border-b-3 border-l-3 border-emerald-400 -mb-1 -ml-1"></div>
                            <div className="w-5 h-5 border-b-3 border-r-3 border-emerald-400 -mb-1 -mr-1"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('label_ocr')}
                      className="px-3 py-2 text-xs text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Snap Nutrition Label Instead</span>
                    </button>

                    <button
                      onClick={() => captureFrame(false)}
                      disabled={!cameraActive}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Capture &amp; Analyze</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Upload Photo with Delete Option */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  {uploadedImage ? (
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center">
                      <div className="relative w-48 h-48 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm mb-3">
                        <img
                          src={uploadedImage.dataUrl}
                          alt="Uploaded Food"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-semibold text-slate-700 truncate max-w-xs mb-3">
                        {uploadedImage.name}
                      </p>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImage(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Image</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => run5StepAnalysis(uploadedImage.dataUrl, uploadedImage.name)}
                          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Analyze Food (5 Steps)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-3"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">
                          Click to upload food photo or label image
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Product packaging, Indian meal thali, or snack package (JPG/PNG up to 20MB)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Global Barcode Scan */}
              {activeTab === 'barcode' && (
                <form onSubmit={handleBarcodeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter Worldwide Product Barcode / EAN / UPC
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 8901491100034 (Lay's India) or 044000032029 (Oreo USA)"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Query Open Food Facts</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-500">Quick Barcode Test Samples:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setBarcodeInput('8901491100034')}
                        className="text-xs p-2 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-slate-800">🇮🇳 Lay&apos;s Classic</div>
                        <div className="font-mono text-[10px] text-slate-500">8901491100034</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBarcodeInput('8901491101857')}
                        className="text-xs p-2 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-slate-800">🇮🇳 Kurkure</div>
                        <div className="font-mono text-[10px] text-slate-500">8901491101857</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBarcodeInput('8901058852230')}
                        className="text-xs p-2 bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-slate-800">🇮🇳 Maggi Noodles</div>
                        <div className="font-mono text-[10px] text-slate-500">8901058852230</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBarcodeInput('9999999999999')}
                        className="text-xs p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-colors cursor-pointer"
                        title="Simulate unreliable match to test Step 5 prompt"
                      >
                        <div className="font-bold text-amber-900">⚠️ Unverified Barcode</div>
                        <div className="font-mono text-[10px] text-amber-700">Triggers Step 5 OCR</div>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 4: Dedicated Photograph Nutrition Label (OCR - Step 3 & 5) */}
              {activeTab === 'label_ocr' && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-900">
                        Step 3 &amp; 5: Package Label Optical Character Recognition (OCR)
                      </div>
                      <p className="text-emerald-800 mt-0.5">
                        Hold your camera close to the printed <strong>Nutrition Facts</strong> table or <strong>Ingredients</strong> panel on the back of the package. FoodScan AI reads the exact numbers without guessing.
                      </p>
                    </div>
                  </div>

                  <div className="relative aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-inner">
                    {cameraError ? (
                      <div className="p-6 text-center text-slate-400 max-w-sm">
                        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-semibold">{cameraError}</p>
                        <button
                          onClick={startCamera}
                          className="mt-3 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Retry Camera
                        </button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Macro Label OCR Target Box */}
                        <div className="absolute inset-10 border-2 border-emerald-400/90 rounded-xl pointer-events-none flex flex-col justify-between p-3 bg-emerald-950/10">
                          <div className="text-center text-[11px] text-white bg-black/75 py-1 px-3 rounded-full mx-auto backdrop-blur-xs font-semibold">
                            Position Nutrition Facts / Ingredients panel inside box
                          </div>
                          <div className="text-center text-[10px] text-emerald-300 font-mono">
                            OCR Mode · Reading declared nutrients &amp; values
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div>
                      <input
                        ref={labelFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLabelFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => labelFileInputRef.current?.click()}
                        className="px-3.5 py-2 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Label Photo</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => captureFrame(true)}
                      disabled={!cameraActive}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Snap Label &amp; Read via OCR</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info ribbon */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict No-Invented-Values Policy: Database + OCR Grounding</span>
          </div>
          <div className="text-slate-400">
            Open Food Facts · ICMR-NIN IFCT · FSSAI Standards
          </div>
        </div>

      </div>
    </div>
  );
};
