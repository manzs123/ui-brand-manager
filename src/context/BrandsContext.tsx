import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Brand } from '../types/brand';
import { DEFAULT_BRANDS } from '../data/defaultBrands';
import { nanoid } from 'nanoid';

interface BrandsContextValue {
  brands: Brand[];
  activeBrandId: string;
  setActiveBrandId: (id: string) => void;
  addBrand: () => void;
  updateBrand: (id: string, partial: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  saveActiveBrand: () => void;
  resetActiveBrand: () => void;
  isActiveBrandDirty: boolean;
  exportBrands: (subset?: Brand[]) => void;
  importBrands: (file: File) => void;
}

const BrandsContext = createContext<BrandsContextValue | null>(null);

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val));
}

const NEW_BRAND_DEFAULTS = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  faviconBackground: '#ffffff',
  button: {
    borderRadius: '6px',
    paddingX: '20px',
    paddingY: '10px',
    color: '#ffffff',
    backgroundColor: '#92400e',
    hoverBackgroundColor: '#78350f',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.25',
    borderColor: '#92400e',
    borderWidth: '1px',
  },
  input: {
    borderRadius: '6px',
    paddingX: '12px',
    paddingY: '8px',
    color: '#111827',
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: '1px',
    focusBorderColor: '#92400e',
    fontSize: '14px',
    placeholderColor: '#9ca3af',
  },
  buttonDark: {
    color: '#ffffff',
    backgroundColor: '#b45309',
    hoverBackgroundColor: '#92400e',
    borderColor: '#b45309',
  },
  inputDark: {
    color: '#f1f5f9',
    backgroundColor: '#1e1e1e',
    placeholderColor: '#71717a',
    borderColor: '#3f3f46',
    focusBorderColor: '#b45309',
  },
  headerPayment:    { backgroundColor: '{primary}', borderRadius: '0px' },
  headerBackoffice: { backgroundColor: '{primary}', borderRadius: '6px' },
  card:     { borderRadius: '8px', borderWidth: '1px', borderColor: '#e5e7eb', backgroundColor: '#ffffff', paddingX: '24px', paddingY: '24px', headingColor: '#111827', headingFontSize: '20px', bodyColor: '#6b7280', bodyFontSize: '13px' },
  cardDark: { backgroundColor: '#121212', borderColor: '#2d2d2d', headingColor: '#f1f5f9', bodyColor: '#9ca3af' },
  link:     { color: '{primary}' },
  linkDark: { color: '{primary}' },
  dialog:     { borderRadius: '12px', backgroundColor: '#ffffff', paddingX: '24px', paddingY: '24px', headingColor: '#111827', headingFontSize: '18px', bodyColor: '#6b7280', bodyFontSize: '14px', scrimColor: 'rgba(0,0,0,0.5)' },
  dialogDark: { backgroundColor: '#1e1e1e', headingColor: '#f1f5f9', bodyColor: '#9ca3af', scrimColor: 'rgba(0,0,0,0.7)' },
  navMenu:     { activeBackgroundColor: '{primary}', activeTextColor: '#ffffff', textColor: '#374151', backgroundColor: '#ffffff' },
  navMenuDark: { activeBackgroundColor: '{primary}', activeTextColor: '#ffffff', textColor: '#e5e7eb',  backgroundColor: '#1a1a1a' },
};

const STORAGE_KEY        = 'brand-manager-brands';
const STORAGE_SAVED_KEY  = 'brand-manager-saved';
const STORAGE_ACTIVE_KEY = 'brand-manager-active';

function loadBrands(): Brand[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BRANDS;
    const parsed: Brand[] = JSON.parse(raw);
    // Merge with defaults so new fields added after save get populated
    return parsed.map(b => ({ ...deepClone(NEW_BRAND_DEFAULTS), ...b } as Brand));
  } catch {
    return DEFAULT_BRANDS;
  }
}

function loadSaved(): Brand[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_KEY);
    if (!raw) return deepClone(DEFAULT_BRANDS);
    const parsed: Brand[] = JSON.parse(raw);
    return parsed.map(b => ({ ...deepClone(NEW_BRAND_DEFAULTS), ...b } as Brand));
  } catch {
    return deepClone(DEFAULT_BRANDS);
  }
}

export function BrandsProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>(loadBrands);
  const [activeBrandId, setActiveBrandId] = useState<string>(
    () => localStorage.getItem(STORAGE_ACTIVE_KEY) ?? loadBrands()[0]?.id ?? DEFAULT_BRANDS[0].id
  );
  const [savedBrands, setSavedBrands] = useState<Brand[]>(loadSaved);

  useEffect(() => { localStorage.setItem(STORAGE_KEY,        JSON.stringify(brands));      }, [brands]);
  useEffect(() => { localStorage.setItem(STORAGE_SAVED_KEY,  JSON.stringify(savedBrands)); }, [savedBrands]);
  useEffect(() => { localStorage.setItem(STORAGE_ACTIVE_KEY, activeBrandId);               }, [activeBrandId]);

  const addBrand = () => {
    const newBrand: Brand = {
      id: nanoid(),
      name: 'New Brand',
      primaryColor: '#92400e',
      primaryColorDark: '#b45309',
      ...deepClone(NEW_BRAND_DEFAULTS),
    };
    setBrands(prev => [...prev, newBrand]);
    setSavedBrands(prev => [...prev, deepClone(newBrand)]);
    setActiveBrandId(newBrand.id);
  };

  const updateBrand = (id: string, partial: Partial<Brand>) => {
    setBrands(prev =>
      prev.map(b => (b.id === id ? { ...b, ...partial } : b))
    );
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => {
      const next = prev.filter(b => b.id !== id);
      if (activeBrandId === id && next.length > 0) setActiveBrandId(next[0].id);
      return next;
    });
    setSavedBrands(prev => prev.filter(b => b.id !== id));
  };

  const saveActiveBrand = () => {
    const current = brands.find(b => b.id === activeBrandId);
    if (!current) return;
    setSavedBrands(prev =>
      prev.map(b => (b.id === activeBrandId ? deepClone(current) : b))
    );
  };

  const resetActiveBrand = () => {
    const saved = savedBrands.find(b => b.id === activeBrandId);
    if (!saved) return;
    setBrands(prev =>
      prev.map(b => (b.id === activeBrandId ? deepClone(saved) : b))
    );
  };

  const exportBrands = (subset?: Brand[]) => {
    const json = JSON.stringify(subset ?? brands, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'brands.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBrands = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        const list: Brand[] = Array.isArray(parsed) ? parsed : [parsed];
        const incoming = list.map(b => ({
          ...deepClone(NEW_BRAND_DEFAULTS),
          ...b,
          id: nanoid(),
        })) as Brand[];
        setBrands(prev => [...prev, ...incoming]);
        setSavedBrands(prev => [...prev, ...deepClone(incoming)]);
        setActiveBrandId(incoming[0].id);
      } catch {
        // invalid file — silently ignore
      }
    };
    reader.readAsText(file);
  };

  const isActiveBrandDirty =
    JSON.stringify(brands.find(b => b.id === activeBrandId)) !==
    JSON.stringify(savedBrands.find(b => b.id === activeBrandId));

  return (
    <BrandsContext.Provider
      value={{
        brands, activeBrandId, setActiveBrandId,
        addBrand, updateBrand, deleteBrand,
        saveActiveBrand, resetActiveBrand, isActiveBrandDirty,
        exportBrands, importBrands,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
}

export function useBrands() {
  const ctx = useContext(BrandsContext);
  if (!ctx) throw new Error('useBrands must be used inside BrandsProvider');
  return ctx;
}
