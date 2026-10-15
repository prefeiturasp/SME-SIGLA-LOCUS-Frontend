export const colors = {
  /** Cor primaria do sistema (botao Acessar / brand). */
  primary: "#006A6A",
  primaryHover: "#014646",
  primaryActive: "#004F4F",
  primarySoft: "rgba(0, 106, 106, 0.1)",

  /** Links e acentos secundarios (ex.: Esqueci minha senha). */
  link: "#4E9591",
  linkHover: "#006A6A",

  /** Overlay da tela de login. */
  loginOverlay: "rgba(10, 61, 60, 0.72)",

  blue: "#006A6A",
  blueBackground: "rgba(0, 106, 106, 0.1)",
  blueBackgroundSoft: "rgba(0, 106, 106, 0.06)",
  activeBlue: "#005858",
  menuItemActiveBackground: "#005858",
  menuBackground: "#0A3D3C",

  primaryText: "#1C1D22",
  secondaryText: "#838383",
  tertiaryText: "#71717A",
  labelText: "#1C1D22",
  placeholder: "#BFBFBF",

  border: "#D9D9D9",
  lightBorder: "#E8E8E8",

  appBackground: "#FAFAFA",
  stripedBackground: "#F8F9FA",
  white: "#FFFFFF",

  success: "#009C0A",
  successBackground: "rgba(0, 156, 10, 0.1)",
  error: "#BC0000",
  errorBackground: "rgba(188, 0, 0, 0.1)",
  neutral: "#838383",
  neutralBackground: "rgba(131, 131, 131, 0.1)",

  completeBackground: "#F5F5F5",
  completeText: "#BFBFBF",

  headerUserBackground: "#F5F6F8",
  headerUserText: "#42474A",
  footerVersionText: "#595959",
} as const;

export const typography = {
  fontFamily:
    '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyRoboto:
    'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSizeBase: 14,
  fontSizeTitle: 24,
  fontSizeSubtitle: 20,
  fontSizeCaption: 12,
  fontWeightLabel: 600,
  fontWeightTitle: 700,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const layout = {
  menuWidth: 104,
  headerHeight: 72,
  footerHeight: 65,
  controlHeight: 40,
  radius: 8,
  radiusCard: 16,
  cardShadow:
    "0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 8px 24px 0px rgba(0, 0, 0, 0.16)",
  headerShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
  loginCardHeight: 720,
} as const;

export const tokens = { colors, typography, spacing, layout } as const;

export const tema = tokens;
export type Tema = typeof tema;

export default tokens;
