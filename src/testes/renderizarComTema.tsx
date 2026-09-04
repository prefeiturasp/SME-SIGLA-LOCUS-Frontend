import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { tema } from "@/estilos/tokens/tokens";

function ComTema({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={tema}>{children}</ThemeProvider>;
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

export { ComTema };
