# LifeLedger NG — Household Ledger & Maintenance Platform

> **Know what you own. Remember what it needs. Protect its value.**

LifeLedger NG is a household asset, warranty, maintenance, and expense management platform built specifically for Nigerian homes, estates, and repair businesses. It helps households organize appliances, solar systems, and generators, preserve receipts, track warranties, schedule maintenance intervals, and log repair costs in one reliable place.

**Repository**: [Lite360/lifeledger](https://github.com/Lite360/lifeledger)  
**Single Source of Truth**: `prd.md`

---

## 🟢 Visual Identity & Design System

LifeLedger NG uses an emerald-green and warm-ivory visual identity:

- **Forest Green (`#123D2D`)**: Brand surfaces, sidebar, primary headers
- **Primary Emerald (`#16845B`)**: Primary call-to-actions, active links, verified partner badges
- **Soft Sage (`#E4F0E8`)**: Subtle highlights, status badges, highlighted cards
- **Warm Ivory (`#FAF8F1`)**: Application background
- **Card Surface (`#FFFFFF`)**: Interactive containers and forms
- **Charcoal (`#252B27`)**: High-contrast readable body typography
- **Muted Grey (`#747C76`)**: Helper copy and secondary labels

---

## 🛠 Technology Stack

- **Frontend**: Vue 3 (Composition API) + Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4 (HTML5 History Mode)
- **Database & Auth**: Supabase PostgreSQL 15+ with Row Level Security (RLS)
- **Object Storage**: Private storage buckets for 10MB document uploads
- **Payment Gateway**: Paystack (Debit Cards & Nigerian Virtual Bank Accounts)
- **PWA**: Installable web manifest (`/manifest.webmanifest`)
- **Testing**: Vitest + Vue Test Utils + jsdom (**59 tests passing**)
- **Deployment**: Vercel Serverless with production security headers

---

## 📋 Implementation Roadmap Status (Phases 1 — 5 Complete)

| Phase | Title | Scope & Delivery Status |
| :--- | :--- | :--- |
| **Phase 1** | **Design & Foundation** | Emerald design system tokens, responsive marketing views (`/`, `/how-it-works`, `/pricing`, `/help`, `/privacy`, `/terms`), auth views (`/auth/login`, `/register`, `/verify-email`, `/forgot-password`), and dashboard shell. |
| **Phase 2** | **Asset Management & Schema** | Supabase PostgreSQL schema with RLS (`20261009000000_phase2_core_schema.sql`), seed dataset, reactive asset service, full CRUD, search, and 10MB document validation. |
| **Phase 3** | **Warranties & Maintenance** | Recurrence rules calculator (250-hour, monthly, quarterly, annual), transactional completion with auto-advancing next due dates, warranty claim hub, and YTD expense calculations in Naira. |
| **Phase 4** | **Commercial Features** | Vetted technician directory (`/directory`), quote requests (`/quotes`), business portal (`/business/portal`), Paystack billing (`/billing`), and administrative verification desk (`/admin`). |
| **Phase 5** | **Production Readiness** | Tenant isolation and end-to-end integration tests, PWA installable web manifest, security headers (`vercel.json`), operational runbooks in `docs/`, and disaster recovery backup runbook. |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Lite360/lifeledger.git
cd lifeledger

# Install dependencies
npm install
```

### 3. Local Development
```bash
# Start local Vite development server
npm run dev
```

Visit `http://localhost:5173` (or the indicated port) in your browser.

### 4. Running Automated Tests
```bash
# Run all unit, component, and tenant isolation integration tests (59 tests)
npm test -- --run
```

### 5. Production Build
```bash
# Compile and validate production bundle
npm run build

# Preview compiled build locally
npm run preview
```

---

## 📁 Project Structure

```
lifeledger/
├── docs/                                 # Production architecture & operational runbooks
│   ├── ARCHITECTURE.md                  # System architecture & component mapping
│   ├── DATABASE.md                      # Schema, RLS policies, and backup restore runbook
│   ├── SECURITY.md                      # Threat model, NDPR compliance, upload sanitization
│   └── DEPLOYMENT.md                    # Vercel, Supabase, and Paystack deployment runbook
├── public/                              # Static icons, favicons, and manifest
│   ├── favicon.svg                      # Brand leaf icon
│   └── manifest.webmanifest             # PWA installation manifest
├── src/
│   ├── components/
│   │   ├── assets/                      # AddAssetModal.vue, AssetCard.vue
│   │   ├── billing/                     # PaystackCheckoutModal.vue
│   │   ├── common/                      # AppHeader, AppSidebar, MobileBottomNav, Navbar, Footer
│   │   └── quotes/                      # RequestQuoteModal.vue
│   ├── composables/                     # useAuth.js, etc.
│   ├── layouts/                         # PublicLayout.vue, AppLayout.vue
│   ├── pages/
│   │   ├── admin/                       # AdminPage.vue (Verification & Audit Console)
│   │   ├── assets/                      # AssetsPage.vue
│   │   ├── auth/                        # LoginPage, RegisterPage, ForgotPassword, VerifyEmail
│   │   ├── billing/                     # BillingPage.vue (Subscriptions & Invoices)
│   │   ├── business/                    # BusinessPortalPage.vue (Technician Hub)
│   │   ├── dashboard/                   # DashboardPage.vue
│   │   ├── directory/                   # ProvidersPage.vue (Service Directory)
│   │   ├── expenses/                    # ExpensesPage.vue
│   │   ├── maintenance/                 # MaintenancePage.vue
│   │   ├── public/                      # LandingPage, HowItWorks, Pricing, Help, Privacy, Terms
│   │   ├── quotes/                      # QuotesPage.vue
│   │   ├── settings/                    # SettingsPage.vue
│   │   └── warranties/                  # WarrantiesPage.vue
│   ├── router/                          # Vue Router configuration
│   ├── services/                        # Reactive repositories: asset, provider, quote, sub, admin
│   └── utils/                           # Formatters (formatNaira, calculateWarrantyStatus, etc.)
├── supabase/
│   ├── migrations/
│   │   ├── 20261009000000_phase2_core_schema.sql
│   │   └── 20261009000001_phase4_commercial_schema.sql
│   └── seed.sql                         # Benchmark Nigerian household dataset
├── tests/
│   ├── integration/                     # Tenant isolation & end-to-end user journeys
│   └── unit/                            # Services, formatters, and component unit tests
├── index.html                           # Single-page application HTML entry
├── vercel.json                          # Vercel deployment & security headers configuration
└── vite.config.js                       # Vite build configuration
```

---

## 🔒 Security & NDPR Compliance

- **Row Level Security (RLS)**: Enforced on all PostgreSQL tables. Households cannot access other households' assets, warranties, or receipts.
- **Document Protection**: Receipts and invoices are restricted to authorized household members; quote requests never disclose equipment serial numbers or private documents to third parties.
- **Paystack Webhook Verification**: Cryptographic HMAC SHA-512 signatures validate payment events.

---

## 📄 License & Attribution

Copyright &copy; 2026 LifeLedger NG. All rights reserved.
