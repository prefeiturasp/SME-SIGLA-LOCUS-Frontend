import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { reiniciarModulosSalvos } from "@/servicos/recursos/unidadesEducacionais";
import { ComProvedores } from "@/testes/renderizarComTema";
import { DetalheUnidadeEducacional } from "../index";
const ESPERA = { timeout: 5000 };

const mockExportarAbasXlsx = jest.fn();

jest.mock("@/hooks/useExportarXlsx", () => ({
  useExportarXlsx: () => ({
    exportarAbasXlsx: mockExportarAbasXlsx,
    exportando: false,
  }),
}));

function renderNaCasca(codigo = "091488") {
  return render(
    <ComProvedores rota={`/cadastro/unidade-educacional/${codigo}`}>
      <Routes>
        <Route element={<LayoutBase />}>
          <Route
            path={CAMINHOS.cadastroDetalheUE}
            element={<DetalheUnidadeEducacional />}
          />
        </Route>
      </Routes>
    </ComProvedores>,
  );
}

describe("DetalheUnidadeEducacional (integração com a casca)", () => {
  beforeEach(() => {
    reiniciarModulosSalvos();
    mockExportarAbasXlsx.mockReset();
  });

  it("renderiza cabecalho, subtitulo e cartoes dentro do layout", async () => {
    renderNaCasca();

    expect(
      await screen.findByRole(
        "heading",
        { name: "CECI Cidade Tiradentes" },
        ESPERA,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("DRE Itaquera | Código 091488"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Informações da unidade educacional"),
    ).toBeInTheDocument();
    const informacoes = screen
      .getByText("Informações da unidade educacional")
      .closest(".ant-card") as HTMLElement;
    expect(within(informacoes).getByText("Módulos")).toBeInTheDocument();
    expect(within(informacoes).getByText("Lotação")).toBeInTheDocument();
    expect(within(informacoes).getByText("Afastados")).toBeInTheDocument();
    expect(within(informacoes).getByText("Vagas")).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(
      within(breadcrumb).getByRole("link", { name: "Início" }),
    ).toBeInTheDocument();
    expect(within(breadcrumb).queryByText("Cadastro")).not.toBeInTheDocument();
    expect(
      within(breadcrumb).getByText("Unidade Educacional"),
    ).toBeInTheDocument();
  });

  it("mostra no card de informacoes os numeros da propria unidade", async () => {
    renderNaCasca("091977");

    const titulo = await screen.findByText(
      "Informações da unidade educacional",
      {},
      ESPERA,
    );
    const informacoes = titulo.closest(".ant-card") as HTMLElement;
    expect(within(informacoes).getByText("27")).toBeInTheDocument();
    expect(within(informacoes).getByText("33")).toBeInTheDocument();
    expect(within(informacoes).getByText("2")).toBeInTheDocument();
    expect(within(informacoes).getByText("-4")).toBeInTheDocument();
    expect(within(informacoes).queryByText("105")).not.toBeInTheDocument();
  });

  it("exporta o relatorio em XLSX com o painel acima da tabela e mostra sucesso", async () => {
    mockExportarAbasXlsx.mockResolvedValueOnce(true);
    renderNaCasca();

    await userEvent.click(
      await screen.findByRole("button", { name: "Exportar relatório" }, ESPERA),
    );

    expect(mockExportarAbasXlsx).toHaveBeenCalledTimes(1);
    const [abas, nomeArquivo] = mockExportarAbasXlsx.mock.calls[0];
    expect(nomeArquivo).toBe("relatorio-ue-091488");
    expect(abas).toHaveLength(1);
    expect(abas[0].nome).toBe("Unidade educacional");
    const linhas = abas[0].linhas;
    expect(linhas.slice(0, 3)).toEqual([
      ["Unidade educacional", "CECI Cidade Tiradentes"],
      ["DRE", "Itaquera"],
      ["Código de lotação", "091488"],
    ]);
    expect(linhas[4]).toEqual(["Informações da unidade educacional"]);
    expect(linhas.slice(6, 10)).toEqual([
      ["Módulos", 105, "Quantidade de vagas disponibilizadas"],
      ["Lotação", 108, "Quantidade de professores alocados"],
      ["Afastados", 8, "Quantidade de afastamentos temporários"],
      ["Vagas", 5, "Quantidade de vagas ainda disponíveis"],
    ]);
    expect(linhas[11]).toEqual(["Dados por componente curricular"]);
    expect(linhas[13]).toEqual(["Base comum"]);
    expect(linhas[14]).toEqual(["Arte", 3, 5, 0, 0, "-2 excedentes"]);
    expect(linhas).toContainEqual(["Linguagens adicionais"]);

    expect(await screen.findByText("Sucesso!", {}, ESPERA)).toBeInTheDocument();
    expect(screen.getByText("O relatório foi baixado.")).toBeInTheDocument();
  });

  it("exporta o modulo editado na tela, ainda nao salvo", async () => {
    mockExportarAbasXlsx.mockResolvedValueOnce(true);
    renderNaCasca();

    const campoArte = await screen.findByLabelText(
      "Módulo de Arte",
      {},
      ESPERA,
    );
    await userEvent.clear(campoArte);
    await userEvent.type(campoArte, "9");
    await userEvent.click(
      screen.getByRole("button", { name: "Exportar relatório" }),
    );

    const [abas] = mockExportarAbasXlsx.mock.calls[0];
    expect(abas[0].linhas[14]).toEqual(["Arte", 9, 5, 0, 0, "+4 disponíveis"]);
  });

  it("mostra erro quando a exportacao XLSX falha", async () => {
    mockExportarAbasXlsx.mockRejectedValueOnce(new Error("falha"));
    renderNaCasca();

    await userEvent.click(
      await screen.findByRole("button", { name: "Exportar relatório" }, ESPERA),
    );

    expect(await screen.findByText("Erro!", {}, ESPERA)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Não conseguimos baixar o relatório. Por favor, tente novamente!",
      ),
    ).toBeInTheDocument();
  });

  it("mantem Salvar desabilitado ate existir alteracao", async () => {
    renderNaCasca();

    const salvar = await screen.findByRole(
      "button",
      { name: "Salvar" },
      ESPERA,
    );
    expect(salvar).toBeDisabled();

    const campoArte = await screen.findByLabelText(
      "Módulo de Arte",
      {},
      ESPERA,
    );
    await userEvent.clear(campoArte);
    await userEvent.type(campoArte, "9");

    await waitFor(() => expect(salvar).toBeEnabled());
  });

  it("abre o painel de lotacao ao clicar em um numero diferente de zero", async () => {
    renderNaCasca();

    await userEvent.click(
      await screen.findByLabelText("Lotação de Arte", {}, ESPERA),
    );

    expect(
      await screen.findByText(
        "Confira os professores em atividades neste componente curricular.",
        {},
        ESPERA,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Componente curricular: Arte")).toBeInTheDocument();
    expect(screen.getByText("João da Silva")).toBeInTheDocument();
    expect(screen.getByText("Tipo de vaga")).toBeInTheDocument();
  });

  it("exibe o estado de nao encontrada para codigo inexistente", async () => {
    renderNaCasca("999999");

    expect(
      await screen.findByText("Unidade educacional não encontrada", {}, ESPERA),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Voltar para a listagem" }),
    ).toBeInTheDocument();
  });

  describe("unidade indisponivel (status=3)", () => {
    // Os tres casos so leem o DOM do mesmo estado, entao um render serve a todos.
    manterMontado();

    beforeAll(async () => {
      window.history.pushState({}, "", "/?status=3");
      renderNaCasca("093703");
      await screen.findByText(
        "Esta informação não está mais disponível!",
        {},
        ESPERA,
      );
    });

    afterAll(() => {
      window.history.pushState({}, "", "/");
    });

    it("mostra o cabecalho da gestao de UEs", () => {
      expect(
        screen.getByRole("heading", {
          name: "Gestão das unidades educacionais",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Registrar UE/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Exportar relatório/ }),
      ).not.toBeInTheDocument();
    });

    it("mostra o card de informacao indisponivel", () => {
      expect(
        screen.getByText("Esta informação não está mais disponível!"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Atualizar página/ }),
      ).toBeInTheDocument();
    });

    it("nao mostra os cartoes do detalhe nem o erro de nao encontrada", () => {
      expect(
        screen.queryByText("Informações da unidade educacional"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Unidade educacional não encontrada"),
      ).not.toBeInTheDocument();
    });
  });
});
