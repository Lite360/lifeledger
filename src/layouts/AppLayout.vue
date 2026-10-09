<template>
  <div class="min-h-screen flex flex-col bg-surface-main">
    <!-- PRD Explicit Demo Banner -->
    <DemoBanner />

    <div class="flex-1 flex overflow-hidden">
      <!-- Desktop Sidebar -->
      <AppSidebar @open-add-asset="isAddAssetModalOpen = true" />

      <!-- Mobile Off-canvas Drawer -->
      <div v-if="isMobileSidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
        <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="isMobileSidebarOpen = false"></div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-brand-forest text-white">
          <div class="p-4 flex items-center justify-between border-b border-white/10">
            <span class="font-extrabold text-base tracking-tight">LifeLedger NG</span>
            <button @click="isMobileSidebarOpen = false" class="p-1 rounded text-white/70 hover:text-white">
              ✕
            </button>
          </div>
          <nav class="flex-1 px-4 py-4 space-y-2">
            <router-link
              v-for="item in mobileNavItems"
              :key="item.path"
              :to="item.path"
              @click="isMobileSidebarOpen = false"
              class="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10"
              :class="[ $route.path === item.path ? 'bg-brand-emerald text-white' : 'text-brand-sage' ]"
            >
              {{ item.label }}
            </router-link>
          </nav>
        </div>
      </div>

      <!-- Main Application Shell Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader 
          @toggle-mobile-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
          @open-add-asset="isAddAssetModalOpen = true"
        />

        <main class="flex-1 overflow-y-auto pb-20 md:pb-8 p-4 sm:p-6 lg:p-8">
          <router-view @open-add-asset="isAddAssetModalOpen = true" />
        </main>
      </div>
    </div>

    <!-- Mobile Bottom Navigation (PRD 5.5) -->
    <MobileBottomNav />

    <!-- Global Add Asset Modal -->
    <AddAssetModal 
      :is-open="isAddAssetModalOpen" 
      @close="isAddAssetModalOpen = false"
      @asset-added="handleAssetAdded"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DemoBanner from '@/components/common/DemoBanner.vue';
import AppSidebar from '@/components/common/AppSidebar.vue';
import AppHeader from '@/components/common/AppHeader.vue';
import MobileBottomNav from '@/components/common/MobileBottomNav.vue';
import AddAssetModal from '@/components/assets/AddAssetModal.vue';

const isMobileSidebarOpen = ref(false);
const isAddAssetModalOpen = ref(false);

const mobileNavItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Asset Register', path: '/assets' },
  { label: 'Warranties', path: '/warranties' },
  { label: 'Maintenance Schedule', path: '/maintenance' },
  { label: 'Expenses & Repairs', path: '/expenses' },
  { label: 'Household Settings', path: '/settings' },
];

const handleAssetAdded = (newAsset) => {
  // Demo event handler
  console.log('Asset added to demo state:', newAsset);
};
</script>
