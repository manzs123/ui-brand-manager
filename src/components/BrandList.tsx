import { useRef, useState } from 'react';
import { useBrands } from '../context/BrandsContext';
import styles from './BrandList.module.css';

export function BrandList() {
  const { brands, activeBrandId, setActiveBrandId, addBrand, exportBrands, importBrands } = useBrands();
  const importRef = useRef<HTMLInputElement>(null);

  const [showExport, setShowExport] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const openExport = () => {
    setSelectedIds(new Set(brands.map(b => b.id)));
    setShowExport(true);
  };

  const toggle = (id: string) =>
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allSelected = brands.length > 0 && brands.every(b => selectedIds.has(b.id));

  const toggleAll = () =>
    setSelectedIds(allSelected ? new Set() : new Set(brands.map(b => b.id)));

  const handleExport = () => {
    const subset = brands.filter(b => selectedIds.has(b.id));
    if (subset.length === 0) return;
    exportBrands(subset);
    setShowExport(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{showExport ? 'Export' : 'Brands'}</span>
        {!showExport && (
          <button className={styles.addBtn} onClick={addBrand} title="Add brand">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {showExport ? (
        <>
          <div className={styles.exportMeta}>
            <button className={styles.selectAllBtn} onClick={toggleAll}>
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
            <span className={styles.exportCount}>{selectedIds.size} selected</span>
          </div>
          <div className={styles.exportList}>
            {brands.map(brand => (
              <label key={brand.id} className={styles.exportItem}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(brand.id)}
                  onChange={() => toggle(brand.id)}
                  className={styles.exportCheck}
                />
                <span className={styles.exportName}>{brand.name}</span>
              </label>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.list}>
          {brands.map(brand => (
            <button
              key={brand.id}
              className={`${styles.item} ${brand.id === activeBrandId ? styles.active : ''}`}
              onClick={() => setActiveBrandId(brand.id)}
            >
              <span className={styles.name}>{brand.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {showExport ? (
          <>
            <button className={styles.footerBtn} onClick={() => setShowExport(false)}>Cancel</button>
            <button
              className={`${styles.footerBtn} ${styles.footerBtnPrimary}`}
              onClick={handleExport}
              disabled={selectedIds.size === 0}
            >
              Export {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
            </button>
          </>
        ) : (
          <>
            <button className={styles.footerBtn} onClick={() => importRef.current?.click()}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Import
            </button>
            <button className={styles.footerBtn} onClick={openExport}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export
            </button>
          </>
        )}
        <input
          ref={importRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) { importBrands(file); e.target.value = ''; }
          }}
        />
      </div>
    </div>
  );
}
