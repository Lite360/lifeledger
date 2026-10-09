<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-surface-main via-surface-main to-brand-sage/20 border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Hero Text -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-sage border border-brand-emerald/30 text-brand-forest text-xs font-semibold">
              <span class="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
              <span>Tailored for Nigerian Homes & Businesses</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-forest tracking-tight leading-[1.1]">
              Know what you own. <br />
              <span class="text-brand-emerald">Remember what it needs.</span> <br />
              Protect its value.
            </h1>

            <p class="text-base sm:text-lg text-mutedText max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Stop losing purchase receipts, missing generator service intervals, and forgetting warranty expiry dates. LifeLedger NG keeps your home electronics, solar systems, generators, and appliances organized in one secure place.
            </p>

            <!-- CTA Group -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <router-link to="/auth/register" class="btn-forest px-6 py-3 text-sm w-full sm:w-auto shadow-md">
                Create Free Household Account
              </router-link>
              <router-link to="/dashboard" class="btn-secondary px-6 py-3 text-sm w-full sm:w-auto flex items-center justify-center space-x-2">
                <span>Explore Demo Dashboard</span>
                <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>
            </div>

            <!-- Trust Points -->
            <div class="pt-6 grid grid-cols-3 gap-4 border-t border-surface-border/70 text-left">
              <div>
                <p class="text-xl sm:text-2xl font-black text-brand-forest">100%</p>
                <p class="text-xs text-mutedText">Private Encrypted Documents</p>
              </div>
              <div>
                <p class="text-xl sm:text-2xl font-black text-brand-forest">₦0</p>
                <p class="text-xs text-mutedText">Free Basic Household Tier</p>
              </div>
              <div>
                <p class="text-xl sm:text-2xl font-black text-brand-forest">SMS / Email</p>
                <p class="text-xs text-mutedText">Maintenance Reminders</p>
              </div>
            </div>
          </div>

          <!-- Hero Graphic / Interactive Card Preview -->
          <div class="lg:col-span-5 relative">
            <div class="card-surface p-5 shadow-elevated border-2 border-brand-emerald/10 relative z-10">
              <div class="flex items-center justify-between pb-4 border-b border-surface-border">
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-red-400"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span class="text-xs font-bold text-brand-forest pl-2">Asset Card Preview</span>
                </div>
                <span class="badge-emerald text-[11px]">Active Warranty</span>
              </div>

              <!-- Preview Asset -->
              <div class="py-4 space-y-4">
                <div class="relative h-44 rounded-lg overflow-hidden bg-surface-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" 
                    alt="Mikano Generator" 
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute bottom-2 left-2 bg-brand-forest/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Generator Shed
                  </div>
                </div>

                <div>
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-base font-bold text-brand-forest">Mikano 10kVA Soundproof Generator</h3>
                      <p class="text-xs text-mutedText font-mono">SN: MK-NG-98842-X · Purchased Mar 2024</p>
                    </div>
                    <span class="text-sm font-extrabold text-brand-forest">₦4,850,000</span>
                  </div>
                </div>

                <!-- Mini Alert Box -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-xs flex items-center justify-between">
                  <div class="flex items-center space-x-2 text-status-danger font-semibold">
                    <span class="w-2 h-2 rounded-full bg-status-danger"></span>
                    <span>Service Overdue: Oil & Filter (3d)</span>
                  </div>
                  <router-link to="/maintenance" class="text-status-danger underline font-bold hover:text-red-900">
                    Log Service
                  </router-link>
                </div>

                <!-- Attached Documents Preview -->
                <div class="flex items-center justify-between text-xs text-mutedText bg-surface-main p-2.5 rounded-lg border border-surface-border">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>receipt_mikano_vi_store.pdf (1.2 MB)</span>
                  </div>
                  <span class="text-[10px] font-semibold text-brand-forest">Encrypted</span>
                </div>
              </div>
            </div>

            <!-- Background subtle accent blobs -->
            <div class="absolute -top-6 -right-6 w-32 h-32 bg-brand-emerald/10 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Nigerian Households Need LifeLedger Section -->
    <section class="py-16 md:py-24 bg-surface-card border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">The Nigerian Household Reality</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
            Built for the way appliances work in Nigeria
          </h2>
          <p class="text-sm sm:text-base text-mutedText">
            Between grid instability, generator run-hours, voltage spikes, and borehole water, maintaining household assets requires diligence. LifeLedger NG gives you peace of mind.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="card-surface p-6 space-y-4 hover:border-brand-emerald/40 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-brand-forest">Generators & Solar Inverters</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Track running hours, oil changes, spark plug replacements, solar battery cycle warranties, and Harmattan panel dusting schedules.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="card-surface p-6 space-y-4 hover:border-brand-emerald/40 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-brand-forest">Proof of Purchase & Warranty Claims</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              When Fouani, SIMS, or Samsung ask for the original paper invoice after a surge damage, find your high-res digital scan in 3 seconds.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="card-surface p-6 space-y-4 hover:border-brand-emerald/40 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-brand-forest">Repair History & Cost Accounting</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Understand how much you’ve spent fixing an old air conditioner or pumping machine before deciding whether it’s time to replace it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive 3-Step Walkthrough -->
    <section class="py-16 md:py-24 bg-surface-main">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Simple 3-Step Workflow</span>
          <h2 class="text-3xl font-extrabold text-brand-forest">
            How LifeLedger NG works
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div class="space-y-3">
            <div class="w-10 h-10 rounded-full bg-brand-forest text-white font-extrabold flex items-center justify-center text-sm">
              1
            </div>
            <h3 class="text-base font-bold text-brand-forest">Add Item in 60 Seconds</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Snap a photo of the appliance nameplate and snap the paper receipt. Input brand, price, and store.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-full bg-brand-forest text-white font-extrabold flex items-center justify-center text-sm">
              2
            </div>
            <h3 class="text-base font-bold text-brand-forest">Set Smart Maintenance Schedules</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Select standard Nigerian service frequencies: e.g. quarterly AC cleaning or 200-hour generator servicing.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-full bg-brand-forest text-white font-extrabold flex items-center justify-center text-sm">
              3
            </div>
            <h3 class="text-base font-bold text-brand-forest">Receive Timely Reminders</h3>
            <p class="text-xs sm:text-sm text-mutedText leading-relaxed">
              Get alert notifications before warranty lapses or when it's time to service equipment before it breaks down.
            </p>
          </div>
        </div>

        <!-- Call to Action Banner -->
        <div class="mt-16 bg-brand-forest rounded-2xl p-8 sm:p-12 text-surface-main flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-left">
            <h3 class="text-2xl sm:text-3xl font-black text-white">Start cataloging your home today</h3>
            <p class="text-xs sm:text-sm text-brand-sage/80 max-w-xl">
              Free forever for individual households. Add your appliances and never lose a warranty again.
            </p>
          </div>
          <div class="flex items-center space-x-3 shrink-0">
            <router-link to="/auth/register" class="btn-primary px-6 py-3 text-sm">
              Register Free
            </router-link>
            <router-link to="/dashboard" class="btn-sage px-5 py-3 text-sm">
              View Demo
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
