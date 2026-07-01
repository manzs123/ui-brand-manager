import { useState } from 'react';
import { useBrands } from '../context/BrandsContext';
import styles from './CSSPreview.module.css';

function camelToLabel(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

function ValueDisplay({ value }: { value: string }) {
  const isHex = /^#([0-9a-fA-F]{3,8})$/.test(value);
  return (
    <span className={styles.tokenVal}>
      {isHex && <span className={styles.colorDot} style={{ background: value }} />}
      {value}
    </span>
  );
}

function MergedTokenGroup({
  label,
  light,
  dark,
  defaultOpen = true,
}: {
  label: string;
  light: Record<string, string>;
  dark?: Record<string, string>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const lightKeys = Object.keys(light);
  const darkOnlyKeys = dark ? Object.keys(dark).filter(k => !(k in light)) : [];
  const allKeys = [...lightKeys, ...darkOnlyKeys];

  return (
    <div className={styles.tokenGroup}>
      <button className={styles.groupLabel} onClick={() => setOpen(o => !o)}>
        <span>{label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && allKeys.map(k => {
        const lv = light[k];
        const dv = dark?.[k];

        if (!dark || dv === undefined || dv === lv) {
          return (
            <div key={k} className={styles.tokenRow}>
              <span className={styles.tokenKey}>{camelToLabel(k)}</span>
              <ValueDisplay value={lv ?? dv ?? ''} />
            </div>
          );
        }

        return (
          <div key={k} className={styles.pairedTokenRow}>
            <span className={styles.tokenKey}>{camelToLabel(k)}</span>
            <div className={styles.pairedValues}>
              <div className={styles.pairedValueItem}>
                <span className={`${styles.modeBadge} ${styles.modeBadgeLight}`}>L</span>
                <ValueDisplay value={lv} />
              </div>
              <div className={styles.pairedValueItem}>
                <span className={`${styles.modeBadge} ${styles.modeBadgeDark}`}>D</span>
                <ValueDisplay value={dv} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function resolve(obj: Record<string, string>, primary: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === '{primary}' ? primary : v])
  );
}

export function CSSPreview({ mobile = false }: { mobile?: boolean }) {
  const { brands, activeBrandId } = useBrands();
  const brand = brands.find(b => b.id === activeBrandId);

  if (!brand) return null;

  const pc  = brand.primaryColor;
  const pcd = brand.primaryColorDark ?? brand.primaryColor;

  const brandLight = resolve({ fontFamily: brand.fontFamily, primaryColor: brand.primaryColor }, pc);
  const brandDark  = resolve({ primaryColor: brand.primaryColorDark ?? brand.primaryColor }, pcd);

  const mergedButton     = resolve({ ...brand.button }     as Record<string, string>, pc);
  const mergedButtonDark = resolve({ ...brand.buttonDark } as Record<string, string>, pcd);
  const mergedInput      = resolve({ ...brand.input }      as Record<string, string>, pc);
  const mergedInputDark  = resolve({ ...brand.inputDark }  as Record<string, string>, pcd);

  return (
    <div className={`${styles.panel}${mobile ? ` ${styles.panelMobile}` : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>Props Panel</span>
      </div>

      <div className={styles.body}>
        <MergedTokenGroup label="Brand" light={brandLight} dark={brandDark} />
        <MergedTokenGroup label="Button" light={mergedButton} dark={mergedButtonDark} defaultOpen={false} />
        <MergedTokenGroup label="Input" light={mergedInput} dark={mergedInputDark} defaultOpen={false} />
        <MergedTokenGroup label="Link" light={resolve(brand.link as Record<string, string>, pc)} dark={resolve(brand.linkDark as Record<string, string>, pcd)} defaultOpen={false} />
        <MergedTokenGroup label="Card" light={brand.card as Record<string, string>} dark={brand.cardDark as Record<string, string>} defaultOpen={false} />
        <MergedTokenGroup label="Dialog" light={brand.dialog as Record<string, string>} dark={brand.dialogDark as Record<string, string>} defaultOpen={false} />
        <MergedTokenGroup label="Nav Menu" light={resolve(brand.navMenu as Record<string, string>, pc)} dark={resolve(brand.navMenuDark as Record<string, string>, pcd)} defaultOpen={false} />
        <MergedTokenGroup label="Header — Payment" light={resolve(brand.headerPayment as Record<string, string>, pc)} defaultOpen={false} />
        <MergedTokenGroup label="Header — Backoffice" light={resolve(brand.headerBackoffice as Record<string, string>, pc)} defaultOpen={false} />
      </div>
    </div>
  );
}
