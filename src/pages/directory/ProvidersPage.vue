<template>
  <div class="space-y-6">
    <!-- Page Header & Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Vetted Service Directory</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Find certified Nigerian technicians, generator specialists, and HVAC engineers for your household.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <router-link to="/business/portal" class="btn-secondary text-xs py-2.5 px-4 flex items-center space-x-2">
          <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>For Businesses</span>
        </router-link>

        <button 
          @click="openQuoteModal(null)"
          class="btn-emerald text-xs py-2.5 px-4 flex items-center space-x-2 shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Broadcast Request</span>
        </button>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="card-surface p-4 space-y-4">
      <div class="flex flex-col md:flex-row items-center gap-3">
        <!-- Search Input -->
        <div class="relative flex-1 w-full">
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mutedText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by specialty, company name, Perkins, inverter, LG..."
            class="form-input pl-9 text-xs"
          />
        </div>

        <!-- Location Filter -->
        <div class="w-full md:w-48">
          <select v-model="selectedLocation" class="form-input text-xs">
            <option value="all">All Locations (Nigeria)</option>
            <option value="lagos">Lagos State</option>
            <option value="abuja">Abuja (FCT)</option>
            <option value="port harcourt">Port Harcourt (Rivers)</option>
            <option value="ibadan">Ibadan (Oyo)</option>
          </select>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0"
          :class="selectedCategory === cat.id ? 'bg-brand-emerald text-white shadow-sm' : 'bg-surface-main text-mutedText hover:text-brand-forest hover:bg-emerald-50'"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Providers Grid -->
    <div v-if="filteredProviders.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="provider in filteredProviders" 
        :key="provider.id"
        class="card-surface p-5 flex flex-col justify-between hover:border-brand-emerald/40 transition-all hover:shadow-md"
      >
        <div class="space-y-3">
          <!-- Header with Rating and Verification Badge -->
          <div class="flex items-start justify-between">
            <div>
              <span class="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest border border-emerald-200">
                <svg class="w-3 h-3 text-brand-emerald" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>{{ provider.badge || 'Verified Partner' }}</span>
              </span>
              <h3 class="text-sm font-bold text-brand-forest mt-1.5 line-clamp-1">
                {{ provider.businessName }}
              </h3>
            </div>
            
            <div class="flex items-center space-x-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-md">
              <span>★</span>
              <span>{{ provider.rating }}</span>
              <span class="text-mutedText text-[10px]">({{ provider.reviewCount }})</span>
            </div>
          </div>

          <p class="text-xs text-mutedText line-clamp-2">
            {{ provider.tagline }}
          </p>

          <!-- Contact details & Location -->
          <div class="space-y-1.5 text-[11px] text-mutedText pt-2 border-t border-surface-border">
            <div class="flex items-center space-x-2">
              <svg class="w-3.5 h-3.5 text-brand-emerald shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="truncate">{{ provider.address }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-3.5 h-3.5 text-brand-emerald shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="font-medium text-brand-forest">{{ provider.phone }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-3.5 h-3.5 text-brand-emerald shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>{{ provider.completedJobs }} completed ledger repairs</span>
            </div>
          </div>
        </div>

        <!-- Footer / Request Quote Button -->
        <div class="pt-4 mt-3 border-t border-surface-border flex items-center justify-between">
          <div>
            <p class="text-[10px] text-mutedText">Typical Estimate</p>
            <p class="text-[11px] font-bold text-brand-forest truncate max-w-[130px]">{{ provider.pricingRange }}</p>
          </div>
          <button 
            @click="openQuoteModal(provider)"
            class="btn-forest text-xs py-1.5 px-3 rounded-lg flex items-center space-x-1"
          >
            <span>Request Quote</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="card-surface p-12 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-emerald-50 text-brand-emerald flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-bold text-brand-forest">No matching verified providers found</h3>
      <p class="text-xs text-mutedText max-w-sm mx-auto">
        Try adjusting your search criteria or location filter, or broadcast an open request to all technicians in Nigeria.
      </p>
      <button @click="resetFilters" class="btn-secondary text-xs py-2 px-4">
        Reset Search Filters
      </button>
    </div>

    <!-- Quote Request Modal -->
    <RequestQuoteModal 
      :is-open="isModalOpen"
      :target-provider="modalProvider"
      @close="isModalOpen = false"
      @request-created="handleRequestCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { providerService } from '@/services/providerService';
import RequestQuoteModal from '@/components/quotes/RequestQuoteModal.vue';

const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedLocation = ref('all');

const isModalOpen = ref(false);
const modalProvider = ref(null);

const categories = [
  { id: 'all', label: 'All Specialties' },
  { id: 'power', label: 'Generators & Inverters' },
  { id: 'cooling', label: 'Air Conditioning (HVAC)' },
  { id: 'solar', label: 'Solar PV & Batteries' },
  { id: 'kitchen', label: 'Refrigeration & Chest Freezers' },
  { id: 'electronics', label: 'Smart TV & Boards' },
  { id: 'appliances', label: 'Washing Machines & Home' },
];

const filteredProviders = computed(() => {
  return providerService.getFilteredProviders({
    category: selectedCategory.value,
    location: selectedLocation.value,
    search: searchQuery.value,
    onlyVerified: true,
  });
});

const openQuoteModal = (provider) => {
  modalProvider.value = provider;
  isModalOpen.value = true;
};

const handleRequestCreated = (req) => {
  router.push('/quotes');
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedLocation.value = 'all';
};
</script>
