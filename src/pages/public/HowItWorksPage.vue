<template>
  <div class="py-12 md:py-20 bg-surface-main">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center space-y-3 mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Workflow Blueprint</span>
        <h1 class="text-3xl sm:text-4xl font-black text-brand-forest">
          How LifeLedger NG Works
        </h1>
        <p class="text-sm text-mutedText max-w-xl mx-auto">
          A step-by-step system to maintain full visibility over your household equipment, warranties, and expenses.
        </p>
      </div>

      <!-- Steps -->
      <div class="space-y-8">
        <div class="card-surface p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-12 h-12 rounded-xl bg-brand-forest text-white font-extrabold flex items-center justify-center text-lg shrink-0">
            01
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-brand-forest">Create your Household Asset Profile</h2>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              When you purchase a new appliance (or organize what you already have), add the model, serial number, vendor, and purchase price in Nigerian Naira (₦). Assign it to a room or location such as "Living Room", "Inverter Shed", or "Kitchen".
            </p>
          </div>
        </div>

        <div class="card-surface p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-12 h-12 rounded-xl bg-brand-emerald text-white font-extrabold flex items-center justify-center text-lg shrink-0">
            02
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-brand-forest">Attach Receipts and Warranty Cards</h2>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Paper receipts fade and get misplaced. LifeLedger NG securely stores scans of receipts and warranty certificates with Row-Level Security so they are private to your household and accessible whenever a manufacturer or repair center requests proof.
            </p>
          </div>
        </div>

        <div class="card-surface p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-12 h-12 rounded-xl bg-brand-forest text-white font-extrabold flex items-center justify-center text-lg shrink-0">
            03
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-brand-forest">Automated Maintenance Tracking</h2>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Set service cycles for generators (e.g. 250 hours or 3 months), solar systems (terminal tightening and dust cleanup), and air conditioners. Receive proactive alerts before overdue equipment experiences preventable failures.
            </p>
          </div>
        </div>

        <div class="card-surface p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div class="w-12 h-12 rounded-xl bg-brand-sage text-brand-forest font-extrabold flex items-center justify-center text-lg shrink-0">
            04
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-bold text-brand-forest">Log Repair Expenses & Evaluate Total Cost of Ownership</h2>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Record invoices and technician payments for every service. Know exactly how much you've spent on servicing your generator or fixing an AC over 2 years, giving you clarity on replacement vs repair decisions.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <router-link to="/auth/register" class="btn-forest px-6 py-3 text-sm">
          Start Managing Your Assets
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
