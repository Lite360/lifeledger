-- ====================================================================
-- LifeLedger NG: Phase 2 Database Schema Migration
-- Standard: PostgreSQL 15+ / Supabase
-- Security: Row Level Security (RLS) on all exposed tables
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  phone TEXT,
  state_location TEXT DEFAULT 'Lagos',
  timezone TEXT DEFAULT 'Africa/Lagos',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Households Table
CREATE TABLE IF NOT EXISTS public.households (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  currency TEXT NOT NULL DEFAULT 'NGN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Household Members Table (RBAC)
CREATE TABLE IF NOT EXISTS public.household_members (
  household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (household_id, user_id)
);

-- 5. Assets Table
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('power', 'cooling', 'kitchen', 'electronics', 'laundry', 'other')),
  brand TEXT NOT NULL,
  model TEXT,
  serial_number TEXT,
  location TEXT,
  purchase_date DATE NOT NULL,
  purchase_price_minor BIGINT NOT NULL CHECK (purchase_price_minor >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  store TEXT,
  notes TEXT,
  image_url TEXT,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Asset Documents Table (Receipts, Warranties, Manuals)
CREATE TABLE IF NOT EXISTS public.asset_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL UNIQUE,
  document_type TEXT NOT NULL CHECK (document_type IN ('receipt', 'warranty_card', 'manual', 'invoice', 'photo', 'other')),
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL CHECK (size_bytes > 0 AND size_bytes <= 10485760), -- max 10MB
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Warranties Table
CREATE TABLE IF NOT EXISTS public.warranties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  starts_on DATE NOT NULL,
  expires_on DATE NOT NULL,
  coverage_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_warranty_period CHECK (expires_on >= starts_on)
);

-- 8. Maintenance Schedules Table
CREATE TABLE IF NOT EXISTS public.maintenance_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_at DATE NOT NULL,
  recurrence_rule TEXT,
  frequency TEXT,
  assigned_to TEXT,
  estimated_cost_minor BIGINT DEFAULT 0 CHECK (estimated_cost_minor >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Maintenance Logs Table
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID REFERENCES public.maintenance_schedules(id) ON DELETE SET NULL,
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  notes TEXT,
  cost_minor BIGINT NOT NULL DEFAULT 0 CHECK (cost_minor >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  performed_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  expense_type TEXT NOT NULL,
  amount_minor BIGINT NOT NULL CHECK (amount_minor >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  occurred_at DATE NOT NULL,
  service_provider TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- Performance Indexes
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_households_owner ON public.households(owner_id);
CREATE INDEX IF NOT EXISTS idx_members_user ON public.household_members(user_id);
CREATE INDEX IF NOT EXISTS idx_assets_household ON public.assets(household_id);
CREATE INDEX IF NOT EXISTS idx_assets_category ON public.assets(category);
CREATE INDEX IF NOT EXISTS idx_assets_archived ON public.assets(archived_at);
CREATE INDEX IF NOT EXISTS idx_documents_asset ON public.asset_documents(asset_id);
CREATE INDEX IF NOT EXISTS idx_warranties_asset ON public.warranties(asset_id);
CREATE INDEX IF NOT EXISTS idx_warranties_expiry ON public.warranties(expires_on);
CREATE INDEX IF NOT EXISTS idx_maintenance_due ON public.maintenance_schedules(due_at, is_active);
CREATE INDEX IF NOT EXISTS idx_expenses_asset ON public.expenses(asset_id);

-- ====================================================================
-- RLS Helper Functions & Security Policies
-- ====================================================================

-- Helper: Check if user is member of household with minimum role
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

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- 2. Households Policies
CREATE POLICY "Members can view their households"
  ON public.households FOR SELECT
  USING (public.check_is_household_member(id));

CREATE POLICY "Users can create households"
  ON public.households FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update household"
  ON public.households FOR UPDATE
  USING (owner_id = auth.uid());

-- 3. Household Members Policies
CREATE POLICY "Members can view household members"
  ON public.household_members FOR SELECT
  USING (public.check_is_household_member(household_id));

CREATE POLICY "Owners and Admins can manage household members"
  ON public.household_members FOR ALL
  USING (public.check_is_household_member(household_id, ARRAY['owner', 'admin']));

-- 4. Assets Policies
CREATE POLICY "Members can view assets in their household"
  ON public.assets FOR SELECT
  USING (public.check_is_household_member(household_id));

CREATE POLICY "Owners, admins, and members can insert assets"
  ON public.assets FOR INSERT
  WITH CHECK (public.check_is_household_member(household_id, ARRAY['owner', 'admin', 'member']));

CREATE POLICY "Owners, admins, and members can update assets"
  ON public.assets FOR UPDATE
  USING (public.check_is_household_member(household_id, ARRAY['owner', 'admin', 'member']));

CREATE POLICY "Only owners and admins can delete or archive assets"
  ON public.assets FOR DELETE
  USING (public.check_is_household_member(household_id, ARRAY['owner', 'admin']));

-- 5. Asset Documents Policies
CREATE POLICY "Members can view documents for authorized assets"
  ON public.asset_documents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = asset_documents.asset_id 
      AND public.check_is_household_member(assets.household_id)
  ));

CREATE POLICY "Members can upload documents for authorized assets"
  ON public.asset_documents FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = asset_documents.asset_id 
      AND public.check_is_household_member(assets.household_id, ARRAY['owner', 'admin', 'member'])
  ));

CREATE POLICY "Members can delete documents for authorized assets"
  ON public.asset_documents FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = asset_documents.asset_id 
      AND public.check_is_household_member(assets.household_id, ARRAY['owner', 'admin'])
  ));

-- 6. Warranties Policies
CREATE POLICY "Members can view warranties"
  ON public.warranties FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = warranties.asset_id 
      AND public.check_is_household_member(assets.household_id)
  ));

CREATE POLICY "Members can modify warranties"
  ON public.warranties FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = warranties.asset_id 
      AND public.check_is_household_member(assets.household_id, ARRAY['owner', 'admin', 'member'])
  ));

-- 7. Maintenance & Expenses Policies
CREATE POLICY "Members can view maintenance schedules"
  ON public.maintenance_schedules FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = maintenance_schedules.asset_id 
      AND public.check_is_household_member(assets.household_id)
  ));

CREATE POLICY "Members can modify maintenance schedules"
  ON public.maintenance_schedules FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = maintenance_schedules.asset_id 
      AND public.check_is_household_member(assets.household_id, ARRAY['owner', 'admin', 'member'])
  ));

CREATE POLICY "Members can view expenses"
  ON public.expenses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = expenses.asset_id 
      AND public.check_is_household_member(assets.household_id)
  ));

CREATE POLICY "Members can modify expenses"
  ON public.expenses FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.assets 
    WHERE assets.id = expenses.asset_id 
      AND public.check_is_household_member(assets.household_id, ARRAY['owner', 'admin', 'member'])
  ));

-- Trigger: Automatically handle profile creation upon new user sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
