import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  CheckCircle2,
  BookOpen,
  Layers,
  Lock,
  Sparkles,
  Database,
  Globe,
  AlertTriangle,
} from 'lucide-react';
import { LanguageCode } from '../types/pheriNepal';

interface BlueprintGovernancePortalProps {
  language: LanguageCode;
}

const BLUEPRINT_CATALOG = [
  {
    code: 'PN-MPB-001',
    docNum: 'Document 01',
    titleEn: 'Master Project Blueprint (v2.0 Audit-Resolved)',
    titleNe: 'मास्टर प्रोजेक्ट ब्लुप्रिन्ट (v2.0)',
    file: '/docs/01-PN-MPB-001-Master-Project-Blueprint.md',
    lines: 1049,
    keyMandates: [
      '7 Provinces & 77 Districts 3-Tier Supply Readiness Matrix (Tier A / Tier B / Tier C)',
      '18 Core Platform Modules (M01–M18) & Quantitative Phase 1–5 Exit Gates',
      'Official 12-Language Register (L01 English & L02 Nepali active in Phase 1; L03–L12 mapped)',
    ],
  },
  {
    code: 'PN-BMR-002',
    docNum: 'Document 02',
    titleEn: 'Business Model & Revenue Blueprint (v2.0 Audit-Resolved)',
    titleNe: 'व्यावसायिक मोडेल तथा राजस्व ब्लुप्रिन्ट (v2.0)',
    file: '/docs/02-PN-BMR-002-Business-Model-and-Revenue-Blueprint.md',
    lines: 1094,
    keyMandates: [
      '14 Official Revenue Streams (R01–R06 Inquiry Commissions, R07 Subscriptions, R08–R10 Promotions, R11–R14 B2B/Licensing)',
      'Anti-Leakage Verified Check-In Voucher (VCV) Protocol & 72-Hour Proof-of-Stay Dispute Resolution',
      'Strict Independence: Paid Subscriptions/Promotions NEVER influence Verification Badges (Verified)',
      'Nepal 13% VAT & Statutory TDS Ledger Accounting Rules',
    ],
  },
  {
    code: 'PN-UJFR-003',
    docNum: 'Document 03',
    titleEn: 'User Journey & Functional Requirements Blueprint (v2.0)',
    titleNe: 'प्रयोगकर्ता यात्रा तथा कार्यात्मक आवश्यकता ब्लुप्रिन्ट (v2.0)',
    file: '/docs/03-PN-UJFR-003-User-Journey-and-Functional-Requirements-Blueprint.md',
    lines: 1035,
    keyMandates: [
      '9 Official User Roles (U01 Guest to U09 Super Admin) & 33 Functional Requirements (FR-001–FR-033)',
      'FR-033 Low-Connectivity / Offline Trekking Survival Pack (Printable & Cacheable VCV + Permits + Emergency Hotlines)',
      'Nepal Trekking Permits Matrix (TIMS, ACAP, MCAP, Sagarmatha, KCAP, RAP + Mandatory Guide rules)',
    ],
  },
  {
    code: 'PN-UXDS-004',
    docNum: 'Document 04',
    titleEn: 'UI/UX & Design System Blueprint (v2.0)',
    titleNe: 'यूआई/यूएक्स तथा डिजाइन सिस्टम ब्लुप्रिन्ट (v2.0)',
    file: '/docs/04-PN-UXDS-004-UI-UX-and-Design-System-Blueprint.md',
    lines: 1016,
    keyMandates: [
      'Palette: Forest Green #123D32, Warm White #F7F5EF, Soft Gold #C6A15B, Deep Navy #263746',
      'Devanagari Script Typography Tokens (line-height >= 1.70, matra-safe vertical padding)',
      '25 Governed Design Components (DC-001–DC-025) including <45KB Interactive SVG Nepal Map',
    ],
  },
  {
    code: 'PN-TAB-005',
    docNum: 'Document 05',
    titleEn: 'Technical Architecture Blueprint (v2.0)',
    titleNe: 'प्राविधिक आर्किटेक्चर ब्लुप्रिन्ट (v2.0)',
    file: '/docs/05-PN-TAB-005-Technical-Architecture-Blueprint.md',
    lines: 998,
    keyMandates: [
      'React + TypeScript + Tailwind CSS Frontend & Node.js Express Backend (/api/v1/*)',
      'Firebase Firestore + Firebase Authentication with Zero-Trust ABAC Security Rules',
      'Quantitative SLAs: Public LCP <= 2.5s, API P95 <= 250ms, AI First Token <= 1.8s',
    ],
  },
  {
    code: 'PN-DDM-006',
    docNum: 'Document 06',
    titleEn: 'Database & Data Management Blueprint (v2.0)',
    titleNe: 'डाटाबेस तथा डाटा व्यवस्थापन ब्लुप्रिन्ट (v2.0)',
    file: '/docs/06-PN-DDM-006-Database-and-Data-Management-Blueprint.md',
    lines: 1470,
    keyMandates: [
      '40 Governed Entities (ENT-001–ENT-040) & 10 Composite Indexes (IDX-001–IDX-010)',
      'Strict State Separation: inquiryStatus, arrangementStatus, paymentStatus (Inactive), commissionStatus',
      'PII Isolation between public /users/{uid} and private /users/{uid}/private/{docId}',
    ],
  },
  {
    code: 'PN-ATPI-007',
    docNum: 'Document 07',
    titleEn: 'API & Third-Party Integration Blueprint (v2.0)',
    titleNe: 'एपीआई तथा तेस्रो-पक्ष इन्टिग्रेसन ब्लुप्रिन्ट (v2.0)',
    file: '/docs/07-PN-ATPI-007-API-and-Third-Party-Integration-Blueprint.md',
    lines: 1190,
    keyMandates: [
      '20 Internal API Groups (API-001–API-020) & 17 External Integration Contracts (INT-001–INT-017)',
      'Dual-Rail Payment Architecture (INT-004A Domestic eSewa/Khalti/ConnectIPS + INT-004B Intl Cards) gated behind ENABLE_LIVE_PAYMENTS = false',
      'Idempotency-Key & HMAC-SHA256 Webhook Verification',
    ],
  },
  {
    code: 'PN-AIS-008',
    docNum: 'Document 08',
    titleEn: 'AI & Intelligent Services Blueprint (v2.0)',
    titleNe: 'एआई तथा इन्टेलिजेन्ट सर्भिस ब्लुप्रिन्ट (v2.0)',
    file: '/docs/08-PN-AIS-008-AI-and-Intelligent-Services-Blueprint.md',
    lines: 1149,
    keyMandates: [
      '16 AI Service Domains (AI-001–AI-016) powered server-side by Gemini 4 Hydrogen',
      'AI-009 High-Altitude Acclimatization Guardrail (<= 500m/day sleeping elevation gain above 3,000m)',
      'Realistic Nepal Mountain Road Speed Matrix (22–35 km/h) & Verified-Only Partner Grounding',
    ],
  },
  {
    code: 'PN-SPLC-009',
    docNum: 'Document 09',
    titleEn: 'Security, Privacy & Legal Compliance Blueprint (v2.0)',
    titleNe: 'सुरक्षा, गोपनीयता तथा कानुनी अनुपालन ब्लुप्रिन्ट (v2.0)',
    file: '/docs/09-PN-SPLC-009-Security-Privacy-and-Legal-Compliance-Blueprint.md',
    lines: 1897,
    keyMandates: [
      'Confidential KYC Evidence Isolation (ENT-017) & Ephemeral Reviewer Access',
      'Nepal Individual Privacy Act 2075 & Electronic Transactions Act 2063 Compliance',
      'DC-017 Emergency & SAR Legal Liability Disclaimer & Immutable Audit Log (ENT-038)',
    ],
  },
  {
    code: 'PN-APOB-010',
    docNum: 'Document 10',
    titleEn: 'Administration, Partner Management & Operations Blueprint (v2.0)',
    titleNe: 'प्रशासन, साझेदार व्यवस्थापन तथा सञ्चालन ब्लुप्रिन्ट (v2.0)',
    file: '/docs/10-PN-APOB-010-Administration-Partner-Management-and-Operations-Blueprint.md',
    lines: 2490,
    keyMandates: [
      'Concrete Operational SLA Timers: KYC Review <= 48h, Partner Inquiry Response <= 12h–24h',
      '48-Hour Stale Inquiry Auto-Escalation & T-30/15/7 Days License Expiry Warnings',
      '25 Operational KPIs (OPM-001–OPM-025) & 40 Acceptance Criteria (APO-AC-001–APO-AC-040)',
    ],
  },
  {
    code: 'PN-MSG-011',
    docNum: 'Document 11',
    titleEn: 'Marketing, SEO & Growth Blueprint (v2.0)',
    titleNe: 'मार्केटिङ, एसईओ तथा ग्रोथ ब्लुप्रिन्ट (v2.0)',
    file: '/docs/11-PN-MSG-011-Marketing-SEO-and-Growth-Blueprint.md',
    lines: 1640,
    keyMandates: [
      'Anti-Thin-Content SEO Indexing Gate across 77 Districts x 12 Languages',
      'Schema.org JSON-LD Structured Data Matrix & Nepal 4-Season Tourism Campaign Calendar',
      'Transparent "[Sponsored]" / "[Featured]" Labeling without Verification Dilution',
    ],
  },
  {
    code: 'PN-TDM-012',
    docNum: 'Document 12',
    titleEn: 'Testing, Deployment & Maintenance Blueprint (v2.0)',
    titleNe: 'परीक्षण, डिप्लोयमेन्ट तथा मर्मतसम्भार ब्लुप्रिन्ट (v2.0)',
    file: '/docs/12-PN-TDM-012-Testing-Deployment-and-Maintenance-Blueprint.md',
    lines: 2048,
    keyMandates: [
      'Quantitative RPO/RTO Disaster Recovery Matrix & 90-Day Stale Listing Heartbeat',
      'Zero-PII Deterministic Seed Rule & 12-Payload Firestore Security Rules Audit',
      '34 Release Acceptance Criteria (TDM-AC-001–TDM-AC-034)',
    ],
  },
];

export const BlueprintGovernancePortal: React.FC<BlueprintGovernancePortalProps> = ({
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isNe = language === 'L02';

  const filteredDocs = BLUEPRINT_CATALOG.filter(
    (doc) =>
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keyMandates.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#C6A15B] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>12 OFFICIAL BLUEPRINTS • VERSION 2.0 AUDIT-RESOLVED (17,076 LINES)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold">
              {isNe
                ? 'PHERI NEPAL आधिकारिक १२ ब्लुप्रिन्ट गभर्नेन्स र आर्किटेक्चर केन्द्र'
                : 'PHERI NEPAL Official 12-Blueprint Architecture & Governance Registry'}
            </h2>
            <p className="text-sm text-[#F7F5EF]/80 mt-1 max-w-3xl">
              {isNe
                ? 'हजुरको निर्देशन अनुसार Document 01 देखि Document 12 सम्मका सबै १२ वटै ब्लुप्रिन्टहरू पूर्ण रूपमा अडिट गरी Version 2.0 मा स्तरोन्नति गरिएका छन् र यस प्लेटफर्मको प्रत्येक फिचर तिनै नियमहरूमा आधारित छ।'
                : 'Every database collection, Firestore security rule, role permission (U01–U09), revenue stream (R01–R14), and AI safety guardrail in this live platform is directly governed by Documents 01 through 12.'}
            </p>
          </div>
          <div className="bg-[#0D2E25] border border-[#C6A15B]/30 rounded-lg px-4 py-3 text-right">
            <div className="text-xs font-mono-code text-[#C6A15B]">TOTAL SPECIFICATION VOLUME</div>
            <div className="text-2xl font-mono-code font-bold text-[#F7F5EF]">17,076 Lines</div>
            <div className="text-[11px] text-[#F7F5EF]/70">626 KB in /docs/01..12</div>
          </div>
        </div>
      </div>

      {/* Live Architectural Guarantees Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#123D32]/15">
          <div className="flex items-center gap-2 text-[#123D32] font-semibold text-sm">
            <Database className="w-4 h-4 text-[#C6A15B]" />
            <span>Real Firestore & Auth</span>
          </div>
          <p className="text-xs text-[#263746]/80 mt-1">
            Live Firebase Firestore persistence (`ENT-001`–`ENT-040`) with PII split-collection isolation.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#123D32]/15">
          <div className="flex items-center gap-2 text-[#123D32] font-semibold text-sm">
            <Lock className="w-4 h-4 text-[#C6A15B]" />
            <span>Zero-Trust ABAC Rules</span>
          </div>
          <p className="text-xs text-[#263746]/80 mt-1">
            ESLint-verified `firestore.rules` enforcing self-role protection, VCV state locks, and KYC isolation.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#123D32]/15">
          <div className="flex items-center gap-2 text-[#123D32] font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-[#C6A15B]" />
            <span>Server-Side Gemini AI</span>
          </div>
          <p className="text-xs text-[#263746]/80 mt-1">
            Grounded `/api/v1/ai/itinerary` enforcing `&lt;=500m/day` altitude gain above 3,000m (`AI-009`).
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#123D32]/15">
          <div className="flex items-center gap-2 text-[#123D32] font-semibold text-sm">
            <Globe className="w-4 h-4 text-[#C6A15B]" />
            <span>7 Provinces • 77 Districts</span>
          </div>
          <p className="text-xs text-[#263746]/80 mt-1">
            Complete 77-district dataset with permits, max elevation, road speed matrix, and emergency routing.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#263746]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isNe
              ? 'ब्लुप्रिन्ट कोड (जस्तै PN-BMR-002, VCV, AI-009, KYC) खोज्नुहोस्...'
              : 'Filter 12 blueprints by code, mandate, or architectural rule (e.g., VCV, AI-009, KYC, VAT)...'
          }
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#123D32]/20 rounded-lg text-sm focus:outline-none focus:border-[#123D32]"
        />
      </div>

      {/* 12 Blueprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.code}
            className="bg-white rounded-xl border border-[#123D32]/15 p-5 shadow-xs hover:border-[#C6A15B] transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#123D32] text-[#F7F5EF] font-mono-code text-xs font-semibold">
                    {doc.code}
                  </span>
                  <span className="text-xs font-mono-code text-[#263746]/70">
                    {doc.docNum} • {doc.lines.toLocaleString()} lines
                  </span>
                </div>
                <h3 className="text-lg font-serif-display font-bold text-[#123D32] mt-1.5">
                  {isNe ? doc.titleNe : doc.titleEn}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                v2.0 Active
              </span>
            </div>

            <div className="mt-3 text-xs font-mono-code text-[#263746]/60 bg-[#F7F5EF] px-2.5 py-1.5 rounded border border-[#123D32]/10 truncate">
              <FileText className="w-3.5 h-3.5 inline mr-1.5 text-[#123D32]" />
              {doc.file}
            </div>

            <ul className="mt-3 space-y-1.5">
              {doc.keyMandates.map((mandate, i) => (
                <li key={i} className="text-xs text-[#263746] flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span>{mandate}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* DC-017 Statutory Disclaimer */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <span className="font-bold">
            DC-017 Statutory Governance & Emergency Disclaimer (Document 09 Section 57.3):
          </span>{' '}
          PHERI NEPAL enforces an Inquiry-First booking workflow (`Traveler Inquiry -&gt; Partner Response -&gt; Partner Confirmation`) with live payment gateways gated behind `ENABLE_LIVE_PAYMENTS = false` in Phase 1. Verification badges (`Verified`) are awarded solely on government KYC evidence (`U05`) and never influenced by paid subscriptions (`R07`) or promotions (`R08`–`R10`).
        </div>
      </div>
    </div>
  );
};
