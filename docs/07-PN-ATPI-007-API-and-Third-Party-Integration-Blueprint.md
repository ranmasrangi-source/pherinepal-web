# PHERI NEPAL
## DOCUMENT 07 — API AND THIRD-PARTY INTEGRATION BLUEPRINT

- **Document Code:** PN-ATPI-007
- **Version:** 1.0
- **Document Series:** 07 of 12
- **Parent Document:** PN-MPB-001 — Master Project Blueprint
- **Related Documents:** PN-BMR-002, PN-UJFR-003, PN-UXDS-004, PN-TAB-005, PN-DDM-006
- **Document Status:** Blueprint — Version 1.0
- **Project:** PHERI NEPAL — Nepal's Trusted Tourism Ecosystem

---

## 1. DOCUMENT PURPOSE
This document defines the API architecture, integration standards, third-party service requirements, data exchange rules, and external service governance for PHERI NEPAL.

It establishes how the website, backend services, database, AI services, payment providers, mapping services, communication services, and other approved external systems communicate with one another.

The purpose is to ensure that integrations are:
- Secure
- Reliable
- Documented
- Maintainable
- Scalable
- Traceable
- Consistent with the approved platform architecture

This document defines integration requirements and logical API responsibilities. It does not claim that any external provider has already been selected, contracted, or activated.

---

## 2. API AND INTEGRATION GOVERNANCE
All APIs and third-party integrations must follow the governance established in Documents 01–06.

### 2.1 Core principles
1. The backend must control access to protected platform data.
2. External services must be accessed through approved integration layers.
3. Sensitive credentials must never be exposed in public frontend code.
4. Every integration must have a documented purpose.
5. Data exchanged with external services must be limited to what is necessary.
6. External service failures must not unnecessarily disrupt unrelated platform modules.
7. Critical operations must be traceable.
8. Integration permissions must follow least-privilege principles.
9. Third-party services must be evaluated before production use.
10. All integrations must comply with applicable legal, privacy, security, and contractual requirements.

### 2.2 Relationship with other documents
- **Document 05** defines the overall technical architecture and technology decision process.
- **Document 06** defines the logical database entities and data management requirements.
- **Document 07** defines API responsibilities and external integration requirements.
- **Document 08** defines AI and intelligent service requirements.
- **Document 09** defines security, privacy, and legal compliance requirements.
- **Document 10** defines operational responsibilities for administrators and partners.

Document 07 must not independently change the architecture, database model, business model, or platform module scope.

---

## 3. API ARCHITECTURE OVERVIEW
PHERI NEPAL will use a controlled API architecture connecting the frontend with backend services and approved external providers.

### 3.1 Logical architecture
The API architecture consists of:
1. Frontend Application
2. API Entry Layer
3. Authentication and Authorization Layer
4. Application Service Layer
5. Business Logic Layer
6. Data Access Layer
7. Integration Service Layer
8. External Provider Systems
9. Logging and Monitoring Layer

### 3.2 API communication flow
Typical platform communication:
1. A user performs an action on the website.
2. The frontend sends a request to the approved backend API.
3. The backend validates the request.
4. Authentication and authorization are checked.
5. Relevant business rules are executed.
6. The required database operations or external integration calls are performed.
7. The backend validates the result.
8. The API returns a structured response.
9. Relevant operational events are recorded.

The frontend must not directly access protected database operations or private third-party credentials.

### 3.3 API technology
The preferred API approach should be evaluated against the architecture established in Document 05.
A versioned REST API using JSON may be used as the initial standard, subject to technical approval.
Alternative protocols may be considered when a specific integration requires them.
The final API technology and framework remain subject to the technical decision process in Document 05.

---

## 4. API DESIGN STANDARDS
### 4.1 API versioning
All production APIs must support controlled versioning.
Recommended initial structure:
`/api/v1/`

Examples of logical resource paths:
- `/api/v1/users`
- `/api/v1/destinations`
- `/api/v1/businesses`
- `/api/v1/services`
- `/api/v1/inquiries`
- `/api/v1/arrangements`
- `/api/v1/reviews`
- `/api/v1/notifications`
- `/api/v1/admin`

These are illustrative API resource paths, not a declaration that the endpoints have already been implemented.

### 4.2 Naming conventions
API resources should:
- Use consistent naming conventions.
- Represent logical platform resources.
- Avoid ambiguous names.
- Use predictable plural resource names where appropriate.
- Maintain consistent request and response structures.

### 4.3 Request standards
API requests must support appropriate:
- HTTP methods
- Content types
- Authentication requirements
- Request validation
- Pagination
- Filtering
- Sorting
- Error handling
- Request identification

Only required fields should be accepted.

### 4.4 Response standards
Responses should follow a consistent structure.
A typical successful response may include:
- Success indicator
- Response data
- Optional metadata
- Request or correlation identifier

A typical error response may include:
- Error code
- Human-readable message
- Field validation details, where applicable
- Request or correlation identifier

Responses must not expose internal credentials, private system information, or unnecessary personal data.

### 4.5 HTTP method governance
| Method | Purpose |
| :--- | :--- |
| GET | Retrieve authorized information |
| POST | Create a resource or initiate an operation |
| PUT | Replace a resource where appropriate |
| PATCH | Update selected resource fields |
| DELETE | Delete or deactivate a resource where permitted |

Financial and audit records must not be physically deleted through ordinary API operations unless a formally approved legal and operational process permits it.

---

## 5. API MODULE REGISTER
The following API groups support the existing PHERI NEPAL modules.

| API Group ID | API Group | Related Module |
| :--- | :--- | :--- |
| API-001 | Identity and Authentication API | M11, M12 |
| API-002 | User Profile API | M11 |
| API-003 | Partner and Business API | M06, M12 |
| API-004 | Destination API | M01, M02 |
| API-005 | Tourism Content API | M01, M18 |
| API-006 | Accommodation API | M03 |
| API-007 | Transportation API | M04 |
| API-008 | Tour and Activity API | M05 |
| API-009 | Booking Inquiry API | M07 |
| API-010 | Booking Arrangement API | M07 |
| API-011 | Payment and Financial API | M15 |
| API-012 | Review and Reputation API | M13 |
| API-013 | AI Service API | M08 |
| API-014 | Language and Translation API | M09 |
| API-015 | Map and Location API | M10 |
| API-016 | Notification API | M14 |
| API-017 | Administration API | M16 |
| API-018 | Analytics and Reporting API | M17 |
| API-019 | Media Management API | M18 |
| API-020 | Marketplace and Digital Product API | M15 and related approved service functions |

These API groups organize technical responsibilities. They do not create new platform modules.

---

## 6. IDENTITY AND AUTHENTICATION API
**API Group:** API-001
**Purpose:** Manage secure account-related operations through the approved authentication architecture.

**Supported operations may include:**
- Account registration
- User login
- Logout
- Session management
- Account verification
- Password recovery through the approved authentication provider
- Account status checking
- Token validation
- Authorized account access

**Requirements:**
1. Authentication must use the approved authentication service.
2. Tokens must be validated on protected backend operations.
3. Sensitive authentication credentials must not be stored in ordinary application records.
4. Role and permission checks must occur on the backend.
5. Account suspension must restrict relevant access.
6. Authentication failures must be logged appropriately.
7. Authentication endpoints must be protected against abuse.
8. Session and token expiration must follow approved security policies.

The authentication provider remains subject to Document 05's technical decision register.

---

## 7. USER PROFILE AND PREFERENCE API
**API Group:** API-002
**Purpose:** Manage user profile and preference information.

**Supported operations:**
- Retrieve the authenticated user's profile
- Update permitted profile fields
- Retrieve user preferences
- Update language preferences
- Update notification preferences
- Manage approved profile media references
- Request account closure

**Data must map to the corresponding entities in Document 06:**
- ENT-001 — User Account
- ENT-002 — User Profile
- ENT-003 — User Preference
- ENT-004 — User Role Assignment
- ENT-040 — Consent Record

**Rules:**
- Users may update only fields they are authorized to control.
- Private account information must not be publicly exposed.
- Profile updates must be validated.
- Account closure must follow the data lifecycle policy in Document 06 and the legal requirements in Document 09.

---

## 8. PARTNER AND BUSINESS API
**API Group:** API-003
**Purpose:** Support partner registration, business management, listing information, and partner operations.

**Supported operations:**
- Partner onboarding
- Business profile creation
- Business profile updates
- Business listing retrieval
- Service association
- Partner staff management
- Business status retrieval
- Verification status retrieval
- Authorized listing publication requests

**Related entities:**
- ENT-005 — Partner Business
- ENT-006 — Partner Profile
- ENT-007 — Partner Staff
- ENT-008 — Verification Record
- ENT-015 — Tourism Business Listing

**Rules:**
1. A partner must not modify another business without authorization.
2. Business ownership must be verified through approved procedures.
3. Partner staff permissions must be enforced.
4. Verification decisions must remain separate from commercial subscription operations.
5. Business listing publication must follow the approved moderation and verification policies.
6. Partner subscription payment must not automatically guarantee verification or organic ranking.

---

## 9. DESTINATION AND TOURISM CONTENT API
**API Groups:** API-004 and API-005
**Purpose:** Deliver destination information and tourism content to the website and other approved platform services.

**Supported operations:**
- Destination search
- Destination details
- Province and district filtering
- Tourism content retrieval
- Content category filtering
- Content publication management
- Content update management
- Localized content retrieval
- Content review status retrieval

**Related entities:**
- ENT-009 — Destination
- ENT-010 — Geographic Area
- ENT-011 — Tourism Content
- ENT-031 — Content Translation
- ENT-032 — Media Asset

**Rules:**
- Public APIs must return published and approved records only.
- Administrative content operations must require appropriate authorization.
- Source and review information must be maintained for relevant tourism content.
- Outdated content must be identifiable.
- Content must support the approved multilingual system.
- Sensitive administrative notes must not be included in public responses.

---

## 10. TOURISM SERVICE APIs
**API Groups:** API-006, API-007, and API-008
**Purpose:** Deliver structured service information for accommodation, transportation, tours, and activities.

### 10.1 Accommodation API
Supports:
- Accommodation search
- Accommodation details
- Location-based filtering
- Facilities filtering
- Business association
- Public listing retrieval

**Primary entity:** ENT-012.

### 10.2 Transportation API
Supports:
- Transportation service search
- Route or coverage information
- Service details
- Business association
- Location filtering

**Primary entity:** ENT-013.

### 10.3 Tour and Activity API
Supports:
- Tour search
- Activity search
- Service details
- Duration and location filtering
- Service information retrieval
- Business association

**Primary entity:** ENT-014.

All three APIs must reference the authoritative Partner Business and Tourism Business Listing records where applicable.
Price and availability information must not be presented as guaranteed unless supported by current, reliable provider information.

---

## 11. BOOKING INQUIRY AND ARRANGEMENT APIs
**API Groups:** API-009 and API-010
**Purpose:** Support the inquiry-based booking model established in Documents 01, 02, 03, and 05.

### 11.1 Booking Inquiry API
Supports:
- Create inquiry
- Retrieve authorized inquiry
- Update permitted inquiry information
- Send inquiry to the relevant partner
- Partner response submission
- Inquiry status retrieval
- Inquiry closure or cancellation

**Primary entity:** ENT-016.

### 11.2 Booking Arrangement API
Supports:
- Create an arrangement from an eligible inquiry
- Submit partner confirmation
- Record traveler acceptance, where applicable
- Update arrangement status through authorized workflows
- Retrieve arrangement details
- Record cancellation
- Record completion
- Retrieve arrangement status history

**Primary entities:**
- ENT-017 — Booking Arrangement
- ENT-018 — Booking Status History

### 11.3 Booking API governance
The initial platform operating model is inquiry and partner-confirmed arrangements.
Therefore:
1. Submitting an inquiry must not automatically create a confirmed booking.
2. A partner response must not automatically imply traveler acceptance.
3. Confirmation must follow the approved arrangement workflow.
4. Completion must be recorded separately.
5. Payment status must remain independent of booking status.
6. Commission eligibility must remain independent of inquiry submission.
7. Booking status changes must be traceable.
8. The system must not claim real-time inventory or availability unless a reliable provider integration supports it.

Fully automated booking must not be represented as operational until the required provider integrations, business workflows, and testing are complete.

---

## 12. PAYMENT AND FINANCIAL API
**API Group:** API-011
**Purpose:** Support approved payment and financial operations when the required integrations are ready.

**Supported future operations may include:**
- Payment initiation
- Payment status retrieval
- Payment confirmation processing
- Refund requests
- Refund status retrieval
- Commission calculation records
- Commission approval workflows
- Financial reconciliation
- Subscription payment records
- Promotion payment records

**Related entities:**
- ENT-019 — Payment Transaction
- ENT-020 — Refund Record
- ENT-021 — Commission Record
- ENT-022 — Business Subscription
- ENT-023 — Promotion and Sponsored Listing
- ENT-024 — Affiliate Referral

### 12.1 Payment integration requirements
The selected payment provider must support the applicable requirements for:
- Transaction references
- Payment status confirmation
- Secure communication
- Refund operations
- Error handling
- Reconciliation
- Supported currencies
- Applicable regulatory obligations

Payment provider credentials must remain on the backend or within an approved secure secret-management service.

### 12.2 Payment activation conditions
Live payment functionality must remain inactive until:
1. A provider has been formally selected.
2. Commercial and contractual requirements are approved.
3. Applicable legal and regulatory requirements are reviewed.
4. Security controls are implemented.
5. Payment callbacks or webhooks are validated.
6. Duplicate payment handling is implemented.
7. Refund workflows are tested.
8. Financial reconciliation is verified.
9. End-to-end testing is completed.
10. Production activation is formally approved.

### 12.3 Financial separation rules
The API must preserve separate states for:
- Booking arrangement
- Payment transaction
- Refund
- Commission eligibility
- Commission recognition

A confirmed booking does not automatically mean payment succeeded.
A successful payment does not automatically mean a service was completed.
A completed service does not automatically create commission unless the applicable commercial conditions are satisfied.
Revenue categories must reuse R01–R14 from Document 02.

---

## 13. REVIEW AND REPUTATION API
**API Group:** API-012
**Purpose:** Support traveler reviews, ratings, responses, and moderation.

**Supported operations:**
- Submit review
- Retrieve published reviews
- Retrieve authorized review details
- Submit partner response
- Report inappropriate content
- Moderate review
- Retrieve review status

**Related entities:**
- ENT-025 — Review
- ENT-026 — Review Response

**Requirements:**
- Review submission must follow eligibility rules.
- Review moderation must be controlled.
- Partner responses must be linked to authorized business accounts.
- Public responses must not expose private user information.
- Moderation actions must be traceable.
- Reviews must not be manipulated to improve paid listing positions.

---

## 14. AI SERVICE API
**API Group:** API-013
**Purpose:** Provide a controlled interface between PHERI NEPAL and approved AI services.
Detailed AI functionality is governed by Document 08.

**The API may support:**
- AI travel assistance
- Destination recommendations
- Trip planning
- Itinerary generation
- Multilingual assistance
- Tourism information retrieval
- Context-aware travel support
- Approved traveler support workflows

**Related entities:**
- ENT-027 — AI Trip Plan
- ENT-028 — AI Interaction Record
- Relevant approved destination, service, and tourism content entities

### 14.1 AI integration rules
1. AI provider credentials must never be exposed in frontend code.
2. AI requests must be processed through approved backend services.
3. Only necessary user and platform data may be shared with an AI provider.
4. Sensitive information must be protected.
5. AI-generated responses must not automatically be treated as verified facts.
6. Relevant tourism information must be grounded in approved platform data or reliable sources.
7. High-risk or time-sensitive information must follow the verification requirements in Document 08.
8. AI service failures must not prevent access to ordinary tourism information.
9. AI interaction storage must follow the approved privacy and retention policy.
10. AI provider changes must not require unnecessary changes to the entire platform architecture.

The final AI provider and model selection remain subject to technical evaluation and Document 08.

---

## 15. MULTILINGUAL AND TRANSLATION API
**API Group:** API-014
**Purpose:** Support the platform's multilingual system.

**Supported operations:**
- Retrieve available languages
- Retrieve localized interface content
- Retrieve localized tourism content
- Retrieve translation status
- Submit translation for review
- Publish approved translations
- Retrieve language-specific metadata

**Primary entity:** ENT-031.

**Requirements:**
- Support the 12-language architecture.
- Nepali and English remain foundational.
- Other language selections must follow verified source-market and language-demand research.
- Translation records must reference their original content.
- Machine translation must not automatically become approved public content.
- Missing translations must be handled through a documented fallback policy.
- Language-specific content must preserve its original meaning.

---

## 16. MAP AND LOCATION API
**API Group:** API-015
**Purpose:** Support location-related platform functions.

**Possible integration capabilities:**
- Map display
- Destination coordinates
- Geographic search
- Route information
- Distance calculation
- Location-based service discovery
- Geocoding
- Reverse geocoding, where approved

**Related entities:**
- ENT-009 — Destination
- ENT-010 — Geographic Area
- ENT-012 — Accommodation
- ENT-013 — Transportation Service
- ENT-014 — Tour and Activity
- ENT-015 — Tourism Business Listing

### 16.1 Location integration governance
The selected mapping provider must be evaluated for:
- Nepal coverage
- Geographic accuracy
- API availability
- Licensing conditions
- Pricing and usage limits
- Mobile and desktop support
- Data protection
- Service reliability

The platform must not assume that all map providers offer identical coverage or capabilities.
Location access must be requested only when required for a clear user-facing function.
The system must support manual location selection when a user does not grant device location permission.

---

## 17. NOTIFICATION API
**API Group:** API-016
**Purpose:** Deliver platform notifications through approved communication providers.

**Possible channels:**
- In-platform notifications
- Email
- SMS
- Push notifications, when supported by approved applications

**Supported operations:**
- Create notification
- Queue notification
- Deliver notification
- Retrieve delivery status
- Mark notification as read
- Manage user notification preferences

**Related entities:**
- ENT-029 — Notification
- ENT-030 — Communication Record
- ENT-003 — User Preference

**Requirements:**
- Respect user notification preferences.
- Distinguish essential service notifications from promotional messages.
- Record delivery outcomes where supported.
- Prevent unnecessary repeated notifications.
- Apply appropriate rate limits.
- Protect personal contact information.
- Use approved providers and templates.

---

## 18. ADMINISTRATION API
**API Group:** API-017
**Purpose:** Support authorized administrative operations.

**Supported operations may include:**
- User account management
- Partner account management
- Business verification
- Listing moderation
- Tourism content approval
- Review moderation
- Support case management
- Subscription oversight
- Promotion approval
- Financial oversight
- Audit record retrieval
- Operational status management

**Related entities:**
- ENT-004 — User Role Assignment
- ENT-008 — Verification Record
- ENT-035 — Admin Action Record
- ENT-036 — Audit Log
- ENT-039 — Support Case
- ENT-040 — Consent Record

**Requirements:**
1. Administrative APIs must require authorized roles.
2. Sensitive actions must require appropriate permission checks.
3. Financial actions must have additional approval controls where required.
4. Administrative actions must be logged.
5. Access to verification evidence must be restricted.
6. Administrative APIs must not be exposed as unrestricted public operations.

---

## 19. ANALYTICS AND REPORTING API
**API Group:** API-018
**Purpose:** Provide approved data for platform performance analysis and operational reporting.

**Supported reporting categories may include:**
- Website activity
- Destination engagement
- Service listing performance
- Booking inquiry activity
- Partner response activity
- Completed arrangements
- Revenue performance
- Subscription activity
- Promotion performance
- AI service usage
- User engagement
- Geographic activity

**Related entities:**
- ENT-038 — Analytics Event
- Relevant approved operational and financial entities

**Rules:**
- Analytics must distinguish operational activity from financial results.
- Inquiry volume must not be reported as completed bookings.
- Gross Transaction Value must not be reported as PHERI NEPAL revenue.
- Personal information must be minimized.
- Financial reports must follow Document 02.
- Access to detailed reports must be permission-controlled.

---

## 20. MEDIA MANAGEMENT API
**API Group:** API-019
**Purpose:** Support approved media uploads, retrieval, and management.

**Supported operations:**
- Upload media
- Validate media
- Retrieve authorized media
- Update media metadata
- Approve or reject media
- Archive or remove media references

**Primary entity:** ENT-032.

**Requirements:**
- Validate file type and file size.
- Apply malware and file security checks where appropriate.
- Restrict private media access.
- Use approved storage services.
- Preserve copyright and usage information.
- Generate suitable image variants where required.
- Avoid exposing private storage credentials.
- Apply access controls to sensitive documents and verification evidence.

---

## 21. MARKETPLACE AND DIGITAL PRODUCT API
**API Group:** API-020
**Purpose:** Support approved digital products and marketplace operations.

**Supported operations may include:**
- Product listing retrieval
- Product information retrieval
- Product publication management
- Order creation
- Order status retrieval
- Seller information retrieval
- Delivery or fulfilment status
- Approved payment reference handling

**Related entities:**
- ENT-033 — Digital Product
- ENT-034 — Marketplace Order
- Relevant payment and financial entities

Marketplace transactions must remain distinct from accommodation, transportation, tour, and other booking arrangements.
Commercial treatment must follow the relevant revenue category in Document 02.

---

## 22. THIRD-PARTY INTEGRATION REGISTER
The following register identifies integration categories that may be required.
No provider is considered selected merely because it appears in this register.

| Integration ID | Integration Category | Purpose | Selection Status |
| :--- | :--- | :--- | :--- |
| INT-001 | Authentication Provider | Secure account authentication | Pending Selection |
| INT-002 | Database Service | Platform data storage | Pending Selection |
| INT-003 | Cloud Hosting Provider | Application hosting | Pending Selection |
| INT-004 | File and Media Storage | Media storage and delivery | Pending Selection |
| INT-005 | AI Provider | AI travel assistance | Pending Selection |
| INT-006 | Mapping Provider | Maps and geographic services | Pending Selection |
| INT-007 | Email Provider | Transactional and approved email delivery | Pending Selection |
| INT-008 | SMS Provider | SMS notifications and verification, where required | Pending Selection |
| INT-009 | Payment Provider | Approved payment processing | Pending Selection |
| INT-010 | Analytics Service | Platform usage analysis | Pending Selection |
| INT-011 | Search Service | Search and discovery support | Pending Evaluation |
| INT-012 | Weather Data Provider | Weather-related information | Pending Selection |
| INT-013 | Currency Data Provider | Exchange-rate information | Pending Selection |
| INT-014 | Affiliate Partners | Approved referral and affiliate services | Pending Selection |
| INT-015 | Travel Service Providers | Booking and service availability connections | Pending Selection |
| INT-016 | Monitoring Service | Error and performance monitoring | Pending Selection |
| INT-017 | Security and Protection Services | Application and traffic protection | Pending Evaluation |

Provider selection must follow documented technical, financial, legal, security, and operational evaluation.

---

## 23. THIRD-PARTY PROVIDER EVALUATION
Every provider must be assessed before integration.

### 23.1 Technical evaluation
Review:
- API documentation quality
- Supported capabilities
- Authentication methods
- Data formats
- Rate limits
- Reliability
- Integration complexity
- Error handling
- Webhook support
- Developer support
- Scalability

### 23.2 Commercial evaluation
Review:
- Pricing model
- Free-tier limitations
- Usage-based charges
- Transaction fees
- Contract terms
- Renewal conditions
- Cancellation conditions
- Commercial restrictions

No provider price or service limit should be assumed without checking the provider's current official terms.

### 23.3 Security and privacy evaluation
Review:
- Data processing practices
- Encryption capabilities
- Access controls
- Data storage locations
- Data retention
- Subprocessors
- Incident response
- Security certifications or independent assessments, where relevant
- Contractual privacy commitments

### 23.4 Operational evaluation
Review:
- Service availability
- Support arrangements
- Incident notification
- Maintenance schedule
- Backup and recovery arrangements
- Service discontinuation policy
- Data export and migration options

A provider must not be activated in production until the required evaluation and approval are complete.

---

## 24. WEBHOOK AND EVENT INTEGRATION
Some third-party services may communicate with PHERI NEPAL through webhooks or event callbacks.
Possible uses include:
- Payment status updates
- Refund status updates
- Email delivery status
- SMS delivery status
- Subscription status changes
- External booking updates, where supported

### 24.1 Webhook security
Every webhook implementation must include appropriate controls:
1. Signature verification or equivalent provider authentication.
2. Source validation where supported.
3. Replay protection.
4. Duplicate event detection.
5. Request validation.
6. Secure event processing.
7. Error logging.
8. Controlled retry handling.
9. Event processing status tracking.

Webhook requests must never be trusted solely because they reach a public endpoint.

### 24.2 Idempotency
Critical operations must prevent duplicate processing.
Examples include:
- Payment confirmation
- Refund processing
- Booking status updates
- Commission recognition
- Subscription activation

The same external event must not create multiple financial or operational records.

---

## 25. ERROR HANDLING AND SERVICE FAILURE MANAGEMENT
All API integrations must handle failures predictably.
Possible failure categories:
- Authentication failure
- Authorization failure
- Invalid request
- Data validation failure
- Rate limit exceeded
- Provider unavailable
- Network timeout
- Invalid external response
- Duplicate event
- External service maintenance
- Internal processing failure

Requirements:
- Return consistent error responses.
- Record relevant diagnostic information.
- Avoid exposing sensitive internal details.
- Retry only when appropriate.
- Use controlled retry limits.
- Avoid duplicate financial operations.
- Provide appropriate user-facing fallback messages.
- Alert responsible personnel for critical failures.

An external service failure must not cause unrelated core platform functions to fail unnecessarily.

---

## 26. RATE LIMITING AND API ABUSE PROTECTION
Public and protected APIs must have appropriate traffic controls.
Requirements:
- Rate limits by relevant user, account, IP, or client context.
- Protection against automated abuse.
- Request size limits.
- Authentication attempt restrictions.
- Sensitive endpoint protection.
- Search abuse protection.
- Monitoring of unusual request patterns.

Rate limits must be configurable and based on operational requirements.
The platform must not apply arbitrary limits that unnecessarily prevent legitimate traveler or partner activity.

---

## 27. API LOGGING AND MONITORING
The API layer must provide operational visibility.
Important monitoring areas:
- Request volume
- Response time
- Error rate
- Authentication failures
- Provider availability
- Webhook processing status
- Integration failures
- API rate-limit events
- Payment integration events, when activated
- AI provider usage
- Critical administrative operations

Logs must include appropriate request or correlation identifiers.
Passwords, access tokens, payment credentials, and unnecessary sensitive personal information must not be written to ordinary logs.
Monitoring requirements must align with Document 09 and Document 12.

---

## 28. DATA EXCHANGE AND TRANSFORMATION RULES
External provider data must be mapped into approved PHERI NEPAL logical entities.
Requirements:
1. External identifiers must be stored separately from internal identifiers.
2. Data formats must be validated.
3. External values must not overwrite authoritative internal records without an approved rule.
4. Currency values must retain their original currency.
5. Time values must preserve appropriate timezone information.
6. Language values must follow the approved language-code standard.
7. Duplicate external events must be detected.
8. Imported information must preserve source references.
9. Data transformations must be documented.
10. Sensitive information must not be transferred unnecessarily.

External provider data must not automatically be treated as verified platform information.

---

## 29. API ENVIRONMENTS AND CONFIGURATION
The integration architecture must support separate environments.

### 29.1 Development
Purpose:
- Local and development testing
- API implementation
- Mock service integration
- Initial validation

### 29.2 Staging and Testing
Purpose:
- Integration testing
- End-to-end workflow testing
- Provider sandbox testing
- Security validation
- Acceptance testing

### 29.3 Production
Purpose:
- Live platform operations
- Approved production integrations
- Real user and partner activity

Requirements:
- Separate environment configurations.
- Separate credentials where supported.
- No unnecessary production data in development.
- Controlled deployment.
- Restricted production access.
- Documented rollback procedures.
- Monitoring after release.

Production credentials must never be committed to source control.

---

## 30. API DOCUMENTATION AND CHANGE MANAGEMENT
Every implemented API must have maintained documentation.
Documentation should include:
- API purpose
- Endpoint or operation name
- HTTP method, where applicable
- Authentication requirements
- Required permissions
- Request fields
- Response fields
- Validation rules
- Error codes
- Related entities
- Rate limits
- Integration dependencies
- Version information

API changes must be reviewed before release.
Breaking changes must follow a controlled versioning and migration process.
Existing integrations must not be silently broken by an unannounced API change.

---

## 31. INTEGRATION TESTING REQUIREMENTS
Every third-party integration must pass relevant testing before production activation.
Testing must include:
1. Successful connection.
2. Authentication validation.
3. Permission validation.
4. Request and response validation.
5. Invalid input handling.
6. Timeout handling.
7. Provider failure handling.
8. Duplicate request handling.
9. Retry handling.
10. Security checks.
11. Data consistency checks.
12. Rate-limit behavior.
13. Webhook validation, where applicable.
14. Logging and monitoring.
15. Recovery and rollback procedures.

Payment integrations require additional financial and reconciliation testing.
AI integrations require output quality, privacy, safety, and failure-handling tests.
Mapping and weather integrations require data accuracy and freshness checks appropriate to their functions.

---

## 32. INTEGRATION ACTIVATION LIFECYCLE
Every integration must have an explicit operational status.
Approved lifecycle states:
- Planned
- Under Evaluation
- Approved
- Under Development
- Testing
- Operational
- Suspended
- Retired

Rules:
- **Planned** does not mean approved.
- **Approved** does not mean implemented.
- **Testing** does not mean production-ready.
- **Operational** means the integration has passed the required approval and testing.
- **Suspended** means the integration is temporarily unavailable or disabled.
- **Retired** means the integration is no longer used.

Integration status must be visible to authorized administrators and documented in the relevant operational records.

---

## 33. PENDING API AND INTEGRATION DECISIONS
The following decisions require formal approval.

| Decision ID | Pending Decision | Required Outcome |
| :--- | :--- | :--- |
| PD-API-01 | API framework | Approve the backend API framework |
| PD-API-02 | API protocol | Approve the primary API communication standard |
| PD-API-03 | API documentation tool | Approve API documentation approach |
| PD-API-04 | Authentication integration | Approve the authentication provider |
| PD-API-05 | Payment integration | Approve the payment provider and operating model |
| PD-API-06 | AI provider integration | Approve the AI provider and integration architecture |
| PD-API-07 | Mapping integration | Approve the mapping provider |
| PD-API-08 | Email and SMS providers | Approve communication providers |
| PD-API-09 | Weather and currency providers | Approve data providers, where required |
| PD-API-10 | Webhook architecture | Approve webhook processing and verification standards |
| PD-API-11 | API rate limits | Approve production traffic-control policies |
| PD-API-12 | API monitoring | Approve monitoring and alerting services |
| PD-API-13 | Search integration | Approve search technology, if an external service is required |
| PD-API-14 | Third-party data retention | Approve external data-sharing and retention rules |
| PD-API-15 | Provider contracts | Approve required provider agreements and service terms |

These decisions must be coordinated with the technical decision register in Document 05 and the data governance requirements in Document 06.

---

## 34. IMPLEMENTATION DEPENDENCIES
Document 07 defines API and integration requirements. Implementation depends on the following documents:
- **Document 05 — Technical Architecture Blueprint:** Backend framework, hosting, application architecture, and technical service decisions.
- **Document 06 — Database and Data Management Blueprint:** Entity definitions, data ownership, data validation, and data exchange requirements.
- **Document 08 — AI and Intelligent Services Blueprint:** AI provider integration, AI request processing, and AI data governance.
- **Document 09 — Security, Privacy and Legal Compliance Blueprint:** Authentication security, data sharing, provider compliance, and privacy controls.
- **Document 10 — Admin, Partner and Operations Blueprint:** Partner workflows, verification, financial operations, and administrative controls.
- **Document 12 — Testing, Deployment and Maintenance Blueprint:** API testing, integration testing, deployment, monitoring, and maintenance.

All implementation teams must use the same approved entity definitions, module identifiers, revenue identifiers, and business rules.

---

## 35. API AND INTEGRATION ACCEPTANCE CRITERIA
The API and integration architecture will be considered ready for implementation when:
1. API responsibilities are documented.
2. API groups map to existing modules.
3. API versioning is defined.
4. Request and response standards are established.
5. Backend authentication and authorization requirements are documented.
6. External provider categories are identified.
7. Provider selection follows a documented evaluation process.
8. Private credentials are protected.
9. Booking inquiry and arrangement operations follow the approved workflow.
10. Payment and booking statuses remain separate.
11. Financial integration rules follow Document 02.
12. AI requests follow the approved AI architecture.
13. Multilingual content requirements are supported.
14. Webhook security and duplicate-event protection are documented.
15. Error handling and retry rules are defined.
16. API logging and monitoring requirements are documented.
17. Development, staging, and production environments are separated.
18. Integration testing requirements are established.
19. Integration activation states are controlled.
20. All implementation requirements remain consistent with Documents 01–06.

---

## 36. DOCUMENT CONTROL AND CONSISTENCY
This document is part of the official PHERI NEPAL 12-document blueprint series.
The following documents remain authoritative for their respective areas:
- Document 01 — Master Project Blueprint
- Document 02 — Business Model and Revenue Blueprint
- Document 03 — User Journey and Functional Requirements Blueprint
- Document 04 — UI/UX and Design System Blueprint
- Document 05 — Technical Architecture Blueprint
- Document 06 — Database and Data Management Blueprint

Document 07 must not:
- Introduce new platform modules without formal scope approval.
- Change existing module IDs M01–M18.
- Change revenue IDs R01–R14.
- Introduce unapproved commission rates or subscription prices.
- Represent inquiry submission as a confirmed booking.
- Represent live payment as operational before approval and testing.
- Treat a proposed external provider as a selected provider.
- Override the logical data entities defined in Document 06.
- Expose private credentials through frontend applications.

Any future change affecting other documents must undergo cross-document consistency review and version control.

---

## 37. FINAL GOVERNANCE STATEMENT
PHERI NEPAL's API and third-party integration architecture must provide a secure and controlled communication foundation for the entire tourism ecosystem.
Every API must have a defined purpose, documented data requirements, appropriate authorization, and predictable error handling.
Every external integration must be evaluated, approved, tested, monitored, and maintained before being used in production.
The platform must preserve its inquiry-based initial booking model, keep financial and operational records separate, protect user information, and avoid dependence on unapproved or undocumented external services.
Document 07 establishes the API and third-party integration foundation for PHERI NEPAL.

---

## 38. VERSION 2.0 DETAILED API & INTEGRATION SPECIFICATIONS & AUDIT GAP RESOLUTIONS

### 38.1 Multi-Channel Partner Alert Hierarchy for Nepal Connectivity (`INT-005` & `INT-006`)
Because rural and regional Nepal tourism partners (homestays, trekking guides, jeep drivers, lodges) frequently lack continuous email access but carry active Nepal Telecom (NTC) or Ncell mobile phones:
1. **Primary Instant Alert Channel (`INT-006` — Domestic SMS & WhatsApp Relay):**
   - Whenever a traveler submits a Booking Inquiry (`POST /api/v1/inquiries`), the Notification Engine (`M14`) dispatches a compact transactional SMS (via Nepal telecom aggregator such as Sparrow SMS / Aakash SMS) and optional WhatsApp Business template message to the partner's verified phone number within **15 seconds**:
     `"PHERI NEPAL Inquiry #[ID]: [Guest Count] guests for [Dates] ([Service Name]). Reply/Confirm fast at: [Short Secure Link]"`
2. **Secondary Full-Context Channel (`INT-005` — Transactional Email & In-App Bell):**
   - Simultaneously delivers the complete inquiry payload, traveler notes, and language translation to the partner's email and In-App Partner Workspace (`M12`).

### 38.2 Dual Payment Gateway Architecture for Future `M15` Activation (`INT-004`)
When `M15` transitions from `Inactive / Planned` to `Operational` in Phase 2/3, a single payment provider cannot serve both domestic Nepali travelers and international tourists due to Nepal Rastra Bank (NRB) foreign-exchange and card-acquiring rules. `INT-004` must therefore implement a **Dual-Rail Payment Router**:

| Payment Rail | Target Payer Segment | Supported Instruments & Candidate Gateways | Settlement & Currency Rule |
| :--- | :--- | :--- | :--- |
| **Rail A — Domestic NPR Rail (`INT-004A`)** | Domestic Tourists (`ne-NP`) & Local B2B Partners (`R07`–`R09`) | `eSewa`, `Khalti`, `Fonepay QR`, `ConnectIPS` | Direct `NPR` collection and settlement into domestic commercial bank escrow/operating account. |
| **Rail B — International Card & FX Rail (`INT-004B`)** | International Tourists (`USD`, `EUR`, `GBP`, `AUD`, `JPY`, `INR`) | International 3D-Secure Visa / Mastercard / Amex via licensed Nepal Acquiring Bank E-Commerce POS (e.g., Himalayan Bank / Nabil Bank / NIC Asia Cybersource) + UPI cross-border QR for Indian tourists | Displays price in traveler's selected currency alongside exact `NPR` equivalent at current NRB reference rate; settles in `NPR` with full foreign-exchange audit trail. |

*Governance Rule:* Both rails remain strictly **disabled behind feature flag `ENABLE_LIVE_PAYMENTS = false`** during Phase 1 (Inquiry-First launch) until legal, PCI-DSS, NRB compliance, and sandbox tests pass.

### 38.3 Mandatory Idempotency-Key & Webhook Signature Verification Standard
1. **Mutation Idempotency (`POST /api/v1/inquiries`, `/api/v1/bookings`, `/api/v1/payments`):**
   - All state-changing `POST` and `PATCH` requests must accept an `Idempotency-Key: <UUIDv4>` header.
   - The server caches the key and response hash for **24 hours**. If a traveler on an unstable mountain 3G connection taps "Submit Inquiry" three times due to network lag, the backend returns the exact same `inquiry_id` without creating duplicate inquiries or sending duplicate SMS alerts.
2. **Webhook Cryptographic Verification:**
   - Every external webhook endpoint (`/api/v1/webhooks/:provider`) must verify the provider's `HMAC-SHA256` signature header, validate a `< 300 second` timestamp tolerance window to prevent replay attacks, and log the raw event ID in `webhook_event_ledger` before processing.

---

**END OF DOCUMENT 07 — PN-ATPI-007 (Version 2.0 — Detailed & Audit-Resolved)**
