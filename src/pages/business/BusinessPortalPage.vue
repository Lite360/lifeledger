<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest uppercase tracking-wider">
            Commercial Partner Hub
          </span>
          <span class="text-xs text-mutedText">Phase 4</span>
        </div>
        <h1 class="text-2xl font-black text-brand-forest mt-1">Provider & Technician Portal</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Grow your Nigerian repair enterprise. Get qualified household quote leads and build verifiable repair history.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <button 
          @click="activeTab = 'register'"
          class="text-xs py-2 px-4 rounded-lg font-bold transition-all"
          :class="activeTab === 'register' ? 'bg-brand-forest text-white' : 'btn-secondary'"
        >
          Partner Registration
        </button>
        <button 
          @click="activeTab = 'requests'"
          class="text-xs py-2 px-4 rounded-lg font-bold transition-all"
          :class="activeTab === 'requests' ? 'bg-brand-forest text-white' : 'btn-secondary'"
        >
          Open Inbound Leads ({{ openRequests.length }})
        </button>
      </div>
    </div>

    <!-- TAB 1: PARTNER APPLICATION / REGISTRATION -->
    <div v-if="activeTab === 'register'" class="space-y-6">
      <!-- Value Proposition Banner -->
      <div class="bg-gradient-to-r from-brand-forest to-[#1A4E3B] text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div class="relative z-10 max-w-xl space-y-3">
          <h2 class="text-lg sm:text-xl font-black">Turn household maintenance into predictable revenue</h2>
          <p class="text-xs text-brand-sage/90 leading-relaxed">
            Over 60% of Nigerian appliance breakdowns occur from deferred maintenance. Verified partners gain direct access to recurring generator service contracts, AC chemical washes, and solar battery diagnostics.
          </p>
          <div class="flex flex-wrap gap-4 pt-2 text-[11px] text-emerald-200">
            <span class="flex items-center space-x-1">✓ CAC or verified artisan check</span>
            <span class="flex items-center space-x-1">✓ Zero upfront listing commission</span>
            <span class="flex items-center space-x-1">✓ Digital proof of service stamps</span>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div class="card-surface p-6 sm:p-8 space-y-6">
        <div class="border-b border-surface-border pb-4">
          <h3 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Business Verification Application</h3>
          <p class="text-xs text-mutedText">Submit your business credentials to obtain a LifeLedger Verified Partner badge.</p>
        </div>

        <div v-if="submitSuccess" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-brand-forest space-y-2">
          <div class="flex items-center space-x-2 font-bold text-brand-emerald">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Application Submitted for Review!</span>
          </div>
          <p class="text-mutedText">
            Your application for <span class="font-bold text-brand-forest">{{ form.businessName }}</span> has been submitted to the compliance desk. Administrators can approve your listing in the admin console.
          </p>
          <div class="pt-2 flex gap-3">
            <button @click="submitSuccess = false" class="btn-emerald py-1.5 px-3 text-xs">
              Submit Another Profile
            </button>
            <router-link to="/directory" class="btn-secondary py-1.5 px-3 text-xs">
              View Directory
            </router-link>
          </div>
        </div>

        <form v-else @submit.prevent="handleRegisterProvider" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Company / Workshop Name *</label>
              <input v-model="form.businessName" type="text" required placeholder="e.g. Apex Generator & Power Solutions" class="form-input" />
            </div>
            <div>
              <label class="form-label">CAC Registration Number (RC or BN)</label>
              <input v-model="form.cacNumber" type="text" placeholder="e.g. RC-1489201 or BN-209410" class="form-input" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">Lead Engineer / Contact Person *</label>
              <input v-model="form.contactPerson" type="text" required placeholder="e.g. Engr. Tunde Adeleke" class="form-input" />
            </div>
            <div>
              <label class="form-label">Nigerian WhatsApp / Phone Line *</label>
              <input v-model="form.phone" type="tel" required placeholder="+234 803 000 0000" class="form-input" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="form-label">Operating State *</label>
              <select v-model="form.stateLocation" class="form-input">
                <option value="Lagos">Lagos State</option>
                <option value="Abuja">Abuja (FCT)</option>
                <option value="Port Harcourt">Port Harcourt (Rivers)</option>
                <option value="Ibadan">Ibadan (Oyo)</option>
                <option value="Kano">Kano State</option>
              </select>
            </div>
            <div>
              <label class="form-label">Primary Specialty Category *</label>
              <select v-model="form.primaryCategory" class="form-input">
                <option value="power">Generators & Inverters</option>
                <option value="cooling">Air Conditioning & HVAC</option>
                <option value="solar">Solar PV & Lithium Battery</option>
                <option value="kitchen">Refrigeration & Freezers</option>
                <option value="electronics">Electronics & Motherboard</option>
                <option value="appliances">Washing Machines & Home</option>
              </select>
            </div>
            <div>
              <label class="form-label">Years of Experience *</label>
              <input v-model.number="form.yearsInBusiness" type="number" min="1" max="50" required class="form-input" />
            </div>
          </div>

          <div>
            <label class="form-label">Workshop Address / Base Location *</label>
            <input v-model="form.address" type="text" required placeholder="e.g. Plot 18, Commercial Road, Victoria Island, Lagos" class="form-input" />
          </div>

          <div>
            <label class="form-label">Services Tagline</label>
            <input v-model="form.tagline" type="text" placeholder="e.g. Perkins certified diesel engine maintenance & AVR troubleshooting" class="form-input" />
          </div>

          <div>
            <label class="form-label">Professional Experience & Special Equipment</label>
            <textarea v-model="form.bio" rows="3" placeholder="Describe diagnostic tools, certifications, and service turnaround time..." class="form-input"></textarea>
          </div>

          <div class="pt-4 border-t border-surface-border flex justify-end">
            <button type="submit" :disabled="submitting" class="btn-emerald py-2.5 px-6 font-bold shadow-sm">
              <span v-if="submitting">Submitting Application...</span>
              <span v-else>Submit Application for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- TAB 2: INBOUND LEADS & SUBMIT QUOTES -->
    <div v-else-if="activeTab === 'requests'" class="space-y-6">
      <div class="card-surface p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-surface-border pb-3">
          <div>
            <h3 class="text-sm font-bold text-brand-forest uppercase tracking-wider">Inbound Household Leads</h3>
            <p class="text-xs text-mutedText">Submit official quotes for active repair requests across your location.</p>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-brand-forest">
            {{ openRequests.length }} Opportunities
          </span>
        </div>

        <div v-if="openRequests.length > 0" class="space-y-4">
          <div 
            v-for="req in openRequests" 
            :key="req.id"
            class="p-5 rounded-xl border border-surface-border bg-surface-main/50 space-y-3"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                  {{ req.urgency }} Urgency
                </span>
                <h4 class="text-sm font-bold text-brand-forest mt-1">{{ req.title }}</h4>
                <p class="text-xs text-mutedText">Asset: {{ req.assetName }}</p>
              </div>

              <div class="text-right">
                <span class="text-xs font-semibold text-mutedText">Household Budget Ceiling:</span>
                <p class="text-sm font-black text-brand-forest">{{ req.budgetMax ? formatNaira(req.budgetMax) : 'Open to quote' }}</p>
              </div>
            </div>

            <p class="text-xs text-brand-forest bg-white p-3 rounded-lg border border-surface-border">
              {{ req.description }}
            </p>

            <!-- Technician Fast Quote Accordion -->
            <div class="pt-2 border-t border-surface-border flex items-center justify-between">
              <span class="text-xs text-mutedText font-medium">
                {{ req.quotes.length }} quotes currently submitted
              </span>
              <button 
                @click="openQuoteForm(req)"
                class="btn-forest text-xs py-1.5 px-3"
              >
                Submit Professional Quote
              </button>
            </div>

            <!-- Inline quote submission form -->
            <div v-if="selectedQuoteReqId === req.id" class="p-4 rounded-xl bg-white border border-brand-emerald/40 space-y-3 mt-3 animate-fadeIn">
              <h5 class="text-xs font-bold text-brand-forest">Submit Quote for {{ req.title }}</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="form-label">Quoted Price (₦ Naira) *</label>
                  <input v-model.number="quoteForm.amount" type="number" required placeholder="e.g. 45000" class="form-input" />
                </div>
                <div>
                  <label class="form-label">Estimated Turnaround *</label>
                  <input v-model="quoteForm.estimatedDuration" type="text" placeholder="e.g. 3 hours on-site" class="form-input" />
                </div>
              </div>
              <div class="text-xs">
                <label class="form-label">Workmanship Guarantee / Warranty</label>
                <input v-model="quoteForm.warrantyOffered" type="text" placeholder="e.g. 60-day replacement on gaskets & seals" class="form-input" />
              </div>
              <div class="text-xs">
                <label class="form-label">Scope of Work & Parts Breakdown *</label>
                <textarea v-model="quoteForm.notes" rows="2" required placeholder="Specify oil brand, OEM part numbers, and calibration steps..." class="form-input"></textarea>
              </div>
              <div class="flex justify-end space-x-2 pt-2">
                <button @click="selectedQuoteReqId = null" type="button" class="btn-secondary py-1.5 px-3 text-xs">
                  Cancel
                </button>
                <button @click="handleSendQuote(req.id)" type="button" class="btn-emerald py-1.5 px-4 text-xs font-bold">
                  Send Quote to Household
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="p-8 text-center text-xs text-mutedText">
          No open repair requests waiting in your zone at this moment.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { providerService } from '@/services/providerService';
import { quoteService } from '@/services/quoteService';
import { formatNaira } from '@/utils/formatters';

const activeTab = ref('register');
const submitting = ref(false);
const submitSuccess = ref(false);

const selectedQuoteReqId = ref(null);
const quoteForm = reactive({
  amount: 45000,
  estimatedDuration: '4 hours on-site',
  warrantyOffered: '60 days workmanship warranty',
  notes: 'Includes genuine replacement parts and precision testing.',
});

const form = reactive({
  businessName: '',
  cacNumber: '',
  contactPerson: '',
  phone: '',
  stateLocation: 'Lagos',
  primaryCategory: 'power',
  yearsInBusiness: 5,
  address: '',
  tagline: '',
  bio: '',
});

const openRequests = computed(() => {
  return quoteService.getAllRequests().filter(r => r.status === 'open' || r.status === 'quotes_received');
});

const handleRegisterProvider = async () => {
  submitting.value = true;
  try {
    const res = await providerService.registerProvider({
      businessName: form.businessName,
      cacNumber: form.cacNumber,
      contactPerson: form.contactPerson,
      phone: form.phone,
      stateLocation: form.stateLocation,
      serviceCategories: [form.primaryCategory],
      yearsInBusiness: form.yearsInBusiness,
      address: form.address,
      tagline: form.tagline,
      bio: form.bio,
    });

    if (res.success) {
      submitSuccess.value = true;
    }
  } finally {
    submitting.value = false;
  }
};

const openQuoteForm = (req) => {
  selectedQuoteReqId.value = req.id;
  quoteForm.amount = req.budgetMax ? Math.round(req.budgetMax * 0.9) : 45000;
};

const handleSendQuote = async (reqId) => {
  const verified = providerService.getVerifiedProviders()[0];
  await quoteService.submitQuote(reqId, {
    providerId: verified ? verified.id : 'sp-101',
    providerName: verified ? verified.businessName : 'Registered Certified Provider',
    amount: quoteForm.amount,
    estimatedDuration: quoteForm.estimatedDuration,
    warrantyOffered: quoteForm.warrantyOffered,
    notes: quoteForm.notes,
  });

  selectedQuoteReqId.value = null;
  alert('Quote successfully submitted to the household!');
};
</script>
