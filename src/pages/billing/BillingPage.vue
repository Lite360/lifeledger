<template>
  <div class="space-y-8 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest uppercase tracking-wider">
            Billing & Plans
          </span>
          <span class="text-xs text-mutedText">Paystack Powered</span>
        </div>
        <h1 class="text-2xl font-black text-brand-forest mt-1">Subscriptions & Billing</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Choose a transparent plan for your household or repair business in Nigerian Naira (₦).
        </p>
      </div>

      <!-- Billing Cycle Toggle -->
      <div class="flex items-center bg-surface-main p-1 rounded-xl border border-surface-border text-xs">
        <button
          @click="subscriptionService.setBillingCycle('monthly')"
          class="px-4 py-2 rounded-lg font-bold transition-all"
          :class="billingCycle === 'monthly' ? 'bg-white text-brand-forest shadow-sm' : 'text-mutedText hover:text-brand-forest'"
        >
          Monthly Billed
        </button>
        <button
          @click="subscriptionService.setBillingCycle('annual')"
          class="px-4 py-2 rounded-lg font-bold transition-all flex items-center space-x-1"
          :class="billingCycle === 'annual' ? 'bg-white text-brand-forest shadow-sm' : 'text-mutedText hover:text-brand-forest'"
        >
          <span>Annual</span>
          <span class="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 text-brand-emerald font-black">SAVE 17%</span>
        </button>
      </div>
    </div>

    <!-- Active Subscription Overview Banner -->
    <div class="card-surface p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-brand-emerald">
      <div class="space-y-1">
        <span class="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Active Household Subscription</span>
        <div class="flex items-center space-x-3">
          <h2 class="text-lg font-black text-brand-forest">{{ currentPlan.name }}</h2>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest">
            Active Status
          </span>
        </div>
        <p class="text-xs text-mutedText">
          {{ currentPlan.description }}
        </p>
      </div>

      <div class="text-left md:text-right shrink-0">
        <p class="text-xs text-mutedText">Current Rate</p>
        <p class="text-xl font-black text-brand-forest">
          {{ currentPlan.priceMonthly === 0 ? '₦0 / Forever Free' : formatNaira(billingCycle === 'annual' ? currentPlan.priceAnnual : currentPlan.priceMonthly) }}
        </p>
      </div>
    </div>

    <!-- Plans Comparison Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        class="card-surface p-6 flex flex-col justify-between relative transition-all hover:shadow-lg"
        :class="[
          plan.isPopular ? 'border-2 border-brand-emerald ring-2 ring-brand-emerald/10' : 'border border-surface-border',
          currentPlan.id === plan.id ? 'bg-emerald-50/20' : ''
        ]"
      >
        <!-- Popular Tag -->
        <div v-if="plan.isPopular" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-emerald text-white shadow-sm">
          Recommended
        </div>

        <div class="space-y-4">
          <div>
            <span class="text-[10px] uppercase font-bold text-mutedText tracking-wider">{{ plan.tier }}</span>
            <h3 class="text-base font-black text-brand-forest mt-0.5">{{ plan.name }}</h3>
            <p class="text-[11px] text-mutedText mt-1 min-h-[32px]">{{ plan.description }}</p>
          </div>

          <!-- Price Display -->
          <div class="py-2 border-y border-surface-border">
            <div class="flex items-baseline space-x-1">
              <span class="text-2xl font-black text-brand-forest">
                {{ formatPrice(plan) }}
              </span>
              <span class="text-xs text-mutedText font-semibold">
                / {{ billingCycle === 'annual' ? 'yr' : 'mo' }}
              </span>
            </div>
            <p v-if="plan.priceMonthly > 0 && billingCycle === 'annual'" class="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Includes 2 months free discount
            </p>
          </div>

          <!-- Features List -->
          <ul class="space-y-2.5 text-xs text-brand-forest">
            <li v-for="(feat, idx) in plan.features" :key="idx" class="flex items-start space-x-2">
              <svg class="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-[11px] leading-tight text-gray-700">{{ feat }}</span>
            </li>
          </ul>
        </div>

        <!-- Action CTA -->
        <div class="pt-6 mt-4">
          <button
            v-if="currentPlan.id === plan.id"
            disabled
            class="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-surface-main text-mutedText cursor-default border border-surface-border text-center"
          >
            Current Active Plan
          </button>
          <button
            v-else
            @click="handleSelectPlan(plan)"
            class="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm text-center"
            :class="plan.isPopular ? 'btn-emerald' : 'btn-forest'"
          >
            {{ plan.ctaText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Payment & Invoice History Table -->
    <div class="card-surface p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h3 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Payment Transactions & Invoices</h3>
          <p class="text-xs text-mutedText">Verified transactions processed through Paystack.</p>
        </div>
        <span class="text-xs font-semibold text-mutedText">
          {{ transactions.length }} Records
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-surface-border text-mutedText font-semibold">
              <th class="pb-3">Reference</th>
              <th class="pb-3">Plan / Description</th>
              <th class="pb-3">Amount</th>
              <th class="pb-3">Channel</th>
              <th class="pb-3">Date</th>
              <th class="pb-3">Status</th>
              <th class="pb-3 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-border">
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-surface-main/50 transition-colors">
              <td class="py-3 font-mono text-[11px] font-bold text-brand-forest">{{ tx.reference }}</td>
              <td class="py-3 font-semibold text-brand-forest">{{ tx.planName }}</td>
              <td class="py-3 font-bold text-brand-forest">{{ tx.amount === 0 ? '₦0' : formatNaira(tx.amount) }}</td>
              <td class="py-3 capitalize text-mutedText">{{ tx.channel || 'Card' }}</td>
              <td class="py-3 text-mutedText">{{ formatDate(tx.paidAt) }}</td>
              <td class="py-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest">
                  {{ tx.status }}
                </span>
              </td>
              <td class="py-3 text-right">
                <button @click="downloadReceipt(tx)" class="text-brand-emerald hover:underline font-bold text-[11px]">
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Paystack Checkout Modal -->
    <PaystackCheckoutModal 
      :is-open="isCheckoutOpen"
      :plan="selectedPlan"
      :billing-cycle="billingCycle"
      @close="isCheckoutOpen = false"
      @payment-success="handlePaymentSuccess"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { subscriptionService } from '@/services/subscriptionService';
import { formatNaira, formatDate } from '@/utils/formatters';
import PaystackCheckoutModal from '@/components/billing/PaystackCheckoutModal.vue';

const plans = subscriptionService.getAllPlans();
const billingCycle = computed(() => subscriptionService.state.billingCycle);
const currentPlan = computed(() => subscriptionService.getCurrentPlan());
const transactions = computed(() => subscriptionService.state.transactions);

const isCheckoutOpen = ref(false);
const selectedPlan = ref(null);

const formatPrice = (plan) => {
  if (plan.priceMonthly === 0) return 'Free';
  const val = billingCycle.value === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  return formatNaira(val);
};

const handleSelectPlan = (plan) => {
  selectedPlan.value = plan;
  isCheckoutOpen.value = true;
};

const handlePaymentSuccess = (res) => {
  alert(`Thank you! Your household subscription has been upgraded to ${res.plan.name}.`);
};

const downloadReceipt = (tx) => {
  alert(`Downloading official tax receipt for ${tx.reference}... In production this delivers an NDPR-compliant PDF receipt.`);
};
</script>
