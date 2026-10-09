/**
 * LifeLedger NG - Subscription & Paystack Billing Service
 * Phase 4 Commercial Features
 * Single Source of Truth: prd.md (FR-12, FR-13, Section 10)
 */
import { reactive } from 'vue';
import { supabase, isSupabaseConfigured } from './supabase';
import { DEMO_HOUSEHOLD } from './demoData';

export const PLANS = [
  {
    id: 'free',
    name: 'Free Household',
    tier: 'household',
    priceMonthly: 0,
    priceAnnual: 0,
    currency: 'NGN',
    badge: 'Current Plan',
    description: 'Essential home inventory and reminder ledger for everyday Nigerian households.',
    features: [
      'Up to 10 registered household assets',
      'Document & receipt uploads (10MB limit)',
      'Basic warranty expiration reminders',
      'One-time maintenance scheduling',
      'Public service directory access',
    ],
    isPopular: false,
    ctaText: 'Current Plan',
  },
  {
    id: 'plus',
    name: 'LifeLedger Plus',
    tier: 'household',
    priceMonthly: 1500,
    priceAnnual: 15000,
    currency: 'NGN',
    badge: 'Most Popular',
    description: 'Advanced household management with multi-member collaboration and priority repair quotes.',
    features: [
      'Unlimited household assets & electronics',
      'Priority quote dispatch to verified technicians',
      'Multi-member household sharing & RBAC roles',
      'Advanced recurring maintenance rules (hours & intervals)',
      'Complete expense analytics & exportable PDF Passports',
      'Automated email & digest reminder notifications',
    ],
    isPopular: true,
    ctaText: 'Upgrade to Plus',
  },
  {
    id: 'business_starter',
    name: 'Business Starter',
    tier: 'business',
    priceMonthly: 4500,
    priceAnnual: 45000,
    currency: 'NGN',
    badge: 'For Technicians',
    description: 'For independent certified repair technicians and specialist installers.',
    features: [
      'Verified listing on LifeLedger Provider Directory',
      'Receive inbound quote requests from local households',
      'Job tracking & service quote issuance portal',
      'Customer service history logging',
      'Digital warranty verification stamps',
    ],
    isPopular: false,
    ctaText: 'Start Provider Plan',
  },
  {
    id: 'business_pro',
    name: 'Business Enterprise Pro',
    tier: 'business',
    priceMonthly: 8500,
    priceAnnual: 85000,
    currency: 'NGN',
    badge: 'For Workshops',
    description: 'For multi-technician repair workshops, HVAC contractors, and appliance retailers.',
    features: [
      'Top-tier priority placement in directory search',
      'Unlimited customer quote submissions',
      'Up to 5 technician seats with dispatch tracking',
      'Bulk warranty registration for retail customers',
      'Dedicated partner manager & WhatsApp priority support',
    ],
    isPopular: false,
    ctaText: 'Upgrade to Pro',
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-901',
    reference: 'LL-PSTK-20261001-8841',
    planId: 'free',
    planName: 'Free Household Tier',
    amount: 0,
    currency: 'NGN',
    status: 'success',
    channel: 'system_grant',
    paidAt: '2026-10-01T08:00:00Z',
  },
];

const state = reactive({
  currentPlanId: 'free',
  billingCycle: 'monthly', // 'monthly' | 'annual'
  transactions: [...INITIAL_TRANSACTIONS],
  loading: false,
  isCheckoutOpen: false,
  checkoutPlan: null,
});

export const subscriptionService = {
  get state() {
    return state;
  },

  getAllPlans() {
    return PLANS;
  },

  getHouseholdPlans() {
    return PLANS.filter(p => p.tier === 'household');
  },

  getBusinessPlans() {
    return PLANS.filter(p => p.tier === 'business');
  },

  getCurrentPlan() {
    return PLANS.find(p => p.id === state.currentPlanId) || PLANS[0];
  },

  setBillingCycle(cycle) {
    if (cycle === 'monthly' || cycle === 'annual') {
      state.billingCycle = cycle;
    }
  },

  openCheckout(plan) {
    state.checkoutPlan = plan;
    state.isCheckoutOpen = true;
  },

  closeCheckout() {
    state.isCheckoutOpen = false;
    state.checkoutPlan = null;
  },

  /**
   * Process Paystack Payment (simulated or live webhook verified per PRD FR-13)
   */
  async processPayment({ planId, billingCycle = 'monthly', customerEmail = DEMO_HOUSEHOLD.email, channel = 'card' }) {
    state.loading = true;
    try {
      const plan = PLANS.find(p => p.id === planId) || PLANS[1];
      const amount = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
      const refCode = `LL-PSTK-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Simulate network verification with Paystack API standard timing
      await new Promise(resolve => setTimeout(resolve, 800));

      const transaction = {
        id: `tx-${Date.now()}`,
        reference: refCode,
        paystackReference: `pstk_${Math.random().toString(36).substring(2, 12)}`,
        planId: plan.id,
        planName: plan.name,
        amount,
        currency: 'NGN',
        billingCycle,
        customerEmail,
        status: 'success',
        channel,
        paidAt: new Date().toISOString(),
      };

      // Persist to Supabase if configured
      if (isSupabaseConfigured() && supabase) {
        try {
          await supabase.from('payments').insert({
            account_id: DEMO_HOUSEHOLD.id,
            provider_reference: transaction.reference,
            paystack_reference: transaction.paystackReference,
            amount_minor: transaction.amount * 100,
            currency: 'NGN',
            purpose: 'subscription',
            status: 'success',
            channel: transaction.channel,
            paid_at: transaction.paidAt,
          });

          await supabase.from('subscriptions').upsert({
            account_id: DEMO_HOUSEHOLD.id,
            account_type: plan.tier,
            plan_id: plan.id,
            billing_cycle: billingCycle,
            amount_minor: transaction.amount * 100,
            currency: 'NGN',
            provider: 'paystack',
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 86400000).toISOString(),
          });
        } catch (dbErr) {
          console.warn('[subscriptionService] Supabase fallback to state:', dbErr);
        }
      }

      state.currentPlanId = plan.id;
      state.transactions.unshift(transaction);
      this.closeCheckout();

      return {
        success: true,
        transaction,
        plan,
      };
    } finally {
      state.loading = false;
    }
  },
};
