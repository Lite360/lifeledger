-- ====================================================================
-- LifeLedger NG: Phase 4 Commercial & Marketplace Schema Migration
-- Standard: PostgreSQL 15+ / Supabase
-- Covers: Service Providers, Quotes, Subscriptions, Paystack Payments,
--         and Verification Audit Trails with Row Level Security (RLS)
-- ====================================================================

-- 1. Service Providers Directory
CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  tagline TEXT,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  state_location TEXT NOT NULL DEFAULT 'Lagos',
  address TEXT,
  service_categories TEXT[] NOT NULL DEFAULT ARRAY['power', 'cooling'],
  verification_status TEXT NOT NULL DEFAULT 'unverified' 
    CHECK (verification_status IN ('unverified', 'pending_review', 'verified', 'suspended')),
  cac_number TEXT,
  years_in_business INT DEFAULT 2 CHECK (years_in_business >= 0),
  rating NUMERIC(3,2) DEFAULT 4.80 CHECK (rating >= 1.0 AND rating <= 5.0),
  review_count INT DEFAULT 0 CHECK (review_count >= 0),
  completed_jobs INT DEFAULT 0 CHECK (completed_jobs >= 0),
  is_available BOOLEAN DEFAULT true,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Service Requests (Created by households)
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'normal' 
    CHECK (urgency IN ('low', 'normal', 'urgent', 'emergency')),
  status TEXT NOT NULL DEFAULT 'open' 
    CHECK (status IN ('open', 'quotes_received', 'in_progress', 'completed', 'cancelled')),
  target_provider_id UUID REFERENCES public.service_providers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Service Quotes (Submitted by technicians/businesses)
CREATE TABLE IF NOT EXISTS public.service_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  estimated_duration TEXT,
  warranty_offered TEXT,
  notes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Subscriptions (Household Plus & Business Tiers)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('household', 'business')),
  plan_id TEXT NOT NULL CHECK (plan_id IN ('free', 'plus', 'business_starter', 'business_pro')),
  billing_cycle TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  amount_minor BIGINT NOT NULL DEFAULT 0 CHECK (amount_minor >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  provider TEXT NOT NULL DEFAULT 'paystack',
  status TEXT NOT NULL DEFAULT 'active' 
    CHECK (status IN ('active', 'past_due', 'cancelled', 'trialing')),
  paystack_customer_code TEXT,
  paystack_subscription_code TEXT,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Payments (Paystack Transactions)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL,
  provider_reference TEXT NOT NULL UNIQUE,
  paystack_reference TEXT UNIQUE,
  amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  purpose TEXT NOT NULL CHECK (purpose IN ('subscription', 'quote_acceptance', 'service_fee')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  channel TEXT DEFAULT 'card',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Admin Users & Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'moderator' CHECK (role IN ('superadmin', 'moderator', 'support')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- Performance Indexes
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_providers_status ON public.service_providers(verification_status, state_location);
CREATE INDEX IF NOT EXISTS idx_providers_categories ON public.service_providers USING GIN(service_categories);
CREATE INDEX IF NOT EXISTS idx_requests_household ON public.service_requests(household_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotes_request ON public.service_quotes(request_id);
CREATE INDEX IF NOT EXISTS idx_quotes_provider ON public.service_quotes(provider_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_account ON public.subscriptions(account_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON public.payments(provider_reference);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Service Providers Policies
-- Any authenticated user can view verified service providers in directory
CREATE POLICY "Public can view verified providers"
  ON public.service_providers FOR SELECT
  USING (verification_status = 'verified' OR owner_user_id = auth.uid());

CREATE POLICY "Users can register as service provider"
  ON public.service_providers FOR INSERT
  WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY "Owners can update their provider profile"
  ON public.service_providers FOR UPDATE
  USING (owner_user_id = auth.uid());

-- 2. Service Requests Policies
-- Household members can view and create requests
CREATE POLICY "Household members can view their requests"
  ON public.service_requests FOR SELECT
  USING (
    public.check_is_household_member(household_id) 
    OR (status = 'open' AND auth.uid() IS NOT NULL)
  );

CREATE POLICY "Household members can create requests"
  ON public.service_requests FOR INSERT
  WITH CHECK (public.check_is_household_member(household_id, ARRAY['owner', 'admin', 'member']));

CREATE POLICY "Household members can update their requests"
  ON public.service_requests FOR UPDATE
  USING (public.check_is_household_member(household_id, ARRAY['owner', 'admin']));

-- 3. Service Quotes Policies
-- Household owners of the request and quoting providers can view quotes
CREATE POLICY "Users can view relevant quotes"
  ON public.service_quotes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_quotes.request_id 
        AND public.check_is_household_member(sr.household_id)
    )
    OR EXISTS (
      SELECT 1 FROM public.service_providers sp
      WHERE sp.id = service_quotes.provider_id 
        AND sp.owner_user_id = auth.uid()
    )
  );

CREATE POLICY "Providers can submit quotes"
  ON public.service_quotes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.service_providers sp
      WHERE sp.id = service_quotes.provider_id 
        AND sp.owner_user_id = auth.uid()
        AND sp.verification_status = 'verified'
    )
  );

-- 4. Subscriptions Policies
CREATE POLICY "Account owners can view their subscriptions"
  ON public.subscriptions FOR SELECT
  USING (
    public.check_is_household_member(account_id)
    OR EXISTS (
      SELECT 1 FROM public.service_providers sp 
      WHERE sp.id = subscriptions.account_id AND sp.owner_user_id = auth.uid()
    )
  );

-- 5. Payments Policies
CREATE POLICY "Account owners can view their payments"
  ON public.payments FOR SELECT
  USING (
    public.check_is_household_member(account_id)
    OR EXISTS (
      SELECT 1 FROM public.service_providers sp 
      WHERE sp.id = payments.account_id AND sp.owner_user_id = auth.uid()
    )
  );
