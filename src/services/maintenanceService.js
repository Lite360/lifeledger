import { ref, computed } from 'vue';
import { supabase, hasSupabaseConfig } from './supabase';
import { DEMO_MAINTENANCE_TASKS } from './demoData';
import { assetService } from './assetService';
import { expenseService } from './expenseService';

const STORAGE_KEY_SCHEDULES = 'lifeledger_maintenance_schedules';
const STORAGE_KEY_LOGS = 'lifeledger_maintenance_logs';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
      return window.localStorage;
    }
  } catch (e) {
    // fallback
  }
  return null;
};

const loadStoredSchedules = () => {
  const storage = getSafeStorage();
  if (!storage) return [...DEMO_MAINTENANCE_TASKS];
  try {
    const raw = storage.getItem(STORAGE_KEY_SCHEDULES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [...DEMO_MAINTENANCE_TASKS];
};

const loadStoredLogs = () => {
  const storage = getSafeStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(STORAGE_KEY_LOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [
    {
      id: 'log-01',
      scheduleId: 'task-01',
      assetId: 'ast-101',
      assetName: 'Mikano 10kVA Soundproof Generator',
      completedAt: '2026-07-14',
      notes: 'Quarterly oil change, AVR calibration, battery top-up completed.',
      cost: 52000,
      currency: 'NGN',
      performedBy: 'Engr. Segun Tech Services',
    }
  ];
};

const schedulesList = ref(loadStoredSchedules());
const logsList = ref(loadStoredLogs());

const saveSchedules = () => {
  const storage = getSafeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(schedulesList.value));
  } catch (e) {}
};

const saveLogs = () => {
  const storage = getSafeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logsList.value));
  } catch (e) {}
};

/**
 * Calculate next occurrence date given a base date and recurrence rule
 * @param {string|Date} baseDate 
 * @param {string} recurrenceRule 
 * @returns {string} ISO Date string YYYY-MM-DD
 */
export function calculateNextDueDate(baseDate, recurrenceRule) {
  const date = new Date(baseDate || new Date());
  if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];

  switch (recurrenceRule) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
    case 'every_200_hours':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'bi_annual':
      date.setMonth(date.getMonth() + 6);
      break;
    case 'annual':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      // one-time, return null
      return null;
  }

  return date.toISOString().split('T')[0];
}

export const maintenanceService = {
  schedules: computed(() => schedulesList.value),
  logs: computed(() => logsList.value),

  upcomingTasks: computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return schedulesList.value.filter(t => !t.isCompleted && t.dueDate >= today);
  }),

  overdueTasks: computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return schedulesList.value.filter(t => !t.isCompleted && t.dueDate < today);
  }),

  /**
   * Create a new maintenance schedule
   */
  async createSchedule(data) {
    const asset = assetService.getAsset(data.assetId);
    const newSchedule = {
      id: 'task-' + Date.now(),
      assetId: data.assetId,
      assetName: asset ? asset.name : (data.assetName || 'General Household Asset'),
      title: data.title,
      frequency: data.frequency || 'Quarterly',
      recurrenceRule: data.recurrenceRule || 'quarterly',
      dueDate: data.dueDate,
      assignedTo: data.assignedTo || 'Self / Technician',
      estimatedCost: Number(data.estimatedCost) || 0,
      priority: data.priority || 'medium',
      notes: data.notes || '',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    if (hasSupabaseConfig && supabase) {
      try {
        await supabase.from('maintenance_schedules').insert([{
          asset_id: newSchedule.assetId,
          title: newSchedule.title,
          due_at: newSchedule.dueDate,
          recurrence_rule: newSchedule.recurrenceRule,
          frequency: newSchedule.frequency,
          assigned_to: newSchedule.assignedTo,
          estimated_cost_minor: Math.round(newSchedule.estimatedCost * 100),
          notes: newSchedule.notes,
        }]);
      } catch (err) {
        console.warn('Supabase schedule insert failed:', err);
      }
    }

    schedulesList.value.unshift(newSchedule);
    saveSchedules();
    return newSchedule;
  },

  /**
   * Complete a task transactionally:
   * 1. Records maintenance_log
   * 2. Logs an expense record in expenseService
   * 3. Calculates & advances schedule to next dueDate if recurring, or flags complete
   */
  async completeTask(scheduleId, completionData = {}) {
    const index = schedulesList.value.findIndex(s => s.id === scheduleId);
    if (index === -1) throw new Error('Schedule task not found');

    const schedule = schedulesList.value[index];
    const completedAt = completionData.completedAt || new Date().toISOString().split('T')[0];
    const actualCost = Number(completionData.cost !== undefined ? completionData.cost : schedule.estimatedCost) || 0;
    const performedBy = completionData.performedBy || schedule.assignedTo || 'Technician';

    // 1. Create Maintenance Log
    const newLog = {
      id: 'log-' + Date.now(),
      scheduleId: schedule.id,
      assetId: schedule.assetId,
      assetName: schedule.assetName,
      completedAt,
      notes: completionData.notes || `Routine service executed: ${schedule.title}`,
      cost: actualCost,
      currency: 'NGN',
      performedBy,
    };
    logsList.value.unshift(newLog);
    saveLogs();

    // 2. Automatically record in expenses if cost > 0
    if (actualCost > 0) {
      try {
        await expenseService.createExpense({
          assetId: schedule.assetId,
          assetName: schedule.assetName,
          expenseType: 'Scheduled Maintenance',
          amount: actualCost,
          date: completedAt,
          serviceProvider: performedBy,
          description: `${schedule.title} (${schedule.assetName})`,
        });
      } catch (err) {
        console.warn('Auto expense recording error:', err);
      }
    }

    // 3. Advance to next occurrence if recurring
    const nextDue = calculateNextDueDate(completedAt, schedule.recurrenceRule);
    if (nextDue) {
      schedule.dueDate = nextDue;
      schedule.lastCompletedAt = completedAt;
      schedule.isCompleted = false;
    } else {
      schedule.isCompleted = true;
      schedule.lastCompletedAt = completedAt;
    }

    schedulesList.value[index] = { ...schedule };
    saveSchedules();

    return { log: newLog, nextDueDate: nextDue };
  },

  /**
   * Delete schedule
   */
  async deleteSchedule(id) {
    schedulesList.value = schedulesList.value.filter(s => s.id !== id);
    saveSchedules();
    return true;
  },
};
