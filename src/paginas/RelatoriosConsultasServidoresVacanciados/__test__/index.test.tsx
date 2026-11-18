import { render, screen, within } from "@testing-library/react";
import { App as AntdApp } from "antd";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComTema } from "@/testes/renderizarComTema";
import { ServidoresVacanciados } from "../index";

function renderPagina() {
  return render(
    <ComTema>
      <AntdApp>
        <MemoryRouter
          initialEntries={[CAMINHOS.relatoriosConsultasServidoresVacanciados]}
        >
          <Routes>
            <Route element={<LayoutBase />}>
              <Route
                path={CAMINHOS.relatoriosConsultasServidoresVacanciados}
                element={<ServidoresVacanciados />}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </AntdApp>
    </ComTema>,
  );
}

describe("ServidoresVacanciados", () => {
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
      within(breadcrumb).getByText("Servidores vacanciados"),
    ).toBeInTheDocument();
  });
});
