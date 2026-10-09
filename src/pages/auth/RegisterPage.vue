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
        Create your Household Account
      </h2>
      <p class="mt-1 text-xs text-mutedText">
        Join hundreds of Nigerian homeowners keeping track of their valuable equipment.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
      <div class="card-surface p-8 sm:p-10 shadow-card">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 text-status-danger text-xs rounded-lg">
            {{ error }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">
                First Name <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.firstName" 
                type="text" 
                required 
                placeholder="Babatunde"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">
                Last Name <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.lastName" 
                type="text" 
                required 
                placeholder="Adeleke"
                class="form-input"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">
                Email Address <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                placeholder="babatunde@example.ng"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">
                Phone Number (Nigeria) <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.phone" 
                type="tel" 
                required 
                placeholder="0803 123 4567"
                class="form-input"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">
                Household Name <span class="text-mutedText font-normal lowercase">(Optional)</span>
              </label>
              <input 
                v-model="form.householdName" 
                type="text" 
                placeholder="Adeleke Family Residence"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">
                State / Location <span class="text-status-danger">*</span>
              </label>
              <select v-model="form.state" required class="form-input">
                <option value="Lagos">Lagos State</option>
                <option value="Abuja">Abuja (FCT)</option>
                <option value="Rivers">Rivers (Port Harcourt)</option>
                <option value="Oyo">Oyo (Ibadan)</option>
                <option value="Ogun">Ogun State</option>
                <option value="Delta">Delta State</option>
                <option value="Other">Other States</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="form-label">
                Password <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.password" 
                type="password" 
                required 
                placeholder="At least 8 characters"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">
                Confirm Password <span class="text-status-danger">*</span>
              </label>
              <input 
                v-model="form.confirmPassword" 
                type="password" 
                required 
                placeholder="Repeat password"
                class="form-input"
              />
            </div>
          </div>

          <div class="pt-2">
            <label class="flex items-start space-x-2 cursor-pointer text-xs">
              <input 
                type="checkbox" 
                v-model="form.acceptTerms" 
                required 
                class="rounded border-surface-border text-brand-emerald focus:ring-brand-emerald mt-0.5" 
              />
              <span class="text-mutedText leading-relaxed">
                I agree to the <router-link to="/terms" class="text-brand-emerald font-semibold hover:underline">Terms of Service</router-link> and acknowledge the <router-link to="/privacy" class="text-brand-emerald font-semibold hover:underline">Privacy Policy (NDPR)</router-link>.
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full btn-forest py-2.5 text-sm font-bold shadow-sm mt-2"
          >
            {{ isLoading ? 'Creating Household Account...' : 'Complete Registration' }}
          </button>
        </form>

        <div class="mt-6 pt-5 border-t border-surface-border text-center">
          <p class="text-xs text-mutedText">
            Already have an account? 
            <router-link to="/auth/login" class="text-brand-emerald font-bold hover:underline">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { register } = useAuth();

const isLoading = ref(false);
const error = ref('');

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  householdName: '',
  state: 'Lagos',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
});

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (form.password.length < 8) {
    error.value = 'Password must be at least 8 characters.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    await register(form);
    router.push('/auth/verify-email');
  } catch (err) {
    error.value = 'Failed to create account.';
  } finally {
    isLoading.value = false;
  }
};
</script>
