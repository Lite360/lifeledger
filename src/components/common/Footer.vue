<template>
  <footer class="bg-brand-forest text-surface-main pt-16 pb-12 border-t border-brand-emerald/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <!-- Brand Info -->
        <div class="md:col-span-1 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-lg bg-brand-emerald flex items-center justify-center text-white shadow-sm">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-white">LifeLedger NG</span>
          </div>
          <p class="text-xs text-brand-sage/80 leading-relaxed">
            Know what you own. Remember what it needs. Protect its value. Built specifically for Nigerian homeowners, tenants, and families.
          </p>
          <div class="flex items-center space-x-2 text-xs text-brand-sage/60">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Proudly tailored for Nigeria (NG)</span>
          </div>
        </div>

        <!-- Solutions -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-300">Features</h4>
          <ul class="space-y-2 text-xs text-brand-sage/80">
            <li><router-link to="/how-it-works" class="hover:text-white transition-colors">Asset Register</router-link></li>
            <li><router-link to="/how-it-works" class="hover:text-white transition-colors">Receipt Preservation</router-link></li>
            <li><router-link to="/how-it-works" class="hover:text-white transition-colors">Generator & Solar Logs</router-link></li>
            <li><router-link to="/how-it-works" class="hover:text-white transition-colors">Warranty Expiry Alerts</router-link></li>
            <li><router-link to="/how-it-works" class="hover:text-white transition-colors">Repair Expense Tracking</router-link></li>
          </ul>
        </div>

        <!-- Household Resources -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-300">Resources</h4>
          <ul class="space-y-2 text-xs text-brand-sage/80">
            <li><router-link to="/pricing" class="hover:text-white transition-colors">Pricing Plans</router-link></li>
            <li><router-link to="/help" class="hover:text-white transition-colors">Help Center & FAQ</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-white transition-colors">Live Demo Shell</router-link></li>
            <li><a href="#roadmap" class="hover:text-white transition-colors">Product Roadmap</a></li>
          </ul>
        </div>

        <!-- Legal & Trust -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-300">Privacy & Trust</h4>
          <ul class="space-y-2 text-xs text-brand-sage/80">
            <li><router-link to="/privacy" class="hover:text-white transition-colors">Privacy Policy (NDPR Compliant)</router-link></li>
            <li><router-link to="/terms" class="hover:text-white transition-colors">Terms of Service</router-link></li>
            <li><span class="text-xs text-emerald-400/80">Encrypted Private Storage</span></li>
            <li><span class="text-xs text-emerald-400/80">Row Level Security (RLS)</span></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-sage/60">
        <p>&copy; 2026 LifeLedger NG. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
