import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { App as AntdApp, ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { temaAntd } from "@/estilos/temas/temaAntd";
import { tema } from "@/estilos/tokens/tokens";


function ComTema({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={tema}>
      <StyleProvider mock="server">{children}</StyleProvider>
    </ThemeProvider>
  );
}

/** Render com ThemeProvider — necessario para styled-components. */
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
  /** Rota inicial do MemoryRouter. */
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
