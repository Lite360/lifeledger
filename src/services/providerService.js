/**
 * LifeLedger NG - Service Provider Directory & Management Service
 * Phase 4 Commercial Features
 * Single Source of Truth: prd.md (FR-11, FR-12, Section 4.6)
 */
import { reactive } from 'vue';
import { supabase, isSupabaseConfigured } from './supabase';

export const INITIAL_PROVIDERS = [
  {
    id: 'sp-101',
    businessName: 'Mikano Certified Field Engineering',
    tagline: 'Authorized diesel generator overhauling, servicing & AVR repairs',
    contactPerson: 'Engr. Chukwudi Okafor',
    phone: '+234 803 555 0192',
    email: 'fieldservices@mikano-certified.ng',
    stateLocation: 'Lagos',
    address: 'Plot 14, Commercial Avenue, Victoria Island, Lagos',
    serviceCategories: ['power'],
    categoryLabels: ['Power & Inverters', 'Generators'],
    verificationStatus: 'verified',
    cacNumber: 'RC-1428901',
    yearsInBusiness: 12,
    rating: 4.95,
    reviewCount: 38,
    completedJobs: 142,
    isAvailable: true,
    bio: 'Specialized in Perkins, Cummins, and Mikano soundproof generators. 24/7 emergency dispatch across Lagos Island, Ikoyi, and Lekki.',
    pricingRange: '₦25,000 - ₦150,000 depending on kVA rating',
    badge: 'Certified Partner',
  },
  {
    id: 'sp-102',
    businessName: 'CoolTech HVAC Solutions',
    tagline: 'Dual Inverter AC servicing, precision gas refilling & compressor rebuilds',
    contactPerson: 'Suleiman Danladi',
    phone: '+234 802 444 8831',
    email: 'service@cooltech-ng.com',
    stateLocation: 'Lagos',
    address: '28 Admiralty Way, Lekki Phase 1, Lagos',
    serviceCategories: ['cooling'],
    categoryLabels: ['Cooling & HVAC', 'Air Conditioners'],
    verificationStatus: 'verified',
    cacNumber: 'BN-2894103',
    yearsInBusiness: 8,
    rating: 4.88,
    reviewCount: 29,
    completedJobs: 97,
    isAvailable: true,
    bio: 'R32 and R410A eco-friendly gas refilling, chemical coil washing, and inverter PCB board diagnostics for LG, Panasonic, and Daikin units.',
    pricingRange: '₦15,000 - ₦65,000 per outdoor/indoor unit',
    badge: 'Verified Specialist',
  },
  {
    id: 'sp-103',
    businessName: 'Pragmatic Solar & Energy Labs',
    tagline: 'High-voltage lithium battery balancing, Victron & Felicity solar setups',
    contactPerson: 'Engr. Femi Adewale',
    phone: '+234 818 777 9902',
    email: 'support@pragmaticsolar.ng',
    stateLocation: 'Lagos',
    address: '15 Mobolaji Bank Anthony Way, Ikeja, Lagos',
    serviceCategories: ['power', 'solar'],
    categoryLabels: ['Solar Systems', 'Inverters & Lithium Batteries'],
    verificationStatus: 'verified',
    cacNumber: 'RC-3984120',
    yearsInBusiness: 7,
    rating: 4.92,
    reviewCount: 44,
    completedJobs: 118,
    isAvailable: true,
    bio: 'Professional BMS troubleshooting, solar string optimization, and surge protection installations against lightning strikes and high grid voltage.',
    pricingRange: '₦30,000 - ₦200,000 diagnostics & repair',
    badge: 'Solar Master',
  },
  {
    id: 'sp-104',
    businessName: 'Capital Chill Refrigeration & Appliances',
    tagline: 'Commercial and residential deep freezer, inverter fridge repairs',
    contactPerson: 'Emeka Nwachukwu',
    phone: '+234 807 111 4455',
    email: 'care@capitalchill.com.ng',
    stateLocation: 'Abuja',
    address: 'Suite 4, Garki II Modern Plaza, Abuja FCT',
    serviceCategories: ['kitchen'],
    categoryLabels: ['Kitchen & Refrigeration', 'Chest Freezers'],
    verificationStatus: 'verified',
    cacNumber: 'BN-3108492',
    yearsInBusiness: 6,
    rating: 4.79,
    reviewCount: 21,
    completedJobs: 73,
    isAvailable: true,
    bio: 'Haier Thermocool, Samsung, and Hisense refrigeration technicians. Fast capillary tube unblocking, thermostat changes, and gas charging.',
    pricingRange: '₦18,000 - ₦75,000',
    badge: 'Verified Specialist',
  },
  {
    id: 'sp-105',
    businessName: 'Apex Circuit & TV Hospital',
    tagline: 'Precision micro-soldering, TV mainboard repairs & power supply fixes',
    contactPerson: 'Kunle Oladipo',
    phone: '+234 809 333 1290',
    email: 'info@apexcircuits.ng',
    stateLocation: 'Lagos',
    address: 'Computer Village, Otigba Street, Ikeja, Lagos',
    serviceCategories: ['electronics'],
    categoryLabels: ['Entertainment & Tech', 'Smart TVs'],
    verificationStatus: 'verified',
    cacNumber: 'BN-2098411',
    yearsInBusiness: 10,
    rating: 4.82,
    reviewCount: 33,
    completedJobs: 120,
    isAvailable: true,
    bio: 'Component-level motherboard repair for Samsung, Sony, and LG OLED/QLED TVs. Avoid expensive full-panel replacement costs.',
    pricingRange: '₦20,000 - ₦80,000',
    badge: 'Tech Specialist',
  },
  {
    id: 'sp-106',
    businessName: 'PrimeWash Appliance Technicians',
    tagline: 'Front-loader & top-loader washing machine repair and genuine parts',
    contactPerson: 'David Danjuma',
    phone: '+234 806 888 2219',
    email: 'david@primewash.ng',
    stateLocation: 'Port Harcourt',
    address: 'Plot 9 Trans-Amadi Industrial Layout, Port Harcourt',
    serviceCategories: ['appliances'],
    categoryLabels: ['Home Appliances', 'Washing Machines'],
    verificationStatus: 'pending_review',
    cacNumber: 'BN-4401923',
    yearsInBusiness: 4,
    rating: 4.70,
    reviewCount: 12,
    completedJobs: 34,
    isAvailable: true,
    bio: 'Drain pump replacements, shock absorber restoration, and motor carbon brush replacements for Bosch, LG, and Whirlpool laundry units.',
    pricingRange: '₦15,000 - ₦55,000',
    badge: 'Under Review',
  },
];

// Reactive state store
const state = reactive({
  providers: [...INITIAL_PROVIDERS],
  selectedCategory: 'all',
  selectedLocation: 'all',
  searchQuery: '',
  loading: false,
});

export const providerService = {
  get state() {
    return state;
  },

  getAllProviders() {
    return state.providers;
  },

  getVerifiedProviders() {
    return state.providers.filter(p => p.verificationStatus === 'verified');
  },

  getPendingProviders() {
    return state.providers.filter(p => p.verificationStatus === 'pending_review');
  },

  getProviderById(id) {
    return state.providers.find(p => p.id === id) || null;
  },

  getFilteredProviders({ category = 'all', location = 'all', search = '', onlyVerified = true } = {}) {
    return state.providers.filter(provider => {
      if (onlyVerified && provider.verificationStatus !== 'verified') {
        return false;
      }
      if (category !== 'all' && !provider.serviceCategories.includes(category)) {
        return false;
      }
      if (location !== 'all' && provider.stateLocation.toLowerCase() !== location.toLowerCase()) {
        return false;
      }
      if (search) {
        const query = search.toLowerCase();
        const matchName = provider.businessName.toLowerCase().includes(query);
        const matchTagline = provider.tagline?.toLowerCase().includes(query);
        const matchPerson = provider.contactPerson.toLowerCase().includes(query);
        const matchBio = provider.bio?.toLowerCase().includes(query);
        if (!matchName && !matchTagline && !matchPerson && !matchBio) {
          return false;
        }
      }
      return true;
    });
  },

  async registerProvider(payload) {
    state.loading = true;
    try {
      const newProvider = {
        id: `sp-${Date.now()}`,
        businessName: payload.businessName,
        tagline: payload.tagline || 'Professional Household & Appliance Services',
        contactPerson: payload.contactPerson,
        phone: payload.phone,
        email: payload.email,
        stateLocation: payload.stateLocation || 'Lagos',
        address: payload.address || '',
        serviceCategories: payload.serviceCategories || ['power'],
        categoryLabels: payload.categoryLabels || ['Power & Inverters'],
        verificationStatus: 'pending_review', // Requires admin approval per PRD
        cacNumber: payload.cacNumber || '',
        yearsInBusiness: Number(payload.yearsInBusiness) || 1,
        rating: 5.0,
        reviewCount: 0,
        completedJobs: 0,
        isAvailable: true,
        bio: payload.bio || '',
        pricingRange: payload.pricingRange || 'Competitive quotation upon inspection',
        badge: 'Pending Review',
        createdAt: new Date().toISOString(),
      };

      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase
            .from('service_providers')
            .insert({
              business_name: newProvider.businessName,
              tagline: newProvider.tagline,
              contact_person: newProvider.contactPerson,
              phone: newProvider.phone,
              email: newProvider.email,
              state_location: newProvider.stateLocation,
              address: newProvider.address,
              service_categories: newProvider.serviceCategories,
              verification_status: 'pending_review',
              cac_number: newProvider.cacNumber,
              years_in_business: newProvider.yearsInBusiness,
              bio: newProvider.bio,
            })
            .select()
            .single();

          if (!error && data) {
            newProvider.id = data.id;
          }
        } catch (dbErr) {
          console.warn('[providerService] Supabase insert fallback to reactive state:', dbErr);
        }
      }

      state.providers.unshift(newProvider);
      return { success: true, provider: newProvider };
    } finally {
      state.loading = false;
    }
  },

  updateVerificationStatus(providerId, newStatus, reason = '') {
    const provider = state.providers.find(p => p.id === providerId);
    if (!provider) return { success: false, error: 'Provider not found' };

    provider.verificationStatus = newStatus;
    if (newStatus === 'verified') {
      provider.badge = 'Verified Partner';
    } else if (newStatus === 'suspended') {
      provider.badge = 'Suspended';
    } else if (newStatus === 'pending_review') {
      provider.badge = 'Pending Review';
    }
    return { success: true, provider };
  },
};
