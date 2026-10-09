/**
 * LifeLedger NG - Utility Formatters and Calculations
 */

/**
 * Format currency amount with Nigerian Naira (₦) or specified currency
 * @param {number|string} amount 
 * @param {string} currencyCode 
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = 'NGN') {
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount || 0);
  if (isNaN(numericAmount)) return '₦0';

  if (currencyCode === 'NGN') {
    return '₦' + new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(numericAmount);
}

/**
 * Format a date string into standard human-readable format
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatDate(dateVal) {
  if (!dateVal) return '—';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Calculate warranty status and days remaining
 * @param {string|Date} expiryDate 
 * @returns {{ status: 'active' | 'expiring_soon' | 'expired' | 'no_warranty', label: string, daysLeft: number, badgeClass: string }}
 */
export function calculateWarrantyStatus(expiryDate) {
  if (!expiryDate) {
    return {
      status: 'no_warranty',
      label: 'No Warranty',
      daysLeft: 0,
      badgeClass: 'badge-neutral',
    };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(expiryDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return {
      status: 'expired',
      label: `Expired (${Math.abs(daysLeft)}d ago)`,
      daysLeft,
      badgeClass: 'badge-danger',
    };
  }

  if (daysLeft <= 30) {
    return {
      status: 'expiring_soon',
      label: `${daysLeft} days left`,
      daysLeft,
      badgeClass: 'badge-warning',
    };
  }

  return {
    status: 'active',
    label: `${daysLeft} days left`,
    daysLeft,
    badgeClass: 'badge-emerald',
  };
}

/**
 * Calculate maintenance task urgency
 * @param {string|Date} dueDate 
 * @returns {{ isOverdue: boolean, isUpcoming: boolean, daysDiff: number, label: string, badgeClass: string }}
 */
export function calculateMaintenanceUrgency(dueDate) {
  if (!dueDate) {
    return {
      isOverdue: false,
      isUpcoming: false,
      daysDiff: 0,
      label: 'Unscheduled',
      badgeClass: 'badge-neutral',
    };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - now.getTime();
  const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    return {
      isOverdue: true,
      isUpcoming: false,
      daysDiff,
      label: `${Math.abs(daysDiff)} days overdue`,
      badgeClass: 'badge-danger',
    };
  }

  if (daysDiff === 0) {
    return {
      isOverdue: false,
      isUpcoming: true,
      daysDiff,
      label: 'Due today',
      badgeClass: 'badge-warning',
    };
  }

  if (daysDiff <= 7) {
    return {
      isOverdue: false,
      isUpcoming: true,
      daysDiff,
      label: `Due in ${daysDiff} days`,
      badgeClass: 'badge-warning',
    };
  }

  return {
    isOverdue: false,
    isUpcoming: false,
    daysDiff,
    label: `Due ${formatDate(dueDate)}`,
    badgeClass: 'badge-emerald',
  };
}
