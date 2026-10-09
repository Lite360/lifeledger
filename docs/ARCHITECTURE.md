# LifeLedger NG — System Architecture

**Single Source of Truth**: `prd.md`  
**Identity**: *Know what you own. Remember what it needs. Protect its value.*

---

## 1. Architectural Philosophy
LifeLedger NG is engineered as a modern, decoupled serverless web application specifically tailored for Nigerian households and repair enterprises. It eschews complex, monolithic backend servers in favor of:
1. **Client-Side SPA**: Vue 3 + Vite with Composition API, Vanilla JavaScript utilities, and Tailwind CSS emerald/forest design system tokens.
2. **Persistence & Security Layer**: Supabase PostgreSQL with strict Row Level Security (RLS) on all exposed tables.
3. **Serverless Functions**: Vercel Functions for webhook ingestion (Paystack payment signatures) and cron jobs (reminder dispatching).
4. **Billing & Commerce**: Paystack integration for recurring subscriptions and transaction logging in Nigerian Naira (`NGN`).

```
+-----------------------------------------------------------------------------------+
|                                Client Layer (Vue 3 + Vite)                        |
|   - Marketing & Legal Pages     - Asset Register & 10MB Document Uploads          |
|   - Household Dashboard Shell   - Recurrence Maintenance Scheduler (250h, Q, A)   |
|   - Warranties Engine           - Vetted Technician Directory & Quote Bidding     |
|   - Expense Cost Analytics      - Paystack Checkout Modal & Subscription Hub      |
+-----------------------------------------+-----------------------------------------+
                                          |
                      +-------------------+-------------------+
                      |                                       |
                      v                                       v
+-------------------------------------+   +---------------------------------------+
|    Supabase PostgreSQL & Storage    |   |     Vercel Serverless & Cron Hub      |
|  - 12 Relational Tables             |   |  - Paystack Webhook Ingestion         |
|  - Strict Row Level Security (RLS)  |   |  - Cryptographic Signature Checks     |
|  - Encrypted Private Document Store |   |  - Daily Reminder Cron Processing     |
|  - Performance B-Tree & GIN Indexes |   |  - Administrative Verification Desk   |
+-------------------------------------+   +---------------------------------------+
```

---

## 2. Technology Stack Mapping

| Layer | Technology | Justification & Role |
| :--- | :--- | :--- |
| **Frontend Framework** | Vue 3 (Composition API) | High reactivity, clean component separation, efficient bundle size. |
| **Build Tool** | Vite | Instant HMR, fast production bundling with Rolldown/Rollup. |
| **Styling** | Tailwind CSS | Curated HSL emerald/forest design tokens without ad-hoc utility sprawl. |
| **Icons** | Lucide Icons / Clean SVGs | Consistent visual clarity across high-density equipment dashboards. |
| **Router** | Vue Router 4 | Client-side HTML5 history routing with automatic meta title management. |
| **Database** | Supabase PostgreSQL 15+ | UUID keys, relational foreign keys, transactional migrations, and native RLS. |
| **Object Storage** | Supabase Storage | Private buckets with 10MB file limit for receipts and warranty certificates. |
| **Billing Engine** | Paystack | Primary payment gateway for debit card and virtual bank accounts in Nigeria. |
| **Hosting & CI/CD** | GitHub + Vercel | Automatic deployments on `main` push, edge CDN caching, and security headers. |

---

## 3. Core Subsystems

### 3.1 Household Asset Ledger
- Stores equipment details: name, brand, model, serial number, purchase location (e.g. SIMS, Fouani, Mikano, Jumia), purchase cost in Naira, and photo.
- Validates 10MB document uploads (`application/pdf`, `image/jpeg`, `image/png`, `image/webp`).
- Provides category-based sorting: Power & Inverters, Cooling & HVAC, Kitchen & Refrigeration, Entertainment & Tech, and Home Appliances.

### 3.2 Preventive Maintenance Engine
- Supports Nigerian equipment realities: 250-hour diesel generator servicing, quarterly AC chemical washes, and semi-annual solar battery inspections.
- Transactionally computes the next occurrence upon task completion and logs the expense record into the asset history.

### 3.3 Warranty Tracker & Claims Hub
- Dynamically derives warranty status based on real calendar timestamps:
  - **Active**: Current date is within the coverage window.
  - **Expiring Soon**: Expiry date is within 30 days.
  - **Expired**: Expiry date has passed.
  - **No Warranty**: Incomplete or unrecorded warranty dates.

### 3.4 Commercial Marketplace & Quotes
- **Service Provider Directory**: Filtered by Nigerian specialty and location (Lagos, Abuja, Port Harcourt, Ibadan).
- **Quote Requests**: Household initiates a request linked to an asset without disclosing private serial numbers or purchase receipts to third parties.
- **Side-by-Side Comparison**: Review quotes by price in Naira, turnaround time, and warranty offered before authorizing work.

### 3.5 Paystack Subscriptions
- Pricing tiers: Free Household (₦0), LifeLedger Plus (₦1,500/mo or ₦15,000/yr), Business Starter (₦4,500/mo), and Business Pro (₦8,500/mo).
- Interactive checkout modal supporting Debit Cards and Nigerian Virtual Bank Transfers.
