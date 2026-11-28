import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Ban,
  Landmark,
  FileSearch,
  AlertOctagon,
  History,
  Lock,
  Trash2,
} from 'lucide-react';
import {
  AuditLogEntry,
  BookingInquiryRecord,
  LanguageCode,
  PartnerKycRecord,
  PartnerListingRecord,
  SupportCaseRecord,
  VerificationStatus,
} from '../types/pheriNepal';

interface AdminGovernanceConsoleProps {
  language: LanguageCode;
  isSuperAdminUser: boolean;
  allListings: PartnerListingRecord[];
  allKycSubmissions: PartnerKycRecord[];
  allInquiries: BookingInquiryRecord[];
  allSupportCases: SupportCaseRecord[];
  auditLogs: AuditLogEntry[];
  onAdminKycDecision: (
    listingId: string,
    kycId: string | null,
    newStatus: VerificationStatus,
    reviewerNotes: string
  ) => Promise<void>;
  onAdminDeleteListing: (listingId: string) => Promise<void>;
  onAdminCommissionAction: (
    inquiryId: string,
    newCommissionStatus: 'Eligible' | 'Invoiced' | 'Settled' | 'Waived'
  ) => Promise<void>;
  onAdminResolveSupportCase: (
    caseId: string,
    resolutionNotes: string,
    newStatus: 'InProgress' | 'Resolved' | 'Closed'
  ) => Promise<void>;
}

export const AdminGovernanceConsole: React.FC<AdminGovernanceConsoleProps> = ({
  language,
  isSuperAdminUser,
  allListings,
  allKycSubmissions,
  allInquiries,
  allSupportCases,
  auditLogs,
  onAdminKycDecision,
  onAdminDeleteListing,
  onAdminCommissionAction,
  onAdminResolveSupportCase,
}) => {
  const isNe = language === 'L02';
  const [reviewerNotesMap, setReviewerNotesMap] = useState<Record<string, string>>({});
  const [supportNotesMap, setSupportNotesMap] = useState<Record<string, string>>({});

  // Calculate R01-R14 Financial & Tax Ledger metrics (Document 02 Section 26)
  const confirmedInquiries = allInquiries.filter(
    (i) => i.inquiryStatus === 'Confirmed' || i.arrangementStatus === 'ConfirmedByPartner'
  );
  const grossBookingVolumeNpr = confirmedInquiries.reduce(
    (acc, i) => acc + (Number(i.quotedTotalNpr) || 0),
    0
  );
  const grossCommissionNpr = confirmedInquiries.reduce(
    (acc, i) => acc + (Number(i.expectedCommissionNpr) || 0),
    0
  );
  const nepalVat13Npr = Math.round(grossCommissionNpr * 0.13);
  const statutoryTds15Npr = Math.round(grossCommissionNpr * 0.015);
  const netReceivableNpr = grossCommissionNpr + nepalVat13Npr - statutoryTds15Npr;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#123D32] text-[#F7F5EF] rounded-xl p-6 border border-[#C6A15B]/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#C6A15B] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>
                U05 VERIFICATION • U07 FINANCE & VAT/TDS • U08 SUPPORT • U09 SUPER ADMIN
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold">
              {isNe
                ? 'प्रशासनिक गभर्नेन्स, KYC प्रमाणीकरण, राजस्व (१३% VAT/TDS) र अडिट कन्सोल'
                : 'Platform Governance, KYC Verification Queue, R01–R14 Tax Ledger & Audit Console'}
            </h2>
            <p className="text-sm text-[#F7F5EF]/80 mt-1 max-w-3xl">
              {isNe
                ? 'यहाँ गरिने प्रत्येक निर्णय वास्तविक Firestore डाटाबेसमा लागू हुन्छ र अपरिवर्तनीय (Immutable) ENT-038 Audit Log मा दर्ता हुन्छ।'
                : 'Every verification decision, commission settlement, and support resolution executes against live Firestore rules and writes an immutable ENT-038 audit log record.'}
            </p>
          </div>
          <div className="bg-[#0D2E25] border border-[#C6A15B]/30 rounded-lg px-4 py-3 text-right">
            <div className="text-xs font-mono-code text-[#C6A15B]">ACCESS AUTHORITY</div>
            <div className="text-base font-mono-code font-bold text-[#F7F5EF]">
              {isSuperAdminUser ? 'U09 SUPER ADMIN ACTIVE' : 'READ / ROLE RESTRICTED'}
            </div>
            <div className="text-[11px] text-[#F7F5EF]/70">Zero-Trust Firestore Enforced</div>
          </div>
        </div>
      </div>

      {!isSuperAdminUser && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-3">
          <Lock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Firestore Zero-Trust Admin Gate:</span> Administrative mutations (`U05`–`U09`) are cryptographically locked in `firestore.rules` to the verified platform administrator (`adventurenepal04@gmail.com`) or users granted an active `U05`–`U09` role document. Sign in with your Google account to execute live KYC approvals and audit writes.
          </div>
        </div>
      )}

      {/* R01–R14 Revenue, 13% VAT & TDS Financial Ledger (Document 02 Section 26.3) */}
      <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#123D32]/10 pb-3">
          <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#C6A15B]" />
            <span>
              {isNe
                ? 'U07 राजस्व, कमिसन (R01–R14), नेपाल १३% VAT र १.५% TDS लेजर'
                : 'U07 Commission Reconciliation, Nepal 13% VAT & 1.5% TDS Statutory Ledger (ENT-029)'}
            </span>
          </h3>
          <span className="text-xs font-mono-code bg-[#F7F5EF] text-[#123D32] px-2.5 py-1 rounded">
            ENABLE_LIVE_PAYMENTS = false (Phase 1 Inquiry-First Invoice Mode)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/10">
            <div className="text-[11px] font-mono-code text-[#263746]/70">
              CONFIRMED VCV VOLUME
            </div>
            <div className="text-lg font-mono-code font-bold text-[#123D32] mt-0.5">
              NPR {grossBookingVolumeNpr.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/10">
            <div className="text-[11px] font-mono-code text-[#263746]/70">
              R01–R06 COMMISSION
            </div>
            <div className="text-lg font-mono-code font-bold text-[#123D32] mt-0.5">
              NPR {grossCommissionNpr.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/10">
            <div className="text-[11px] font-mono-code text-[#263746]/70">
              NEPAL 13% VAT
            </div>
            <div className="text-lg font-mono-code font-bold text-[#123D32] mt-0.5">
              + NPR {nepalVat13Npr.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/10">
            <div className="text-[11px] font-mono-code text-[#263746]/70">
              STATUTORY 1.5% TDS
            </div>
            <div className="text-lg font-mono-code font-bold text-amber-800 mt-0.5">
              - NPR {statutoryTds15Npr.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#123D32] text-[#F7F5EF]">
            <div className="text-[11px] font-mono-code text-[#C6A15B]">
              NET PLATFORM RECEIVABLE
            </div>
            <div className="text-lg font-mono-code font-bold mt-0.5">
              NPR {netReceivableNpr.toLocaleString()}
            </div>
          </div>
        </div>

        {allInquiries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#123D32]/15 text-[#263746]/75 font-mono-code">
                  <th className="py-2 pr-3">VCV Code</th>
                  <th className="py-2 pr-3">Listing & Stream</th>
                  <th className="py-2 pr-3">Inquiry / Arrangement</th>
                  <th className="py-2 pr-3">Quoted NPR</th>
                  <th className="py-2 pr-3">Commission NPR</th>
                  <th className="py-2 pr-3">Commission Status</th>
                  <th className="py-2">U07 Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123D32]/10">
                {allInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td className="py-2.5 pr-3 font-mono-code font-bold text-[#123D32]">
                      {inq.vcvCode}
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="font-semibold text-[#123D32]">{inq.listingTitle}</div>
                      <div className="text-[11px] font-mono-code text-[#263746]/70">
                        {inq.revenueStreamCode} ({inq.commissionRatePercent}%)
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 font-mono-code">
                      {inq.inquiryStatus} / {inq.arrangementStatus}
                    </td>
                    <td className="py-2.5 pr-3 font-mono-code">
                      NPR {inq.quotedTotalNpr.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-3 font-mono-code font-semibold text-[#123D32]">
                      NPR {inq.expectedCommissionNpr.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className="px-2 py-0.5 rounded bg-[#F7F5EF] border border-[#123D32]/20 font-mono-code font-semibold">
                        {inq.commissionStatus}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {isSuperAdminUser && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onAdminCommissionAction(inq.id, 'Invoiced')}
                            className="px-2 py-1 rounded bg-[#123D32] text-white text-[11px] font-semibold cursor-pointer"
                          >
                            Invoice
                          </button>
                          <button
                            type="button"
                            onClick={() => onAdminCommissionAction(inq.id, 'Settled')}
                            className="px-2 py-1 rounded bg-emerald-700 text-white text-[11px] font-semibold cursor-pointer"
                          >
                            Settle
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* U05 Verification Officer Queue (ENT-017 / ENT-018) */}
      <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#123D32]/10 pb-3">
          <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-[#C6A15B]" />
            <span>
              {isNe
                ? `U05 साझेदार KYC प्रमाणीकरण क्यु (${allListings.length} सेवा सूचीहरू)`
                : `U05 Evidence-Based Partner KYC Verification Queue (${allListings.length} Listings)`}
            </span>
          </h3>
          <span className="text-xs font-mono-code text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
            SLA &lt;= 48 Hours • Independent of Paid Tiers
          </span>
        </div>

        {allListings.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#F7F5EF] border border-[#123D32]/15 text-center space-y-2">
            <p className="text-sm font-bold text-[#123D32]">
              {isNe
                ? 'अहिले प्रमाणीकरण क्युमा ० सेवा सूचीहरू छन् (कुनै पनि पूर्व-प्रमाणित डमी डाटा छैन)।'
                : '0 Partner Listings in Queue — Zero Pre-Verified or Dummy Listings'}
            </p>
            <p className="text-xs text-[#263746]/80 max-w-2xl mx-auto">
              {isNe
                ? 'जब साझेदार (U03) ले "Partner Desk (U03)" बाट वास्तविक व्यवसाय र सरकारी दर्ता (DOT/NTB/TAAN/NMA) तथा PAN/VAT प्रमाण पेश गर्छन्, ती सूचीहरू सुरुमा "Pending" अवस्थामा यहाँ देखिनेछन्। यहाँबाट जाँच गरी "Verify" गरेपछि मात्र ती सेवाहरूले "KYC VERIFIED" ब्याज पाउनेछन्।'
                : 'When a partner submits a business and KYC evidence through Partner Desk (U03), it enters Firestore with VerificationStatus = "Pending" and appears here for U05/U09 inspection. A listing only becomes "Verified" after explicit approval here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {allListings.map((lst) => {
              const kyc = allKycSubmissions.find((k) => k.listingId === lst.id);
              const noteVal =
                reviewerNotesMap[lst.id] !== undefined
                  ? reviewerNotesMap[lst.id]
                  : kyc?.reviewerNotes ||
                    'Verified against DOT/NTB registration & IRD PAN/VAT registry.';

              return (
                <div
                  key={lst.id}
                  className="p-4 rounded-xl bg-[#F7F5EF] border border-[#123D32]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                          lst.verificationStatus === 'Verified'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : lst.verificationStatus === 'Pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        {lst.verificationStatus}
                      </span>
                      <span className="text-xs font-mono-code text-[#123D32] font-semibold">
                        {lst.provinceId} • {lst.districtName} • {lst.category}
                      </span>
                      <span className="text-xs font-mono-code text-[#263746]/70">
                        Commercial Tier: {lst.subscriptionTier}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#123D32]">
                      {lst.titleEn} ({lst.titleNe})
                    </h4>
                    <div className="text-xs font-mono-code text-[#263746]/80">
                      License/Reg: <span className="font-bold">{lst.registrationNumber}</span> •
                      PAN/VAT: <span className="font-bold">{lst.panVatNumber}</span>
                      {kyc && (
                        <>
                          {' '}
                          • Authority: {kyc.authorityName} • Expiry: {kyc.licenseExpiryDate}
                        </>
                      )}
                    </div>
                  </div>

                  {isSuperAdminUser && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                      <input
                        type="text"
                        value={noteVal}
                        onChange={(e) =>
                          setReviewerNotesMap((prev) => ({
                            ...prev,
                            [lst.id]: e.target.value,
                          }))
                        }
                        placeholder="Audit decision reason..."
                        className="px-3 py-1.5 bg-white border border-[#123D32]/20 rounded text-xs min-w-[210px]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onAdminKycDecision(lst.id, kyc?.id || null, 'Verified', noteVal)
                        }
                        className="px-3 py-1.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verify
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onAdminKycDecision(lst.id, kyc?.id || null, 'Rejected', noteVal)
                        }
                        className="px-3 py-1.5 rounded bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onAdminKycDecision(lst.id, kyc?.id || null, 'Suspended', noteVal)
                        }
                        className="px-3 py-1.5 rounded bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition flex items-center gap-1 cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        Suspend
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdminDeleteListing(lst.id)}
                        title="Delete Listing from Firestore"
                        className="px-2.5 py-1.5 rounded bg-slate-800 text-white text-xs font-semibold hover:bg-black transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* U08 Support & Emergency Escalation Cases (ENT-036) + ENT-038 Immutable Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Cases */}
        <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-3 shadow-xs">
          <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-[#C6A15B]" />
            <span>
              {isNe
                ? `U08 सहायता तथा आपतकालीन टिकटहरू (${allSupportCases.length})`
                : `U08 Support & Emergency Escalation Queue (${allSupportCases.length})`}
            </span>
          </h3>

          {allSupportCases.length === 0 ? (
            <p className="text-xs text-[#263746]/75">
              No active support or emergency routing tickets in queue.
            </p>
          ) : (
            <div className="space-y-3">
              {allSupportCases.map((sc) => {
                const resNote =
                  supportNotesMap[sc.id] !== undefined
                    ? supportNotesMap[sc.id]
                    : sc.resolutionNotes;
                return (
                  <div
                    key={sc.id}
                    className="p-3.5 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono-code text-xs font-bold">
                        {sc.priority} • {sc.category}
                      </span>
                      <span className="text-xs font-mono-code font-bold text-[#123D32]">
                        Status: {sc.caseStatus}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#123D32]">{sc.subject}</div>
                    <div className="text-xs text-[#263746]">{sc.description}</div>
                    <div className="text-[11px] font-mono-code text-[#263746]/70">
                      Reporter: {sc.reporterName} • {sc.provinceId} / {sc.districtName}
                    </div>
                    {isSuperAdminUser && sc.caseStatus !== 'Closed' && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={resNote}
                          onChange={(e) =>
                            setSupportNotesMap((prev) => ({
                              ...prev,
                              [sc.id]: e.target.value,
                            }))
                          }
                          placeholder="Resolution action note..."
                          className="flex-1 px-2.5 py-1 bg-white border border-[#123D32]/20 rounded text-xs"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onAdminResolveSupportCase(
                              sc.id,
                              resNote || 'Coordinated with Tourist Police 1144 & local partner.',
                              'Resolved'
                            )
                          }
                          className="px-3 py-1 rounded bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ENT-038 Immutable Audit Trail */}
        <div className="bg-white rounded-xl border border-[#123D32]/15 p-6 space-y-3 shadow-xs">
          <h3 className="text-lg font-serif-display font-bold text-[#123D32] flex items-center gap-2">
            <History className="w-5 h-5 text-[#C6A15B]" />
            <span>
              {isNe
                ? `ENT-038 अपरिवर्तनीय (Append-Only) अडिट लग (${auditLogs.length})`
                : `ENT-038 Immutable Administrative Audit Log (${auditLogs.length})`}
            </span>
          </h3>

          {auditLogs.length === 0 ? (
            <p className="text-xs text-[#263746]/75">
              {isNe
                ? 'कुनै पनि KYC निर्णय वा प्रशासनिक कार्य भएपछि यहाँ स्वचालित रूपमा अपरिवर्तनीय रेकर्ड बस्नेछ।'
                : 'Audit log entries appear here automatically whenever a verification decision or commission update is executed.'}
            </p>
          ) : (
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-mono-code">
                    <span className="font-bold text-[#123D32]">{log.actionType}</span>
                    <span className="text-[#263746]/70">
                      {log.actorRole} • {log.actorEmail}
                    </span>
                  </div>
                  <div className="text-[#263746]">
                    Target: <span className="font-mono-code">{log.targetEntityType}</span> (
                    <span className="font-mono-code">{log.targetEntityId}</span>)
                  </div>
                  <div className="text-[#263746]/80 italic">Reason: {log.reason}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
