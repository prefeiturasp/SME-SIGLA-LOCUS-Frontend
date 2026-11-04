import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComTema } from "@/testes/renderizarComTema";
import { ServidoresAtivos } from "../index";

function renderPagina() {
  return render(
    <ComTema>
      <MemoryRouter
        initialEntries={[CAMINHOS.relatoriosConsultasServidoresAtivos]}
      >
        <Routes>
          <Route element={<LayoutBase />}>
            <Route
              path={CAMINHOS.relatoriosConsultasServidoresAtivos}
              element={<ServidoresAtivos />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    </ComTema>,
  );
}

describe("ServidoresAtivos", () => {
  it("renderiza titulo e breadcrumb da tela", () => {
    renderPagina();

    expect(
      screen.getByRole("heading", { name: "Banco de servidores" }),
    ).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(within(breadcrumb).getByText("Início")).toBeInTheDocument();
    expect(
      within(breadcrumb).getByText("Relatórios consultas"),
    ).toBeInTheDocument();
    expect(
      within(breadcrumb).getByText("Servidores ativos"),
    ).toBeInTheDocument();
  });
});
