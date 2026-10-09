import { ref, computed } from 'vue';
import { supabase, hasSupabaseConfig } from './supabase';
import { DEMO_ASSETS } from './demoData';

const STORAGE_KEY = 'lifeledger_assets_store';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
      return window.localStorage;
    }
  } catch (e) {
    // localStorage not accessible
  }
  return null;
};

// Initialize reactive local store with fallback to initial benchmark assets
const loadStoredAssets = () => {
  const storage = getSafeStorage();
  if (!storage) return [...DEMO_ASSETS];
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [...DEMO_ASSETS];
};

const assetsList = ref(loadStoredAssets());

const saveAssetsToLocal = () => {
  const storage = getSafeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(assetsList.value));
  } catch (e) {
    // fallback
  }
};


/**
 * Validate document file type and size limit
 * Accepts JPEG, PNG, WEBP, and PDF up to 10MB as per PRD Section 8
 */
export function validateDocumentFile(file) {
  if (!file) return { valid: false, error: 'No file provided' };
  
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload JPG, PNG, WEBP, or PDF.',
    };
  }

  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit.',
    };
  }

  return { valid: true };
}

export const assetService = {
  // Reactive getter
  assets: computed(() => assetsList.value),

  /**
   * Fetch assets from Supabase or reactive store
   */
  async fetchAssets(householdId) {
    if (hasSupabaseConfig && supabase) {
      try {
        let query = supabase.from('assets').select(`
          *,
          warranties (*),
          asset_documents (*)
        `).is('archived_at', null);

        if (householdId) {
          query = query.eq('household_id', householdId);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (data) {
          assetsList.value = data;
          saveAssetsToLocal();
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
      }
    }
    return assetsList.value;
  },

  /**
   * Get single asset by ID
   */
  getAsset(id) {
    return assetsList.value.find(a => a.id === id) || null;
  },

  /**
   * Create new asset record with optional warranty and document attachment
   */
  async createAsset(assetData, documentFile = null) {
    const newId = hasSupabaseConfig ? undefined : 'ast-' + Date.now();
    
    let documentRecord = null;
    if (documentFile) {
      const validation = validateDocumentFile(documentFile);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      documentRecord = {
        id: 'doc-' + Date.now(),
        original_filename: documentFile.name,
        mime_type: documentFile.type,
        size_bytes: documentFile.size,
        uploaded_at: new Date().toISOString(),
      };
    }

    const newAsset = {
      id: newId || 'ast-' + Date.now(),
      household_id: assetData.household_id || 'h1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
      name: assetData.name,
      category: assetData.category,
      categoryLabel: assetData.categoryLabel || this.getCategoryLabel(assetData.category),
      brand: assetData.brand,
      model: assetData.model || '',
      serialNumber: assetData.serialNumber || '',
      location: assetData.location || 'General',
      purchaseDate: assetData.purchaseDate || new Date().toISOString().split('T')[0],
      purchasePrice: Number(assetData.purchasePrice) || 0,
      store: assetData.store || '',
      notes: assetData.notes || '',
      imageUrl: assetData.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      hasReceipt: Boolean(documentFile || assetData.hasReceipt),
      warranty: assetData.warrantyProvider ? {
        provider: assetData.warrantyProvider,
        expiryDate: assetData.warrantyExpiry,
        terms: assetData.warrantyTerms || 'Manufacturer standard coverage',
      } : (assetData.warranty || null),
      documents: documentRecord ? [documentRecord] : [],
      created_at: new Date().toISOString(),
    };

    if (hasSupabaseConfig && supabase) {
      try {
        const { data, error } = await supabase.from('assets').insert([{
          name: newAsset.name,
          category: newAsset.category,
          brand: newAsset.brand,
          model: newAsset.model,
          serial_number: newAsset.serialNumber,
          location: newAsset.location,
          purchase_date: newAsset.purchaseDate,
          purchase_price_minor: Math.round(newAsset.purchasePrice * 100),
          store: newAsset.store,
          notes: newAsset.notes,
        }]).select().single();

        if (error) throw error;
        if (data) newAsset.id = data.id;
      } catch (err) {
        console.warn('Supabase asset insertion error, recorded in reactive local store:', err);
      }
    }

    assetsList.value.unshift(newAsset);
    saveAssetsToLocal();
    return newAsset;
  },

  /**
   * Update existing asset
   */
  async updateAsset(id, updateData) {
    const index = assetsList.value.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Asset not found');

    const updated = {
      ...assetsList.value[index],
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    if (hasSupabaseConfig && supabase) {
      try {
        const { error } = await supabase.from('assets').update({
          name: updated.name,
          category: updated.category,
          brand: updated.brand,
          model: updated.model,
          serial_number: updated.serialNumber,
          location: updated.location,
          purchase_date: updated.purchaseDate,
          purchase_price_minor: Math.round(updated.purchasePrice * 100),
          store: updated.store,
          notes: updated.notes,
        }).eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase update failed:', err);
      }
    }

    assetsList.value[index] = updated;
    saveAssetsToLocal();
    return updated;
  },

  /**
   * Delete asset record
   */
  async deleteAsset(id) {
    if (hasSupabaseConfig && supabase) {
      try {
        const { error } = await supabase.from('assets').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase delete failed:', err);
      }
    }

    assetsList.value = assetsList.value.filter(a => a.id !== id);
    saveAssetsToLocal();
    return true;
  },

  /**
   * Archive asset record
   */
  async archiveAsset(id) {
    return this.updateAsset(id, { archived_at: new Date().toISOString() });
  },

  getCategoryLabel(category) {
    const map = {
      power: 'Power & Inverters',
      cooling: 'Cooling & HVAC',
      kitchen: 'Kitchen & Refrigeration',
      electronics: 'Entertainment & Tech',
      laundry: 'Home Appliances',
      other: 'Other Household Items',
    };
    return map[category] || 'Other Household Items';
  },
};
