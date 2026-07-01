import Link from '@mui/material/Link';

interface Props {
  color: string;
  fontFamily?: string;
  dark?: boolean;
}

export function PreviewLink({ color, fontFamily = 'inherit', dark = false }: Props) {
  const textColor = dark ? '#fafafa' : '#111827';
  const mutedColor = dark ? '#9ca3af' : '#6b7280';

  const linkSx = { color, fontWeight: 400, fontFamily, fontSize: 14, textDecorationColor: color };

  return (
    <div style={{ fontFamily, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <Link href="#" underline="always" sx={linkSx}>Learn more</Link>
      </div>
      <div style={{ fontSize: 14, color: textColor, lineHeight: 1.6 }}>
        By continuing you agree to our{' '}
        <Link href="#" underline="always" sx={linkSx}>Terms of Service</Link>
        {' '}and{' '}
        <Link href="#" underline="always" sx={linkSx}>Privacy Policy</Link>
      </div>
      <div style={{ fontSize: 14, color: mutedColor }}>
        Already have an account?{' '}
        <Link href="#" underline="always" sx={linkSx}>Sign in</Link>
      </div>
      <div>
        <Link href="#" underline="always" sx={{ ...linkSx, fontSize: 13 }}>Forgot password?</Link>
      </div>
    </div>
  );
}
