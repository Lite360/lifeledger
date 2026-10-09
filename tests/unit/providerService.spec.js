import { describe, it, expect, beforeEach } from 'vitest';
import { providerService, INITIAL_PROVIDERS } from '@/services/providerService';

describe('providerService', () => {
  it('retrieves all seed providers', () => {
    const providers = providerService.getAllProviders();
    expect(providers.length).toBeGreaterThanOrEqual(INITIAL_PROVIDERS.length);
  });

  it('filters providers by category accurately', () => {
    const coolingProviders = providerService.getFilteredProviders({ category: 'cooling' });
    expect(coolingProviders.length).toBeGreaterThan(0);
    expect(coolingProviders.every(p => p.serviceCategories.includes('cooling'))).toBe(true);
  });

  it('filters providers by location', () => {
    const abujaProviders = providerService.getFilteredProviders({ location: 'abuja' });
    expect(abujaProviders.length).toBeGreaterThan(0);
    expect(abujaProviders.every(p => p.stateLocation.toLowerCase() === 'abuja')).toBe(true);
  });

  it('filters by search query', () => {
    const matches = providerService.getFilteredProviders({ search: 'Mikano' });
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].businessName).toContain('Mikano');
  });

  it('allows registering a new provider with pending_review status', async () => {
    const res = await providerService.registerProvider({
      businessName: 'Ikeja Generator Masters',
      contactPerson: 'Engr. Dayo Alabi',
      phone: '+234 803 111 9988',
      email: 'info@ikejamasters.ng',
      stateLocation: 'Lagos',
      serviceCategories: ['power'],
      yearsInBusiness: 5,
    });

    expect(res.success).toBe(true);
    expect(res.provider.verificationStatus).toBe('pending_review');
    expect(res.provider.badge).toBe('Pending Review');
  });

  it('updates verification status when moderated', () => {
    const res = providerService.updateVerificationStatus('sp-101', 'suspended', 'Audit check');
    expect(res.success).toBe(true);
    expect(res.provider.verificationStatus).toBe('suspended');

    // restore
    providerService.updateVerificationStatus('sp-101', 'verified');
    expect(providerService.getProviderById('sp-101').verificationStatus).toBe('verified');
  });
});
