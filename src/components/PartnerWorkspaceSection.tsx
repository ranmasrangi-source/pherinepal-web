import React, { useEffect, useState } from 'react';
import {
  Building2,
  ShieldCheck,
  FileCheck2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  NEPAL_77_DISTRICTS,
  NEPAL_PROVINCES,
  REVENUE_STREAM_BY_CATEGORY,
} from '../data/nepal77Districts';
import {
  BookingInquiryRecord,
  LanguageCode,
  PartnerKycRecord,
  PartnerListingRecord,
  ProvinceId,
  ServiceCategory,
} from '../types/pheriNepal';

interface PartnerWorkspaceSectionProps {
  language: LanguageCode;
  currentUserUid: string | null;
  currentUserEmail: string | null;
  partnerListings: PartnerListingRecord[];
  partnerKycList: PartnerKycRecord[];
  partnerInquiries: BookingInquiryRecord[];
  initialProvinceId?: ProvinceId;
  initialDistrictName?: string;
  onCreatePartnerListingAndKyc: (
    listingPayload: Omit<PartnerListingRecord, 'id' | 'ownerUid' | 'verificationStatus' | 'listingStatus' | 'isFeatured' | 'isSponsored' | 'ratingAvg' | 'reviewCount'>,
    kycPayload: {
      businessLegalName: string;
      authorityName: 'DOT' | 'NTB' | 'TAAN' | 'NMA' | 'CompanyRegistrar' | 'LocalMunicipality';
      licenseNumber: string;
      panVatNumber: string;
      licenseExpiryDate: string;
      contactPhone: string;
      contactEmail: string;
      documentSummary: string;
    }
  ) => Promise<void>;
  onRespondToInquiry: (
    inquiryId: string,
    action: 'Responded' | 'Confirmed' | 'Declined',
    responseNotes: string,
    quotedTotalNpr: number,
    commissionRatePercent: number
  ) => Promise<void>;
  onRequireSignIn: () => void;
}

export const PartnerWorkspaceSection: React.FC<PartnerWorkspaceSectionProps> = ({
  language,
  currentUserUid,
  currentUserEmail,
  partnerListings,
  partnerKycList,
  partnerInquiries,
  initialProvinceId,
  initialDistrictName,
  onCreatePartnerListingAndKyc,
  onRespondToInquiry,
  onRequireSignIn,
}) => {
  const isNe = language === 'L02';

  const [titleEn, setTitleEn] = useState('');
  const [titleNe, setTitleNe] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Hotel');
  const [provinceId, setProvinceId] = useState<ProvinceId>(initialProvinceId || 'PR-04');
  const [districtName, setDistrictName] = useState(initialDistrictName || 'Kaski');
  const [municipality, setMunicipality] = useState('Pokhara Lakeside-6');

  useEffect(() => {
    if (initialProvinceId) {
      setProvinceId(initialProvinceId);
    }
    if (initialDistrictName) {
      setDistrictName(initialDistrictName);
      const found = NEPAL_77_DISTRICTS.find((d) => d.nameEn === initialDistrictName);
      if (found) {
        setMunicipality(`${found.headquartersEn} Municipality`);
        setMaxElevationMeters(found.maxAltitudeMeters);
        setPermitsRequired(found.permitsRequired.join(' / '));
      }
    }
  }, [initialProvinceId, initialDistrictName]);
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryNe, setSummaryNe] = useState('');
  const [priceNpr, setPriceNpr] = useState<number>(6500);
  const [pricingUnit, setPricingUnit] = useState<'per_night' | 'per_day' | 'per_person' | 'per_trip'>('per_night');
  const [maxElevationMeters, setMaxElevationMeters] = useState<number>(1400);
  const [durationDays, setDurationDays] = useState<number>(1);
  const [permitsRequired, setPermitsRequired] = useState('ACAP Permit / Standard ID');
  const [imageUrl, setImageUrl] = useState(
    '/src/assets/images/card_pokhara_lakeside_1795864713788.jpg'
  );
  const [subscriptionTier, setSubscriptionTier] = useState<'Standard' | 'Featured' | 'Sponsored' | 'Enterprise'>('Standard');

  // KYC Fields
  const [businessLegalName, setBusinessLegalName] = useState('');
  const [authorityName, setAuthorityName] = useState<
    'DOT' | 'NTB' | 'TAAN' | 'NMA' | 'CompanyRegistrar' | 'LocalMunicipality'
  >('DOT');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [panVatNumber, setPanVatNumber] = useState('');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('2028-07-15');
  const [contactPhone, setContactPhone] = useState('+977-98');
  const [documentSummary, setDocumentSummary] = useState(
    'Department of Tourism Registration Certificate + IRD PAN/VAT Clearance + Citizen ID'
  );

  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Per-inquiry response form states
  const [responseNotesMap, setResponseNotesMap] = useState<Record<string, string>>({});
  const [quotedAmountMap, setQuotedAmountMap] = useState<Record<string, number>>({});

  const districtsForProvince = NEPAL_77_DISTRICTS.filter((d) => d.provinceId === provinceId);

  const handleProvinceChange = (newProv: ProvinceId) => {
    setProvinceId(newProv);
    const first = NEPAL_77_DISTRICTS.find((d) => d.provinceId === newProv);
    if (first) {
      setDistrictName(first.nameEn);
      setMaxElevationMeters(first.maxAltitudeMeters);
      setPermitsRequired(first.permitsRequired.join(', '));
    }
  };

  const handleSubmitOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserUid) {
      onRequireSignIn();
      return;
    }
    setSubmitting(true);
    setFeedbackMsg(null);
    try {
      await onCreatePartnerListingAndKyc(
        {
          titleEn: titleEn.trim(),
          titleNe: titleNe.trim() || titleEn.trim(),
          category,
          provinceId,
          districtName,
          municipality: municipality.trim(),
          summaryEn: summaryEn.trim(),
          summaryNe: summaryNe.trim() || summaryEn.trim(),
          priceNpr: Number(priceNpr),
          priceUsdEstimate: Math.max(1, Math.round(Number(priceNpr) / 134)),
          pricingUnit,
          maxElevationMeters: Number(maxElevationMeters),
          durationDays: Number(durationDays),
          registrationNumber: licenseNumber.trim(),
          panVatNumber: panVatNumber.trim(),
          subscriptionTier,
          responseSlaHours: 6,
          imageUrl: imageUrl.trim(),
          permitsRequired: permitsRequired.trim(),
        },
        {
          businessLegalName: businessLegalName.trim() || titleEn.trim(),
          authorityName,
          licenseNumber: licenseNumber.trim(),
          panVatNumber: panVatNumber.trim(),
          licenseExpiryDate,
          contactPhone: contactPhone.trim(),
          contactEmail: currentUserEmail || 'partner@pherinepal.org.np',
          documentSummary: documentSummary.trim(),
        }
      );

      setTitleEn('');
      setTitleNe('');
      setSummaryEn('');
      setSummaryNe('');
      setBusinessLegalName('');
      setLicenseNumber('');
      setPanVatNumber('');
      setFeedbackMsg(
        isNe
          ? 'तपाईंको सेवा सूची र KYC प्रमाण वास्तविक Firestore डाटाबेसमा दर्ता भयो! (Verification Status: Pending — U05 समीक्षाको प्रतीक्षामा)'
          : 'Partner Listing (ENT-019) & KYC Evidence Record (ENT-017) written to live Firestore with Pending Verification status!'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#C6A15B] uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>U03 PARTNER WORKSPACE • M04 ONBOARDING & KYC • M06 INQUIRY DESK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold">
              {isNe
                ? 'साझेदार (Partner) अनबोर्डिङ, KYC प्रमाणीकरण र बुकिङ सोधपुछ कार्यकक्ष'
                : 'Partner Onboarding, KYC Evidence Submission & Inquiry Response Desk'}
            </h2>
            <p className="text-sm text-[#F7F5EF]/80 mt-1 max-w-3xl">
              {isNe
                ? 'नियम (Document 02 & 10): कुनै पनि नयाँ सेवा सूची स्वचालित रूपमा Pending प्रमाणीकरणमा सुरु हुन्छ। सशुल्क सदस्यता (R07) वा प्रमोसनले (R08-R10) कहिल्यै पनि Verified ब्याज किन्न सक्दैन।'
                : 'Blueprint Invariant: Every partner listing starts with VerificationStatus = Pending. Paid subscription requests (R07) never auto-grant a Verified badge—only U05/U09 KYC inspection can verify a partner.'}
            </p>
          </div>
          <div className="bg-[#0D2E25] border border-[#C6A15B]/30 rounded-lg px-4 py-3 text-right">
            <div className="text-xs font-mono-code text-[#C6A15B]">PARTNER SLA TARGET</div>
            <div className="text-xl font-mono-code font-bold text-[#F7F5EF]">&lt;= 12h Response</div>
            <div className="text-[11px] text-[#F7F5EF]/75">48h Stale Auto-Escalation Active</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Register New Partner Listing + KYC Submission */}
        <form
          onSubmit={handleSubmitOnboarding}
          className="lg:col-span-6 bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-[#123D32]/10 pb-3">
            <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#C6A15B]" />
              <span>
                {isNe
                  ? 'नयाँ पर्यटन सेवा र सरकारी KYC प्रमाण दर्ता गर्नुहोस्'
                  : 'Register Tourism Service & Submit Official KYC Evidence'}
              </span>
            </h3>
            <span className="text-xs font-mono-code text-[#123D32] bg-[#F7F5EF] px-2.5 py-1 rounded">
              ENT-016 + ENT-017
            </span>
          </div>

          {feedbackMsg && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Service Title (English) *
              </label>
              <input
                type="text"
                required
                minLength={3}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g., Mustang Lo Manthang Heritage Lodge"
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                सेवाको नाम (नेपाली देवनागरी) *
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={titleNe}
                onChange={(e) => setTitleNe(e.target.value)}
                placeholder="उदा. लोमान्थाङ हेरिटेज लज"
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-devanagari"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Category (R01–R06) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              >
                <option value="Hotel">Hotel (R01 - 10%)</option>
                <option value="Resort">Resort (R01 - 12%)</option>
                <option value="Homestay">Homestay (R02 - 8%)</option>
                <option value="TrekkingAgency">Trekking Agency (R03 - 12%)</option>
                <option value="TourPackage">Tour Package (R03 - 12%)</option>
                <option value="Guide">Licensed Guide (R04 - 10%)</option>
                <option value="Transport">Tourist Transport (R05 - 8%)</option>
                <option value="AdventureActivity">Adventure Activity (R06 - 12%)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Province *
              </label>
              <select
                value={provinceId}
                onChange={(e) => handleProvinceChange(e.target.value as ProvinceId)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              >
                {NEPAL_PROVINCES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} {p.nameEn}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                District (77 Districts) *
              </label>
              <select
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              >
                {districtsForProvince.map((d) => (
                  <option key={d.id} value={d.nameEn}>
                    {d.nameEn} ({d.nameNe})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Municipality / Ward *
              </label>
              <input
                type="text"
                required
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Base Rate (NPR) *
              </label>
              <input
                type="number"
                required
                min={200}
                value={priceNpr}
                onChange={(e) => setPriceNpr(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-mono-code"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#263746] mb-1">
                Pricing Unit *
              </label>
              <select
                value={pricingUnit}
                onChange={(e) =>
                  setPricingUnit(
                    e.target.value as 'per_night' | 'per_day' | 'per_person' | 'per_trip'
                  )
                }
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
              >
                <option value="per_night">Per Night</option>
                <option value="per_day">Per Day</option>
                <option value="per_person">Per Person</option>
                <option value="per_trip">Per Trip</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#263746] mb-1">
              Service Description & Safety Highlights (English) *
            </label>
            <textarea
              rows={2}
              required
              minLength={12}
              value={summaryEn}
              onChange={(e) => setSummaryEn(e.target.value)}
              placeholder="Detail accommodations, guide certifications, altitude readiness, and authentic local experiences..."
              className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
            />
          </div>

          {/* Official Government KYC Section (ENT-017) */}
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#123D32]/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold text-[#123D32] flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#C6A15B]" />
                OFFICIAL GOVERNMENT KYC & TAX EVIDENCE (ENT-017 CONFIDENTIAL)
              </span>
              <span className="text-[11px] font-mono-code text-[#263746]/70">
                Reviewed by U05 (&lt;=48h SLA)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  Registered Legal Entity Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessLegalName}
                  onChange={(e) => setBusinessLegalName(e.target.value)}
                  placeholder="As printed on Company Registrar / DOT certificate"
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  Licensing Authority *
                </label>
                <select
                  value={authorityName}
                  onChange={(e) =>
                    setAuthorityName(
                      e.target.value as
                        | 'DOT'
                        | 'NTB'
                        | 'TAAN'
                        | 'NMA'
                        | 'CompanyRegistrar'
                        | 'LocalMunicipality'
                    )
                  }
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs"
                >
                  <option value="DOT">Department of Tourism (DOT)</option>
                  <option value="NTB">Nepal Tourism Board (NTB)</option>
                  <option value="TAAN">TAAN (Trekking Agencies Association)</option>
                  <option value="NMA">Nepal Mountaineering Association (NMA)</option>
                  <option value="LocalMunicipality">Local Municipality Homestay Committee</option>
                  <option value="CompanyRegistrar">Office of the Company Registrar (OCR)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  License / Permit Number *
                </label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g., DOT-2081-442"
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  IRD PAN / 13% VAT No. *
                </label>
                <input
                  type="text"
                  required
                  value={panVatNumber}
                  onChange={(e) => setPanVatNumber(e.target.value)}
                  placeholder="e.g., PAN-609812345"
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  License Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  value={licenseExpiryDate}
                  onChange={(e) => setLicenseExpiryDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  Partner Direct SMS/WhatsApp Phone (INT-006) *
                </label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs font-mono-code"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#263746] mb-1">
                  R07 Commercial Tier Preference
                </label>
                <select
                  value={subscriptionTier}
                  onChange={(e) =>
                    setSubscriptionTier(
                      e.target.value as 'Standard' | 'Featured' | 'Sponsored' | 'Enterprise'
                    )
                  }
                  className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded-lg text-xs"
                >
                  <option value="Standard">Standard Tier (NPR 0 / mo + R01–R06 Commission)</option>
                  <option value="Featured">R07 Featured Partner Plan (NPR 2,500 / mo)</option>
                  <option value="Sponsored">R08 Sponsored Corridor Plan (NPR 5,000 / mo)</option>
                  <option value="Enterprise">R07 Enterprise Multi-Property (NPR 12,000 / mo)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-lg bg-[#123D32] text-[#F7F5EF] font-semibold text-sm hover:bg-[#0D2E25] transition cursor-pointer disabled:opacity-60"
          >
            {submitting
              ? 'Submitting to Firestore...'
              : isNe
              ? 'सेवा सूची र KYC प्रमाण Firestore मा पेश गर्नुहोस्'
              : 'Submit Partner Listing & KYC Package for U05 Verification'}
          </button>
        </form>

        {/* Right: Incoming Traveler Inquiries (M06) & Partner KYC Status */}
        <div className="lg:col-span-6 space-y-6">
          {/* Inquiry Response Desk */}
          <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#123D32]/10 pb-3">
              <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C6A15B]" />
                <span>
                  {isNe
                    ? `प्राप्त यात्रु बुकिङ सोधपुछहरू (${partnerInquiries.length})`
                    : `Incoming Inquiry-First Booking Requests (${partnerInquiries.length})`}
                </span>
              </h3>
              <span className="text-xs font-mono-code text-[#123D32] bg-[#F7F5EF] px-2.5 py-1 rounded">
                VCV Anti-Leakage Active
              </span>
            </div>

            {partnerInquiries.length === 0 ? (
              <div className="p-6 text-center bg-[#F7F5EF] rounded-lg border border-[#123D32]/10 text-xs text-[#263746]/75">
                {isNe
                  ? 'हाल कुनै यात्रु सोधपुछ प्राप्त भएको छैन। कुनै यात्रुले सोधपुछ पठाएपछि यहाँ तुरुन्तै देखिनेछ।'
                  : 'No incoming inquiries yet for your partner account. Submit an inquiry on any listing to test the real-time Inquiry -> Response -> Confirmation workflow.'}
              </div>
            ) : (
              <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
                {partnerInquiries.map((inq) => {
                  const isTerminal = ['Declined', 'Expired', 'Cancelled'].includes(
                    inq.inquiryStatus
                  );
                  const currentNotes =
                    responseNotesMap[inq.id] !== undefined
                      ? responseNotesMap[inq.id]
                      : inq.partnerResponseNotes;
                  const currentQuote =
                    quotedAmountMap[inq.id] !== undefined
                      ? quotedAmountMap[inq.id]
                      : inq.quotedTotalNpr;

                  return (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-[#F7F5EF] border border-[#123D32]/20 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#123D32] text-[#F7F5EF] font-mono-code text-xs font-bold">
                              {inq.vcvCode}
                            </span>
                            <span className="text-xs font-mono-code text-[#263746]/80">
                              {inq.revenueStreamCode} ({inq.commissionRatePercent}% Comm.)
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#123D32] mt-1">
                            {inq.listingTitle}
                          </h4>
                          <div className="text-xs text-[#263746]/80">
                            Traveler: <span className="font-semibold">{inq.travelerName}</span> •{' '}
                            {inq.travelerPhone} • Group: {inq.groupSize} pax
                          </div>
                          <div className="text-xs font-mono-code text-[#263746]/75">
                            Dates: {inq.preferredStartDate} → {inq.preferredEndDate}
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            Inquiry: {inq.inquiryStatus}
                          </div>
                          <div className="text-[11px] font-mono-code text-[#263746]/75">
                            Arrangement: {inq.arrangementStatus}
                          </div>
                          <div className="text-[11px] font-mono-code text-[#263746]/75">
                            Payment: {inq.paymentStatus} (Gated)
                          </div>
                        </div>
                      </div>

                      <div className="text-xs bg-white p-2.5 rounded border border-[#123D32]/10 text-[#263746]">
                        <span className="font-semibold text-[#123D32]">Traveler Message:</span>{' '}
                        {inq.travelerNotes}
                      </div>

                      {!isTerminal && (
                        <div className="space-y-2 pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={currentNotes}
                                onChange={(e) =>
                                  setResponseNotesMap((prev) => ({
                                    ...prev,
                                    [inq.id]: e.target.value,
                                  }))
                                }
                                placeholder="Write availability confirmation, pickup instructions, or permit guidance..."
                                className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded text-xs"
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                value={currentQuote}
                                onChange={(e) =>
                                  setQuotedAmountMap((prev) => ({
                                    ...prev,
                                    [inq.id]: Number(e.target.value),
                                  }))
                                }
                                placeholder="Quoted Total NPR"
                                className="w-full px-3 py-1.5 bg-white border border-[#123D32]/20 rounded text-xs font-mono-code"
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                onRespondToInquiry(
                                  inq.id,
                                  'Responded',
                                  currentNotes || 'Availability verified; ready to welcome your group.',
                                  Number(currentQuote) || inq.quotedTotalNpr,
                                  inq.commissionRatePercent
                                )
                              }
                              className="px-3 py-1.5 rounded bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition cursor-pointer"
                            >
                              Send Response Quote
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onRespondToInquiry(
                                  inq.id,
                                  'Confirmed',
                                  currentNotes || 'Booking Arrangement Confirmed with VCV Check-In Voucher.',
                                  Number(currentQuote) || inq.quotedTotalNpr,
                                  inq.commissionRatePercent
                                )
                              }
                              className="px-3 py-1.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Confirm Arrangement (Issue VCV)
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onRespondToInquiry(
                                  inq.id,
                                  'Declined',
                                  currentNotes || 'Dates unavailable for requested group size.',
                                  Number(currentQuote) || inq.quotedTotalNpr,
                                  inq.commissionRatePercent
                                )
                              }
                              className="px-3 py-1.5 rounded bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition cursor-pointer flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Decline
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Partner Listings & KYC Verification Ledger */}
          <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-3 shadow-xs">
            <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C6A15B]" />
              <span>
                {isNe
                  ? `तपाईंका दर्ता गरिएका सेवाहरू र KYC स्थिति (${partnerListings.length})`
                  : `Your Partner Listings & Independent KYC Verification Status (${partnerListings.length})`}
              </span>
            </h3>

            {partnerListings.length === 0 ? (
              <p className="text-xs text-[#263746]/75">
                {isNe
                  ? 'तपाईंले बायाँपट्टिको फारमबाट दर्ता गर्नुभएका सेवाहरू यहाँ देखिनेछन्।'
                  : 'Submit the form on the left to register your first hotel, homestay, trekking agency, or guide service.'}
              </p>
            ) : (
              <div className="space-y-2.5">
                {partnerListings.map((lst) => {
                  const kyc = partnerKycList.find((k) => k.listingId === lst.id);
                  const stream = REVENUE_STREAM_BY_CATEGORY[lst.category];
                  return (
                    <div
                      key={lst.id}
                      className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-sm text-[#123D32]">{lst.titleEn}</div>
                        <div className="text-xs text-[#263746]/75 font-mono-code">
                          {lst.provinceId} • {lst.districtName} • Reg: {lst.registrationNumber} •{' '}
                          {stream?.code} ({stream?.ratePercent}%)
                        </div>
                        {kyc && kyc.reviewerNotes && (
                          <div className="text-xs text-[#123D32] mt-1">
                            U05 Reviewer Note: {kyc.reviewerNotes}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-bold ${
                            lst.verificationStatus === 'Verified'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : lst.verificationStatus === 'Rejected' ||
                                lst.verificationStatus === 'Suspended'
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          KYC: {lst.verificationStatus}
                        </span>
                        <span className="px-2 py-1 rounded bg-white border border-[#123D32]/15 text-xs font-mono-code">
                          Tier: {lst.subscriptionTier}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
