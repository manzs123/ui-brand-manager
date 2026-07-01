import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { ButtonStyles, ButtonDarkColors, InputStyles, InputDarkColors, HeaderPaymentStyles, HeaderBackofficeStyles, CardStyles, CardDarkColors, LinkStyles, LinkDarkColors, DialogStyles, DialogDarkColors, NavMenuStyles, NavMenuDarkColors } from '../types/brand';
import { useBrands } from '../context/BrandsContext';
import s from './BrandEditor.module.css';

/* ---- Accordion ---- */
function Section({ title, defaultOpen = true, children }: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={s.accordionSection}>
      <button className={s.accordionHeader} onClick={() => setOpen(o => !o)}>
        <span className={s.sectionTitle}>{title}</span>
        <svg className={`${s.chevron} ${open ? s.chevronOpen : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <div className={s.accordionBody}>{children}</div>}
    </div>
  );
}

/* ---- Color input ---- */
function ColorInput({ value, onChange, primaryColor, disabled }: {
  value: string;
  onChange: (v: string) => void;
  primaryColor?: string;
  disabled?: boolean;
}) {
  const isPrimary = value === '{primary}';
  const resolved = isPrimary && primaryColor ? primaryColor : value;
  return (
    <div className={s.colorRow}>
      <input
        type="color"
        value={resolved.startsWith('#') ? resolved : '#000000'}
        onChange={e => onChange(e.target.value)}
        className={s.colorPicker}
        disabled={disabled}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.colorText}
        spellCheck={false}
        disabled={disabled}
      />
    </div>
  );
}

/* ---- Paired color field (light + dark, chip at label) ---- */
function PairedColor({ label, light, dark, onLight, onDark, primaryColor, primaryColorDark }: {
  label: string;
  light: string;
  dark: string;
  onLight: (v: string) => void;
  onDark: (v: string) => void;
  primaryColor?: string;
  primaryColorDark?: string;
}) {
  const bothPrimary = light === '{primary}' && dark === '{primary}';

  const handleChip = () => {
    if (bothPrimary) {
      onLight(primaryColor!);
      onDark(primaryColorDark ?? primaryColor!);
    } else {
      onLight('{primary}');
      onDark('{primary}');
    }
  };

  return (
    <div className={s.field}>
      <div className={s.fieldLabelRow}>
        <span className={s.fieldLabel}>{label}</span>
        {primaryColor && (
          <button
            className={`${s.primaryChip} ${bothPrimary ? s.primaryChipActive : ''}`}
            onClick={handleChip}
          >
            {bothPrimary ? '✕ Primary' : 'Primary'}
          </button>
        )}
      </div>
      <div className={s.pairedRow}>
        <span className={s.modeTag}>Light</span>
        <ColorInput value={light} onChange={onLight} primaryColor={primaryColor} disabled={light === '{primary}'} />
      </div>
      <div className={s.pairedRow}>
        <span className={s.modeTag}>Dark</span>
        <ColorInput value={dark} onChange={onDark} primaryColor={primaryColorDark ?? primaryColor} disabled={dark === '{primary}'} />
      </div>
    </div>
  );
}

/* ---- Group divider ---- */
function GroupDivider({ label }: { label: string }) {
  return (
    <div className={s.groupDivider}>
      <span className={s.groupDividerLabel}>{label}</span>
    </div>
  );
}

/* ---- Plain field ---- */
function Field({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.input}
        spellCheck={false}
      />
    </div>
  );
}

/* ---- Editor ---- */
export function BrandEditor() {
  const { brands, activeBrandId, updateBrand, deleteBrand, saveActiveBrand, resetActiveBrand, isActiveBrandDirty } = useBrands();
  const brand = brands.find(b => b.id === activeBrandId);

  if (!brand) return null;

  const pc  = brand.primaryColor;
  const pcd = brand.primaryColorDark ?? brand.primaryColor;

  const setBtn       = (k: keyof ButtonStyles,          v: string) => updateBrand(brand.id, { button:          { ...brand.button,          [k]: v } });
  const setBtnDark   = (k: keyof ButtonDarkColors,      v: string) => updateBrand(brand.id, { buttonDark:      { ...brand.buttonDark,      [k]: v } });
  const setInp       = (k: keyof InputStyles,           v: string) => updateBrand(brand.id, { input:           { ...brand.input,           [k]: v } });
  const setInpDark   = (k: keyof InputDarkColors,       v: string) => updateBrand(brand.id, { inputDark:       { ...brand.inputDark,       [k]: v } });
  const setHdrPay    = (k: keyof HeaderPaymentStyles,   v: string) => updateBrand(brand.id, { headerPayment:   { ...brand.headerPayment,   [k]: v } });
  const setHdrBack   = (k: keyof HeaderBackofficeStyles,v: string) => updateBrand(brand.id, { headerBackoffice:{ ...brand.headerBackoffice,[k]: v } });
  const setCard      = (k: keyof CardStyles,            v: string) => updateBrand(brand.id, { card:            { ...brand.card,            [k]: v } });
  const setCardDark  = (k: keyof CardDarkColors,        v: string) => updateBrand(brand.id, { cardDark:        { ...brand.cardDark,        [k]: v } });
  const setLink      = (k: keyof LinkStyles,            v: string) => updateBrand(brand.id, { link:            { ...brand.link,            [k]: v } });
  const setLinkDark  = (k: keyof LinkDarkColors,        v: string) => updateBrand(brand.id, { linkDark:        { ...brand.linkDark,        [k]: v } });
  const setDlg       = (k: keyof DialogStyles,          v: string) => updateBrand(brand.id, { dialog:          { ...brand.dialog,          [k]: v } });
  const setDlgDark   = (k: keyof DialogDarkColors,      v: string) => updateBrand(brand.id, { dialogDark:      { ...brand.dialogDark,      [k]: v } });
  const setNav       = (k: keyof NavMenuStyles,         v: string) => updateBrand(brand.id, { navMenu:         { ...brand.navMenu,         [k]: v } });
  const setNavDark   = (k: keyof NavMenuDarkColors,     v: string) => updateBrand(brand.id, { navMenuDark:     { ...brand.navMenuDark,     [k]: v } });

  const DEFAULT_DIALOG_BG      = '#ffffff';
  const DEFAULT_DIALOG_BG_DARK = '#1e1e1e';
  const isDefaultDialogBg = brand.dialog.backgroundColor === DEFAULT_DIALOG_BG && brand.dialogDark.backgroundColor === DEFAULT_DIALOG_BG_DARK;

  const DEFAULT_CARD_BG      = '#ffffff';
  const DEFAULT_CARD_BG_DARK = '#121212';
  const isDefaultCardBg = brand.card.backgroundColor === DEFAULT_CARD_BG && brand.cardDark.backgroundColor === DEFAULT_CARD_BG_DARK;

  const faviconRef        = useRef<HTMLInputElement>(null);
  const hdrPayLogoRef     = useRef<HTMLInputElement>(null);
  const hdrBackLogoRef    = useRef<HTMLInputElement>(null);

  const handleFaviconUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => updateBrand(brand.id, { favicon: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleHdrPayLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => updateBrand(brand.id, { headerPayment: { ...brand.headerPayment, logo: ev.target?.result as string } });
    reader.readAsDataURL(file);
  };

  const handleHdrBackLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => updateBrand(brand.id, { headerBackoffice: { ...brand.headerBackoffice, logo: ev.target?.result as string } });
    reader.readAsDataURL(file);
  };

  return (
    <div className={s.editor}>

      {/* Brand Settings */}
      <Section title="Brand Settings">
        <Field label="Brand Name" value={brand.name} onChange={v => updateBrand(brand.id, { name: v })} />
        <Field label="Font Family" value={brand.fontFamily} onChange={v => updateBrand(brand.id, { fontFamily: v })} />
        <PairedColor
          label="Primary Color"
          light={brand.primaryColor}
          dark={brand.primaryColorDark ?? brand.primaryColor}
          onLight={v => updateBrand(brand.id, { primaryColor: v })}
          onDark={v => updateBrand(brand.id, { primaryColorDark: v })}
        />
        <div className={s.field}>
          <label className={s.fieldLabel}>Logo</label>
          <div className={s.logoPreviewCard}>
            <div className={s.logoPreviewLabel}>Preview</div>
            <div className={s.logoPreviewArea}>
              <div className={s.faviconBox} style={{ background: brand.faviconBackground }}>
                {brand.favicon
                  ? <img src={brand.favicon} alt="logo" className={s.faviconBoxImg} />
                  : <div className={s.faviconBoxEmpty}>–</div>}
              </div>
            </div>
          </div>
          <div className={s.faviconRow}>
            <button className={s.uploadBtn} onClick={() => faviconRef.current?.click()}>Upload</button>
            {brand.favicon && <button className={s.removeBtn} onClick={() => updateBrand(brand.id, { favicon: undefined })}>Remove</button>}
          </div>
          <input ref={faviconRef} type="file" accept="image/*,.ico" className={s.hiddenInput} onChange={handleFaviconUpload} />
        </div>
        <div className={s.field}>
          <label className={s.fieldLabel}>Logo Background</label>
          <ColorInput value={brand.faviconBackground} onChange={v => updateBrand(brand.id, { faviconBackground: v })} />
        </div>
        <div className={s.field}>
          <button className={s.deleteBtn} onClick={() => deleteBrand(brand.id)}>Delete Brand</button>
        </div>
      </Section>

      {/* Button */}
      <Section title="Button" defaultOpen={false}>
        <GroupDivider label="Colors" />
        <PairedColor label="Color"       light={brand.button.backgroundColor}     dark={brand.buttonDark.backgroundColor}     onLight={v => setBtn('backgroundColor', v)}     onDark={v => setBtnDark('backgroundColor', v)}     primaryColor={pc} primaryColorDark={pcd} />
        <PairedColor label="Hover"       light={brand.button.hoverBackgroundColor} dark={brand.buttonDark.hoverBackgroundColor} onLight={v => setBtn('hoverBackgroundColor', v)} onDark={v => setBtnDark('hoverBackgroundColor', v)} primaryColor={pc} primaryColorDark={pcd} />
        <PairedColor label="Text Color"       light={brand.button.color}                dark={brand.buttonDark.color}                onLight={v => setBtn('color', v)}                onDark={v => setBtnDark('color', v)}                primaryColor={pc} primaryColorDark={pcd} />

        <GroupDivider label="Border" />
        <Field label="Border Radius" value={brand.button.borderRadius} onChange={v => setBtn('borderRadius', v)} />
        <Field label="Border Width"  value={brand.button.borderWidth}  onChange={v => setBtn('borderWidth', v)} />

        <GroupDivider label="Spacing" />
        <Field label="Padding X" value={brand.button.paddingX} onChange={v => setBtn('paddingX', v)} />
        <Field label="Padding Y" value={brand.button.paddingY} onChange={v => setBtn('paddingY', v)} />

        <GroupDivider label="Typography" />
        <Field label="Font Size"   value={brand.button.fontSize}   onChange={v => setBtn('fontSize', v)} />
        <Field label="Font Weight" value={brand.button.fontWeight} onChange={v => setBtn('fontWeight', v)} />
        <Field label="Line Height" value={brand.button.lineHeight} onChange={v => setBtn('lineHeight', v)} />

      </Section>

      {/* Input */}
      <Section title="Input / TextField" defaultOpen={false}>
        <GroupDivider label="Colors" />
        <PairedColor label="Active Color" light={brand.input.focusBorderColor} dark={brand.inputDark.focusBorderColor} onLight={v => setInp('focusBorderColor', v)} onDark={v => setInpDark('focusBorderColor', v)} primaryColor={pc} primaryColorDark={pcd} />

        <GroupDivider label="Border" />
        <Field label="Border Width"  value={brand.input.borderWidth}  onChange={v => setInp('borderWidth', v)} />
        <Field label="Border Radius" value={brand.input.borderRadius} onChange={v => setInp('borderRadius', v)} />
        <Field label="Padding X"     value={brand.input.paddingX}     onChange={v => setInp('paddingX', v)} />
        <Field label="Padding Y"     value={brand.input.paddingY}     onChange={v => setInp('paddingY', v)} />
        <Field label="Font Size"     value={brand.input.fontSize}     onChange={v => setInp('fontSize', v)} />
      </Section>

      {/* Default Header */}
      <Section title="Default Header" defaultOpen={false}>
        <GroupDivider label="Logo" />
        <div className={s.field}>
          <label className={s.fieldLabel}>Logo</label>
          <div className={s.faviconRow}>
            {brand.headerPayment.logo
              ? <img src={brand.headerPayment.logo} alt="logo" className={s.faviconPreview} />
              : <div className={s.faviconEmpty}>–</div>}
            <button className={s.uploadBtn} onClick={() => hdrPayLogoRef.current?.click()}>Upload</button>
            {brand.headerPayment.logo && <button className={s.removeBtn} onClick={() => updateBrand(brand.id, { headerPayment: { ...brand.headerPayment, logo: undefined } })}>Remove</button>}
          </div>
          <input ref={hdrPayLogoRef} type="file" accept="image/*" className={s.hiddenInput} onChange={handleHdrPayLogoUpload} />
        </div>
        <GroupDivider label="Colors" />
        <PairedColor
          label="Background"
          light={brand.headerPayment.backgroundColor}
          dark={brand.headerPayment.backgroundColor}
          onLight={v => setHdrPay('backgroundColor', v)}
          onDark={v => setHdrPay('backgroundColor', v)}
          primaryColor={pc} primaryColorDark={pcd}
        />
        <GroupDivider label="Shape" />
        <Field label="Border Radius" value={brand.headerPayment.borderRadius} onChange={v => setHdrPay('borderRadius', v)} />
      </Section>

      {/* Hamburger Header */}
      <Section title="Hamburger Header" defaultOpen={false}>
        <GroupDivider label="Logo" />
        <div className={s.field}>
          <label className={s.fieldLabel}>Logo</label>
          <div className={s.faviconRow}>
            {brand.headerBackoffice.logo
              ? <img src={brand.headerBackoffice.logo} alt="logo" className={s.faviconPreview} />
              : <div className={s.faviconEmpty}>–</div>}
            <button className={s.uploadBtn} onClick={() => hdrBackLogoRef.current?.click()}>Upload</button>
            {brand.headerBackoffice.logo && <button className={s.removeBtn} onClick={() => updateBrand(brand.id, { headerBackoffice: { ...brand.headerBackoffice, logo: undefined } })}>Remove</button>}
          </div>
          <input ref={hdrBackLogoRef} type="file" accept="image/*" className={s.hiddenInput} onChange={handleHdrBackLogoUpload} />
        </div>
        <GroupDivider label="Colors" />
        <PairedColor
          label="Background"
          light={brand.headerBackoffice.backgroundColor}
          dark={brand.headerBackoffice.backgroundColor}
          onLight={v => setHdrBack('backgroundColor', v)}
          onDark={v => setHdrBack('backgroundColor', v)}
          primaryColor={pc} primaryColorDark={pcd}
        />
        <GroupDivider label="Shape" />
        <Field label="Border Radius" value={brand.headerBackoffice.borderRadius} onChange={v => setHdrBack('borderRadius', v)} />
      </Section>

      {/* Link */}
      <Section title="Link" defaultOpen={false}>
        <PairedColor
          label="Color"
          light={brand.link.color}
          dark={brand.linkDark.color}
          onLight={v => setLink('color', v)}
          onDark={v => setLinkDark('color', v)}
          primaryColor={pc}
          primaryColorDark={pcd}
        />
      </Section>

      {/* Card */}
      <Section title="Card" defaultOpen={false}>
        <GroupDivider label="Background" />
        <div className={s.field}>
          <div className={s.fieldLabelRow}>
            <span className={s.fieldLabel}>Background Color</span>
            <button
              className={`${s.primaryChip} ${isDefaultCardBg ? s.primaryChipActive : ''}`}
              onClick={() => { setCard('backgroundColor', DEFAULT_CARD_BG); setCardDark('backgroundColor', DEFAULT_CARD_BG_DARK); }}
            >
              {isDefaultCardBg ? '✓ Default' : 'Default'}
            </button>
          </div>
          <div className={s.pairedRow}>
            <span className={s.modeTag}>Light</span>
            <ColorInput value={brand.card.backgroundColor} onChange={v => setCard('backgroundColor', v)} />
          </div>
          <div className={s.pairedRow}>
            <span className={`${s.modeTag} ${s.modeTagDark}`}>Dark</span>
            <ColorInput value={brand.cardDark.backgroundColor} onChange={v => setCardDark('backgroundColor', v)} />
          </div>
        </div>

        <GroupDivider label="Border" />
        <Field label="Border Radius" value={brand.card.borderRadius} onChange={v => setCard('borderRadius', v)} />
        <Field label="Border Width"  value={brand.card.borderWidth}  onChange={v => setCard('borderWidth', v)} />
        <PairedColor
          label="Border Color"
          light={brand.card.borderColor}
          dark={brand.cardDark.borderColor}
          onLight={v => setCard('borderColor', v)}
          onDark={v => setCardDark('borderColor', v)}
        />

        <GroupDivider label="Spacing" />
        <Field label="Padding X" value={brand.card.paddingX} onChange={v => setCard('paddingX', v)} />
        <Field label="Padding Y" value={brand.card.paddingY} onChange={v => setCard('paddingY', v)} />

        <GroupDivider label="Typography" />
        <PairedColor
          label="Heading Color"
          light={brand.card.headingColor}
          dark={brand.cardDark.headingColor}
          onLight={v => setCard('headingColor', v)}
          onDark={v => setCardDark('headingColor', v)}
        />
        <Field label="Heading Font Size" value={brand.card.headingFontSize} onChange={v => setCard('headingFontSize', v)} />
        <PairedColor
          label="Body Color"
          light={brand.card.bodyColor}
          dark={brand.cardDark.bodyColor}
          onLight={v => setCard('bodyColor', v)}
          onDark={v => setCardDark('bodyColor', v)}
        />
        <Field label="Body Font Size" value={brand.card.bodyFontSize} onChange={v => setCard('bodyFontSize', v)} />
      </Section>

      {/* Dialog */}
      <Section title="Dialog" defaultOpen={false}>
        <GroupDivider label="Background" />
        <div className={s.field}>
          <div className={s.fieldLabelRow}>
            <span className={s.fieldLabel}>Background Color</span>
            <button
              className={`${s.primaryChip} ${isDefaultDialogBg ? s.primaryChipActive : ''}`}
              onClick={() => { setDlg('backgroundColor', DEFAULT_DIALOG_BG); setDlgDark('backgroundColor', DEFAULT_DIALOG_BG_DARK); }}
            >
              {isDefaultDialogBg ? '✓ Default' : 'Default'}
            </button>
          </div>
          <div className={s.pairedRow}>
            <span className={s.modeTag}>Light</span>
            <ColorInput value={brand.dialog.backgroundColor} onChange={v => setDlg('backgroundColor', v)} />
          </div>
          <div className={s.pairedRow}>
            <span className={`${s.modeTag} ${s.modeTagDark}`}>Dark</span>
            <ColorInput value={brand.dialogDark.backgroundColor} onChange={v => setDlgDark('backgroundColor', v)} />
          </div>
        </div>

        <GroupDivider label="Scrim" />
        <div className={s.field}>
          <div className={s.fieldLabelRow}>
            <span className={s.fieldLabel}>Scrim Color</span>
          </div>
          <div className={s.pairedRow}>
            <span className={s.modeTag}>Light</span>
            <input type="text" value={brand.dialog.scrimColor} onChange={e => setDlg('scrimColor', e.target.value)} className={s.input} spellCheck={false} />
          </div>
          <div className={s.pairedRow}>
            <span className={`${s.modeTag} ${s.modeTagDark}`}>Dark</span>
            <input type="text" value={brand.dialogDark.scrimColor} onChange={e => setDlgDark('scrimColor', e.target.value)} className={s.input} spellCheck={false} />
          </div>
        </div>

        <GroupDivider label="Shape" />
        <Field label="Border Radius" value={brand.dialog.borderRadius} onChange={v => setDlg('borderRadius', v)} />

        <GroupDivider label="Spacing" />
        <Field label="Padding X" value={brand.dialog.paddingX} onChange={v => setDlg('paddingX', v)} />
        <Field label="Padding Y" value={brand.dialog.paddingY} onChange={v => setDlg('paddingY', v)} />

        <GroupDivider label="Typography" />
        <PairedColor label="Heading Color" light={brand.dialog.headingColor} dark={brand.dialogDark.headingColor} onLight={v => setDlg('headingColor', v)} onDark={v => setDlgDark('headingColor', v)} />
        <Field label="Heading Font Size" value={brand.dialog.headingFontSize} onChange={v => setDlg('headingFontSize', v)} />
        <PairedColor label="Body Color" light={brand.dialog.bodyColor} dark={brand.dialogDark.bodyColor} onLight={v => setDlg('bodyColor', v)} onDark={v => setDlgDark('bodyColor', v)} />
        <Field label="Body Font Size" value={brand.dialog.bodyFontSize} onChange={v => setDlg('bodyFontSize', v)} />
      </Section>

      {/* Nav Menu */}
      <Section title="Nav Menu" defaultOpen={false}>
        <GroupDivider label="Active Item" />
        <PairedColor
          label="Background"
          light={brand.navMenu.activeBackgroundColor}
          dark={brand.navMenuDark.activeBackgroundColor}
          onLight={v => setNav('activeBackgroundColor', v)}
          onDark={v => setNavDark('activeBackgroundColor', v)}
          primaryColor={pc}
          primaryColorDark={pcd}
        />
        <PairedColor
          label="Text Color"
          light={brand.navMenu.activeTextColor}
          dark={brand.navMenuDark.activeTextColor}
          onLight={v => setNav('activeTextColor', v)}
          onDark={v => setNavDark('activeTextColor', v)}
        />

        <GroupDivider label="Menu" />
        <PairedColor
          label="Background"
          light={brand.navMenu.backgroundColor}
          dark={brand.navMenuDark.backgroundColor}
          onLight={v => setNav('backgroundColor', v)}
          onDark={v => setNavDark('backgroundColor', v)}
        />
        <PairedColor
          label="Text Color"
          light={brand.navMenu.textColor}
          dark={brand.navMenuDark.textColor}
          onLight={v => setNav('textColor', v)}
          onDark={v => setNavDark('textColor', v)}
        />
      </Section>

      {isActiveBrandDirty && (
        <div className={s.saveBar}>
          <span className={s.saveBarDot} />
          <span className={s.saveBarText}>Unsaved changes</span>
          <button className={s.saveBarReset} onClick={resetActiveBrand}>Reset</button>
          <button className={s.saveBarSave} onClick={saveActiveBrand}>Save</button>
        </div>
      )}
    </div>
  );
}
