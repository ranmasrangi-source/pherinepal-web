# PHERI NEPAL — Payload-First Firestore Security Specification (`security_spec.md`)

**Governing Blueprints:** `Document 06 (PN-DDM-006)` & `Document 09 (PN-SPLC-009)`

## 1. Core Data & Governance Invariants

1. **PII Isolation Invariant (`ENT-001` / `ENT-002`):**
   - Public user profiles live in `/users/{userId}` with zero raw email/phone PII.
   - Private contact PII (`email`, `phone`, `emergencyContact`) is strictly isolated in `/users/{userId}/private/{docId}` and readable ONLY by `isOwner(userId)` or `isAdmin()`.
2. **Self-Assigned Role Prevention (`U01`–`U09`):**
   - During registration (`create` on `/users/{userId}`), a user may ONLY register as `"U02"` (Registered Traveler) or `"U03"` (Partner / Service Provider) — unless the user is the bootstrapped Super Admin (`adventurenepal04@gmail.com` with `email_verified == true`), who may initialize `"U09"`.
   - Standard users can NEVER elevate their `roleCode` to `"U05"`–`"U09"` or modify `accountStatus`.
3. **Verification Independence Invariant (`ENT-016` / `ENT-017` / `ENT-019`):**
   - When a Partner (`U03`) creates a listing in `/partner_listings/{listingId}`, `verificationStatus` MUST be `"Pending"`, `isFeatured` MUST be `false`, and `isSponsored` MUST be `false`.
   - Only an Admin / Verification Officer (`isAdmin()`) can transition `verificationStatus` to `"Verified"`, `"Rejected"`, `"Suspended"`, or `"Expired"`.
4. **KYC Document Confidentiality (`ENT-017`):**
   - `/partner_kyc/{kycId}` contains sensitive registration numbers, PAN/VAT numbers, and personal contact details. `get` and `list` are strictly restricted to the owning partner (`resource.data.partnerUid == request.auth.uid`) or `isAdmin()`.
5. **Inquiry-First Booking State Separation (`ENT-023` / `ENT-025` / `ENT-029`):**
   - Creating a `/booking_inquiries/{inquiryId}` document MUST start with `inquiryStatus == "Submitted"`, `arrangementStatus == "Pending"`, `paymentStatus == "Inactive"`, and `commissionStatus == "Pending"`.
   - Neither the traveler nor the partner can set `paymentStatus` to `"Captured"` (payments remain gated inactive in Phase 1).
   - Terminal states (`inquiryStatus in ["Declined", "Expired", "Cancelled"]`) are locked from non-admin mutations.
6. **Immutable Append-Only Audit Trail (`ENT-038`):**
   - `/audit_logs/{logId}` can only be created by `isAdmin()`, read by `isAdmin()`, and can NEVER be updated or deleted (`allow update, delete: if false;`).

---

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1 — Privilege Escalation on User Creation:** Authenticated user creates `/users/{uid}` with `roleCode: "U09"` (Super Admin). -> **MUST RETURN `PERMISSION_DENIED`**.
2. **Payload 2 — Shadow Field Injection on User Profile:** User updates `/users/{uid}` adding `{ isSuperAdmin: true }`. -> **MUST RETURN `PERMISSION_DENIED`**.
3. **Payload 3 — Cross-User PII Scraping:** Authenticated User A attempts `get(/users/userB/private/info)`. -> **MUST RETURN `PERMISSION_DENIED`**.
4. **Payload 4 — Unverified Email Admin Spoofing:** Token with `email: "adventurenepal04@gmail.com"` but `email_verified: false` attempts admin KYC approval. -> **MUST RETURN `PERMISSION_DENIED`**.
5. **Payload 5 — Self-Verified Partner Listing Creation:** Partner creates `/partner_listings/{id}` with `verificationStatus: "Verified"`. -> **MUST RETURN `PERMISSION_DENIED`**.
6. **Payload 6 — Unauthorized KYC List Scraping:** Traveler (`U02`) runs unfiltered query on `/partner_kyc`. -> **MUST RETURN `PERMISSION_DENIED`**.
7. **Payload 7 — Fake Direct Booking Confirmation on Inquiry Creation:** Traveler creates `/booking_inquiries/{id}` with `inquiryStatus: "Confirmed"` and `arrangementStatus: "ConfirmedByPartner"`. -> **MUST RETURN `PERMISSION_DENIED`**.
8. **Payload 8 — Unauthorized Live Payment Capture:** Partner updates `/booking_inquiries/{id}` setting `paymentStatus: "Captured"`. -> **MUST RETURN `PERMISSION_DENIED`**.
9. **Payload 9 — Terminal Inquiry State Mutation:** Partner attempts to update a cancelled inquiry (`existing().inquiryStatus == "Cancelled"`) to `"Confirmed"`. -> **MUST RETURN `PERMISSION_DENIED`**.
10. **Payload 10 — Value Poisoning / Denial-of-Wallet Oversized String:** User sends a 25,000-character string in `travelerNotes` on `/booking_inquiries/{id}`. -> **MUST RETURN `PERMISSION_DENIED`**.
11. **Payload 11 — Client Timestamp Forgery:** User creates `/traveler_reviews/{id}` with a backdated `createdAt` timestamp (`createdAt != request.time`). -> **MUST RETURN `PERMISSION_DENIED`**.
12. **Payload 12 — Audit Log Tampering:** Admin attempts `delete` or `update` on `/audit_logs/{logId}`. -> **MUST RETURN `PERMISSION_DENIED`**.
