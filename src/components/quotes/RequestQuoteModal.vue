<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm overflow-y-auto">
    <div class="relative w-full max-w-xl bg-surface-card rounded-2xl shadow-2xl border border-surface-border overflow-hidden my-8">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-surface-main border-b border-surface-border flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-brand-forest">Request Service Quote</h3>
            <p class="text-xs text-mutedText">
              {{ targetProvider ? `Send private request to ${targetProvider.businessName}` : 'Broadcast to vetted local Nigerian technicians' }}
            </p>
          </div>
        </div>
        <button @click="close" class="p-1.5 rounded-lg text-mutedText hover:bg-surface-border/50 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 text-xs">
        <!-- Target Provider Highlight (if pre-selected) -->
        <div v-if="targetProvider" class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-brand-emerald"></span>
            <div>
              <p class="font-bold text-brand-forest">{{ targetProvider.businessName }}</p>
              <p class="text-[11px] text-brand-emerald font-medium">{{ targetProvider.tagline }}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest">
            ★ {{ targetProvider.rating }}
          </span>
        </div>

        <!-- Asset Selection -->
        <div>
          <label class="form-label">Select Household Asset (Optional)</label>
          <select v-model="form.assetId" @change="handleAssetSelect" class="form-input">
            <option value="">General household equipment (not in ledger)</option>
            <option v-for="asset in assets" :key="asset.id" :value="asset.id">
              {{ asset.name }} ({{ asset.brand }} - {{ asset.categoryLabel || asset.category }})
            </option>
          </select>
          <p class="text-[10px] text-mutedText mt-1">
            Note: Your private purchase receipts and serial numbers are strictly concealed from technicians per PRD tenant privacy rules.
          </p>
        </div>

        <!-- Category & Urgency -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Service Category *</label>
            <select v-model="form.category" required class="form-input">
              <option value="power">Power & Generators</option>
              <option value="cooling">Cooling & Air Conditioning</option>
              <option value="solar">Solar PV & Inverters</option>
              <option value="kitchen">Kitchen & Refrigeration</option>
              <option value="electronics">Entertainment & Smart TV</option>
              <option value="appliances">Home & Laundry Appliances</option>
            </select>
          </div>
          <div>
            <label class="form-label">Urgency Level *</label>
            <select v-model="form.urgency" required class="form-input">
              <option value="normal">Normal (Within 2-3 days)</option>
              <option value="urgent">Urgent (Within 24 hours)</option>
              <option value="emergency">Emergency (Same-day dispatch)</option>
              <option value="low">Flexible / Routine</option>
            </select>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label class="form-label">Issue Summary / Service Required *</label>
          <input 
            v-model="form.title" 
            type="text" 
            required 
            placeholder="e.g. 250-hour generator overhaul & filter replacement"
            class="form-input" 
          />
        </div>

        <!-- Detailed Description -->
        <div>
          <label class="form-label">Detailed Symptoms / Work Description *</label>
          <textarea 
            v-model="form.description" 
            required 
            rows="3" 
            placeholder="Describe the noise, error codes, cooling performance, or parts needed..."
            class="form-input"
          ></textarea>
        </div>

        <!-- Budget Guidance -->
        <div>
          <label class="form-label">Estimated Budget Ceiling (₦ Optional)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-mutedText">₦</span>
            <input 
              v-model.number="form.budgetMax" 
              type="number" 
              min="0" 
              placeholder="e.g. 50000"
              class="form-input pl-8" 
            />
          </div>
        </div>

        <!-- Security / Privacy notice -->
        <div class="p-3 rounded-lg bg-surface-main border border-surface-border text-[11px] text-mutedText flex items-start space-x-2">
          <svg class="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p>
            You will receive competitive transparent quotes in Nigerian Naira. You only share contact details when you accept a quote.
          </p>
        </div>

        <!-- Modal Footer Actions -->
        <div class="pt-3 border-t border-surface-border flex items-center justify-end space-x-3">
          <button type="button" @click="close" class="btn-secondary py-2 px-4">
            Cancel
          </button>
          <button type="submit" :disabled="submitting" class="btn-emerald py-2 px-5 flex items-center space-x-2">
            <span v-if="submitting">Sending...</span>
            <span v-else>Submit Quote Request</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { assetService } from '@/services/assetService';
import { quoteService } from '@/services/quoteService';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  targetProvider: { type: Object, default: null },
  preselectedAssetId: { type: String, default: '' },
});

const emit = defineEmits(['close', 'request-created']);

const submitting = ref(false);
const assets = computed(() => assetService.getAllAssets());

const form = reactive({
  assetId: props.preselectedAssetId || '',
  category: 'power',
  urgency: 'normal',
  title: '',
  description: '',
  budgetMax: null,
});

const handleAssetSelect = () => {
  if (!form.assetId) return;
  const asset = assets.value.find(a => a.id === form.assetId);
  if (asset) {
    form.category = asset.category || 'power';
    form.title = `Servicing / Repair for ${asset.name}`;
  }
};

const close = () => {
  emit('close');
};

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const selectedAsset = assets.value.find(a => a.id === form.assetId);
    const res = await quoteService.createServiceRequest({
      assetId: form.assetId || null,
      assetName: selectedAsset ? selectedAsset.name : 'Household Equipment',
      category: form.category,
      urgency: form.urgency,
      title: form.title,
      description: form.description,
      budgetMax: form.budgetMax || 0,
      targetProviderId: props.targetProvider ? props.targetProvider.id : null,
    });

    if (res.success) {
      emit('request-created', res.request);
      close();
    }
  } finally {
    submitting.value = false;
  }
};
</script>
