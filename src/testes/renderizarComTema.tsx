import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { App as AntdApp, ConfigProvider } from "antd";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { temaAntd } from "@/estilos/temas/temaAntd";
import { tema } from "@/estilos/tokens/tokens";

function ComTema({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={tema}>{children}</ThemeProvider>;
}

export function renderizarComTema(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: ({ children }) => <ComTema>{children}</ComTema>,
    ...options,
  });
}

export interface ComProvedoresProps {
  children: ReactNode;
  rota?: string;
}

export function ComProvedores({ children, rota = "/" }: ComProvedoresProps) {
  return (
    <ComTema>
      <ConfigProvider theme={temaAntd}>
        <AntdApp>
          <MemoryRouter initialEntries={[rota]}>{children}</MemoryRouter>
        </AntdApp>
      </ConfigProvider>
    </ComTema>
  );
}

export { ComTema };
