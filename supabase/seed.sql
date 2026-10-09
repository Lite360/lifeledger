-- ====================================================================
-- LifeLedger NG: Phase 2 Seed Data (Nigerian Household Benchmark)
-- ====================================================================

-- Dummy User Profile
INSERT INTO public.profiles (id, display_name, phone, state_location, timezone)
VALUES 
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Babatunde Adeleke', '+2348031234567', 'Lagos', 'Africa/Lagos')
ON CONFLICT (id) DO NOTHING;

-- Household
INSERT INTO public.households (id, name, owner_id, currency)
VALUES 
  ('h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c', 'Adeleke Household (Lekki Phase 1)', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'NGN')
ON CONFLICT (id) DO NOTHING;

-- Membership
INSERT INTO public.household_members (household_id, user_id, role)
VALUES 
  ('h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'owner')
ON CONFLICT (household_id, user_id) DO NOTHING;

-- Assets
INSERT INTO public.assets (id, household_id, name, category, brand, model, serial_number, location, purchase_date, purchase_price_minor, currency, store, notes)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c', 'Mikano 10kVA Soundproof Generator', 'power', 'Mikano / Perkins', 'MK-10SP-2024', 'MK-NG-98842-X', 'Generator Shed', '2024-03-15', 485000000, 'NGN', 'Mikano International VI', 'Diesel backup for grid outages. Service interval every 250 hours.'),
  ('22222222-2222-2222-2222-222222222222', 'h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c', 'Felicity 5kVA Solar Inverter & 10kWh Battery', 'power', 'Felicity Solar', 'FL-IVP-5048-Li', 'FEL-2024-884102', 'Utility Inverter Room', '2024-07-20', 320000000, 'NGN', 'Pragmatic Energy Ikeja', 'Rooftop solar and LiFePO4 battery pack.'),
  ('33333333-3333-3333-3333-333333333333', 'h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c', 'LG 1.5HP Dual Inverter Split AC', 'cooling', 'LG Electronics', 'GENCOOL-B246', 'LG-AC-7734199-NG', 'Master Bedroom', '2025-10-25', 58000000, 'NGN', 'Fouani Palms Mall', 'Low-voltage and generator mode enabled.')
ON CONFLICT (id) DO NOTHING;

-- Warranties
INSERT INTO public.warranties (id, asset_id, provider_name, starts_on, expires_on, coverage_notes)
VALUES
  ('w1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Mikano 1-Year Manufacturer Warranty', '2024-03-15', '2025-03-15', 'Covers alternator and engine block defects.'),
  ('w2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Felicity 5-Year Battery Warranty', '2024-07-20', '2029-07-20', '6,000 cycles guarantee at 80% DOD.')
ON CONFLICT (id) DO NOTHING;
