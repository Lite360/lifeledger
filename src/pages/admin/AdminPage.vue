<template>
  <div class="space-y-8 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
            Restricted Admin Area
          </span>
          <span class="text-xs text-mutedText">Separate Auth Scope</span>
        </div>
        <h1 class="text-2xl font-black text-brand-forest mt-1">Platform Operations & Compliance</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Provider identity verification, security audit logging, and marketplace oversight per PRD section 4.6 & 9.1.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <span class="text-xs font-semibold text-brand-forest bg-surface-main px-3 py-2 rounded-lg border border-surface-border">
          Active Officer: <span class="text-brand-emerald font-bold">Babatunde Adeleke</span>
        </span>
      </div>
    </div>

    <!-- Commercial KPIs -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card-surface p-4 border border-surface-border space-y-1">
        <span class="text-[10px] font-bold uppercase tracking-wider text-mutedText">Verified Providers</span>
        <p class="text-2xl font-black text-brand-forest">{{ metrics.verifiedProviders }}</p>
        <span class="text-[10px] text-emerald-600 font-semibold">{{ metrics.pendingProviders }} applications pending</span>
      </div>
      <div class="card-surface p-4 border border-surface-border space-y-1">
        <span class="text-[10px] font-bold uppercase tracking-wider text-mutedText">Service Leads</span>
        <p class="text-2xl font-black text-brand-forest">{{ metrics.totalRequests }}</p>
        <span class="text-[10px] text-blue-600 font-semibold">{{ metrics.openRequests }} currently open</span>
      </div>
      <div class="card-surface p-4 border border-surface-border space-y-1">
        <span class="text-[10px] font-bold uppercase tracking-wider text-mutedText">Active Pilot Households</span>
        <p class="text-2xl font-black text-brand-forest">{{ metrics.totalHouseholds }}</p>
        <span class="text-[10px] text-emerald-600 font-semibold">100% tenant isolated (RLS)</span>
      </div>
      <div class="card-surface p-4 border border-surface-border space-y-1">
        <span class="text-[10px] font-bold uppercase tracking-wider text-mutedText">Estimated Monthly MRR</span>
        <p class="text-2xl font-black text-brand-emerald">{{ formatNaira(metrics.estimatedMrr) }}</p>
        <span class="text-[10px] text-mutedText font-semibold">Paystack subscription billing</span>
      </div>
    </div>

    <!-- Provider Verification Desk -->
    <div class="card-surface p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h2 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Service Provider Verification Queue</h2>
          <p class="text-xs text-mutedText">Review technician applications and issue Verified Partner status.</p>
        </div>
        <span class="text-xs font-semibold text-mutedText">
          {{ allProviders.length }} Providers Enrolled
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-surface-border text-mutedText font-semibold">
              <th class="pb-3">Business Name & Contact</th>
              <th class="pb-3">Location</th>
              <th class="pb-3">CAC / License</th>
              <th class="pb-3">Specialty</th>
              <th class="pb-3">Status</th>
              <th class="pb-3 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-border">
            <tr v-for="prov in allProviders" :key="prov.id" class="hover:bg-surface-main/50 transition-colors">
              <td class="py-3.5">
                <p class="font-bold text-brand-forest">{{ prov.businessName }}</p>
                <p class="text-[11px] text-mutedText">{{ prov.contactPerson }} • {{ prov.phone }}</p>
              </td>
              <td class="py-3.5 font-medium text-brand-forest">{{ prov.stateLocation }}</td>
              <td class="py-3.5 font-mono text-[11px]">{{ prov.cacNumber || 'Individual Artisan' }}</td>
              <td class="py-3.5 capitalize">{{ prov.serviceCategories.join(', ') }}</td>
              <td class="py-3.5">
                <span 
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  :class="prov.verificationStatus === 'verified' ? 'bg-emerald-100 text-brand-forest' : (prov.verificationStatus === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900')"
                >
                  {{ prov.verificationStatus }}
                </span>
              </td>
              <td class="py-3.5 text-right space-x-2">
                <button 
                  v-if="prov.verificationStatus !== 'verified'"
                  @click="handleVerify(prov.id)"
                  class="btn-emerald py-1 px-3 text-[11px] font-bold"
                >
                  Approve & Verify
                </button>
                <button 
                  v-if="prov.verificationStatus !== 'suspended'"
                  @click="handleSuspend(prov.id)"
                  class="btn-secondary py-1 px-3 text-[11px] text-red-700 hover:bg-red-50"
                >
                  Suspend
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Security & Audit Trail (PRD 9.1 & 7.1) -->
    <div class="card-surface p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h2 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Administrative Security Audit Trail</h2>
          <p class="text-xs text-mutedText">Tamper-evident system audit log of security events and role authorizations.</p>
        </div>
        <span class="text-xs font-semibold text-brand-emerald">
          ● Live Logging Active
        </span>
      </div>

      <div class="space-y-3">
        <div 
          v-for="log in auditLogs" 
          :key="log.id"
          class="p-3 rounded-xl bg-surface-main border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
        >
          <div class="space-y-0.5">
            <div class="flex items-center space-x-2">
              <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-forest text-white">
                {{ log.action }}
              </span>
              <span class="font-bold text-brand-forest">{{ log.actorName }}</span>
              <span class="text-mutedText">• {{ log.resourceType }} [{{ log.resourceId }}]</span>
            </div>
            <p class="text-[11px] text-mutedText">{{ log.details }}</p>
          </div>
          <span class="text-[10px] text-mutedText font-mono shrink-0">
            {{ formatDate(log.timestamp) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { adminService } from '@/services/adminService';
import { providerService } from '@/services/providerService';
import { formatNaira, formatDate } from '@/utils/formatters';

const metrics = computed(() => adminService.getPlatformMetrics());
const allProviders = computed(() => providerService.getAllProviders());
const auditLogs = computed(() => adminService.getAuditLogs());

const handleVerify = (id) => {
  adminService.verifyProvider(id);
};

const handleSuspend = (id) => {
  adminService.suspendProvider(id, 'Admin compliance policy violation');
};
</script>
