import { describe, it, expect } from 'vitest';
import { expenseService } from '@/services/expenseService';

describe('expenseService operations', () => {
  it('creates an expense and recalculates metrics', async () => {
    const initialLifetime = expenseService.totalLifetimeSpend.value;
    const initialCount = expenseService.expenses.value.length;

    const newExpense = await expenseService.createExpense({
      assetId: 'ast-103',
      assetName: 'LG 1.5HP AC',
      expenseType: 'Repair',
      amount: 25000,
      description: 'Capacitor replacement',
      serviceProvider: 'Fouani Care',
    });

    expect(newExpense.id).toBeDefined();
    expect(expenseService.expenses.value.length).toBe(initialCount + 1);
    expect(expenseService.totalLifetimeSpend.value).toBe(initialLifetime + 25000);
  });

  it('aggregates spend by category accurately', () => {
    const summary = expenseService.spendByType.value;
    expect(summary['Scheduled Maintenance']).toBeDefined();
    expect(summary['Repair']).toBeDefined();
    expect(summary['Accessory']).toBeDefined();
  });
});
