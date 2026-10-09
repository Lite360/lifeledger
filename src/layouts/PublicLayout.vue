<template>
  <div class="min-h-screen flex flex-col bg-surface-main">
    <!-- Demo banner required by PRD -->
    <DemoBanner />
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import DemoBanner from '@/components/common/DemoBanner.vue';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
</script>
