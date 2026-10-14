import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp, ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import ptBR from "antd/locale/pt_BR";
import { temaAntd } from "@sigla/estilos/temas/temaAntd";
import { tema } from "@sigla/estilos/tokens/tokens";
import { GlobalStyle } from "@sigla/estilos/global/GlobalStyle";

const queryClient = new QueryClient();

/**
 * Tema e clientes do Sigla, isolados do Locus.
 * O roteamento fica no BrowserRouter do Locus.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={tema as never}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={temaAntd} locale={ptBR}>
          <AntdApp>{children}</AntdApp>
        </ConfigProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
