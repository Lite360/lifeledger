<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Ownership Expenses & Repairs</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Track maintenance costs, technician invoices, and replacement parts across your equipment.
        </p>
      </div>

      <button 
        @click="showAddModal = true"
        class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Record Expense</span>
      </button>
    </div>

    <!-- Summary Metrics -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card-surface p-4 border-l-4 border-l-brand-forest">
        <span class="text-[10px] uppercase font-bold text-mutedText tracking-wider block">Lifetime Spend</span>
        <span class="text-xl sm:text-2xl font-black text-brand-forest mt-1 block">{{ formatCurrency(lifetimeSpend) }}</span>
        <span class="text-[11px] text-mutedText">Across all registered assets</span>
      </div>

      <div class="card-surface p-4 border-l-4 border-l-brand-emerald">
        <span class="text-[10px] uppercase font-bold text-mutedText tracking-wider block">YTD Expenditure</span>
        <span class="text-xl sm:text-2xl font-black text-brand-emerald mt-1 block">{{ formatCurrency(ytdSpend) }}</span>
        <span class="text-[11px] text-mutedText">Year 2026 total</span>
      </div>

      <div class="card-surface p-4 border-l-4 border-l-blue-600">
        <span class="text-[10px] uppercase font-bold text-mutedText tracking-wider block">Scheduled Service</span>
        <span class="text-xl sm:text-2xl font-black text-brand-forest mt-1 block">{{ formatCurrency(spendByType['Scheduled Maintenance'] || 0) }}</span>
        <span class="text-[11px] text-mutedText">Routine oil & filter changes</span>
      </div>

      <div class="card-surface p-4 border-l-4 border-l-status-warning">
        <span class="text-[10px] uppercase font-bold text-mutedText tracking-wider block">Repairs & Parts</span>
        <span class="text-xl sm:text-2xl font-black text-status-warning mt-1 block">{{ formatCurrency(spendByType['Repair'] || 0) }}</span>
        <span class="text-[11px] text-mutedText">Unscheduled fixes & parts</span>
      </div>
    </div>

    <!-- Filter and Search Toolbar -->
    <div class="card-surface p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div class="flex items-center space-x-2 w-full sm:w-auto">
        <button 
          v-for="t in filterTypes" 
          :key="t"
          @click="selectedType = t"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          :class="[ selectedType === t ? 'bg-brand-forest text-white' : 'bg-surface-muted text-mutedText hover:text-brand-forest' ]"
        >
          {{ t }}
        </button>
      </div>

      <span class="text-xs text-mutedText font-medium">{{ filteredExpenses.length }} records</span>
    </div>

    <!-- Expenses Table / List -->
    <div class="card-surface overflow-hidden">
      <div class="divide-y divide-surface-border">
        <div 
          v-for="exp in filteredExpenses" 
          :key="exp.id"
          class="p-4 hover:bg-surface-main/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div class="space-y-1 min-w-0">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-brand-forest">{{ exp.description }}</span>
              <span class="badge-neutral text-[10px]">{{ exp.type || exp.expenseType }}</span>
            </div>
            <p class="text-brand-emerald font-medium truncate">{{ exp.assetName }}</p>
            <p class="text-mutedText text-[11px]">Provider: {{ exp.serviceProvider }} · Date: {{ formatDate(exp.date) }}</p>
          </div>

          <div class="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
            <span class="text-sm font-black text-brand-forest">{{ formatCurrency(exp.amount) }}</span>
            <button 
              @click="handleDelete(exp.id)" 
              class="text-mutedText hover:text-status-danger p-1 text-xs" 
              title="Delete Record"
            >
              ✕
            </button>
          </div>
        </div>

        <div v-if="filteredExpenses.length === 0" class="p-8 text-center text-xs text-mutedText">
          No expense records found.
        </div>
      </div>
    </div>

    <!-- Record Expense Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="showAddModal = false"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-6 space-y-4">
          <h3 class="text-base font-bold text-brand-forest">Log Household Expense</h3>
          <p class="text-xs text-mutedText">Record technician charges, generator diesel servicing, or replacement parts.</p>

          <form @submit.prevent="handleCreateExpense" class="space-y-3">
            <div>
              <label class="form-label">Related Asset</label>
              <select v-model="form.assetId" class="form-input text-xs">
                <option value="general">General Household Expense</option>
                <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.name }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Expense Category <span class="text-status-danger">*</span></label>
              <select v-model="form.type" required class="form-input text-xs">
                <option value="Scheduled Maintenance">Scheduled Maintenance</option>
                <option value="Repair">Unscheduled Repair</option>
                <option value="Accessory">Accessory / Part / Surge Protector</option>
              </select>
            </div>
            <div>
              <label class="form-label">Description <span class="text-status-danger">*</span></label>
              <input v-model="form.description" type="text" required placeholder="e.g. Inverter battery balance calibration" class="form-input text-xs" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Amount (₦ NGN) <span class="text-status-danger">*</span></label>
                <input v-model.number="form.amount" type="number" required min="0" placeholder="35000" class="form-input text-xs" />
              </div>
              <div>
                <label class="form-label">Date <span class="text-status-danger">*</span></label>
                <input v-model="form.date" type="date" required class="form-input text-xs" />
              </div>
            </div>
            <div>
              <label class="form-label">Technician / Store</label>
              <input v-model="form.serviceProvider" type="text" placeholder="e.g. Fouani Authorised Service" class="form-input text-xs" />
            </div>
            <div class="pt-3 flex justify-end space-x-2">
              <button type="button" @click="showAddModal = false" class="btn-secondary text-xs">Cancel</button>
              <button type="submit" class="btn-forest text-xs">Save Expense</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { expenseService } from '@/services/expenseService';
import { assetService } from '@/services/assetService';
import { formatCurrency, formatDate } from '@/utils/formatters';

const showAddModal = ref(false);
const selectedType = ref('All');
const filterTypes = ['All', 'Scheduled Maintenance', 'Repair', 'Accessory'];

const expenses = expenseService.expenses;
const lifetimeSpend = expenseService.totalLifetimeSpend;
const ytdSpend = expenseService.ytdSpend;
const spendByType = expenseService.spendByType;
const assets = assetService.assets;

const form = reactive({
  assetId: 'general',
  type: 'Scheduled Maintenance',
  description: '',
  amount: null,
  date: new Date().toISOString().split('T')[0],
  serviceProvider: '',
});

const filteredExpenses = computed(() => {
  if (selectedType.value === 'All') return expenses.value;
  return expenses.value.filter(e => (e.type || e.expenseType) === selectedType.value);
});

const handleCreateExpense = async () => {
  const asset = assets.value.find(a => a.id === form.assetId);
  await expenseService.createExpense({
    ...form,
    assetName: asset ? asset.name : 'General Household',
  });
  showAddModal.value = false;
  form.description = '';
  form.amount = null;
};

const handleDelete = async (id) => {
  if (confirm('Delete this expense record?')) {
    await expenseService.deleteExpense(id);
  }
};
</script>
