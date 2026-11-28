# PHERI NEPAL
## DOCUMENT 09 — SECURITY, PRIVACY AND LEGAL COMPLIANCE BLUEPRINT

- **Document Code:** PN-SPLC-009
- **Version:** 1.0
- **Document Series:** 09 of 12
- **Parent Document:** PN-MPB-001
- **Related Documents:** PN-BMR-002, PN-UJFR-003, PN-UXDS-004, PN-TAB-005, PN-DDM-006, PN-ATPI-007, PN-AIS-008
- **Document Type:** Security, Privacy and Legal Governance Blueprint
- **Document Status:** Official Project Blueprint
- **Classification:** Internal Project Documentation

---

## PART I — DOCUMENT FOUNDATION AND GOVERNANCE

### 1. DOCUMENT PURPOSE
This document establishes the complete security, privacy, data protection and legal compliance framework for PHERI NEPAL.

Its purpose is to define how the platform will protect its users, business partners, communities, information, infrastructure, financial records, AI services and operational systems.
It establishes the policies, technical safeguards, organizational responsibilities, operational procedures and compliance requirements that must guide the platform throughout its lifecycle.

The framework applies to:
- Platform planning and architecture.
- Software development.
- Website deployment.
- User registration and authentication.
- Partner onboarding and verification.
- Tourism information management.
- Booking inquiry and arrangement management.
- Payment and financial functionality.
- AI-powered services.
- External service integrations.
- User communications.
- Administration and operations.
- Future mobile applications.
- Platform maintenance and expansion.

This document defines required security and compliance controls. It does not represent that PHERI NEPAL has already implemented, passed or received any security certification, legal approval or independent audit.

### 2. SECURITY, PRIVACY AND COMPLIANCE OBJECTIVES
PHERI NEPAL shall pursue the following objectives:
1. Protect personal and confidential information.
2. Prevent unauthorized access to accounts and systems.
3. Protect business, booking and financial records.
4. Maintain integrity and availability of platform information.
5. Prevent fraudulent activity and unauthorized transactions.
6. Protect the platform against common application and infrastructure attacks.
7. Secure APIs and third-party integrations.
8. Prevent unauthorized disclosure through AI services.
9. Maintain transparency in personal data processing.
10. Provide appropriate privacy controls and user rights.
11. Identify and address applicable legal obligations.
12. Maintain traceable security and administrative activity.
13. Establish incident response and recovery procedures.
14. Protect the platform's reputation and user trust.
15. Support secure future expansion into additional services and jurisdictions.

### 3. GOVERNING SECURITY AND PRIVACY PRINCIPLES
All platform systems must follow these principles:
- **3.1 Security by Design:** Security requirements must be considered during planning, architecture, development, testing and deployment.
- **3.2 Privacy by Design:** Personal information must be protected through system design, data minimization, controlled access and transparent processing.
- **3.3 Least Privilege:** Every account, service and employee must receive only the access required to perform its authorized responsibilities.
- **3.4 Defense in Depth:** The platform must use multiple layers of protection rather than relying on one security mechanism.
- **3.5 Secure Defaults:** Default system configurations must favor security and privacy.
- **3.6 Accountability:** Security-sensitive and privacy-related activities must have identifiable responsibility and appropriate records.
- **3.7 Data Minimization:** Only information necessary for a defined and approved purpose should be collected and processed.
- **3.8 Transparency:** Users and partners must receive clear information about relevant data collection, commercial activities and platform limitations.
- **3.9 Risk-Based Protection:** Security controls must reflect the sensitivity of information, likelihood of threats and potential consequences.
- **3.10 Continuous Improvement:** Security and privacy controls must be reviewed and improved as the platform, threat environment and applicable laws change.

### 4. SECURITY AND COMPLIANCE SCOPE
This blueprint applies to all PHERI NEPAL components.

| Area | Security and compliance coverage |
| :--- | :--- |
| Public website | Website integrity, availability and protection against attacks |
| Traveler accounts | Identity, authentication and personal information |
| Partner accounts | Business information, verification and access permissions |
| Administration | Privileged access and administrative accountability |
| Backend systems | Application security and business-rule enforcement |
| Databases | Data confidentiality, integrity and availability |
| File storage | Secure uploads, storage and access |
| APIs | Authentication, authorization and abuse prevention |
| AI services | Data protection, model security and output controls |
| Booking system | Inquiry, arrangement and transaction integrity |
| Financial system | Payment security, financial records and fraud prevention |
| Notifications | Secure communication and consent management |
| Analytics | Privacy-conscious data collection and reporting |
| Third-party services | Provider security, privacy and contractual governance |
| Infrastructure | Cloud, hosting, deployment and operational security |
| Source code | Repository security and development controls |
| Future mobile applications | Equivalent security and privacy requirements |

All future platform applications and services must comply with this framework.

---

## PART II — SECURITY GOVERNANCE AND RISK MANAGEMENT

### 5. SECURITY GOVERNANCE STRUCTURE
#### 5.1 Governance Responsibilities
Security and privacy must be managed through clearly assigned responsibilities.

| Responsibility | Main duties |
| :--- | :--- |
| Project Leadership | Overall security and compliance accountability |
| Technical Leadership | Security architecture and technical control approval |
| Backend Development | Authentication, authorization and business-rule security |
| Frontend Development | Secure interface implementation and input handling |
| Database Management | Data access, integrity, backup and retention |
| Infrastructure Administration | Hosting, configuration and operational security |
| Privacy Responsibility | Privacy notices, data requests and processing oversight |
| Partner Operations | Partner access, verification and fraud reporting |
| Content Operations | Content permissions, accuracy and publication controls |
| AI Operations | AI provider governance, data protection and safety |
| Finance Operations | Financial record integrity and transaction oversight |
| Legal Advisors | Legal applicability, agreements and regulatory review |

A person may hold more than one responsibility during early operations, but accountability must remain clearly assigned.

#### 5.2 Security Decision Authority
The following decisions require authorized approval:
- Production security configuration.
- Privileged access.
- Security policy changes.
- High-risk integrations.
- Payment activation.
- Sensitive data processing.
- AI provider approval.
- Security incident closure.
- Acceptance of material residual risks.
- Publication of legal and privacy documents.

#### 5.3 Separation of Duties
Where practical, sensitive operations must not be controlled by a single person from beginning to end.
For example:
- Financial record creation and approval should have appropriate separation.
- Partner verification and commercial promotion should remain distinct.
- Production deployment and production access approval should be controlled.
- Security incident investigation and closure should be independently reviewed where appropriate.

### 6. SECURITY RISK MANAGEMENT FRAMEWORK
#### 6.1 Risk Assessment Process
PHERI NEPAL must maintain a documented security risk management process.
Each assessment must include:
1. Identify the asset or service.
2. Identify relevant threats.
3. Identify vulnerabilities.
4. Assess likelihood.
5. Assess potential impact.
6. Determine inherent risk.
7. Identify existing controls.
8. Determine residual risk.
9. Define treatment actions.
10. Assign an owner.
11. Set a review date.
12. Record approval and status.

#### 6.2 Risk Categories
Risk assessments must cover:
- Identity and account security.
- Personal information exposure.
- Business and partner information.
- Booking manipulation.
- Financial fraud.
- Application vulnerabilities.
- Infrastructure compromise.
- API attacks.
- Third-party provider failures.
- AI misuse and data leakage.
- Insider threats.
- Content and intellectual property violations.
- Legal and regulatory exposure.
- Operational interruption.
- Data loss and recovery failure.

#### 6.3 Risk Rating
A consistent risk rating method must be used.

| Level | Classification | Required action |
| :--- | :--- | :--- |
| 1 | Critical | Immediate escalation and containment |
| 2 | High | Priority remediation before affected production release |
| 3 | Medium | Planned remediation with documented ownership |
| 4 | Low | Routine monitoring and improvement |

Risk assessment must consider both likelihood and impact. A low-frequency event may still require critical treatment if its consequences could be severe.

#### 6.4 Risk Treatment Options
Each material risk must have one documented treatment:
- Avoid.
- Mitigate.
- Transfer where appropriate.
- Accept through authorized approval.

Critical risks must not be accepted informally.

#### 6.5 Security Risk Register
The register must contain:

| Field | Required information |
| :--- | :--- |
| Risk ID | Unique identifier |
| Risk title | Short description |
| Asset | Affected platform component |
| Threat | Potential harmful event |
| Vulnerability | Relevant weakness |
| Likelihood | Assessed probability |
| Impact | Potential consequence |
| Inherent risk | Risk before additional controls |
| Existing controls | Safeguards already implemented |
| Residual risk | Risk remaining after controls |
| Treatment | Required response |
| Owner | Responsible person |
| Target date | Planned completion date |
| Status | Open, In Progress, Mitigated, Accepted or Closed |

---

## PART III — IDENTITY, ACCESS AND ACCOUNT SECURITY

### 7. IDENTITY AND AUTHENTICATION SECURITY
#### 7.1 Authentication Architecture
Authentication must follow the approved technical architecture in Document 05.
The platform must use an approved identity and authentication mechanism.
Authentication must be centrally managed and must not be independently implemented in insecure or inconsistent ways across platform modules.

#### 7.2 Account Registration
Registration processes must:
- Validate submitted information.
- Prevent obvious automated abuse.
- Protect account creation endpoints.
- Avoid unnecessary personal data collection.
- Provide clear account verification steps where required.
- Prevent unauthorized account impersonation.
- Communicate registration and verification outcomes securely.

#### 7.3 Sign-In Security
Sign-in processes must:
- Use secure authentication protocols.
- Protect credentials during transmission.
- Apply appropriate failed-attempt controls.
- Detect suspicious activity where feasible.
- Avoid exposing sensitive account information.
- Support secure logout and session termination.

#### 7.4 Password Protection
Where password-based authentication is used:
- Passwords must never be stored in plaintext.
- A modern password-hashing algorithm must be used.
- Password reset processes must use protected, time-limited tokens.
- Password reset tokens must not be reusable after successful completion.
- Passwords must not appear in application logs.
- Users must be encouraged to use unique passwords.
- Password changes must be protected against unauthorized access.

#### 7.5 Multi-Factor Authentication
Multi-factor authentication should be required for privileged accounts and considered for sensitive operational and partner functions.
Its implementation must be evaluated according to risk, technical capability and user experience.

#### 7.6 Account Recovery
Account recovery must verify the legitimate account owner through an approved process.
Recovery controls must prevent attackers from taking control of accounts through weak identity checks or predictable recovery information.

#### 7.7 Account Suspension and Closure
The platform must support controlled account suspension and closure.
Suspension may be required for:
- Suspected account compromise.
- Fraudulent activity.
- Security policy violations.
- Partner verification problems.
- Legal or regulatory requirements.

Account closure must follow applicable retention and deletion requirements.

### 8. SESSION AND TOKEN SECURITY
#### 8.1 Session Management
Sessions must have appropriate:
- Expiration.
- Renewal.
- Revocation.
- Logout behavior.
- Device or session monitoring where supported.
- Protection against session fixation and hijacking.

#### 8.2 Token Management
Authentication tokens must:
- Be generated through approved mechanisms.
- Have appropriate expiration.
- Be securely transmitted and stored.
- Be protected from exposure.
- Be revocable where supported.
- Never be placed in public URLs or logs.

#### 8.3 Browser Security
Where browser cookies are used for authentication, appropriate protections must include:
- `Secure`.
- `HttpOnly`.
- `SameSite`.
- Appropriate expiration.
- Restricted cookie scope.

Implementation must reflect the selected authentication architecture.

### 9. AUTHORIZATION AND ROLE-BASED ACCESS CONTROL
#### 9.1 Authorization Model
PHERI NEPAL must enforce authorization at the backend.
Frontend visibility controls alone must never be considered sufficient protection.

#### 9.2 Access Control Requirements
Every protected operation must verify:
- Who is making the request.
- Whether the account is active.
- Whether the account has the required permission.
- Whether the requested resource belongs to or is accessible by that account.
- Whether the requested action is permitted under current business rules.

#### 9.3 Existing User Roles
The existing role definitions established in the project requirements remain authoritative.
This document does not create replacement roles or change existing role identifiers.

#### 9.4 Resource-Level Authorization
Access must be checked at the individual resource level where required.
For example:
- A traveler must not access another traveler's private inquiry.
- A partner must not modify another partner's business record.
- A partner must not access internal verification evidence without authorization.
- An administrator must not access restricted financial functions without the appropriate permission.
- AI services must not retrieve records that the requesting user is not permitted to access.

#### 9.5 Privileged Access Management
Privileged access must use:
- Individual accounts.
- Restricted permissions.
- Strong authentication.
- Access logging.
- Periodic review.
- Immediate revocation when no longer required.

Shared administrator credentials are prohibited.

#### 9.6 Access Review
Access permissions must be reviewed:
- When a staff member changes responsibilities.
- When a partner relationship ends.
- When an administrator leaves.
- After suspected compromise.
- Periodically according to operational risk.

---

## PART IV — DATA PROTECTION AND PRIVACY MANAGEMENT

### 10. DATA CLASSIFICATION FRAMEWORK
#### 10.1 Classification Levels
All data must be assigned an appropriate classification.

| Level | Classification | Examples |
| :--- | :--- | :--- |
| L1 | Public | Approved destination information and published business profiles |
| L2 | Internal | Internal procedures and operational documentation |
| L3 | Confidential | Private inquiries, partner records and non-public business information |
| L4 | Restricted | Authentication secrets, sensitive personal data and protected financial information |

Classification must reflect actual data sensitivity and legal requirements.

#### 10.2 Data Handling Rules
**Public Data**
- May be displayed publicly after content approval.
- Must remain protected against unauthorized modification.
- Must not accidentally include private information.

**Internal Data**
- Must be restricted to authorized personnel.
- Must not be published without approval.

**Confidential Data**
- Must have controlled access.
- Must be protected during transmission and storage.
- Must not be shared with unauthorized partners or providers.

**Restricted Data**
- Must receive the strongest appropriate access restrictions.
- Must be encrypted where applicable.
- Must have documented access and processing purposes.
- Must not be included in AI requests unnecessarily.
- Must be subject to additional monitoring where appropriate.

### 11. DATA OWNERSHIP AND PROCESSING RESPONSIBILITIES
#### 11.1 Data Ownership
PHERI NEPAL must document the responsibility for every major data category.
The project must distinguish between:
- Information collected directly from travelers.
- Information submitted by tourism partners.
- Public tourism information.
- Third-party provider information.
- Financial and transaction records.
- AI-generated or AI-processed information.
- Administrative and security records.

#### 11.2 Data Processing Responsibility
For every processing activity, the project must identify:
- Purpose.
- Data category.
- Data source.
- Authorized users.
- Processing system.
- External recipients.
- Retention requirement.
- Applicable legal basis.
- Security controls.

#### 11.3 Partner-Provided Data
Partners must be informed of their responsibility to provide accurate and authorized information.
Partner agreements must address:
- Accuracy of submitted information.
- Lawful use of photographs and documents.
- Handling of traveler information.
- Access limitations.
- Confidentiality.
- Security expectations.
- Reporting of suspected misuse.

#### 11.4 Data Controller and Processor Assessment
The legal roles of PHERI NEPAL and external service providers must be assessed according to the actual processing relationship.
The project must not automatically assume that every third-party provider has the same legal role.

### 12. DATA MINIMIZATION AND PURPOSE LIMITATION
#### 12.1 Collection Requirements
Only information necessary for an identified platform function should be collected.
Each data field must have:
- A defined purpose.
- A responsible system.
- An access requirement.
- A retention rule.
- A justification for collection.

#### 12.2 Sensitive Information
Sensitive information must not be collected merely because it may be useful in the future.
If a feature requires sensitive information, its purpose, legal basis, necessity and security safeguards must be reviewed before implementation.

#### 12.3 Secondary Use
Information collected for booking inquiries must not automatically be reused for unrelated advertising, profiling or AI training.
Any additional processing must undergo privacy and legal assessment.

#### 12.4 Purpose Changes
When the purpose of a data-processing activity changes, the project must assess whether updated transparency, consent or another lawful basis is required.

### 13. DATA STORAGE AND SEGREGATION
#### 13.1 Logical Separation
The architecture must maintain appropriate separation between:
- Public tourism content.
- Traveler account data.
- Partner account data.
- Partner verification evidence.
- Booking inquiries.
- Booking arrangements.
- Payment records.
- Commission and financial records.
- Reviews and reputation data.
- AI interaction records.
- Security logs.
- Administrative records.

#### 13.2 Storage Access
Database and storage access must be restricted through approved backend services and access policies.
Public read access must never be granted to confidential or restricted records.

#### 13.3 File Storage
Files must be stored using appropriate access controls.
Private documents must not use publicly accessible storage locations unless an explicit, reviewed publication decision has been made.

#### 13.4 Data Exports
Data exports must be restricted, logged and protected.
Bulk exports of personal, financial or partner information must require appropriate authorization.

#### 13.5 Data Integrity
Important records must have controlled modification histories.
Financial, verification, booking and administrative records must not be silently overwritten.

---

## PART V — ENCRYPTION AND TECHNICAL SECURITY CONTROLS

### 14. ENCRYPTION REQUIREMENTS
#### 14.1 Encryption in Transit
All production communication involving accounts, confidential data or sensitive operations must use HTTPS and secure TLS configuration.
Insecure transmission of credentials, authentication tokens or protected personal information is prohibited.

#### 14.2 Encryption at Rest
Appropriate encryption must protect:
- Databases.
- File storage.
- Backups.
- Sensitive logs.
- Financial records.
- Restricted personal information.

#### 14.3 Key Management
Encryption keys must:
- Be stored separately from protected data where appropriate.
- Have restricted access.
- Never be published in source code.
- Be rotated according to risk and provider capability.
- Be revoked after compromise.
- Have documented ownership and recovery procedures.

#### 14.4 Key Compromise
A suspected key compromise must trigger an incident response process.
The response must consider:
- Revocation.
- Replacement.
- Access review.
- Data exposure assessment.
- Service configuration changes.
- Required notifications.

### 15. APPLICATION SECURITY
#### 15.1 Secure Development Standards
All application development must use secure coding practices.
Requirements include:
- Server-side input validation.
- Output encoding.
- Authentication enforcement.
- Authorization enforcement.
- Safe error handling.
- Secure dependency management.
- Secure session management.
- Protected secrets.
- Safe file handling.
- Appropriate security headers.

#### 15.2 Common Web Vulnerabilities
The platform must assess and protect against applicable vulnerabilities, including:
- Cross-Site Scripting.
- Cross-Site Request Forgery.
- SQL Injection.
- NoSQL Injection.
- Broken Access Control.
- Insecure Direct Object Reference.
- Server-Side Request Forgery.
- Authentication weaknesses.
- Security misconfiguration.
- Unsafe file uploads.
- Insecure deserialization.
- Sensitive information exposure.
- Clickjacking.
- Business logic abuse.

#### 15.3 Security Headers
The website must use appropriate security headers, including where applicable:
- `Content-Security-Policy`.
- `Strict-Transport-Security`.
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- Frame restrictions through suitable modern headers.

The final configuration must be tested against the actual website and integrations.

#### 15.4 Input Validation
All user-controlled input must be validated on the server.
Validation must consider:
- Data type.
- Length.
- Format.
- Allowed values.
- File type.
- Numeric boundaries.
- Business rules.
- Unexpected or malicious content.

Frontend validation may improve usability but cannot replace backend validation.

#### 15.5 Error and Exception Management
Errors must not expose internal implementation details.
Public error responses must avoid disclosing:
- Database structure.
- Internal paths.
- Stack traces.
- API credentials.
- Authentication tokens.
- Server configuration.
- Other users' information.

### 16. API SECURITY
#### 16.1 API Architecture Alignment
API security must follow Document 07 and the technical architecture in Document 05.
The existing API identifiers API-001 to API-020 remain unchanged.

#### 16.2 API Access Protection
Each protected API endpoint must enforce the relevant:
- Authentication.
- Authorization.
- Request validation.
- Resource ownership checks.
- Rate limits.
- Business rules.

#### 16.3 API Abuse Prevention
The system must implement appropriate controls for:
- Excessive requests.
- Automated abuse.
- Credential stuffing.
- Enumeration attacks.
- Repeated failed authentication.
- Unauthorized bulk extraction.
- Malformed requests.
- Resource exhaustion.

#### 16.4 API Rate Limiting
Rate limits must be defined according to endpoint sensitivity and usage requirements.
High-risk endpoints, including authentication, account recovery, inquiry submission and administrative actions, must receive appropriate protection.

#### 16.5 API Versioning
API changes must follow documented versioning and change-management rules.
Breaking changes must be assessed for their impact on existing clients and integrations.

#### 16.6 API Credential Security
API keys and service credentials must:
- Be stored in protected server-side configuration.
- Have restricted permissions.
- Be rotated when appropriate.
- Be revoked when no longer needed.
- Never be exposed in frontend source code.

#### 16.7 Webhook Security
Incoming webhooks must use appropriate verification and event protection.
Controls must include, where supported:
- Signature verification.
- Timestamp validation.
- Replay prevention.
- Duplicate event detection.
- Idempotent processing.
- Controlled retries.
- Event logging.

Unverified webhook events must not directly authorize financial or account changes.

### 17. FILE UPLOAD AND MEDIA SECURITY
#### 17.1 Upload Validation
All uploaded files must undergo appropriate validation.
Controls must include:
- Allowed file extensions.
- File signature verification.
- File size limits.
- Content-type validation.
- Safe file naming.
- Restricted storage access.
- Malware scanning where feasible.
- Safe download behavior.

#### 17.2 Private Documents
Identity, business registration and verification documents must remain restricted to authorized personnel.
They must not be displayed publicly merely because a partner profile is public.

#### 17.3 Media Publication
Before public media publication, the platform must consider:
- Copyright permission.
- Personal information.
- Sensitive location information.
- Metadata exposure.
- Misleading or fraudulent material.

#### 17.4 Malicious Upload Handling
Files identified as suspicious must be quarantined or rejected according to the approved security process.

---

## PART VI — INFRASTRUCTURE AND DEVELOPMENT SECURITY

### 18. CLOUD AND INFRASTRUCTURE SECURITY
#### 18.1 Infrastructure Governance
Hosting and cloud services must be configured according to approved security requirements.
The project must maintain an inventory of:
- Hosting services.
- Databases.
- Storage services.
- Backend services.
- Domains and DNS.
- Certificates.
- Network components.
- Administrative accounts.
- External service connections.

#### 18.2 Secure Configuration
Infrastructure must use:
- Restricted administrative access.
- Secure storage permissions.
- Protected environment variables.
- Secure network settings.
- Current supported software.
- Removal of unnecessary services.
- Controlled configuration changes.

#### 18.3 Domain and DNS Security
Domain and DNS management must use restricted access.
Where supported, the project should implement:
- Multi-factor authentication for domain accounts.
- Domain transfer protection.
- DNS change monitoring.
- Renewal monitoring.
- Appropriate DNS security controls.

#### 18.4 Environment Separation
The platform must maintain separate environments:
1. Development.
2. Staging and Testing.
3. Production.

Production credentials and data must not be casually reused in development.

#### 18.5 Production Access
Production access must be restricted to authorized personnel.
All sensitive production changes must be documented.

### 19. SOURCE CODE AND DEVELOPMENT SECURITY
#### 19.1 Repository Access
Source code repositories must use individual accounts and controlled permissions.
Public access to private project repositories must be prohibited unless formally approved.

#### 19.2 Code Review
Security-sensitive changes must receive appropriate review.
Examples include changes to:
- Authentication.
- Authorization.
- Database rules.
- Financial logic.
- Booking status.
- Partner verification.
- AI access.
- External integrations.
- Administrative permissions.

#### 19.3 Dependency Management
The project must monitor dependencies for known vulnerabilities.
Unused, outdated or untrusted dependencies must be reviewed and removed where appropriate.

#### 19.4 Secret Scanning
The development process should include automated or manual checks for accidentally committed credentials and secrets.
A discovered secret must be treated as potentially compromised until verified otherwise.

#### 19.5 Secure Deployment
Production deployment must follow an approved process.
It must include:
- Reviewed changes.
- Environment-specific configuration.
- Deployment authorization.
- Release records.
- Post-deployment verification.
- Rollback or recovery procedures.

### 20. INFRASTRUCTURE MONITORING
Monitoring must cover:
- Website availability.
- Backend service health.
- Database availability.
- Storage availability.
- Failed authentication patterns.
- Unusual API traffic.
- Resource exhaustion.
- Unauthorized configuration changes.
- Suspicious privileged access.
- Backup failures.
- Integration failures.

Monitoring tools and providers remain subject to technical evaluation.

---

## PART VII — PRIVACY RIGHTS AND USER TRANSPARENCY

### 21. PRIVACY POLICY AND NOTICE FRAMEWORK
#### 21.1 Privacy Notice Requirement
A clear privacy notice must be available to users before or at the relevant point of personal data collection.

#### 21.2 Required Privacy Information
The notice must explain, where applicable:
1. Identity of the responsible organization.
2. Categories of personal information collected.
3. Sources of information.
4. Purposes of processing.
5. Applicable legal basis.
6. Categories of recipients.
7. Third-party service involvement.
8. Cross-border processing.
9. Retention principles.
10. User rights.
11. Privacy request procedure.
12. Security practices at an appropriate level.
13. Complaint and contact channels.
14. Relevant policy changes.

#### 21.3 Accuracy
The privacy notice must describe actual platform practices.
It must not claim that data is never shared, never retained or never processed by AI providers unless that statement has been verified.

#### 21.4 Policy Versioning
Published privacy policies must maintain version history and effective dates.
Material changes must be communicated appropriately.

### 22. CONSENT AND LAWFUL PROCESSING
#### 22.1 Lawful Processing Assessment
Each personal data-processing activity must have an identified legal basis appropriate to the applicable jurisdiction.
Consent must not be treated as the only possible lawful basis.

#### 22.2 Consent Requirements
Where consent is required, it must be:
- Clear.
- Specific.
- Informed.
- Freely given where required.
- Recorded appropriately.
- Withdrawable through an appropriate process.

#### 22.3 Separate Consent Purposes
Where appropriate, separate controls must be used for:
- Account-related communications.
- Marketing communications.
- Non-essential cookies.
- Optional personalization.
- Optional data uses.

#### 22.4 Withdrawal
Withdrawal of consent must be handled according to the relevant legal and technical requirements.
The platform must not continue a consent-based processing activity after a valid withdrawal unless another lawful basis applies.

### 23. USER PRIVACY REQUEST MANAGEMENT
#### 23.1 Request Types
PHERI NEPAL must establish a process to receive and manage applicable requests concerning:
- Access.
- Correction.
- Deletion.
- Consent withdrawal.
- Processing objections.
- Processing restrictions.
- Data portability where legally required.
- Complaints.
- Information about data sharing.

#### 23.2 Request Verification
Before disclosing or changing personal information, the platform must verify the requester's identity appropriately.

#### 23.3 Request Workflow
Each request must follow a controlled process:
1. Receive the request.
2. Record the request.
3. Verify identity where necessary.
4. Identify relevant data.
5. Assess applicable rights and exceptions.
6. Obtain required internal approval.
7. Complete the permitted action.
8. Inform the requester.
9. Record the outcome.

#### 23.4 Response Deadlines
Applicable response deadlines must be determined through legal review.
No universal response period is established by this blueprint.

### 24. DATA RETENTION AND DELETION
#### 24.1 Retention Policy
Each data category must have a documented retention period or retention rule.
Retention must consider:
- Service requirements.
- Legal obligations.
- Contractual obligations.
- Financial recordkeeping.
- Security investigations.
- User rights.
- Operational necessity.

#### 24.2 Data Categories
The retention schedule must cover:
- Account information.
- Partner records.
- Verification evidence.
- Booking inquiries.
- Booking arrangements.
- Payment records.
- Financial records.
- Reviews.
- AI interactions.
- Marketing preferences.
- Consent records.
- Security logs.
- Support requests.
- Uploaded documents.

#### 24.3 Deletion Procedure
When deletion is permitted and required, the process must address:
- Primary databases.
- File storage.
- Search indexes.
- Caches.
- AI-related storage.
- Third-party providers.
- Backups.
- Exported copies.

#### 24.4 Backup Deletion
Deleted information may remain temporarily in protected backups according to the approved backup lifecycle.
The project must document how such information is removed or expires from backup systems.

#### 24.5 Legal Retention Exceptions
Information may need to be retained for applicable legal, financial, contractual or security reasons.
Any exception must be documented, restricted and reviewed.
Exact retention periods remain Pending Legal Review.

---

## PART VIII — THIRD-PARTY AND INTERNATIONAL DATA GOVERNANCE

### 25. THIRD-PARTY PROVIDER SECURITY
#### 25.1 Provider Assessment
Every third-party provider receiving platform data or providing critical infrastructure must undergo an appropriate assessment.

#### 25.2 Assessment Criteria
The assessment must consider:
- Business identity and reliability.
- Security controls.
- Privacy practices.
- Data processing terms.
- Data storage locations.
- Subprocessors.
- Data retention.
- Data deletion.
- Incident notification.
- Access management.
- Service availability.
- Business continuity.
- Contract termination.
- Data export and portability.

#### 25.3 Provider Approval
A provider may be activated in production only after the required technical, privacy, commercial and legal approvals.

#### 25.4 Provider Register
The project must maintain a provider register.

| Field | Description |
| :--- | :--- |
| Provider ID | Unique reference |
| Provider name | Official provider name |
| Service | Purpose of integration |
| Data accessed | Categories of data shared |
| Data location | Known processing or storage location |
| Legal role | Assessed processing relationship |
| Security review | Assessment status |
| Contract status | Agreement status |
| Approval owner | Responsible approver |
| Production status | Planned, Testing, Approved, Active or Suspended |

#### 25.5 Provider Failure
The platform must maintain appropriate fallback procedures for critical provider outages.
A provider failure must not cause the platform to disclose private information or present unavailable services as operational.

### 26. INTERNATIONAL DATA TRANSFERS
#### 26.1 Transfer Assessment
Where personal data is transferred internationally, the project must assess applicable legal requirements.

#### 26.2 Transfer Documentation
The assessment must document:
- Origin country.
- Destination country.
- Provider.
- Data categories.
- Processing purpose.
- Legal basis.
- Transfer safeguards.
- Subprocessor involvement.
- Retention and deletion arrangements.

#### 26.3 Transfer Restrictions
No international transfer involving personal data should be activated without the required legal and privacy assessment.

#### 26.4 Future Market Expansion
Entering a new market may introduce additional privacy, consumer, advertising or commercial obligations.
Those obligations must be reviewed before relevant services are offered.

---

## PART IX — AI SECURITY AND INTELLIGENT SERVICE PRIVACY

### 27. AI SECURITY GOVERNANCE
#### 27.1 Alignment With Document 08
All AI services must follow the architecture and service definitions established in Document 08.
Existing AI service IDs AI-001 to AI-016 remain unchanged.

#### 27.2 AI Security Boundary
AI services must operate through approved backend-controlled integrations.
AI provider credentials must never be exposed in frontend code or public repositories.

#### 27.3 Data Access
AI services must only access information that the requesting user or authorized system is permitted to access.
AI must not bypass platform authentication, authorization or data ownership rules.

### 28. AI DATA PRIVACY
#### 28.1 Data Minimization
Only the information required for the requested AI operation may be transmitted to an AI provider.

#### 28.2 Sensitive Information
Sensitive personal, financial, authentication and verification information must not be transmitted unnecessarily.

#### 28.3 AI Provider Assessment
Before production activation, the AI provider must be assessed for:
- Data retention.
- Model training use.
- Data processing terms.
- Data location.
- Subprocessors.
- Security controls.
- Deletion capabilities.
- Incident notification.
- Access controls.

#### 28.4 User Transparency
Where personal information is processed through AI, relevant user-facing notices must accurately explain the processing.

#### 28.5 AI Training Restrictions
PHERI NEPAL must not assume that information submitted to an external AI provider is automatically excluded from model training.
Provider terms and technical settings must be verified before production use.
The platform must not reuse user conversations for unrelated AI training without appropriate assessment and authorization.

### 29. AI ATTACK AND MISUSE PREVENTION
#### 29.1 Prompt Injection
AI systems must treat user content, retrieved documents, external pages and uploaded material as untrusted input.

#### 29.2 Retrieval Security
Retrieval systems must enforce access permissions and prevent restricted information from appearing in responses.

#### 29.3 Tool Execution
AI tool access must be limited to approved operations.
Sensitive operations must require appropriate authorization and, where necessary, human approval.

#### 29.4 Data Leakage
AI systems must be tested for:
- Cross-user data leakage.
- Prompt-based extraction.
- Unauthorized retrieval.
- Secret disclosure.
- Personal information exposure.
- Restricted document exposure.

#### 29.5 Output Verification
AI-generated content must not automatically be treated as verified factual information.
Time-sensitive and safety-critical information must be checked against appropriate authoritative sources.

#### 29.6 Human Oversight
AI must not autonomously approve:
- Financial transactions.
- Refund decisions.
- Partner verification.
- High-impact administrative changes.
- Legal decisions.
- Other sensitive decisions requiring human accountability.

#### 29.7 AI Failure Handling
When an AI provider or retrieval service fails, the platform must communicate the limitation clearly.
The system must not fabricate information to hide a provider failure.

### 30. AI INTERACTION DATA MANAGEMENT
AI interaction data must have documented:
- Collection purposes.
- Storage location.
- Access permissions.
- Retention rules.
- Deletion procedures.
- Provider-sharing arrangements.
- User transparency requirements.

AI interaction records must not be retained indefinitely by default.
The final retention period and personalization rules remain subject to approval.

---

## PART X — FINANCIAL, BOOKING AND COMMERCIAL SECURITY

### 31. BOOKING SECURITY
#### 31.1 Booking Model Alignment
The initial PHERI NEPAL booking model remains inquiry-based.
A submitted inquiry is not automatically a confirmed booking.

#### 31.2 Status Separation
The following concepts must remain separate:
- Booking inquiry status.
- Booking arrangement status.
- Payment status.
- Refund status.
- Commission eligibility.

#### 31.3 Booking Integrity
The platform must protect against:
- Unauthorized inquiry modification.
- Unauthorized arrangement confirmation.
- Duplicate inquiry processing.
- Fake booking records.
- Unauthorized status changes.
- Cross-account data access.
- Manipulation of transaction records.

#### 31.4 Partner Confirmation
Only an authorized partner or approved operational process may perform the relevant confirmation action.
Confirmation must be recorded with appropriate accountability.

### 32. PAYMENT SECURITY
#### 32.1 Initial Payment Position
The presence of payment-related architecture does not mean that live payments are operational.
Live payment processing must remain inactive until the required provider, technical, legal, security and operational approvals are complete.

#### 32.2 Payment Provider Assessment
Before activation, the project must assess:
- Provider legitimacy.
- Payment security.
- Applicable licensing or authorization.
- Supported countries.
- Currency support.
- Refund capabilities.
- Dispute procedures.
- Data handling.
- Transaction verification.
- Integration security.
- Contractual obligations.

#### 32.3 Card Payment Security
Where card payments are introduced, PHERI NEPAL should use an appropriately compliant payment service provider.
Applicable PCI DSS responsibilities must be confirmed based on the actual integration and data flow.
This document does not claim PCI DSS certification or compliance.

#### 32.4 Payment Data
Payment credentials and sensitive payment information must not be stored or exposed unless the architecture, provider and applicable compliance requirements explicitly support the relevant handling.

#### 32.5 Payment Status Verification
Payment status must be based on trusted provider confirmation or another formally approved verification mechanism.
Frontend messages alone must never establish successful payment.

### 33. FINANCIAL RECORD SECURITY
#### 33.1 Financial Integrity
Financial records must be:
- Traceable.
- Access-controlled.
- Protected against unauthorized modification.
- Supported by appropriate audit history.
- Reconciled with trusted transaction evidence.
- Retained according to applicable requirements.

#### 33.2 Revenue Separation
The system must distinguish:
- Gross Transaction Value.
- Actual platform revenue.
- Booking commission.
- Subscription revenue.
- Advertising revenue.
- Affiliate revenue.
- Refunds.
- Adjustments.
- Outstanding amounts.

#### 33.3 Commission Eligibility
Commission must not be recognized merely because an inquiry is submitted or an arrangement is marked confirmed.
Eligibility must follow the rules in Document 02.

#### 33.4 Financial Approval
Sensitive financial adjustments and administrative overrides must require authorized approval and appropriate records.

#### 33.5 Fraud Monitoring
The platform must monitor relevant indicators of:
- Duplicate transactions.
- Manipulated commissions.
- False completion claims.
- Refund abuse.
- Unauthorized payment status changes.
- Partner collusion.
- Account takeover.
- Suspicious transaction patterns.

---

## PART XI — PARTNER, CONTENT AND COMMERCIAL TRUST

### 34. PARTNER VERIFICATION SECURITY
#### 34.1 Verification Evidence
Partner verification evidence must be stored securely and accessed only by authorized reviewers.

#### 34.2 Verification Decisions
Verification decisions must maintain:
- Partner reference.
- Evidence reference.
- Reviewer identity.
- Review date.
- Decision outcome.
- Reason or review note.
- Status history.
- Renewal or expiry information where relevant.

#### 34.3 Verification Independence
Commercial payments, subscriptions and advertising fees must not automatically grant verified status.
Verification must follow documented criteria.

#### 34.4 Suspicious Partner Activity
The platform must have procedures for investigating:
- Fake businesses.
- Impersonation.
- False licenses or documents.
- Misleading service descriptions.
- Fraudulent booking behavior.
- Unauthorized use of another business's identity.

#### 34.5 Verification Suspension
Where verification evidence is found to be unreliable, the platform must be able to suspend or revoke the relevant status through an authorized process.

### 35. CONTENT, REVIEWS AND REPUTATION SECURITY
#### 35.1 Content Rights
All published content must have an appropriate ownership, permission, license or other lawful basis.

#### 35.2 Content Moderation
The platform must maintain controls for reviewing and moderating:
- Destination content.
- Business descriptions.
- Images and videos.
- Reviews.
- User submissions.
- AI-assisted content.
- Sponsored materials.

#### 35.3 Review Integrity
The platform must address:
- Fake reviews.
- Review manipulation.
- Paid reviews presented as independent.
- Impersonation.
- Harassment.
- Personal information exposure.
- Defamatory or unlawful material.

#### 35.4 Commercial Disclosure
Featured listings, sponsored content, affiliate recommendations and advertisements must be clearly distinguished from organic content.

#### 35.5 Content Complaints
A process must exist for reporting inaccurate, misleading, unauthorized or harmful content.

---

## PART XII — INCIDENT RESPONSE AND BUSINESS CONTINUITY

### 36. SECURITY INCIDENT MANAGEMENT
#### 36.1 Incident Definition
A security incident is an event that compromises or threatens the confidentiality, integrity or availability of platform information, systems or services.

#### 36.2 Incident Categories
The incident framework must cover:
- Account compromise.
- Unauthorized data access.
- Personal information exposure.
- Database compromise.
- Malware.
- API compromise.
- Financial fraud.
- Privileged access misuse.
- AI data leakage.
- Third-party provider compromise.
- Website disruption.
- Data loss.
- Unauthorized content modification.

#### 36.3 Incident Severity
| Severity | Description | Response |
| :--- | :--- | :--- |
| SEV-1 | Critical platform or sensitive-data compromise | Immediate escalation and containment |
| SEV-2 | Major security incident with significant impact | Urgent investigation and remediation |
| SEV-3 | Limited incident requiring corrective action | Managed response and monitoring |
| SEV-4 | Low-impact security event | Routine investigation and documentation |

#### 36.4 Incident Response Lifecycle
Every significant incident must follow:
1. Detection.
2. Reporting.
3. Initial assessment.
4. Severity classification.
5. Containment.
6. Investigation.
7. Eradication.
8. Recovery.
9. Impact assessment.
10. Required notifications.
11. Post-incident review.

#### 36.5 Incident Response Plan
The project must maintain a written incident response plan containing:
- Response responsibilities.
- Escalation contacts.
- Internal communication channels.
- Technical containment procedures.
- Evidence preservation.
- Provider contact procedures.
- Legal escalation.
- Privacy impact assessment.
- User communication process.
- Recovery authorization.
- Incident closure requirements.

#### 36.6 Evidence Preservation
Relevant evidence must be preserved securely.
Evidence handling must maintain appropriate integrity, access restrictions and investigation records.

#### 36.7 External Notification
Where notification to affected individuals, authorities or providers is legally required, the platform must follow the applicable requirements.
Notification thresholds, responsible authorities and reporting deadlines must be confirmed through legal review.

#### 36.8 Post-Incident Review
Significant incidents must receive a documented post-incident review.
The review must identify:
- Root cause.
- Impact.
- Failed controls.
- Response effectiveness.
- Required remediation.
- Lessons learned.
- Policy or architecture changes.

### 37. BACKUP AND DATA RECOVERY
#### 37.1 Backup Scope
Backups must cover critical:
- Databases.
- Application configuration.
- Important files.
- Operational records.
- Approved infrastructure configuration.
- Security and audit information where appropriate.

#### 37.2 Backup Protection
Backups must be protected against:
- Unauthorized access.
- Accidental deletion.
- Malware.
- Ransomware.
- Unauthorized modification.
- Provider compromise.

#### 37.3 Backup Encryption
Sensitive backups must be encrypted using appropriate mechanisms.

#### 37.4 Backup Monitoring
Backup jobs must be monitored for successful completion.
Failed backups must generate appropriate alerts and corrective actions.

#### 37.5 Restoration Testing
The project must periodically test restoration.
A backup is not considered reliable solely because a backup job reports success.

#### 37.6 Recovery Objectives
The project must formally define:
- Recovery Time Objective (RTO).
- Recovery Point Objective (RPO).

Values must be established according to service criticality and operational capability.
Exact targets remain Pending Technical and Operational Approval.

### 38. BUSINESS CONTINUITY AND DISASTER RECOVERY
#### 38.1 Continuity Scope
The continuity plan must cover:
- Website outage.
- Backend failure.
- Database failure.
- Cloud infrastructure outage.
- Domain or DNS problems.
- AI provider outage.
- Map provider outage.
- Notification provider outage.
- Payment provider outage.
- Loss of administrative access.
- Security incidents.
- Loss of critical operational personnel.

#### 38.2 Fallback Operations
Where an external service is unavailable, the platform must use an approved fallback where feasible.
If no reliable fallback exists, the affected feature must clearly communicate its unavailable status.

#### 38.3 Disaster Recovery Testing
The project must periodically assess whether critical systems can be restored.
Results and identified weaknesses must be documented.

---

## PART XIII — LEGAL AND REGULATORY COMPLIANCE

### 39. LEGAL GOVERNANCE FRAMEWORK
#### 39.1 Legal Applicability
PHERI NEPAL must identify the legal requirements applicable to its actual operations.
Applicability must consider:
- Place of establishment.
- Place of operation.
- Target markets.
- User locations.
- Partner locations.
- Data processing locations.
- Commercial activities.
- Payment arrangements.
- Service categories.

#### 39.2 Legal Review Requirement
Qualified legal counsel must review applicable requirements before the relevant activities are launched.
This blueprint is not a legal opinion and does not replace professional legal advice.

### 40. NEPAL LEGAL AND REGULATORY ASSESSMENT
The project must assess the applicability of Nepalese laws and regulations concerning:
- **40.1 Business Establishment:** Company registration, business operation, required registrations and approvals, applicable commercial activities.
- **40.2 Tourism Operations:** Tourism-related licensing and authorization, travel and tour operation requirements, trekking and activity-related obligations, accommodation and transport partner requirements, relevant tourism business responsibilities.
- **40.3 Digital Services:** Electronic transactions, electronic records, digital contracts, online commercial activity, applicable cyber and information security obligations.
- **40.4 Privacy and Data Protection:** Personal information collection, processing and disclosure, data security, user rights, data sharing, retention and deletion.
- **40.5 Consumer Protection:** Accurate commercial information, pricing transparency, booking representations, refund and cancellation information, complaints and dispute handling, advertising disclosures.
- **40.6 Financial and Tax Matters:** Tax registration and reporting, financial recordkeeping, applicable payment obligations, commission and affiliate arrangements, relevant cross-border commercial considerations.
- **40.7 Intellectual Property:** Copyright, trademarks, software ownership, photography and media rights, content licensing, user-generated content.
- **40.8 Employment and Contracting:** Employee obligations, contractor arrangements, confidentiality, intellectual property ownership, relevant employment requirements.

The exact laws, current amendments, applicable rules, responsible authorities and required approvals must be verified by qualified legal counsel using authoritative sources.
No specific license or legal obligation is considered confirmed solely by its inclusion in this assessment list.

### 41. INTERNATIONAL LEGAL ASSESSMENT
Because PHERI NEPAL may serve international travelers and use providers operating in different countries, the project must assess additional applicable legal frameworks.
Potential areas include:
- Personal data protection.
- Cross-border data transfers.
- Consumer protection.
- Digital commerce.
- Electronic communications.
- Advertising disclosures.
- Payment services.
- Intellectual property.
- Accessibility.
- Tourism-related commercial obligations.

International legal requirements must be assessed according to actual applicability.
The platform must not assume that every foreign privacy or commercial law automatically applies to every user.

### 42. LEGAL DOCUMENTS AND CONTRACTUAL FRAMEWORK
Before public launch, the project must prepare and obtain appropriate review of the following documents.

| Document | Purpose |
| :--- | :--- |
| Terms of Service | Defines user-platform relationship |
| Privacy Policy | Explains personal information processing |
| Cookie Policy | Explains applicable cookies and tracking |
| Partner Terms and Conditions | Defines partner responsibilities |
| Partner Agreement | Establishes commercial and operational terms |
| Booking and Inquiry Terms | Explains inquiry and confirmation processes |
| Cancellation and Refund Policy | Explains applicable cancellation and refund arrangements |
| Acceptable Use Policy | Defines prohibited platform behavior |
| Content and Review Policy | Establishes publication and moderation rules |
| Intellectual Property Policy | Addresses ownership and permitted use |
| Advertising Disclosure Policy | Defines commercial disclosure standards |
| Affiliate Disclosure | Explains relevant affiliate relationships |
| Data Processing Agreements | Establishes relevant provider data-processing responsibilities |
| Confidentiality Agreements | Protects confidential business and operational information |

Not every document necessarily applies to every relationship. Final requirements must be determined through legal review.

### 43. LEGAL CLAIMS AND PUBLIC REPRESENTATIONS
PHERI NEPAL must not make unsupported claims concerning:
- Government endorsement.
- Official government status.
- Regulatory approval.
- Security certification.
- Legal compliance.
- Guaranteed travel safety.
- Guaranteed service availability.
- Guaranteed booking outcomes.
- Provider authorization.
- Business verification.

All public claims must be accurate and supported by appropriate evidence.

---

## PART XIV — ACCESSIBILITY, TRANSPARENCY AND USER TRUST

### 44. ACCESSIBILITY AND SECURITY INTERFACE REQUIREMENTS
The platform must continue to follow the WCAG 2.2 AA accessibility target established in Document 04.
Security and privacy interfaces must support:
- Keyboard navigation.
- Screen-reader compatibility.
- Understandable form labels.
- Accessible error messages.
- Clear consent controls.
- Readable privacy information.
- Accessible authentication.
- Appropriate contrast.
- Clear account security notifications.

Accessibility must not be weakened by security features.

### 45. USER COMMUNICATION AND TRANSPARENCY
- **45.1 Security Communication:** Users must receive appropriate information about relevant security events affecting their accounts.
- **45.2 Privacy Communication:** Privacy notices must use understandable language.
- **45.3 Commercial Communication:** Users must be able to distinguish organic recommendations from paid promotion and affiliate relationships.
- **45.4 Booking Communication:** The platform must explain the inquiry and partner-confirmation process accurately.
- **45.5 AI Communication:** Users must be informed where necessary that information or recommendations are AI-generated and may require verification. AI must not be presented as a substitute for official authorities or qualified professional advice.

---

## PART XV — SECURITY TESTING, AUDIT AND COMPLIANCE MONITORING

### 46. SECURITY TESTING FRAMEWORK
#### 46.1 Testing Scope
Security testing must cover:
- Authentication.
- Authorization.
- Account recovery.
- Session management.
- APIs.
- Database rules.
- File uploads.
- Administrative functions.
- Financial workflows.
- Partner verification.
- AI services.
- Third-party integrations.
- Infrastructure configuration.

#### 46.2 Testing Methods
Testing should include:
- Manual security review.
- Automated vulnerability scanning.
- Dependency scanning.
- Configuration assessment.
- Access-control testing.
- API security testing.
- Penetration testing where appropriate.
- Backup restoration testing.
- Incident response exercises.

#### 46.3 Pre-Launch Security Review
Before production launch, the project must review all critical security controls.
Critical unresolved vulnerabilities must prevent the affected functionality from being approved for production.

#### 46.4 Independent Testing
Independent security testing should be arranged according to risk and operational maturity.

#### 46.5 Remediation Verification
Security findings must be retested after remediation.
A reported fix must not be considered complete until its effectiveness has been verified.

### 47. SECURITY AUDIT FRAMEWORK
#### 47.1 Audit Areas
Audits should assess:
- Access permissions.
- Authentication configuration.
- Security policies.
- Data protection.
- API security.
- Provider controls.
- Financial record integrity.
- AI security.
- Incident response.
- Backup and recovery.
- Privacy practices.
- Legal document status.

#### 47.2 Audit Evidence
Evidence may include:
- Configuration records.
- Access logs.
- Security test reports.
- Change approvals.
- Risk registers.
- Provider assessments.
- Incident records.
- Backup test results.
- Privacy request records.
- Legal review records.

#### 47.3 Audit Findings
Each finding must have:
- Finding ID.
- Description.
- Risk rating.
- Evidence.
- Responsible owner.
- Remediation action.
- Target date.
- Verification status.

### 48. COMPLIANCE MONITORING
#### 48.1 Ongoing Monitoring
The project must monitor changes in:
- Applicable laws.
- Regulatory requirements.
- Provider terms.
- Security threats.
- Privacy requirements.
- Payment requirements.
- AI provider practices.
- Operational responsibilities.

#### 48.2 Compliance Review Triggers
A new compliance review must be initiated when:
- A new market is entered.
- A new payment method is introduced.
- A new category of personal data is collected.
- A new AI provider is selected.
- A new third-party provider receives personal information.
- A new commercial service is introduced.
- The booking model changes.
- A major architecture change occurs.
- A significant security incident occurs.
- Relevant legal requirements change.

#### 48.3 Compliance Register
The project must maintain a compliance register containing:

| Field | Description |
| :--- | :--- |
| Compliance ID | Unique reference |
| Requirement | Legal, contractual or internal requirement |
| Jurisdiction | Relevant jurisdiction |
| Applicable activity | Affected service or operation |
| Responsible owner | Accountable person |
| Evidence | Required supporting records |
| Review date | Next assessment |
| Status | Pending, Under Review, Implemented, Verified or Not Applicable |
| Legal confirmation | Review outcome and supporting reference |

#### 48.4 Compliance Status
A requirement must not be marked Verified merely because a policy document exists.
Verification must be based on evidence that the relevant control is implemented and operating.

---

## PART XVI — IMPLEMENTATION AND OPERATIONAL GOVERNANCE

### 49. SECURITY IMPLEMENTATION PHASES
#### 49.1 Phase 1 — Essential Launch Controls
Before the public production launch, the project must implement or verify:
- Secure authentication.
- Backend authorization.
- Protected administrative access.
- HTTPS.
- Secure application configuration.
- Protected credentials and secrets.
- Development, staging and production separation.
- Input validation.
- API access protection.
- Database access restrictions.
- Backup and restoration procedures.
- Security logging.
- Basic incident response procedures.
- Privacy notices and applicable legal documents.
- Partner data protection.
- Security testing.
- Legal assessment of launch activities.

#### 49.2 Phase 2 — Operational Security Maturity
After foundational controls are established:
- Expand security monitoring.
- Formalize access reviews.
- Improve vulnerability management.
- Conduct periodic security testing.
- Establish privacy request workflows.
- Improve data retention automation.
- Complete provider security assessments.
- Perform incident response exercises.
- Review AI security and privacy controls.
- Improve fraud monitoring.

#### 49.3 Phase 3 — Advanced Security Governance
As platform operations expand:
- Conduct independent security assessments.
- Improve compliance evidence management.
- Expand disaster recovery exercises.
- Improve security analytics.
- Review advanced fraud detection.
- Strengthen provider risk management.
- Expand privacy and legal reviews for new markets.
- Improve continuous control monitoring.

These phases define implementation priorities. They do not establish additional platform modules or change the project scope.

### 50. OPERATIONAL SECURITY PROCEDURES
The project must maintain documented procedures for:
1. Account access approval.
2. Privileged access management.
3. Staff onboarding and offboarding.
4. Security incident reporting.
5. Vulnerability reporting.
6. Production deployment.
7. Emergency security changes.
8. Backup monitoring.
9. Recovery testing.
10. Provider onboarding.
11. Provider suspension.
12. Personal data requests.
13. Data deletion.
14. Partner verification evidence handling.
15. Financial access and approval.
16. AI provider configuration.
17. Security audit and remediation.

Each procedure must identify its owner, approval requirements and evidence records.

### 51. SECURITY AND PRIVACY PERFORMANCE INDICATORS
The following indicators must be used to monitor security and privacy maturity.

| KPI ID | Indicator | Measurement |
| :--- | :--- | :--- |
| SPM-001 | Critical security findings | Number of unresolved critical findings |
| SPM-002 | High-risk findings | Number of unresolved high-risk findings |
| SPM-003 | Vulnerability remediation | Time taken to remediate findings |
| SPM-004 | Access review completion | Percentage of required reviews completed |
| SPM-005 | Privileged account protection | Percentage of privileged accounts meeting approved security requirements |
| SPM-006 | Backup success | Percentage of successful scheduled backups |
| SPM-007 | Recovery test completion | Percentage of scheduled recovery tests completed |
| SPM-008 | Incident response | Time from detection to initial response |
| SPM-009 | Security incident recurrence | Number of repeated incidents with the same root cause |
| SPM-010 | Provider assessment | Percentage of required providers assessed |
| SPM-011 | Privacy request handling | Number and status of privacy requests |
| SPM-012 | Retention compliance | Percentage of reviewed records following approved retention rules |
| SPM-013 | AI security findings | Number of unresolved AI-related security findings |
| SPM-014 | Legal review completion | Percentage of required legal reviews completed |
| SPM-015 | Security testing completion | Percentage of planned security tests completed |

Targets and reporting frequencies must be approved based on operational maturity.
No performance result should be reported without supporting records.

---

## PART XVII — ACCEPTANCE, PENDING DECISIONS AND DOCUMENT CONTROL

### 52. SECURITY AND PRIVACY ACCEPTANCE CRITERIA
The following requirements must be assessed before production approval.

| Acceptance ID | Requirement |
| :--- | :--- |
| SEC-AC-001 | Authentication uses an approved mechanism |
| SEC-AC-002 | Backend authorization protects all relevant restricted operations |
| SEC-AC-003 | Resource-level access checks are implemented |
| SEC-AC-004 | Privileged accounts are restricted and protected |
| SEC-AC-005 | Session and token security controls are implemented |
| SEC-AC-006 | Sensitive data is appropriately encrypted in transit and at rest |
| SEC-AC-007 | Secrets are protected and not exposed in frontend code |
| SEC-AC-008 | Application security controls are tested |
| SEC-AC-009 | API security controls are implemented |
| SEC-AC-010 | Webhook verification is implemented where applicable |
| SEC-AC-011 | File uploads are validated and protected |
| SEC-AC-012 | Production and non-production environments are separated |
| SEC-AC-013 | Security logging is implemented |
| SEC-AC-014 | Critical vulnerabilities are resolved before release |
| SEC-AC-015 | Backup restoration has been tested |
| SEC-AC-016 | Incident response procedures are documented |
| SEC-AC-017 | Data classification and ownership are documented |
| SEC-AC-018 | Privacy notice and applicable policies have been reviewed |
| SEC-AC-019 | Data retention and deletion rules are established |
| SEC-AC-020 | Privacy request handling is defined |
| SEC-AC-021 | Third-party providers have undergone required assessment |
| SEC-AC-022 | International data transfers have been assessed where applicable |
| SEC-AC-023 | AI services follow approved privacy and security requirements |
| SEC-AC-024 | Financial and booking records maintain appropriate integrity controls |
| SEC-AC-025 | Partner verification evidence is protected |
| SEC-AC-026 | Commercial and sponsored content is transparently disclosed |
| SEC-AC-027 | Applicable legal obligations have received qualified review |
| SEC-AC-028 | Required security testing has been completed |
| SEC-AC-029 | Compliance evidence is maintained |
| SEC-AC-030 | Critical residual risks have been resolved or formally addressed through authorized approval |

Acceptance must be based on actual implementation evidence, not document completion alone.

### 53. PENDING SECURITY, PRIVACY AND LEGAL DECISIONS
The following decisions require formal assessment and approval.

| ID | Pending decision |
| :--- | :--- |
| PD-SEC-01 | Final authentication provider and configuration |
| PD-SEC-02 | Multi-factor authentication implementation |
| PD-SEC-03 | Final role and permission matrix |
| PD-SEC-04 | Encryption and key-management implementation |
| PD-SEC-05 | Security monitoring and alerting solution |
| PD-SEC-06 | Vulnerability scanning and penetration testing arrangements |
| PD-SEC-07 | Incident response ownership and escalation contacts |
| PD-SEC-08 | Backup retention policy |
| PD-SEC-09 | Recovery Time Objective and Recovery Point Objective |
| PD-SEC-10 | Data retention and deletion periods |
| PD-SEC-11 | Final privacy notice and consent requirements |
| PD-SEC-12 | Applicable Nepalese legal obligations |
| PD-SEC-13 | Applicable international legal obligations |
| PD-SEC-14 | Cross-border data transfer safeguards |
| PD-SEC-15 | Cookie and analytics consent implementation |
| PD-SEC-16 | Third-party provider security approvals |
| PD-SEC-17 | AI provider retention and model-training assessment |
| PD-SEC-18 | Payment provider security and legal approval |
| PD-SEC-19 | Applicable payment card security responsibilities |
| PD-SEC-20 | Independent security assessment schedule |
| PD-SEC-21 | Final public legal documents |
| PD-SEC-22 | Security and privacy audit frequency |
| PD-SEC-23 | Privacy request operational workflow |
| PD-SEC-24 | Security and compliance evidence retention |

No pending decision is considered approved until formally recorded.

### 54. DEPENDENCIES ON OTHER PROJECT DOCUMENTS
This document must remain aligned with the official project document series.

| Document | Relationship |
| :--- | :--- |
| Document 01 — Master Project Blueprint | Overall platform scope and governance |
| Document 02 — Business Model and Revenue Blueprint | Financial security and commercial transparency |
| Document 03 — User Journey and Functional Requirements Blueprint | User-facing security and privacy workflows |
| Document 04 — UI/UX and Design System Blueprint | Accessibility and privacy interface standards |
| Document 05 — Technical Architecture Blueprint | Infrastructure and security architecture |
| Document 06 — Database and Data Management Blueprint | Data ownership, storage, integrity and retention |
| Document 07 — API and Third-Party Integration Blueprint | API and integration security |
| Document 08 — AI and Intelligent Services Blueprint | AI privacy, security and human oversight |

#### 54.1 Identifier Consistency
The following existing identifiers must remain unchanged:
- Platform modules: M01–M18.
- Revenue categories: R01–R14.
- AI services: AI-001–AI-016.
- API groups: API-001–API-020.
- Third-party integrations: INT-001–INT-017.

The security identifiers and acceptance references in this document are governance references, not new platform modules or revenue categories.

#### 54.2 Booking Consistency
The initial booking process remains:
`Traveler Inquiry → Partner Response → Partner Confirmation or Other Outcome`
A booking inquiry is not automatically a confirmed booking.
Live payment functionality remains subject to separate provider approval, implementation, testing and production authorization.

#### 54.3 Technology Consistency
Technology candidates identified in Document 05 remain candidates until formally approved.
This document does not independently select a database, hosting provider, authentication provider, payment provider or AI provider.

#### 54.4 Language Consistency
The platform must support its established 12-language architecture.
The selection of the additional languages remains subject to verified source-market and language-demand research.

#### 54.5 Commercial Consistency
Revenue categories R01–R14 remain unchanged.
Partner verification must remain independent of paid subscriptions and promotional placement.
Sponsored and featured content must remain clearly distinguishable from organic listings.

### 55. DOCUMENT CHANGE MANAGEMENT
Any proposed change affecting security, privacy or legal compliance must be reviewed for its impact on the wider project.
Every material change must record:
- Change reference.
- Description.
- Reason.
- Affected requirements.
- Affected documents.
- Security and privacy impact.
- Legal impact where applicable.
- Approval authority.
- Version history.

Changes must not silently weaken established controls.

### 56. FINAL SECURITY, PRIVACY AND LEGAL COMPLIANCE GOVERNANCE STATEMENT
PHERI NEPAL shall treat security, privacy, data protection, legal responsibility and user trust as essential foundations of the national tourism platform.
Every system, service, integration, user workflow and operational process must be designed and managed with appropriate safeguards.
Personal information must be collected and processed for defined purposes, protected against unauthorized access, retained according to approved requirements and shared only through appropriately governed arrangements.
Financial, booking, partner verification and administrative records must maintain integrity, accountability and traceability.
AI services must operate within approved access boundaries, protect user information and remain subject to appropriate human oversight.
Third-party providers must be assessed before receiving production data or performing critical production functions.
Applicable legal obligations must be verified by qualified legal professionals before relevant services are launched. No unverified legal claim, regulatory approval, government endorsement or security certification may be represented as established fact.
Security and privacy are continuous operational responsibilities. They must be reviewed, tested, documented and improved throughout the entire lifecycle of PHERI NEPAL.

This document establishes the official Security, Privacy and Legal Compliance Blueprint for PHERI NEPAL. It is the ninth document in the twelve-document project series and must remain consistent with Documents 01–08 and all subsequent project documentation.

---

## 57. VERSION 2.0 SECURITY, KYC ENCRYPTION & NEPAL STATUTORY COMPLIANCE SPECIFICATIONS

### 57.1 Partner KYC Document Encryption, Watermarking & Short-Lived Access Control (`ENT-017`)
Because Business Partners (`U03`) upload sensitive legal documents (Nepal Citizenship Certificate, Company Registrar Certificate, PAN/VAT Certificate, Department of Tourism / NTB / TAAN Operating License), the file storage and verification pipeline must enforce:
1. **Private Bucket Isolation & AES-256 Encryption at Rest:**
   - Verification documents (`ENT-017`) must never be stored in public static asset folders or assigned permanent public URLs.
2. **5-Minute Pre-Signed Ephemeral URLs (`<= 300 Seconds TTL`):**
   - When a Verification Officer (`U05`) or Super Administrator (`U09`) opens a partner KYC document in the Admin Verification Console (`M16`), the backend generates a single-use, cryptographically signed URL valid for **300 seconds**, simultaneously writing a `KYC_DOCUMENT_VIEWED` record to `ENT-040` (`AuditLog`).
3. **Dynamic Diagonal Watermarking:**
   - Rendered verification document previews overlay a non-destructive watermark: `"FOR PHERI NEPAL PARTNER VERIFICATION ONLY — REVIEWER: [Officer ID] — [ISO Timestamp]"` to deter unauthorized downloading or redistribution.

### 57.2 Statutory Mapping to Laws of Nepal & International Data Protection
All privacy, retention, and electronic record rules must map directly to applicable Nepali legislation:

| Legal Instrument | Statutory Requirement | PHERI NEPAL Technical & Operational Control |
| :--- | :--- | :--- |
| **Individual Privacy Act, 2075 (2018) — Nepal** | Explicit informed consent before collecting personal/sensitive data; right to correction and deletion. | Granular consent timestamps (`ENT-001`), self-service profile editing (`M11`), and verified data deletion workflow (`<= 15 business days`). |
| **Electronic Transactions Act, 2063 (2006) — Nepal** | Integrity, authenticity, and non-repudiation of electronic records and digital notices. | Immutable append-only audit trail (`ENT-040`), cryptographic request signatures, and timestamped inquiry/confirmation vouchers (`ENT-025`/`ENT-026`). |
| **Tourism Act, 2035 (1978) & Travel/Trekking Agency Regulations** | Only licensed agencies and licensed guides may operate regulated trekking/expedition services. | Mandatory license number & expiry date verification (`ENT-017`) before issuing `Verified` status to Travel/Trekking Agencies and Guides. |
| **Inland Revenue Act & VAT Act, 2052 — Nepal** | Proper retention of financial and tax records for statutory audit period. | Financial ledger records (`ENT-027`–`ENT-033`) retained in read-only archival storage for **7 years** even if a user account is closed. |
| **GDPR / International Visitor Privacy Alignment** | Transparency, data minimization, and export portability for EU/international tourists. | Zero sale of personal data, cookie/analytics consent banner, and JSON personal data export in Traveler Account Settings (`M11`). |

### 57.3 Emergency Contact & Search-and-Rescue (SAR) Legal Liability Boundary (`DC-017`)
All emergency panels (`M01`, `M08`, `DC-017`) must display a permanent, human-reviewed legal boundary notice in all active languages:
> *"PHERI NEPAL provides official emergency telephone numbers (Nepal Police 100, Tourist Police 1144, Ambulance 102, Himalayan Rescue Association) as a public information service. PHERI NEPAL is not an emergency dispatch agency, helicopter rescue operator, or medical provider. In life-threatening situations or Acute Mountain Sickness (AMS), contact emergency authorities and your travel insurance evacuation coordinator immediately."*

---

**END OF DOCUMENT 09 — PN-SPLC-009 (Version 2.0 — Detailed & Audit-Resolved)**
