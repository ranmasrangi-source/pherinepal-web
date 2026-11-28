export type LanguageCode =
  | 'L01'
  | 'L02'
  | 'L03'
  | 'L04'
  | 'L05'
  | 'L06'
  | 'L07'
  | 'L08'
  | 'L09'
  | 'L10'
  | 'L11'
  | 'L12';

export type UserRoleCode =
  | 'U01'
  | 'U02'
  | 'U03'
  | 'U04'
  | 'U05'
  | 'U06'
  | 'U07'
  | 'U08'
  | 'U09';

export type ProvinceId =
  | 'PR-01'
  | 'PR-02'
  | 'PR-03'
  | 'PR-04'
  | 'PR-05'
  | 'PR-06'
  | 'PR-07';

export type VerificationStatus =
  | 'Pending'
  | 'Verified'
  | 'Rejected'
  | 'Suspended'
  | 'Expired';

export type ListingStatus =
  | 'Draft'
  | 'PendingReview'
  | 'Published'
  | 'Rejected'
  | 'Suspended'
  | 'Archived';

export type SubscriptionTier =
  | 'Standard'
  | 'Featured'
  | 'Sponsored'
  | 'Enterprise';

export type ServiceCategory =
  | 'Hotel'
  | 'Homestay'
  | 'Resort'
  | 'Guide'
  | 'TrekkingAgency'
  | 'TourPackage'
  | 'Transport'
  | 'AdventureActivity';

export type InquiryStatus =
  | 'Submitted'
  | 'Delivered'
  | 'Responded'
  | 'Confirmed'
  | 'Declined'
  | 'Expired'
  | 'Cancelled';

export type ArrangementStatus =
  | 'Pending'
  | 'ConfirmedByPartner'
  | 'Completed'
  | 'Cancelled'
  | 'NoShow';

export type PaymentStatus =
  | 'NotApplicable'
  | 'Inactive'
  | 'Pending'
  | 'Authorized'
  | 'Captured'
  | 'Failed';

export type CommissionStatus =
  | 'Pending'
  | 'Eligible'
  | 'Invoiced'
  | 'Settled'
  | 'Reversed'
  | 'Waived';

export interface LanguageEntry {
  code: LanguageCode;
  isoCode: string;
  nameEn: string;
  nativeName: string;
  phase: 'Phase 1 (Production Active)' | 'Phase 2 Expansion' | 'Phase 3 Global';
  isActiveInUi: boolean;
}

export interface DistrictEntry {
  id: string;
  nameEn: string;
  nameNe: string;
  provinceId: ProvinceId;
  headquartersEn: string;
  headquartersNe: string;
  tier: 'Tier A' | 'Tier B' | 'Tier C';
  elevationRangeMeters: string;
  maxAltitudeMeters: number;
  permitsRequired: string[];
  keyHighlightsEn: string[];
  keyHighlightsNe: string[];
  highwaySpeedKmh: number;
  emergencyHubEn: string;
  bestSeasons: string[];
}

export interface ProvinceEntry {
  id: ProvinceId;
  number: number;
  nameEn: string;
  nameNe: string;
  capitalEn: string;
  capitalNe: string;
  districtCount: number;
  signatureCorridorEn: string;
  signatureCorridorNe: string;
  highestPeakEn: string;
  highestPeakMeters: number;
  heroImageUrl: string;
  svgPath: string;
  labelX: number;
  labelY: number;
}

export interface PartnerListingRecord {
  id: string;
  ownerUid: string;
  titleEn: string;
  titleNe: string;
  category: ServiceCategory;
  provinceId: ProvinceId;
  districtName: string;
  municipality: string;
  summaryEn: string;
  summaryNe: string;
  priceNpr: number;
  priceUsdEstimate: number;
  pricingUnit: 'per_night' | 'per_day' | 'per_person' | 'per_trip';
  maxElevationMeters: number;
  durationDays: number;
  registrationNumber: string;
  panVatNumber: string;
  verificationStatus: VerificationStatus;
  listingStatus: ListingStatus;
  subscriptionTier: SubscriptionTier;
  isFeatured: boolean;
  isSponsored: boolean;
  ratingAvg: number;
  reviewCount: number;
  responseSlaHours: number;
  imageUrl: string;
  permitsRequired: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface PartnerKycRecord {
  id: string;
  listingId: string;
  partnerUid: string;
  businessLegalName: string;
  authorityName: 'DOT' | 'NTB' | 'TAAN' | 'NMA' | 'CompanyRegistrar' | 'LocalMunicipality';
  licenseNumber: string;
  panVatNumber: string;
  licenseExpiryDate: string;
  contactPhone: string;
  contactEmail: string;
  documentSummary: string;
  verificationStatus: VerificationStatus;
  reviewerNotes: string;
  reviewedByUid: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface BookingInquiryRecord {
  id: string;
  travelerUid: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  partnerUid: string;
  listingId: string;
  listingTitle: string;
  listingCategory: string;
  provinceId: string;
  districtName: string;
  preferredStartDate: string;
  preferredEndDate: string;
  groupSize: number;
  travelerNotes: string;
  partnerResponseNotes: string;
  quotedTotalNpr: number;
  commissionRatePercent: number;
  expectedCommissionNpr: number;
  revenueStreamCode: 'R01' | 'R02' | 'R03' | 'R04' | 'R05' | 'R06';
  vcvCode: string;
  inquiryStatus: InquiryStatus;
  arrangementStatus: ArrangementStatus;
  paymentStatus: PaymentStatus;
  commissionStatus: CommissionStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TravelerItineraryRecord {
  id: string;
  ownerUid: string;
  title: string;
  provinceId: string;
  durationDays: number;
  budgetTier: 'Budget' | 'Standard' | 'Comfort' | 'Luxury';
  maxElevationMeters: number;
  acclimatizationCompliant: boolean;
  permitsChecklist: string;
  planMarkdown: string;
  offlinePackReady: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TravelerReviewRecord {
  id: string;
  listingId: string;
  authorUid: string;
  authorName: string;
  vcvCode: string;
  rating: number;
  comment: string;
  moderationStatus: 'Published' | 'Flagged' | 'Removed';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface SupportCaseRecord {
  id: string;
  reporterUid: string;
  reporterName: string;
  category: 'EmergencyRouting' | 'InquiryDelay' | 'KycDispute' | 'SafetyConcern' | 'GeneralSupport';
  priority: 'Critical' | 'High' | 'Normal';
  provinceId: string;
  districtName: string;
  subject: string;
  description: string;
  resolutionNotes: string;
  caseStatus: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AuditLogEntry {
  id: string;
  actorUid: string;
  actorEmail: string;
  actorRole: string;
  actionType: string;
  targetEntityType: string;
  targetEntityId: string;
  reason: string;
  createdAt?: unknown;
}
