<template>
  <div class="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
    <div class="flex items-center space-x-2 max-w-4xl">
      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wide">
        Phase 1 Preview Mode
      </span>
      <p class="truncate sm:overflow-visible">
        Illustrative interface preview. Figures and assets are sample demonstration data. Database persistence and Supabase Auth are scheduled for Phase 2.
      </p>
    </div>
    <div class="flex items-center space-x-3 shrink-0 ml-2">
      <router-link 
        v-if="isAuthRoute" 
        to="/" 
        class="font-semibold underline hover:text-amber-950"
      >
        Public Landing
      </router-link>
      <router-link 
        v-else 
        to="/dashboard" 
        class="font-semibold underline hover:text-amber-950"
      >
        View App Shell
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAuthRoute = computed(() => {
  return route.path.startsWith('/dashboard') || 
         route.path.startsWith('/assets') || 
         route.path.startsWith('/maintenance') || 
         route.path.startsWith('/warranties') || 
         route.path.startsWith('/expenses') || 
         route.path.startsWith('/settings');
});
</script>
