<template>
  <header class="sticky top-0 z-40 bg-surface-main/90 backdrop-blur-md border-b border-surface-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl bg-brand-forest flex items-center justify-center text-white shadow-sm ring-2 ring-brand-emerald/20 transition-transform group-hover:scale-105">
            <!-- Shield with ledger leaf emblem -->
            <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="text-xl font-extrabold tracking-tight text-brand-forest">LifeLedger</span>
              <span class="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-brand-forest text-emerald-300">NG</span>
            </div>
            <p class="text-[11px] text-mutedText tracking-wide hidden sm:block">Household Asset & Warranty Manager</p>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/how-it-works" 
            class="text-sm font-medium text-mutedText hover:text-brand-forest transition-colors"
            active-class="text-brand-emerald font-semibold"
          >
            How It Works
          </router-link>
          <router-link 
            to="/pricing" 
            class="text-sm font-medium text-mutedText hover:text-brand-forest transition-colors"
            active-class="text-brand-emerald font-semibold"
          >
            Pricing
          </router-link>
          <router-link 
            to="/help" 
            class="text-sm font-medium text-mutedText hover:text-brand-forest transition-colors"
            active-class="text-brand-emerald font-semibold"
          >
            Help & FAQ
          </router-link>
        </nav>

        <!-- Action CTAs -->
        <div class="hidden sm:flex items-center space-x-4">
          <router-link 
            to="/auth/login" 
            class="text-sm font-semibold text-brand-forest hover:text-brand-emerald px-3 py-2 transition-colors"
          >
            Sign In
          </router-link>
          <router-link 
            to="/auth/register" 
            class="btn-forest text-xs sm:text-sm shadow-sm"
          >
            Get Started Free
          </router-link>
          <router-link 
            to="/dashboard" 
            class="btn-sage text-xs hidden lg:inline-flex"
            title="Explore Phase 1 Dashboard Interface"
          >
            Demo Dashboard →
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-brand-forest hover:bg-surface-muted focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-surface-border space-y-3">
        <router-link 
          to="/how-it-works" 
          @click="isMobileMenuOpen = false" 
          class="block py-2 text-sm font-medium text-brand-forest"
        >
          How It Works
        </router-link>
        <router-link 
          to="/pricing" 
          @click="isMobileMenuOpen = false" 
          class="block py-2 text-sm font-medium text-brand-forest"
        >
          Pricing
        </router-link>
        <router-link 
          to="/help" 
          @click="isMobileMenuOpen = false" 
          class="block py-2 text-sm font-medium text-brand-forest"
        >
          Help & FAQ
        </router-link>
        <div class="pt-3 border-t border-surface-border flex flex-col space-y-2">
          <router-link 
            to="/auth/login" 
            @click="isMobileMenuOpen = false" 
            class="w-full text-center py-2.5 text-sm font-semibold text-brand-forest border border-surface-border rounded-lg bg-surface-card"
          >
            Sign In
          </router-link>
          <router-link 
            to="/auth/register" 
            @click="isMobileMenuOpen = false" 
            class="w-full text-center py-2.5 text-sm font-semibold text-white bg-brand-forest rounded-lg"
          >
            Get Started Free
          </router-link>
          <router-link 
            to="/dashboard" 
            @click="isMobileMenuOpen = false" 
            class="w-full text-center py-2.5 text-sm font-semibold text-brand-forest bg-brand-sage rounded-lg"
          >
            Launch Demo Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
</script>
