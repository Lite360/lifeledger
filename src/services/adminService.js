/**
 * LifeLedger NG - Administrative Workflows & Provider Verification Service
 * Phase 4 Commercial Features
 * Single Source of Truth: prd.md (Section 4.6, 7.1, 9.1, 14)
 */
import { reactive } from 'vue';
import { providerService } from './providerService';
import { quoteService } from './quoteService';
import { subscriptionService } from './subscriptionService';

const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-001',
    actorName: 'System Security Automator',
    action: 'POLICY_ENFORCED',
    resourceType: 'ROW_LEVEL_SECURITY',
    resourceId: 'public.service_requests',
    details: 'Tenant isolation verified: non-authorized users restricted from viewing serial numbers.',
    timestamp: '2026-10-08T08:14:00Z',
  },
  {
    id: 'aud-002',
    actorName: 'Babatunde Adeleke (Admin)',
    action: 'PROVIDER_VERIFIED',
    resourceType: 'service_providers',
    resourceId: 'sp-101',
    details: 'Approved Mikano Certified Field Engineering after RC-1428901 CAC validation.',
    timestamp: '2026-10-08T11:20:00Z',
  },
  {
    id: 'aud-003',
    actorName: 'Babatunde Adeleke (Admin)',
    action: 'PROVIDER_VERIFIED',
    resourceType: 'service_providers',
    resourceId: 'sp-102',
    details: 'Approved CoolTech HVAC Solutions after CAC business registration check.',
    timestamp: '2026-10-08T15:45:00Z',
  },
];

const state = reactive({
  auditLogs: [...INITIAL_AUDIT_LOGS],
  isAdminMode: true,
  adminUser: {
    name: 'Babatunde Adeleke',
    role: 'superadmin',
    email: 'admin@lifeledger.ng',
  },
});

export const adminService = {
  get state() {
    return state;
  },

  getAuditLogs() {
    return state.auditLogs;
  },

  getPlatformMetrics() {
    const providers = providerService.getAllProviders();
    const verifiedProviders = providers.filter(p => p.verificationStatus === 'verified').length;
    const pendingProviders = providers.filter(p => p.verificationStatus === 'pending_review').length;
    const requests = quoteService.getAllRequests();
    const openRequests = requests.filter(r => r.status === 'open' || r.status === 'quotes_received').length;
    
    // Calculate simulated MRR based on subscriptions
    const subTransactions = subscriptionService.state.transactions;
    const estimatedMrr = subTransactions.reduce((acc, tx) => acc + (tx.amount || 0), 0) + 16500; // base verified partner fee baseline

    return {
      totalProviders: providers.length,
      verifiedProviders,
      pendingProviders,
      totalRequests: requests.length,
      openRequests,
      estimatedMrr,
      totalHouseholds: 38, // pilot test households
    };
  },

  verifyProvider(providerId, adminName = state.adminUser.name) {
    const result = providerService.updateVerificationStatus(providerId, 'verified');
    if (result.success) {
      this.logAction({
        actorName: adminName,
        action: 'PROVIDER_VERIFIED',
        resourceType: 'service_providers',
        resourceId: providerId,
        details: `Approved verification badge for ${result.provider.businessName}`,
      });
    }
    return result;
  },

  suspendProvider(providerId, reason = 'Investigation pending', adminName = state.adminUser.name) {
    const result = providerService.updateVerificationStatus(providerId, 'suspended', reason);
    if (result.success) {
      this.logAction({
        actorName: adminName,
        action: 'PROVIDER_SUSPENDED',
        resourceType: 'service_providers',
        resourceId: providerId,
        details: `Suspended provider: ${reason}`,
      });
    }
    return result;
  },

  logAction({ actorName, action, resourceType, resourceId, details }) {
    const logEntry = {
      id: `aud-${Date.now()}`,
      actorName: actorName || state.adminUser.name,
      action,
      resourceType,
      resourceId,
      details,
      timestamp: new Date().toISOString(),
    };
    state.auditLogs.unshift(logEntry);
    return logEntry;
  },
};
