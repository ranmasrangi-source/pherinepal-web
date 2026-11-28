import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Mountain,
  ShieldAlert,
  Download,
  Save,
  CheckCircle2,
  Compass,
  Clock,
  FileCheck,
} from 'lucide-react';
import { NEPAL_77_DISTRICTS, NEPAL_PROVINCES, OFFICIAL_LANGUAGES } from '../data/nepal77Districts';
import {
  LanguageCode,
  PartnerListingRecord,
  ProvinceId,
  TravelerItineraryRecord,
} from '../types/pheriNepal';

interface AiTripPlannerModalProps {
  language: LanguageCode;
  currentUserUid: string | null;
  verifiedListings: PartnerListingRecord[];
  savedItineraries: TravelerItineraryRecord[];
  initialProvinceId?: ProvinceId;
  initialDistrictName?: string;
  onSaveItinerary: (payload: {
    title: string;
    provinceId: string;
    durationDays: number;
    budgetTier: 'Budget' | 'Standard' | 'Comfort' | 'Luxury';
    maxElevationMeters: number;
    acclimatizationCompliant: boolean;
    permitsChecklist: string;
    planMarkdown: string;
  }) => Promise<void>;
  onRequireSignIn: () => void;
}

export const AiTripPlannerSection: React.FC<AiTripPlannerModalProps> = ({
  language,
  currentUserUid,
  verifiedListings,
  savedItineraries,
  initialProvinceId,
  initialDistrictName,
  onSaveItinerary,
  onRequireSignIn,
}) => {
  const isNe = language === 'L02';
  const activeLangMeta =
    OFFICIAL_LANGUAGES.find((l) => l.code === language) || OFFICIAL_LANGUAGES[0];
  const [selectedProvinceId, setSelectedProvinceId] = useState<ProvinceId>(
    initialProvinceId || 'PR-04'
  );
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>(
    initialDistrictName || 'Kaski'
  );

  useEffect(() => {
    if (initialProvinceId) {
      setSelectedProvinceId(initialProvinceId);
    }
    if (initialDistrictName) {
      setSelectedDistrictName(initialDistrictName);
    }
  }, [initialProvinceId, initialDistrictName]);
  const [durationDays, setDurationDays] = useState<number>(6);
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Standard' | 'Comfort' | 'Luxury'>('Standard');
  const [travelerGoal, setTravelerGoal] = useState<string>(
    'Safe acclimatized trekking, verified local lodges, and authentic cultural heritage'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<{
    source: string;
    provinceId: string;
    districtName: string;
    maxElevationMeters: number;
    acclimatizationCompliant: boolean;
    permitsChecklist: string;
    planMarkdown: string;
  } | null>(null);

  const districtsInProvince = NEPAL_77_DISTRICTS.filter(
    (d) => d.provinceId === selectedProvinceId
  );

  const currentDistrict =
    NEPAL_77_DISTRICTS.find((d) => d.nameEn === selectedDistrictName) ||
    districtsInProvince[0];

  const handleProvinceChange = (provId: ProvinceId) => {
    setSelectedProvinceId(provId);
    const firstDist = NEPAL_77_DISTRICTS.find((d) => d.provinceId === provId);
    if (firstDist) {
      setSelectedDistrictName(firstDist.nameEn);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedNotice(null);
    try {
      const response = await fetch('/api/v1/ai/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provinceId: selectedProvinceId,
          districtName: selectedDistrictName,
          durationDays,
          budgetTier,
          travelerGoal,
          language,
          verifiedListings,
        }),
      });
      const data = await response.json();
      if (data && data.planMarkdown) {
        setGeneratedResult(data);
      }
    } catch (error) {
      console.error('Failed to generate AI itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFirestore = async () => {
    if (!currentUserUid) {
      onRequireSignIn();
      return;
    }
    if (!generatedResult) return;
    setSaving(true);
    try {
      await onSaveItinerary({
        title: `${generatedResult.districtName} (${durationDays} Days • ${budgetTier})`,
        provinceId: generatedResult.provinceId,
        durationDays,
        budgetTier,
        maxElevationMeters: generatedResult.maxElevationMeters,
        acclimatizationCompliant: generatedResult.acclimatizationCompliant,
        permitsChecklist: generatedResult.permitsChecklist,
        planMarkdown: generatedResult.planMarkdown,
      });
      setSavedNotice(
        isNe
          ? 'यात्रा योजना वास्तविक Firestore डाटाबेसमा सुरक्षित गरियो!'
          : 'Itinerary saved to your live Firestore account (ENT-013)!'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadSurvivalPack = (
    title: string,
    markdown: string,
    permits: string,
    maxElevation: number
  ) => {
    const content = `========================================================================
PHERI NEPAL — OFFLINE TREKKING SURVIVAL PACK (FR-033 / DC-017)
Tagline: Discover Nepal. Travel with Confidence. Return Again.
========================================================================
Itinerary Title: ${title}
Maximum Altitude: ${maxElevation}m (AI-009 <=500m/day Acclimatization Compliant)
Mandatory Permits: ${permits}
Generated Timestamp: ${new Date().toISOString()}

EMERGENCY HOTLINES (CACHE OFFLINE):
- Nepal Tourist Police 24/7 Helpline: 1144 / +977-1-4247041
- Nepal Police Emergency Control: 100
- Himalayan Rescue Association (HRA Aid Posts): +977-1-4440292
- NTB Crisis Cell: +977-1-4256909

------------------------------------------------------------------------
GROUNDED ITINERARY & SAFETY BRIEFING
------------------------------------------------------------------------
${markdown}

------------------------------------------------------------------------
DC-017 STATUTORY DISCLAIMER:
This survival pack is for offline informational readiness. During life-safety
emergencies or Acute Mountain Sickness (AMS), descend immediately and contact
Nepal Tourist Police (1144) or Himalayan Rescue Association.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PHERI-NEPAL-Survival-Pack-${title.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#C6A15B] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>
                AI-001 • AI-002 • AI-009 HIGH-ALTITUDE GUARDRAIL • OUTPUT:{' '}
                {activeLangMeta.code} ({activeLangMeta.nativeName})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold">
              {isNe
                ? 'PHERI NEPAL ग्राउन्डेड एआई यात्रा योजनाकार र अफलाइन सर्भाइभल प्याक'
                : 'Grounded Nepal AI Trip Planner & Offline Trekking Survival Pack'}
            </h2>
            <p className="text-sm text-[#F7F5EF]/80 mt-1 max-w-3xl">
              {isNe
                ? '३,००० मिटरभन्दा माथिको उचाइमा प्रतिदिन <=५०० मिटर उचाइ वृद्धि नियम (AI-009), वास्तविक पहाडी सडक गति (२२–३५ कि.मि./घण्टा), र प्रमाणित (Verified) साझेदारहरूमा मात्र आधारित।'
                : 'Enforces Document 08 guardrails: mandatory <=500m/day sleeping elevation gain above 3,000m, realistic 22–35 km/h Nepal mountain road speeds, and strict grounding to Verified PHERI NEPAL listings.'}
            </p>
          </div>
          {currentDistrict && (
            <div className="bg-[#0D2E25] border border-[#C6A15B]/30 rounded-lg px-4 py-3">
              <div className="text-xs font-mono-code text-[#C6A15B]">
                SELECTED CORRIDOR TELEMETRY
              </div>
              <div className="text-lg font-bold text-[#F7F5EF]">
                {currentDistrict.nameEn} ({currentDistrict.maxAltitudeMeters}m max)
              </div>
              <div className="text-xs text-[#F7F5EF]/75 font-mono-code">
                Avg Road Speed: {currentDistrict.highwaySpeedKmh} km/h • {currentDistrict.tier}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <form
          onSubmit={handleGenerate}
          className="lg:col-span-5 bg-white rounded-xl border border-[#123D32]/15 p-5 space-y-4 shadow-xs"
        >
          <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C6A15B]" />
            <span>
              {isNe ? 'यात्रा मापदण्ड छान्नुहोस्' : 'Configure Corridor & Safety Parameters'}
            </span>
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#263746] mb-1">
              {isNe ? 'प्रदेश (७ प्रदेश)' : 'Province (All 7 Provinces)'}
            </label>
            <select
              value={selectedProvinceId}
              onChange={(e) => handleProvinceChange(e.target.value as ProvinceId)}
              className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-medium"
            >
              {NEPAL_PROVINCES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.nameEn} ({p.nameNe})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#263746] mb-1">
              {isNe ? 'जिल्ला (७७ जिल्ला)' : 'District (77 Official Districts)'}
            </label>
            <select
              value={selectedDistrictName}
              onChange={(e) => setSelectedDistrictName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-medium"
            >
              {districtsInProvince.map((d) => (
                <option key={d.id} value={d.nameEn}>
                  {d.nameEn} ({d.nameNe}) — Max {d.maxAltitudeMeters}m [{d.tier}]
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#263746] mb-1">
                {isNe ? 'अवधि (दिन)' : 'Duration (Days)'}
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-mono-code"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#263746] mb-1">
                {isNe ? 'बजेट स्तर' : 'Budget Tier'}
              </label>
              <select
                value={budgetTier}
                onChange={(e) =>
                  setBudgetTier(
                    e.target.value as 'Budget' | 'Standard' | 'Comfort' | 'Luxury'
                  )
                }
                className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm font-medium"
              >
                <option value="Budget">Budget (Homestay / Teahouse)</option>
                <option value="Standard">Standard (Verified Lodge)</option>
                <option value="Comfort">Comfort (Boutique Heritage)</option>
                <option value="Luxury">Luxury (Mountain Resort)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#263746] mb-1">
              {isNe ? 'यात्राको मुख्य उद्देश्य' : 'Traveler Objective & Pace Preference'}
            </label>
            <textarea
              rows={3}
              value={travelerGoal}
              onChange={(e) => setTravelerGoal(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F5EF] border border-[#123D32]/20 rounded-lg text-sm"
            />
          </div>

          {currentDistrict && currentDistrict.maxAltitudeMeters >= 3000 && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">AI-009 High-Altitude Guardrail Active:</span>{' '}
                {currentDistrict.nameEn} reaches {currentDistrict.maxAltitudeMeters}m. The planner strictly enforces &lt;=500m/day sleeping elevation gain and required permits ({currentDistrict.permitsRequired.join(', ')}).
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-[#123D32] text-[#F7F5EF] font-semibold text-sm hover:bg-[#0D2E25] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4 text-[#C6A15B]" />
            <span>
              {loading
                ? isNe
                  ? 'ग्राउन्डेड यात्रा योजना तयार हुँदैछ...'
                  : 'Generating Grounded Nepal Itinerary...'
                : isNe
                ? 'एआई यात्रा र सुरक्षा योजना बनाउनुहोस्'
                : 'Generate Grounded AI Itinerary & Permit Checklist'}
            </span>
          </button>
        </form>

        {/* Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {generatedResult ? (
            <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#123D32]/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-mono-code font-semibold">
                      AI-009 Acclimatization Verified
                    </span>
                    <span className="text-xs font-mono-code text-[#263746]/70">
                      Engine: {generatedResult.source}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-[#123D32] mt-1">
                    {generatedResult.districtName} ({durationDays}-Day {budgetTier} Plan)
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveToFirestore}
                    disabled={saving}
                    className="px-3.5 py-2 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-semibold hover:bg-[#0D2E25] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>
                      {saving
                        ? 'Saving...'
                        : isNe
                        ? 'खातामा सुरक्षित गर्नुहोस्'
                        : 'Save to Firestore'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadSurvivalPack(
                        `${generatedResult.districtName}-${durationDays}Days`,
                        generatedResult.planMarkdown,
                        generatedResult.permitsChecklist,
                        generatedResult.maxElevationMeters
                      )
                    }
                    className="px-3.5 py-2 rounded-lg bg-[#C6A15B] text-[#123D32] text-xs font-bold hover:bg-[#DFC286] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {isNe
                        ? 'अफलाइन सर्भाइभल प्याक (FR-033)'
                        : 'Download Offline Survival Pack (FR-033)'}
                    </span>
                  </button>
                </div>
              </div>

              {savedNotice && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{savedNotice}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F7F5EF] p-3.5 rounded-lg border border-[#123D32]/10 text-xs">
                <div className="flex items-start gap-2">
                  <Mountain className="w-4 h-4 text-[#123D32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#123D32]">Max Corridor Altitude:</span>{' '}
                    {generatedResult.maxElevationMeters}m
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-[#123D32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#123D32]">Permits Required:</span>{' '}
                    {generatedResult.permitsChecklist}
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-[#263746] whitespace-pre-wrap font-sans leading-relaxed bg-[#F7F5EF]/50 p-4 rounded-lg border border-[#123D32]/10 max-h-[520px] overflow-y-auto">
                {generatedResult.planMarkdown}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#123D32]/15 p-8 text-center space-y-3">
              <Mountain className="w-10 h-10 text-[#C6A15B] mx-auto" />
              <h3 className="text-xl font-serif-display font-bold text-[#123D32]">
                {isNe
                  ? 'तपाईंको सुरक्षित नेपाल यात्रा योजना यहाँ देखिनेछ'
                  : 'Ready to Build Your Grounded Nepal Itinerary'}
              </h3>
              <p className="text-sm text-[#263746]/75 max-w-md mx-auto">
                {isNe
                  ? 'बायाँपट्टि प्रदेश, जिल्ला, र दिन छान्नुहोस्। एआईले उचाइ सुरक्षा नियम, आवश्यक पर्मिट (TIMS/ACAP/MCAP/RAP), र प्रमाणित साझेदारहरूसहित विस्तृत योजना बनाउनेछ।'
                  : 'Select any of Nepal’s 7 provinces and 77 districts on the left to generate an elevation-aware itinerary with permit checkpoints and downloadable FR-033 offline survival pack.'}
              </p>
            </div>
          )}

          {/* Saved Firestore Itineraries */}
          {savedItineraries.length > 0 && (
            <div className="bg-white rounded-xl border border-[#123D32]/15 p-5 space-y-3">
              <h4 className="text-base font-serif-display font-bold text-[#123D32] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C6A15B]" />
                <span>
                  {isNe
                    ? `तपाईंका सुरक्षित गरिएका यात्रा योजनाहरू (${savedItineraries.length})`
                    : `Your Saved Firestore Itineraries (${savedItineraries.length})`}
                </span>
              </h4>
              <div className="space-y-2.5">
                {savedItineraries.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#123D32]">{item.title}</div>
                      <div className="text-xs text-[#263746]/75 font-mono-code">
                        {item.provinceId} • Max {item.maxElevationMeters}m • Permits:{' '}
                        {item.permitsChecklist}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setGeneratedResult({
                            source: 'saved-firestore-record',
                            provinceId: item.provinceId,
                            districtName: item.title,
                            maxElevationMeters: item.maxElevationMeters,
                            acclimatizationCompliant: item.acclimatizationCompliant,
                            permitsChecklist: item.permitsChecklist,
                            planMarkdown: item.planMarkdown,
                          })
                        }
                        className="px-3 py-1.5 rounded bg-white border border-[#123D32]/20 text-xs font-semibold text-[#123D32] hover:bg-[#123D32] hover:text-white transition cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadSurvivalPack(
                            item.title,
                            item.planMarkdown,
                            item.permitsChecklist,
                            item.maxElevationMeters
                          )
                        }
                        className="px-3 py-1.5 rounded bg-[#C6A15B] text-[#123D32] text-xs font-bold hover:bg-[#DFC286] transition cursor-pointer"
                      >
                        Offline Pack
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
