import { useBrands } from '../context/BrandsContext';
import styles from './BrandTabs.module.css';

export function BrandTabs() {
  const { brands, activeBrandId, setActiveBrandId, addBrand } = useBrands();

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabList}>
        {brands.map(brand => (
          <button
            key={brand.id}
            className={`${styles.tab} ${brand.id === activeBrandId ? styles.active : ''}`}
            onClick={() => setActiveBrandId(brand.id)}
            title={brand.name}
          >
            {brand.favicon ? (
              <img src={brand.favicon} alt="" className={styles.tabFavicon} />
            ) : (
              <span
                className={styles.tabDot}
                style={{ background: brand.primaryColor }}
              />
            )}
            <span className={styles.tabLabel}>{brand.name}</span>
          </button>
        ))}
      </div>
      <button className={styles.addBtn} onClick={addBrand} title="Add new brand">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>New Brand</span>
      </button>
    </div>
  );
}
