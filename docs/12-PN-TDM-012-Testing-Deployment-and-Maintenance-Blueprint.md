# PHERI NEPAL
## DOCUMENT 12: TESTING, DEPLOYMENT AND MAINTENANCE BLUEPRINT

- **Document Code:** PN-TDM-012
- **Version:** 2.0 (Complete Unabridged + Audit-Resolved)
- **Document Series:** 12 of 12
- **Parent Document:** PN-MPB-001 — Master Project Blueprint
- **Related Documents:** Documents 01–11
- **Status:** Official Project Blueprint

---

## 1. DOCUMENT FOUNDATION

### 1.1 Purpose
This document establishes the quality assurance, software testing, deployment, production launch, maintenance, monitoring, backup, disaster recovery, and technical support framework for PHERI NEPAL.
It defines how the platform must be tested, approved, released, monitored, maintained, and improved throughout its operational lifecycle.

### 1.2 Objectives
The objectives are to:
- Ensure that implemented features meet approved requirements.
- Identify and resolve defects before production release.
- Protect user data and platform security.
- Verify website performance and reliability.
- Validate multilingual functionality.
- Test AI services and external integrations.
- Ensure booking and commercial workflows operate correctly.
- Establish controlled deployment procedures.
- Maintain service availability and data integrity.
- Provide reliable backup and recovery procedures.
- Support continuous improvement.

### 1.3 Scope
This document covers:
1. Quality assurance governance.
2. Testing strategy.
3. Functional testing.
4. User interface testing.
5. Responsive and browser testing.
6. API testing.
7. Database testing.
8. Authentication and authorization testing.
9. Booking workflow testing.
10. Payment and financial workflow testing.
11. AI service testing.
12. Multilingual testing.
13. Integration testing.
14. Security testing.
15. Privacy testing.
16. Performance and scalability testing.
17. Accessibility testing.
18. SEO and public-page testing.
19. User acceptance testing.
20. Release management.
21. Deployment environments.
22. Production launch.
23. Monitoring and incident management.
24. Backup and disaster recovery.
25. Maintenance and updates.
26. Technical documentation.
27. Quality metrics.
28. Pending technical decisions.

---

## 2. QUALITY ASSURANCE GOVERNANCE

### 2.1 Quality Principles
PHERI NEPAL must follow these quality principles:
- Correctness.
- Reliability.
- Security.
- Privacy.
- Performance.
- Usability.
- Accessibility.
- Maintainability.
- Scalability.
- Compatibility.
- Data integrity.
- Operational transparency.

### 2.2 Quality Ownership
Quality assurance must be a shared responsibility.
The following responsibility areas must be established:

| Responsibility | Main Duty |
| :--- | :--- |
| Project Authority | Approves major releases and acceptance |
| Technical Lead | Oversees technical quality |
| Development Team | Implements and resolves software defects |
| QA Team | Plans and performs testing |
| Security Reviewer | Reviews security-related requirements |
| Content Team | Validates tourism information and content |
| Operations Team | Tests administrative and operational workflows |
| Partner Operations | Validates partner-facing workflows |
| AI Reviewer | Evaluates AI service quality and safety |
| Release Manager | Coordinates deployment and release approval |

Actual staffing and individual assignments remain subject to operational approval under Document 10.

### 2.3 Quality Gates
A feature must pass applicable quality checks before release.
The general quality gates are:
1. Requirements review.
2. Design review.
3. Implementation review.
4. Developer testing.
5. Functional testing.
6. Integration testing.
7. Security and privacy review.
8. Performance review.
9. User acceptance testing.
10. Release approval.

Not every change requires the same testing depth, but security-sensitive, financial, privacy-related, and high-impact changes require appropriate additional review.

### 2.4 Defect Management
All identified defects must be recorded and tracked.
A defect record should contain:
- Defect identifier.
- Description.
- Affected feature.
- Environment.
- Reproduction steps.
- Expected result.
- Actual result.
- Severity.
- Priority.
- Assigned owner.
- Status.
- Resolution details.
- Retest result.

### 2.5 Defect Severity
| Severity | Description |
| :--- | :--- |
| Critical | Major security incident, serious data loss, or platform-wide failure |
| High | Major functionality unavailable or significant business impact |
| Medium | Important functionality impaired with a reasonable workaround |
| Low | Minor visual, usability, or non-critical functional issue |

### 2.6 Defect Priority
Priority determines how quickly a defect should be addressed:
- **P1** — Immediate attention.
- **P2** — High priority.
- **P3** — Normal priority.
- **P4** — Low priority.

Severity and priority must be recorded separately.

### 2.7 Release Blocking Defects
A release must not proceed when unresolved defects create unacceptable:
- Security risk.
- Privacy risk.
- Data corruption risk.
- Financial integrity risk.
- Booking workflow risk.
- Critical operational failure.
- Legal or regulatory risk.

Release approval must be documented.

---

## 3. REQUIREMENTS TRACEABILITY

### 3.1 Purpose
Every implemented feature must be traceable to an approved requirement.

### 3.2 Traceability Structure
The project should maintain a relationship between:
- Requirement.
- Platform module.
- Design specification.
- Technical implementation.
- Database structure.
- API implementation.
- Test case.
- Defect record.
- Release version.
- Acceptance result.

### 3.3 Module Traceability
Testing must cover the official modules established in Document 01:

| Module ID | Module Name |
| :--- | :--- |
| M01 | Tourism Information |
| M02 | Destination Directory |
| M03 | Accommodation Directory |
| M04 | Transportation Directory |
| M05 | Tours and Activities |
| M06 | Business Directory |
| M07 | Booking Management |
| M08 | AI Ecosystem |
| M09 | Multilingual System |
| M10 | Map and Location System |
| M11 | Traveler Account |
| M12 | Partner Account |
| M13 | Review and Reputation |
| M14 | Notification System |
| M15 | Payment and Financial System |
| M16 | Administration System |
| M17 | Analytics and Reporting |
| M18 | Content Management System |

These identifiers must remain consistent across all project documents.

### 3.4 Requirements Changes
When an approved requirement changes, the affected test cases must be reviewed and updated.
A test case must not be considered valid merely because it passed against an outdated requirement.

---

## 4. TESTING STRATEGY

### 4.1 Testing Levels
PHERI NEPAL should use the following testing levels:
- **A. Unit Testing:** Tests individual functions, components, and service logic.
- **B. Integration Testing:** Tests communication between application modules, backend services, APIs, databases, and external providers.
- **C. System Testing:** Tests the complete platform as an integrated system.
- **D. End-to-End Testing:** Tests complete user journeys from the user's initial action to the expected final outcome.
- **E. Regression Testing:** Checks whether new changes have broken previously working functionality.
- **F. Acceptance Testing:** Confirms that the implemented system meets approved user and business requirements.
- **G. Production Verification:** Checks essential functionality after deployment to the production environment.

### 4.2 Testing Environments
Testing must use separate environments:

| Environment | Purpose |
| :--- | :--- |
| Development | Active development and developer testing |
| Staging / Testing | Integration, QA, acceptance, and release preparation |
| Production | Live public platform and approved operational services |

Production must not be used as the primary environment for ordinary development testing.

### 4.3 Test Data
Testing must use controlled test data.
Requirements:
- Avoid unnecessary real personal information.
- Use synthetic or properly anonymized data where possible.
- Separate test and production records.
- Prevent test transactions from being treated as real commercial transactions.
- Remove or retain test data according to approved policies.
- Protect credentials and sensitive test records.

### 4.4 Test Documentation
Testing documentation should include:
- Test strategy.
- Test plan.
- Test cases.
- Test data records.
- Test execution reports.
- Defect reports.
- Regression reports.
- Security findings.
- Performance results.
- Acceptance reports.
- Release approval records.

---

## 5. FUNCTIONAL TESTING

### 5.1 General Requirements
Every implemented function must be tested against its approved functional requirements.
Testing must cover:
- Valid inputs.
- Invalid inputs.
- Missing inputs.
- Boundary conditions.
- Unauthorized actions.
- Error handling.
- Data persistence.
- Expected user feedback.
- Relevant status changes.

### 5.2 Tourism Information — M01
Test:
- Public information display.
- Search and discovery.
- Content accuracy.
- Page navigation.
- Category filtering.
- Content publication status.
- Access permissions.
- Missing or unavailable content handling.

### 5.3 Destination Directory — M02
Test:
- Destination creation and editing.
- Destination page display.
- Province and district relationships.
- Search and filtering.
- Image display.
- Related destination links.
- Location information.
- Publication controls.

### 5.4 Accommodation Directory — M03
Test:
- Accommodation listing.
- Partner ownership.
- Business information.
- Service details.
- Contact information.
- Listing status.
- Search and filtering.
- Inquiry availability where implemented.

### 5.5 Transportation Directory — M04
Test:
- Transportation listings.
- Service information.
- Routes where provided.
- Partner information.
- Inquiry handling.
- Contact information.
- Search and filtering.

### 5.6 Tours and Activities — M05
Test:
- Tour listing creation.
- Activity details.
- Package information.
- Partner ownership.
- Relevant terms and conditions.
- Inquiry submission.
- Listing visibility.
- Content accuracy.

### 5.7 Business Directory — M06
Test:
- Business registration.
- Listing submission.
- Verification status display.
- Business profile editing.
- Duplicate listing controls.
- Publication approval.
- Business search.
- Access restrictions.

### 5.8 Booking Management — M07
Test:
- Inquiry creation.
- Inquiry validation.
- Inquiry submission.
- Partner notification.
- Partner response.
- Arrangement confirmation.
- Status changes.
- Cancellation records.
- Support escalation.
- User access to inquiry history.

The initial booking model remains inquiry-based.
An inquiry must not automatically become a confirmed booking.

### 5.9 AI Ecosystem — M08
Test:
- AI request processing.
- Response quality.
- Context handling.
- Source verification.
- Uncertainty communication.
- Language handling.
- Safety-related responses.
- Failure handling.
- Human escalation where required.
- Usage controls.
- Provider failure fallback.

AI-generated recommendations must not create automatic bookings or commercial transactions.

### 5.10 Multilingual System — M09
Test:
- Language switching.
- Translation display.
- Navigation labels.
- Content language.
- Form labels.
- Error messages.
- Date and number formatting.
- Search behavior.
- Language fallback.
- Missing translation handling.

Only languages approved and implemented for release may be advertised as operational.

### 5.11 Map and Location System — M10
Test:
- Map loading.
- Location display.
- Marker accuracy.
- Search integration.
- Location permissions.
- Missing location handling.
- Provider failure.
- Map responsiveness.
- Privacy implications of location access.

### 5.12 Traveler Account — M11
Test:
- Registration.
- Login.
- Logout.
- Profile editing.
- Password recovery where implemented.
- Account settings.
- Access permissions.
- Account closure requests.
- Session management.

### 5.13 Partner Account — M12
Test:
- Partner registration.
- Business association.
- Profile management.
- Listing management.
- Inquiry management.
- Dashboard access.
- Verification status.
- Permission boundaries.
- Account suspension.

### 5.14 Review and Reputation — M13
Test:
- Review submission.
- Eligibility rules.
- Review display.
- Moderation.
- Reporting.
- Removal and appeal processes.
- Rating calculation.
- Duplicate and fraudulent review controls.

### 5.15 Notification System — M14
Test:
- Notification creation.
- Delivery.
- Correct recipient.
- Notification status.
- Duplicate prevention.
- Failure handling.
- User preferences.
- Consent requirements.

### 5.16 Payment and Financial System — M15
Test the architecture and approved workflows, including:
- Payment record structure.
- Transaction status.
- Refund records.
- Commission calculation logic.
- Financial audit records.
- Reconciliation.
- Permission controls.
- Error handling.
- Duplicate transaction prevention.

Live payment processing must not be treated as operational until a provider is selected, integration is completed, testing is passed, and production approval is granted.

### 5.17 Administration System — M16
Test:
- Admin login.
- Role permissions.
- User management.
- Partner management.
- Verification workflows.
- Content approval.
- Complaint management.
- Commercial administration.
- Audit logging.
- Administrative restrictions.

### 5.18 Analytics and Reporting — M17
Test:
- Event collection.
- Metric calculations.
- Reporting accuracy.
- Access control.
- Data filtering.
- Date ranges.
- Export permissions where implemented.
- Data consistency.

### 5.19 Content Management System — M18
Test:
- Content creation.
- Draft editing.
- Review.
- Approval.
- Publication.
- Updates.
- Archiving.
- Media management.
- Version history.
- Permission controls.

---

## 6. USER INTERFACE AND USER EXPERIENCE TESTING

### 6.1 Design Compliance
The interface must be tested against Document 04.

### 6.2 Visual Testing
Verify:
- Brand colors.
- Typography.
- Spacing.
- Layout consistency.
- Buttons.
- Forms.
- Navigation.
- Cards.
- Tables.
- Modals.
- Loading states.
- Empty states.
- Error states.
- Success messages.

### 6.3 Responsive Testing
The website must be tested on:
- Mobile phones.
- Tablets.
- Laptops.
- Desktop screens.
- Large desktop displays.

Responsive testing must cover different screen sizes and orientations.

### 6.4 Browser Compatibility
The website must be tested on supported versions of major browsers.
The exact browser support matrix must be approved during implementation.

### 6.5 Usability Testing
Usability testing should evaluate whether users can:
- Understand the platform.
- Discover destinations.
- Find relevant services.
- Understand partner information.
- Submit inquiries.
- Navigate account interfaces.
- Use language controls.
- Access AI assistance where implemented.
- Understand commercial disclosures.

### 6.6 Accessibility Testing
The design target established in Document 04 is WCAG 2.2 AA.
Testing should cover:
- Keyboard navigation.
- Focus visibility.
- Screen reader compatibility.
- Semantic structure.
- Form labels.
- Alternative text.
- Color contrast.
- Error identification.
- Accessible interaction patterns.

Accessibility issues must be recorded and prioritized according to impact.

---

## 7. API AND INTEGRATION TESTING

### 7.1 API Testing
API testing must follow Document 07.
Test:
- Request validation.
- Response structure.
- Authentication.
- Authorization.
- Error codes.
- Rate limits.
- Input sanitization.
- Pagination.
- Filtering.
- Version compatibility.
- Data consistency.

### 7.2 API Identifier Governance
The official API identifiers are `API-001`–`API-020`.
These identifiers must not be renamed or reused for unrelated API functions.

### 7.3 Third-Party Integration Testing
The integration register `INT-001`–`INT-017` must remain consistent with Document 07.
Testing should cover:
- Authentication.
- Connectivity.
- Provider responses.
- Timeout handling.
- Rate limits.
- Data mapping.
- Error handling.
- Retry behavior.
- Duplicate event prevention.
- Provider service failure.
- Credential security.

### 7.4 Webhook Testing
Where webhooks are implemented, test:
- Signature verification.
- Event authenticity.
- Duplicate event handling.
- Replay protection.
- Idempotency.
- Retry behavior.
- Event ordering.
- Logging.
- Failure escalation.

### 7.5 Integration Activation
An integration must not be considered operational until:
1. Provider selection is approved.
2. Required agreements are reviewed.
3. Credentials are securely configured.
4. Integration is implemented.
5. Security and privacy reviews are completed.
6. Testing is passed.
7. Operational monitoring is established.
8. Production activation is approved.

---

## 8. DATABASE AND DATA INTEGRITY TESTING

### 8.1 Data Testing Objective
Ensure that data remains accurate, consistent, secure, and traceable.

### 8.2 Data Integrity Testing
Test:
- Record creation.
- Record updates.
- Record relationships.
- Required fields.
- Validation rules.
- Duplicate prevention.
- Referential integrity where applicable.
- Data access restrictions.
- Data deletion workflows.
- Audit history.

### 8.3 Booking Data Integrity
The following concepts must remain separate:
- Booking inquiry status.
- Booking arrangement status.
- Payment status.
- Refund status.
- Commission eligibility.

A change to one status must not silently or incorrectly modify another.

### 8.4 Financial Data Integrity
Financial records must:
- Be traceable.
- Have appropriate authorization.
- Preserve transaction history.
- Prevent unauthorized modification.
- Support reconciliation.
- Record corrections transparently.
- Prevent duplicate transaction processing.

### 8.5 Data Migration Testing
Any database migration must be tested before production.
Migration testing must verify:
- Data completeness.
- Data accuracy.
- Record relationships.
- Identifier preservation.
- Error handling.
- Rollback or recovery procedure.
- Application compatibility.

### 8.6 Database Technology Dependency
The final database selection remains subject to the pending technical decisions in Document 05.
Testing procedures must adapt to the approved database technology without assuming an unapproved database choice.

---

## 9. AUTHENTICATION AND AUTHORIZATION TESTING

### 9.1 Identity Testing
Test:
- Registration.
- Login.
- Logout.
- Password recovery.
- Session expiration.
- Session renewal.
- Account suspension.
- Account recovery.
- Multi-factor authentication where implemented.

### 9.2 Role-Based Access Testing
Verify that each role can access only authorized functions.
Roles and permissions must follow the governance established in Documents 03, 05, 09, and 10.

### 9.3 Privilege Escalation Testing
Test whether unauthorized users can:
- Access administrative functions.
- Modify partner information.
- View private inquiries.
- Access financial records.
- Change verification status.
- Modify another user's profile.
- Access restricted API endpoints.

### 9.4 Session Security
Test:
- Session invalidation.
- Secure cookie settings where applicable.
- Session expiration.
- Logout behavior.
- Token handling.
- Concurrent session policy where implemented.

---

## 10. SECURITY AND PRIVACY TESTING

### 10.1 Security Governance
Security testing must follow Document 09.

### 10.2 Application Security
Test for relevant vulnerabilities, including:
- Injection attacks.
- Cross-site scripting.
- Cross-site request forgery where applicable.
- Broken access control.
- Authentication weaknesses.
- Insecure file uploads.
- Sensitive information exposure.
- Security misconfiguration.
- Insecure dependencies.
- Server-side request forgery where applicable.

### 10.3 API Security
Test:
- Unauthorized access.
- Object-level authorization.
- Rate-limit bypass.
- Invalid token handling.
- Excessive data exposure.
- Input manipulation.
- Abuse of privileged endpoints.

### 10.4 Infrastructure Security
Review:
- Hosting configuration.
- Network exposure.
- Secrets management.
- Environment separation.
- Storage permissions.
- Logging access.
- Backup access.
- Administrative access.

### 10.5 Privacy Testing
Test whether:
- Users receive appropriate privacy information.
- Consent choices are recorded where required.
- Private data is not exposed publicly.
- Data access is restricted.
- Data deletion requests are handled appropriately.
- Retention rules are followed.
- Tracking behavior matches approved settings.

### 10.6 Vulnerability Management
Security findings must be recorded, assessed, prioritized, and resolved through an approved process.
High-risk vulnerabilities must block production release until appropriately resolved or formally handled through an approved risk process.

### 10.7 Independent Security Review
Independent security assessment or penetration testing should be considered before major production launch and after significant security-related changes.
The scope and timing remain subject to formal approval.
No security certification or compliance status may be claimed without the relevant assessment and evidence.

---

## 11. AI TESTING AND QUALITY VALIDATION

### 11.1 AI Testing Objective
Ensure that AI services provide useful, reliable, safe, and appropriately verified tourism assistance.

### 11.2 AI Service Coverage
Testing must cover the official AI service identifiers `AI-001`–`AI-016`.
These identifiers must remain consistent with Document 08.

### 11.3 Response Accuracy
Test AI responses against approved reference information.
Evaluate:
- Factual correctness.
- Relevance.
- Completeness.
- Clarity.
- Language quality.
- Appropriate uncertainty.
- Source consistency.

### 11.4 Hallucination Testing
Test whether AI incorrectly invents:
- Accommodation availability.
- Booking confirmations.
- Transportation schedules.
- Prices.
- Travel times.
- Permit requirements.
- Visa requirements.
- Safety information.
- Weather conditions.
- Business details.
- Government announcements.

AI must communicate uncertainty when reliable information is unavailable.

### 11.5 Safety Testing
Test responses involving:
- Emergency situations.
- Trekking and adventure safety.
- Weather-related hazards.
- Restricted areas.
- Health and safety information.
- Legal and permit information.
- High-risk travel decisions.

High-risk information must follow appropriate authoritative-source verification and human oversight requirements.

### 11.6 Multilingual AI Testing
Test AI behavior across each language approved for operational use.
Evaluate:
- Translation quality.
- Meaning preservation.
- Tourism terminology.
- Safety-related language.
- Cultural sensitivity.
- Language consistency.
- Unsupported translation handling.

### 11.7 AI Privacy Testing
Verify:
- Data minimization.
- Appropriate context handling.
- Provider data-sharing restrictions.
- Sensitive information handling.
- Credential protection.
- Retention settings.
- User-facing transparency.

### 11.8 AI Failure Testing
Test:
- Provider outage.
- Request timeout.
- Invalid response.
- Incomplete response.
- Rate-limit response.
- Unexpected output.
- Knowledge retrieval failure.
- Fallback response.
- Human escalation.

### 11.9 AI Release Approval
An AI service must not be released solely because its technical connection works.
It must also pass applicable accuracy, safety, privacy, language, and operational quality checks.

---

## 12. PERFORMANCE AND SCALABILITY TESTING

### 12.1 Performance Objective
Ensure that the website and its services provide acceptable performance under expected operating conditions.

### 12.2 Performance Testing
Testing should include:
- Page load performance.
- API response performance.
- Database query performance.
- Image loading.
- Search performance.
- AI request latency.
- Map loading.
- Notification processing.
- Dashboard performance.

### 12.3 Load Testing
Load testing should evaluate the platform under defined expected usage conditions.
Test scenarios may include:
- Normal website traffic.
- Increased destination page visits.
- Search activity.
- Concurrent traveler sessions.
- Partner dashboard usage.
- Inquiry submission.
- Administrative activity.
- AI request volume.

### 12.4 Stress Testing
Stress testing should identify behavior under unusually high load.
It should examine:
- System degradation.
- Resource limits.
- Request failures.
- Queue behavior.
- Recovery after overload.
- Data integrity during stress.

### 12.5 Scalability Testing
The platform should be evaluated for future growth in:
- Users.
- Destinations.
- Businesses.
- Tourism content.
- Inquiries.
- Languages.
- AI requests.
- API traffic.
- Media storage.

### 12.6 Performance Targets
Specific numerical performance targets must be established through technical evaluation and formal approval.
No unsupported response-time, traffic, or capacity guarantee is established by this document (see Section 37 Version 2.0 SLA and DR Specifications).

---

## 13. MULTILINGUAL AND CONTENT QUALITY TESTING

### 13.1 Multilingual Testing
The platform must be tested for language consistency across:
- Navigation.
- Pages.
- Forms.
- Buttons.
- Error messages.
- Notifications.
- Account interfaces.
- Partner interfaces.
- Administrative interfaces.
- AI interactions.

### 13.2 Translation Quality
Translation testing should evaluate:
- Accuracy.
- Readability.
- Cultural suitability.
- Tourism terminology.
- Context preservation.
- Formatting.
- Text expansion.
- Font support.

### 13.3 Content Accuracy
Public tourism information must be checked for:
- Correct location.
- Correct province and district.
- Current service details.
- Correct contact information.
- Appropriate source references.
- Accurate safety information.
- Valid images and usage rights.

### 13.4 Content Publication Testing
Test the complete content lifecycle:
`Draft -> Review -> Approval -> Publication -> Update -> Archive.`
Unauthorized publication must be prevented.

---

## 14. SEO AND PUBLIC WEBSITE TESTING

### 14.1 SEO Validation
Testing must follow Document 11.

### 14.2 Technical SEO Testing
Verify:
- XML sitemap.
- Robots.txt.
- Canonical URLs.
- Page titles.
- Meta descriptions.
- Heading structure.
- Internal links.
- Image alternative text.
- Structured data.
- Redirect behavior.
- Broken links.
- Indexing restrictions.

### 14.3 Public and Private Page Separation
Ensure that:
- Public tourism content is accessible as intended.
- Private user pages are protected.
- Partner dashboards are not publicly indexed.
- Administrative pages are protected.
- Private inquiries are not exposed.
- Sensitive records are not available through search engines.

### 14.4 Social Sharing Testing
Where supported, test:
- Page title previews.
- Description previews.
- Image previews.
- Canonical destination URLs.
- Language-specific sharing links.

---

## 15. ACCESSIBILITY AND COMPATIBILITY ACCEPTANCE

### 15.1 Accessibility
The platform must be evaluated against the WCAG 2.2 AA target established in Document 04.

### 15.2 Manual and Automated Testing
Accessibility evaluation should combine:
- Automated testing.
- Keyboard testing.
- Screen reader testing.
- Visual inspection.
- Form interaction testing.
- Human usability evaluation.

Automated tools alone are not sufficient to establish full accessibility.

### 15.3 Compatibility
Compatibility testing must cover the officially supported:
- Browsers.
- Operating systems.
- Screen sizes.
- Input methods.
- Assistive technologies where applicable.

The support matrix must be documented before production launch.

---

## 16. USER ACCEPTANCE TESTING

### 16.1 Purpose
User acceptance testing confirms that the implemented platform meets approved business and user requirements.

### 16.2 Participant Groups
Testing may include authorized representatives of:
- Domestic travelers.
- International travelers.
- Tourism partners.
- Administrative users.
- Content managers.
- Customer support personnel.
- Operational staff.

### 16.3 Acceptance Scenarios
Test complete user journeys, including:
1. Discovering a destination.
2. Searching for accommodation.
3. Exploring transportation services.
4. Finding tours and activities.
5. Viewing partner information.
6. Creating a traveler account.
7. Submitting a booking inquiry.
8. Receiving a partner response.
9. Managing a partner listing.
10. Completing an administrative content review.
11. Using approved multilingual features.
12. Using AI travel assistance.
13. Submitting a review under applicable rules.
14. Accessing support.
15. Managing privacy and account preferences.

### 16.4 Acceptance Records
Each acceptance test must record:
- Test scenario.
- Participant role.
- Expected outcome.
- Actual outcome.
- Result.
- Defects.
- Required corrections.
- Approval status.

### 16.5 Acceptance Authority
Final acceptance must be provided by authorized project representatives.
A feature must not be declared accepted solely because the development team considers it complete.

---

## 17. RELEASE MANAGEMENT

### 17.1 Release Governance
Every production release must follow a controlled approval process.

### 17.2 Release Types
Release categories may include:
- Major release.
- Minor release.
- Patch release.
- Security release.
- Emergency release.

### 17.3 Release Preparation
Before release, the responsible team must:
1. Confirm approved scope.
2. Review completed requirements.
3. Review test results.
4. Check unresolved defects.
5. Review security findings.
6. Confirm database migration readiness.
7. Verify configuration.
8. Confirm backup readiness.
9. Prepare deployment instructions.
10. Prepare rollback or recovery procedures.
11. Obtain release approval.

### 17.4 Version Control
Software releases must have traceable version identifiers.
The project should maintain:
- Version number.
- Release date.
- Change summary.
- Related requirements.
- Test results.
- Known issues.
- Deployment record.
- Approval record.

### 17.5 Change Management
Changes affecting production must be documented.
Emergency changes must be recorded and reviewed after implementation.

### 17.6 Release Blocking Conditions
Production release must be blocked where unresolved issues create unacceptable risk to:
- Security.
- Privacy.
- Data integrity.
- Financial records.
- Booking operations.
- Core user access.
- Critical platform functionality.

---

## 18. DEPLOYMENT ARCHITECTURE AND PROCEDURES

### 18.1 Deployment Objective
Establish a controlled and repeatable process for releasing approved software to production.

### 18.2 Deployment Environments
The project must maintain separate:
- Development.
- Staging / Testing.
- Production.

Environment configuration must be documented.

### 18.3 Deployment Pipeline
A controlled deployment pipeline should include:
1. Source code commit.
2. Code review.
3. Automated checks.
4. Build.
5. Unit tests.
6. Integration tests.
7. Security checks.
8. Staging deployment.
9. Acceptance testing.
10. Production approval.
11. Production deployment.
12. Post-deployment verification.

### 18.4 Source Control
Source code must be maintained in an approved version-control system.
The repository must support:
- Controlled access.
- Branch protection where appropriate.
- Code review.
- Commit history.
- Release tagging.
- Change tracking.
- Recovery procedures.

GitHub remains a candidate platform from Document 05 until formally selected.

### 18.5 Configuration Management
Production configuration must be managed securely.
Requirements:
- No hardcoded production secrets.
- Environment-specific configuration.
- Secure credential storage.
- Restricted access.
- Documented configuration changes.
- Appropriate rotation of sensitive credentials.

### 18.6 Database Deployment
Database changes must be reviewed and tested before production deployment.
A database migration must include an appropriate backup or recovery strategy.

### 18.7 Media and Asset Deployment
Production media and static assets must be checked for:
- Correct files.
- Valid paths.
- Access permissions.
- Performance.
- Image optimization.
- Copyright and usage rights.

### 18.8 Deployment Approval
Only authorized personnel may approve production deployment.
The exact approval structure remains subject to operational governance under Document 10.

---

## 19. PRODUCTION LAUNCH READINESS

### 19.1 Launch Objective
Ensure that PHERI NEPAL is operationally, technically, and commercially ready for its approved public launch scope.

### 19.2 Launch Readiness Checklist
#### Platform Readiness
- Core website pages work.
- Navigation is functional.
- Search works within approved scope.
- Mobile layouts are tested.
- Forms work.
- User accounts work where implemented.
- Partner workflows work where implemented.
- Administrative workflows work.
- Error handling is functional.

#### Content Readiness
- Official brand identity is applied.
- Public content is reviewed.
- Destination information is verified.
- Images have appropriate usage rights.
- Language coverage is accurately represented.
- Public contact information is correct.
- Legal and privacy information has been reviewed.

#### Security Readiness
- Authentication is tested.
- Access permissions are reviewed.
- Sensitive data is protected.
- Production secrets are secured.
- Security findings are reviewed.
- Backup access is controlled.

#### Operational Readiness
- Support responsibilities are assigned.
- Partner support procedures are ready.
- Complaint handling is documented.
- Incident escalation is defined.
- Administrative access is controlled.
- Content management responsibilities are assigned.

#### Marketing Readiness
- Public website messaging is accurate.
- SEO fundamentals are reviewed.
- Official communication channels are controlled.
- Marketing materials match actual platform capabilities.
- Sponsored content disclosures are ready where applicable.

#### Integration Readiness
- Required integrations are tested.
- Provider credentials are secured.
- External service failures have handling procedures.
- Unavailable integrations are not advertised as active.

### 19.3 Launch Scope Approval
The initial launch must include only features that have passed applicable testing and acceptance.
Planned, incomplete, or unverified features must remain unavailable or clearly identified as not yet operational.

### 19.4 Launch Authorization
Production launch requires formal approval from the authorized project authority.

---

## 20. POST-DEPLOYMENT VERIFICATION

### 20.1 Purpose
Confirm that the production system operates correctly after deployment.

### 20.2 Verification Areas
Verify:
- Website availability.
- Homepage loading.
- Navigation.
- Public destination pages.
- Search.
- User authentication.
- Partner access.
- Inquiry submission.
- Notifications.
- API availability.
- Database connectivity.
- Media loading.
- AI service access where enabled.
- Logging.
- Monitoring.
- Security controls.

### 20.3 Production Smoke Testing
A predefined set of critical tests must be performed after deployment.
These tests must use controlled procedures that do not create unintended commercial transactions or expose personal data.

### 20.4 Deployment Failure
If deployment causes a serious failure, the release manager must initiate the approved rollback or recovery procedure.
The incident must be recorded and reviewed.

---

## 21. MONITORING AND OBSERVABILITY

### 21.1 Monitoring Objective
Maintain visibility into system health, performance, errors, security events, and operational status.

### 21.2 Monitoring Areas
Monitoring should cover:
- Website availability.
- API health.
- Backend services.
- Database health.
- Storage.
- Application errors.
- Server resource usage.
- Integration failures.
- AI provider failures.
- Notification delivery.
- Security events.
- Backup status.

### 21.3 Logging
Logs must be:
- Structured where practical.
- Time-stamped.
- Access-controlled.
- Protected from unauthorized alteration.
- Retained according to approved policy.
- Reviewed when necessary.

Passwords, access tokens, payment credentials, and unnecessary sensitive personal information must not be written into logs.

### 21.4 Alerting
Alerts should be configured for relevant conditions, such as:
- Service outage.
- Critical errors.
- Unusual traffic.
- Failed deployments.
- Database failures.
- Backup failures.
- Security incidents.
- External provider outages.

### 21.5 Monitoring Ownership
Each monitored service must have an assigned operational owner or escalation path.

### 21.6 Monitoring Review
Monitoring configuration must be reviewed periodically and after major platform changes.

---

## 22. INCIDENT MANAGEMENT

### 22.1 Incident Objective
Ensure that service interruptions, security events, data issues, and operational failures are handled in a controlled manner.

### 22.2 Incident Categories
Incidents may include:
- Website outage.
- Application failure.
- Database failure.
- Data loss.
- Security breach.
- Privacy incident.
- Payment integration failure.
- Booking workflow failure.
- AI service failure.
- External provider outage.
- Unauthorized access.
- Content integrity issue.

### 22.3 Incident Response Lifecycle
The incident process should follow:
1. Detection.
2. Reporting.
3. Classification.
4. Escalation.
5. Containment.
6. Investigation.
7. Resolution.
8. Recovery.
9. Verification.
10. Documentation.
11. Post-incident review.

### 22.4 Incident Records
Each incident record should include:
- Incident identifier.
- Date and time.
- Detection method.
- Affected service.
- Severity.
- Impact.
- Responsible owner.
- Actions taken.
- Resolution.
- Recovery result.
- Root cause where established.
- Preventive actions.

### 22.5 Security and Privacy Incidents
Security and privacy incidents must follow Document 09.
Applicable notification and reporting obligations must be assessed under the relevant legal and regulatory framework.

### 22.6 Post-Incident Review
Major incidents should receive a documented review.
The review should identify:
- Root cause.
- Contributing factors.
- Response effectiveness.
- Data impact.
- Required corrective actions.
- Preventive improvements.

---

## 23. BACKUP AND DATA RECOVERY

### 23.1 Backup Objective
Protect PHERI NEPAL data and enable recovery following accidental deletion, system failure, corruption, or other disruptive events.

### 23.2 Backup Scope
The backup strategy should cover relevant:
- Database records.
- Application configuration.
- Source code.
- Media assets.
- Operational records.
- Approved documentation.
- Relevant system configuration.

### 23.3 Backup Governance
Backups must be:
- Scheduled according to approved requirements.
- Protected from unauthorized access.
- Encrypted where appropriate.
- Stored with appropriate separation.
- Monitored for completion.
- Retained according to approved policy.
- Tested through recovery exercises.

### 23.4 Backup Frequency
Backup frequency must be determined through a formal risk assessment based on:
- Data criticality.
- Update frequency.
- Recovery requirements.
- Storage capability.
- Cost.
- Operational capacity.
- Applicable legal obligations.

No fixed backup frequency is established by this document (see Section 37 Version 2.0 RPO/RTO Matrix for baseline domain tiers).

### 23.5 Backup Testing
A successful backup operation does not prove that data can be restored.
The project must perform documented restoration tests.

### 23.6 Recovery Point Objective
The Recovery Point Objective (RPO) defines the maximum acceptable amount of data loss measured in time.
The RPO must be approved according to the criticality of each data category.

### 23.7 Recovery Time Objective
The Recovery Time Objective (RTO) defines the target time for restoring a service after disruption.
The RTO must be formally established for critical services.

### 23.8 Recovery Validation
After restoration, verify:
- Data completeness.
- Data consistency.
- Account access.
- Booking records.
- Financial records.
- Partner records.
- Content availability.
- System functionality.
- Security configuration.

---

## 24. DISASTER RECOVERY AND BUSINESS CONTINUITY

### 24.1 Objective
Maintain or restore essential PHERI NEPAL services during major technical or operational disruption.

### 24.2 Disaster Scenarios
The disaster recovery plan should consider:
- Hosting provider failure.
- Database corruption.
- Major infrastructure outage.
- Cyberattack.
- Credential compromise.
- Data center disruption.
- Accidental deletion.
- Critical external provider failure.
- Loss of access to administrative systems.

### 24.3 Recovery Priorities
Recovery priorities should be defined according to business impact.
Critical functions may include:
- Public website access.
- Authentication.
- Core tourism information.
- Booking inquiry records.
- Partner access.
- Administrative access.
- Critical database services.
- Security monitoring.

### 24.4 Continuity Procedures
Continuity procedures should identify:
- Responsible decision-makers.
- Emergency contacts.
- Alternative communication methods.
- Backup access.
- Recovery resources.
- Service restoration priorities.
- User communication procedures.

### 24.5 Disaster Recovery Testing
Recovery procedures must be tested periodically.
Test results and identified weaknesses must be documented.

### 24.6 Provider Dependency
The project must assess the operational risks of depending on individual cloud, database, AI, map, payment, and notification providers.
Provider failure must not result in uncontrolled data exposure or unauthorized transactions.

---

## 25. MAINTENANCE AND UPDATE MANAGEMENT

### 25.1 Maintenance Objective
Keep PHERI NEPAL secure, reliable, current, and compatible throughout its lifecycle.

### 25.2 Maintenance Categories
- **A. Corrective Maintenance:** Fix defects and failures.
- **B. Preventive Maintenance:** Reduce the likelihood of future failures.
- **C. Adaptive Maintenance:** Update the platform to remain compatible with changing technologies, standards, and external services.
- **D. Perfective Maintenance:** Improve usability, performance, functionality, and operational efficiency.

### 25.3 Application Maintenance
Maintenance may include:
- Bug fixes.
- Feature improvements.
- Performance optimization.
- UI/UX improvements.
- Dependency updates.
- Security patches.
- API changes.
- Database optimization.
- Content corrections.

### 25.4 Dependency Management
Software dependencies must be reviewed and updated under controlled procedures.
Updates must be tested before production release.

### 25.5 Security Updates
Critical security updates must receive appropriate priority.
Security updates must be evaluated for compatibility and deployed through an approved release process.

### 25.6 External Service Maintenance
Third-party service changes must be monitored.
Provider API changes, discontinued services, credential expiration, and service limitations must be addressed.

### 25.7 Maintenance Records
Maintenance activities must be documented with:
- Change description.
- Reason.
- Affected components.
- Test results.
- Approval.
- Deployment date.
- Outcome.

---

## 26. CONTENT AND INFORMATION MAINTENANCE

### 26.1 Content Maintenance Objective
Ensure public tourism information remains useful and accurate.

### 26.2 Content Review
Content review should cover:
- Destination details.
- Business information.
- Accommodation information.
- Transportation information.
- Tour and activity details.
- Contact information.
- Travel guidance.
- Safety information.
- Permit and entry information.
- Seasonal information.

### 26.3 Update Priorities
Time-sensitive and high-impact information should receive appropriate review priority.

### 26.4 Partner Information Maintenance
Partner information must follow Document 10.
Partners must be able to update permitted information through approved workflows.
Changes requiring verification or administrative approval must not become public automatically.

### 26.5 Content Correction
Incorrect or outdated content must be corrected, unpublished, or archived as appropriate.
Significant corrections should be traceable.

---

## 27. AI AND THIRD-PARTY SERVICE MAINTENANCE

### 27.1 AI Service Maintenance
AI services must be monitored for:
- Provider changes.
- Model changes.
- Response quality.
- Hallucination patterns.
- Safety failures.
- Language quality.
- Cost and usage behavior.
- Knowledge-base freshness.
- API compatibility.

### 27.2 AI Model Changes
A model or provider change must be evaluated before production use.
Evaluation should cover:
- Accuracy.
- Safety.
- Privacy.
- Language support.
- Performance.
- Cost.
- Compatibility.
- Data handling.

### 27.3 AI Knowledge Maintenance
Knowledge sources must be reviewed and updated.
Outdated, incorrect, or unsupported information must be corrected or removed.

### 27.4 Third-Party Service Maintenance
External providers must be reviewed for:
- Availability.
- Service quality.
- Security changes.
- API changes.
- Pricing changes.
- Contract changes.
- Data processing changes.
- Service discontinuation.

### 27.5 Service Deactivation
If an external service becomes unsafe, unavailable, or unsuitable, its integration may be suspended through approved procedures.
Affected users must receive appropriate information where necessary.

---

## 28. TECHNICAL SUPPORT AND SERVICE MANAGEMENT

### 28.1 Support Objective
Provide an organized method for identifying, reporting, and resolving technical issues.

### 28.2 Support Categories
Support may include:
- Traveler technical support.
- Partner technical support.
- Administrative support.
- Content management support.
- Integration support.
- AI service support.
- Infrastructure support.

### 28.3 Support Ticket Information
A support ticket should contain:
- Ticket identifier.
- Requester.
- Affected service.
- Issue description.
- Date and time.
- Priority.
- Assigned team.
- Status.
- Resolution.
- Closure confirmation.

### 28.4 Support Lifecycle
Support should follow:
1. Request received.
2. Ticket created.
3. Issue classified.
4. Responsible team assigned.
5. Investigation.
6. Resolution.
7. User communication.
8. Closure.
9. Review where necessary.

### 28.5 Escalation
Issues must be escalated when they exceed the authority or capability of the assigned support role.
Security, privacy, financial, and critical service incidents must follow their specific escalation procedures.

### 28.6 Service-Level Targets
Response and resolution targets must be established through formal operational approval.
No unsupported support-time guarantee is established by this document.

---

## 29. TECHNICAL PERFORMANCE AND QUALITY METRICS

### 29.1 Purpose
Measure the technical reliability, quality, and maintainability of PHERI NEPAL.

### 29.2 Technical KPI Register
| KPI ID | Metric |
| :--- | :--- |
| TDM-001 | Production Service Availability |
| TDM-002 | Website Page Performance |
| TDM-003 | API Response Performance |
| TDM-004 | Application Error Rate |
| TDM-005 | Critical Defect Count |
| TDM-006 | High-Severity Defect Count |
| TDM-007 | Test Execution Pass Rate |
| TDM-008 | Regression Test Pass Rate |
| TDM-009 | Release Success Rate |
| TDM-010 | Deployment Failure Rate |
| TDM-011 | Mean Time to Detect Incidents |
| TDM-012 | Mean Time to Restore Services |
| TDM-013 | Backup Completion Rate |
| TDM-014 | Backup Restoration Test Result |
| TDM-015 | Security Finding Resolution |
| TDM-016 | Vulnerable Dependency Count |
| TDM-017 | Data Integrity Issue Count |
| TDM-018 | Integration Failure Rate |
| TDM-019 | AI Service Failure Rate |
| TDM-020 | AI Quality Test Result |
| TDM-021 | Accessibility Defect Count |
| TDM-022 | Content Accuracy Issue Count |
| TDM-023 | Support Ticket Resolution |
| TDM-024 | Recovery Exercise Result |
| TDM-025 | Maintenance Change Success Rate |

### 29.3 KPI Governance
Each metric must have:
- A defined calculation method.
- An approved data source.
- A reporting frequency.
- An accountable owner.
- Appropriate interpretation rules.

Numerical targets must be established through technical evaluation and formal approval.

### 29.4 Reporting
Technical quality reports should support:
- Release decisions.
- Operational reviews.
- Security reviews.
- Maintenance planning.
- Performance improvement.
- Management oversight.

---

## 30. TECHNICAL DOCUMENTATION AND KNOWLEDGE MANAGEMENT

### 30.1 Documentation Objective
Maintain sufficient technical documentation for development, deployment, operation, recovery, and future maintenance.

### 30.2 Required Documentation
The project should maintain:
- System architecture documentation.
- Source code documentation.
- API documentation.
- Database documentation.
- Environment configuration documentation.
- Deployment procedures.
- Release notes.
- Test documentation.
- Security procedures.
- Backup and recovery documentation.
- Integration documentation.
- Incident records.
- Maintenance records.
- Operational support procedures.

### 30.3 Documentation Quality
Documentation must be:
- Accurate.
- Updated.
- Version-controlled.
- Access-controlled.
- Consistent with implementation.
- Understandable to authorized personnel.

### 30.4 Knowledge Transfer
Critical technical knowledge must not depend on a single individual.
Appropriate documentation and knowledge-transfer procedures must support continuity.

---

## 31. TECHNICAL CHANGE AND VERSION GOVERNANCE

### 31.1 Change Control
Technical changes must be reviewed according to their risk and impact.

### 31.2 Change Assessment
Before implementation, assess:
- Functional impact.
- Technical impact.
- Security impact.
- Privacy impact.
- Data migration impact.
- API compatibility.
- Performance impact.
- Operational impact.
- Marketing impact where relevant.

### 31.3 Breaking Changes
Changes that affect existing API consumers, data structures, user workflows, or external integrations must follow a controlled compatibility and migration process.

### 31.4 Version Management
Changes to platform software must be traceable through version control and release records.

### 31.5 Cross-Document Updates
If a technical change affects an approved project decision, the relevant blueprint document must be reviewed and updated through formal change control.

---

## 32. IMPLEMENTATION AND RELEASE PRIORITIES

### 32.1 Priority 1 — Essential Website Quality
Focus:
- Core website functionality.
- Public tourism information.
- Destination discovery.
- Responsive design.
- Basic search.
- Content management.
- Authentication where implemented.
- Essential security.
- Backup.
- Monitoring.

### 32.2 Priority 2 — Operational Workflows
Focus:
- Partner registration.
- Partner verification.
- Partner dashboard.
- Booking inquiry management.
- Administrative workflows.
- Notification services.
- Review management.
- Support procedures.

### 32.3 Priority 3 — Advanced Platform Services
Focus:
- Advanced AI services.
- Additional multilingual functionality.
- Advanced analytics.
- External service integrations.
- Approved commercial workflows.
- Advanced search and personalization.

### 32.4 Priority 4 — Continuous Improvement
Focus:
- Performance optimization.
- Scalability.
- Advanced security improvements.
- Operational automation.
- Additional integrations.
- New approved platform capabilities.

### 32.5 Priority Governance
A priority category does not authorize automatic implementation.
Every feature must pass its applicable requirements, security, privacy, testing, and release approval procedures.

---

## 33. PENDING TESTING, DEPLOYMENT AND MAINTENANCE DECISIONS

The following decisions require formal evaluation and approval:

| Decision ID | Pending Decision |
| :--- | :--- |
| TDM-PD-001 | Final automated testing framework |
| TDM-PD-002 | Final unit testing framework |
| TDM-PD-003 | Final end-to-end testing framework |
| TDM-PD-004 | Supported browser matrix |
| TDM-PD-005 | Supported operating system matrix |
| TDM-PD-006 | Final accessibility testing tools |
| TDM-PD-007 | Final security testing approach |
| TDM-PD-008 | Independent penetration testing scope |
| TDM-PD-009 | Performance testing framework |
| TDM-PD-010 | Expected traffic and load assumptions |
| TDM-PD-011 | Production performance targets |
| TDM-PD-012 | Deployment automation approach |
| TDM-PD-013 | Production hosting provider |
| TDM-PD-014 | Final database technology |
| TDM-PD-015 | Database migration procedure |
| TDM-PD-016 | Monitoring provider and configuration |
| TDM-PD-017 | Log retention policy |
| TDM-PD-018 | Backup frequency |
| TDM-PD-019 | Backup retention period |
| TDM-PD-020 | Recovery Point Objective |
| TDM-PD-021 | Recovery Time Objective |
| TDM-PD-022 | Disaster recovery location and approach |
| TDM-PD-023 | Production release approval authority |
| TDM-PD-024 | Emergency release procedure |
| TDM-PD-025 | Technical support structure |
| TDM-PD-026 | Support response and resolution targets |
| TDM-PD-027 | Maintenance schedule |
| TDM-PD-028 | Production availability target |
| TDM-PD-029 | AI service quality thresholds |
| TDM-PD-030 | Final technical documentation ownership |

These decisions must be resolved before the affected production processes are treated as fully established.

---

## 34. TESTING, DEPLOYMENT AND MAINTENANCE ACCEPTANCE CRITERIA

The testing, deployment, and maintenance framework will be considered ready for its approved operational scope when:
1. Testing governance is documented.
2. Requirements are traceable to test cases.
3. Development, staging, and production environments are separated.
4. Test data is controlled.
5. Functional testing is completed for the approved launch scope.
6. Integration testing is completed for active integrations.
7. Authentication and authorization are tested.
8. Booking inquiry workflows are tested.
9. Financial workflows are tested to their approved implementation scope.
10. AI services pass applicable quality and safety testing before activation.
11. Multilingual features are tested for each operational language.
12. Responsive behavior is tested.
13. Accessibility testing is performed.
14. Security findings are reviewed.
15. Privacy requirements are tested.
16. Data integrity is verified.
17. Performance testing is completed against approved targets.
18. SEO and public-page behavior are reviewed.
19. User acceptance testing is documented.
20. Release procedures are approved.
21. Deployment procedures are documented.
22. Rollback or recovery procedures are available.
23. Production launch readiness is approved.
24. Post-deployment verification is completed.
25. Monitoring and alerting are operational.
26. Incident management procedures are documented.
27. Backup procedures are implemented.
28. Restoration tests are performed.
29. Disaster recovery procedures are documented.
30. Maintenance procedures are established.
31. Support responsibilities are assigned.
32. Technical documentation is maintained.
33. Relevant pending decisions are resolved before dependent production activation.
34. Cross-document consistency is maintained.

---

## 35. FINAL DOCUMENT SERIES GOVERNANCE

### 35.1 Official Blueprint Register
PHERI NEPAL's official project blueprint series consists of the following 12 documents:

| Document | Official Title | Document Code |
| :--- | :--- | :--- |
| 01 | Master Project Blueprint | PN-MPB-001 |
| 02 | Business Model and Revenue Blueprint | PN-BMR-002 |
| 03 | User Journey and Functional Requirements Blueprint | PN-UJFR-003 |
| 04 | UI/UX and Design System Blueprint | PN-UXDS-004 |
| 05 | Technical Architecture Blueprint | PN-TAB-005 |
| 06 | Database and Data Management Blueprint | PN-DDM-006 |
| 07 | API and Third-Party Integration Blueprint | PN-ATPI-007 |
| 08 | AI and Intelligent Services Blueprint | PN-AIS-008 |
| 09 | Security, Privacy and Legal Compliance Blueprint | PN-SPLC-009 |
| 10 | Administration, Partner Management and Operations Blueprint | PN-APOB-010 |
| 11 | Marketing, SEO and Growth Blueprint | PN-MSG-011 |
| 12 | Testing, Deployment and Maintenance Blueprint | PN-TDM-012 |

### 35.2 Document Authority
The 12 documents collectively define the approved project blueprint structure.
Each document has its own subject-matter responsibility.
No document should independently override decisions belonging to another authoritative document.

### 35.3 Identifier Consistency
The following identifiers must remain consistent:
- **Platform Modules:** `M01`–`M18`.
- **Revenue Categories:** `R01`–`R14`.
- **AI Services:** `AI-001`–`AI-016`.
- **API Groups:** `API-001`–`API-020`.
- **Third-Party Integrations:** `INT-001`–`INT-017`.

Document 12 introduces the testing and maintenance KPI identifiers `TDM-001`–`TDM-025` and pending decision identifiers `TDM-PD-001`–`TDM-PD-030`.
These identifiers do not create new platform modules, revenue categories, AI services, or API groups.

### 35.4 Blueprint Change Governance
Changes affecting multiple documents must be reviewed across all affected documents.
The project must maintain consistent versions and approved decisions.

---

## 36. FINAL GOVERNANCE STATEMENT

PHERI NEPAL must be developed and operated through a controlled lifecycle that prioritizes quality, security, privacy, reliability, usability, and continuous improvement.
No feature should be considered production-ready merely because development is complete.
Every release must pass applicable testing, security review, acceptance, deployment approval, and post-deployment verification.
The platform must maintain documented procedures for monitoring, incident response, backup, recovery, maintenance, and technical support.
The initial platform remains website-first. Future mobile applications and additional advanced services must follow the same quality and release governance when introduced.
The initial booking model remains inquiry-based until automated booking and payment capabilities have been separately implemented, tested, and approved.
All technology providers, performance targets, operational service levels, backup intervals, recovery objectives, and other unresolved technical choices remain subject to formal evaluation and approval.

Document 12 — Testing, Deployment and Maintenance Blueprint completes the official 12-document PHERI NEPAL project blueprint series.

---

## 37. VERSION 2.0 DISASTER RECOVERY (RPO/RTO), STALE-LISTING HEALTH CHECKS & ZERO-PII STAGING SPECIFICATIONS (AUDIT GAP RESOLUTIONS)

### 37.1 Quantitative Backup, Recovery Point Objective (RPO) & Recovery Time Objective (RTO) Matrix
To resolve undefined disaster recovery thresholds across production databases (`ENT-001`–`ENT-040`) and verification storage:

| Data Domain / System Tier | Backup Frequency & Method | Retention Window | Max Recovery Point Objective (`RPO`) | Max Recovery Time Objective (`RTO`) | Verification Drill Frequency |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Transactional & Financial Ledgers** (`ENT-025`–`ENT-033`, `ENT-040` Audit Logs) | Continuous Write-Ahead Log (WAL) / Point-in-Time Recovery (PITR) + 6-Hourly Snapshots | **90 Days** Online PITR + **7 Years** Cold Archive | **<= 15 Minutes** (Zero committed financial loss) | **<= 1 Hour** | Monthly automated restore test into isolated verification container |
| **Tier 2: Partner, User & Verification Records** (`ENT-001`–`ENT-006`, `ENT-015`–`ENT-024`) | Daily Encrypted Automated Snapshot + Change Stream Replication | **30 Days** Rolling Daily + **1 Year** Monthly | **<= 1 Hour** | **<= 2 Hours** | Monthly restore & checksum validation |
| **Tier 3: Destination, CMS & Multilingual Content** (`ENT-007`–`ENT-014`, `ENT-035`–`ENT-038`) | Daily Snapshot + Git-Versioned Seed/Static Fallbacks | **30 Days** Rolling | **<= 4 Hours** | **<= 2 Hours** | Quarterly full rebuild drill |

### 37.2 Automated Stale-Listing, Dead-Link & Information Freshness Health Checker
Because local tourism business phone numbers, seasonal road conditions, and permit fees change frequently in Nepal:
1. **90-Day Partner Listing Freshness Heartbeat:**
   - If a Business Partner (`U03`) has not logged in, responded to an inquiry, or confirmed their listing details within **90 days**, the system sends an automated SMS/Email `"1-Click Listing Confirmation"` link.
   - At **120 days** without confirmation, the listing is flagged with a subtle `"Last Confirmed by Partner: [Date]"` notice and queued for Support (`U06`) verification so travelers never encounter abandoned businesses.
2. **Weekly Automated Broken-Link & External Source Monitor:**
   - Every Sunday at `02:00 NPT`, an automated job scans all external government/visa/permit citation links (`M01`), image assets, and map coordinates, alerting Content Managers (`U04`) of any `404/500` responses or overdue review dates (`ENT-012`).

### 37.3 Zero-PII Synthetic Staging Dataset & Environment Isolation Rule
1. **Strict Prohibition of Production PII in `DEV`, `CI`, and `STG`:**
   - Production traveler emails, phone numbers, inquiry messages, and partner KYC documents (`ENT-017`) must never be copied into `DEV`, `CI`, or `STG`.
2. **Deterministic Nepal Tourism Seed Suite (`seed-nepal-ecosystem.ts`):**
   - Lower environments must use a rich, realistic, deterministic seed dataset covering all **7 Provinces**, all **77 Districts**, representative **Tier A/B/C destinations**, realistic **Verified vs. Pending vs. Sponsored listings**, and simulated **Inquiry-First booking threads** across **Nepali (`ne-NP`) and English (`en-US`)** (+ 10 language schema stubs).

---

**END OF DOCUMENT 12 — PN-TDM-012 (Version 2.0 — Complete Unabridged + Audit-Resolved)**
**END OF THE 12-DOCUMENT BLUEPRINT SERIES**
