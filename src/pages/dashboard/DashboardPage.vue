<template>
  <div class="space-y-8">
    <!-- Header Greeting (PRD 5.4) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-brand-forest tracking-tight">
          {{ greeting }}, Babatunde
        </h1>
        <p class="text-xs sm:text-sm text-mutedText mt-1">
          Here's what's happening with your household assets today.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="$emit('open-add-asset')"
          class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Register Asset</span>
        </button>
      </div>
    </div>

    <!-- 4 Key Stat Cards (PRD 5.4) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- 12 Registered Assets -->
      <div class="card-surface p-5 border-l-4 border-l-brand-forest hover:shadow-card transition-shadow">
        <div class="flex items-center justify-between text-mutedText">
          <span class="text-xs font-semibold uppercase tracking-wider">Registered Assets</span>
          <span class="p-1.5 rounded-lg bg-surface-muted text-brand-forest">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
        </div>
        <div class="mt-3">
          <span class="text-3xl sm:text-4xl font-black text-brand-forest">{{ assets.length }}</span>
          <p class="text-[11px] text-mutedText mt-1">Valued at {{ formatCurrency(totalAssetValue) }}</p>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="card-surface p-5 border-l-4 border-l-brand-emerald hover:shadow-card transition-shadow">
        <div class="flex items-center justify-between text-mutedText">
          <span class="text-xs font-semibold uppercase tracking-wider">Upcoming Tasks</span>
          <span class="p-1.5 rounded-lg bg-brand-sage text-brand-emerald">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
        </div>
        <div class="mt-3">
          <span class="text-3xl sm:text-4xl font-black text-brand-forest">{{ upcomingTasks.length }}</span>
          <p class="text-[11px] text-mutedText mt-1">Scheduled for next 30 days</p>
        </div>
      </div>

      <!-- Active Warranties -->
      <div class="card-surface p-5 border-l-4 border-l-emerald-600 hover:shadow-card transition-shadow">
        <div class="flex items-center justify-between text-mutedText">
          <span class="text-xs font-semibold uppercase tracking-wider">Active Warranties</span>
          <span class="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
        </div>
        <div class="mt-3">
          <span class="text-3xl sm:text-4xl font-black text-brand-forest">{{ activeWarrantiesCount }}</span>
          <p class="text-[11px] text-mutedText mt-1">Verified with receipts</p>
        </div>
      </div>

      <!-- Overdue Task (Danger) -->
      <div class="card-surface p-5 border-l-4 border-l-status-danger bg-red-50/20 hover:shadow-card transition-shadow">
        <div class="flex items-center justify-between text-status-danger">
          <span class="text-xs font-bold uppercase tracking-wider">Overdue Task</span>
          <span class="p-1.5 rounded-lg bg-red-100 text-status-danger">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
        </div>
        <div class="mt-3">
          <span class="text-3xl sm:text-4xl font-black text-status-danger">{{ overdueTasks.length }}</span>
          <p class="text-[11px] text-status-danger font-semibold mt-1">
            {{ overdueTasks.length > 0 ? 'Equipment service required' : 'All equipment up to date' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Immediate Attention Banner -->
    <div 
      v-if="overdueTasks.length > 0" 
      class="card-surface p-4 border border-red-200 bg-red-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div class="flex items-center space-x-3">
        <span class="p-2 rounded-full bg-red-100 text-status-danger shrink-0">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <p class="text-xs font-bold text-red-950">Overdue Service: {{ overdueTasks[0].title }}</p>
          <p class="text-[11px] text-red-800">{{ overdueTasks[0].assetName }} was due on {{ formatDate(overdueTasks[0].dueDate) }}.</p>
        </div>
      </div>
      <router-link to="/maintenance" class="btn-forest text-xs py-2 px-3 self-start sm:self-auto shrink-0 bg-red-900 hover:bg-red-950">
        Record Service Now
      </router-link>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left Column: Recent Assets -->
      <div class="lg:col-span-8 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-brand-forest">Household Assets Register</h2>
            <p class="text-xs text-mutedText">High-value equipment recorded in Lekki residence.</p>
          </div>
          <router-link to="/assets" class="text-xs font-bold text-brand-emerald hover:underline">
            View All Assets ({{ assets.length }}) →
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            v-for="asset in assets.slice(0, 4)" 
            :key="asset.id"
            class="card-surface overflow-hidden hover:border-brand-emerald/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div class="relative h-36 bg-surface-muted overflow-hidden">
                <img :src="asset.imageUrl" :alt="asset.name" class="w-full h-full object-cover" />
                <span class="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full" :class="getWarrantyBadgeClass(asset.warranty?.expiryDate)">
                  {{ getWarrantyLabel(asset.warranty?.expiryDate) }}
                </span>
                <span class="absolute bottom-2 left-2 bg-brand-forest/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {{ asset.location }}
                </span>
              </div>

              <div class="p-4 space-y-2">
                <div class="flex items-start justify-between">
                  <h3 class="text-sm font-bold text-brand-forest line-clamp-1" :title="asset.name">
                    {{ asset.name }}
                  </h3>
                </div>
                <p class="text-[11px] text-mutedText font-mono truncate">SN: {{ asset.serialNumber }}</p>
                <p class="text-xs font-black text-brand-forest">{{ formatCurrency(asset.purchasePrice) }}</p>
              </div>
            </div>

            <div class="px-4 py-2.5 bg-surface-main border-t border-surface-border flex items-center justify-between text-[11px] text-mutedText">
              <span>{{ asset.categoryLabel }}</span>
              <router-link to="/assets" class="text-brand-emerald font-semibold hover:underline">
                Details →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Maintenance Timeline & Category Split -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Upcoming Maintenance Schedule -->
        <div class="card-surface p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-surface-border pb-3">
            <h3 class="text-sm font-bold text-brand-forest">Scheduled Tasks</h3>
            <router-link to="/maintenance" class="text-[11px] text-brand-emerald font-semibold hover:underline">
              View Calendar
            </router-link>
          </div>

          <div class="space-y-3">
            <div 
              v-for="task in maintenanceTasks.slice(0, 3)" 
              :key="task.id"
              class="p-3 rounded-lg border text-xs space-y-1.5"
              :class="[ task.dueDate < '2026-10-09' ? 'bg-red-50/60 border-red-200' : 'bg-surface-main border-surface-border' ]"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold truncate text-brand-forest">{{ task.title }}</span>
                <span 
                  class="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  :class="task.dueDate < '2026-10-09' ? 'bg-red-100 text-status-danger' : 'bg-brand-sage text-brand-forest'"
                >
                  {{ task.dueDate < '2026-10-09' ? 'Overdue' : formatDate(task.dueDate) }}
                </span>
              </div>
              <p class="text-[11px] text-mutedText truncate">{{ task.assetName }}</p>
              <div class="flex items-center justify-between text-[10px] text-mutedText pt-1 border-t border-surface-border/50">
                <span>{{ task.assignedTo }}</span>
                <span class="font-semibold text-brand-forest">{{ formatCurrency(task.estimatedCost) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Household Cost Summary -->
        <div class="card-surface p-5 space-y-3 bg-brand-forest text-surface-main">
          <span class="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Ownership Insights</span>
          <h3 class="text-base font-bold text-white">YTD Maintenance Spend</h3>
          <p class="text-2xl font-black text-emerald-300">₦114,500</p>
          <p class="text-xs text-brand-sage/80 leading-relaxed">
            Oil changes, AC capacitor replacements, and surge protectors logged across 3 repairs this year.
          </p>
          <router-link to="/expenses" class="inline-block pt-2 text-xs text-white font-bold underline hover:text-emerald-200">
            View expense breakdown →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Secure Household Status Badge -->
    <div class="text-center py-4 border-t border-surface-border text-xs text-mutedText flex items-center justify-center space-x-2">
      <span class="w-2 h-2 rounded-full bg-brand-emerald"></span>
      <span>LifeLedger Secure Household Vault · 256-Bit Encrypted Storage · NDPR Compliant Tenant Isolation</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { assetService } from '@/services/assetService';
import { maintenanceService } from '@/services/maintenanceService';
import { expenseService } from '@/services/expenseService';
import { formatCurrency, formatDate, calculateWarrantyStatus } from '@/utils/formatters';

defineEmits(['open-add-asset']);

const assets = assetService.assets;
const upcomingTasks = maintenanceService.upcomingTasks;
const overdueTasks = maintenanceService.overdueTasks;
const ytdSpend = expenseService.ytdSpend;

const totalAssetValue = computed(() => {
  return assets.value.reduce((acc, item) => acc + (item.purchasePrice || 0), 0);
});

const activeWarrantiesCount = computed(() => {
  return assets.value.filter(a => {
    if (!a.warranty?.expiryDate) return false;
    const status = calculateWarrantyStatus(a.warranty.expiryDate);
    return status.status === 'active' || status.status === 'expiring_soon';
  }).length;
});

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
});

const getWarrantyBadgeClass = (expiryDate) => {
  return calculateWarrantyStatus(expiryDate).badgeClass;
};

const getWarrantyLabel = (expiryDate) => {
  return calculateWarrantyStatus(expiryDate).label;
};
</script>
