/**
 * LifeLedger NG - Service Quotes & Repair Requests Service
 * Phase 4 Commercial Features
 * Single Source of Truth: prd.md (FR-11, Section 4.6, 7.1)
 */
import { reactive } from 'vue';
import { supabase, isSupabaseConfigured } from './supabase';
import { DEMO_HOUSEHOLD } from './demoData';

export const INITIAL_REQUESTS = [
  {
    id: 'req-201',
    householdId: DEMO_HOUSEHOLD.id,
    assetId: 'ast-101',
    assetName: 'Mikano 10kVA Soundproof Generator',
    category: 'power',
    title: 'Routine 250-Hour Diesel Overhaul & Fuel Line Flush',
    description: 'Upcoming scheduled servicing required before harmattan dry season. Needs genuine Perkins oil filter, fuel water separator replacement, and valve clearance inspection.',
    urgency: 'urgent',
    status: 'quotes_received',
    budgetMax: 85000,
    currency: 'NGN',
    createdAt: '2026-10-06T09:30:00Z',
    quotesCount: 2,
    quotes: [
      {
        id: 'qt-301',
        providerId: 'sp-101',
        providerName: 'Mikano Certified Field Engineering',
        amount: 68000,
        currency: 'NGN',
        estimatedDuration: '4 hours on-site',
        warrantyOffered: '90-day workmanship warranty on Perkins seals',
        notes: 'Includes Mobil Delvac 15W-40 oil (12L), OEM Perkins fuel filter, and digital AVR calibration check.',
        status: 'pending',
        createdAt: '2026-10-06T14:15:00Z',
      },
      {
        id: 'qt-302',
        providerId: 'sp-103',
        providerName: 'Pragmatic Solar & Energy Labs',
        amount: 75000,
        currency: 'NGN',
        estimatedDuration: 'Same-day service',
        warrantyOffered: '60-day warranty',
        notes: 'Complete servicing plus ATS transfer switch sensor inspection to ensure seamless inverter coordination.',
        status: 'pending',
        createdAt: '2026-10-07T10:00:00Z',
      },
    ],
  },
  {
    id: 'req-202',
    householdId: DEMO_HOUSEHOLD.id,
    assetId: 'ast-103',
    assetName: 'LG 1.5HP Dual Inverter Split AC',
    category: 'cooling',
    title: 'Chemical Coil Wash & R410A Pressure Diagnostic',
    description: 'Master bedroom AC indoor blower making faint buzzing sound and cooling efficiency reduced by ~20% during peak 2 PM heat.',
    urgency: 'normal',
    status: 'quotes_received',
    budgetMax: 35000,
    currency: 'NGN',
    createdAt: '2026-10-07T11:00:00Z',
    quotesCount: 1,
    quotes: [
      {
        id: 'qt-303',
        providerId: 'sp-102',
        providerName: 'CoolTech HVAC Solutions',
        amount: 22000,
        currency: 'NGN',
        estimatedDuration: '2.5 hours',
        warrantyOffered: '30-day no-leak guarantee',
        notes: 'Pressure wash with biodegradable foam cleaner, blower wheel alignment, and check compressor suction pressure.',
        status: 'pending',
        createdAt: '2026-10-07T16:45:00Z',
      },
    ],
  },
];

const state = reactive({
  requests: [...INITIAL_REQUESTS],
  loading: false,
});

export const quoteService = {
  get state() {
    return state;
  },

  getAllRequests() {
    return state.requests;
  },

  getRequestById(id) {
    return state.requests.find(r => r.id === id) || null;
  },

  getQuotesForRequest(requestId) {
    const req = this.getRequestById(requestId);
    return req ? req.quotes : [];
  },

  async createServiceRequest(payload) {
    state.loading = true;
    try {
      const newRequest = {
        id: `req-${Date.now()}`,
        householdId: payload.householdId || DEMO_HOUSEHOLD.id,
        assetId: payload.assetId || null,
        assetName: payload.assetName || 'General Household Asset',
        category: payload.category || 'power',
        title: payload.title,
        description: payload.description,
        urgency: payload.urgency || 'normal',
        status: 'open',
        budgetMax: Number(payload.budgetMax) || 0,
        currency: 'NGN',
        createdAt: new Date().toISOString(),
        quotesCount: 0,
        quotes: [],
      };

      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase
            .from('service_requests')
            .insert({
              household_id: newRequest.householdId,
              asset_id: newRequest.assetId,
              title: newRequest.title,
              description: newRequest.description,
              category: newRequest.category,
              urgency: newRequest.urgency,
              status: 'open',
            })
            .select()
            .single();

          if (!error && data) {
            newRequest.id = data.id;
          }
        } catch (dbErr) {
          console.warn('[quoteService] Supabase fallback to reactive state:', dbErr);
        }
      }

      state.requests.unshift(newRequest);
      return { success: true, request: newRequest };
    } finally {
      state.loading = false;
    }
  },

  async submitQuote(requestId, quotePayload) {
    const request = state.requests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Request not found' };

    const newQuote = {
      id: `qt-${Date.now()}`,
      providerId: quotePayload.providerId,
      providerName: quotePayload.providerName,
      amount: Number(quotePayload.amount),
      currency: quotePayload.currency || 'NGN',
      estimatedDuration: quotePayload.estimatedDuration || '1-2 days',
      warrantyOffered: quotePayload.warrantyOffered || '30 days workmanship',
      notes: quotePayload.notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    request.quotes.push(newQuote);
    request.quotesCount = request.quotes.length;
    request.status = 'quotes_received';

    return { success: true, quote: newQuote };
  },

  acceptQuote(requestId, quoteId) {
    const request = state.requests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Request not found' };

    let acceptedQuote = null;
    request.quotes.forEach(quote => {
      if (quote.id === quoteId) {
        quote.status = 'accepted';
        acceptedQuote = quote;
      } else {
        quote.status = 'declined';
      }
    });

    request.status = 'in_progress';
    return { success: true, acceptedQuote, request };
  },

  declineQuote(requestId, quoteId) {
    const request = state.requests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Request not found' };

    const quote = request.quotes.find(q => q.id === quoteId);
    if (quote) {
      quote.status = 'declined';
    }
    return { success: true };
  },
};
