<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Warranty Tracker</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Monitor manufacturer guarantees, compressor warranties, and proof of purchase.
        </p>
      </div>
    </div>

    <!-- Warranties Cards List -->
    <div class="space-y-4">
      <div 
        v-for="asset in assetsWithWarranty" 
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
          <button class="btn-sage text-xs py-2 px-3">
            View Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { assetService } from '@/services/assetService';
import { formatDate, calculateWarrantyStatus } from '@/utils/formatters';

const assetsWithWarranty = computed(() => {
  return assetService.assets.value.filter(a => a.warranty && a.warranty.expiryDate);
});

const getWarrantyBadgeClass = (expiryDate) => calculateWarrantyStatus(expiryDate).badgeClass;
const getWarrantyLabel = (expiryDate) => calculateWarrantyStatus(expiryDate).label;
</script>
