<template>
  <div class="min-h-screen bg-surface-main flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <!-- Logo -->
      <router-link to="/" class="inline-flex items-center space-x-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-brand-forest flex items-center justify-center text-white shadow-sm ring-2 ring-brand-emerald/20">
          <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span class="text-2xl font-black text-brand-forest">LifeLedger <span class="text-brand-emerald">NG</span></span>
      </router-link>

      <h2 class="text-2xl font-black text-brand-forest tracking-tight">
        Sign in to your household
      </h2>
      <p class="mt-1 text-xs text-mutedText">
        Access your appliances, receipts, and maintenance schedules.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
      <div class="card-surface p-8 sm:p-10 shadow-card">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 text-status-danger text-xs rounded-lg">
            {{ error }}
          </div>

          <div>
            <label class="form-label">
              Email Address <span class="text-status-danger">*</span>
            </label>
            <input 
              v-model="email" 
              type="email" 
              required 
              autocomplete="email"
              placeholder="babatunde.adeleke@example.ng"
              class="form-input"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="form-label mb-0">
                Password <span class="text-status-danger">*</span>
              </label>
              <router-link to="/auth/forgot-password" class="text-xs text-brand-emerald hover:underline font-semibold">
                Forgot password?
              </router-link>
            </div>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                autocomplete="current-password"
                placeholder="••••••••••••"
                class="form-input pr-10"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-mutedText hover:text-brand-forest text-xs"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" v-model="rememberMe" class="rounded border-surface-border text-brand-emerald focus:ring-brand-emerald" />
              <span class="text-primaryText">Remember this device</span>
            </label>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full btn-forest py-2.5 text-sm font-bold shadow-sm"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In to Dashboard' }}
          </button>
        </form>

        <!-- Quick Demo Switcher Note -->
        <div class="mt-6 pt-5 border-t border-surface-border text-center">
          <p class="text-xs text-mutedText">
            Don't have an account yet? 
            <router-link to="/auth/register" class="text-brand-emerald font-bold hover:underline">
              Create Household Account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { login } = useAuth();

const email = ref('babatunde.adeleke@example.ng');
const password = ref('password123');
const showPassword = ref(false);
const rememberMe = ref(true);
const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please provide both email and password.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    await login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = 'Failed to sign in. Please check credentials.';
  } finally {
    isLoading.value = false;
  }
};
</script>
