# LifeLedger NG — Database Architecture & Runbook

**Standard**: PostgreSQL 15+ / Supabase  
**Security**: Row Level Security (RLS) enabled on all tables

---

## 1. Schema Overview

The database uses UUID v4 primary keys across all entities, strictly isolating tenant households from one another.

### 1.1 Core Tables

1. **`profiles`**
   - Extends Supabase `auth.users`.
   - Fields: `id UUID PK`, `display_name TEXT`, `phone TEXT`, `state_location TEXT`, `timezone TEXT`, `created_at TIMESTAMPTZ`.

2. **`households`**
   - Primary ownership container for asset records.
   - Fields: `id UUID PK`, `name TEXT`, `owner_id UUID FK(profiles.id)`, `currency TEXT DEFAULT 'NGN'`, `created_at TIMESTAMPTZ`.

3. **`household_members`**
   - RBAC roles for family members or shared properties.
   - Fields: `household_id UUID PK`, `user_id UUID PK`, `role TEXT ('owner'|'admin'|'member'|'viewer')`, `created_at TIMESTAMPTZ`.

4. **`assets`**
   - Physical equipment records.
   - Fields: `id UUID PK`, `household_id UUID FK`, `name TEXT`, `category TEXT`, `brand TEXT`, `model TEXT`, `serial_number TEXT`, `location TEXT`, `purchase_date DATE`, `purchase_price_minor BIGINT`, `currency TEXT`, `store TEXT`, `notes TEXT`, `image_url TEXT`, `archived_at TIMESTAMPTZ`.

5. **`asset_documents`**
   - Private receipts, manuals, and warranty cards (10MB limit).
   - Fields: `id UUID PK`, `asset_id UUID FK`, `storage_key TEXT UNIQUE`, `document_type TEXT`, `original_filename TEXT`, `mime_type TEXT`, `size_bytes BIGINT`, `uploaded_by UUID FK`.

6. **`warranties`**
   - Manufacturer and store warranty coverage records.
   - Fields: `id UUID PK`, `asset_id UUID FK`, `provider_name TEXT`, `starts_on DATE`, `expires_on DATE`, `coverage_notes TEXT`.

7. **`maintenance_schedules`**
   - Recurring and one-time service routines.
   - Fields: `id UUID PK`, `asset_id UUID FK`, `title TEXT`, `due_at DATE`, `recurrence_rule TEXT`, `frequency TEXT`, `assigned_to TEXT`, `estimated_cost_minor BIGINT`, `is_active BOOLEAN`.

8. **`maintenance_logs`**
   - Completed work log with automatic next due-date calculation.
   - Fields: `id UUID PK`, `schedule_id UUID FK`, `asset_id UUID FK`, `completed_at TIMESTAMPTZ`, `notes TEXT`, `cost_minor BIGINT`, `performed_by TEXT`.

9. **`expenses`**
   - Lifetime and YTD expenditure records in Nigerian Naira (₦).
   - Fields: `id UUID PK`, `asset_id UUID FK`, `expense_type TEXT`, `amount_minor BIGINT`, `currency TEXT`, `occurred_at DATE`, `service_provider TEXT`, `notes TEXT`.

10. **`service_providers`**
    - Vetted technician directory and business profiles.
    - Fields: `id UUID PK`, `owner_user_id UUID FK`, `business_name TEXT`, `tagline TEXT`, `contact_person TEXT`, `phone TEXT`, `email TEXT`, `state_location TEXT`, `service_categories TEXT[]`, `verification_status TEXT ('unverified'|'pending_review'|'verified'|'suspended')`, `cac_number TEXT`, `rating NUMERIC`, `review_count INT`, `completed_jobs INT`.

11. **`service_requests` & `service_quotes`**
    - Repair bidding and quote management workflow between households and technicians.

12. **`subscriptions` & `payments`**
    - Commercial Paystack payment transactions and recurring household/business subscriptions.

---

## 2. Row Level Security (RLS) Implementation

All exposed tables have Row Level Security enforced at the PostgreSQL engine level.

```sql
-- Core Helper: Verify household membership
CREATE OR REPLACE FUNCTION public.check_is_household_member(
  lookup_household_id UUID, 
  allowed_roles TEXT[] DEFAULT ARRAY['owner', 'admin', 'member', 'viewer']
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.household_members
    WHERE household_id = lookup_household_id
      AND user_id = auth.uid()
      AND role = ANY(allowed_roles)
  );
$$;
```

---

## 3. Disaster Recovery & Backup Restoration Runbook

### 3.1 Creating a Point-in-Time Database Dump
```bash
# Dump complete schema and transactional data
pg_dump -h db.your-project.supabase.co \
        -U postgres \
        -d postgres \
        --clean \
        --if-exists \
        --no-owner \
        --no-privileges \
        -F p \
        -f backup_lifeledger_$(date +%Y%m%d_%H%M%S).sql
```

### 3.2 Testing Backup Restoration in Local/Staging Environment
```bash
# 1. Create a pristine test database
psql -U postgres -c "DROP DATABASE IF EXISTS lifeledger_restore_test;"
psql -U postgres -c "CREATE DATABASE lifeledger_restore_test;"

# 2. Restore the SQL dump
psql -U postgres -d lifeledger_restore_test -f backup_lifeledger_latest.sql

# 3. Verify table counts and tenant integrity
psql -U postgres -d lifeledger_restore_test -c "SELECT count(*) FROM public.assets;"
psql -U postgres -d lifeledger_restore_test -c "SELECT count(*) FROM public.service_providers;"
```
