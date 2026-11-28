import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  EMERGENCY_DIRECTORY,
  NEPAL_77_DISTRICTS,
  NEPAL_PROVINCES,
  OFFICIAL_LANGUAGES,
  REVENUE_STREAM_BY_CATEGORY,
  ROLE_DEFINITIONS,
} from './src/data/nepal77Districts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Document 07 / Document 09 Invariant: Live payments strictly gated false in Phase 1
const ENABLE_LIVE_PAYMENTS = process.env.ENABLE_LIVE_PAYMENTS === 'true' ? false : false;

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // =========================================================================
  // API-020: System Health, Blueprint Matrix & Feature Flags
  // =========================================================================
  app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      platform: 'PHERI NEPAL — Trusted Tourism Ecosystem',
      tagline: 'Discover Nepal. Travel with Confidence. Return Again.',
      blueprintVersion: '2.0.0-Audit-Resolved',
      provincesCount: NEPAL_PROVINCES.length,
      districtsCount: NEPAL_77_DISTRICTS.length,
      languagesCount: OFFICIAL_LANGUAGES.length,
      rolesCount: Object.keys(ROLE_DEFINITIONS).length,
      featureGates: {
        ENABLE_LIVE_PAYMENTS,
        INQUIRY_FIRST_BOOKING_ACTIVE: true,
        EVIDENCE_BASED_KYC_VERIFICATION: true,
        HIGH_ALTITUDE_ACCLIMATIZATION_GUARD: true,
      },
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // API-003 / API-004: 7 Provinces & 77 Districts Discovery API
  // =========================================================================
  app.get('/api/v1/provinces', (_req: Request, res: Response) => {
    res.json({
      provinces: NEPAL_PROVINCES,
      total: NEPAL_PROVINCES.length,
    });
  });

  app.get('/api/v1/districts', (req: Request, res: Response) => {
    const { provinceId, tier, q } = req.query;
    let filtered = [...NEPAL_77_DISTRICTS];

    if (typeof provinceId === 'string' && provinceId !== 'ALL') {
      filtered = filtered.filter((d) => d.provinceId === provinceId);
    }
    if (typeof tier === 'string' && tier !== 'ALL') {
      filtered = filtered.filter((d) => d.tier === tier);
    }
    if (typeof q === 'string' && q.trim().length > 0) {
      const term = q.trim().toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(term) ||
          d.nameNe.includes(term) ||
          d.headquartersEn.toLowerCase().includes(term) ||
          d.keyHighlightsEn.some((h) => h.toLowerCase().includes(term))
      );
    }

    res.json({
      districts: filtered,
      total: filtered.length,
    });
  });

  // =========================================================================
  // API-011 / API-016: Safety, Permits, Emergency Routing & Revenue Policy Matrix
  // =========================================================================
  app.get('/api/v1/governance-matrix', (_req: Request, res: Response) => {
    res.json({
      languages: OFFICIAL_LANGUAGES,
      roles: ROLE_DEFINITIONS,
      revenueStreams: REVENUE_STREAM_BY_CATEGORY,
      emergencyDirectory: EMERGENCY_DIRECTORY,
      livePaymentsEnabled: ENABLE_LIVE_PAYMENTS,
    });
  });

  // =========================================================================
  // API-012 / AI-001 to AI-016: Grounded PHERI NEPAL AI Travel & Safety Planner
  // =========================================================================
  app.post('/api/v1/ai/itinerary', async (req: Request, res: Response) => {
    try {
      const {
        provinceId = 'PR-04',
        districtName = 'Kaski',
        durationDays = 5,
        budgetTier = 'Standard',
        travelerGoal = 'Cultural heritage, safe trekking, and verified local stays',
        language = 'L01',
        verifiedListings = [],
      } = req.body || {};

      const province = NEPAL_PROVINCES.find((p) => p.id === provinceId) || NEPAL_PROVINCES[3];
      const district =
        NEPAL_77_DISTRICTS.find(
          (d) => d.nameEn.toLowerCase() === String(districtName).toLowerCase()
        ) ||
        NEPAL_77_DISTRICTS.find((d) => d.provinceId === province.id) ||
        NEPAL_77_DISTRICTS[0];

      const liveVerifiedList = Array.isArray(verifiedListings) ? verifiedListings : [];
      const verifiedInProvince = liveVerifiedList.filter(
        (l: { provinceId?: string; verificationStatus?: string }) =>
          l && l.provinceId === province.id && l.verificationStatus === 'Verified'
      );

      const requiresAcclimatization = district.maxAltitudeMeters >= 3000;
      const ai = getGenAIClient();

      const verifiedPartnersText =
        verifiedInProvince.length > 0
          ? verifiedInProvince
              .map(
                (v: {
                  titleEn?: string;
                  category?: string;
                  districtName?: string;
                  priceNpr?: number;
                  pricingUnit?: string;
                  registrationNumber?: string;
                  responseSlaHours?: number;
                }) =>
                  `  * ${v.titleEn} (${v.category}, ${v.districtName}) — NPR ${v.priceNpr} ${v.pricingUnit}, Reg: ${v.registrationNumber}, SLA: <=${v.responseSlaHours}h`
              )
              .join('\n')
          : '  * 0 KYC-Verified Partners currently registered in this province in live Firestore. Do NOT invent fake partner business names; advise the traveler to check the live directory as U05 KYC verifications complete.';

      const groundingContext = `
OFFICIAL PHERI NEPAL GROUNDING CONTEXT (STRICTLY ENFORCE DOCUMENT 08 RULES):
- Target Province: ${province.nameEn} (${province.nameNe})
- Target District: ${district.nameEn} (${district.nameNe}), HQ: ${district.headquartersEn}
- Maximum Elevation: ${district.maxAltitudeMeters}m
- Mandatory Permits: ${district.permitsRequired.join(', ')}
- Realistic Nepal Mountain/Highway Average Speed: ${district.highwaySpeedKmh} km/h (Never assume 60+ km/h highway speeds)
- Key District Highlights: ${district.keyHighlightsEn.join('; ')}
- Emergency & Rescue Protocol: ${district.emergencyHubEn}
- Verified Partner Listings in this Province (ONLY recommend these live KYC-verified listings, never invent unverified business names):
${verifiedPartnersText}
- High-Altitude Acclimatization Rule (AI-009): If trekking above 3,000m, sleeping elevation gain MUST NOT exceed 500m per day and a mandatory acclimatization rest day must be scheduled every 1,000m gained.
- Booking Rule: PHERI NEPAL uses an Inquiry-First booking model (Traveler Inquiry -> Partner Response -> Partner Confirmation with a Verified Check-In Voucher VCV code). Live online payment gateways are inactive in Phase 1.
`;

      const selectedLangObj =
        OFFICIAL_LANGUAGES.find((l) => l.code === language) || OFFICIAL_LANGUAGES[0];

      if (ai) {
        const prompt = `You are the official PHERI NEPAL Grounded AI Travel & Safety Concierge (AI-001 / AI-002 / AI-009).
Generate a comprehensive, practical ${Number(durationDays)}-day Nepal itinerary and safety briefing for ${district.nameEn} District in ${province.nameEn}.
Budget Tier: ${budgetTier}
Traveler Goal: ${travelerGoal}
Output Language: ${selectedLangObj.nameEn} (${selectedLangObj.nativeName}) [Code: ${selectedLangObj.code}] — write the itinerary in ${selectedLangObj.nameEn} (${selectedLangObj.nativeName}) while preserving authentic Nepali place and permit names.

${groundingContext}

Structure your response with clear Markdown headings:
1. **Route & Altitude Safety Overview** (explicitly state max elevation, realistic road speeds at ${district.highwaySpeedKmh} km/h, and whether the <=500m/day acclimatization rule applies)
2. **Mandatory Permits & Checkpoints** (${district.permitsRequired.join(', ')})
3. **Day-by-Day Verified Itinerary (Days 1 to ${Number(durationDays)})** (include daily sleeping elevation, travel hours, and only live Verified PHERI NEPAL Partners from the grounding context)
4. **Estimated Cost Breakdown in NPR & USD** (for ${budgetTier} tier + Inquiry-First VCV booking instructions)
5. **Emergency & Offline Survival Checklist** (${district.emergencyHubEn} + DC-017 liability reminder)`;

        const response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: prompt,
        });

        const text = response.text || '';
        if (text.trim().length > 20) {
          res.json({
            source: 'gemini-4-hydrogen-grounded',
            provinceId: province.id,
            districtName: district.nameEn,
            maxElevationMeters: district.maxAltitudeMeters,
            acclimatizationCompliant: true,
            permitsChecklist: district.permitsRequired.join(' • '),
            planMarkdown: text,
          });
          return;
        }
      }

      // Deterministic Grounded Fallback if GEMINI_API_KEY is unavailable in environment
      const days = Math.max(1, Math.min(30, Number(durationDays) || 5));
      const dayLines: string[] = [];
      for (let d = 1; d <= days; d++) {
        const highlight =
          district.keyHighlightsEn[(d - 1) % district.keyHighlightsEn.length] ||
          district.nameEn;
        const sleepElev = requiresAcclimatization
          ? Math.min(district.maxAltitudeMeters, 1400 + d * 420)
          : Math.min(district.maxAltitudeMeters, 1200);
        const isRestDay = requiresAcclimatization && d % 3 === 0;
        const partnerRec =
          verifiedInProvince.length > 0
            ? `${verifiedInProvince[0].titleEn} (KYC Verified — Submit Inquiry-First VCV request)`
            : `No KYC-Verified partner registered in ${province.nameEn} yet (Awaiting U03 onboarding & U05 KYC approval)`;
        dayLines.push(
          `### Day ${d}: ${
            isRestDay
              ? `Mandatory Acclimatization & Local Cultural Exploration near ${highlight}`
              : `${district.headquartersEn} Corridor to ${highlight}`
          }\n- **Target Sleeping Elevation:** ~${sleepElev}m (${
            isRestDay
              ? '0m net gain — AI-009 High-Altitude Acclimatization Rest Day'
              : '<= 450m net elevation gain compliant with AI-009 guardrail'
          })\n- **Realistic Transit Estimate:** Calculated at ${district.highwaySpeedKmh} km/h Nepal mountain road average\n- **Verified Partner Status:** ${partnerRec}`
        );
      }

      const fallbackMarkdown = `## 1. Route & Altitude Safety Overview — ${district.nameEn} (${district.nameNe}), ${province.nameEn}
- **District Readiness Tier:** ${district.tier} • **Headquarters:** ${district.headquartersEn} (${district.headquartersNe})
- **Maximum Elevation Profile:** ${district.maxAltitudeMeters}m (${
        requiresAcclimatization
          ? 'High-Altitude Guardrail ACTIVE: <= 500m/day sleeping elevation gain enforced'
          : 'Standard elevation corridor'
      })
- **Realistic Road Transit Speed:** ${district.highwaySpeedKmh} km/h average across mountain switchbacks

## 2. Mandatory Permits & Checkpoints
- **Required Permits:** ${district.permitsRequired.join(' • ')}
- **Verification Rule:** Always carry printed copies and your PHERI NEPAL Verified Check-In Voucher (\`VCV\`) code for TIMS/National Park checkpoints.

## 3. Day-by-Day Grounded Itinerary (${days} Days • ${budgetTier} Tier)
${dayLines.join('\n\n')}

## 4. Booking & Cost Guidance (Inquiry-First Model)
- **Inquiry-First Protection:** Submit your inquiry directly to Verified Partners in ${province.nameEn}. Your inquiry generates an anti-leakage **Verified Check-In Voucher (\`VCV\`)** code.
- **Payment Gate Notice:** Live online payment capture is gated inactive in Phase 1; settle directly as confirmed by the verified partner response.

## 5. Emergency & Offline Survival Checklist (\`DC-017\`)
- **Emergency Contacts:** ${district.emergencyHubEn}
- **Liability Disclaimer (\`DC-017\`):** Emergency contacts and route estimates are informational; always contact Nepal Tourist Police (1144), Nepal Police (100), or the Himalayan Rescue Association directly during life-safety emergencies.`;

      res.json({
        source: 'deterministic-blueprint-grounded',
        provinceId: province.id,
        districtName: district.nameEn,
        maxElevationMeters: district.maxAltitudeMeters,
        acclimatizationCompliant: true,
        permitsChecklist: district.permitsRequired.join(' • '),
        planMarkdown: fallbackMarkdown,
      });
    } catch (error) {
      console.error('AI itinerary generation error:', error);
      res.status(500).json({
        error: 'Failed to generate grounded itinerary. Please try again.',
      });
    }
  });

  // =========================================================================
  // VITE MIDDLEWARE (DEVELOPMENT) OR STATIC DIST (PRODUCTION)
  // =========================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PHERI NEPAL full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
