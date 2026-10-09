<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Quotes & Service Requests</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Review repair quotes from verified technicians, negotiate terms, and authorize ledger work.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <router-link to="/directory" class="btn-secondary text-xs py-2.5 px-4 flex items-center space-x-2">
          <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Browse Directory</span>
        </router-link>

        <button @click="isNewRequestModalOpen = true" class="btn-emerald text-xs py-2.5 px-4 flex items-center space-x-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Quote Request</span>
        </button>
      </div>
    </div>

    <!-- Requests List with nested quotes -->
    <div v-if="requests.length > 0" class="space-y-6">
      <div 
        v-for="req in requests" 
        :key="req.id"
        class="card-surface p-6 space-y-5 border border-surface-border"
      >
        <!-- Request Summary Header -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-surface-border pb-4">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                :class="getUrgencyBadge(req.urgency)"
              >
                {{ req.urgency }}
              </span>
              <span class="text-xs text-mutedText">• Requested {{ formatDate(req.createdAt) }}</span>
            </div>
            <h2 class="text-base font-bold text-brand-forest">{{ req.title }}</h2>
            <p class="text-xs text-mutedText">
              Asset: <span class="font-semibold text-brand-forest">{{ req.assetName }}</span>
            </p>
          </div>

          <div class="text-right shrink-0">
            <span 
              class="px-3 py-1 rounded-full text-xs font-bold"
              :class="getStatusBadge(req.status)"
            >
              {{ formatStatus(req.status) }}
            </span>
            <p v-if="req.budgetMax" class="text-[11px] text-mutedText mt-1">
              Budget: <span class="font-semibold text-brand-forest">{{ formatNaira(req.budgetMax) }}</span>
            </p>
          </div>
        </div>

        <!-- Issue Description -->
        <p class="text-xs text-brand-forest/90 leading-relaxed bg-surface-main p-3.5 rounded-xl border border-surface-border">
          {{ req.description }}
        </p>

        <!-- Quotes Section -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-brand-forest flex items-center space-x-2">
              <span>Technician Quotes Received ({{ req.quotes.length }})</span>
            </h3>
            <span v-if="req.quotes.length === 0" class="text-xs text-mutedText italic">
              Awaiting technician responses from local directory...
            </span>
          </div>

          <!-- Quotes Grid -->
          <div v-if="req.quotes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="quote in req.quotes" 
              :key="quote.id"
              class="p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3"
              :class="quote.status === 'accepted' ? 'bg-emerald-50/50 border-brand-emerald shadow-sm' : 'bg-white border-surface-border hover:border-brand-emerald/30'"
            >
              <div class="space-y-2">
                <!-- Provider info & Price -->
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-xs font-bold text-brand-forest">{{ quote.providerName }}</h4>
                    <p class="text-[10px] text-emerald-600 font-semibold">Verified Provider</p>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-black text-brand-forest">{{ formatNaira(quote.amount) }}</span>
                    <p class="text-[10px] text-mutedText">{{ quote.currency }}</p>
                  </div>
                </div>

                <!-- Notes / Work details -->
                <p class="text-xs text-mutedText bg-surface-main p-2.5 rounded-lg border border-surface-border/50">
                  {{ quote.notes }}
                </p>

                <!-- Warranty & Turnaround badges -->
                <div class="flex flex-wrap gap-2 text-[10px] pt-1">
                  <span class="px-2 py-0.5 rounded bg-surface-main text-brand-forest border border-surface-border flex items-center space-x-1">
                    <span>⏱</span>
                    <span>{{ quote.estimatedDuration }}</span>
                  </span>
                  <span class="px-2 py-0.5 rounded bg-emerald-100 text-brand-forest border border-emerald-200 flex items-center space-x-1 font-medium">
                    <span>🛡️</span>
                    <span>{{ quote.warrantyOffered }}</span>
                  </span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="pt-2 border-t border-surface-border/60 flex items-center justify-between text-xs">
                <span v-if="quote.status === 'accepted'" class="font-bold text-brand-emerald flex items-center space-x-1 text-xs">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Quote Authorized</span>
                </span>
                <span v-else-if="quote.status === 'declined'" class="text-mutedText text-xs italic">
                  Quote Declined
                </span>
                <div v-else class="w-full flex items-center justify-end space-x-2">
                  <button 
                    @click="handleDeclineQuote(req.id, quote.id)"
                    class="btn-secondary py-1.5 px-3 text-xs"
                  >
                    Decline
                  </button>
                  <button 
                    @click="handleAcceptQuote(req.id, quote.id)"
                    class="btn-emerald py-1.5 px-4 text-xs shadow-sm"
                  >
                    Accept & Hire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="card-surface p-12 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-emerald-50 text-brand-emerald flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-sm font-bold text-brand-forest">No Service Requests Active</h3>
      <p class="text-xs text-mutedText max-w-sm mx-auto">
        Request a repair or maintenance quote for any of your household assets from vetted local technicians.
      </p>
      <button @click="isNewRequestModalOpen = true" class="btn-emerald text-xs py-2 px-4">
        Create Your First Request
      </button>
    </div>

    <!-- Request Quote Modal -->
    <RequestQuoteModal 
      :is-open="isNewRequestModalOpen"
      @close="isNewRequestModalOpen = false"
      @request-created="handleRequestCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { quoteService } from '@/services/quoteService';
import { formatNaira, formatDate } from '@/utils/formatters';
import RequestQuoteModal from '@/components/quotes/RequestQuoteModal.vue';

const isNewRequestModalOpen = ref(false);
const requests = computed(() => quoteService.getAllRequests());

const getUrgencyBadge = (urgency) => {
  switch (urgency) {
    case 'emergency':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'urgent':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'low':
      return 'bg-blue-50 text-blue-800 border border-blue-200';
    default:
      return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'in_progress':
      return 'bg-emerald-100 text-brand-forest border border-emerald-200';
    case 'quotes_received':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'completed':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-amber-50 text-amber-800';
  }
};

const formatStatus = (status) => {
  switch (status) {
    case 'quotes_received': return 'Quotes Received';
    case 'in_progress': return 'Work in Progress';
    case 'completed': return 'Completed';
    default: return 'Open Request';
  }
};

const handleAcceptQuote = (reqId, quoteId) => {
  quoteService.acceptQuote(reqId, quoteId);
};

const handleDeclineQuote = (reqId, quoteId) => {
  quoteService.declineQuote(reqId, quoteId);
};

const handleRequestCreated = () => {
  // Automatically refreshed via computed
};
</script>
