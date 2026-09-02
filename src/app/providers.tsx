import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import { temaAntd } from "@/estilos/temas/temaAntd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
});

/**
 * Provedores globais: React Query, tema/locale do Ant Design e o roteador.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={temaAntd} locale={ptBR}>
        <BrowserRouter>{children}</BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default Providers;
