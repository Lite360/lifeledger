import { ref, computed } from 'vue';
import { supabase, hasSupabaseConfig } from './supabase';
import { DEMO_EXPENSES } from './demoData';

const STORAGE_KEY = 'lifeledger_expenses_store';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
      return window.localStorage;
    }
  } catch (e) {}
  return null;
};

const loadStoredExpenses = () => {
  const storage = getSafeStorage();
  if (!storage) return [...DEMO_EXPENSES];
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [...DEMO_EXPENSES];
};

const expensesList = ref(loadStoredExpenses());

const saveExpenses = () => {
  const storage = getSafeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(expensesList.value));
  } catch (e) {}
};

export const expenseService = {
  expenses: computed(() => expensesList.value),

  /**
   * Total lifetime maintenance and repair expenditure
   */
  totalLifetimeSpend: computed(() => {
    return expensesList.value.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }),

  /**
   * Year-to-date (YTD) expenditure
   */
  ytdSpend: computed(() => {
    const currentYear = new Date().getFullYear().toString();
    return expensesList.value
      .filter(item => item.date && item.date.startsWith(currentYear))
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }),

  /**
   * Spend summary categorized by expense type
   */
  spendByType: computed(() => {
    const summary = {
      'Scheduled Maintenance': 0,
      'Repair': 0,
      'Accessory': 0,
      'Other': 0,
    };
    expensesList.value.forEach(item => {
      const type = item.type || item.expenseType || 'Other';
      if (summary[type] !== undefined) {
        summary[type] += Number(item.amount) || 0;
      } else {
        summary['Other'] += Number(item.amount) || 0;
      }
    });
    return summary;
  }),

  /**
   * Log new expense
   */
  async createExpense(data) {
    const newExpense = {
      id: 'exp-' + Date.now(),
      assetId: data.assetId || 'general',
      assetName: data.assetName || 'Household Asset',
      date: data.date || new Date().toISOString().split('T')[0],
      type: data.expenseType || data.type || 'Scheduled Maintenance',
      description: data.description || 'Appliance Maintenance / Repair',
      serviceProvider: data.serviceProvider || 'Local Engineer',
      amount: Number(data.amount) || 0,
      hasInvoice: Boolean(data.hasInvoice || data.receiptFile),
      createdAt: new Date().toISOString(),
    };

    if (hasSupabaseConfig && supabase) {
      try {
        await supabase.from('expenses').insert([{
          asset_id: newExpense.assetId !== 'general' ? newExpense.assetId : null,
          expense_type: newExpense.type,
          amount_minor: Math.round(newExpense.amount * 100),
          occurred_at: newExpense.date,
          service_provider: newExpense.serviceProvider,
          notes: newExpense.description,
        }]);
      } catch (err) {
        console.warn('Supabase expense insert failed:', err);
      }
    }

    expensesList.value.unshift(newExpense);
    saveExpenses();
    return newExpense;
  },

  /**
   * Delete expense record
   */
  async deleteExpense(id) {
    expensesList.value = expensesList.value.filter(e => e.id !== id);
    saveExpenses();
    return true;
  },
};
