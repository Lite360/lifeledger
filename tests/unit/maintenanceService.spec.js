import { describe, it, expect } from 'vitest';
import { maintenanceService, calculateNextDueDate } from '@/services/maintenanceService';

describe('calculateNextDueDate', () => {
  it('correctly calculates monthly advance', () => {
    const next = calculateNextDueDate('2026-05-15', 'monthly');
    expect(next).toBe('2026-06-15');
  });

  it('correctly calculates quarterly advance (3 months)', () => {
    const next = calculateNextDueDate('2026-01-10', 'quarterly');
    expect(next).toBe('2026-04-10');
  });

  it('correctly calculates 200 generator hours rule (3 months)', () => {
    const next = calculateNextDueDate('2026-02-01', 'every_200_hours');
    expect(next).toBe('2026-05-01');
  });

  it('correctly calculates bi-annual advance (6 months)', () => {
    const next = calculateNextDueDate('2026-03-20', 'bi_annual');
    expect(next).toBe('2026-09-20');
  });

  it('returns null for one-time tasks', () => {
    const next = calculateNextDueDate('2026-03-20', 'one_time');
    expect(next).toBeNull();
  });
});

describe('maintenanceService operations', () => {
  it('creates a maintenance schedule', async () => {
    const initialCount = maintenanceService.schedules.value.length;
    const schedule = await maintenanceService.createSchedule({
      assetId: 'ast-101',
      title: 'Solar Panel Wash',
      frequency: 'Monthly',
      recurrenceRule: 'monthly',
      dueDate: '2026-11-01',
      estimatedCost: 15000,
    });

    expect(schedule.id).toBeDefined();
    expect(maintenanceService.schedules.value.length).toBe(initialCount + 1);
  });

  it('completes a task transactionally, logging work and advancing next due date', async () => {
    // create recurring task
    const schedule = await maintenanceService.createSchedule({
      assetId: 'ast-101',
      title: 'Generator Oil Change Test',
      frequency: 'Quarterly',
      recurrenceRule: 'quarterly',
      dueDate: '2026-04-01',
      estimatedCost: 40000,
    });

    const initialLogsCount = maintenanceService.logs.value.length;

    const result = await maintenanceService.completeTask(schedule.id, {
      completedAt: '2026-04-02',
      performedBy: 'Engr. Segun',
      cost: 45000,
      notes: 'Completed with Shell Rimula 15W40',
    });

    // Log created
    expect(result.log).toBeDefined();
    expect(maintenanceService.logs.value.length).toBe(initialLogsCount + 1);
    expect(result.log.cost).toBe(45000);

    // Schedule next due date advanced by 3 months (from 2026-04-02 to 2026-07-02)
    expect(result.nextDueDate).toBe('2026-07-02');
  });
});
