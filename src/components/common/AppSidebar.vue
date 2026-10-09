<template>
  <aside class="hidden md:flex flex-col w-64 bg-brand-forest text-surface-main shrink-0 border-r border-brand-emerald/20 transition-all duration-300">
    <!-- Brand Header -->
    <div class="h-20 flex items-center px-6 border-b border-white/10 justify-between">
      <router-link to="/dashboard" class="flex items-center space-x-3 group">
        <div class="w-9 h-9 rounded-xl bg-brand-emerald flex items-center justify-center text-white shadow-sm ring-1 ring-white/20">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <span class="font-extrabold text-base tracking-tight text-white block">LifeLedger</span>
          <span class="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Household Ledger</span>
        </div>
      </router-link>
    </div>

    <!-- Household Switcher -->
    <div class="px-4 py-3 border-b border-white/10">
      <div class="bg-white/5 rounded-lg p-2.5 flex items-center justify-between border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer" title="Active Household">
        <div class="min-w-0 pr-2">
          <p class="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Household</p>
          <p class="text-xs font-semibold text-white truncate">{{ householdName }}</p>
        </div>
        <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
      </div>
    </div>

    <!-- Quick Add Button -->
    <div class="px-4 pt-4">
      <button 
        @click="$emit('open-add-asset')"
        class="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-semibold text-brand-forest bg-surface-main hover:bg-white transition-colors shadow-sm"
      >
        <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add New Asset</span>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group"
        :class="[
          $route.path === item.path 
            ? 'bg-brand-emerald text-white font-semibold shadow-sm' 
            : 'text-brand-sage/80 hover:bg-white/10 hover:text-white'
        ]"
      >
        <component :is="item.icon" class="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
        <span class="flex-1 truncate">{{ item.label }}</span>
        <span v-if="item.badge" class="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-400 text-amber-950">
          {{ item.badge }}
        </span>
      </router-link>
    </nav>

    <!-- Footer / User Info -->
    <div class="p-4 border-t border-white/10 bg-black/10">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-8 h-8 rounded-full bg-emerald-600/60 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
            BA
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-white truncate">Babatunde Adeleke</p>
            <p class="text-[10px] text-emerald-300 truncate">Household Admin</p>
          </div>
        </div>
        <router-link 
          to="/settings" 
          class="p-1.5 text-brand-sage/70 hover:text-white rounded hover:bg-white/10 transition-colors"
          title="Account Settings"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, h } from 'vue';
import { DEMO_HOUSEHOLD } from '@/services/demoData';

defineEmits(['open-add-asset']);

const householdName = computed(() => DEMO_HOUSEHOLD.name);

// Simple SVG icon wrappers for sidebar
const createSvgIcon = (d) => ({
  render() {
    return h('svg', {
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      class: 'w-4 h-4'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d
      })
    ]);
  }
});

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: createSvgIcon('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6')
  },
  {
    label: 'Asset Register',
    path: '/assets',
    icon: createSvgIcon('M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10')
  },
  {
    label: 'Warranties',
    path: '/warranties',
    badge: '2',
    icon: createSvgIcon('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z')
  },
  {
    label: 'Maintenance Schedule',
    path: '/maintenance',
    badge: '1 Overdue',
    icon: createSvgIcon('M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')
  },
  {
    label: 'Expenses & Repairs',
    path: '/expenses',
    icon: createSvgIcon('M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z')
  },
  {
    label: 'Service Directory',
    path: '/directory',
    icon: createSvgIcon('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z')
  },
  {
    label: 'Quotes & Repairs',
    path: '/quotes',
    badge: '3 Quotes',
    icon: createSvgIcon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')
  },
  {
    label: 'Billing & Plans',
    path: '/billing',
    icon: createSvgIcon('M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z')
  },
  {
    label: 'Business Portal',
    path: '/business/portal',
    icon: createSvgIcon('M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4')
  },
  {
    label: 'Admin Operations',
    path: '/admin',
    icon: createSvgIcon('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z')
  },
  {
    label: 'Household Settings',
    path: '/settings',
    icon: createSvgIcon('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z')
  },
];
</script>
