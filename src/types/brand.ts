export interface ButtonStyles {
  borderRadius: string;
  paddingX: string;
  paddingY: string;
  color: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  borderColor: string;
  borderWidth: string;
}

export interface ButtonDarkColors {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  borderColor: string;
}

export interface InputStyles {
  borderRadius: string;
  paddingX: string;
  paddingY: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  focusBorderColor: string;
  fontSize: string;
  placeholderColor: string;
}

export interface InputDarkColors {
  color: string;
  backgroundColor: string;
  placeholderColor: string;
  borderColor: string;
  focusBorderColor: string;
}

export interface HeaderPaymentStyles {
  backgroundColor: string;
  borderRadius: string;
  logo?: string;
}

export interface HeaderBackofficeStyles {
  backgroundColor: string;
  borderRadius: string;
  logo?: string;
}

export interface CardStyles {
  borderRadius: string;
  borderWidth: string;
  borderColor: string;
  backgroundColor: string;
  paddingX: string;
  paddingY: string;
  headingColor: string;
  headingFontSize: string;
  bodyColor: string;
  bodyFontSize: string;
}

export interface CardDarkColors {
  backgroundColor: string;
  borderColor: string;
  headingColor: string;
  bodyColor: string;
}

export interface LinkStyles {
  color: string;
}

export interface LinkDarkColors {
  color: string;
}

export interface DialogStyles {
  borderRadius: string;
  backgroundColor: string;
  paddingX: string;
  paddingY: string;
  headingColor: string;
  headingFontSize: string;
  bodyColor: string;
  bodyFontSize: string;
  scrimColor: string;
}

export interface DialogDarkColors {
  backgroundColor: string;
  headingColor: string;
  bodyColor: string;
  scrimColor: string;
}

export interface NavMenuStyles {
  activeBackgroundColor: string;
  activeTextColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface NavMenuDarkColors {
  activeBackgroundColor: string;
  activeTextColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface Brand {
  id: string;
  name: string;
  favicon?: string;
  primaryColor: string;
  primaryColorDark?: string;
  fontFamily: string;
  faviconBackground: string;
  button: ButtonStyles;
  buttonDark: ButtonDarkColors;
  input: InputStyles;
  inputDark: InputDarkColors;
  headerPayment: HeaderPaymentStyles;
  headerBackoffice: HeaderBackofficeStyles;
  card: CardStyles;
  cardDark: CardDarkColors;
  link: LinkStyles;
  linkDark: LinkDarkColors;
  dialog: DialogStyles;
  dialogDark: DialogDarkColors;
  navMenu: NavMenuStyles;
  navMenuDark: NavMenuDarkColors;
}
