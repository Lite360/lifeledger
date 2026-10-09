import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatDate, 
  calculateWarrantyStatus, 
  calculateMaintenanceUrgency 
} from '@/utils/formatters';

describe('formatCurrency', () => {
  it('formats Nigerian Naira with symbol and standard grouping', () => {
    expect(formatCurrency(4850000)).toMatch(/₦4,850,000/);
    expect(formatCurrency(15000)).toMatch(/₦15,000/);
    expect(formatCurrency(0)).toBe('₦0');
  });

  it('handles invalid numbers gracefully', () => {
    expect(formatCurrency(null)).toBe('₦0');
    expect(formatCurrency(undefined)).toBe('₦0');
    expect(formatCurrency('invalid')).toBe('₦0');
  });

  it('handles other currency codes', () => {
    const usd = formatCurrency(100, 'USD');
    expect(usd).toContain('100');
  });
});

describe('formatDate', () => {
  it('formats ISO dates to readable British/Nigerian format', () => {
    const formatted = formatDate('2026-10-15');
    expect(formatted).toContain('15');
    expect(formatted).toContain('Oct');
    expect(formatted).toContain('2026');
  });

  it('handles null or empty date values', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatDate('')).toBe('—');
  });
});

describe('calculateWarrantyStatus', () => {
  it('returns no_warranty for empty dates', () => {
    const res = calculateWarrantyStatus(null);
    expect(res.status).toBe('no_warranty');
    expect(res.badgeClass).toBe('badge-neutral');
  });

  it('detects active long-term warranty', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 180);
    const res = calculateWarrantyStatus(futureDate.toISOString());
    expect(res.status).toBe('active');
    expect(res.badgeClass).toBe('badge-emerald');
  });

  it('detects expiring soon within 30 days', () => {
    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + 15);
    const res = calculateWarrantyStatus(soonDate.toISOString());
    expect(res.status).toBe('expiring_soon');
    expect(res.badgeClass).toBe('badge-warning');
  });

  it('detects expired warranties', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const res = calculateWarrantyStatus(pastDate.toISOString());
    expect(res.status).toBe('expired');
    expect(res.badgeClass).toBe('badge-danger');
  });
});

describe('calculateMaintenanceUrgency', () => {
  it('identifies overdue tasks accurately', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 4);
    const res = calculateMaintenanceUrgency(pastDate.toISOString());
    expect(res.isOverdue).toBe(true);
    expect(res.badgeClass).toBe('badge-danger');
    expect(res.label).toContain('4 days overdue');
  });

  it('identifies upcoming tasks accurately', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const res = calculateMaintenanceUrgency(futureDate.toISOString());
    expect(res.isOverdue).toBe(false);
    expect(res.isUpcoming).toBe(true);
    expect(res.badgeClass).toBe('badge-warning');
  });
});
