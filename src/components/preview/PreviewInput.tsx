import TextField from '@mui/material/TextField';
import type { InputStyles } from '../../types/brand';

interface Props {
  styles: InputStyles;
  fontFamily?: string;
  dark?: boolean;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export function PreviewInput({
  styles,
  fontFamily = 'inherit',
  dark = false,
  label = 'Label',
  defaultValue,
  disabled = false,
}: Props) {
  const px = styles.paddingX;

  const borderDefault    = dark ? '#3c3c3c' : '#e4e4e4';
  const borderHover      = dark ? '#3c3c3c' : '#3D3D3D';
  const borderFocus      = styles.focusBorderColor;
  const placeholderColor = dark ? '#8c8c8c' : '#737373';
  const textColor        = dark ? '#fafafa' : '#3d3d3d';

  return (
    <TextField
      variant="outlined"
      label={label}
      defaultValue={defaultValue}
      disabled={disabled}
      fullWidth
      size="small"
      sx={{
        opacity: disabled ? 0.5 : 1,
        '& .MuiInputLabel-root': {
          color: placeholderColor,
          fontSize: styles.fontSize,
          fontFamily,
          transform: `translate(${px}, 9px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
            color: placeholderColor,
          },
          '&.Mui-focused': {
            color: placeholderColor,
          },
          '&.Mui-disabled': {
            color: placeholderColor,
            WebkitTextFillColor: placeholderColor,
          },
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: styles.borderRadius,
          backgroundColor: 'transparent',
          fontFamily,
          '& fieldset': {
            borderColor: borderDefault,
            borderWidth: styles.borderWidth,
          },
          '&:hover fieldset': {
            borderColor: borderHover,
          },
          '&.Mui-focused fieldset': {
            borderColor: borderFocus,
            borderWidth: styles.borderWidth,
          },
          '&.Mui-disabled fieldset': {
            borderColor: borderDefault,
          },
        },
        '& .MuiInputBase-input': {
          paddingLeft: styles.paddingX,
          paddingRight: styles.paddingX,
          color: textColor,
          fontSize: styles.fontSize,
          fontFamily,
          '&.Mui-disabled': {
            WebkitTextFillColor: textColor,
          },
        },
      }}
    />
  );
}
