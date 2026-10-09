# LifeLedger NG — Deployment & Operations Runbook

**Environment Target**: Vercel + Supabase + Paystack  
**Single Source of Truth**: `prd.md` Section 11

---

## 1. Prerequisites

Before deploying LifeLedger NG to production, ensure you have:
1. **GitHub Repository**: [Lite360/lifeledger](https://github.com/Lite360/lifeledger)
2. **Vercel Project**: Linked to repository `main` branch.
3. **Supabase PostgreSQL Project**: Dedicated production cluster (in `eu-west-1` or closest low-latency region).
4. **Paystack Account**: Registered with test and live API keys.

---

## 2. Environment Variables Configuration

Configure the following variables in the Vercel Project Settings:

```env
# Client-Side Variables (Injected into Vite bundle)
VITE_SUPABASE_URL=https://your-production-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...your_production_anon_key

# Server-Side Variables (Vercel Functions only)
SUPABASE_SERVICE_ROLE_KEY=eyJh...your_service_role_key
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
PAYSTACK_SECRET_KEY=sk_live_...your_paystack_secret
CRON_SECRET=your_32_character_random_cron_secret
```

---

## 3. Database Migration Sequence

Apply migrations sequentially using the Supabase CLI or SQL Editor:

```bash
# 1. Apply Phase 2 Core Schema (Profiles, Households, Assets, Documents, Warranties, Maintenance)
psql "$SUPABASE_DB_URL" -f supabase/migrations/20261009000000_phase2_core_schema.sql

# 2. Apply Phase 4 Commercial & Marketplace Schema (Providers, Quotes, Subscriptions, Payments, Audit Logs)
psql "$SUPABASE_DB_URL" -f supabase/migrations/20261009000001_phase4_commercial_schema.sql

# 3. Optional: Seed benchmark Nigerian appliance records for verification testing
psql "$SUPABASE_DB_URL" -f supabase/seed.sql
```

---

## 4. Vercel Production Build

Vercel will automatically build the project on every commit pushed to `main`. To test locally:

```bash
# Clean install dependencies
npm ci

# Execute unit and integration test suite
npm test -- --run

# Compile production bundle
npm run build

# Preview compiled build locally
npm run preview
```

---

## 5. Paystack Webhook Configuration

1. In Paystack Dashboard > Settings > API & Webhooks:
   - Set **Webhook URL** to: `https://your-domain.vercel.app/api/webhooks/paystack`
2. Ensure Vercel Function validates `x-paystack-signature` using HMAC SHA-512 against `PAYSTACK_SECRET_KEY`.
