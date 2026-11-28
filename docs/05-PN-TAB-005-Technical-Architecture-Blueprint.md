# PHERI NEPAL
## DOCUMENT 05 — TECHNICAL ARCHITECTURE BLUEPRINT

- **Document Code:** PN-TAB-005
- **Version:** 1.0
- **Document Series:** 05 of 12
- **Document Status:** Official Technical Architecture Blueprint
- **Parent Documents:**
  - Document 01 — Master Project Blueprint (PN-MPB-001)
  - Document 02 — Business Model and Revenue Blueprint (PN-BMR-002)
  - Document 03 — User Journey and Functional Requirements Blueprint (PN-UJFR-003)
  - Document 04 — UI/UX and Design System Blueprint (PN-UXDS-004)
- **Project:** PHERI NEPAL
- **Initial Platform:** Website
- **Product Positioning:** Nepal's Trusted Tourism Ecosystem
- **Tagline:** Discover Nepal. Travel with Confidence. Return Again.

---

## 1. DOCUMENT PURPOSE
This document establishes the technical architecture and engineering direction for PHERI NEPAL.

It defines how the platform's major software components should be organized, how they communicate, how the application is structured, and how the system can support the functional requirements established in Documents 01–04.

The technical architecture must support:
- A national tourism information platform.
- Destination discovery across all 7 provinces and 77 districts.
- Tourism business and service directories.
- Traveler and partner accounts.
- Booking inquiry and partner response workflows.
- Multilingual website functionality.
- AI-assisted tourism services.
- Maps and location services.
- Reviews and reputation management.
- Notifications.
- Administration and reporting.
- Approved commercial and financial capabilities.
- Future expansion to Android and iOS applications.

This document defines the logical architecture and technology decision framework. Detailed database structures, API contracts, AI specifications, security controls, operational procedures and deployment instructions are governed by their respective documents.

---

## 2. ARCHITECTURE GOVERNANCE
### 2.1 Governing Documents
| Document | Architecture Dependency |
| :--- | :--- |
| Document 01 | Master scope, platform modules and technical principles |
| Document 02 | Revenue and transaction requirements |
| Document 03 | Functional requirements and user workflows |
| Document 04 | UI/UX and design system |
| Document 05 | Technical architecture |
| Document 06 | Database and data management |
| Document 07 | API and third-party integrations |
| Document 08 | AI and intelligent services |
| Document 09 | Security, privacy and legal compliance |
| Document 10 | Administration, partner and operations |
| Document 11 | Marketing, SEO and growth |
| Document 12 | Testing, deployment and maintenance |

### 2.2 Mandatory Architecture Rules
1. Document 01 remains the master authority for project scope.
2. The initial product is a website.
3. Android and iOS applications remain future expansion options.
4. All 18 official module identifiers must remain unchanged.
5. All 14 revenue identifiers must remain unchanged.
6. The three travel stages must remain connected.
7. The initial booking model must remain inquiry-based with partner response and confirmation.
8. Automated booking and payment must not be represented as operational before implementation, integration and testing.
9. AI must remain a major platform capability.
10. The platform must support the approved 12-language requirement.
11. Architecture decisions must consider security, reliability, maintainability and scalability.
12. No technology choice should be treated as final without technical evaluation and approval.

---

## 3. ARCHITECTURE OBJECTIVES
The technical architecture must achieve the following objectives.

### 3.1 Reliability
The platform should provide dependable access to public tourism information and essential user workflows.

### 3.2 Scalability
The architecture should support growth in:
- Website visitors.
- Registered travelers.
- Tourism businesses.
- Destination records.
- Tourism content.
- Booking inquiries.
- AI service usage.
- Languages and translations.
- External service integrations.

### 3.3 Maintainability
The system should be organized so that developers can update individual components without unnecessarily affecting unrelated functionality.

### 3.4 Security
Authentication, authorization, data protection and operational access must follow the requirements established in Document 09.

### 3.5 Performance
The architecture should support efficient page loading, search, content delivery and service communication.

### 3.6 Integration Readiness
The platform should be able to connect with approved external providers through controlled integration interfaces.

### 3.7 Future Expansion
The architecture should allow future mobile applications and additional tourism services without requiring an unnecessary complete system redesign.

---

## 4. HIGH-LEVEL SYSTEM ARCHITECTURE
PHERI NEPAL should follow a layered application architecture with clearly separated responsibilities.

### 4.1 Main Architecture Layers
| Layer | Responsibility |
| :--- | :--- |
| Presentation Layer | Website pages, navigation and user interfaces |
| Application Layer | Business workflows and application logic |
| Service Layer | Reusable platform services |
| Data Layer | Database, files and structured information |
| Integration Layer | External APIs and third-party providers |
| AI Layer | AI-powered tourism services |
| Infrastructure Layer | Hosting, deployment, monitoring and runtime services |

### 4.2 Logical Architecture
The following diagram represents the intended logical structure. It does not prescribe a final hosting provider or deployment topology.

```text
                    PHERI NEPAL USERS
                           |
          +----------------+----------------+
          |                |                |
       Travelers        Partners         Admins
          |                |                |
          +----------------+----------------+
                           |
                    WEBSITE INTERFACE
                           |
                PRESENTATION LAYER
                           |
                 APPLICATION BACKEND
                           |
       +-------------------+-------------------+
       |                   |                   |
   CORE SERVICES      USER SERVICES      CONTENT SERVICES
       |                   |                   |
       +-------------------+-------------------+
                           |
                    SERVICE LAYER
                           |
       +-------------------+-------------------+
       |                   |                   |
   BOOKING             AI SERVICES       PLATFORM SERVICES
   SERVICES                              AND NOTIFICATIONS
       |                   |                   |
       +-------------------+-------------------+
                           |
                    DATA LAYER
                           |
       +-------------------+-------------------+
       |                   |                   |
    DATABASE          FILE STORAGE       SEARCH SUPPORT
                           |
                    INTEGRATION LAYER
                           |
       +-------------------+-------------------+
       |                   |                   |
    Maps APIs          AI Provider       Other Approved APIs
                           |
                    INFRASTRUCTURE
                           |
              HOSTING, MONITORING,
               BACKUP AND DEPLOYMENT
```

This logical structure is intended to keep application responsibilities organized and prevent unnecessary coupling.

---

## 5. APPLICATION ARCHITECTURE APPROACH
### 5.1 Recommended Initial Approach
For the initial website, a modular application architecture is the preferred starting direction.

A modular application keeps the main application within a manageable deployment structure while separating functionality into clearly defined modules and services.

This approach is suitable for an initial product because it:
- Reduces unnecessary infrastructure complexity.
- Supports centralized development.
- Makes core workflows easier to maintain.
- Allows consistent access control.
- Simplifies initial deployment.
- Leaves room for future service separation.

The initial architecture should not introduce microservices merely for appearance or theoretical scalability.

### 5.2 Modular Separation
The application should separate major responsibilities, including:
- Authentication and user management.
- Traveler account management.
- Partner account management.
- Destination and tourism content.
- Business and service directories.
- Booking inquiry management.
- Reviews and reputation.
- Notifications.
- AI integration.
- Maps and location services.
- Administration.
- Analytics and reporting.
- Commercial and financial functions.

The exact implementation boundaries will be finalized during detailed engineering.

### 5.3 Future Service Separation
If platform growth creates measurable technical or operational requirements, selected modules may be separated into independent services.
Potential candidates include:
- AI processing.
- Search and indexing.
- Notification delivery.
- Media processing.
- Analytics processing.
- High-volume integration services.

Such separation must be based on actual system requirements, not assumed future traffic.

---

## 6. FRONTEND ARCHITECTURE
The frontend is responsible for the website interface and user interaction.
It must implement the design system in Document 04 and support the functional workflows in Document 03.

### 6.1 Frontend Responsibilities
The frontend should handle:
- Public website pages.
- Destination discovery.
- Tourism service directories.
- Search interfaces.
- Traveler registration and account access.
- Partner dashboard interfaces.
- Administrative interfaces.
- Booking inquiry forms.
- Inquiry status presentation.
- AI assistant interface.
- Multilingual navigation.
- Responsive layouts.
- User-facing validation and feedback.

### 6.2 Frontend Technology Candidates
| Technology | Intended Responsibility | Decision Status |
| :--- | :--- | :--- |
| React | Frontend component framework | Candidate |
| TypeScript | Type-safe application development | Candidate |
| Tailwind CSS | Styling and design system implementation | Candidate |
| React Router or framework-native routing | Page navigation | Pending Evaluation |
| Approved form and validation library | Form handling | Pending Evaluation |
| Approved testing framework | Frontend testing | Pending Evaluation |

These are proposed candidates, not a declaration that the production stack has already been finalized.

### 6.3 Frontend Structure
The frontend should be organized into logical areas:
1. Public website.
2. Traveler account area.
3. Partner dashboard.
4. Administration interface.
5. Shared component library.
6. Localization resources.
7. API communication layer.
8. Common state and interaction utilities.

### 6.4 Frontend Engineering Requirements
- Reusable components.
- Consistent design tokens.
- Responsive layouts.
- Type-safe data handling where supported.
- Clear loading and error states.
- Appropriate form validation.
- Accessible navigation.
- Secure handling of session information.
- Separation of public and restricted interfaces.
- Controlled communication with backend services.

The frontend must not be trusted to enforce authorization by itself. Restricted operations must be protected by backend authorization.

---

## 7. BACKEND ARCHITECTURE
The backend is responsible for application logic, data processing, authorization and controlled communication with external services.

### 7.1 Backend Responsibilities
The backend should support:
- User and account operations.
- Partner account operations.
- Destination and business information.
- Service directory operations.
- Booking inquiry workflows.
- Review management.
- Notification coordination.
- AI service orchestration.
- Content management.
- Administrative operations.
- Commercial and financial records.
- Reporting and analytics data access.

### 7.2 Backend Technology Candidates
| Technology | Intended Responsibility | Decision Status |
| :--- | :--- | :--- |
| Node.js | Server-side runtime | Candidate |
| TypeScript | Backend application development | Candidate |
| Express, NestJS or framework-native backend | Application service framework | Pending Evaluation |
| Firebase Cloud Functions or equivalent | Event-driven backend functions | Candidate |
| Background job processing | Asynchronous tasks | Pending Evaluation |

A single coherent backend strategy must be selected after comparing the functional requirements, engineering skills, hosting model, cost structure and long-term maintenance needs.

### 7.3 Backend Design Principles
- Validate all incoming requests.
- Enforce authorization on protected operations.
- Keep business logic separate from presentation logic.
- Use consistent error responses.
- Record important state changes.
- Prevent unauthorized direct data modification.
- Use controlled integration interfaces.
- Handle external service failures.
- Avoid duplicating business rules across different interfaces.

---

## 8. DATA ARCHITECTURE OVERVIEW
The data layer must support the information and workflows required by the platform.
Detailed data structures and relationships are defined in Document 06.

### 8.1 Main Data Domains
The architecture must support the following logical data domains:
1. User accounts.
2. Traveler profiles.
3. Partner profiles.
4. Verification records.
5. Destinations.
6. Geographic information.
7. Accommodation listings.
8. Transportation listings.
9. Tours and activities.
10. Business directory records.
11. Booking inquiries.
12. Inquiry status history.
13. Reviews and ratings.
14. Notifications.
15. Content and translations.
16. AI-related records where permitted.
17. Commercial records.
18. Payment-related records where operational.
19. Administrative activity records.
20. Analytics information.

These are logical data categories, not a finalized database schema.

### 8.2 Database Technology Candidates
Document 01 identifies Firestore or another suitable database as a candidate direction.
Potential options include:

| Database Option | Evaluation Consideration |
| :--- | :--- |
| Cloud Firestore | Managed document database and integration with Firebase services |
| PostgreSQL | Relational data consistency and structured relationships |
| Other managed database services | Operational requirements, hosting and integration compatibility |

The final selection must consider:
- Data relationships.
- Transaction consistency.
- Query patterns.
- Search requirements.
- Reporting requirements.
- Data volume.
- Backup and recovery.
- Security.
- Operational cost.
- Developer capability.

The architecture must avoid choosing a database solely because it is familiar or easy to start with.

### 8.3 Data Separation Principles
The data architecture must maintain appropriate separation between:
- Public tourism content.
- Private user information.
- Partner-submitted information.
- Verification records.
- Booking inquiry information.
- Commercial records.
- Administrative records.

Access must be restricted according to the approved permissions and data governance rules.

---

## 9. AUTHENTICATION AND AUTHORIZATION ARCHITECTURE
The platform must provide controlled access for its different user categories.

### 9.1 User Categories
The architecture must support:
- Public visitors.
- Registered travelers.
- Tourism businesses and partners.
- Administrators.
- Authorized internal operational roles.

### 9.2 Authentication Technology Candidates
Firebase Authentication is an initial candidate identified in Document 01.
Alternative authentication services may be evaluated where required.
The final decision must consider:
- Supported login methods.
- Account recovery.
- Verification requirements.
- Session management.
- Integration compatibility.
- Security controls.
- Long-term operational requirements.

### 9.3 Authorization Architecture
Authorization must be enforced by trusted backend services and appropriate data access controls.
The architecture should support:
- Role-based permissions.
- Resource ownership checks.
- Partner-specific data access.
- Administrative permission separation.
- Restricted operations.
- Account status checks.

A user must not gain access to another partner's private records by changing an identifier in a request or URL.
Detailed security requirements are governed by Document 09.

---

## 10. BOOKING MANAGEMENT ARCHITECTURE
The booking system must follow the inquiry-based initial operating model.

### 10.1 Initial Booking Architecture
The initial workflow should support:
1. Traveler selects a service.
2. Traveler submits an inquiry.
3. Backend validates and records the inquiry.
4. Relevant partner receives access to the inquiry.
5. Partner reviews the request.
6. Partner responds.
7. Traveler receives the response.
8. Inquiry status is updated.
9. Authorized users can review the inquiry history.

### 10.2 Booking Data and State Handling
The architecture must distinguish:
- Inquiry record.
- Inquiry status.
- Booking arrangement status.
- Payment status.
- Commercial eligibility status.

These concepts must not be merged into one ambiguous status field.

### 10.3 Initial Payment Limitation
The existence of M15 — Payment and Financial System — in the master architecture does not establish that live payment processing is operational.

For the initial release:
- Inquiry submission must not trigger a claim of successful payment.
- Partner confirmation must not automatically be treated as payment completion.
- Automated payment processing must remain inactive until the provider integration and associated workflows have been implemented and tested.
- Financial and commission rules must follow Document 02.

---

## 11. AI INTEGRATION ARCHITECTURE
AI is a major platform capability.
Document 05 defines its architectural position. Detailed AI behaviour and specifications are governed by Document 08.

### 11.1 AI Architecture Responsibilities
The AI layer should provide a controlled connection between the website and approved AI providers.
It may support:
- Travel question answering.
- Destination recommendations.
- Travel planning assistance.
- Multilingual interaction.
- Tourism information retrieval.
- Relevant platform service discovery.

### 11.2 AI Request Flow
The intended logical flow is:
1. User submits a question.
2. Frontend sends the request to an approved backend endpoint.
3. Backend validates the request.
4. Applicable access and usage rules are checked.
5. The AI service receives an authorized request.
6. The response is processed.
7. Relevant safeguards and formatting are applied.
8. The response is returned to the user.

### 11.3 AI Provider Candidates
Gemini API is an initial candidate identified in Document 01.
Other approved AI providers may be evaluated based on:
- Accuracy.
- Language support.
- Reliability.
- Integration capabilities.
- Data handling.
- Cost.
- Usage limits.
- Availability.
- Model performance.

### 11.4 AI Security and Reliability
- AI provider credentials must not be exposed in public frontend code.
- AI requests must be controlled by backend services.
- Usage limits must be enforceable.
- Sensitive data must not be unnecessarily included in prompts.
- AI responses must not be treated as verified facts automatically.
- AI must not claim to complete booking or payment actions without actual confirmation from the relevant service.
- Provider failures must be handled gracefully.

Detailed AI policies, evaluation and model-specific decisions belong to Document 08.

---

## 12. API AND THIRD-PARTY INTEGRATION ARCHITECTURE
The platform will require controlled communication with selected external services.

### 12.1 Potential Integration Categories
| Integration Category | Intended Function |
| :--- | :--- |
| AI Provider | AI-assisted travel services |
| Map Provider | Maps and location information |
| Weather Provider | Approved weather information |
| Authentication Provider | User authentication |
| Email Provider | Email communication |
| Notification Provider | Approved notifications |
| Payment Provider | Future approved payment processing |
| Analytics Provider | Approved usage and performance measurement |
| Search Provider | Search and indexing where required |

### 12.2 Integration Governance
Each external integration must have:
- A defined business purpose.
- An approved provider.
- A documented interface.
- Credential management.
- Failure handling.
- Usage monitoring.
- Privacy assessment where required.
- Testing before production activation.

### 12.3 Integration Isolation
External providers should be accessed through controlled service interfaces.
The frontend should not directly contain confidential provider credentials or bypass backend controls for restricted operations.
Detailed endpoints, request formats, response structures and provider configurations are defined in Document 07.

---

## 13. SEARCH ARCHITECTURE
Search is central to tourism discovery.

### 13.1 Search Responsibilities
The platform must support relevant search across:
- Destinations.
- Tourism businesses.
- Accommodation.
- Transportation.
- Tours and activities.
- Relevant tourism information.

### 13.2 Initial Search Approach
The initial implementation may use database-supported search capabilities where sufficient.
A dedicated search engine may be introduced if the platform's search volume, relevance requirements or performance needs justify it.

### 13.3 Search Architecture Requirements
- Consistent search behaviour.
- Appropriate filtering.
- Relevance-aware results.
- Support for multilingual content.
- Controlled indexing.
- Clear empty-result handling.
- Distinction between sponsored and organic results.

The final search provider and indexing strategy remain subject to technical evaluation.

---

## 14. FILE AND MEDIA STORAGE ARCHITECTURE
The platform will manage tourism images, business images, content media and relevant documents.

### 14.1 Storage Responsibilities
The storage system should support:
- Destination images.
- Tourism content media.
- Business profile images.
- Service images.
- Approved partner documents.
- Relevant platform files.

### 14.2 Storage Technology Candidate
Firebase Storage is an initial candidate identified in Document 01.
The final selection must consider:
- Access control.
- File size limits.
- Media delivery performance.
- Image optimization.
- Storage cost.
- Backup and retention.
- Integration compatibility.

### 14.3 File Access Principles
- Public media must be intentionally published.
- Private documents must not be publicly accessible.
- Upload permissions must be enforced.
- File types and sizes must be validated.
- Unnecessary duplicate files should be avoided.
- Sensitive documents must follow Document 09.

---

## 15. MULTILINGUAL ARCHITECTURE
The platform must support the 12-language requirement.

### 15.1 Language Architecture Responsibilities
The system should support:
- Language selection.
- Localized navigation.
- Translated interface text.
- Localized destination content.
- Localized service information where available.
- Multilingual AI interaction where supported.
- Language-aware page metadata where appropriate.

### 15.2 Localization Design
Interface translation and tourism content translation should be handled as distinct content concerns.
The architecture should support translation records and language-specific content without creating inconsistent duplicate records.

### 15.3 Language Governance
- Nepali and English remain foundational languages.
- The remaining language choices must follow verified source-market and tourist-arrival information.
- The final language list remains subject to approval.
- Missing translations must have controlled fallback behaviour.

Detailed translation data structures are governed by Document 06. Interface behaviour is governed by Document 04.

---

## 16. NOTIFICATION ARCHITECTURE
The notification system must support relevant platform events.

### 16.1 Notification Categories
- Account notifications.
- Booking inquiry notifications.
- Partner notifications.
- Verification updates.
- Support updates.
- Relevant platform announcements.

### 16.2 Logical Notification Flow
1. An approved application event occurs.
2. The backend identifies the relevant recipient.
3. Notification preferences and permissions are checked.
4. The selected delivery channel is invoked.
5. Delivery outcome is recorded where supported.
6. The user can access the notification through the appropriate interface.

The architecture must distinguish between an event being created, a notification being queued and a notification being successfully delivered.
Detailed delivery channels and provider integrations are governed by Document 07.

---

## 17. ANALYTICS AND REPORTING ARCHITECTURE
The platform should support operational and business reporting.

### 17.1 Analytics Categories
- Website usage.
- Destination engagement.
- Search activity.
- Account registrations.
- Partner registrations.
- Booking inquiry activity.
- Inquiry response performance.
- Review activity.
- Content performance.
- Commercial activity.

### 17.2 Analytics Principles
- Use approved and necessary data.
- Separate operational reporting from financial accounting.
- Avoid unnecessary collection of personal information.
- Apply access restrictions.
- Maintain consistent metric definitions.
- Prevent duplicate counting.
- Support traceable financial reporting.

Revenue and financial reporting must follow Document 02. Detailed analytics implementation is subject to Documents 06, 09 and 10.

---

## 18. INFRASTRUCTURE AND HOSTING ARCHITECTURE
The platform requires a managed and reliable hosting environment.

### 18.1 Hosting Requirements
The hosting environment should support:
- Website delivery.
- Backend application execution.
- Database connectivity.
- Secure file storage.
- External API communication.
- Monitoring.
- Backup and recovery.
- Controlled deployment.
- Environment separation.

### 18.2 Hosting Candidates
The following are potential options, not final approved selections:
- Firebase and Google Cloud services.
- Other suitable managed cloud platforms.
- Compatible managed application hosting providers.

The final provider must be selected after evaluating:
- Reliability.
- Regional availability.
- Performance.
- Security capabilities.
- Scalability.
- Operational complexity.
- Cost.
- Vendor dependency.
- Backup and recovery options.

### 18.3 Environment Separation
The architecture should separate:

| Environment | Purpose |
| :--- | :--- |
| Development | Active engineering and development |
| Testing / Staging | Integration and pre-release validation |
| Production | Live user-facing platform |

Production data and credentials must not be casually reused in development environments.

---

## 19. SOURCE CONTROL AND DEVELOPMENT WORKFLOW
Source code must be maintained in a controlled version-management system.

### 19.1 Version Control
Git is the recommended version-control approach.
GitHub is an initial repository hosting candidate identified in Document 01.

### 19.2 Development Workflow
The engineering workflow should support:
1. Requirement identification.
2. Development task creation.
3. Code changes.
4. Peer review where applicable.
5. Automated checks.
6. Testing.
7. Staging validation.
8. Release approval.
9. Production deployment.
10. Change history retention.

### 19.3 Code Organization
The codebase should use:
- Clear module boundaries.
- Consistent naming conventions.
- Reusable components.
- Environment-based configuration.
- Documented dependencies.
- Controlled secrets.
- Automated quality checks.

---

## 20. SYSTEM RELIABILITY AND FAILURE HANDLING
The architecture must anticipate failures in internal components and external providers.

### 20.1 Failure Scenarios
Potential failure scenarios include:
- Database unavailability.
- Authentication provider outage.
- AI provider failure.
- Map service failure.
- Email delivery failure.
- Notification delivery failure.
- File storage failure.
- Hosting disruption.
- Network interruption.

### 20.2 Failure Handling Requirements
The system should:
- Provide understandable user-facing error messages.
- Avoid exposing internal technical details.
- Preserve valid user input where practical.
- Prevent duplicate submissions where appropriate.
- Record important operational failures.
- Retry eligible transient operations safely.
- Avoid reporting false success.
- Provide a controlled recovery process.

### 20.3 Service Independence
Failure of an optional external service should not unnecessarily disable unrelated core tourism information.
For example, an AI provider outage should not make destination pages unavailable if those pages can operate independently.

---

## 21. PERFORMANCE AND SCALABILITY ARCHITECTURE
The system must be designed to support future growth.

### 21.1 Performance Priorities
- Efficient page delivery.
- Optimized media.
- Appropriate caching.
- Efficient database queries.
- Controlled API requests.
- Responsive search.
- Efficient background processing.
- Minimal unnecessary frontend dependencies.

### 21.2 Scalability Considerations
The architecture should allow:
- Increased visitor traffic.
- Increased account numbers.
- Increased partner listings.
- More tourism content.
- Increased inquiry volume.
- Higher AI request volume.
- Additional languages.
- Future mobile applications.

### 21.3 Scalability Strategy
Scaling decisions should be based on observed system behaviour and measurable requirements.
Potential techniques include:
- Managed hosting capacity.
- Database indexing.
- Caching.
- Background processing.
- Search indexing.
- Media delivery optimization.
- Service separation where justified.

No specific traffic capacity or performance guarantee is established by this document.

---

## 22. SECURITY ARCHITECTURE BOUNDARIES
Security is a core architectural requirement.
The technical design must support:
- Secure authentication.
- Backend authorization.
- Controlled data access.
- Secure API communication.
- Secret management.
- Input validation.
- Protection against common web vulnerabilities.
- Appropriate logging.
- Backup and recovery.
- Restricted administrative operations.

Security controls, privacy requirements, retention policies and legal obligations are specified in Document 09.
This document does not replace the detailed security blueprint.

---

## 23. TECHNICAL TECHNOLOGY DECISION REGISTER
The following register consolidates the technology candidates identified in Document 01 and the architectural requirements in this document.

| Area | Candidate Direction | Status |
| :--- | :--- | :--- |
| Frontend | React | Candidate |
| Frontend Language | TypeScript | Candidate |
| Styling | Tailwind CSS | Candidate |
| Backend Runtime | Node.js | Candidate |
| Backend Framework | Express / NestJS / suitable framework | Pending Evaluation |
| Database | Firestore / PostgreSQL / suitable alternative | Pending Evaluation |
| Authentication | Firebase Authentication / suitable alternative | Candidate |
| File Storage | Firebase Storage / suitable alternative | Candidate |
| AI Provider | Gemini API / approved alternative | Candidate |
| Maps | Suitable map provider | Pending Evaluation |
| Weather | Suitable weather provider | Pending Evaluation |
| Hosting | Firebase / Google Cloud / suitable managed hosting | Pending Evaluation |
| Source Control | Git | Recommended Direction |
| Repository Hosting | GitHub | Candidate |
| Testing | Suitable automated testing tools | Pending Evaluation |
| Monitoring | Suitable application monitoring service | Pending Evaluation |

**Technology approval rule:** A candidate becomes an approved production technology only after technical evaluation, compatibility assessment, security review and project approval.

---

## 24. ARCHITECTURE ACCEPTANCE CRITERIA
The technical architecture is ready for detailed implementation planning when:
1. The seven architecture layers and their responsibilities are documented.
2. Frontend and backend responsibilities are separated.
3. Core module boundaries are identified.
4. The initial booking inquiry workflow is supported.
5. User and partner access boundaries are recognized.
6. AI integration is separated from public frontend credentials.
7. External integrations have controlled access paths.
8. The data architecture supports the required logical domains.
9. The 12-language requirement is supported architecturally.
10. Public and private information have appropriate access boundaries.
11. Development, staging and production environments are defined.
12. Hosting and deployment candidates have been evaluated.
13. Failure handling is considered.
14. Future expansion is possible without unnecessary architectural complexity.
15. The architecture does not contradict Documents 01–04.

---

## 25. PENDING TECHNICAL DECISIONS
The following decisions must be completed before the relevant production implementation is finalized.

| Decision ID | Pending Decision | Responsible Document |
| :--- | :--- | :--- |
| TD-01 | Final frontend framework and routing approach | Document 05 |
| TD-02 | Final backend framework | Document 05 |
| TD-03 | Final database selection | Document 05 / Document 06 |
| TD-04 | Final authentication provider | Document 05 / Document 09 |
| TD-05 | Final file storage provider | Document 05 / Document 06 |
| TD-06 | Final hosting provider | Document 05 / Document 12 |
| TD-07 | Final AI provider and model selection | Document 08 |
| TD-08 | Final map and location provider | Document 07 |
| TD-09 | Final notification providers | Document 07 |
| TD-10 | Final search implementation | Document 05 / Document 07 |
| TD-11 | Final monitoring solution | Document 05 / Document 12 |
| TD-12 | Final backup and recovery configuration | Document 06 / Document 12 |
| TD-13 | Final deployment and release process | Document 12 |
| TD-14 | Final technology approval and compatibility review | Project Technical Governance |

Pending decisions must not be silently treated as completed technology selections.

---

## 26. DEPENDENCIES ON FUTURE DOCUMENTS
The following documents must provide the detailed specifications required to implement this architecture:
- **Document 06 — Database and Data Management Blueprint:** Database schema, entity relationships, data ownership, data lifecycle, indexing, backup and retention requirements.
- **Document 07 — API and Third-Party Integration Blueprint:** API architecture, endpoint definitions, request and response structures, provider integrations, integration authentication, error handling.
- **Document 08 — AI and Intelligent Services Blueprint:** AI capabilities, AI model selection, prompt and service architecture, retrieval and information grounding, AI safety and evaluation, usage and service limits.
- **Document 09 — Security, Privacy and Legal Compliance Blueprint:** Authentication controls, authorization policies, privacy requirements, data protection, security controls, legal compliance.
- **Document 10 — Admin, Partner and Operations Blueprint:** Administrative architecture requirements, partner workflows, operational responsibilities, permission matrix, support and moderation procedures.
- **Document 11 — Marketing, SEO and Growth Blueprint:** SEO architecture requirements, public page discoverability, content growth requirements, analytics and marketing integration.
- **Document 12 — Testing, Deployment and Maintenance Blueprint:** Testing strategy, environment configuration, deployment process, release approval, monitoring and maintenance, recovery and operational acceptance.

---

## 27. FINAL TECHNICAL GOVERNANCE STATEMENT
This document establishes the official technical architecture direction for PHERI NEPAL.
It is governed by the project scope in Document 01, commercial rules in Document 02, functional requirements in Document 03 and design system in Document 04.

The following principles are mandatory:
1. The initial product remains a website.
2. The architecture must support all approved platform modules.
3. Core functionality must remain modular and maintainable.
4. Frontend and backend responsibilities must remain clearly separated.
5. Data access and authorization must be enforced through trusted system components.
6. Booking inquiries must follow the approved inquiry-based initial model.
7. Automated payment must not be treated as operational before integration and testing.
8. AI must be integrated through controlled backend services.
9. External providers must be accessed through documented integration boundaries.
10. The architecture must support the 12-language requirement.
11. Technology candidates must undergo evaluation before final approval.
12. Security, reliability, performance and maintainability must remain core engineering priorities.
13. Future expansion must not introduce unnecessary complexity into the initial release.

---

## 28. VERSION 2.0 TECHNICAL ARCHITECTURE SPECIFICATIONS & AUDIT GAP RESOLUTIONS

### 28.1 Quantitative Service Level Agreements (SLAs) & Performance Budgets
All platform services must adhere to measurable engineering budgets across desktop and rural 3G/4G mobile connections:

| Metric Category | Target Indicator | Threshold / Budget | Enforcement & Monitoring Mechanism |
| :--- | :--- | :--- | :--- |
| **Core Web Vitals (Public Pages)** | Largest Contentful Paint (`LCP`) | **<= 2.5 seconds** (P75 Mobile) | WebP/AVIF media compression, priority hero preload, SVG Nepal map (`< 45KB`). |
| **Core Web Vitals (Interactivity)** | Interaction to Next Paint (`INP`) | **<= 200 ms** | Debounced search filters, virtualized destination lists, zero main-thread blocking. |
| **Core Web Vitals (Visual Stability)** | Cumulative Layout Shift (`CLS`) | **<= 0.08** | Explicit width/height aspect-ratio containers on all destination/partner cards and Devanagari text blocks. |
| **Backend API Latency (`API-001`–`API-020`)** | Read Endpoints (`GET /api/v1/*`) | **P95 <= 250 ms**, **P99 <= 500 ms** | Indexed queries, in-memory/edge caching for 7-province/77-district directory metadata. |
| **Backend API Latency (Mutations)** | Write/Inquiry Endpoints (`POST /api/v1/inquiries`) | **P95 <= 450 ms** | Synchronous DB commit + asynchronous background notification dispatch. |
| **AI Service Latency (`AI-001`–`AI-016`)** | First Token / Grounded Response | **TTFT <= 1.5s**, **Full Plan <= 6.0s** | Server-side streaming / cached verified destination context injection. |
| **Platform Availability** | Monthly Uptime Target | **>= 99.5%** (Initial Launch) -> **>= 99.9%** (Phase 2) | Automated `/api/v1/health` probe every 60 seconds with instant alert escalation. |

### 28.2 Hybrid SEO Pre-Rendering & Dynamic Server Metadata Architecture
To resolve the conflict between a React/TypeScript SPA (`Document 05`) and strict multilingual Search Engine Optimization (`Document 11`):
1. **Express Server-Side Dynamic Meta & JSON-LD Injection (`server.ts`):**
   - Incoming requests for public crawlable routes (`/destinations/:slug`, `/provinces/:id`, `/districts/:id`, `/listings/:slug`, `/:lang/*`) are intercepted by the Node/Express server layer before serving `index.html`.
   - The server injects route-specific `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<link rel="alternate" hreflang="...">` (for active languages), OpenGraph tags, and Schema.org JSON-LD (`TouristDestination`, `LodgingBusiness`, `TouristTrip`) directly into the HTML response head.
2. **Dynamic XML Sitemap & Robots Endpoint:**
   - The server dynamically serves `/sitemap.xml` and `/robots.txt`, automatically excluding Tier C (`noindex`) districts or unapproved draft translations while exposing all verified Tier A/B destinations across active languages.

### 28.3 Asynchronous Job Queue, Exponential Backoff & Dead-Letter Queue (DLQ) Architecture
For background operations (partner inquiry notifications, SMS/WhatsApp alerts, translation drafts, audit log archival, and verification expiry checks):
1. **Retry Policy with Jitter:** Failed external calls (`INT-005` Email, `INT-006` SMS, `INT-001` AI) execute up to **3 automatic retries** using exponential backoff (`Attempt 1: +5s`, `Attempt 2: +30s`, `Attempt 3: +180s`).
2. **Dead-Letter Queue (`DLQ`) & Admin Alerting:** If all 3 retries fail, the job payload and error trace are written to `failed_dispatch_queue` (`ENT-039` / `M14`) and surfaced in the Admin Operations Console (`M16`) so Support/Operations staff (`U06`/`U08`) can manually replay or contact the partner directly.

---

**Document 05 — Technical Architecture Blueprint (PN-TAB-005) — Version 2.0 (Detailed & Audit-Resolved)**
**End of Document 05 of 12.**
