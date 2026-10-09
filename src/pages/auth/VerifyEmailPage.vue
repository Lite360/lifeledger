<template>
  <div class="min-h-screen bg-surface-main flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="w-12 h-12 rounded-2xl bg-brand-forest text-brand-emerald mx-auto flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-2xl font-black text-brand-forest tracking-tight">Check your inbox</h2>
      <p class="mt-2 text-xs sm:text-sm text-mutedText">
        We sent a verification link to your email address. Please click it to verify your household account.
      </p>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
      <div class="card-surface p-8 shadow-card text-center space-y-5">
        <div class="p-3 bg-brand-sage/60 rounded-xl text-xs text-brand-forest">
          <p class="font-semibold">Verification simulation mode (Phase 1)</p>
          <p class="text-[11px] text-mutedText mt-0.5">SMTP verification emails will be connected via Supabase in Phase 2.</p>
        </div>

        <div class="space-y-3">
          <router-link to="/dashboard" class="btn-forest w-full py-2.5 text-xs font-bold block">
            Continue to Dashboard (Demo) →
          </router-link>

          <button 
            @click="resendEmail" 
            :disabled="resent"
            class="btn-secondary w-full py-2.5 text-xs font-semibold"
          >
            {{ resent ? 'Verification email resent!' : 'Resend verification email' }}
          </button>
        </div>

        <div class="pt-4 border-t border-surface-border">
          <router-link to="/auth/login" class="text-xs text-brand-emerald font-semibold hover:underline">
            Back to Sign In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const resent = ref(false);

const resendEmail = () => {
  resent.value = true;
  setTimeout(() => {
    resent.value = false;
  }, 4000);
};
</script>
