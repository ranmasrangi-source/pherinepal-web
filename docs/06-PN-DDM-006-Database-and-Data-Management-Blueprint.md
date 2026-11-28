# PHERI NEPAL
## DOCUMENT 06 — DATABASE AND DATA MANAGEMENT BLUEPRINT

- **Document Code:** PN-DDM-006
- **Version:** 1.0
- **Document Series:** 06 of 12
- **Parent Document:** PN-MPB-001 — Master Project Blueprint
- **Related Documents:** PN-BMR-002, PN-UJFR-003, PN-UXDS-004, PN-TAB-005
- **Document Status:** Blueprint — Version 1.0
- **Project:** PHERI NEPAL — Nepal's Trusted Tourism Ecosystem

---

## 1. DOCUMENT PURPOSE
This document defines the database and data management requirements for PHERI NEPAL.

It establishes the logical data structure, core entities, relationships, identifiers, data ownership, data lifecycle, localization, validation, audit history, retention, backup, and data integrity requirements.

Its purpose is to ensure that every platform module operates using a consistent and controlled data foundation.

This document defines the logical data model independently of the final database technology.
The physical database schema, collection structure, table definitions, indexes, and implementation-specific rules will be finalized after the database technology decision recorded in Document 05.

---

## 2. DATABASE GOVERNANCE AND ALIGNMENT
The database must follow the established project decisions in Documents 01–05.

### 2.1 Core governance rules
1. Every major data entity must have a clearly defined purpose.
2. Every record must have a unique and stable identifier.
3. Related modules must use shared, consistent data definitions.
4. The same information must not be independently maintained in multiple places without a documented reason.
5. User permissions must be enforced through authorized backend operations.
6. Sensitive information must not be exposed through public data access.
7. Financial records must remain traceable.
8. Important changes must be recorded in an audit history.
9. Deleted, suspended, rejected, and archived records must follow controlled lifecycle rules.
10. Database implementation must remain compatible with the architecture established in Document 05.

### 2.2 Source of truth
Each major data category must have an authoritative record.
Examples:
- **User identity:** User Account record.
- **Partner business information:** Partner Business record.
- **Destination information:** Destination record.
- **Booking inquiry:** Booking Inquiry record.
- **Booking arrangement:** Booking Arrangement record.
- **Payment activity:** Payment Transaction record.
- **Commission eligibility:** Commission Record.
- **Verification decision:** Verification Record.
- **Platform content:** Content Management record.

A module may display information from another module, but it must not create an independent conflicting source of truth.

---

## 3. DATABASE DESIGN PRINCIPLES
The database must be designed around the following principles.

### 3.1 Data integrity
Every record must contain valid and consistent information.
The system must validate required fields, relationships, permitted values, and data ownership before accepting changes.

### 3.2 Data consistency
Shared information must remain consistent across the website, dashboards, AI services, search, booking workflows, and administrative tools.

### 3.3 Data security
Private, financial, operational, and administrative information must be protected through appropriate access controls.

### 3.4 Scalability
The logical model must support future growth in users, tourism businesses, destinations, inquiries, languages, content, and transactions.

### 3.5 Maintainability
Data structures must be documented, understandable, and manageable without unnecessary duplication.

### 3.6 Technology independence
Logical entities and relationships must not depend on an unapproved database technology.

---

## 4. DATA ARCHITECTURE OVERVIEW
PHERI NEPAL will use a logically organized data architecture.
The major data domains are:
1. Identity and User Data
2. Partner and Business Data
3. Destination and Tourism Information
4. Travel Services and Products
5. Booking and Inquiry Data
6. Payment and Financial Data
7. Verification and Trust Data
8. Reviews and Reputation Data
9. AI and Travel Planning Data
10. Content and Multilingual Data
11. Notifications and Communication Data
12. Administration and Audit Data
13. Analytics and Reporting Data
14. Integration and System Data

These domains are logical classifications. They do not require separate physical databases.

---

## 5. CORE DATA ENTITY REGISTER
The following entity register defines the principal logical entities.
Entity identifiers are database documentation identifiers. They do not replace the existing module IDs M01–M18 or revenue IDs R01–R14.

| Entity ID | Entity Name | Primary Purpose |
| :--- | :--- | :--- |
| ENT-001 | User Account | Store platform user identity |
| ENT-002 | User Profile | Store user profile information |
| ENT-003 | User Preference | Store language and user preferences |
| ENT-004 | User Role Assignment | Define user roles and access relationships |
| ENT-005 | Partner Business | Store tourism business information |
| ENT-006 | Partner Profile | Store partner account and operational information |
| ENT-007 | Partner Staff | Manage authorized partner team members |
| ENT-008 | Verification Record | Store business verification decisions |
| ENT-009 | Destination | Store destination information |
| ENT-010 | Geographic Area | Represent provinces, districts, and other geographic areas |
| ENT-011 | Tourism Content | Store destination and tourism information |
| ENT-012 | Accommodation | Store accommodation information |
| ENT-013 | Transportation Service | Store transportation service information |
| ENT-014 | Tour and Activity | Store tours, activities, and experience information |
| ENT-015 | Tourism Business Listing | Store public business listing information |
| ENT-016 | Booking Inquiry | Store traveler service inquiries |
| ENT-017 | Booking Arrangement | Store partner-confirmed booking arrangements |
| ENT-018 | Booking Status History | Record booking status changes |
| ENT-019 | Payment Transaction | Record payment-related information |
| ENT-020 | Refund Record | Record approved refund activities |
| ENT-021 | Commission Record | Track potential and earned commissions |
| ENT-022 | Business Subscription | Manage business subscription records |
| ENT-023 | Promotion and Sponsored Listing | Manage paid promotional placements |
| ENT-024 | Affiliate Referral | Track affiliate referrals |
| ENT-025 | Review | Store traveler reviews |
| ENT-026 | Review Response | Store authorized responses to reviews |
| ENT-027 | AI Trip Plan | Store traveler-generated trip plans |
| ENT-028 | AI Interaction Record | Store permitted AI interaction information |
| ENT-029 | Notification | Store notification records |
| ENT-030 | Communication Record | Store relevant platform communication history |
| ENT-031 | Content Translation | Store localized content |
| ENT-032 | Media Asset | Manage images and other media references |
| ENT-033 | Digital Product | Store digital travel products |
| ENT-034 | Marketplace Order | Store marketplace order information |
| ENT-035 | Admin Action Record | Record important administrative actions |
| ENT-036 | Audit Log | Maintain system activity history |
| ENT-037 | External Integration Record | Track external service references and integration status |
| ENT-038 | Analytics Event | Store approved platform activity events |
| ENT-039 | Support Case | Manage user and partner support requests |
| ENT-040 | Consent Record | Record applicable user consent and preference history |

---

## 6. ENTITY DATA REQUIREMENTS
### 6.1 Identity and User Data
#### ENT-001 — User Account
**Purpose:** Maintain a unique account identity for every registered platform user.
**Required logical attributes:**
- User ID
- Authentication provider reference
- Account email, where applicable
- Account phone number, where applicable
- Account status
- Email verification status
- Phone verification status
- Account creation timestamp
- Last account update timestamp
- Last successful login timestamp, where available

**Rules:**
- User IDs must be unique and permanent.
- Authentication credentials must be managed securely by the approved authentication service.
- Plain-text passwords must never be stored.
- Account status must be controlled.
- Public profile information must be separated from private account information.

#### ENT-002 — User Profile
**Purpose:** Store information used to personalize the travel experience.
**Logical attributes:**
- Profile ID
- User ID
- Display name
- Profile image reference
- Country or nationality, when voluntarily provided and necessary
- Preferred contact method
- Profile completion status
- Profile creation and update timestamps

Sensitive personal information must only be collected when necessary and legally justified.

#### ENT-003 — User Preference
**Purpose:** Maintain user-selected platform preferences.
**Logical attributes:**
- Preference ID
- User ID
- Preferred language
- Preferred currency
- Travel interests
- Accessibility preferences, where voluntarily supplied
- Notification preferences
- Preference update timestamp

Preferences must not automatically be treated as verified personal facts.

#### ENT-004 — User Role Assignment
**Purpose:** Connect user accounts with authorized platform roles.
Supported role categories must align with Document 01 and the authorization architecture in Document 05.
Role assignments must support:
- Role identifier
- User identifier
- Assignment status
- Assigned by
- Assignment timestamp
- Expiration, where applicable

Administrative privileges must never be granted solely because a user has registered a normal account.

---

## 7. PARTNER AND BUSINESS DATA
### 7.1 ENT-005 — Partner Business
**Purpose:** Maintain the authoritative business record for a tourism service provider.
**Logical attributes:**
- Business ID
- Legal or registered business name, where applicable
- Public business name
- Business category
- Business description
- Province
- District
- Local area or address
- Geographic coordinates, where available
- Public contact information
- Website or approved external links
- Business operating status
- Listing publication status
- Business creation and update timestamps

One business may provide multiple services.
The system must not require a separate business identity for every individual service offered by the same provider.

### 7.2 ENT-006 — Partner Profile
**Purpose:** Store the partner's platform-specific operational information.
**Logical attributes:**
- Partner Profile ID
- Associated User ID
- Associated Business ID
- Partner account status
- Registration completion status
- Onboarding status
- Partner agreement status
- Account creation and update timestamps

### 7.3 ENT-007 — Partner Staff
**Purpose:** Support authorized staff access for businesses that have multiple representatives.
**Logical attributes:**
- Staff ID
- Business ID
- User ID
- Assigned permission level
- Staff status
- Invitation date
- Activation date
- Removal date, where applicable

Partner staff must only access information authorized for their assigned business and permissions.

### 7.4 ENT-008 — Verification Record
**Purpose:** Maintain a documented history of business verification.
**Logical attributes:**
- Verification ID
- Business ID
- Verification category
- Submitted evidence references
- Review status
- Reviewer ID
- Review decision
- Review notes
- Decision timestamp
- Expiration or re-verification date, where applicable

Verification states must distinguish at least:
- Pending
- Verified
- Rejected
- Suspended
- Expired, where applicable

Verification status must not be automatically changed because a partner purchases a subscription or promotion.
A verification decision must be supported by documented evidence and an authorized review process.

---

## 8. DESTINATION AND TOURISM INFORMATION DATA
### 8.1 ENT-009 — Destination
**Purpose:** Store structured information about Nepal's tourism destinations.
**Logical attributes:**
- Destination ID
- Destination name
- Destination category
- Geographic area reference
- Short description
- Full description reference
- Location information
- Geographic coordinates, where available
- Main image reference
- Visibility status
- Publication status
- Last content review timestamp

The destination directory must support national coverage across all seven provinces and 77 districts.

### 8.2 ENT-010 — Geographic Area
**Purpose:** Maintain standardized geographic references.
**Required hierarchy:**
- Country
- Province
- District
- Local administrative area, where required
- Destination or locality references

**Rules:**
- Geographic records must use stable identifiers.
- Destination records must reference valid geographic records.
- Geographic names and spellings must be standardized.
- Changes to geographic classifications must be controlled.
- The system must not create inconsistent province or district names across modules.

### 8.3 ENT-011 — Tourism Content
**Purpose:** Store structured tourism information used throughout the platform.
**Content categories may include:**
- Visa and entry information
- Travel requirements
- Destination guides
- Accommodation guidance
- Transportation information
- Trekking information
- Permits
- Health and safety information
- Weather-related guidance
- Packing information
- Local culture and customs
- Food information
- Currency and payment guidance
- SIM and internet guidance
- Travel costs and budgeting information

Each content record should include:
- Content ID
- Content category
- Title
- Content body or content reference
- Related destination, where applicable
- Source reference
- Source authority classification
- Publication status
- Created by
- Last reviewed by
- Last reviewed date
- Next review date, where applicable
- Last updated timestamp

Time-sensitive information must display an appropriate last-reviewed or last-updated date.
Official and reliable sources must be prioritized for information involving entry requirements, permits, safety, and regulations.

---

## 9. TOURISM SERVICE DATA
### 9.1 ENT-012 — Accommodation
**Purpose:** Store accommodation service information.
**Logical attributes:**
- Accommodation ID
- Business ID
- Accommodation name
- Accommodation type
- Location
- Description
- Facilities
- Image references
- Price information, where provided
- Availability information, where integrated
- Publication status
- Verification reference

Accommodation records must belong to an identifiable business or approved service provider.

### 9.2 ENT-013 — Transportation Service
**Purpose:** Store transportation service information.
**Logical attributes:**
- Transportation Service ID
- Business ID
- Transportation type
- Service coverage
- Departure and destination information, where applicable
- Vehicle or service details
- Pricing information, where provided
- Contact information
- Publication status

### 9.3 ENT-014 — Tour and Activity
**Purpose:** Store tours, trekking, activities, and experience information.
**Logical attributes:**
- Service ID
- Business ID
- Service category
- Service title
- Description
- Duration
- Location
- Included services
- Excluded services
- Pricing information
- Permit requirements, where applicable
- Availability information, where integrated
- Publication status

### 9.4 ENT-015 — Tourism Business Listing
**Purpose:** Provide a standardized public listing that connects businesses with their services.
A business listing may reference:
- Partner Business
- Accommodation
- Transportation Service
- Tour and Activity
- Related destination
- Verification status
- Published media
- Contact information

A listing must not create a second independent business identity.

---

## 10. BOOKING AND INQUIRY DATA
Booking data must follow the inquiry-first operating model established in Documents 01, 02, 03, and 05.
The system must distinguish between an inquiry, a booking arrangement, a payment transaction, and commission eligibility.
These are separate records and separate operational concepts.

### 10.1 ENT-016 — Booking Inquiry
**Purpose:** Record a traveler's request for a service.
**Logical attributes:**
- Inquiry ID
- Traveler User ID, where registered
- Contact details required for the inquiry
- Service reference
- Business reference
- Destination reference, where applicable
- Requested date or date range
- Number of travelers, where applicable
- Traveler message
- Inquiry submission timestamp
- Inquiry status
- Assigned partner reference
- Response deadline, where configured

**Possible inquiry statuses:**
- Submitted
- Sent to Partner
- Viewed
- Responded
- Closed
- Cancelled
- Expired

An inquiry is not automatically a confirmed booking.

### 10.2 ENT-017 — Booking Arrangement
**Purpose:** Store a booking arrangement after the relevant partner and traveler have reached an agreement.
**Logical attributes:**
- Arrangement ID
- Related Inquiry ID
- Traveler reference
- Business reference
- Service reference
- Agreed service details
- Agreed dates
- Agreed price and currency, where applicable
- Partner confirmation reference
- Traveler acceptance status, where applicable
- Arrangement status
- Confirmation timestamp
- Completion status
- Cancellation status
- Creation and update timestamps

**Possible arrangement statuses:**
- Awaiting Partner Confirmation
- Awaiting Traveler Acceptance
- Confirmed
- In Progress
- Completed
- Cancelled
- Disputed

The exact transition rules must be implemented through controlled backend workflows.

### 10.3 ENT-018 — Booking Status History
**Purpose:** Maintain a traceable record of booking arrangement status changes.
**Logical attributes:**
- Status History ID
- Arrangement ID
- Previous status
- New status
- Changed by
- Change reason
- Timestamp

Previous status history must not be silently overwritten.

### 10.4 Booking data integrity rules
1. Every booking arrangement must reference its originating inquiry or an explicitly approved alternative source.
2. An inquiry must not automatically become a confirmed booking.
3. A partner response must not automatically mean the traveler has accepted an arrangement.
4. Booking status and payment status must remain separate.
5. Completion must be recorded separately from confirmation.
6. A cancelled arrangement must not be treated as completed.
7. A booking arrangement must not automatically generate an earned commission.
8. Changes to agreed commercial details must be traceable.
9. Duplicate inquiries and arrangements must be detected and handled through controlled rules.

---

## 11. PAYMENT AND FINANCIAL DATA
### 11.1 ENT-019 — Payment Transaction
**Purpose:** Maintain records of payment activity when approved payment functionality becomes operational.
**Logical attributes:**
- Payment Transaction ID
- Related Arrangement ID, where applicable
- Payer reference
- Payee reference, where applicable
- Amount
- Currency
- Payment provider reference
- Payment method category
- Transaction status
- Initiation timestamp
- Completion timestamp
- Provider confirmation reference
- Failure reason, where applicable

**Possible payment statuses:**
- Not Required
- Not Initiated
- Pending
- Processing
- Successful
- Failed
- Cancelled
- Partially Refunded
- Refunded

The payment status must not determine the booking status automatically without an approved business rule.
Live payment functionality is not considered operational until the required payment integrations, security checks, legal requirements, and end-to-end testing have been completed.

### 11.2 ENT-020 — Refund Record
**Purpose:** Record refund requests and refund activity.
**Logical attributes:**
- Refund ID
- Original Payment Transaction ID
- Related Arrangement ID
- Requested amount
- Approved amount
- Currency
- Refund reason
- Refund status
- Approval reference
- Provider refund reference
- Request timestamp
- Completion timestamp

A refund record must retain a reference to the original transaction.

### 11.3 ENT-021 — Commission Record
**Purpose:** Track commercial commission records associated with eligible transactions.
**Logical attributes:**
- Commission ID
- Revenue category ID
- Related Arrangement ID, where applicable
- Related Payment Transaction ID, where applicable
- Partner Business ID
- Commission calculation basis
- Applicable rate or fixed amount
- Currency
- Calculated amount
- Eligibility status
- Recognition status
- Adjustment reference
- Creation timestamp
- Approval timestamp

**Commission states must distinguish:**
- Not Eligible
- Pending Eligibility
- Eligible
- Calculated
- Approved
- Earned
- Reversed
- Disputed

**Rules:**
- An inquiry alone does not create earned commission.
- A confirmed arrangement does not automatically establish completed commission eligibility.
- Commission eligibility must follow the approved commercial agreement.
- The system must distinguish Gross Transaction Value from PHERI NEPAL's actual revenue.
- The same commercial transaction must not generate duplicate commission records for the same revenue entitlement.
- Refunds, cancellations, reversals, and adjustments must be traceable.
- Revenue category references must reuse R01–R14 from Documents 01 and 02.

### 11.4 ENT-022 — Business Subscription
**Purpose:** Manage business subscription records.
**Logical attributes:**
- Subscription ID
- Business ID
- Subscription plan reference
- Subscription status
- Start date
- End date
- Renewal setting, where supported
- Amount
- Currency
- Related payment reference
- Cancellation timestamp

Subscription payment must not automatically grant verification or guarantee organic search ranking.

### 11.5 ENT-023 — Promotion and Sponsored Listing
**Purpose:** Manage paid visibility and sponsored placement records.
**Logical attributes:**
- Promotion ID
- Business ID
- Promotion type
- Placement reference
- Start date
- End date
- Commercial amount
- Currency
- Approval status
- Publication status
- Related payment reference

Sponsored content and paid placements must be distinguishable from organic results.

### 11.6 ENT-024 — Affiliate Referral
**Purpose:** Track referral activity associated with approved affiliate partners.
**Logical attributes:**
- Referral ID
- Affiliate partner reference
- Related service or product reference
- Referral source
- External tracking reference
- Referral timestamp
- Conversion status
- Commission reference, where applicable

Referral tracking must comply with applicable consent and privacy requirements.

---

## 12. REVIEW AND REPUTATION DATA
### 12.1 ENT-025 — Review
**Purpose:** Store traveler feedback about eligible services or businesses.
**Logical attributes:**
- Review ID
- Reviewer User ID
- Business ID
- Service reference, where applicable
- Related completed arrangement reference, where applicable
- Rating
- Review text
- Review status
- Submission timestamp
- Moderation timestamp

Review publication must follow documented moderation rules.

### 12.2 ENT-026 — Review Response
**Purpose:** Store responses from authorized businesses or administrators.
**Logical attributes:**
- Response ID
- Review ID
- Responding User ID
- Response text
- Response status
- Creation timestamp
- Update timestamp

Review records must not be silently deleted or altered to manipulate reputation.

---

## 13. AI AND TRAVEL PLANNING DATA
### 13.1 ENT-027 — AI Trip Plan
**Purpose:** Store traveler-created travel plans when the traveler chooses to save them.
**Logical attributes:**
- Trip Plan ID
- Owner User ID
- Plan title
- Destination references
- Travel dates
- Number of travelers
- Travel preferences
- Budget range, where voluntarily provided
- Itinerary structure
- Plan status
- Creation timestamp
- Last update timestamp

Trip plans must support the three travel stages:
- Before Travel
- During Travel
- After Travel

A saved trip plan must remain associated with its owner unless the owner explicitly shares it through an approved sharing function.

### 13.2 ENT-028 — AI Interaction Record
**Purpose:** Maintain only the AI interaction data necessary for approved platform functions.
**Logical attributes:**
- Interaction ID
- User reference, where applicable
- AI service category
- Related trip plan reference, where applicable
- Request timestamp
- Response timestamp
- Provider reference
- Processing status
- Approved usage metadata

AI interaction storage must follow privacy, retention, and data minimization rules.
Sensitive user information must not be retained unnecessarily.
AI-generated content must not be treated as verified official information without appropriate validation.

---

## 14. NOTIFICATION AND COMMUNICATION DATA
### 14.1 ENT-029 — Notification
**Purpose:** Store notification records.
**Logical attributes:**
- Notification ID
- Recipient User ID
- Notification category
- Notification title
- Notification content
- Related record reference
- Delivery channel
- Delivery status
- Created timestamp
- Delivered timestamp
- Read timestamp

### 14.2 ENT-030 — Communication Record
**Purpose:** Maintain relevant communication records associated with platform workflows.
**Logical attributes:**
- Communication ID
- Sender reference
- Recipient reference
- Related inquiry or arrangement reference
- Communication type
- Message reference or approved content
- Delivery status
- Creation timestamp

Private communication must not be publicly accessible.
Access must be restricted to authorized participants and administrators with a legitimate operational purpose.

---

## 15. MULTILINGUAL AND CONTENT DATA
### 15.1 ENT-031 — Content Translation
**Purpose:** Manage localized platform content.
**Logical attributes:**
- Translation ID
- Source content ID
- Language code
- Localized title
- Localized body or content reference
- Translation status
- Reviewer reference
- Last reviewed timestamp

**Language rules:**
- The platform must support 12 languages.
- Nepali and English are the foundational languages.
- The remaining 10 languages must be selected using verified tourist source-country data and language demand.
- Language selection must be periodically reviewed.
- Language codes must follow an approved standard.
- Translations must remain linked to their original content.
- Missing translations must be identifiable.
- Machine-generated translations must not automatically be treated as approved translations.

### 15.2 Content localization rules
The system must support:
- Language-specific titles and descriptions
- Localized interface content
- Localized destination information
- Localized service listings
- Localized notifications
- Localized SEO metadata
- Language-specific publication status

A translation must not overwrite the original source-language content.

---

## 16. MEDIA AND DIGITAL PRODUCT DATA
### 16.1 ENT-032 — Media Asset
**Purpose:** Manage references to images, documents, videos, and other approved media.
**Logical attributes:**
- Media ID
- Storage reference
- Media type
- File format
- File size
- Owner reference
- Related entity reference
- Alternative text, where applicable
- Copyright or usage information
- Upload timestamp
- Approval status

Media files should be stored through the approved storage service.
The database should maintain secure references and metadata rather than unnecessarily storing large media files directly in ordinary data records.

### 16.2 ENT-033 — Digital Product
**Purpose:** Store digital travel products offered through the platform.
**Logical attributes:**
- Product ID
- Product title
- Product category
- Description
- Price
- Currency
- Product file or delivery reference
- Publication status
- Seller or provider reference

### 16.3 ENT-034 — Marketplace Order
**Purpose:** Record orders involving approved digital products or marketplace items.
**Logical attributes:**
- Order ID
- Customer reference
- Product reference
- Seller reference
- Quantity
- Order amount
- Currency
- Order status
- Payment reference
- Fulfilment status
- Creation timestamp

Marketplace orders must remain separate from tourism booking arrangements.

---

## 17. ADMINISTRATION, AUDIT AND SUPPORT DATA
### 17.1 ENT-035 — Admin Action Record
**Purpose:** Record significant administrative actions.
**Logical attributes:**
- Admin Action ID
- Administrator User ID
- Action category
- Target entity
- Target record ID
- Action reason
- Timestamp
- Outcome

Important actions include:
- Business verification decisions
- Listing publication or removal
- User suspension
- Partner suspension
- Review moderation
- Financial approval
- Refund approval
- Promotion approval
- Access permission changes

### 17.2 ENT-036 — Audit Log
**Purpose:** Provide a reliable history of important system changes.
**Logical attributes:**
- Audit ID
- Actor ID
- Actor role
- Action type
- Entity type
- Entity ID
- Previous value reference, where appropriate
- New value reference, where appropriate
- Timestamp
- Request or correlation reference
- Source classification

**Audit requirements:**
1. Important changes must be attributable to an authorized actor or system process.
2. Audit entries must not be silently overwritten.
3. Audit access must be restricted.
4. Sensitive values must be masked or excluded where appropriate.
5. Audit retention must follow the approved retention policy.
6. System administrators must not have unrestricted authority to alter financial or audit history without traceable controls.

### 17.3 ENT-037 — External Integration Record
**Purpose:** Maintain references to external systems and integration activity.
**Logical attributes:**
- Integration Record ID
- Integration provider
- Integration category
- External reference ID
- Related internal entity
- Integration status
- Last synchronization timestamp
- Error status, where applicable

API credentials, private keys, access tokens, and secrets must not be stored as ordinary database fields.
Secrets must be managed through approved secure configuration or secret-management services.

### 17.4 ENT-038 — Analytics Event
**Purpose:** Support approved platform analytics and reporting.
**Logical attributes:**
- Event ID
- Event category
- Event timestamp
- Related module
- Anonymous or approved user reference
- Event metadata
- Source channel

Analytics must use data minimization and appropriate anonymization or aggregation where possible.

### 17.5 ENT-039 — Support Case
**Purpose:** Manage support requests from travelers and partners.
**Logical attributes:**
- Support Case ID
- Requester reference
- Case category
- Related record reference
- Case description
- Assigned support staff
- Case status
- Priority
- Resolution summary
- Creation and closure timestamps

### 17.6 ENT-040 — Consent Record
**Purpose:** Maintain evidence of applicable user consent and preference decisions.
**Logical attributes:**
- Consent ID
- User reference
- Consent category
- Consent status
- Policy or notice version
- Consent timestamp
- Withdrawal timestamp, where applicable
- Collection method

Consent records must support applicable privacy and legal requirements.

---

## 18. ENTITY RELATIONSHIPS
The logical data model must support the following relationships.

| Primary Entity | Relationship | Related Entity |
| :--- | :--- | :--- |
| User Account | One-to-one or one-to-many, as applicable | User Profile |
| User Account | One-to-many | User Preference |
| User Account | One-to-many | User Role Assignment |
| User Account | One-to-many | Partner Profile |
| Partner Business | One-to-many | Partner Staff |
| Partner Business | One-to-many | Verification Record |
| Partner Business | One-to-many | Tourism Business Listing |
| Partner Business | One-to-many | Accommodation |
| Partner Business | One-to-many | Transportation Service |
| Partner Business | One-to-many | Tour and Activity |
| Geographic Area | One-to-many | Destination |
| Destination | One-to-many | Tourism Content |
| User Account | One-to-many | Booking Inquiry |
| Booking Inquiry | One-to-zero-or-many | Booking Arrangement |
| Booking Arrangement | One-to-many | Booking Status History |
| Booking Arrangement | One-to-many, where applicable | Payment Transaction |
| Payment Transaction | One-to-many, where applicable | Refund Record |
| Booking Arrangement | Zero-to-many | Commission Record |
| Partner Business | One-to-many | Business Subscription |
| Partner Business | One-to-many | Promotion and Sponsored Listing |
| User Account | One-to-many | Review |
| Review | One-to-many, where applicable | Review Response |
| User Account | One-to-many | AI Trip Plan |
| AI Trip Plan | One-to-many, where applicable | AI Interaction Record |
| Tourism Content | One-to-many | Content Translation |
| Any approved entity | One-to-many, where applicable | Media Asset |
| User Account | One-to-many | Notification |
| User Account | One-to-many | Support Case |

The final physical relationship implementation will depend on the approved database technology.

---

## 19. UNIQUE IDENTIFIERS AND DATA STANDARDS
Every primary entity must use a unique identifier.

### 19.1 Identifier requirements
- Identifiers must be unique.
- Identifiers must remain stable throughout the record lifecycle.
- Identifiers must not depend on display names or editable business names.
- Identifiers must not expose sensitive personal information.
- Identifiers must be suitable for API and internal system references.
- Deleted identifiers must not be reused for unrelated records.

### 19.2 Standard record metadata
Where applicable, records should include:
- `id`
- `created_at`
- `updated_at`
- `created_by`
- `updated_by`
- `status`
- `version`

Not every entity requires every field. The final implementation must define mandatory metadata according to the entity's purpose.

### 19.3 Date and time standards
- Store timestamps using a consistent timezone-aware standard.
- Use UTC for system-level timestamps.
- Display dates and times according to the user's selected locale and relevant destination timezone.
- Preserve the original timezone context for travel schedules where necessary.
- Avoid storing ambiguous date and time values.

### 19.4 Currency standards
- Store monetary values with an explicit currency code.
- Never assume that all prices are in Nepalese Rupees.
- Preserve original transaction currency.
- Store conversion information separately when currency conversion is required.
- Do not overwrite original transaction amounts with converted display values.

---

## 20. DATA VALIDATION AND INTEGRITY
All critical data must be validated before storage or modification.
Validation must cover:
1. Required fields
2. Field formats
3. Unique identifiers
4. Valid entity references
5. Permitted status values
6. Date and time consistency
7. Currency and monetary values
8. User and partner ownership
9. Role-based permissions
10. Duplicate record detection
11. File and media validation
12. Business workflow rules

Validation must be performed through trusted backend processes.
Frontend validation may improve user experience but must not replace backend validation.

---

## 21. DATA ACCESS AND OWNERSHIP
Access must follow least-privilege principles.

| Data Category | Access Policy |
| :--- | :--- |
| Public destination content | Public read access for published records |
| Public tourism listings | Public read access for approved published records |
| Private user profile | Owner and authorized personnel |
| Authentication data | Approved authentication service only |
| Partner business records | Authorized business users and administrators |
| Partner verification evidence | Authorized verification personnel |
| Booking inquiries | Relevant traveler, assigned partner, authorized administrators |
| Booking arrangements | Relevant traveler, partner, authorized administrators |
| Payment records | Authorized financial and administrative personnel |
| Commission records | Authorized finance and administrative personnel |
| AI trip plans | Owner and explicitly authorized recipients |
| Private communications | Authorized participants and permitted support personnel |
| Audit records | Restricted authorized personnel |
| Analytics records | Authorized analytics and administrative roles |
| Consent records | User and authorized privacy or administrative personnel |

The system must enforce access at the backend and data-service level.

---

## 22. DATA LIFECYCLE MANAGEMENT
Every entity must have a defined lifecycle.
Typical lifecycle stages:
1. Created
2. Validated
3. Active
4. Updated
5. Suspended or restricted, where applicable
6. Archived
7. Deleted or anonymized, where legally permitted

### 22.1 Soft deletion
Where appropriate, records may be marked as inactive, archived, or deleted without immediate physical removal.
Soft deletion must not be used to retain personal information indefinitely without a valid purpose.

### 22.2 Permanent deletion
Permanent deletion must follow approved retention, legal, and privacy requirements.
Deletion of a record must not accidentally destroy financial or audit records that must legally be retained.

### 22.3 Account closure
When a user requests account closure:
- Verify the request.
- Review applicable retention requirements.
- Remove or anonymize information where legally permitted.
- Retain only information that must be kept for legitimate legal or financial purposes.
- Record the closure action.
- Revoke relevant account access.

---

## 23. DATA RETENTION POLICY
PHERI NEPAL must establish a documented retention schedule before production launch.
Retention periods must be determined according to:
- Applicable Nepalese laws
- Applicable international privacy requirements
- Financial and tax obligations
- Contractual obligations
- Security requirements
- Operational necessity
- User rights

The following categories require defined retention periods:

| Data Category | Retention Requirement |
| :--- | :--- |
| User account data | Defined account lifecycle and closure policy |
| User profile data | Defined purpose-based retention |
| Booking inquiry records | Defined operational and legal retention |
| Booking arrangement records | Defined contractual and legal retention |
| Payment records | Applicable financial and legal retention |
| Commission records | Applicable financial and contractual retention |
| Verification evidence | Defined verification and legal retention |
| Reviews | Defined moderation and platform policy |
| AI interaction records | Data minimization and documented retention |
| Notifications | Defined operational retention |
| Communication records | Defined operational and legal retention |
| Audit logs | Defined security and legal retention |
| Analytics events | Defined analytics retention and anonymization policy |
| Consent records | Applicable legal and privacy retention |

No arbitrary retention period should be presented as legally approved before professional review.

---

## 24. BACKUP AND RECOVERY
The production data environment must have a documented backup and recovery strategy.
Requirements:
1. Scheduled database backups.
2. Secure backup storage.
3. Restricted backup access.
4. Encryption in transit and at rest, where supported.
5. Documented backup frequency.
6. Backup retention schedule.
7. Recovery procedures.
8. Periodic restoration testing.
9. Monitoring for backup failures.
10. Documented responsibility for recovery operations.

Recovery objectives must be defined before production launch.
The project must establish:
- Recovery Point Objective (RPO)
- Recovery Time Objective (RTO)
- Backup frequency
- Backup retention duration
- Recovery testing frequency

These values remain Pending Decision until the hosting and database services are selected.

---

## 25. DATA SEARCH, INDEXING AND PERFORMANCE
Database queries must be designed around actual platform usage.
Important query categories include:
- User account lookup
- Business listing lookup
- Destination search
- Province and district filtering
- Service category filtering
- Partner dashboard records
- Booking inquiry management
- Booking arrangement history
- Financial and commission reporting
- Content language lookup
- Notification retrieval
- Administrative search

Indexing requirements must be determined using the final database technology.
General requirements:
- Avoid unnecessary full-record scans.
- Use pagination for large result sets.
- Apply filters and sorting consistently.
- Prevent duplicate search results.
- Protect sensitive records from public search.
- Optimize common queries.
- Monitor slow database operations.
- Review indexes as usage grows.

---

## 26. DATA SECURITY REQUIREMENTS
Database security must follow Document 05 and Document 09 governance.
Required controls include:
- Backend-enforced access authorization
- Least-privilege permissions
- Secure authentication
- Encryption in transit
- Encryption at rest, where supported
- Secure secret management
- Input validation
- Protection against unauthorized data access
- Restricted administrative access
- Audit logging
- Secure backup management
- Monitoring of suspicious access
- Controlled data exports

Sensitive personal, financial, and verification information must not be exposed through public endpoints.

---

## 27. DATA QUALITY MANAGEMENT
PHERI NEPAL must maintain reliable and useful tourism information.
Data quality controls must include:
1. Required-field validation.
2. Duplicate business detection.
3. Duplicate destination detection.
4. Geographic consistency checks.
5. Broken media reference detection.
6. Outdated content identification.
7. Translation completeness checks.
8. Invalid external link detection.
9. Verification expiry monitoring.
10. Inconsistent service information detection.
11. Booking and financial reference validation.
12. Periodic data review.

Tourism information involving regulations, permits, safety, entry requirements, and other time-sensitive matters must have source and review information.

---

## 28. DATA GOVERNANCE BY PLATFORM MODULE
The logical data entities must support the existing module register from Document 01.

| Module ID | Module Name | Primary Data Dependencies |
| :--- | :--- | :--- |
| M01 | Tourism Information | ENT-009, ENT-010, ENT-011, ENT-031 |
| M02 | Destination Directory | ENT-009, ENT-010, ENT-032 |
| M03 | Accommodation Directory | ENT-005, ENT-008, ENT-012, ENT-015 |
| M04 | Transportation Directory | ENT-005, ENT-008, ENT-013, ENT-015 |
| M05 | Tours and Activities | ENT-005, ENT-008, ENT-014, ENT-015 |
| M06 | Business Directory | ENT-005, ENT-008, ENT-015 |
| M07 | Booking Management | ENT-016, ENT-017, ENT-018 |
| M08 | AI Ecosystem | ENT-027, ENT-028, ENT-009, ENT-011 |
| M09 | Multilingual System | ENT-003, ENT-031 |
| M10 | Map and Location System | ENT-009, ENT-010, ENT-012, ENT-013, ENT-014 |
| M11 | Traveler Account | ENT-001, ENT-002, ENT-003, ENT-004 |
| M12 | Partner Account | ENT-001, ENT-004, ENT-005, ENT-006, ENT-007 |
| M13 | Review and Reputation | ENT-025, ENT-026 |
| M14 | Notification System | ENT-029, ENT-030 |
| M15 | Payment and Financial System | ENT-019, ENT-020, ENT-021, ENT-022, ENT-023, ENT-024 |
| M16 | Administration System | ENT-004, ENT-008, ENT-035, ENT-036, ENT-039, ENT-040 |
| M17 | Analytics and Reporting | ENT-021, ENT-038 and approved reporting data |
| M18 | Content Management System | ENT-011, ENT-031, ENT-032 |

This mapping identifies primary data dependencies. It does not create additional platform modules or change the established module scope.

---

## 29. FINANCIAL DATA GOVERNANCE
Financial information must be managed with additional controls.
The system must maintain separate records for:
- Booking arrangement value
- Payment transaction value
- Refund amount
- Commission amount
- Business subscription amount
- Promotion and sponsorship amount
- Affiliate revenue
- Marketplace order value
- Other approved revenue categories

Financial records must:
1. Preserve original transaction references.
2. Preserve original currency.
3. Maintain calculation details.
4. Record approval actions.
5. Support reconciliation.
6. Preserve adjustment history.
7. Restrict unauthorized changes.
8. Avoid duplicate revenue recognition.
9. Distinguish pending revenue from earned revenue.
10. Follow the revenue definitions in Document 02.

The authoritative revenue categories remain R01–R14.
No new revenue category is created by this document.

---

## 30. DATA MIGRATION AND IMPORT GOVERNANCE
If PHERI NEPAL imports data from external sources or migrates between database technologies, it must follow a controlled process.
Requirements:
- Identify the source system.
- Identify the data owner.
- Check data rights and permissions.
- Map source fields to approved logical entities.
- Validate imported records.
- Detect duplicate records.
- Preserve important source references.
- Record migration results.
- Test data integrity.
- Maintain a rollback or recovery procedure where feasible.

Imported tourism information must not be treated as verified solely because it has been imported.

---

## 31. DATABASE TECHNOLOGY IMPLEMENTATION RULE
Document 05 identifies database technology as a pending technical decision.
Therefore, this document does not approve a specific database product.
The logical data model must be evaluated against the final selected database.

The selected implementation must support, either natively or through approved application logic:
- Unique identifiers
- Reliable data relationships
- Access control
- Data validation
- Query and indexing requirements
- Transaction integrity where needed
- Audit history
- Backup and recovery
- Scalability
- Secure integration
- Maintainable data structures

The final selection must be recorded in the technical decision register in Document 05.

---

## 32. PENDING DATABASE DECISIONS
The following items require formal approval before implementation is finalized.

| Decision ID | Pending Decision | Required Outcome |
| :--- | :--- | :--- |
| DD-DB-01 | Database technology | Approve the production database |
| DD-DB-02 | Physical schema structure | Approve tables, collections, and relationships |
| DD-DB-03 | Identifier strategy | Approve primary identifier format |
| DD-DB-04 | Data access architecture | Approve production access-control implementation |
| DD-DB-05 | Search and indexing | Approve indexing and search strategy |
| DD-DB-06 | Backup configuration | Approve backup frequency and retention |
| DD-DB-07 | Recovery objectives | Approve RPO and RTO |
| DD-DB-08 | Data retention | Approve retention schedule |
| DD-DB-09 | Analytics data policy | Approve event collection and anonymization rules |
| DD-DB-10 | AI data retention | Approve AI interaction storage and deletion rules |
| DD-DB-11 | Migration strategy | Approve data migration and import procedures |
| DD-DB-12 | Financial data controls | Approve reconciliation and financial audit requirements |

These decisions must be resolved through the relevant technical, operational, legal, and security approval processes.

---

## 33. IMPLEMENTATION DEPENDENCIES
This document defines logical data requirements. Implementation depends on the following documents:
- **Document 05 — Technical Architecture Blueprint:** Database technology, hosting, backend, authentication, and infrastructure decisions.
- **Document 07 — API and Third-Party Integration Blueprint:** API data exchange, external provider references, and integration workflows.
- **Document 08 — AI and Intelligent Services Blueprint:** AI data access, interaction processing, and retention requirements.
- **Document 09 — Security, Privacy and Legal Compliance Blueprint:** Data protection, access control, consent, retention, and legal requirements.
- **Document 10 — Admin, Partner and Operations Blueprint:** Administrative permissions, verification workflows, partner operations, and financial controls.
- **Document 12 — Testing, Deployment and Maintenance Blueprint:** Database testing, migration, backup, deployment, and maintenance procedures.

These documents must use the same logical entity definitions and established project identifiers.

---

## 34. DATABASE ACCEPTANCE CRITERIA
The database design will be considered ready for implementation when:
1. All required logical entities are documented.
2. Entity identifiers are unique and consistent.
3. Relationships are clearly defined.
4. Existing module IDs M01–M18 remain unchanged.
5. Revenue IDs R01–R14 remain unchanged.
6. User and partner data ownership is defined.
7. Booking inquiry and booking arrangement records are separate.
8. Booking, payment, and commission statuses are separate.
9. Financial information is traceable.
10. Verification records are independent of commercial subscriptions.
11. Multilingual content is supported.
12. Geographic data supports seven provinces and 77 districts.
13. Public and private data are appropriately separated.
14. Audit and history requirements are documented.
15. Data retention and deletion rules are defined.
16. Backup and recovery requirements are approved.
17. Security and authorization requirements are documented.
18. The logical model is compatible with the approved database technology.
19. No unresolved data relationship creates a conflict between platform modules.
20. Implementation requirements are traceable to the approved blueprint series.

---

## 35. DOCUMENT CONTROL AND CONSISTENCY
This document is subordinate to the Master Project Blueprint and must remain consistent with the approved project decisions.
The following rules apply:
- Document 01 remains the authority for overall project scope, module IDs, and revenue categories.
- Document 02 remains the authority for the business model and revenue rules.
- Document 03 remains the authority for user journeys and functional requirements.
- Document 04 remains the authority for UI/UX and design standards.
- Document 05 remains the authority for technical architecture and technology decisions.
- Document 06 defines the logical database and data management requirements.

Any future change affecting multiple documents must be reviewed for consistency and recorded through document version control.
No implementation team should independently introduce conflicting data definitions, identifiers, booking rules, or financial rules.

---

## 36. FINAL GOVERNANCE STATEMENT
The PHERI NEPAL database must serve as a consistent, secure, traceable, and scalable data foundation for the national tourism ecosystem.
Every platform module must use clearly defined data entities, controlled relationships, appropriate access permissions, and documented data lifecycle rules.
The system must preserve the distinction between public tourism information, private user information, partner business records, booking arrangements, payment transactions, and financial entitlements.
The database implementation must remain aligned with the approved technical architecture and must not activate unapproved payment, booking, or commercial functionality.
Document 06 establishes the logical database and data management foundation for PHERI NEPAL.

---

## 37. VERSION 2.0 PHYSICAL SCHEMA INDEXING, CONCURRENCY & CURRENCY LEDGER SPECIFICATIONS

### 37.1 Mandatory Composite & Geospatial Index Register (`ENT-001` to `ENT-040`)
To guarantee `< 250ms` query response times across all 7 provinces, 77 districts, and 12 languages, the database layer must maintain the following composite and geospatial indexes:

| Index ID | Target Entity | Indexed Attributes (Order Matters) | Query Purpose |
| :--- | :--- | :--- | :--- |
| `IDX-001` | `ENT-008` (Districts) | `(province_id, readiness_tier, slug)` | Fast province-to-district drilldown and SEO sitemap filtering. |
| `IDX-002` | `ENT-010` (Destinations) | `(province_id, district_id, publication_status, is_featured)` | Multi-facet destination directory filtering (`M02`). |
| `IDX-003` | `ENT-011` (Destination Translations) | `UNIQUE (destination_id, language_code, translation_status)` | Zero-duplicate localized content lookup (`M09`). |
| `IDX-004` | `ENT-015` (Business Partners) | `(verification_status, business_category, province_id, district_id)` | Verified partner directory search (`M06`) and admin verification queue (`U05`). |
| `IDX-005` | `ENT-017` (Verification Documents) | `(partner_id, document_status, expiry_date)` | Automated daily scan for expiring licenses (30/15/7-day alerts). |
| `IDX-006` | `ENT-018`–`ENT-021` (Listings) | `(partner_id, listing_type, publication_status, verification_status, base_price_npr)` | Cross-category accommodation, tour, transport, and activity filtering. |
| `IDX-007` | `ENT-025` (Booking Inquiries) | `(partner_id, inquiry_status, sla_deadline_at, created_at DESC)` | Partner mobile inquiry inbox and 24h/48h stale inquiry escalation scanner. |
| `IDX-008` | `ENT-025` (Booking Inquiries) | `(traveler_user_id, inquiry_status, created_at DESC)` | Traveler dashboard inquiry & arrangement tracker (`M11`). |
| `IDX-009` | `ENT-034` (Reviews) | `(target_entity_type, target_entity_id, moderation_status, is_verified_stay)` | Verified review aggregation and anti-manipulation filtering (`M13`). |
| `IDX-010` | `ENT-037` (Map Locations) | `GEOSPATIAL / BOUNDING_BOX (latitude, longitude, province_id)` | "Nearby During Travel" discovery for hospitals, police, stays, and attractions (`M10`). |

### 37.2 Optimistic Concurrency Control & Double-Booking Prevention (`ENT-021` & `ENT-026`)
To prevent race conditions when a partner receives multiple concurrent inquiries for the same room, vehicle, or licensed guide on overlapping dates:
1. **Inventory Capacity & Date-Slot Ledger (`ENT-021A` — `ListingAvailabilitySlot`):**
   - Stores `(listing_id, service_date, total_capacity, confirmed_count, held_count, version_number)`.
2. **Atomic Confirmation Lock:**
   - Multiple travelers may submit *Inquiries* (`ENT-025`) for the same dates without locking inventory.
   - However, when a Business Partner (`U03`) clicks **`[Confirm Availability & Issue Arrangement]`** (`ENT-026`), the database executes an atomic compare-and-swap check:
     `UPDATE listing_availability SET confirmed_count = confirmed_count + :guests, version_number = version_number + 1 WHERE listing_id = :id AND service_date = :date AND (confirmed_count + :guests) <= total_capacity AND version_number = :expected_version`.
   - If capacity is exhausted, the confirmation is blocked with a clear conflict warning, and competing open inquiries for that exhausted slot are automatically flagged for `"Suggest Alternative Dates or Partner"`.

### 37.3 Multi-Currency & Statutory Tax Columns (`ENT-026`, `ENT-027`, `ENT-029`)
Every financial and booking arrangement entity must include immutable snapshot fields:
- `base_currency_code` (Fixed to `'NPR'`)
- `base_gross_amount_npr` (`DECIMAL(12,2)`)
- `vat_rate_percent` (`DECIMAL(5,2)`, default `13.00` for VAT-registered entities, `0.00` for exempt)
- `vat_amount_npr` (`DECIMAL(12,2)`)
- `tds_rate_percent` (`DECIMAL(5,2)`)
- `tds_amount_npr` (`DECIMAL(12,2)`)
- `commission_rate_percent` (`DECIMAL(5,2)`)
- `commission_amount_npr` (`DECIMAL(12,2)`)
- `display_currency_code` (`VARCHAR(3)`, e.g., `'USD'`, `'EUR'`, `'INR'`)
- `display_exchange_rate_to_npr` (`DECIMAL(12,6)`)
- `exchange_rate_captured_at` (`TIMESTAMP WITH TIME ZONE`)
- `checkin_verification_pin` (`VARCHAR(6)`)
- `checkin_verified_at` (`TIMESTAMP WITH TIME ZONE NULL`)

---

**END OF DOCUMENT 06 — PN-DDM-006 (Version 2.0 — Detailed & Audit-Resolved)**
