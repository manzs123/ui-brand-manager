import { useState } from 'react';
import Button from '@mui/material/Button';
import type { DialogStyles, ButtonStyles, InputStyles } from '../../types/brand';
import { PreviewButton } from './PreviewButton';
import { PreviewInput } from './PreviewInput';

function TertiaryNegative({ label, fontFamily, buttonStyles, dark = false, onClick }: {
  label: string;
  fontFamily: string;
  buttonStyles: ButtonStyles;
  dark?: boolean;
  onClick?: () => void;
}) {
  const bg    = dark ? '#3a3a3a' : '#eceff1';
  const hover = dark ? '#282828' : '#bdbdbd';
  const color = dark ? '#d9d9d9' : '#3d3d3d';

  return (
    <Button
      onClick={onClick}
      disableRipple
      sx={{
        background: bg,
        color,
        borderRadius: buttonStyles.borderRadius,
        border: 'none',
        fontWeight: buttonStyles.fontWeight,
        fontSize: buttonStyles.fontSize,
        lineHeight: buttonStyles.lineHeight,
        textTransform: 'none',
        boxShadow: 'none',
        fontFamily,
        px: buttonStyles.paddingX,
        py: buttonStyles.paddingY,
        '&:hover': { background: hover, boxShadow: 'none' },
      }}
    >
      {label}
    </Button>
  );
}

interface Props {
  dialogStyles: DialogStyles;
  buttonStyles: ButtonStyles;
  inputStyles: InputStyles;
  fontFamily: string;
  dark?: boolean;
}

export function PreviewDialog({ dialogStyles, buttonStyles, inputStyles, fontFamily, dark = false }: Props) {
  const [open, setOpen] = useState(false);

  const pageBg      = dark ? '#121212' : '#f3f4f6';
  const pageText    = dark ? '#9ca3af' : '#9ca3af';
  const triggerBg   = dark ? '#2a2a2a' : '#ffffff';
  const triggerBorder = dark ? '#3c3c3c' : '#d1d5db';
  const triggerColor  = dark ? '#f1f5f9' : '#374151';

  return (
    <div style={{ position: 'relative', height: 300, background: pageBg, borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>

      {/* Simulated page bg lines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
        {[60, 80, 45, 70, 50].map((w, i) => (
          <div key={i} style={{ height: 8, width: `${w}%`, borderRadius: 4, background: dark ? '#2a2a2a' : '#e5e7eb' }} />
        ))}
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{ position: 'relative', zIndex: 1, padding: '8px 18px', background: triggerBg, border: `1px solid ${triggerBorder}`, borderRadius: 6, fontSize: 13, fontWeight: 600, color: triggerColor, fontFamily, cursor: 'pointer' }}
      >
        Open Dialog
      </button>
      <span style={{ position: 'relative', zIndex: 1, fontSize: 11, color: pageText, fontFamily }}>Click to preview</span>

      {/* Scrim */}
      {open && (
        <div
          style={{ position: 'absolute', inset: 0, background: dialogStyles.scrimColor, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setOpen(false)}
        >
          {/* Dialog box */}
          <div
            style={{ background: dialogStyles.backgroundColor, borderRadius: dialogStyles.borderRadius, padding: `${dialogStyles.paddingY} ${dialogStyles.paddingX}`, width: '100%', maxWidth: 400, boxSizing: 'border-box', fontFamily }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ margin: '0 0 4px', fontSize: dialogStyles.headingFontSize, fontWeight: 700, color: dialogStyles.headingColor, lineHeight: 1.3 }}>
              New Project
            </p>
            <p style={{ margin: '0 0 16px', fontSize: dialogStyles.bodyFontSize, color: dialogStyles.bodyColor }}>
              Fill in the details to set up your project.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <PreviewInput styles={inputStyles} fontFamily={fontFamily} dark={dark} label="Project name" />
              <PreviewInput styles={inputStyles} fontFamily={fontFamily} dark={dark} label="Workspace" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <TertiaryNegative label="Cancel" fontFamily={fontFamily} buttonStyles={buttonStyles} dark={dark} onClick={() => setOpen(false)} />
              <PreviewButton styles={buttonStyles} fontFamily={fontFamily} variant="contained" label="Create" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
