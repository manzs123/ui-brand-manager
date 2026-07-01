import Link from '@mui/material/Link';
import type { CardStyles, ButtonStyles, InputStyles } from '../../types/brand';
import { PreviewButton } from './PreviewButton';
import { PreviewInput } from './PreviewInput';
import { PreviewInputHide } from './PreviewInputHide';

interface Props {
  cardStyles: CardStyles;
  buttonStyles: ButtonStyles;
  inputStyles: InputStyles;
  fontFamily: string;
  linkColor: string;
  dark?: boolean;
}

export function PreviewCard({ cardStyles, buttonStyles, inputStyles, fontFamily, linkColor, dark }: Props) {

  return (
    <div style={{
      borderRadius: cardStyles.borderRadius,
      border: `${cardStyles.borderWidth} solid ${cardStyles.borderColor}`,
      backgroundColor: cardStyles.backgroundColor,
      padding: `${cardStyles.paddingY} ${cardStyles.paddingX}`,
      fontFamily,
      width: '100%',
      maxWidth: 460,
      boxSizing: 'border-box',
    }}>
      <p style={{ margin: '0 0 4px', fontSize: cardStyles.headingFontSize, fontWeight: 700, color: cardStyles.headingColor, lineHeight: 1.3 }}>
        Sign in
      </p>
      <p style={{ margin: '0 0 20px', fontSize: cardStyles.bodyFontSize, color: cardStyles.bodyColor }}>
        Enter your credentials to continue
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PreviewInput styles={inputStyles} fontFamily={fontFamily} dark={dark} label="Email address" />
        <PreviewInputHide styles={inputStyles} fontFamily={fontFamily} dark={dark} label="Password" />
      </div>

      <div style={{ margin: '10px 0 16px', textAlign: 'right' }}>
        <Link href="#" underline="always" sx={{ color: linkColor, fontWeight: 400, fontFamily, fontSize: 12, textDecorationColor: linkColor }}>
          Forgot password?
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PreviewButton styles={buttonStyles} fontFamily={fontFamily} variant="contained" label="Sign in" />
      </div>
    </div>
  );
}
