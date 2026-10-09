<template>
  <div class="space-y-0">
    <!-- HERO SECTION -->
    <section class="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-surface-main via-surface-main to-brand-sage/20 border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Centered Hero Text Content -->
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-sage border border-brand-emerald/30 text-brand-forest text-xs font-semibold shadow-xs">
            <span class="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            <span>All-In-One Household Ledger & Service Platform for Nigeria</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-forest tracking-tight leading-[1.12]">
            Know what you own. <br class="hidden sm:inline" />
            <span class="text-brand-emerald">Remember what it needs.</span> <br class="hidden sm:inline" />
            Protect its value.
          </h1>

          <p class="text-base sm:text-lg text-mutedText max-w-2xl mx-auto leading-relaxed">
            Stop losing purchase receipts, missing 250-hour generator service intervals, and forfeiting warranty claims. LifeLedger NG organizes your appliances, solar inverters, diesel generators, repair expenses, and vetted technicians in one trusted ledger.
          </p>

          <!-- Centered Quick Pill Highlights -->
          <div class="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span class="px-2.5 py-1 rounded-md bg-white border border-surface-border font-medium text-brand-forest shadow-xs">
              ⚡ Generators & Inverters
            </span>
            <span class="px-2.5 py-1 rounded-md bg-white border border-surface-border font-medium text-brand-forest shadow-xs">
              📄 10MB Encrypted Receipts
            </span>
            <span class="px-2.5 py-1 rounded-md bg-white border border-surface-border font-medium text-brand-forest shadow-xs">
              ⏱️ 250h Service Recurrence
            </span>
            <span class="px-2.5 py-1 rounded-md bg-white border border-surface-border font-medium text-brand-forest shadow-xs">
              🔧 Vetted Local Technicians
            </span>
            <span class="px-2.5 py-1 rounded-md bg-white border border-surface-border font-medium text-brand-forest shadow-xs">
              💳 Paystack Billing
            </span>
          </div>

          <!-- Centered CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <router-link to="/dashboard" class="btn-forest px-7 py-3.5 text-sm w-full sm:w-auto shadow-md flex items-center justify-center space-x-2">
              <span>Open Household Ledger</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
            <a href="#modules" class="btn-secondary px-6 py-3.5 text-sm w-full sm:w-auto flex items-center justify-center space-x-2">
              <span>What's In This Project?</span>
              <svg class="w-4 h-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <!-- Centered Trust Points -->
          <div class="pt-8 max-w-2xl mx-auto grid grid-cols-3 gap-6 border-t border-surface-border/70 text-center">
            <div>
              <p class="text-xl sm:text-2xl font-black text-brand-forest">100%</p>
              <p class="text-xs text-mutedText">Tenant Isolation & RLS</p>
            </div>
            <div>
              <p class="text-xl sm:text-2xl font-black text-brand-forest">₦0</p>
              <p class="text-xs text-mutedText">Free Forever Household Plan</p>
            </div>
            <div>
              <p class="text-xl sm:text-2xl font-black text-brand-forest">256-Bit</p>
              <p class="text-xs text-mutedText">Encrypted Private Storage</p>
            </div>
          </div>
        </div>

        <!-- Centered Hero Image / Showcase Container -->
        <div class="mt-12 sm:mt-16 max-w-5xl mx-auto relative">
          <!-- Background Ambient Glow Blobs -->
          <div class="absolute -top-8 -right-8 w-64 h-64 bg-brand-emerald/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-8 -left-8 w-64 h-64 bg-amber-200/25 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Showcase Application Frame -->
          <div class="card-surface p-4 sm:p-6 shadow-2xl rounded-2xl sm:rounded-3xl border-2 border-brand-emerald/20 relative z-10 space-y-5 bg-white">
            <!-- Window Title Bar -->
            <div class="flex items-center justify-between pb-4 border-b border-surface-border">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-red-400"></span>
                <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-bold text-brand-forest pl-2">LifeLedger NG — Executive Household Vault (Lekki Phase 1)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="badge-emerald text-[11px] font-bold">Active Coverage</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-brand-forest border border-emerald-200">
                  RLS Protected
                </span>
              </div>
            </div>

            <!-- Multi-Pane Content Showcase -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <!-- Left Featured Equipment Card (5 cols) -->
              <div class="lg:col-span-5 space-y-3 p-4 rounded-2xl bg-surface-main border border-surface-border">
                <div class="relative h-48 rounded-xl overflow-hidden bg-surface-muted shadow-xs">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
                    alt="Mikano Soundproof Diesel Generator" 
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute bottom-2 left-2 bg-brand-forest/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    Generator Shed · Compound Rear
                  </div>
                  <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                    In Service
                  </span>
                </div>

                <div class="space-y-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-sm font-bold text-brand-forest">Mikano 10kVA Soundproof Generator</h3>
                      <p class="text-[11px] text-mutedText font-mono">SN: MK-NG-98842-X · Bought at Mikano VI</p>
                    </div>
                    <span class="text-sm font-black text-brand-forest">₦4,850,000</span>
                  </div>
                </div>

                <!-- Attached Encrypted Document Badge -->
                <div class="flex items-center justify-between text-xs text-mutedText bg-white p-2.5 rounded-lg border border-surface-border">
                  <div class="flex items-center space-x-2 truncate">
                    <svg class="w-4 h-4 text-brand-emerald shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="truncate font-medium text-brand-forest">mikano_receipt_invoice.pdf</span>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    1.2 MB Encrypted
                  </span>
                </div>
              </div>

              <!-- Right Center Dashboard Live Action Widgets (7 cols) -->
              <div class="lg:col-span-7 space-y-4">
                <!-- Overdue Service Warning Card -->
                <div class="p-4 rounded-xl bg-red-50/80 border border-red-200 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-status-danger font-bold text-xs">
                      <span class="w-2.5 h-2.5 rounded-full bg-status-danger animate-ping"></span>
                      <span>Preventive Maintenance Alert: 250 Running Hours Due</span>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-900">
                      Overdue by 3 days
                    </span>
                  </div>
                  <p class="text-xs text-red-950/80 leading-relaxed">
                    Routine diesel servicing required: replace Perkins oil filter, drain water separator, and inspect alternator AVR belt before Harmattan dust peaks.
                  </p>
                </div>

                <!-- Live Received Technician Quotes -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold uppercase tracking-wider text-brand-forest text-[11px]">
                      Technician Quotes Received (2 Bids)
                    </span>
                    <span class="text-[11px] text-brand-emerald font-semibold">
                      Private Bidding · Serial Number Concealed
                    </span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Quote Card 1 -->
                    <div class="p-3.5 rounded-xl bg-emerald-50/60 border border-brand-emerald/40 space-y-2 shadow-xs">
                      <div class="flex items-start justify-between">
                        <div>
                          <p class="font-bold text-xs text-brand-forest">Mikano Certified Eng.</p>
                          <p class="text-[10px] text-brand-emerald font-semibold">★ 4.95 Rating · VI Base</p>
                        </div>
                        <span class="font-black text-xs text-brand-forest">₦68,000</span>
                      </div>
                      <p class="text-[11px] text-mutedText line-clamp-2">
                        Includes OEM Perkins filter, Mobil Delvac 15W40, and 90-day seal warranty.
                      </p>
                      <div class="pt-1 flex items-center justify-between border-t border-emerald-200/50 text-[10px]">
                        <span class="text-mutedText">⏱️ 4h On-site</span>
                        <router-link to="/quotes" class="font-bold text-brand-emerald hover:underline">
                          Accept Quote →
                        </router-link>
                      </div>
                    </div>

                    <!-- Quote Card 2 -->
                    <div class="p-3.5 rounded-xl bg-surface-main border border-surface-border space-y-2">
                      <div class="flex items-start justify-between">
                        <div>
                          <p class="font-bold text-xs text-brand-forest">Pragmatic Energy Labs</p>
                          <p class="text-[10px] text-mutedText font-semibold">★ 4.92 Rating · Ikeja</p>
                        </div>
                        <span class="font-black text-xs text-brand-forest">₦75,000</span>
                      </div>
                      <p class="text-[11px] text-mutedText line-clamp-2">
                        Complete oil flush + ATS automatic transfer switch coordination check.
                      </p>
                      <div class="pt-1 flex items-center justify-between border-t border-surface-border/50 text-[10px]">
                        <span class="text-mutedText">⏱️ Same-day</span>
                        <router-link to="/quotes" class="font-bold text-brand-forest hover:underline">
                          View Scope →
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Live Quick Action Toolbar -->
                <div class="p-3 rounded-xl bg-surface-main border border-surface-border flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div class="flex items-center space-x-2 text-mutedText text-[11px]">
                    <span>Household Spend YTD:</span>
                    <span class="font-bold text-brand-forest">₦114,500</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <router-link to="/directory" class="btn-secondary py-1 px-3 text-[11px] font-semibold">
                      Find Technicians
                    </router-link>
                    <router-link to="/dashboard" class="btn-emerald py-1 px-3 text-[11px] font-bold shadow-xs">
                      Open Dashboard
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT YOU'LL FIND IN THIS PROJECT (DETAILED ARCHITECTURE & FEATURE INVENTORY) -->
    <section id="modules" class="py-16 md:py-24 bg-surface-card border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Comprehensive Project Breakdown</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
            What You Can Find & Do on LifeLedger NG
          </h2>
          <p class="text-sm sm:text-base text-mutedText leading-relaxed">
            Every screen, workflow, database model, and commercial tool built into the platform based on the master product blueprint.
          </p>
        </div>

        <!-- 8 Core Capabilities Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 1. Asset Register -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 class="text-base font-bold text-brand-forest">Asset Register & Inventory</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Catalog generators, solar inverters, dual-inverter ACs, freezers, and electronics. Record serial numbers, brand, purchase date, cost, store, and location.
            </p>
            <router-link to="/assets" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              Explore Asset Register →
            </router-link>
          </div>

          <!-- 2. Document Vault -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 class="text-base font-bold text-brand-forest">Private Document Vault</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Upload up to 10MB per document (receipts, warranty cards, manuals, invoice PDFs). Enforced with PostgreSQL Row Level Security (RLS) so tenant data is never leaked.
            </p>
            <router-link to="/assets" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              View Document Handling →
            </router-link>
          </div>

          <!-- 3. Warranties -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 class="text-base font-bold text-brand-forest">Smart Warranty Engine</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Dynamic expiry countdowns, status derivation (Active, Expiring Soon, Expired), manufacturer coverage terms, and instant claim readiness when parts fail.
            </p>
            <router-link to="/warranties" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              Track Warranties →
            </router-link>
          </div>

          <!-- 4. Maintenance Engine -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 class="text-base font-bold text-brand-forest">Preventive Maintenance</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Recurrence calculator supporting 250-hour generator service intervals, quarterly AC coil cleaning, and solar battery inspections with automatic next due-date advance.
            </p>
            <router-link to="/maintenance" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              Check Schedules →
            </router-link>
          </div>

          <!-- 5. Expense Accounting -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              05
            </div>
            <h3 class="text-base font-bold text-brand-forest">Expenses & Cost Tracking</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Track lifetime ownership expenditure, YTD servicing costs, and repair invoices in Nigerian Naira (₦). Evaluate repair vs replacement feasibility with real data.
            </p>
            <router-link to="/expenses" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              View Expense Breakdown →
            </router-link>
          </div>

          <!-- 6. Vetted Directory -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              06
            </div>
            <h3 class="text-base font-bold text-brand-forest">Vetted Service Directory</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Browse verified technicians across Lagos, Abuja, Port Harcourt, and Ibadan. Filter by specialty: Perkins generators, HVAC, solar storage, freezers, and TV electronics.
            </p>
            <router-link to="/directory" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              Browse Directory →
            </router-link>
          </div>

          <!-- 7. Quotes & Requests -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              07
            </div>
            <h3 class="text-base font-bold text-brand-forest">Quotes & Repair Bidding</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Request competitive quotes for specific household equipment. Compare technician pricing, workmanship guarantees, and turnarounds side-by-side with 1-click hire.
            </p>
            <router-link to="/quotes" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              Manage Quotes →
            </router-link>
          </div>

          <!-- 8. Commercial Billing -->
          <div class="card-surface p-6 space-y-3 border border-surface-border hover:border-brand-emerald/50 transition-all hover:shadow-md">
            <div class="w-10 h-10 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center font-bold text-sm">
              08
            </div>
            <h3 class="text-base font-bold text-brand-forest">Paystack Billing & Business Hub</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Commercial subscriptions for households (₦1,500/mo) and repair workshops. Integrated with Paystack card and bank transfer checkout plus moderation audit desk.
            </p>
            <router-link to="/billing" class="text-xs font-bold text-brand-emerald hover:underline inline-block pt-1">
              View Billing & Plans →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE PLATFORM TOUR (TABBED PREVIEW) -->
    <section class="py-16 md:py-24 bg-surface-main border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Interactive Tour</span>
          <h2 class="text-3xl font-extrabold text-brand-forest">
            Explore the Application Screens
          </h2>
          <p class="text-xs sm:text-sm text-mutedText">
            Click through the core areas to preview how LifeLedger NG manages your household records.
          </p>
        </div>

        <!-- Tour Navigation Pills -->
        <div class="flex items-center justify-center space-x-2 overflow-x-auto pb-2 text-xs">
          <button 
            v-for="tab in tourTabs" 
            :key="tab.id"
            @click="activeTour = tab.id"
            class="px-4 py-2 rounded-xl font-bold transition-all shrink-0"
            :class="activeTour === tab.id ? 'bg-brand-forest text-white shadow-sm' : 'bg-surface-card border border-surface-border text-mutedText hover:text-brand-forest'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content Box -->
        <div class="card-surface p-6 sm:p-8 rounded-2xl border border-surface-border shadow-md max-w-4xl mx-auto space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
            <div>
              <h3 class="text-lg font-bold text-brand-forest">{{ currentTourTab.title }}</h3>
              <p class="text-xs text-mutedText">{{ currentTourTab.description }}</p>
            </div>
            <router-link :to="currentTourTab.route" class="btn-emerald text-xs py-2 px-4 shrink-0 flex items-center space-x-1 shadow-sm">
              <span>Open {{ currentTourTab.label }}</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <!-- Feature Bullets for the active tab -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div v-for="(point, i) in currentTourTab.highlights" :key="i" class="p-3.5 rounded-xl bg-surface-main border border-surface-border space-y-1">
              <span class="font-bold text-brand-forest block text-xs">✓ {{ point.title }}</span>
              <span class="text-[11px] text-mutedText leading-relaxed block">{{ point.desc }}</span>
            </div>
          </div>

          <!-- Simulated Live Mockup Preview -->
          <div class="p-4 rounded-xl bg-surface-main border border-surface-border/80 text-xs space-y-3 font-mono">
            <div class="flex items-center justify-between border-b border-surface-border/60 pb-2 text-[11px] text-mutedText">
              <span>Path: {{ currentTourTab.route }}</span>
              <span class="text-emerald-600 font-bold">● Active & Routed</span>
            </div>
            <p class="text-brand-forest text-xs font-sans leading-relaxed">
              {{ currentTourTab.sampleDataSummary }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TAILORED FOR NIGERIA SECTION -->
    <section class="py-16 md:py-24 bg-surface-card border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Built For Everyday Nigerian Realities</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
            Designed for local power, humidity & warranty disputes
          </h2>
          <p class="text-sm text-mutedText leading-relaxed">
            Generic Western home inventory apps fail in Nigeria because they don't understand 200-hour generator servicing, harmattan dust on AC coils, or FMCG retail stores demanding original stamp invoices.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-surface p-6 space-y-3 hover:border-brand-emerald/40 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-5 h-5 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-brand-forest">Power Backup & Dual-Source Realities</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Track running hours for Mikano/Perkins diesel generators, maintenance on ATS automatic changeovers, and 6,000-cycle battery warranties on Felicity/Victron solar setups.
            </p>
          </div>

          <div class="card-surface p-6 space-y-3 hover:border-brand-emerald/40 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-5 h-5 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-brand-forest">Instant Proof When Retailers Demand Receipts</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              When Fouani, SIMS, or Scanfrost service centers demand proof of purchase to honor an inverter compressor warranty, pull up the receipt PDF on your phone in 5 seconds.
            </p>
          </div>

          <div class="card-surface p-6 space-y-3 hover:border-brand-emerald/40 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-brand-sage flex items-center justify-center text-brand-forest">
              <svg class="w-5 h-5 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-brand-forest">Vetted Local Technicians Without The Stress</h3>
            <p class="text-xs text-mutedText leading-relaxed">
              Stop relying on unverified roadside technicians who replace genuine copper coils with substandard parts. Access rated specialists with transparent quotes in Naira.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TRANSPARENT PRICING SECTION -->
    <section class="py-16 md:py-24 bg-surface-main border-b border-surface-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-emerald">Clear & Transparent Pricing</span>
          <h2 class="text-3xl font-extrabold text-brand-forest">
            Plans for Nigerian Homes & Businesses
          </h2>
          <p class="text-xs sm:text-sm text-mutedText">
            Start completely free. Upgrade anytime with Paystack using your debit card or Nigerian bank transfer.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- Free Plan -->
          <div class="card-surface p-6 flex flex-col justify-between border border-surface-border space-y-4">
            <div class="space-y-3">
              <span class="text-[10px] uppercase font-bold text-mutedText">Household Tier</span>
              <h3 class="text-lg font-black text-brand-forest">Free Forever</h3>
              <p class="text-2xl font-black text-brand-forest">₦0</p>
              <p class="text-xs text-mutedText">Everything needed to organize essential home appliances.</p>
              <ul class="space-y-2 text-xs text-brand-forest pt-3 border-t border-surface-border">
                <li>✓ Up to 10 household assets</li>
                <li>✓ 10MB receipt storage</li>
                <li>✓ Basic warranty expiration tracking</li>
                <li>✓ Public directory technician access</li>
              </ul>
            </div>
            <router-link to="/dashboard" class="btn-secondary text-xs py-2.5 w-full text-center">
              Start Free
            </router-link>
          </div>

          <!-- Plus Plan -->
          <div class="card-surface p-6 flex flex-col justify-between border-2 border-brand-emerald ring-2 ring-brand-emerald/10 space-y-4 relative">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-emerald text-white shadow-sm">
              Most Popular
            </span>
            <div class="space-y-3">
              <span class="text-[10px] uppercase font-bold text-brand-emerald">Expanded Household</span>
              <h3 class="text-lg font-black text-brand-forest">LifeLedger Plus</h3>
              <p class="text-2xl font-black text-brand-forest">₦1,500 <span class="text-xs font-normal text-mutedText">/ month</span></p>
              <p class="text-xs text-mutedText">For large Nigerian homes with generators, solar, and multiple ACs.</p>
              <ul class="space-y-2 text-xs text-brand-forest pt-3 border-t border-surface-border">
                <li>✓ Unlimited assets & electronics</li>
                <li>✓ Multi-member household sharing (RBAC)</li>
                <li>✓ Priority quote dispatch to technicians</li>
                <li>✓ 250h recurring service scheduler</li>
                <li>✓ Lifetime expense analytics & PDF export</li>
              </ul>
            </div>
            <router-link to="/billing" class="btn-emerald text-xs py-2.5 w-full text-center shadow-sm">
              Upgrade to Plus
            </router-link>
          </div>

          <!-- Business Plan -->
          <div class="card-surface p-6 flex flex-col justify-between border border-surface-border space-y-4">
            <div class="space-y-3">
              <span class="text-[10px] uppercase font-bold text-mutedText">Commercial Tier</span>
              <h3 class="text-lg font-black text-brand-forest">Business Pro</h3>
              <p class="text-2xl font-black text-brand-forest">₦8,500 <span class="text-xs font-normal text-mutedText">/ month</span></p>
              <p class="text-xs text-mutedText">For certified repair shops, generator mechanics, and AC specialists.</p>
              <ul class="space-y-2 text-xs text-brand-forest pt-3 border-t border-surface-border">
                <li>✓ Verified Directory listing with CAC badge</li>
                <li>✓ Receive inbound household repair leads</li>
                <li>✓ Quote submission & job tracking portal</li>
                <li>✓ Multi-technician dispatch management</li>
              </ul>
            </div>
            <router-link to="/business/portal" class="btn-forest text-xs py-2.5 w-full text-center">
              Partner Registration
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION BANNER -->
    <section class="py-16 bg-brand-forest text-surface-main">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-brand-forest via-[#164d39] to-brand-forest rounded-3xl p-8 sm:p-14 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="space-y-3 text-center md:text-left max-w-xl">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 uppercase tracking-wider">
              Get Started in 60 Seconds
            </span>
            <h2 class="text-3xl sm:text-4xl font-black text-white">
              Start cataloging your household assets today
            </h2>
            <p class="text-xs sm:text-sm text-brand-sage/80 leading-relaxed">
              Your possessions represent millions of Naira in hard-earned value. Keep their records, warranties, and maintenance organized.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <router-link to="/dashboard" class="btn-emerald py-3.5 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto text-center shadow-lg">
              Launch Household Ledger
            </router-link>
            <router-link to="/directory" class="btn-sage py-3.5 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto text-center">
              Find Technicians
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTour = ref('dashboard');

const tourTabs = [
  { id: 'dashboard', label: 'Dashboard & Alerts' },
  { id: 'assets', label: 'Asset Register' },
  { id: 'maintenance', label: 'Maintenance Rules' },
  { id: 'warranties', label: 'Warranties' },
  { id: 'expenses', label: 'Expenses' },
  { id: 'directory', label: 'Service Directory' },
  { id: 'quotes', label: 'Quotes & Repairs' },
  { id: 'billing', label: 'Paystack Billing' },
];

const tourDetails = {
  dashboard: {
    title: 'Executive Household Overview',
    label: 'Dashboard',
    route: '/dashboard',
    description: 'High-level real-time summary of registered possessions, overdue routines, and active warranties.',
    highlights: [
      { title: 'Live Counter Metrics', desc: 'Real database total of registered assets, upcoming tasks, and active coverage.' },
      { title: 'Immediate Overdue Alerts', desc: 'Visual warnings for diesel filter changes and Harmattan AC servicing.' },
      { title: 'YTD Cost Summary', desc: 'Continuous tracking of cumulative maintenance spend in Nigerian Naira.' },
    ],
    sampleDataSummary: 'Active Residence: Adeleke Household (Lekki Phase 1) · 5 Registered High-Value Assets · 1 Overdue Service Task · ₦114,500 YTD Maintenance Logged.',
  },
  assets: {
    title: 'Household Asset Register & Document Vault',
    label: 'Asset Register',
    route: '/assets',
    description: 'Centralized inventory with categories (Power, Cooling, Kitchen, Electronics, Laundry), serial numbers, and 10MB receipt storage.',
    highlights: [
      { title: 'Multi-Category Filter', desc: 'Instantly view power backup, cooling, or entertainment equipment.' },
      { title: '10MB Encrypted Vault', desc: 'Secure upload of receipts, invoice PDFs, and warranty cards.' },
      { title: 'Search & Status Badging', desc: 'Fast keyword search by model or serial number with location tags.' },
    ],
    sampleDataSummary: 'Items logged: Mikano 10kVA Generator, Felicity 5kVA Solar Inverter, LG 1.5HP Dual Inverter AC, Haier 319L Freezer, Samsung 65" 4K Smart TV.',
  },
  maintenance: {
    title: 'Recurrence Rules & Maintenance Engine',
    label: 'Maintenance Schedule',
    route: '/maintenance',
    description: 'Automated calculation of due dates with auto-advancing recurrence (e.g. 250 hours, quarterly, annual).',
    highlights: [
      { title: 'Auto-Advancing Recurrence', desc: 'Logging completion automatically computes next service date.' },
      { title: 'Cost & Note Recording', desc: 'Transactionally adds parts and labor expenses to the asset history.' },
      { title: 'Technician Assignment', desc: 'Assign tasks to in-house operators or certified external engineers.' },
    ],
    sampleDataSummary: 'Upcoming: Mikano 250-hour oil flush (Overdue), LG Dual Inverter chemical wash (Due Nov 15), Felicity BMS terminal check (Due Dec 01).',
  },
  warranties: {
    title: 'Manufacturer Warranty Tracker & Claims Hub',
    label: 'Warranties',
    route: '/warranties',
    description: 'Automatic status calculation (Active, Expiring Soon, Expired) and manufacturer claim term notes.',
    highlights: [
      { title: 'Dynamic Status Engine', desc: 'Evaluates start date against current calendar time automatically.' },
      { title: 'Coverage Terms Vault', desc: 'Distinguishes compressor-only warranties from full unit guarantees.' },
      { title: '1-Click Claim Export', desc: 'Pull up receipts and serial numbers instantly when filing claims.' },
    ],
    sampleDataSummary: 'Coverage tracked: Felicity 5-Year Battery Warranty (2029), Haier 3-Year Freezer Compressor (2026), LG 10-Year Dual Inverter Compressor (2026).',
  },
  expenses: {
    title: 'Ownership Cost Analytics & Accounting',
    label: 'Expenses & Repairs',
    route: '/expenses',
    description: 'Comprehensive breakdown of repair expenditures, scheduled maintenance, and accessories in Naira (₦).',
    highlights: [
      { title: 'Total Cost of Ownership', desc: 'Compare purchase price against cumulative repair investment.' },
      { title: 'Category Distribution', desc: 'Identify whether cooling or generators consume the most budget.' },
      { title: 'NDPR Data Export', desc: 'Export complete financial repair records to CSV or encrypted JSON.' },
    ],
    sampleDataSummary: 'Logged spend: ₦45,000 Perkins oil change, ₦22,000 AC capacitor replacement, ₦47,500 5000VA surge protector installation.',
  },
  directory: {
    title: 'Vetted Nigerian Service Provider Directory',
    label: 'Service Directory',
    route: '/directory',
    description: 'Vetted technicians and workshops across Lagos, Abuja, Port Harcourt, and Ibadan.',
    highlights: [
      { title: 'Vetted Partner Badges', desc: 'CAC business registration validation and artisan skill verification.' },
      { title: 'Ratings & Reviews', desc: 'Verified customer ratings with transparent estimate pricing guides.' },
      { title: 'Direct Quote Dispatch', desc: 'Send private quote requests directly to trusted engineering teams.' },
    ],
    sampleDataSummary: 'Verified listings: Mikano Certified Field Engineering (VI), CoolTech HVAC Solutions (Lekki), Pragmatic Solar Labs (Ikeja), Capital Chill (Abuja).',
  },
  quotes: {
    title: 'Quotes & Competitive Repair Bidding',
    label: 'Quotes & Repairs',
    route: '/quotes',
    description: 'Review competitive repair estimates without exposing private purchase receipts or serial numbers.',
    highlights: [
      { title: 'Side-by-Side Comparison', desc: 'Compare quoted pricing in Naira, turnaround time, and warranties.' },
      { title: '1-Click Hire & Acceptance', desc: 'Accept quotes to advance status to Work in Progress.' },
      { title: 'Private Equipment Context', desc: 'Share symptoms and equipment models safely with technicians.' },
    ],
    sampleDataSummary: 'Active requests: Mikano 250-hour servicing (2 quotes received: ₦68,000 vs ₦75,000), LG AC blower vibration (1 quote: ₦22,000).',
  },
  billing: {
    title: 'Paystack Subscriptions & Commercial Hub',
    label: 'Billing & Plans',
    route: '/billing',
    description: 'Transparent plans for households and repair businesses, with debit card and bank transfer checkout.',
    highlights: [
      { title: 'Nigerian Naira (₦) Billing', desc: 'Free Household, LifeLedger Plus (₦1,500/mo), and Business plans.' },
      { title: 'Paystack Modal Checkout', desc: 'Simulated and live Paystack card & virtual bank transfer payments.' },
      { title: 'Invoice & Receipt Log', desc: 'Audit-ready transaction records with unique reference IDs.' },
    ],
    sampleDataSummary: 'Tiers available: Free Forever (₦0), Plus (₦1,500/mo or ₦15,000/yr), Business Pro (₦8,500/mo). Paystack Titan virtual account support.',
  },
};

const currentTourTab = computed(() => {
  return tourDetails[activeTour.value] || tourDetails.dashboard;
});
</script>
