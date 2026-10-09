import { describe, it, expect } from 'vitest';
import { assetService } from '@/services/assetService';
import { maintenanceService } from '@/services/maintenanceService';
import { expenseService } from '@/services/expenseService';
import { quoteService } from '@/services/quoteService';
import { subscriptionService } from '@/services/subscriptionService';

describe('End-to-End Core Household Journey (PRD Section 1. Essential User Journeys)', () => {
  let createdAsset = null;
  let scheduledTask = null;
  let createdRequest = null;
  let submittedQuote = null;

  it('Step 1: Registers a new household asset with purchase price in Nigerian Naira', async () => {
    const payload = {
      name: 'Scanfrost 4-Burner Gas Cooker & Electric Oven',
      category: 'kitchen',
      brand: 'Scanfrost',
      model: 'SFC-5402B',
      serialNumber: 'SCN-2026-99120',
      purchaseDate: '2026-05-10',
      purchasePrice: 285000,
      store: 'Game Stores Lekki Mall',
      location: 'Main Kitchen',
      warrantyProvider: 'Scanfrost 2-Year Official Guarantee',
      warrantyExpiry: '2028-05-10',
    };

    const newAsset = await assetService.createAsset(payload);
    expect(newAsset).toBeDefined();
    expect(newAsset.id).toBeDefined();
    expect(newAsset.name).toBe(payload.name);
    expect(newAsset.purchasePrice).toBe(285000);
    createdAsset = newAsset;
  });

  it('Step 2: Creates a recurring maintenance routine with 250-hour interval', async () => {
    expect(createdAsset).toBeDefined();

    const taskPayload = {
      assetId: createdAsset.id,
      title: 'Gas Burner Jet Decarbonization & Regulator Pressure Check',
      frequency: 'Bi-annual',
      recurrenceRule: 'bi_annual',
      dueDate: '2026-11-10',
      estimatedCost: 15000,
    };

    const task = await maintenanceService.createSchedule(taskPayload);
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toBe(taskPayload.title);
    scheduledTask = task;
  });

  it('Step 3: Completes the maintenance routine, logs cost, and auto-advances next due date', async () => {
    expect(scheduledTask).toBeDefined();

    const result = await maintenanceService.completeTask(scheduledTask.id, {
      completedAt: '2026-11-10',
      performedBy: 'Capital Chill Refrigeration & Appliances',
      cost: 14500,
      notes: 'Cleaned brass burner nozzles and tested gas hose seal with soapy solution.',
    });

    expect(result.log).toBeDefined();
    expect(result.log.cost).toBe(14500);
    expect(result.nextDueDate).toBe('2027-05-10'); // advanced 6 months from 2026-11-10
  });

  it('Step 4: Requests a repair quote for the asset from verified technicians', async () => {
    const res = await quoteService.createServiceRequest({
      assetId: createdAsset.id,
      assetName: createdAsset.name,
      category: 'kitchen',
      urgency: 'normal',
      title: 'Thermostat recalibration for electric oven cavity',
      description: 'Oven temperature indicator reads 200°C but actual internal thermometer shows 140°C.',
      budgetMax: 30000,
    });

    expect(res.success).toBe(true);
    expect(res.request.status).toBe('open');
    createdRequest = res.request;
  });

  it('Step 5: Submits and accepts a professional quote, updating request to in_progress', async () => {
    expect(createdRequest).toBeDefined();

    const quoteRes = await quoteService.submitQuote(createdRequest.id, {
      providerId: 'sp-104',
      providerName: 'Capital Chill Refrigeration & Appliances',
      amount: 24000,
      estimatedDuration: '2 hours on-site',
      warrantyOffered: '60 days on thermocouple replacement',
      notes: 'Replace digital thermocouple sensor and calibrate thermostat dial.',
    });

    expect(quoteRes.success).toBe(true);
    submittedQuote = quoteRes.quote;

    const acceptRes = quoteService.acceptQuote(createdRequest.id, submittedQuote.id);
    expect(acceptRes.success).toBe(true);
    expect(acceptRes.request.status).toBe('in_progress');
    expect(submittedQuote.status).toBe('accepted');
  });

  it('Step 6: Upgrades household to LifeLedger Plus via Paystack checkout', async () => {
    const res = await subscriptionService.processPayment({
      planId: 'plus',
      billingCycle: 'monthly',
      channel: 'card',
    });

    expect(res.success).toBe(true);
    expect(res.plan.id).toBe('plus');
    expect(res.transaction.status).toBe('success');
    expect(subscriptionService.getCurrentPlan().id).toBe('plus');
  });
});
