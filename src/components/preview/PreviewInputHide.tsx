import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import type { InputStyles } from '../../types/brand';

interface Props {
  styles: InputStyles;
  fontFamily?: string;
  dark?: boolean;
  disabled?: boolean;
  label?: string;
}

export function PreviewInputHide({
  styles,
  fontFamily = 'inherit',
  dark = false,
  disabled = false,
  label = 'Password',
}: Props) {
  const [show, setShow] = useState(false);

  const px               = styles.paddingX;
  const borderDefault    = disabled ? (dark ? '#2e2e2e' : '#e9e9e9') : (dark ? '#3c3c3c' : '#e4e4e4');
  const borderHover      = disabled ? borderDefault : (dark ? '#3c3c3c' : '#3D3D3D');
  const borderFocus      = styles.focusBorderColor;
  const placeholderColor = disabled ? (dark ? '#555555' : '#b0b0b0') : (dark ? '#8c8c8c' : '#737373');
  const textColor        = disabled ? (dark ? '#666666' : '#b0b0b0') : (dark ? '#fafafa' : '#3d3d3d');

  return (
    <TextField
      variant="outlined"
      label={label}
      type={show ? 'text' : 'password'}
      fullWidth
      size="small"
      disabled={disabled}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => !disabled && setShow(v => !v)}
                edge="end"
                size="small"
                disableRipple
                disabled={disabled}
                sx={{
                  color: textColor,
                  padding: '4px',
                  '& svg': { fontSize: '20px' },
                  '&:hover': { background: 'transparent' },
                }}
              >
                {show ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiInputLabel-root': {
          color: placeholderColor,
          fontSize: styles.fontSize,
          fontFamily,
          transform: `translate(${px}, 9px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
            color: placeholderColor,
          },
          '&.Mui-focused': { color: placeholderColor },
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: styles.borderRadius,
          backgroundColor: 'transparent',
          fontFamily,
          opacity: disabled ? 0.6 : 1,
          '& fieldset': {
            borderColor: borderDefault,
            borderWidth: styles.borderWidth,
          },
          '&:hover fieldset': { borderColor: borderHover },
          '&.Mui-focused fieldset': {
            borderColor: borderFocus,
            borderWidth: styles.borderWidth,
          },
          '&.Mui-disabled fieldset': { borderColor: borderDefault },
        },
        '& .MuiInputBase-input': {
          paddingLeft: styles.paddingX,
          color: textColor,
          fontSize: styles.fontSize,
          fontFamily,
          '-webkit-text-fill-color': `${textColor} !important`,
        },
        '& .MuiInputLabel-root.Mui-disabled': { color: placeholderColor },
      }}
    />
  );
}
