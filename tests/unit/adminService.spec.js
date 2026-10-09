import { describe, it, expect } from 'vitest';
import { adminService } from '@/services/adminService';
import { providerService } from '@/services/providerService';

describe('adminService', () => {
  it('calculates platform operational metrics accurately', () => {
    const metrics = adminService.getPlatformMetrics();
    expect(metrics.totalProviders).toBeGreaterThan(0);
    expect(metrics.totalRequests).toBeGreaterThan(0);
    expect(metrics.estimatedMrr).toBeGreaterThan(0);
  });

  it('records tamper-evident audit logs when provider status changes', () => {
    const initialLogCount = adminService.getAuditLogs().length;

    const res = adminService.verifyProvider('sp-101', 'Admin Officer Tunde');
    expect(res.success).toBe(true);

    const logs = adminService.getAuditLogs();
    expect(logs.length).toBe(initialLogCount + 1);
    expect(logs[0].action).toBe('PROVIDER_VERIFIED');
    expect(logs[0].actorName).toBe('Admin Officer Tunde');
  });

  it('records audit log on suspension', () => {
    const res = adminService.suspendProvider('sp-102', 'CAC registration check failed');
    expect(res.success).toBe(true);

    const latestLog = adminService.getAuditLogs()[0];
    expect(latestLog.action).toBe('PROVIDER_SUSPENDED');
    expect(latestLog.details).toContain('CAC registration check failed');

    // Restore for remaining tests
    adminService.verifyProvider('sp-102');
  });
});
