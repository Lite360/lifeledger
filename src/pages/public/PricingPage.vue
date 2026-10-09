<template>
  <div class="py-12 md:py-20 bg-surface-main">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-3 mb-16">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Simple, Transparent Pricing</span>
        <h1 class="text-3xl sm:text-4xl font-black text-brand-forest">
          Built for every Nigerian home
        </h1>
        <p class="text-sm text-mutedText max-w-xl mx-auto">
          Start for free with your household. Upgrade only if you need multi-property tracking or commercial repair tools.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Free Household Tier -->
        <div class="card-surface p-8 space-y-6 border-2 border-brand-emerald relative">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-emerald text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
          <div>
            <h3 class="text-xl font-bold text-brand-forest">Household Free</h3>
            <p class="text-xs text-mutedText mt-1">For single families and homeowners.</p>
            <div class="mt-4 flex items-baseline">
              <span class="text-3xl font-black text-brand-forest">₦0</span>
              <span class="text-xs text-mutedText ml-1">/ forever</span>
            </div>
          </div>

          <ul class="space-y-3 text-xs text-primaryText">
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Up to 25 Household Assets</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Encrypted Receipt & Warranty Storage</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Maintenance Schedules & Reminders</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Expense & Repair History</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>1 Household & Up to 2 Members</span>
            </li>
          </ul>

          <router-link to="/auth/register" class="btn-primary w-full py-2.5 text-xs">
            Start Free
          </router-link>
        </div>

        <!-- Premium Household Tier -->
        <div class="card-surface p-8 space-y-6">
          <div>
            <h3 class="text-xl font-bold text-brand-forest">Household Plus</h3>
            <p class="text-xs text-mutedText mt-1">For larger residences, estates, or multiple homes.</p>
            <div class="mt-4 flex items-baseline">
              <span class="text-3xl font-black text-brand-forest">₦3,500</span>
              <span class="text-xs text-mutedText ml-1">/ month</span>
            </div>
          </div>

          <ul class="space-y-3 text-xs text-primaryText">
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Unlimited Household Assets</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Multiple Properties (e.g. Lagos & Country home)</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>SMS Reminders & WhatsApp Alerts</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Export PDF Asset Inventories for Insurance</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Priority Customer Support</span>
            </li>
          </ul>

          <router-link to="/auth/register" class="btn-secondary w-full py-2.5 text-xs">
            Join Waitlist
          </router-link>
        </div>

        <!-- Business & Repair Professionals -->
        <div class="card-surface p-8 space-y-6 bg-surface-main/60">
          <div>
            <h3 class="text-xl font-bold text-brand-forest">Service Providers</h3>
            <p class="text-xs text-mutedText mt-1">For generator mechanics, AC engineers & technicians.</p>
            <div class="mt-4 flex items-baseline">
              <span class="text-3xl font-black text-brand-forest">₦12,000</span>
              <span class="text-xs text-mutedText ml-1">/ month</span>
            </div>
          </div>

          <ul class="space-y-3 text-xs text-primaryText">
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Verified Technician Directory Listing</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Receive Customer Repair Quote Requests</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Client Maintenance Log Management</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="text-brand-emerald font-bold">✓</span>
              <span>Digital Service Invoicing</span>
            </li>
          </ul>

          <router-link to="/auth/register" class="btn-secondary w-full py-2.5 text-xs">
            Register as Provider
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
