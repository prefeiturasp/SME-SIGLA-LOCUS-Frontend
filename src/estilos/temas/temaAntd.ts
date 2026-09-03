import type { ThemeConfig } from "antd";
import { colors, typography, layout } from "@/estilos/tokens/tokens";

export const temaAntd: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorLink: colors.blue,
    colorInfo: colors.blue,
    colorSuccess: colors.success,
    colorError: colors.error,
    colorText: colors.primaryText,
    colorTextSecondary: colors.secondaryText,
    colorBorder: colors.border,
    colorBgLayout: colors.appBackground,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeBase,
    borderRadius: layout.radius,
    controlHeight: layout.controlHeight,
  },
  components: {
    Layout: {
      headerBg: colors.white,
      headerHeight: layout.headerHeight,
      headerPadding: "0 24px",
      bodyBg: colors.appBackground,
      footerBg: colors.white,
      footerPadding: "16px 40px",
      siderBg: colors.menuBackground,
    },
    Menu: {
      darkItemBg: colors.menuBackground,
      darkSubMenuItemBg: colors.menuBackground,
      darkItemSelectedBg: colors.menuItemActiveBackground,
      darkItemColor: "rgba(255, 255, 255, 0.85)",
      darkItemSelectedColor: colors.white,
    },
    Table: {
      headerBg: colors.stripedBackground,
      headerColor: colors.primaryText,
      rowHoverBg: colors.stripedBackground,
      borderColor: colors.border,
    },
    Pagination: {
      itemActiveBg: colors.white,
      itemSize: layout.controlHeight,
      itemActiveColorDisabled: colors.secondaryText,
      colorPrimary: colors.activeBlue,
      colorPrimaryHover: colors.activeBlue,
      colorText: colors.primaryText,
      itemLinkBg: "transparent",
    },
    Card: {
      boxShadowTertiary: layout.cardShadow,
    },
    Button: {
      primaryShadow: "none",
      defaultShadow: "none",
      fontWeight: 600,
      defaultBorderColor: colors.blue,
      defaultColor: colors.blue,
      defaultHoverBorderColor: colors.blue,
      defaultHoverColor: colors.blue,
      defaultActiveBorderColor: colors.blue,
      defaultActiveColor: colors.blue,
    },
    Switch: {
      colorPrimary: colors.blue,
      colorPrimaryHover: colors.blue,
    },
  },
};

export default temaAntd;
