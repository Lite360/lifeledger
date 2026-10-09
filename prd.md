LifeLedger NG: Complete Product Blueprint

Master Prompt · PRD · MVP · EPR · UI/UX Design System · Technical Architecture · Database · Security · Monetization · Deployment

LifeLedger NG will be a premium, emerald-themed household asset management platform built with Vue.js, Vite, Tailwind CSS, Vanilla JavaScript, GitHub, and Vercel serverless functions.

The purpose is to help Nigerians keep track of their possessions, purchase receipts, warranties, maintenance schedules, repairs, and ownership expenses in one reliable place. The business model will support free household accounts, optional premium plans, and paid tools for repair professionals and retailers.

The specification below is intended to serve as the single source of truth for an AI coding agent or development team. It defines what to build, how it should work, how it should look, and what must be tested before launch.

Product identity

LifeLedger NG

Know what you own. Remember what it needs. Protect its value.

Frontend

Vue 3 + Vite

Styling

Tailwind CSS

Backend

Vercel Functions

Database

Supabase PostgreSQL

1. Master build prompt

Copy this prompt into your coding agent as the main project instruction. The supporting documents below expand its requirements.

MASTER BUILD PROMPT: LIFELEDGER NG
MASTER BUILD PROMPT: LIFELEDGER NG
Role

Act as a senior product designer, Vue.js engineer, serverless architect, database designer, security engineer, and QA engineer. Build LifeLedger NG as a complete, production-oriented household asset management application for the Nigerian market.

Do not create a generic SaaS template, a static landing page presented as a completed product, or a dashboard full of non-functional buttons. Implement working user journeys, clear validation, persistent data, realistic error handling, accessible interfaces, and secure server-side authorization.

Product objective

LifeLedger NG helps people record the possessions they own, preserve purchase documents, track warranties, schedule maintenance, record repairs, understand ownership costs, and find suitable repair professionals.

The platform must be useful to a household even when no service providers are available and no subscription is purchased.

Mandatory technology stack
Vue 3 with Composition API.
Vite as the build tool.
JavaScript, including Vanilla JavaScript utilities and browser APIs where appropriate.
Tailwind CSS as the primary styling system.
Bootstrap may be used selectively for a justified component, but must not conflict with Tailwind. Prefer one primary component system.
Vue Router for client-side routing.
Pinia only where shared application state justifies it.
Vercel for frontend deployment and serverless API functions.
GitHub for source control and continuous deployment.
Supabase Auth for authentication.
Supabase PostgreSQL for persistent application data.
Supabase Storage for private documents, with private buckets and controlled access.
Vercel Cron or an appropriate scheduled-job provider for recurring reminder processing.
An SMTP email provider for verification and reminders.
Paystack only when paid subscriptions are implemented.

Do not introduce a traditional always-running backend server. Do not use Laravel or assume PHP runs inside Vercel Functions. Do not store secrets in frontend code or commit credentials to GitHub. Do not require a .env file to exist in source control; configure environment variables through Vercel and local development configuration.

Product design

Use a premium emerald-green and warm-ivory visual identity.

Forest green: #123D2D.
Primary emerald: #16845B.
Soft sage: #E4F0E8.
Warm ivory: #FAF8F1.
White: #FFFFFF.
Charcoal: #252B27.
Muted grey: #747C76.

Use restrained green accents, realistic product photography, clean typography, subtle borders, moderate corner radii, strong spacing, and a clear visual hierarchy.

Do not use generic AI-dashboard styling, excessive gradients, neon colours, glassmorphism, giant decorative illustrations, or repetitive oversized cards.

Use realistic imagery of household appliances, electronics, tools, and equipment. Provide designed empty states when real records do not exist. Never present demo records as genuine user data.

Required application areas
Public landing page.
Registration, login, email verification, and account recovery.
Authenticated household dashboard.
Asset register with categories, search, filters, sorting, and pagination.
Asset detail pages with purchase information, serial numbers, documents, warranties, maintenance history, and repair costs.
Private document upload, preview, download, and deletion.
Warranty management with start dates, expiry dates, coverage details, and reminder preferences.
Maintenance schedules with one-time and recurring events.
Maintenance history and repair expense records.
Notifications and reminder preferences.
Household sharing with explicit roles and access permissions.
Repair professional directory and service quote requests.
Business accounts and provider verification.
Premium and business subscription management.
User profile, privacy controls, data export, and account deletion.
Separate administrative area with a separate admin identity system.
Help, privacy policy, terms, contact, and support reporting.
Essential user journeys

A new user must be able to register, verify an account, add an asset, attach a purchase receipt, record a warranty, create a maintenance schedule, receive a reminder, record a repair, and inspect the asset's history.

A user must be able to search and filter assets, correct mistakes, replace documents, manage notification preferences, and export their own records.

A household owner must be able to invite another member and control whether that member can view, add, edit, or manage shared assets.

A customer must be able to request a repair quote and review provider responses without surrendering control of their private asset documents.

A business must be able to register, submit verification information, manage its public profile, respond to quote requests, and manage a paid subscription once billing is enabled.

An administrator must be able to review providers, handle reports, suspend abusive accounts, manage support cases, inspect audit events, and review subscription status without unrestricted access to private customer documents.

Security requirements

Use Supabase Auth or an equivalent trusted authentication service. Apply server-side authorization and PostgreSQL Row Level Security to every private table.

Validate ownership or household membership on every operation. Use least-privilege service credentials, prepared queries where applicable, schema validation, request size limits, rate limiting, secure upload validation, and private storage policies.

Never trust user IDs, prices, subscription states, payment references, or role claims supplied by the browser.

Protect state-changing endpoints against CSRF where cookie-based authentication is used. Verify payment transactions server-side, make webhook processing idempotent, and verify webhook signatures.

Keep sensitive files private. Use short-lived signed URLs where appropriate. Do not expose database service-role credentials in the browser.

Implement account deletion, export, consent, privacy disclosures, audit logging, backups, and recovery procedures.

Engineering standards

Use a modular component architecture, reusable form controls, consistent error handling, typed or schema-validated API contracts, database migrations, indexes, and automated tests.

Every visible control must have a real action. Forms must validate input and provide actionable feedback. Loading, empty, error, success, permission-denied, and offline states must be designed intentionally.

Keep sample data isolated from production. Include setup documentation, migration instructions, environment variable documentation, deployment instructions, and a README.

Delivery approach

Build in phases: foundation, authentication, asset management, warranties and maintenance, reminders, household sharing, service marketplace, billing, administration, and production hardening.

Do not attempt to implement every feature in one unreviewed code-generation pass. Complete one phase, run tests, verify its acceptance criteria, and then continue.

The final application must be responsive, accessible, secure, usable on low-cost Android devices, and ready for controlled production testing. Do not claim a feature is complete until its end-to-end workflow has been tested.

2. PRD: Product Requirements Document
2.1 Product vision

LifeLedger NG becomes a trusted digital record of the items a household owns and the work required to maintain them.

The first target market is Nigerian households that own multiple valuable items, including smartphones, laptops, televisions, refrigerators, generators, air conditioners, furniture, and household equipment.

2.2 Problems being solved

Lost receipts and warranty documents.

Forgotten warranty expiry dates.

Missed servicing and maintenance.

Poor visibility into cumulative repair expenses.

Repeatedly explaining repair history to different technicians.

Difficulty keeping household records in one place.

Small repair businesses lacking simple customer-service history tools.

2.3 Target users

Household owner

Registers assets, tracks documents, and manages maintenance. This is the primary MVP user.

Family or household member

Accesses shared household records according to permissions.

Repair professional

Manages service requests, customer equipment history shared with permission, quotes, and job records.

Retailer or service business

Registers customer purchases or warranties with customer consent and uses the business dashboard.

2.4 Functional requirements

ID

	

Requirement

	

Priority




FR-01

	

Account registration and recovery

	

P0




FR-02

	

Create, edit, archive, and search assets

	

P0




FR-03

	

Upload and privately retrieve documents

	

P0




FR-04

	

Record warranties and expiry dates

	

P0




FR-05

	

Create maintenance schedules

	

P0




FR-06

	

Record completed maintenance and repair expenses

	

P0




FR-07

	

Dashboard with real database totals

	

P0




FR-08

	

Email and in-app reminders

	

P1




FR-09

	

Household sharing and roles

	

P1




FR-10

	

Data export and account deletion

	

P1




FR-11

	

Repair directory and quote requests

	

P1




FR-12

	

Business portal and subscriptions

	

P2




FR-13

	

Paystack billing and webhook processing

	

P2




FR-14

	

Advanced document extraction and AI-assisted entry

	

P3

P0 denotes the initial release requirements. P1 and later features should be introduced after the foundational workflows are stable.

2.5 Non-functional requirements

Responsive from small mobile screens through desktop.

Support keyboard navigation and accessible form labels.

Use paginated data access rather than loading every asset at once.

Keep document uploads within configured size limits.

Maintain strict tenant isolation between households.

Handle interrupted network requests without silently losing user-entered data.

Record timestamps consistently and display them in the user's local time.

Provide clear failure states when external services are unavailable.

Meet an agreed performance budget and test against representative mobile devices.

Back up the database and periodically test restoration.

2.6 Success metrics

Measure actual behaviour rather than vanity metrics.

Registration-to-first-asset conversion.

Percentage of new users who register three or more assets.

Percentage who save a document or create a maintenance schedule.

Weekly and monthly returning users.

Reminder delivery and interaction rates.

Number of active, verified repair businesses.

Quote request-to-completed-job conversion.

Paid conversion, recurring revenue, cancellations, and support cost per customer.

Initial targets should be treated as hypotheses and adjusted after pilot testing.

3. MVP: Minimum Viable Product

The MVP should solve one complete problem exceptionally well: keeping track of household assets and their maintenance.

It should not launch with a half-built marketplace, AI receipt scanning, or complex billing before the core product works.

MVP release scope
Included in the first release
Register and manage household assets
Add product photographs and purchase details
Upload private receipts and warranty documents
Track warranty coverage and expiry
Create maintenance schedules and reminders
Record repair history and expenses
Search, filter, and sort assets
Responsive dashboard with real totals
Authentication and account recovery
Private document storage and authorization
Basic email notifications
Mobile navigation and installable PWA shell

0 of 12 requirements marked as reviewed. This checklist tracks planning, not actual implementation or testing.

Explicitly outside the initial MVP

AI-based receipt extraction.

Automatic manufacturer warranty verification.

Nationwide repair marketplace.

In-app payment for repair jobs.

Native Android and iOS applications.

Complex retailer integrations.

Predictive maintenance using machine learning.

These features can be introduced once the core product has demonstrated retention and user demand.

MVP acceptance criteria

The MVP is ready for pilot deployment only when:

A user can register, verify their account, and sign in.

A user can create, update, archive, and retrieve an asset.

An uploaded receipt is private and cannot be retrieved by another unauthorized user.

Warranty and maintenance dates are calculated correctly.

The dashboard reflects persisted database records, not hardcoded sample totals.

A scheduled reminder can be generated, delivered, and retried safely.

One household cannot read or change another household's records.

The interface works at mobile and desktop breakpoints.

Database migrations, backups, and restoration instructions have been tested.

Automated tests cover the most important user journeys and security boundaries.

4. EPR: Engineering and Product Requirements

For this project, EPR will mean the detailed engineering and product requirements that translate the PRD into implementable behaviour.

4.1 Authentication and onboarding

Registration with email and password.

Email verification before sensitive actions.

Login, logout, and password recovery.

Account profile with display name, preferred timezone, and notification preferences.

Optional Google sign-in if configured correctly.

Session expiry and reauthentication for sensitive account operations.

Onboarding flow:

Users should be able to skip optional details and complete onboarding later.

4.2 Asset management

Each asset should support:

Asset name and category.

Brand, model, serial number, and purchase date.

Purchase price and currency.

Seller and purchase location, if supplied.

Asset photograph.

Warranty details.

Notes and condition.

Associated documents.

Repair and maintenance history.

Created and updated timestamps.

Asset categories should include electronics, appliances, generators and power equipment, furniture, vehicles, tools, and other household possessions.

Users should be able to archive assets without destroying their historical records. Deletion should follow a clear confirmation and retention policy.

4.3 Warranty engine

The system should store warranty start and expiry dates, coverage details, provider information, and relevant documents.

Warranty status should be derived from stored dates and coverage rules, not manually entered status text.

Active: current date is within the coverage period.

Expiring soon: expiry falls within a configurable reminder window.

Expired: expiry date has passed.

Unknown: coverage dates are incomplete or unconfirmed.

The application must distinguish a recorded warranty from a warranty independently verified with a manufacturer. It must never promise that a claim will be accepted.

4.4 Maintenance engine

A maintenance schedule should contain:

Asset reference.

Task title and instructions.

Due date.

Optional recurrence interval.

Reminder lead time.

Priority.

Completion status.

Last completed date.

Next due date.

When a recurring task is completed, the next occurrence should be calculated from the agreed scheduling rule. Missed reminders should not generate unlimited duplicates.

4.5 Expense and repair tracking

Users should be able to record parts, labour, inspection charges, and other costs. Store amounts as integer minor currency units where appropriate, together with the currency code.

The asset detail page should show:

Original purchase cost.

Total recorded maintenance expenses.

Total recorded repair expenses.

Most recent service.

Complete service history.

These values represent user-entered records, not an independently verified market valuation.

4.6 Service provider workflow

This is a later release, but the architecture should support it.

Provider verification must be clearly explained and must not be represented as a guarantee against fraud. Reviews should be restricted to eligible customers and protected against obvious manipulation.

4.7 Notification requirements

The notification engine should support:

Warranty-expiry reminders.

Maintenance-due reminders.

Quote responses.

Job-status updates.

Subscription notices, once subscriptions exist.

Use a scheduled job that queries due reminders and creates idempotent notification records. Store delivery attempts and results, and retry temporary failures with bounded backoff.

Never send a private document or sensitive serial number in an email notification.

5. UI/UX design specification
5.1 Brand identity
LifeLedger NG

Your home. Your assets. Your records.

Forest

#123D2D

Emerald

#16845B

Sage

#E4F0E8

Ivory

#FAF8F1

The logo should be a real graphic mark combined with the wordmark. The leaf symbol above is a placeholder concept, not a completed brand asset.

5.2 Colour tokens

Token

	

Value

	

Application




brand-forest

	

#123D2D

	

Brand surfaces, sidebar, important headings




brand-emerald

	

#16845B

	

Primary actions, active navigation




brand-sage

	

#E4F0E8

	

Soft highlights and selected states




surface-main

	

#FAF8F1

	

Main application background




surface-card

	

#FFFFFF

	

Forms and content cards




text-primary

	

#252B27

	

Main text




text-muted

	

#747C76

	

Secondary labels




status-warning

	

#A65D12

	

Approaching deadlines




status-danger

	

#B42318

	

Errors and overdue items




status-success

	

#16845B

	

Completed tasks

Use emerald as an accent, not as the background of every component. Ensure status labels remain understandable without relying on colour alone.

5.3 Page inventory

Public pages

Landing
How It Works
Pricing
For Businesses
Help
Privacy
Terms

Authenticated pages

Dashboard
My Assets
Asset Details
Add Asset
Documents
Warranties
Maintenance
Expenses
Notifications
Household
Settings

Future business and admin pages

Provider Dashboard
Quote Management
Subscriptions
Provider Verification
Support
Audit Logs
5.4 Dashboard layout
LifeLedger NG
Good morning

Here's what's happening with your assets.

12

Registered assets

3

Upcoming tasks

2

Active warranties

1

Overdue task

Add your first asset

Keep its receipt, warranty and maintenance in one place.

Illustrative dashboard preview. Figures are sample data, not live records.

5.5 Interaction rules

Desktop: compact sidebar with a clearly highlighted active route.

Mobile: compact bottom navigation for Dashboard, Assets, Maintenance, and Profile, with secondary pages accessible through navigation.

Forms: clear labels, inline validation, visible required fields, and an explicit “Optional” label for nonessential fields.

Destructive actions: confirmation dialog with a clear explanation.

Data loading: skeletons or concise progress indicators.

Empty state: explain why the section is empty and provide the relevant next action.

Error state: preserve entered form values where safe and allow retry.

Success state: confirm what changed and where the user can find it.

Tables: searchable, filterable, and responsive; switch to a list or card layout on small screens where appropriate.

Images: display real, relevant product imagery with graceful fallbacks when an image is unavailable.

Accessibility: maintain adequate contrast, focus visibility, keyboard operation, and semantic HTML.

6. Technical architecture
6.1 System overview
6.2 Responsibilities

Layer

	

Responsibility




Vue 3

	

Screens, reusable components, forms, and interactions




Vite

	

Development server and production bundling




Vue Router

	

Public, authenticated, and protected routes




Tailwind CSS

	

Design tokens, layout, spacing, and responsive styling




Vanilla JavaScript

	

Date utilities, file handling helpers, and browser APIs




Supabase Auth

	

Identity, email verification, and session management




Vercel Functions

	

Trusted API operations and server-side validation




PostgreSQL

	

Durable application records and relationships




Row Level Security

	

Enforce record access boundaries




Private Storage

	

Receipt, invoice, and warranty file storage




Scheduled jobs

	

Due reminders, retry processing, and maintenance tasks




GitHub + Vercel

	

Version control, preview deployments, and production releases

6.3 Serverless API design

Use modular endpoints rather than one oversized API function.

Method

	

Endpoint

	

Purpose




GET

	

/api/assets

	

List assets with pagination and filters




POST

	

/api/assets

	

Create an asset




GET

	

/api/assets/:id

	

Retrieve authorized asset details




PATCH

	

/api/assets/:id

	

Update an asset




DELETE

	

/api/assets/:id

	

Archive or delete according to policy




POST

	

/api/documents/upload-url

	

Request an authorized upload




GET

	

/api/assets/:id/documents

	

List authorized asset documents




POST

	

/api/warranties

	

Create a warranty record




PATCH

	

/api/warranties/:id

	

Update a warranty




POST

	

/api/maintenance

	

Create a maintenance schedule




POST

	

/api/maintenance/:id/complete

	

Complete a scheduled task




GET

	

/api/expenses

	

List authorized expense records




POST

	

/api/expenses

	

Record an expense




GET

	

/api/dashboard

	

Retrieve dashboard summaries




POST

	

/api/notifications/preferences

	

Update reminder preferences




POST

	

/api/cron/reminders

	

Process due reminders with verified job authorization

These are proposed contracts. The implementation should define request schemas, response schemas, pagination, validation errors, authentication requirements, and authorization rules for every endpoint.

For asset and document mutations, the server must derive the acting user from a verified session or access token. It must never accept an arbitrary user_id from the browser as proof of ownership.

6.4 Example request and response

Creating an asset:

{
  "name": "Samsung Refrigerator",
  "category": "appliances",
  "brand": "Samsung",
  "model": "Example Model",
  "purchase_date": "2026-04-15",
  "purchase_price_minor": 45000000,
  "currency": "NGN"
}

The example price represents ₦450,000 when the amount is stored in kobo. Production code must validate safe integer ranges and currency-specific precision.

Successful response:

{
  "data": {
    "id": "generated-asset-uuid",
    "name": "Samsung Refrigerator",
    "category": "appliances",
    "currency": "NGN",
    "created_at": "2026-10-09T10:00:00Z"
  }
}

The UUID and timestamp above illustrate the response shape. Real values must come from the server and database.

Use consistent error responses, for example:

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "name": "Enter an asset name."
    }
  }
}

Never return SQL details, private storage paths, stack traces, or internal secrets to the client.

7. Database design

Use Supabase PostgreSQL with UUID primary keys, foreign keys, indexes, migrations, and explicit Row Level Security policies.

7.1 Core tables

Table

	

Main fields




profiles

	

id, display_name, timezone, created_at




households

	

id, name, owner_id, created_at




household_members

	

household_id, user_id, role, created_at




assets

	

id, household_id, name, category, brand, model, serial_number, purchase_date, purchase_price_minor, currency, archived_at




asset_documents

	

id, asset_id, storage_key, document_type, original_filename, mime_type, size_bytes, uploaded_by




warranties

	

id, asset_id, provider_name, starts_on, expires_on, coverage_notes




maintenance_schedules

	

id, asset_id, title, due_at, recurrence_rule, reminder_days, is_active




maintenance_logs

	

id, schedule_id, asset_id, completed_at, notes, cost_minor, currency




expenses

	

id, asset_id, expense_type, amount_minor, currency, occurred_at, notes




notifications

	

id, user_id, type, scheduled_at, status, attempt_count, delivered_at




notification_preferences

	

user_id, email_enabled, push_enabled, reminder_preferences




service_providers

	

id, owner_user_id, business_name, service_categories, verification_status




service_requests

	

id, household_id, asset_id, description, status, created_at




service_quotes

	

id, request_id, provider_id, amount_minor, currency, status




subscriptions

	

id, account_id, plan_id, provider, status, current_period_end




payments

	

id, account_id, provider_reference, amount_minor, currency, status




admin_users

	

id, auth_user_id, role, is_active




audit_logs

	

id, actor_id, action, resource_type, resource_id, created_at

The full implementation should also include subscription plans, webhook event records, household invitations, provider reviews, support cases, and any additional join tables needed by the selected workflows.

7.2 Relationship model
7.3 Data integrity rules

Asset records must reference an existing household.

Household membership and role must be checked before accessing an asset.

Document records must reference an authorized asset.

Warranty dates must be valid and logically ordered.

Expense amounts must be nonnegative unless a specific adjustment model explicitly permits otherwise.

Currency must be recorded for each monetary amount.

Payment provider references must be unique.

Webhook events must be deduplicated.

Maintenance completion and next-occurrence calculation must be performed transactionally where supported.

Deleting an account must not silently corrupt financial records or other household members' data.

7.4 Row Level Security

Enable RLS on every table exposed to the client through Supabase APIs.

For example, asset access should require a valid household membership. However, write access should not be granted to every member merely because they belong to a household. Separate policies should determine who can view, create, edit, archive, or manage assets.

Use database constraints and policies as well as application-level checks. Hiding a button in Vue is not authorization.

For administrative operations, use a separate, narrowly privileged administrative API. Never expose a service-role key in frontend code.

8. Document upload architecture

Receipts and warranty documents are central to LifeLedger, so file handling needs its own security model.

Validate the user's session and verify that the user can upload to the target asset.
Apply file size limits and an allowlist of accepted formats, such as JPEG, PNG, and PDF.
Validate file signatures and MIME type. Do not trust the extension supplied by the browser.
Generate a random storage key rather than using the original filename as the path.
Upload into a private storage bucket and associate the object with an authorized database record.
Use short-lived signed URLs or an authorized download endpoint for document access.
Handle failed uploads and database writes so orphaned files can be cleaned up safely.

Recommended starting policy: accept common image formats and PDFs, with a configurable limit such as 10 MB per file. Test limits against actual Vercel and storage provider constraints before launch.

For MVP reliability, users can upload a receipt photograph manually. Automated OCR can come later.

9. Security, privacy, and compliance
9.1 Threat model

Risk

	

Required mitigation




Unauthorized asset access

	

Household-level authorization and RLS




Private document leakage

	

Private buckets, signed URLs, access checks




Account takeover

	

Email verification, secure recovery, rate limiting




Malicious file uploads

	

Type and signature checks, size limits, safe storage




Forged payment callbacks

	

Signature verification and server-side payment verification




Duplicate payment processing

	

Unique references and idempotent webhook handling




Admin abuse

	

Separate admin roles, least privilege, audit trails




Data loss

	

Automated backups and restoration tests




API abuse

	

Rate limiting, validation, bounded pagination




Leaked credentials

	

Vercel environment variables, secret rotation, GitHub secret scanning

9.2 Privacy rules

Collect only the personal information necessary for the product.

Explain what data is collected and why.

Obtain appropriate consent before sharing customer information with a repair business.

Do not publish serial numbers, receipts, addresses, or household asset details.

Provide an export and account-deletion workflow.

Establish retention periods for records, backups, and audit events.

Publish a privacy policy and terms before public launch.

Review applicable Nigerian data-protection requirements, including the Nigeria Data Protection Act, with qualified guidance where necessary.

9.3 Operational controls

The application should have separate development, preview, and production environments. Production secrets must not be copied into local test files or preview deployments without a clear need.

Database migrations should be version-controlled and tested before deployment. Backups must be recoverable, not merely enabled.

10. Monetization and business plan

LifeLedger should start with a free household tool and introduce paid products when users have a reason to return.

Free plan

Asset register, basic warranty tracking, maintenance reminders, and limited document storage.

Purpose: user acquisition and retention.

LifeLedger Plus

Proposed ₦1,000–₦2,000 monthly for expanded storage, household sharing, reports, and advanced reminders.

Validate willingness to pay before implementing billing.

LifeLedger Business

Proposed ₦5,000–₦15,000 monthly for customer records, repair history, job management, warranty registration, and reminders.

Target: repair shops, electronics retailers, and appliance businesses.

Referral revenue

Charge a disclosed fee for qualified repair enquiries or completed referrals, based on agreements with providers.

Start with manual referral tracking before automating commissions.

Revenue validation example
Illustrative monthly recurring revenue

Example revenue at hypothetical subscriber counts and proposed prices. Not a forecast.

₦0
₦80K
₦160K
₦240K
₦320K
100 households
30 businesses
Combined

At 100 household subscribers paying ₦1,500 per month and 30 business subscribers paying ₦5,000 per month, the combined total is ₦300,000 in gross monthly recurring revenue. It excludes costs, taxes, cancellations, payment charges, and other operating expenses.

The business should validate retention and willingness to pay before committing to premium infrastructure or paid acquisition.

11. GitHub, Vercel, and deployment architecture
11.1 Repository strategy

Use one repository initially:

lifeledger-ng

Recommended branches:

main: production-ready code.

develop: integration branch if the team needs it.

feature/*: individual features.

fix/*: bug fixes.

For a solo developer, short-lived feature branches with preview deployments may be sufficient. Do not create a complex branching model without a team need.

11.2 Deployment sequence
Create the GitHub repository and establish the Vite project.
Configure Tailwind CSS, routing, reusable components, linting, and automated tests.
Create a Supabase project and apply version-controlled SQL migrations.
Configure authentication, redirect URLs, storage buckets, and RLS policies.
Connect the GitHub repository to Vercel and configure the project root and build settings.
Set environment variables separately for development, preview, and production.
Deploy a preview build, test real user workflows, and resolve errors.
Deploy to production after acceptance tests and security checks pass.
11.3 Environment configuration

Document the following variables in a safe example file, without real credentials:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=
EMAIL_PROVIDER_API_KEY=
PAYSTACK_SECRET_KEY=
CRON_SECRET=

Only variables intentionally prefixed with VITE_ should be exposed to the browser bundle. The Supabase public client key is not a substitute for authorization; RLS must still enforce access.

Keep service-role credentials, database connection strings, payment secrets, and cron authorization secrets exclusively on the server. Configure only the variables required by each deployed function.

Do not commit a populated .env file. Use local ignored configuration for development and Vercel's environment settings for deployment.

11.4 Vercel-specific constraints

Serverless functions have execution and payload limits, so large uploads should use authorized direct-to-storage uploads.

Scheduled functions need authorization, idempotency, and retry handling.

Background work should not depend on a long-running request staying alive.

Database connections must respect the selected PostgreSQL provider's connection limits.

Preview deployments must use appropriately isolated data and secrets.

The application must not assume it has persistent local disk storage between function invocations.

12. Testing and quality assurance

Testing is a release requirement, not an optional final step.

Test level

	

What to test




Unit tests

	

Date calculations, warranty status, currency formatting, recurring schedules




Component tests

	

Asset forms, validation, navigation, dialogs, loading and empty states




API tests

	

Authentication, schema validation, authorization, pagination, error handling




Database tests

	

Foreign keys, RLS, constraints, migrations, and tenant isolation




Integration tests

	

Asset creation, document uploads, reminders, repair records




End-to-end tests

	

Registration through the complete asset-management workflow




Security tests

	

Unauthorized access, malicious uploads, rate limits, privilege escalation




Mobile tests

	

Small-screen layouts, touch targets, keyboard behaviour, and weak connections




Deployment tests

	

Environment configuration, preview isolation, scheduled jobs, recovery

Use Vitest for unit and component testing, Vue Test Utils for Vue components, and Playwright for critical end-to-end workflows.

Minimum release gate:

No unresolved critical or high-severity security defects.

All core user journeys pass.

RLS tests demonstrate that one household cannot access another household's private data.

Private document access is tested with authorized and unauthorized users.

Reminder jobs do not send duplicate notifications on retry.

Payment handling, if enabled, is verified against duplicate and forged events.

The production build completes successfully.

Backup restoration has been demonstrated.

Do not report tests as passed unless they have actually been executed.

13. Final project folder structure

This structure keeps the Vue frontend, serverless API, database migrations, and operational documentation organized.

lifeledger-ng/
├── api/
│   ├── assets/
│   │   ├── index.js
│   │   └── [id].js
│   ├── warranties/
│   ├── maintenance/
│   ├── expenses/
│   ├── documents/
│   ├── notifications/
│   ├── providers/
│   ├── webhooks/
│   └── cron/
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.webmanifest
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── assets/
│   │   └── maintenance/
│   ├── layouts/
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── assets/
│   │   ├── warranties/
│   │   ├── maintenance/
│   │   ├── expenses/
│   │   └── settings/
│   ├── router/
│   ├── services/
│   ├── composables/
│   ├── stores/
│   ├── utils/
│   ├── styles/
│   ├── App.vue
│   └── main.js
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── tests/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── PRD.md
│   ├── MVP.md
│   ├── EPR.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── DESIGN_SYSTEM.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
├── .env.example
└── README.md

The API file layout should be adapted to Vercel's actual routing conventions and tested against the selected deployment configuration. Avoid creating empty files for features that have not been implemented.

14. Implementation roadmap

Phase 1: Design and foundation

First

Build the emerald design system, landing page, responsive navigation, authentication screens, and dashboard shell. Establish the repository, tests, and deployment pipeline.

Phase 2: Asset management

Implement authentication, household creation, asset CRUD, search, document uploads, database persistence, and RLS.

Phase 3: Warranties and maintenance

Implement expiry calculations, recurring schedules, repair logs, expense summaries, and notifications.

Phase 4: Commercial features

Introduce provider accounts, quote requests, business subscriptions, payment verification, and administrative workflows.

Phase 5: Production readiness

Complete authorization tests, accessibility checks, performance improvements, backups, monitoring, and the pilot launch.

15. Definition of done

LifeLedger NG is not complete just because the landing page looks good. The first production release must demonstrate that:

Users can manage real assets and retrieve them after signing out and back in.

Warranties, maintenance records, and expenses persist correctly.

Private documents remain private.

The emerald design is consistent across all screens.

Mobile and desktop layouts work without broken navigation or overflowing forms.

Serverless endpoints enforce authentication and authorization.

Database migrations and recovery procedures are documented.

Errors are logged without exposing sensitive information.

The README contains setup, deployment, and troubleshooting instructions.

The MVP acceptance tests pass.

16. The exact instruction to start development
Writing

Begin implementing LifeLedger NG using this specification as the source of truth.

Start with Phase 1 only. Create the actual Vue 3 and Vite project, configure Tailwind CSS, establish the emerald and warm-ivory design system, and build the responsive public landing page, authentication screens, application shell, and dashboard layout.

Use realistic household-product photography, practical typography, restrained emerald accents, clean forms, and responsive navigation. Avoid generic AI-generated dashboard aesthetics.

Use believable sample content only in an explicitly marked demo state. Do not claim database persistence, authentication, reminders, or payment integration exists until it is implemented and tested.

Set up GitHub-ready source files, linting, testing, environment configuration documentation, and Vercel deployment configuration. Document any external credentials or services required.

After Phase 1, run the production build, execute the available tests, report actual results, list unfinished items, and identify any configuration or deployment blockers.

Do not proceed to the next phase until the current phase meets its acceptance criteria. Preserve the agreed stack and design system throughout implementation. Do not introduce an alternative backend framework, unnecessary dependencies, or an unrelated visual redesign.