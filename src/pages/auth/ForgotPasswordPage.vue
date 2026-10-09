<template>
  <div class="min-h-screen bg-surface-main flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <router-link to="/" class="inline-flex items-center space-x-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-brand-forest flex items-center justify-center text-white shadow-sm ring-2 ring-brand-emerald/20">
          <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span class="text-2xl font-black text-brand-forest">LifeLedger <span class="text-brand-emerald">NG</span></span>
      </router-link>

      <h2 class="text-2xl font-black text-brand-forest tracking-tight">Reset Account Password</h2>
      <p class="mt-1 text-xs text-mutedText">
        Enter your verified email address and we'll send a secure password reset link.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
      <div class="card-surface p-8 sm:p-10 shadow-card">
        <div v-if="submitted" class="p-4 bg-brand-sage border border-brand-emerald/30 rounded-xl text-xs text-brand-forest text-center space-y-3">
          <p class="font-bold">Password reset email dispatched!</p>
          <p class="text-mutedText">If an account exists with {{ email }}, you will receive instructions shortly.</p>
          <router-link to="/auth/login" class="inline-block btn-forest text-xs py-2 px-4 mt-2">
            Back to Sign In
          </router-link>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="form-label">
              Email Address <span class="text-status-danger">*</span>
            </label>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="babatunde.adeleke@example.ng"
              class="form-input"
            />
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full btn-forest py-2.5 text-xs sm:text-sm font-bold shadow-sm"
          >
            {{ isLoading ? 'Sending Instructions...' : 'Send Password Reset Link' }}
          </button>

          <div class="pt-4 border-t border-surface-border text-center">
            <router-link to="/auth/login" class="text-xs text-brand-emerald font-semibold hover:underline">
              ← Return to Sign In
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const submitted = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    submitted.value = true;
  }, 700);
};
</script>
