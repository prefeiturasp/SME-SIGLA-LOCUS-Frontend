/**
 * Tokens de design do LOCUS.
 *
 * Valores extraidos do Figma (arquivo "Locus", frame 29:2044). Sao a fonte
 * unica de verdade para cores, espacamentos e tipografia usados tanto pelo
 * tema do Ant Design quanto pelos CSS Modules dos componentes.
 */

export const colors = {
  /** Azul institucional escuro - menu lateral e botao primario. */
  primary: "#183356",
  /** Azul de link / acoes secundarias. */
  blue: "#0068bc",
  /** Azul usado em estados ativos (item de menu selecionado, paginacao). */
  activeBlue: "#0f59c8",
  /** Fundo do item de menu ativo. */
  menuItemActiveBackground: "#0f59c8",
  /** Fundo do menu lateral. */
  menuBackground: "#183356",

  primaryText: "#1c1d22",
  secondaryText: "#838383",
  tertiaryText: "#71717a",

  border: "#dadada",
  lightBorder: "#dadee6",

  appBackground: "#fafafa",
  stripedBackground: "#f8f9fa",
  white: "#ffffff",

  success: "#009c0a",
  successBackground: "rgba(0, 156, 10, 0.1)",
  error: "#bc0000",
  errorBackground: "rgba(188, 0, 0, 0.1)",
  neutral: "#838383",
  neutralBackground: "rgba(131, 131, 131, 0.1)",

  /** Chip "Completo" da coluna Vagas: fundo cinza claro, texto/icone cinza. */
  completeBackground: "#f5f5f5",
  completeText: "#bfbfbf",

  /** Caixa do usuario logado no topo (Roboto). */
  headerUserBackground: "#f5f6f8",
  headerUserText: "#42474a",
  /** Texto de versao no rodape. */
  footerVersionText: "#595959",
} as const;

export const typography = {
  fontFamily:
    '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  /** Usada em pontos pontuais do topo/rodape (caixa do usuario, versao). */
  fontFamilyRoboto:
    'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSizeBase: 14,
  fontSizeTitle: 24,
  fontSizeSubtitle: 20,
  fontSizeCaption: 12,
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
  /** Altura de inputs, selects, date pickers e botoes (mockup). */
  controlHeight: 40,
  radius: 8,
  /** Sombra dos cards: contato + ambiente, com deslocamento para dar profundidade. */
  cardShadow:
    "0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 8px 24px 0px rgba(0, 0, 0, 0.16)",
  /** Sombra do topo (header). */
  headerShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
} as const;

export const tokens = { colors, typography, spacing, layout } as const;

/** Tema tipado para ThemeProvider do styled-components. */
export const tema = tokens;
export type Tema = typeof tema;

export default tokens;
