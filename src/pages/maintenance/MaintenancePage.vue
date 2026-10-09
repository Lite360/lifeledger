<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Preventative Maintenance & Service</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Schedule routines, record servicing costs in ₦, and avoid unexpected generator and AC breakdowns.
        </p>
      </div>

      <button 
        @click="showScheduleModal = true"
        class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Schedule Routine</span>
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex items-center space-x-2 border-b border-surface-border pb-3">
      <button 
        @click="activeTab = 'all'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
        :class="activeTab === 'all' ? 'bg-brand-forest text-white' : 'bg-surface-main text-mutedText hover:text-brand-forest'"
      >
        All Schedules ({{ schedules.length }})
      </button>
      <button 
        @click="activeTab = 'overdue'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
        :class="activeTab === 'overdue' ? 'bg-status-danger text-white' : 'bg-surface-main text-mutedText hover:text-brand-forest'"
      >
        Overdue ({{ overdueTasks.length }})
      </button>
      <button 
        @click="activeTab = 'logs'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
        :class="activeTab === 'logs' ? 'bg-brand-emerald text-white' : 'bg-surface-main text-mutedText hover:text-brand-forest'"
      >
        Completed Service Logs ({{ logs.length }})
      </button>
    </div>

    <!-- Active Schedules List -->
    <div v-if="activeTab !== 'logs'" class="space-y-4">
      <div 
        v-for="task in displayedTasks" 
        :key="task.id"
        class="card-surface p-5 hover:border-brand-emerald/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        :class="[ isOverdue(task.dueDate) ? 'border-l-4 border-l-status-danger bg-red-50/10' : '' ]"
      >
        <div class="space-y-1.5 min-w-0">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold text-brand-forest">{{ task.title }}</span>
            <span 
              class="text-[10px] font-bold px-2 py-0.5 rounded-full"
              :class="isOverdue(task.dueDate) ? 'bg-red-100 text-status-danger' : 'bg-brand-sage text-brand-forest'"
            >
              {{ isOverdue(task.dueDate) ? 'Overdue' : 'Upcoming' }}
            </span>
          </div>
          <p class="text-xs font-semibold text-brand-emerald">{{ task.assetName }}</p>
          <p class="text-xs text-mutedText">Interval: {{ task.frequency }} · Assigned: {{ task.assignedTo }}</p>
          <p v-if="task.notes" class="text-[11px] text-mutedText italic">{{ task.notes }}</p>
        </div>

        <div class="flex items-center justify-between sm:justify-end space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-border shrink-0">
          <div class="text-left sm:text-right text-xs">
            <p class="text-[10px] uppercase font-bold text-mutedText">Next Due Date</p>
            <p class="font-bold text-brand-forest">{{ formatDate(task.dueDate) }}</p>
            <p class="text-[11px] text-mutedText mt-0.5">Est. Cost: {{ formatCurrency(task.estimatedCost) }}</p>
          </div>

          <button 
            @click="initiateCompletion(task)"
            class="btn-primary text-xs py-2 px-3 shadow-sm whitespace-nowrap"
          >
            Mark Done ✓
          </button>
        </div>
      </div>

      <div v-if="displayedTasks.length === 0" class="card-surface p-8 text-center text-xs text-mutedText">
        No maintenance tasks found for this view.
      </div>
    </div>

    <!-- Completed Logs List -->
    <div v-else class="card-surface overflow-hidden divide-y divide-surface-border">
      <div 
        v-for="log in logs" 
        :key="log.id"
        class="p-4 hover:bg-surface-main/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
      >
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="font-bold text-brand-forest">{{ log.assetName }}</span>
            <span class="badge-emerald text-[10px]">Service Executed</span>
          </div>
          <p class="text-primaryText">{{ log.notes }}</p>
          <p class="text-mutedText text-[11px]">Technician: {{ log.performedBy }} · Completed on {{ formatDate(log.completedAt) }}</p>
        </div>

        <div class="text-right shrink-0">
          <span class="text-sm font-black text-brand-forest">{{ formatCurrency(log.cost) }}</span>
          <p class="text-[10px] text-brand-emerald font-semibold">Expense Logged</p>
        </div>
      </div>

      <div v-if="logs.length === 0" class="p-8 text-center text-xs text-mutedText">
        No completed maintenance records logged yet.
      </div>
    </div>

    <!-- Schedule Modal -->
    <div v-if="showScheduleModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="showScheduleModal = false"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-6 space-y-4">
          <h3 class="text-base font-bold text-brand-forest">Schedule Maintenance Routine</h3>
          <p class="text-xs text-mutedText">Set recurrence rule and technician reminder.</p>

          <form @submit.prevent="handleCreateSchedule" class="space-y-3">
            <div>
              <label class="form-label">Household Asset <span class="text-status-danger">*</span></label>
              <select v-model="scheduleForm.assetId" required class="form-input text-xs">
                <option v-for="a in assets" :key="a.id" :value="a.id">{{ a.name }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Service Title <span class="text-status-danger">*</span></label>
              <input v-model="scheduleForm.title" type="text" required placeholder="e.g. Engine Oil & Air Filter Change" class="form-input text-xs" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Recurrence <span class="text-status-danger">*</span></label>
                <select v-model="scheduleForm.recurrenceRule" class="form-input text-xs">
                  <option value="quarterly">Quarterly (3 Months)</option>
                  <option value="every_200_hours">Every 200 Gen Hours</option>
                  <option value="monthly">Monthly</option>
                  <option value="bi_annual">Bi-Annual (6 Months)</option>
                  <option value="annual">Annual</option>
                  <option value="one_time">One-time</option>
                </select>
              </div>
              <div>
                <label class="form-label">First Due Date <span class="text-status-danger">*</span></label>
                <input v-model="scheduleForm.dueDate" type="date" required class="form-input text-xs" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Assigned Technician</label>
                <input v-model="scheduleForm.assignedTo" type="text" placeholder="e.g. Engr. Segun" class="form-input text-xs" />
              </div>
              <div>
                <label class="form-label">Estimated Cost (₦)</label>
                <input v-model.number="scheduleForm.estimatedCost" type="number" placeholder="45000" class="form-input text-xs" />
              </div>
            </div>
            <div class="pt-3 flex justify-end space-x-2">
              <button type="button" @click="showScheduleModal = false" class="btn-secondary text-xs">Cancel</button>
              <button type="submit" class="btn-forest text-xs">Save Schedule</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Complete Task Modal -->
    <div v-if="taskToComplete" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="taskToComplete = null"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-6 space-y-4">
          <h3 class="text-base font-bold text-brand-forest">Record Service Execution</h3>
          <p class="text-xs text-mutedText">Log technician details, actual cost in ₦, and advance recurring schedule.</p>

          <form @submit.prevent="handleCompleteTask" class="space-y-3">
            <div>
              <p class="text-xs font-bold text-brand-forest">{{ taskToComplete.title }}</p>
              <p class="text-[11px] text-brand-emerald">{{ taskToComplete.assetName }}</p>
            </div>
            <div>
              <label class="form-label">Completion Date</label>
              <input v-model="completionForm.completedAt" type="date" required class="form-input text-xs" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="form-label">Technician / Provider</label>
                <input v-model="completionForm.performedBy" type="text" placeholder="e.g. Engr. Segun" class="form-input text-xs" />
              </div>
              <div>
                <label class="form-label">Actual Cost Paid (₦)</label>
                <input v-model.number="completionForm.cost" type="number" required placeholder="52000" class="form-input text-xs" />
              </div>
            </div>
            <div>
              <label class="form-label">Service Notes & Work Done</label>
              <textarea v-model="completionForm.notes" rows="2" placeholder="Replaced fuel filter and oil. Engine tested under load." class="form-input text-xs"></textarea>
            </div>
            <div class="pt-3 flex justify-end space-x-2">
              <button type="button" @click="taskToComplete = null" class="btn-secondary text-xs">Cancel</button>
              <button type="submit" class="btn-primary text-xs">Confirm & Log Expense</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { maintenanceService } from '@/services/maintenanceService';
import { assetService } from '@/services/assetService';
import { formatDate, formatCurrency } from '@/utils/formatters';

const activeTab = ref('all');
const showScheduleModal = ref(false);
const taskToComplete = ref(null);

const schedules = maintenanceService.schedules;
const logs = maintenanceService.logs;
const overdueTasks = maintenanceService.overdueTasks;
const assets = assetService.assets;

const scheduleForm = reactive({
  assetId: assets.value[0]?.id || '',
  title: '',
  recurrenceRule: 'quarterly',
  dueDate: new Date().toISOString().split('T')[0],
  assignedTo: '',
  estimatedCost: null,
});

const completionForm = reactive({
  completedAt: new Date().toISOString().split('T')[0],
  performedBy: '',
  cost: null,
  notes: '',
});

const isOverdue = (dueDate) => {
  return dueDate < new Date().toISOString().split('T')[0];
};

const displayedTasks = computed(() => {
  if (activeTab.value === 'overdue') return overdueTasks.value;
  return schedules.value;
});

const handleCreateSchedule = async () => {
  const frequencyMap = {
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    every_200_hours: 'Every 200 Hours',
    bi_annual: 'Bi-Annual',
    annual: 'Annual',
    one_time: 'One-time',
  };

  await maintenanceService.createSchedule({
    ...scheduleForm,
    frequency: frequencyMap[scheduleForm.recurrenceRule] || 'Scheduled',
  });
  showScheduleModal.value = false;
};

const initiateCompletion = (task) => {
  taskToComplete.value = task;
  completionForm.performedBy = task.assignedTo || '';
  completionForm.cost = task.estimatedCost || 0;
  completionForm.notes = `Routine completed: ${task.title}`;
};

const handleCompleteTask = async () => {
  if (!taskToComplete.value) return;
  await maintenanceService.completeTask(taskToComplete.value.id, { ...completionForm });
  taskToComplete.value = null;
  activeTab.value = 'logs';
};
</script>
