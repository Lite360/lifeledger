<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Ownership Expenses & Repairs</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Track maintenance costs, technician invoices, and replacement parts across your equipment.
        </p>
      </div>

      <div class="bg-brand-sage px-4 py-2 rounded-xl border border-brand-emerald/20">
        <span class="text-[10px] uppercase font-bold text-mutedText block">Total YTD Expense</span>
        <span class="text-lg font-black text-brand-forest">{{ formatCurrency(totalSpent) }}</span>
      </div>
    </div>

    <!-- Expenses Table / List -->
    <div class="card-surface overflow-hidden">
      <div class="p-4 border-b border-surface-border bg-surface-main flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-brand-forest">Recent Invoices & Repair Records</h3>
        <span class="text-xs text-mutedText">{{ expenses.length }} transactions</span>
      </div>

      <div class="divide-y divide-surface-border">
        <div 
          v-for="exp in expenses" 
          :key="exp.id"
          class="p-4 hover:bg-surface-main/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div class="space-y-1 min-w-0">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-brand-forest">{{ exp.description }}</span>
              <span class="badge-neutral text-[10px]">{{ exp.type }}</span>
            </div>
            <p class="text-brand-emerald font-medium truncate">{{ exp.assetName }}</p>
            <p class="text-mutedText text-[11px]">Provider: {{ exp.serviceProvider }} · Date: {{ formatDate(exp.date) }}</p>
          </div>

          <div class="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
            <span class="text-sm font-black text-brand-forest">{{ formatCurrency(exp.amount) }}</span>
            <span class="text-[11px] text-brand-emerald font-semibold border border-brand-emerald/30 bg-brand-sage/40 px-2 py-0.5 rounded">
              Verified Invoice
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { DEMO_EXPENSES } from '@/services/demoData';
import { formatCurrency, formatDate } from '@/utils/formatters';

const expenses = DEMO_EXPENSES;
const totalSpent = computed(() => expenses.reduce((acc, curr) => acc + curr.amount, 0));
</script>
