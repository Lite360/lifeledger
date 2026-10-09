import { ref, computed } from 'vue';
import { assetService } from './assetService';
import { calculateWarrantyStatus } from '@/utils/formatters';

const initialNotifications = [
  {
    id: 'notif-01',
    title: 'Routine Generator Service Overdue',
    message: 'Mikano 10kVA Soundproof Generator oil and filter replacement is overdue.',
    type: 'danger',
    read: false,
    date: '2026-10-06',
    route: '/maintenance',
  },
  {
    id: 'notif-02',
    title: 'Warranty Expiry Approaching',
    message: 'LG 1.5HP Dual Inverter Split AC warranty ends within 16 days.',
    type: 'warning',
    read: false,
    date: '2026-10-08',
    route: '/warranties',
  },
  {
    id: 'notif-03',
    title: 'Upcoming AC Cleaning Scheduled',
    message: 'Bi-monthly dust filter wash is scheduled for October 18.',
    type: 'info',
    read: true,
    date: '2026-10-05',
    route: '/maintenance',
  },
];

const notificationsList = ref(initialNotifications);

export const notificationService = {
  notifications: computed(() => notificationsList.value),
  unreadCount: computed(() => notificationsList.value.filter(n => !n.read).length),

  markAsRead(id) {
    const item = notificationsList.value.find(n => n.id === id);
    if (item) item.read = true;
  },

  markAllAsRead() {
    notificationsList.value.forEach(n => { n.read = true; });
  },

  addNotification(notif) {
    notificationsList.value.unshift({
      id: 'notif-' + Date.now(),
      read: false,
      date: new Date().toISOString().split('T')[0],
      ...notif,
    });
  },
};
