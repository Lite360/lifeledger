import { describe, it, expect } from 'vitest';
import { quoteService, INITIAL_REQUESTS } from '@/services/quoteService';

describe('quoteService', () => {
  it('retrieves seed service requests', () => {
    const requests = quoteService.getAllRequests();
    expect(requests.length).toBeGreaterThanOrEqual(INITIAL_REQUESTS.length);
  });

  it('creates a new service request linked to household equipment', async () => {
    const res = await quoteService.createServiceRequest({
      assetId: 'ast-104',
      assetName: 'Haier Thermocool Chest Freezer',
      category: 'kitchen',
      urgency: 'urgent',
      title: 'Thermostat replacement and R600 gas inspection',
      description: 'Freezer temperature fluctuating above 4 degrees Celsius.',
      budgetMax: 25000,
    });

    expect(res.success).toBe(true);
    expect(res.request.status).toBe('open');
    expect(res.request.quotesCount).toBe(0);
    expect(res.request.budgetMax).toBe(25000);
  });

  it('submits a quote from a provider', async () => {
    const req = quoteService.getAllRequests()[0];
    const res = await quoteService.submitQuote(req.id, {
      providerId: 'sp-102',
      providerName: 'CoolTech HVAC Solutions',
      amount: 40000,
      estimatedDuration: '1 day',
      warrantyOffered: '30 days warranty',
      notes: 'Testing quote submission workflow',
    });

    expect(res.success).toBe(true);
    expect(res.quote.amount).toBe(40000);
    expect(req.quotes.some(q => q.id === res.quote.id)).toBe(true);
  });

  it('accepts a quote and marks request in_progress while declining others', () => {
    const req = quoteService.getAllRequests().find(r => r.quotes.length >= 2);
    expect(req).toBeDefined();

    const quoteToAccept = req.quotes[0];
    const res = quoteService.acceptQuote(req.id, quoteToAccept.id);

    expect(res.success).toBe(true);
    expect(quoteToAccept.status).toBe('accepted');
    expect(req.status).toBe('in_progress');
    // Other quote should be marked declined
    expect(req.quotes[1].status).toBe('declined');
  });
});
