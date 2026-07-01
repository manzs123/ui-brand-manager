import type { Brand } from '../types/brand';
import { nanoid } from 'nanoid';

const BTN_EXTRA = { lineHeight: '1.25' };

const HEADER_DEFAULTS = {
  headerPayment:    { backgroundColor: '{primary}', borderRadius: '0px' },
  headerBackoffice: { backgroundColor: '{primary}', borderRadius: '6px' },
};

const CARD_DEFAULTS = {
  card:     { borderRadius: '8px', borderWidth: '1px', borderColor: '#e5e7eb', backgroundColor: '#ffffff', paddingX: '24px', paddingY: '24px', headingColor: '#111827', headingFontSize: '20px', bodyColor: '#6b7280', bodyFontSize: '13px' },
  cardDark: { backgroundColor: '#121212', borderColor: '#2d2d2d', headingColor: '#f1f5f9', bodyColor: '#9ca3af' },
};

function makeInput(focusColor: string, radius: string): Brand['input'] {
  return {
    borderRadius: radius, paddingX: '12px', paddingY: '8px',
    color: '#111827', backgroundColor: '#ffffff',
    borderColor: '#d1d5db', borderWidth: '1px',
    focusBorderColor: focusColor, fontSize: '14px', placeholderColor: '#9ca3af',
  };
}

function makeInputDark(focusColor: string): Brand['inputDark'] {
  return {
    color: '#f1f5f9', backgroundColor: '#1e1e1e',
    placeholderColor: '#71717a', borderColor: '#3f3f46', focusBorderColor: focusColor,
  };
}

function makeButtonDark(bg: string, hover: string): Brand['buttonDark'] {
  return { color: '#ffffff', backgroundColor: bg, hoverBackgroundColor: hover, borderColor: bg };
}

export const DEFAULT_BRANDS: Brand[] = [
  { id: nanoid(), name: 'Manu Brand',  primaryColor: '#92400e', primaryColorDark: '#b45309',
    fontFamily: 'system-ui, -apple-system, sans-serif', faviconBackground: '#ffffff',
    button:     { ...BTN_EXTRA, borderRadius: '6px',    paddingX: '20px', paddingY: '10px', color: '#ffffff', backgroundColor: '#92400e', hoverBackgroundColor: '#78350f', fontSize: '14px', fontWeight: '600', borderColor: '#92400e', borderWidth: '1px' },
    buttonDark: makeButtonDark('#b45309', '#92400e'),
    input:      makeInput('#92400e', '6px'),
    inputDark:  makeInputDark('#b45309'), ...HEADER_DEFAULTS, ...CARD_DEFAULTS,
    link: { color: '{primary}' }, linkDark: { color: '{primary}' },
    dialog:     { borderRadius: '12px', backgroundColor: '#ffffff', paddingX: '24px', paddingY: '24px', headingColor: '#111827', headingFontSize: '18px', bodyColor: '#6b7280', bodyFontSize: '14px', scrimColor: 'rgba(0,0,0,0.5)' },
    dialogDark: { backgroundColor: '#1e1e1e', headingColor: '#f1f5f9', bodyColor: '#9ca3af', scrimColor: 'rgba(0,0,0,0.7)' },
    navMenu:     { activeBackgroundColor: '{primary}', activeTextColor: '#ffffff', textColor: '#374151', backgroundColor: '#ffffff' },
    navMenuDark: { activeBackgroundColor: '{primary}', activeTextColor: '#ffffff', textColor: '#e5e7eb',  backgroundColor: '#1a1a1a' } },

];
