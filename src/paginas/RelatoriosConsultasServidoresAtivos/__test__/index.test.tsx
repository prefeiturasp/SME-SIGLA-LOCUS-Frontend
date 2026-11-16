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

async function buscarServidores() {
  await userEvent.type(screen.getByLabelText("Nome do servidor"), "Maria");
  await userEvent.click(screen.getByRole("button", { name: /Buscar/ }));
  await screen.findByRole("button", { name: "Personalizar colunas" });
}

function titulosCabecalho() {
  const cabecalho = document.querySelector(".ant-table-thead") as HTMLElement;
  return within(cabecalho)
    .getAllByRole("columnheader")
    .map((celula) => celula.textContent)
    .filter(Boolean);
}

function rodapePainel() {
  return document.querySelector(
    ".ant-drawer-open .ant-drawer-footer",
  ) as HTMLElement;
}

async function aguardarPainelFechado() {
  await waitFor(() =>
    expect(document.querySelector(".ant-drawer-open")).not.toBeInTheDocument(),
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
      expect.arrayContaining([
        expect.objectContaining({ nome: "Maria Silva Santos" }),
      ]),
      expect.arrayContaining([
        expect.objectContaining({ chave: "nome", titulo: "Nome" }),
      ]),
      "relatorio-banco-servidores",
    );
  });

  it("mostra mensagem quando nenhum servidor e encontrado", async () => {
    renderPagina();

    await userEvent.type(
      screen.getByPlaceholderText("Exemplo: João da Silva"),
      "Nome Inexistente Xyz",
    );
    await userEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText("Não encontramos dados para esta busca"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Experimente remover alguns filtros ou selecionar outros critérios de busca.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Exportar relatório" }),
    ).toBeInTheDocument();
  });

  it("abre e fecha o painel de mais detalhes pela linha da tabela", async () => {
    renderPagina();
    await buscarServidores();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const [, segundoBotao] = screen.getAllByRole("button", {
      name: "Mais detalhes",
    });
    await userEvent.click(segundoBotao);

    const painel = await screen.findByRole("dialog");
    const identificacao = within(painel).getByRole("region", {
      name: "Identificação do servidor",
    });
    expect(
      within(identificacao).getByText("Maria Oliveira Costa"),
    ).toBeInTheDocument();
    expect(
      within(identificacao).queryByText("Maria Silva Santos"),
    ).not.toBeInTheDocument();
    expect(
      within(painel).getByText("Atualização cadastral e afastamento"),
    ).toBeInTheDocument();

    await userEvent.click(
      within(rodapePainel()).getByRole("button", { name: "Fechar" }),
    );

    await aguardarPainelFechado();
  });

  it("personaliza as colunas da tabela ao salvar", async () => {
    renderPagina();
    await buscarServidores();

    expect(titulosCabecalho()).toEqual([
      "Nome",
      "R.F",
      "CPF",
      "CL",
      "Vínculo",
      "Cargo atual",
      "Função",
    ]);

    await userEvent.click(
      screen.getByRole("button", { name: "Personalizar colunas" }),
    );
    const painel = await screen.findByRole("dialog");

    await userEvent.click(
      within(painel).getByRole("checkbox", { name: "Atividade" }),
    );
    expect(
      within(painel).getByText(/itens padrão já estão selecionados/),
    ).toBeInTheDocument();
    expect(
      within(painel).getByRole("checkbox", { name: "Atividade" }),
    ).not.toBeChecked();

    await userEvent.click(within(painel).getByRole("checkbox", { name: "CPF" }));
    expect(
      within(painel).queryByText(/itens padrão já estão selecionados/),
    ).not.toBeInTheDocument();

    await userEvent.click(
      within(painel).getByRole("checkbox", { name: "Classificação" }),
    );
    await userEvent.click(
      within(rodapePainel()).getByRole("button", { name: "Salvar" }),
    );
    await aguardarPainelFechado();

    expect(titulosCabecalho()).toEqual([
      "Nome",
      "R.F",
      "CL",
      "Vínculo",
      "Cargo atual",
      "Função",
      "Classificação",
      "Geral",
      "PCD",
      "NNA",
    ]);
  });

  it("mantem as colunas ao cancelar a personalizacao", async () => {
    renderPagina();
    await buscarServidores();

    const colunasIniciais = titulosCabecalho();

    await userEvent.click(
      screen.getByRole("button", { name: "Personalizar colunas" }),
    );
    const painel = await screen.findByRole("dialog");
    await userEvent.click(within(painel).getByRole("checkbox", { name: "CPF" }));
    await userEvent.click(
      within(rodapePainel()).getByRole("button", { name: "Cancelar" }),
    );
    await aguardarPainelFechado();

    expect(titulosCabecalho()).toEqual(colunasIniciais);

    await userEvent.click(
      screen.getByRole("button", { name: "Personalizar colunas" }),
    );
    const painelReaberto = await screen.findByRole("dialog");
    expect(
      within(painelReaberto).getByRole("checkbox", { name: "CPF" }),
    ).toBeChecked();
  });
});
