<template>
  <header class="h-16 bg-surface-card border-b border-surface-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
    <div class="flex items-center space-x-3 flex-1 max-w-lg">
      <!-- Mobile sidebar toggle -->
      <button 
        @click="$emit('toggle-mobile-sidebar')"
        class="md:hidden p-2 rounded-lg text-primaryText hover:bg-surface-muted focus:outline-none"
        aria-label="Toggle Navigation"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Global Search Bar -->
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mutedText">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search assets, serial numbers, receipts..." 
          class="w-full pl-9 pr-4 py-2 bg-surface-input border border-surface-border rounded-lg text-xs placeholder-mutedText focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 focus:border-brand-emerald transition-all"
        />
      </div>
    </div>

    <!-- Header Actions -->
    <div class="flex items-center space-x-3 ml-4">
      <!-- Add Asset CTA Button -->
      <button 
        @click="$emit('open-add-asset')"
        class="hidden sm:inline-flex items-center space-x-1.5 btn-primary text-xs py-2 px-3 shadow-sm"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Asset</span>
      </button>

      <!-- Notification Dropdown -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="p-2 rounded-lg text-mutedText hover:text-brand-forest hover:bg-surface-muted transition-colors relative"
          aria-label="Notifications"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span 
            v-if="unreadCount > 0" 
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-danger ring-2 ring-white"
          ></span>
        </button>

        <!-- Notification Popover -->
        <div 
          v-if="showNotifications" 
          class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-elevated border border-surface-border p-3 z-50 text-xs"
        >
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-surface-border">
            <span class="font-bold text-brand-forest">Household Alerts</span>
            <button 
              v-if="unreadCount > 0"
              @click="notificationService.markAllAsRead()"
              class="text-[10px] text-brand-emerald hover:underline font-semibold"
            >
              Mark all read
            </button>
          </div>
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <div 
              v-for="item in notifications" 
              :key="item.id"
              @click="notificationService.markAsRead(item.id)"
              class="p-2 rounded-lg border transition-colors cursor-pointer"
              :class="[
                item.read ? 'bg-surface-main/60 border-surface-border opacity-70' : 
                item.type === 'danger' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
              ]"
            >
              <div class="flex items-center justify-between">
                <p class="font-semibold text-brand-forest">{{ item.title }}</p>
                <span v-if="!item.read" class="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span>
              </div>
              <p class="text-[11px] text-mutedText mt-0.5">{{ item.message }}</p>
            </div>
          </div>
          <div class="pt-2 mt-2 border-t border-surface-border text-center">
            <router-link to="/maintenance" @click="showNotifications = false" class="text-brand-emerald font-semibold hover:underline">
              View Maintenance Board →
            </router-link>
          </div>
        </div>
      </div>

      <!-- User Avatar / Dropdown -->
      <div class="flex items-center space-x-2 pl-2 border-l border-surface-border">
        <div class="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-xs font-bold uppercase">
          BA
        </div>
        <div class="hidden lg:block text-left">
          <p class="text-xs font-bold text-brand-forest leading-tight">B. Adeleke</p>
          <p class="text-[10px] text-mutedText">Lekki Household</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { notificationService } from '@/services/notificationService';

defineEmits(['toggle-mobile-sidebar', 'open-add-asset']);
const showNotifications = ref(false);

const notifications = notificationService.notifications;
const unreadCount = notificationService.unreadCount;
</script>
