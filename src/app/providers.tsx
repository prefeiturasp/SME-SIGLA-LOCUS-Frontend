import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import ptBR from "antd/locale/pt_BR";
import { temaAntd } from "@/estilos/temas/temaAntd";
import { tema } from "@/estilos/tokens/tokens";
import { GlobalStyle } from "@/estilos/global/GlobalStyle";

/** Basename do React Router a partir do `base` do Vite (sem barra final). */
function basenameDaApp(): string | undefined {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base.length > 0 ? base : undefined;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={tema}>
      <GlobalStyle />
      <ConfigProvider theme={temaAntd} locale={ptBR}>
        <AntdApp>
          <BrowserRouter basename={basenameDaApp()}>{children}</BrowserRouter>
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default Providers;
