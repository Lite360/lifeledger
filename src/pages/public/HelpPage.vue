<template>
  <div class="py-12 md:py-20 bg-surface-main">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-3 mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Help & Support</span>
        <h1 class="text-3xl font-black text-brand-forest">Frequently Asked Questions</h1>
        <p class="text-xs sm:text-sm text-mutedText">Everything you need to know about keeping your household ledger in Nigeria.</p>
      </div>

      <div class="space-y-4">
        <div v-for="(item, index) in faqs" :key="index" class="card-surface p-6">
          <h3 class="text-sm font-bold text-brand-forest mb-2">{{ item.q }}</h3>
          <p class="text-xs sm:text-sm text-mutedText leading-relaxed">{{ item.a }}</p>
        </div>
      </div>

      <div class="mt-12 card-surface p-6 bg-brand-sage/40 border border-brand-emerald/20 text-center space-y-3">
        <h4 class="text-sm font-bold text-brand-forest">Have a question not listed here?</h4>
        <p class="text-xs text-mutedText">Reach our Lagos support desk via email or WhatsApp.</p>
        <a href="mailto:support@lifeledger.ng" class="inline-block btn-forest text-xs py-2 px-4">
          Contact Support Desk
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    q: 'How does LifeLedger protect my receipts and documents?',
    a: 'Every receipt and warranty scan uploaded to LifeLedger NG is stored in private encrypted storage protected by PostgreSQL Row Level Security (RLS). Other users or search engines cannot access or index your household files.',
  },
  {
    q: 'Can I track generator service hours even if my generator does not have IoT?',
    a: 'Yes! You can record running hours manually or schedule interval reminders based on calendar estimates (e.g., every 3 months or after every major power outage period).',
  },
  {
    q: 'What happens if a retailer refuses my digital receipt?',
    a: 'Major Nigerian retailers like Fouani, SIMS, Samsung Experience Stores, and Slot accept digital scans showing the clear invoice number, store stamp, and product serial number. Having your digital copy readily accessible on your phone prevents loss from thermal paper fading.',
  },
  {
    q: 'Can my spouse or house manager also access our assets?',
    a: 'Yes. LifeLedger NG supports household sharing where you can invite members to view or edit asset records under your household.',
  },
];
</script>
