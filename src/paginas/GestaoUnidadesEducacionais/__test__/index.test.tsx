import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { GestaoUnidadesEducacionais } from "../index";

function renderNaCasca(children: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[CAMINHOS.cadastroGestaoUnidades]}>
        <Routes>
          <Route element={<LayoutBase />}>
            <Route
              path={CAMINHOS.cadastroGestaoUnidades}
              element={children}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("GestaoUnidadesEducacionais (integração com a casca)", () => {
  it("renderiza titulo, breadcrumb, painel e tabela dentro do layout base", async () => {
    renderNaCasca(<GestaoUnidadesEducacionais />);

    expect(
      screen.getByRole("heading", {
        name: "Gestão das unidades educacionais",
      }),
    ).toBeInTheDocument();

    // breadcrumb da casca
    expect(screen.getByText("Início")).toBeInTheDocument();

    // painel (dados estaticos carregados via React Query)
    expect(
      await screen.findByText(
        "Painel de informações por componente curricular",
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText("Módulos")).toBeInTheDocument();

    // tabela
    expect(
      await screen.findByText("Mostrando 1-10 de 5.985 registro(s)"),
    ).toBeInTheDocument();

    // rodape da casca
    expect(
      screen.getByText(/Versão v2.3 - Homologada/),
    ).toBeInTheDocument();
  });
});
