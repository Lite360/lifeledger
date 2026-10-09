import { ref, computed } from 'vue';
import { DEMO_HOUSEHOLD } from '@/services/demoData';

const isAuthenticated = ref(true); // Default to true in Phase 1 demo to showcase dashboard shell
const currentUser = ref({
  id: 'usr-101',
  name: 'Babatunde Adeleke',
  email: 'babatunde.adeleke@example.ng',
  avatarUrl: null,
  role: 'Household Owner',
  household: DEMO_HOUSEHOLD,
});

export function useAuth() {
  const login = (email, password) => {
    // Phase 1 demo authentication simulator
    isAuthenticated.value = true;
    currentUser.value = {
      id: 'usr-101',
      name: email.split('@')[0] || 'Demo User',
      email: email || 'user@example.ng',
      role: 'Household Owner',
      household: DEMO_HOUSEHOLD,
    };
    return Promise.resolve({ success: true, user: currentUser.value });
  };

  const register = (formData) => {
    isAuthenticated.value = true;
    currentUser.value = {
      id: 'usr-new',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: 'Household Owner',
      household: {
        ...DEMO_HOUSEHOLD,
        name: `${formData.lastName} Household`,
        owner: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      },
    };
    return Promise.resolve({ success: true, user: currentUser.value });
  };

  const logout = () => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    currentUser: computed(() => currentUser.value),
    login,
    register,
    logout,
  };
}
