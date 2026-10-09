<template>
  <div v-if="isOpen && plan" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/70 backdrop-blur-sm overflow-y-auto">
    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-surface-border overflow-hidden animate-fadeIn">
      <!-- Paystack Trust Header -->
      <div class="bg-[#0BA4DB]/10 px-6 py-4 border-b border-[#0BA4DB]/20 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Paystack Brand Icon -->
          <div class="w-7 h-7 rounded-lg bg-[#0BA4DB] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            P
          </div>
          <div>
            <div class="flex items-center space-x-1">
              <span class="text-xs font-bold text-gray-900 tracking-tight">Paystack</span>
              <span class="text-[10px] text-gray-500 font-medium">Checkout</span>
            </div>
            <p class="text-[10px] text-gray-500">Secured 256-Bit SSL Encryption</p>
          </div>
        </div>
        <button @click="close" class="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Plan Order Summary -->
      <div class="p-6 space-y-4">
        <div class="p-4 rounded-xl bg-surface-main border border-surface-border flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-brand-forest">{{ plan.name }}</p>
            <p class="text-[11px] text-mutedText capitalize">Billed {{ billingCycle }}</p>
          </div>
          <div class="text-right">
            <p class="text-base font-extrabold text-brand-emerald">
              {{ formatNaira(amount) }}
            </p>
            <p class="text-[10px] text-mutedText">NGN</p>
          </div>
        </div>

        <!-- Payment Channel Selection -->
        <div class="space-y-2">
          <p class="text-xs font-semibold text-gray-700">Select Payment Method</p>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button 
              type="button"
              @click="channel = 'card'"
              class="p-2.5 rounded-lg border text-center font-medium transition-all flex flex-col items-center justify-center space-y-1"
              :class="channel === 'card' ? 'border-[#0BA4DB] bg-[#0BA4DB]/5 text-[#0BA4DB] font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Debit Card</span>
            </button>
            <button 
              type="button"
              @click="channel = 'bank_transfer'"
              class="p-2.5 rounded-lg border text-center font-medium transition-all flex flex-col items-center justify-center space-y-1"
              :class="channel === 'bank_transfer' ? 'border-[#0BA4DB] bg-[#0BA4DB]/5 text-[#0BA4DB] font-bold shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span>Bank Transfer</span>
            </button>
          </div>
        </div>

        <!-- Simulated Card Inputs -->
        <div v-if="channel === 'card'" class="space-y-3 text-xs">
          <div>
            <label class="block text-[11px] font-medium text-gray-600 mb-1">Card Number</label>
            <div class="relative">
              <input 
                type="text" 
                v-model="cardNumber"
                placeholder="5399 •••• •••• 8841 (Mastercard / Verve / Visa)"
                class="form-input text-xs font-mono" 
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">NG</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-medium text-gray-600 mb-1">Expiry (MM/YY)</label>
              <input type="text" v-model="cardExpiry" placeholder="10/28" class="form-input text-xs font-mono" />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-gray-600 mb-1">CVV</label>
              <input type="password" v-model="cardCvv" maxlength="3" placeholder="•••" class="form-input text-xs font-mono" />
            </div>
          </div>
        </div>

        <!-- Simulated Transfer Info -->
        <div v-else class="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-2">
          <p class="text-gray-600">Simulated Dedicated Virtual Account:</p>
          <div class="flex justify-between items-center py-1 border-b border-gray-200">
            <span class="text-gray-500 font-medium">Bank</span>
            <span class="font-bold text-gray-800">Wema Bank / Paystack Titan</span>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-gray-200">
            <span class="text-gray-500 font-medium">Account Number</span>
            <span class="font-mono font-bold text-[#0BA4DB]">9928103847</span>
          </div>
          <p class="text-[10px] text-gray-500 italic">Clicking Pay will simulate an instant webhook credit confirmation.</p>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center space-x-2">
          <span>⚠️ {{ errorMessage }}</span>
        </div>

        <!-- Submit Button -->
        <button 
          @click="handlePay"
          :disabled="isProcessing"
          class="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#0BA4DB] hover:bg-[#098cb9] transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <svg v-if="isProcessing" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span v-if="isProcessing">Verifying with Paystack...</span>
          <span v-else>Pay {{ formatNaira(amount) }}</span>
        </button>

        <p class="text-center text-[10px] text-gray-400">
          Payment processed securely via Paystack Nigeria (Central Bank of Nigeria PSSP Licensed).
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { subscriptionService } from '@/services/subscriptionService';
import { formatNaira } from '@/utils/formatters';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  plan: { type: Object, default: null },
  billingCycle: { type: String, default: 'monthly' },
});

const emit = defineEmits(['close', 'payment-success']);

const channel = ref('card');
const cardNumber = ref('5399 2810 9940 8841');
const cardExpiry = ref('08/29');
const cardCvv = ref('384');
const isProcessing = ref(false);
const errorMessage = ref('');

const amount = computed(() => {
  if (!props.plan) return 0;
  return props.billingCycle === 'annual' ? props.plan.priceAnnual : props.plan.priceMonthly;
});

const close = () => {
  emit('close');
};

const handlePay = async () => {
  if (amount.value <= 0) {
    emit('payment-success', { plan: props.plan });
    close();
    return;
  }

  isProcessing.value = true;
  errorMessage.value = '';

  try {
    const res = await subscriptionService.processPayment({
      planId: props.plan.id,
      billingCycle: props.billingCycle,
      channel: channel.value,
    });

    if (res.success) {
      emit('payment-success', res);
      close();
    } else {
      errorMessage.value = 'Payment verification failed. Please try again.';
    }
  } catch (err) {
    errorMessage.value = err.message || 'Error processing transaction';
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.15s ease-out forwards;
}
</style>
