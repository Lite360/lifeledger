import { describe, it, expect, beforeEach } from 'vitest';
import { assetService, validateDocumentFile } from '@/services/assetService';

describe('validateDocumentFile', () => {
  it('rejects null or undefined files', () => {
    expect(validateDocumentFile(null).valid).toBe(false);
    expect(validateDocumentFile(undefined).valid).toBe(false);
  });

  it('accepts valid JPEG, PNG, and PDF formats', () => {
    const validJpeg = new File(['dummy content'], 'receipt.jpg', { type: 'image/jpeg' });
    const validPdf = new File(['dummy content'], 'invoice.pdf', { type: 'application/pdf' });
    
    expect(validateDocumentFile(validJpeg).valid).toBe(true);
    expect(validateDocumentFile(validPdf).valid).toBe(true);
  });

  it('rejects unsupported file formats', () => {
    const textFile = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    const res = validateDocumentFile(textFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('Invalid file format');
  });

  it('rejects files exceeding 10MB size limit', () => {
    // 11 MB dummy file
    const bigFile = new File([new Uint8Array(11 * 1024 * 1024)], 'huge.pdf', { type: 'application/pdf' });
    const res = validateDocumentFile(bigFile);
    expect(res.valid).toBe(false);
    expect(res.error).toContain('10MB limit');
  });
});

describe('assetService CRUD Operations', () => {
  it('retrieves assets reactively', () => {
    expect(assetService.assets.value.length).toBeGreaterThan(0);
  });

  it('creates an asset with valid attributes', async () => {
    const initialCount = assetService.assets.value.length;
    const newAsset = await assetService.createAsset({
      name: 'Thermocool 1.5HP AC',
      category: 'cooling',
      brand: 'Thermocool',
      purchasePrice: 420000,
      purchaseDate: '2026-05-10',
    });

    expect(newAsset.id).toBeDefined();
    expect(newAsset.name).toBe('Thermocool 1.5HP AC');
    expect(assetService.assets.value.length).toBe(initialCount + 1);
  });

  it('updates an existing asset', async () => {
    const target = assetService.assets.value[0];
    const updated = await assetService.updateAsset(target.id, {
      location: 'Guest Bedroom',
    });

    expect(updated.location).toBe('Guest Bedroom');
    expect(assetService.getAsset(target.id).location).toBe('Guest Bedroom');
  });

  it('deletes an asset by id', async () => {
    const newAsset = await assetService.createAsset({
      name: 'To be deleted',
      category: 'other',
      brand: 'Generic',
      purchasePrice: 10000,
    });

    const countBefore = assetService.assets.value.length;
    await assetService.deleteAsset(newAsset.id);
    expect(assetService.assets.value.length).toBe(countBefore - 1);
    expect(assetService.getAsset(newAsset.id)).toBeNull();
  });
});
