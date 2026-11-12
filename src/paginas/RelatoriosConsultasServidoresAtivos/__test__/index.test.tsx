import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComTema } from "@/testes/renderizarComTema";
import { ServidoresAtivos } from "../index";

const mockExportarXlsx = jest.fn();

jest.mock("@/hooks/useExportarXlsx", () => ({
  useExportarXlsx: () => ({
    exportarXlsx: mockExportarXlsx,
    exportando: false,
  }),
}));

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
  beforeEach(() => {
    mockExportarXlsx.mockClear();
  });

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

  it("exporta XLSX dos servidores filtrados apos a busca", async () => {
    renderPagina();

    await userEvent.type(
      screen.getByPlaceholderText("Exemplo: João da Silva"),
      "Maria",
    );
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));

    const botaoExportar = await screen.findByRole("button", {
      name: "Exportar relatório",
    });
    await userEvent.click(botaoExportar);

    expect(mockExportarXlsx).toHaveBeenCalledTimes(1);
    expect(mockExportarXlsx).toHaveBeenCalledWith(
      expect.any(Array),
      expect.arrayContaining([
        expect.objectContaining({ chave: "nome", titulo: "Nome" }),
      ]),
      "relatorio-banco-servidores",
    );
  });

  it("abre e fecha o painel de mais detalhes", async () => {
    renderPagina();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("Exemplo: João da Silva"),
      "Maria",
    );
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));

    const botoesMaisDetalhes = await screen.findAllByRole("button", {
      name: "Mais detalhes",
    });
    await userEvent.click(botoesMaisDetalhes[0]);

    const painel = await screen.findByRole("dialog");
    expect(within(painel).getByText("Mais detalhes")).toBeInTheDocument();
    expect(
      within(painel).getByText("Identificação do servidor"),
    ).toBeInTheDocument();
    expect(
      within(painel).getByText("Atualização cadastral e afastamento"),
    ).toBeInTheDocument();
    expect(document.querySelector(".ant-drawer-open")).toBeInTheDocument();

    const rodape = document.querySelector(".ant-drawer-footer") as HTMLElement;
    await userEvent.click(
      within(rodape).getByRole("button", { name: "Fechar" }),
    );

    await waitFor(() =>
      expect(
        document.querySelector(".ant-drawer-open"),
      ).not.toBeInTheDocument(),
    );
  });
});
