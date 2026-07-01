import Button from '@mui/material/Button';
import type { ButtonStyles } from '../../types/brand';

interface Props {
  styles: ButtonStyles;
  fontFamily?: string;
  variant?: 'contained' | 'outlined' | 'text';
  dark?: boolean;
  label?: string;
}

export function PreviewButton({ styles, fontFamily = 'inherit', variant = 'contained', dark = false, label = 'Click Me' }: Props) {
  const brandColor = styles.backgroundColor;
  const brandHover = styles.hoverBackgroundColor;

  const variantSx =
    variant === 'contained'
      ? {
          color: styles.color,
          backgroundColor: brandColor,
          border: 'none',
          '&:hover': { backgroundColor: brandHover, boxShadow: 'none' },
        }
      : variant === 'outlined'
      ? {
          color: brandColor,
          backgroundColor: 'transparent',
          border: `${styles.borderWidth} solid ${brandColor}`,
          '&:hover': {
            backgroundColor: 'transparent',
            borderColor: brandHover,
            color: brandHover,
            boxShadow: 'none',
          },
        }
      : {
          color: brandColor,
          backgroundColor: 'transparent',
          border: 'none',
          '&:hover': { backgroundColor: dark ? '#404040' : '#f2f2f2', boxShadow: 'none' },
        };

  return (
    <Button
      variant={variant}
      disableElevation
      sx={{
        borderRadius: styles.borderRadius,
        paddingLeft: styles.paddingX,
        paddingRight: styles.paddingX,
        paddingTop: styles.paddingY,
        paddingBottom: styles.paddingY,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        textTransform: 'none',
        minWidth: 0,
        fontFamily,
        boxShadow: 'none',
        ...variantSx,
        '&:active': { boxShadow: 'none', opacity: 0.85, transform: 'scale(0.98)' },
        transition: 'background-color 0.15s, border-color 0.15s, opacity 0.1s, transform 0.1s',
      }}
    >
      {label}
    </Button>
  );
}
