<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-surface-card border-t border-surface-border px-3 py-2 flex items-center justify-around z-30 shadow-elevated">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition-colors"
      :class="[
        $route.path === item.path
          ? 'text-brand-emerald font-bold'
          : 'text-mutedText hover:text-brand-forest'
      ]"
    >
      <component :is="item.icon" class="w-5 h-5 mb-1" />
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { h } from 'vue';

const createSvgIcon = (d) => ({
  render() {
    return h('svg', {
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      class: 'w-5 h-5'
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
    label: 'Assets',
    path: '/assets',
    icon: createSvgIcon('M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10')
  },
  {
    label: 'Maintenance',
    path: '/maintenance',
    icon: createSvgIcon('M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')
  },
  {
    label: 'Profile',
    path: '/settings',
    icon: createSvgIcon('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z')
  },
];
</script>
