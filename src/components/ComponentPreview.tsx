import { useBrands } from '../context/BrandsContext';
import { PreviewButton } from './preview/PreviewButton';
import { PreviewInput } from './preview/PreviewInput';
import { PreviewHeaderPayment } from './preview/PreviewHeaderPayment';
import { PreviewHeaderBackoffice } from './preview/PreviewHeaderBackoffice';
import { PreviewCard } from './preview/PreviewCard';
import { PreviewInputHide } from './preview/PreviewInputHide';
import { PreviewLink } from './preview/PreviewLink';
import { PreviewDialog } from './preview/PreviewDialog';
import { PreviewNavMenu } from './preview/PreviewNavMenu';
import type { ButtonStyles, InputStyles, NavMenuStyles } from '../types/brand';
import styles from './ComponentPreview.module.css';

function resolve<T extends object>(obj: T, primary: string): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === '{primary}' ? primary : v])
  ) as T;
}

export function ComponentPreview() {
  const { brands, activeBrandId } = useBrands();
  const brand = brands.find(b => b.id === activeBrandId);

  if (!brand) return null;

  const darkPrimary   = brand.primaryColorDark ?? brand.primaryColor;
  const hdrPayBg      = brand.headerPayment.backgroundColor    === '{primary}' ? brand.primaryColor : brand.headerPayment.backgroundColor;
  const hdrBackBg     = brand.headerBackoffice.backgroundColor === '{primary}' ? brand.primaryColor : brand.headerBackoffice.backgroundColor;
  const btn     = resolve<ButtonStyles>(brand.button, brand.primaryColor);
  // Merge structural props from button + color overrides from buttonDark so
  // border radius, padding, font etc. stay in sync across all dark variants.
  const btnDark = resolve<ButtonStyles>(
    { ...brand.button, ...brand.buttonDark } as ButtonStyles,
    darkPrimary
  );
  const inp     = resolve<InputStyles>(brand.input,     brand.primaryColor);
  const inpDark = resolve<InputStyles>({ ...brand.input, ...brand.inputDark } as InputStyles, darkPrimary);
  const linkColor     = brand.link.color     === '{primary}' ? brand.primaryColor : brand.link.color;
  const linkDarkColor = brand.linkDark.color === '{primary}' ? darkPrimary        : brand.linkDark.color;
  const navStyles     = resolve<NavMenuStyles>(brand.navMenu,     brand.primaryColor);
  const navDarkStyles = resolve<NavMenuStyles>({ ...brand.navMenu, ...brand.navMenuDark } as NavMenuStyles, darkPrimary);

  return (
    <div className={styles.wrapper}>

      {/* Header */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Header</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
            <p className={styles.cardLabel}>Payment</p>
            <PreviewHeaderPayment
              backgroundColor={hdrPayBg}
              borderRadius={brand.headerPayment.borderRadius}
              fontFamily={brand.fontFamily}
              logo={brand.headerPayment.logo}
            />
          </div>
          <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
            <p className={styles.cardLabel}>Backoffice</p>
            <PreviewHeaderBackoffice
              backgroundColor={hdrBackBg}
              borderRadius={brand.headerBackoffice.borderRadius}
              fontFamily={brand.fontFamily}
              name={brand.name}
              logo={brand.headerBackoffice.logo}
            />
          </div>
        </div>
      </div>

      {/* Primary Button */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Primary Button</span>
        </div>
        <div className={styles.canvas}>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Default</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="contained" label="Submit" />
          </div>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Short label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="contained" label="OK" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Fill label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="contained" label="Subscribe to Newsletter" />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewButton styles={btnDark} fontFamily={brand.fontFamily} variant="contained" label="Submit" />
          </div>
          <div className={styles.card} style={{ background: brand.primaryColor + '18' }}>
            <p className={styles.cardLabel}>Brand tint</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="contained" label="Get Started" />
          </div>
        </div>
      </div>

      {/* Secondary Button */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Secondary Button</span>
        </div>
        <div className={styles.canvas}>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Default</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="outlined" label="Submit" />
          </div>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Short label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="outlined" label="OK" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Fill label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="outlined" label="Subscribe to Newsletter" />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewButton styles={btnDark} fontFamily={brand.fontFamily} variant="outlined" label="Submit" />
          </div>
          <div className={styles.card} style={{ background: brand.primaryColor + '18' }}>
            <p className={styles.cardLabel}>Brand tint</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="outlined" label="Get Started" />
          </div>
        </div>
      </div>

      {/* Text Button */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Text Button</span>
        </div>
        <div className={styles.canvas}>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Default</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="text" label="Submit" />
          </div>
          <div className={`${styles.card} ${styles.cardHug}`}>
            <p className={styles.cardLabel}>Short label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="text" label="OK" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Fill label</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="text" label="Subscribe to Newsletter" />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewButton styles={btnDark} fontFamily={brand.fontFamily} variant="text" dark label="Submit" />
          </div>
          <div className={styles.card} style={{ background: brand.primaryColor + '18' }}>
            <p className={styles.cardLabel}>Brand tint</p>
            <PreviewButton styles={btn} fontFamily={brand.fontFamily} variant="text" label="Get Started" />
          </div>
        </div>
      </div>

      {/* Input Default */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Input Default</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Default</p>
            <PreviewInput styles={inp} fontFamily={brand.fontFamily} label="Email address" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Filled</p>
            <PreviewInput styles={inp} fontFamily={brand.fontFamily} label="Full name" defaultValue="John Doe" />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewInput styles={inpDark} fontFamily={brand.fontFamily} dark label="Email address" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Disabled</p>
            <PreviewInput styles={inp} fontFamily={brand.fontFamily} label="Email address" defaultValue="locked@example.com" disabled />
          </div>
        </div>
      </div>

      {/* Input Hide */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Input Hide</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Default</p>
            <PreviewInputHide styles={inp} fontFamily={brand.fontFamily} label="Password" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Visible</p>
            <PreviewInputHide styles={inp} fontFamily={brand.fontFamily} label="Password" />
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Disabled</p>
            <PreviewInputHide styles={inp} fontFamily={brand.fontFamily} label="Password" disabled />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewInputHide styles={inpDark} fontFamily={brand.fontFamily} dark label="Password" />
          </div>
          <div className={styles.card} style={{ background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark disabled</p>
            <PreviewInputHide styles={inpDark} fontFamily={brand.fontFamily} dark disabled label="Password" />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Links</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card} style={{ gridColumn: 'span 3' }}>
            <p className={styles.cardLabel}>Light</p>
            <PreviewLink color={linkColor} fontFamily={brand.fontFamily} />
          </div>
          <div className={styles.card} style={{ gridColumn: 'span 3', background: '#121212' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewLink color={linkDarkColor} fontFamily={brand.fontFamily} dark />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Card</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card} style={{ gridColumn: 'span 3', alignItems: 'center' }}>
            <p className={styles.cardLabel}>Light</p>
            <PreviewCard
              cardStyles={brand.card}
              buttonStyles={btn}
              inputStyles={inp}
              fontFamily={brand.fontFamily}
              linkColor={linkColor}
            />
          </div>
          <div className={styles.card} style={{ gridColumn: 'span 3', alignItems: 'center', background: '#1a1a1a' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewCard
              cardStyles={{ ...brand.card, ...brand.cardDark }}
              buttonStyles={btnDark}
              inputStyles={inpDark}
              fontFamily={brand.fontFamily}
              linkColor={linkDarkColor}
              dark
            />
          </div>
        </div>
      </div>

      {/* Dialog */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Dialog</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card} style={{ gridColumn: 'span 3' }}>
            <p className={styles.cardLabel}>Light</p>
            <PreviewDialog
              dialogStyles={brand.dialog}
              buttonStyles={btn}
              inputStyles={inp}
              fontFamily={brand.fontFamily}
            />
          </div>
          <div className={styles.card} style={{ gridColumn: 'span 3' }}>
            <p className={styles.cardLabel}>Dark mode</p>
            <PreviewDialog
              dialogStyles={{ ...brand.dialog, ...brand.dialogDark }}
              buttonStyles={btnDark}
              inputStyles={inpDark}
              fontFamily={brand.fontFamily}
              dark
            />
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.tag}>Nav Menu</span>
        </div>
        <div className={styles.canvas}>
          <div className={styles.card} style={{ gridColumn: 'span 1' }}>
            <p className={styles.cardLabel}>Light</p>
            <PreviewNavMenu navStyles={navStyles} fontFamily={brand.fontFamily} />
          </div>
          <div className={styles.card} style={{ gridColumn: 'span 1', background: '#1a1a1a' }}>
            <p className={styles.cardLabel} style={{ color: '#6b7280' }}>Dark mode</p>
            <PreviewNavMenu navStyles={navDarkStyles} fontFamily={brand.fontFamily} dark />
          </div>
        </div>
      </div>

    </div>
  );
}
