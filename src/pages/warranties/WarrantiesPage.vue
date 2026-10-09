<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Warranty Tracker</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Monitor manufacturer guarantees, compressor warranties, and proof of purchase documents.
        </p>
      </div>

      <button 
        @click="showAddModal = true"
        class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Register Warranty</span>
      </button>
    </div>

    <!-- Filter Status Tabs -->
    <div class="flex items-center space-x-2 border-b border-surface-border pb-3">
      <button 
        v-for="s in statusOptions" 
        :key="s.id"
        @click="selectedStatus = s.id"
        class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
        :class="selectedStatus === s.id ? 'bg-brand-forest text-white' : 'bg-surface-main text-mutedText hover:text-brand-forest'"
      >
        {{ s.label }}
      </button>
    </div>

    <!-- Warranties Cards List -->
    <div class="space-y-4">
      <div 
        v-for="asset in filteredWarranties" 
        :key="asset.id"
        class="card-surface p-5 hover:border-brand-emerald/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div class="flex items-start space-x-4 min-w-0">
          <div class="w-14 h-14 rounded-xl overflow-hidden bg-surface-muted shrink-0">
            <img :src="asset.imageUrl" :alt="asset.name" class="w-full h-full object-cover" />
          </div>
          <div class="min-w-0 space-y-1">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-bold text-brand-forest truncate">{{ asset.name }}</span>
              <span 
                class="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                :class="getWarrantyBadgeClass(asset.warranty?.expiryDate)"
              >
                {{ getWarrantyLabel(asset.warranty?.expiryDate) }}
              </span>
            </div>
            <p class="text-xs font-semibold text-brand-emerald">{{ asset.warranty.provider }}</p>
            <p class="text-[11px] text-mutedText truncate">{{ asset.warranty.terms }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between md:justify-end space-x-6 border-t md:border-t-0 pt-3 md:pt-0 border-surface-border shrink-0 text-xs">
          <div class="text-left md:text-right">
            <p class="text-[10px] uppercase font-bold text-mutedText">Expires On</p>
            <p class="font-bold text-brand-forest">{{ formatDate(asset.warranty.expiryDate) }}</p>
          </div>
          <router-link to="/assets" class="btn-sage text-xs py-2 px-3">
            View Asset Record
          </router-link>
        </div>
      </div>

      <div v-if="filteredWarranties.length === 0" class="card-surface p-8 text-center text-xs text-mutedText">
        No warranties found matching this filter.
      </div>
    </div>

    <!-- Register Warranty Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="showAddModal = false"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-6 space-y-4">
          <h3 class="text-base font-bold text-brand-forest">Add / Update Asset Warranty</h3>
          <p class="text-xs text-mutedText">Link official manufacturer guarantee or store warranty.</p>

          <form @submit.prevent="handleSaveWarranty" class="space-y-3">
            <div>
              <label class="form-label">Select Household Asset <span class="text-status-danger">*</span></label>
              <select v-model="warrantyForm.assetId" required class="form-input text-xs">
                <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.name }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Warranty Provider / Plan <span class="text-status-danger">*</span></label>
              <input v-model="warrantyForm.provider" type="text" required placeholder="e.g. Samsung 2-Year Official Care" class="form-input text-xs" />
            </div>
            <div>
              <label class="form-label">Expiry Date <span class="text-status-danger">*</span></label>
              <input v-model="warrantyForm.expiryDate" type="date" required class="form-input text-xs" />
            </div>
            <div>
              <label class="form-label">Coverage Details</label>
              <textarea v-model="warrantyForm.terms" rows="2" placeholder="e.g. Free compressor replacement, covers electrical surge with protector." class="form-input text-xs"></textarea>
            </div>
            <div class="pt-3 flex justify-end space-x-2">
              <button type="button" @click="showAddModal = false" class="btn-secondary text-xs">Cancel</button>
              <button type="submit" class="btn-forest text-xs">Save Warranty</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { assetService } from '@/services/assetService';
import { formatDate, calculateWarrantyStatus } from '@/utils/formatters';

const showAddModal = ref(false);
const selectedStatus = ref('all');

const statusOptions = [
  { id: 'all', label: 'All Warranties' },
  { id: 'active', label: 'Active Coverage' },
  { id: 'expiring_soon', label: 'Expiring Soon (30d)' },
  { id: 'expired', label: 'Expired' },
];

const assets = assetService.assets;

const assetsWithWarranty = computed(() => {
  return assets.value.filter(a => a.warranty && a.warranty.expiryDate);
});

const filteredWarranties = computed(() => {
  if (selectedStatus.value === 'all') return assetsWithWarranty.value;
  return assetsWithWarranty.value.filter(a => {
    const calc = calculateWarrantyStatus(a.warranty.expiryDate);
    return calc.status === selectedStatus.value;
  });
});

const warrantyForm = reactive({
  assetId: assets.value[0]?.id || '',
  provider: '',
  expiryDate: '',
  terms: '',
});

const handleSaveWarranty = async () => {
  await assetService.updateAsset(warrantyForm.assetId, {
    warranty: {
      provider: warrantyForm.provider,
      expiryDate: warrantyForm.expiryDate,
      terms: warrantyForm.terms,
    },
  });
  showAddModal.value = false;
};

const getWarrantyBadgeClass = (expiryDate) => calculateWarrantyStatus(expiryDate).badgeClass;
const getWarrantyLabel = (expiryDate) => calculateWarrantyStatus(expiryDate).label;
</script>
