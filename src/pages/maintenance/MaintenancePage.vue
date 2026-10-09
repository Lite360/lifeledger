<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-brand-forest">Preventative Maintenance Schedule</h1>
        <p class="text-xs sm:text-sm text-mutedText mt-0.5">
          Keep generators, inverters, ACs, and pumps in top condition before costly breakdowns.
        </p>
      </div>

      <button 
        @click="showScheduleModal = true"
        class="btn-forest text-xs py-2.5 px-4 shadow-sm flex items-center space-x-2 self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
        </svg>
        <span>Schedule Service Task</span>
      </button>
    </div>

    <!-- Maintenance Tasks List -->
    <div class="space-y-4">
      <div 
        v-for="task in tasks" 
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
          <p class="text-[11px] text-mutedText italic">{{ task.notes }}</p>
        </div>

        <div class="flex items-center justify-between sm:justify-end space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-border shrink-0">
          <div class="text-left sm:text-right text-xs">
            <p class="text-[10px] uppercase font-bold text-mutedText">Due Date</p>
            <p class="font-bold text-brand-forest">{{ formatDate(task.dueDate) }}</p>
            <p class="text-[11px] text-mutedText mt-0.5">Est. Cost: {{ formatCurrency(task.estimatedCost) }}</p>
          </div>

          <button 
            @click="markCompleted(task)"
            class="btn-primary text-xs py-2 px-3 shadow-sm whitespace-nowrap"
          >
            Mark Complete ✓
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Schedule Modal Simulator -->
    <div v-if="showScheduleModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm" @click="showScheduleModal = false"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-6 space-y-4">
          <h3 class="text-base font-bold text-brand-forest">Schedule Maintenance Routine</h3>
          <p class="text-xs text-mutedText">Configure service frequency and technician reminders.</p>

          <form @submit.prevent="showScheduleModal = false" class="space-y-3">
            <div>
              <label class="form-label">Select Household Asset</label>
              <select class="form-input text-xs">
                <option>Mikano 10kVA Soundproof Generator</option>
                <option>LG 1.5HP Dual Inverter Split AC</option>
                <option>Felicity 5kVA Solar Inverter & Battery</option>
                <option>Bosch 9kg Washing Machine</option>
              </select>
            </div>
            <div>
              <label class="form-label">Service Description</label>
              <input type="text" placeholder="e.g. Clean dust filters & wash coil" class="form-input text-xs" />
            </div>
            <div>
              <label class="form-label">Next Due Date</label>
              <input type="date" class="form-input text-xs" />
            </div>
            <div class="pt-3 flex justify-end space-x-2">
              <button type="button" @click="showScheduleModal = false" class="btn-secondary text-xs">Cancel</button>
              <button type="submit" class="btn-forest text-xs">Save Schedule (Demo)</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DEMO_MAINTENANCE_TASKS } from '@/services/demoData';
import { formatDate, formatCurrency } from '@/utils/formatters';

const tasks = ref([...DEMO_MAINTENANCE_TASKS]);
const showScheduleModal = ref(false);

const isOverdue = (dueDate) => {
  return dueDate < '2026-10-09';
};

const markCompleted = (task) => {
  alert(`Task "${task.title}" recorded as completed in demo state!`);
};
</script>
