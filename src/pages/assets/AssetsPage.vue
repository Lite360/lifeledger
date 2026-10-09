<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Household Asset Register</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Browse, search, and manage all registered appliances and equipment.
        </p>
      </div>

      <button 
        @click="$emit('open-add-asset')"
        class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Register New Asset</span>
      </button>
    </div>

    <!-- Filters and Search Toolbar -->
    <div class="card-surface p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mutedText">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Filter by name, brand, serial..." 
          class="form-input pl-9 text-xs"
        />
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          :class="[
            selectedCategory === cat.id 
              ? 'bg-brand-forest text-white' 
              : 'bg-surface-muted text-mutedText hover:text-brand-forest'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Assets Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="asset in filteredAssets" 
        :key="asset.id"
        class="card-surface overflow-hidden hover:border-brand-emerald/40 transition-all flex flex-col justify-between group"
      >
        <div>
          <div class="relative h-44 bg-surface-muted overflow-hidden">
            <img :src="asset.imageUrl" :alt="asset.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span 
              class="absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              :class="getWarrantyBadgeClass(asset.warranty?.expiryDate)"
            >
              {{ getWarrantyLabel(asset.warranty?.expiryDate) }}
            </span>
            <span class="absolute bottom-2 left-2 bg-brand-forest/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              {{ asset.location }}
            </span>
          </div>

          <div class="p-5 space-y-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-brand-emerald">{{ asset.brand }}</span>
              <h3 class="text-base font-bold text-brand-forest line-clamp-1 mt-0.5" :title="asset.name">
                {{ asset.name }}
              </h3>
            </div>

            <div class="text-xs space-y-1 text-mutedText">
              <p class="font-mono text-[11px] truncate">SN: {{ asset.serialNumber }}</p>
              <p>Store: {{ asset.store }}</p>
              <p>Purchased: {{ formatDate(asset.purchaseDate) }}</p>
            </div>

            <div class="pt-2 border-t border-surface-border flex items-baseline justify-between">
              <span class="text-[11px] text-mutedText">Purchase Value:</span>
              <span class="text-base font-black text-brand-forest">{{ formatCurrency(asset.purchasePrice) }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 bg-surface-main border-t border-surface-border flex items-center justify-between text-xs">
          <span class="text-mutedText text-[11px]">{{ asset.categoryLabel }}</span>
          <button 
            @click="selectedAsset = asset"
            class="text-brand-emerald font-bold hover:underline"
          >
            View Details & Documents →
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredAssets.length === 0" class="card-surface p-12 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-brand-sage text-brand-forest mx-auto flex items-center justify-center">
        <svg class="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-base font-bold text-brand-forest">No assets matched your search</h3>
      <p class="text-xs text-mutedText max-w-sm mx-auto">Try clearing your search query or switching to another category filter.</p>
    </div>

    <!-- Asset Detail Modal -->
    <div v-if="selectedAsset" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="selectedAsset = null"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-surface-card rounded-2xl shadow-2xl border border-surface-border overflow-hidden">
          <div class="p-6 bg-surface-main border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-brand-forest">{{ selectedAsset.name }}</h3>
              <p class="text-xs text-mutedText">Asset detail inspection & attached files</p>
            </div>
            <button @click="selectedAsset = null" class="p-1 rounded text-mutedText hover:text-brand-forest">✕</button>
          </div>

          <div class="p-6 space-y-6">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Brand & Model</p>
                <p class="font-semibold text-brand-forest mt-0.5">{{ selectedAsset.brand }} ({{ selectedAsset.model }})</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Serial Number</p>
                <p class="font-mono text-brand-forest mt-0.5">{{ selectedAsset.serialNumber }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Purchase Price</p>
                <p class="font-extrabold text-brand-forest mt-0.5">{{ formatCurrency(selectedAsset.purchasePrice) }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Purchase Date</p>
                <p class="font-semibold text-brand-forest mt-0.5">{{ formatDate(selectedAsset.purchaseDate) }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Location</p>
                <p class="font-semibold text-brand-forest mt-0.5">{{ selectedAsset.location }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-mutedText">Vendor</p>
                <p class="font-semibold text-brand-forest mt-0.5">{{ selectedAsset.store }}</p>
              </div>
            </div>

            <!-- Warranty Box -->
            <div class="p-4 rounded-xl bg-brand-sage/40 border border-brand-emerald/20 space-y-1">
              <span class="text-[10px] uppercase font-bold text-brand-forest tracking-wider">Warranty Protection</span>
              <p class="text-xs font-bold text-brand-forest">{{ selectedAsset.warranty?.provider }}</p>
              <p class="text-xs text-mutedText">{{ selectedAsset.warranty?.terms }}</p>
              <p class="text-[11px] font-semibold text-brand-emerald mt-1">Expires: {{ formatDate(selectedAsset.warranty?.expiryDate) }}</p>
            </div>

            <!-- Notes -->
            <div class="p-3 bg-surface-main rounded-xl text-xs space-y-1">
              <span class="text-[10px] uppercase font-bold text-mutedText">Maintenance Notes:</span>
              <p class="text-primaryText">{{ selectedAsset.notes }}</p>
            </div>

            <!-- Attached Documents List -->
            <div>
              <span class="text-xs font-bold text-brand-forest block mb-2">Attached Documents (Protected)</span>
              <div v-if="selectedAsset.documents && selectedAsset.documents.length > 0" class="space-y-2">
                <div 
                  v-for="doc in selectedAsset.documents" 
                  :key="doc.id"
                  class="p-3 rounded-lg border border-surface-border flex items-center justify-between text-xs bg-surface-main"
                >
                  <div class="flex items-center space-x-2">
                    <span class="text-brand-emerald font-bold">📄</span>
                    <span class="font-medium">{{ doc.original_filename }} ({{ Math.round(doc.size_bytes / 1024) }} KB)</span>
                  </div>
                  <span class="text-[10px] text-brand-emerald font-semibold bg-brand-sage px-2 py-0.5 rounded">Encrypted</span>
                </div>
              </div>
              <div v-else-if="selectedAsset.hasReceipt" class="p-3 rounded-lg border border-surface-border flex items-center justify-between text-xs bg-surface-main">
                <div class="flex items-center space-x-2">
                  <span class="text-brand-emerald font-bold">📄</span>
                  <span>receipt_official_invoice.pdf</span>
                </div>
                <span class="text-[10px] text-brand-emerald font-semibold bg-brand-sage px-2 py-0.5 rounded">Verified Scan</span>
              </div>
              <div v-else class="text-xs text-mutedText italic p-2 bg-surface-main rounded border border-surface-border">
                No documents currently attached to this asset.
              </div>
            </div>
          </div>

          <div class="p-4 bg-surface-main border-t border-surface-border flex items-center justify-between">
            <button 
              @click="handleDeleteAsset(selectedAsset.id)" 
              class="text-status-danger text-xs font-bold hover:underline"
            >
              Delete Asset
            </button>
            <button @click="selectedAsset = null" class="btn-forest text-xs py-2 px-4">Close Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { assetService } from '@/services/assetService';
import { DEMO_CATEGORIES } from '@/services/demoData';
import { formatCurrency, formatDate, calculateWarrantyStatus } from '@/utils/formatters';

defineEmits(['open-add-asset']);

const assets = assetService.assets;
const categories = DEMO_CATEGORIES;
const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedAsset = ref(null);

const filteredAssets = computed(() => {
  return assets.value.filter(item => {
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.brand.toLowerCase().includes(q) || 
      (item.serialNumber && item.serialNumber.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
});

const handleDeleteAsset = async (id) => {
  if (confirm('Are you sure you want to delete this asset? This action will remove its registered warranty and logs.')) {
    await assetService.deleteAsset(id);
    selectedAsset.value = null;
  }
};

const getWarrantyBadgeClass = (expiryDate) => calculateWarrantyStatus(expiryDate).badgeClass;
const getWarrantyLabel = (expiryDate) => calculateWarrantyStatus(expiryDate).label;
</script>
