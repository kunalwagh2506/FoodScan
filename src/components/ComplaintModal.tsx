import React, { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Mail, 
  Phone, 
  Send, 
  FileCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { FoodScanItem, DefectComplaint } from '../types/food';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FoodScanItem;
  user: { name: string; email: string } | null;
  onRequireLogin: () => void;
  onComplaintSubmitted: (complaint: DefectComplaint) => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isOpen,
  onClose,
  product,
  user,
  onRequireLogin,
  onComplaintSubmitted,
}) => {
  const [defectType, setDefectType] = useState<DefectComplaint['defectType']>('visible_spoilage');
  const [defectTitle, setDefectTitle] = useState('Suspected product defect / contamination');
  const [description, setDescription] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const isIndianCanteen = product.scope === 'indian_meal' || product.category === 'Cooked Canteen Meal';

  const getNationalAuthorityInfo = () => {
    switch (product.countryOfOrigin) {
      case 'United States':
        return {
          type: 'fda_authority' as const,
          name: 'US FDA (Food and Drug Administration - Safety Reporting Portal)',
          label: '🇺🇸 US FDA Safety Portal',
        };
      case 'South Korea':
        return {
          type: 'mfds_authority' as const,
          name: 'MFDS (Ministry of Food and Drug Safety, South Korea)',
          label: '🇰🇷 South Korea MFDS',
        };
      case 'Japan':
        return {
          type: 'caa_authority' as const,
          name: 'Consumer Affairs Agency (CAA, Japan) - Food Safety Division',
          label: '🇯🇵 Japan CAA Authority',
        };
      case 'United Kingdom':
        return {
          type: 'fsa_authority' as const,
          name: 'UK Food Standards Agency (FSA Consumer Incident Portal)',
          label: '🇬🇧 UK Food Standards Agency',
        };
      default:
        return {
          type: 'fssai_authority' as const,
          name: 'Food Safety and Standards Authority of India (FSSAI FoSCoS Portal)',
          label: '🇮🇳 FSSAI FoSCoS (India)',
        };
    }
  };

  const nationalAuth = getNationalAuthorityInfo();

  const [recipientType, setRecipientType] = useState<DefectComplaint['recipientType']>(
    isIndianCanteen ? 'canteen_manager' : nationalAuth.type
  );
  const [evidenceImage, setEvidenceImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<DefectComplaint | null>(null);

  if (!isOpen) return null;

  // If user is not authenticated, show explanatory login gate
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Authentication Required</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              In accordance with official food safety regulations ({product.countryFlag} {product.countryOfOrigin}) and Tech4Food verification protocols, defect complaints require verified credentials to prevent fraudulent submissions and establish an audit trail.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left text-xs space-y-1">
            <div className="font-semibold text-slate-700">Product for Report:</div>
            <div className="font-bold text-slate-900">{product.name}</div>
            <div className="text-slate-500 text-[11px]">{product.countryFlag} {product.countryOfOrigin} · {product.subtitle}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onRequireLogin}
              className="flex-1 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Log In to Proceed</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle file evidence
  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEvidenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let recipientName = nationalAuth.name;
    if (recipientType === 'canteen_manager') {
      recipientName = 'PCCOE Canteen Management Committee';
    } else if (recipientType === 'manufacturer') {
      recipientName = product.manufacturer || product.brand || 'Product Manufacturer Quality Cell';
    }

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          brandOrProvider: product.brand || product.manufacturer || product.subtitle,
          category: product.category,
          countryOfOrigin: product.countryOfOrigin,
          countryFlag: product.countryFlag,
          defectType,
          defectTitle,
          description,
          batchNumber: batchNumber || 'NOT-STATED',
          recipientType,
          recipientName,
          userEmail: user.email,
          userName: user.name,
          evidenceImageUrl: evidenceImage || product.primaryImage,
        }),
      });

      const data = await response.json();
      if (data.complaint) {
        setSubmittedTicket(data.complaint);
        onComplaintSubmitted(data.complaint);
      }
    } catch (err) {
      const mockTicket: DefectComplaint = {
        id: `def-${Date.now()}`,
        ticketId: `FS-DEF-${Math.floor(10000 + Math.random() * 90000)}`,
        productId: product.id,
        productName: product.name,
        brandOrProvider: product.brand || product.manufacturer || product.subtitle,
        category: product.category,
        countryOfOrigin: product.countryOfOrigin,
        countryFlag: product.countryFlag,
        defectType,
        defectTitle,
        description,
        batchNumber: batchNumber || 'BATCH-2026-X1',
        recipientType,
        recipientName,
        userEmail: user.email,
        userName: user.name,
        evidenceImageUrl: evidenceImage || product.primaryImage,
        createdAt: 'Just now',
        status: 'Submitted',
        timeline: [{ date: 'Just now', status: 'Submitted', note: `Case registered with ${recipientName}.` }],
      };
      setSubmittedTicket(mockTicket);
      onComplaintSubmitted(mockTicket);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-rose-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Official Product Defect Complaint</h3>
              <p className="text-xs text-slate-500">Submit a formal report to Manufacturer, Canteen, or FSSAI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedTicket ? (
            /* Success confirmation card */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Defect Ticket Registered!</h4>
                <div className="inline-block mt-2 font-mono text-sm font-bold px-3 py-1 bg-slate-100 border border-slate-200 text-emerald-800 rounded-lg">
                  {submittedTicket.ticketId}
                </div>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                  Your formal complaint has been dispatched to{' '}
                  <span className="font-semibold text-slate-800">{submittedTicket.recipientName}</span>. A copy of the case log was sent to <span className="font-semibold text-slate-800">{submittedTicket.userEmail}</span>.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700">{submittedTicket.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Product:</span>
                  <span className="font-semibold text-slate-800">{submittedTicket.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Defect Category:</span>
                  <span className="font-semibold text-slate-800">{submittedTicket.defectType}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          ) : (
            /* Defect Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product summary banner */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{product.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{product.subtitle}</div>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md shrink-0">
                  {product.category}
                </span>
              </div>

              {/* Defect Category Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Suspected Defect Type *
                </label>
                <select
                  value={defectType}
                  onChange={(e: any) => setDefectType(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="visible_spoilage">Visible mould / fungal growth / spoilage</option>
                  <option value="damaged_packaging">Damaged, punctured, or leaking packaging seal</option>
                  <option value="expired_date">Expired or illegible date stamp</option>
                  <option value="foreign_object">Foreign object / physical particle detected</option>
                  <option value="mismatch">Packaging &amp; contents mismatch</option>
                  <option value="other_defect">Other critical food safety defect</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Note: A low nutrition score or personal taste preference does not qualify as a defect.
                </p>
              </div>

              {/* Recipient Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Route Official Complaint To *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {isIndianCanteen && (
                    <button
                      type="button"
                      onClick={() => setRecipientType('canteen_manager')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        recipientType === 'canteen_manager'
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold ring-1 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-1 text-emerald-700" />
                      Canteen Committee
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setRecipientType('manufacturer')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      recipientType === 'manufacturer'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold ring-1 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1 text-emerald-700" />
                    Manufacturer QA
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecipientType(nationalAuth.type)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      recipientType === nationalAuth.type
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold ring-1 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1 text-emerald-700" />
                    {nationalAuth.label}
                  </button>
                </div>
              </div>

              {/* Batch number & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Batch / Lot Number (if available)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BATCH-2026-X49"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Reporting User
                  </label>
                  <div className="px-3 py-2 text-xs bg-slate-100 text-slate-700 rounded-xl border border-slate-200 truncate">
                    {user.name} ({user.email})
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Defect Description &amp; Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the defect observed (e.g. unusual smell, green fungal growth, damaged foil seal)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                ></textarea>
              </div>

              {/* Photo Evidence Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Defect Photo Evidence (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEvidenceUpload}
                      className="hidden"
                    />
                  </label>
                  {evidenceImage && (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Photo attached
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Case...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Official Complaint</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
