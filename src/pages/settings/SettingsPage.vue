<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-black text-brand-forest">Household Settings & Profile</h1>
      <p class="text-xs sm:text-sm text-mutedText mt-0.5">
        Manage household members, notification channels, data export, and security.
      </p>
    </div>

    <!-- Household Profile Card -->
    <div class="card-surface p-6 space-y-4">
      <h2 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Household Profile</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="form-label">Household Title</label>
          <input type="text" value="Adeleke Household (Lekki Phase 1)" class="form-input" />
        </div>
        <div>
          <label class="form-label">Household Owner</label>
          <input type="text" value="Babatunde Adeleke" class="form-input" />
        </div>
        <div>
          <label class="form-label">Contact Email</label>
          <input type="email" value="babatunde.adeleke@example.ng" class="form-input" />
        </div>
        <div>
          <label class="form-label">Primary Currency</label>
          <input type="text" value="NGN (Nigerian Naira ₦)" disabled class="form-input bg-surface-muted text-mutedText" />
        </div>
      </div>
      <div class="pt-2 flex justify-end">
        <button class="btn-forest text-xs py-2 px-4">Save Changes</button>
      </div>
    </div>

    <!-- Notification Preferences -->
    <div class="card-surface p-6 space-y-4">
      <h2 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Notification Preferences</h2>
      <div class="space-y-3 text-xs">
        <label class="flex items-center justify-between p-3 rounded-lg bg-surface-main border border-surface-border cursor-pointer">
          <div>
            <p class="font-bold text-brand-forest">Upcoming Maintenance Reminders</p>
            <p class="text-mutedText">Receive email 7 days before an appliance routine is due</p>
          </div>
          <input type="checkbox" checked class="rounded border-surface-border text-brand-emerald focus:ring-brand-emerald h-4 w-4" />
        </label>
        <label class="flex items-center justify-between p-3 rounded-lg bg-surface-main border border-surface-border cursor-pointer">
          <div>
            <p class="font-bold text-brand-forest">Warranty Expiration Warnings</p>
            <p class="text-mutedText">Alert 30 days and 7 days before manufacturer warranties expire</p>
          </div>
          <input type="checkbox" checked class="rounded border-surface-border text-brand-emerald focus:ring-brand-emerald h-4 w-4" />
        </label>
        <label class="flex items-center justify-between p-3 rounded-lg bg-surface-main border border-surface-border cursor-pointer">
          <div>
            <p class="font-bold text-brand-forest">Overdue Task Escalation</p>
            <p class="text-mutedText">Send weekly digests of any pending maintenance items</p>
          </div>
          <input type="checkbox" checked class="rounded border-surface-border text-brand-emerald focus:ring-brand-emerald h-4 w-4" />
        </label>
      </div>
    </div>

    <!-- Data Privacy & Export (PRD 103) -->
    <div class="card-surface p-6 space-y-4">
      <h2 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Data Ownership & Privacy (NDPR)</h2>
      <p class="text-xs text-mutedText leading-relaxed">
        You retain full rights to your data. Download your household ledger or delete your record anytime.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <button @click="exportData" class="btn-secondary text-xs py-2 px-3">
          Export Asset Register (JSON / CSV Demo)
        </button>
        <button @click="logout" class="btn-forest text-xs py-2 px-3">
          Sign Out of Household
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { logout: authLogout } = useAuth();

const exportData = () => {
  alert('Export triggered! In Phase 2 this exports a complete NDPR-compliant encrypted archive of your assets and receipt links.');
};

const logout = () => {
  authLogout();
  router.push('/auth/login');
};
</script>
