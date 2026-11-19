import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

async function aguardarPainelFechado() {
  await waitFor(() =>
    expect(document.querySelector(".ant-drawer-open")).not.toBeInTheDocument(),
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

  it("abre e fecha o painel de mais detalhes pelo botao do cabecalho", async () => {
    renderPagina();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Mais detalhes" }),
    );

    const painel = await screen.findByRole("dialog");
    expect(within(painel).getByText("Mais detalhes")).toBeInTheDocument();
    expect(
      within(painel).getByText("Identificação do servidor"),
    ).toBeInTheDocument();
    expect(
      within(painel).getByText("Atualização cadastral e afastamento"),
    ).toBeInTheDocument();

    const rodape = document.querySelector(
      ".ant-drawer-open .ant-drawer-footer",
    ) as HTMLElement;
    await userEvent.click(
      within(rodape).getByRole("button", { name: "Fechar" }),
    );

    await aguardarPainelFechado();
  });
});
