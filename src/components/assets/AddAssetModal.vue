<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm transition-opacity" @click="close"></div>

    <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-2xl bg-surface-card text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-surface-border">
        <!-- Modal Header -->
        <div class="px-6 py-5 bg-surface-main border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-brand-forest leading-6">Register Household Asset</h3>
            <p class="text-xs text-mutedText mt-0.5">Record asset information, upload receipts, and configure warranty protection.</p>
          </div>
          <button 
            @click="close"
            class="text-mutedText hover:text-brand-forest p-1 rounded-lg hover:bg-surface-muted transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
          <div v-if="successMessage" class="p-3 bg-brand-sage border border-brand-emerald/30 text-brand-forest text-xs rounded-lg flex items-center space-x-2">
            <svg class="w-4 h-4 text-brand-emerald shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>{{ successMessage }}</span>
          </div>

          <!-- Basic Info Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="form-label">
                Asset Name <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                placeholder="e.g. Mikano 10kVA Soundproof Generator"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Category <span class="text-status-danger">*</span>
              </label>
              <select v-model="form.category" required class="form-input">
                <option value="power">Power & Inverters (Generators/Solar)</option>
                <option value="cooling">Cooling & HVAC (ACs/Fans)</option>
                <option value="kitchen">Kitchen & Refrigeration</option>
                <option value="electronics">Entertainment & Tech</option>
                <option value="laundry">Home Appliances (Washing/Pumps)</option>
                <option value="other">Other Household Items</option>
              </select>
            </div>

            <div>
              <label class="form-label">
                Location in House <span class="text-mutedText font-normal lowercase">(Optional)</span>
              </label>
              <input 
                v-model="form.location" 
                type="text" 
                placeholder="e.g. Utility Room / Generator Shed"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Brand / Manufacturer <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.brand" 
                type="text" 
                required 
                placeholder="e.g. Mikano, LG, Felicity, Haier"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Model Number <span class="text-mutedText font-normal lowercase">(Optional)</span>
              </label>
              <input 
                v-model="form.model" 
                type="text" 
                placeholder="e.g. MK-10SP-2024"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Serial Number <span class="text-mutedText font-normal lowercase">(Optional)</span>
              </label>
              <input 
                v-model="form.serialNumber" 
                type="text" 
                placeholder="e.g. SER-NG-88391-X"
                class="form-input font-mono text-xs"
              />
            </div>

            <div>
              <label class="form-label">
                Store / Vendor <span class="text-mutedText font-normal lowercase">(Optional)</span>
              </label>
              <input 
                v-model="form.store" 
                type="text" 
                placeholder="e.g. Fouani Lekki, SIMS Marina"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Purchase Date <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.purchaseDate" 
                type="date" 
                required 
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">
                Purchase Price (₦ NGN) <span class="text-status-danger">*</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-mutedText text-xs font-bold">₦</span>
                <input 
                  v-model.number="form.purchasePrice" 
                  type="number" 
                  required 
                  min="0"
                  placeholder="e.g. 850000"
                  class="form-input pl-8"
                />
              </div>
            </div>
          </div>

          <!-- Warranty Section -->
          <div class="pt-3 border-t border-surface-border">
            <h4 class="text-xs font-bold text-brand-forest uppercase tracking-wider mb-3">Warranty Protection</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="form-label">
                  Warranty Provider <span class="text-mutedText font-normal lowercase">(Optional)</span>
                </label>
                <input 
                  v-model="form.warrantyProvider" 
                  type="text" 
                  placeholder="e.g. Official LG 2-Year Warranty"
                  class="form-input"
                />
              </div>
              <div>
                <label class="form-label">
                  Warranty Expiry Date <span class="text-mutedText font-normal lowercase">(Optional)</span>
                </label>
                <input 
                  v-model="form.warrantyExpiry" 
                  type="date" 
                  class="form-input"
                />
              </div>
            </div>
          </div>

          <!-- Receipt & Document Upload Zone Simulation -->
          <div class="pt-3 border-t border-surface-border">
            <label class="form-label">
              Purchase Receipt or Warranty Card <span class="text-mutedText font-normal lowercase">(Optional)</span>
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-surface-border border-dashed rounded-xl hover:border-brand-emerald/50 transition-colors bg-surface-main/50 cursor-pointer">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-10 w-10 text-mutedText" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-xs text-mutedText">
                  <span class="relative font-semibold text-brand-emerald hover:underline">
                    Upload receipt or photo
                  </span>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-[10px] text-mutedText">PNG, JPG, PDF up to 10MB (Private encrypted storage in Phase 2)</p>
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div class="pt-4 border-t border-surface-border flex items-center justify-end space-x-3">
            <button 
              type="button" 
              @click="close"
              class="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-forest text-xs shadow-sm"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Registering Asset...' : 'Save to Household Register' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'asset-added']);

const isSubmitting = ref(false);
const successMessage = ref('');

const initialForm = {
  name: '',
  category: 'power',
  location: '',
  brand: '',
  model: '',
  serialNumber: '',
  store: '',
  purchaseDate: new Date().toISOString().split('T')[0],
  purchasePrice: null,
  warrantyProvider: '',
  warrantyExpiry: '',
};

const form = reactive({ ...initialForm });

const close = () => {
  emit('close');
};

const handleSubmit = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    successMessage.value = 'Asset registered successfully into demo ledger!';
    emit('asset-added', { ...form, id: 'ast-' + Date.now() });
    setTimeout(() => {
      successMessage.value = '';
      Object.assign(form, initialForm);
      close();
    }, 1200);
  }, 600);
};
</script>
