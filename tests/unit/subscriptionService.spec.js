import { describe, it, expect } from 'vitest';
import { subscriptionService, PLANS } from '@/services/subscriptionService';

describe('subscriptionService', () => {
  it('returns all supported commercial tiers', () => {
    const plans = subscriptionService.getAllPlans();
    expect(plans.length).toBe(PLANS.length);
    expect(plans.map(p => p.id)).toContain('free');
    expect(plans.map(p => p.id)).toContain('plus');
    expect(plans.map(p => p.id)).toContain('business_starter');
    expect(plans.map(p => p.id)).toContain('business_pro');
  });

  it('filters household and business plans correctly', () => {
    const household = subscriptionService.getHouseholdPlans();
    const business = subscriptionService.getBusinessPlans();
    expect(household.every(p => p.tier === 'household')).toBe(true);
    expect(business.every(p => p.tier === 'business')).toBe(true);
  });

  it('updates billing cycle preference between monthly and annual', () => {
    subscriptionService.setBillingCycle('annual');
    expect(subscriptionService.state.billingCycle).toBe('annual');

    subscriptionService.setBillingCycle('monthly');
    expect(subscriptionService.state.billingCycle).toBe('monthly');
  });

  it('processes payment transaction and upgrades current household plan', async () => {
    const res = await subscriptionService.processPayment({
      planId: 'plus',
      billingCycle: 'monthly',
      channel: 'card',
    });

    expect(res.success).toBe(true);
    expect(res.transaction.amount).toBe(1500);
    expect(res.transaction.status).toBe('success');
    expect(res.transaction.reference).toMatch(/^LL-PSTK-/);
    expect(subscriptionService.getCurrentPlan().id).toBe('plus');
    expect(subscriptionService.state.transactions[0].reference).toBe(res.transaction.reference);
  });
});
