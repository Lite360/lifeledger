import { createRouter, createWebHistory } from 'vue-router';

import PublicLayout from '@/layouts/PublicLayout.vue';
import AppLayout from '@/layouts/AppLayout.vue';

// Public pages
import LandingPage from '@/pages/public/LandingPage.vue';
import HowItWorksPage from '@/pages/public/HowItWorksPage.vue';
import PricingPage from '@/pages/public/PricingPage.vue';
import HelpPage from '@/pages/public/HelpPage.vue';
import PrivacyPage from '@/pages/public/PrivacyPage.vue';
import TermsPage from '@/pages/public/TermsPage.vue';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage.vue';
import RegisterPage from '@/pages/auth/RegisterPage.vue';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.vue';
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage.vue';

// Authenticated pages
import DashboardPage from '@/pages/dashboard/DashboardPage.vue';
import AssetsPage from '@/pages/assets/AssetsPage.vue';
import WarrantiesPage from '@/pages/warranties/WarrantiesPage.vue';
import MaintenancePage from '@/pages/maintenance/MaintenancePage.vue';
import ExpensesPage from '@/pages/expenses/ExpensesPage.vue';
import SettingsPage from '@/pages/settings/SettingsPage.vue';

// Phase 4 Commercial & Marketplace Pages
import ProvidersPage from '@/pages/directory/ProvidersPage.vue';
import QuotesPage from '@/pages/quotes/QuotesPage.vue';
import BusinessPortalPage from '@/pages/business/BusinessPortalPage.vue';
import BillingPage from '@/pages/billing/BillingPage.vue';
import AdminPage from '@/pages/admin/AdminPage.vue';

const routes = [
  // Public marketing & legal layout
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Landing',
        component: LandingPage,
        meta: { title: 'LifeLedger NG — Know What You Own' },
      },
      {
        path: 'how-it-works',
        name: 'HowItWorks',
        component: HowItWorksPage,
        meta: { title: 'How It Works — LifeLedger NG' },
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: PricingPage,
        meta: { title: 'Household Pricing — LifeLedger NG' },
      },
      {
        path: 'help',
        name: 'Help',
        component: HelpPage,
        meta: { title: 'Help & FAQ — LifeLedger NG' },
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: PrivacyPage,
        meta: { title: 'Privacy Policy — LifeLedger NG' },
      },
      {
        path: 'terms',
        name: 'Terms',
        component: TermsPage,
        meta: { title: 'Terms of Service — LifeLedger NG' },
      },
    ],
  },

  // Auth pages (standalone)
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'Sign In — LifeLedger NG' },
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
        meta: { title: 'Register Household — LifeLedger NG' },
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordPage,
        meta: { title: 'Reset Password — LifeLedger NG' },
      },
      {
        path: 'verify-email',
        name: 'VerifyEmail',
        component: VerifyEmailPage,
        meta: { title: 'Verify Email — LifeLedger NG' },
      },
    ],
  },

  // Authenticated App Shell
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { title: 'Dashboard — LifeLedger NG' },
      },
      {
        path: 'assets',
        name: 'Assets',
        component: AssetsPage,
        meta: { title: 'Asset Register — LifeLedger NG' },
      },
      {
        path: 'warranties',
        name: 'Warranties',
        component: WarrantiesPage,
        meta: { title: 'Warranties — LifeLedger NG' },
      },
      {
        path: 'maintenance',
        name: 'Maintenance',
        component: MaintenancePage,
        meta: { title: 'Maintenance Schedule — LifeLedger NG' },
      },
      {
        path: 'expenses',
        name: 'Expenses',
        component: ExpensesPage,
        meta: { title: 'Expenses & Repairs — LifeLedger NG' },
      },
      {
        path: 'directory',
        name: 'Directory',
        component: ProvidersPage,
        meta: { title: 'Service Directory — LifeLedger NG' },
      },
      {
        path: 'quotes',
        name: 'Quotes',
        component: QuotesPage,
        meta: { title: 'Service Quotes — LifeLedger NG' },
      },
      {
        path: 'business/portal',
        name: 'BusinessPortal',
        component: BusinessPortalPage,
        meta: { title: 'Business & Provider Portal — LifeLedger NG' },
      },
      {
        path: 'billing',
        name: 'Billing',
        component: BillingPage,
        meta: { title: 'Subscriptions & Billing — LifeLedger NG' },
      },
      {
        path: 'admin',
        name: 'Admin',
        component: AdminPage,
        meta: { title: 'Platform Operations & Compliance — LifeLedger NG' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
        meta: { title: 'Household Settings — LifeLedger NG' },
      },
    ],
  },

  // Fallback redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
