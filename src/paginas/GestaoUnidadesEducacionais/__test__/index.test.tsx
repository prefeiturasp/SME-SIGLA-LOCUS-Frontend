import type { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App as AntdApp } from "antd";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComTema } from "@/testes/renderizarComTema";
import { GestaoUnidadesEducacionais } from "../index";

const ESPERA = { timeout: 5000 };

const mockExportarAbasXlsx = jest.fn();

jest.mock("@/hooks/useExportarXlsx", () => ({
  useExportarXlsx: () => ({
    exportarAbasXlsx: mockExportarAbasXlsx,
    exportando: false,
  }),
}));

function renderNaCasca(children: ReactNode) {
  return render(
    <ComTema>
      <AntdApp>
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
      </AntdApp>
    </ComTema>,
  );
}

describe("GestaoUnidadesEducacionais (integração com a casca)", () => {
  beforeEach(() => {
    mockExportarAbasXlsx.mockReset();
  });

  it("renderiza titulo, breadcrumb, painel e tabela dentro do layout base", async () => {
    renderNaCasca(<GestaoUnidadesEducacionais />);

    expect(
      screen.getByRole("heading", {
        name: "Gestão das unidades educacionais",
      }),
    ).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(within(breadcrumb).getByText("Início")).toBeInTheDocument();
    expect(within(breadcrumb).queryByText("Cadastro")).not.toBeInTheDocument();

    expect(
      await screen.findByText(
        "Painel de informações por componente curricular",
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText("Módulos")).toBeInTheDocument();

    expect(
      await screen.findByText("Mostrando 1-10 de 5.985 registro(s)"),
    ).toBeInTheDocument();

    expect(screen.getByText(/Versão v2.3 - Homologada/)).toBeInTheDocument();
  });

  it("exporta o relatorio em XLSX com o painel acima da tabela e mostra sucesso", async () => {
    mockExportarAbasXlsx.mockResolvedValueOnce(true);
    renderNaCasca(<GestaoUnidadesEducacionais />);

    await userEvent.click(
      screen.getByRole("button", { name: "Exportar relatório" }),
    );

    expect(mockExportarAbasXlsx).toHaveBeenCalledTimes(1);
    const [abas, nomeArquivo] = mockExportarAbasXlsx.mock.calls[0];
    expect(nomeArquivo).toBe("relatorio-gestao-unidades");
    expect(abas).toHaveLength(1);
    expect(abas[0].nome).toBe("Unidades educacionais");
    const linhas = abas[0].linhas;
    expect(linhas).toHaveLength(23);
    expect(linhas[0]).toEqual([
      "Painel de informações por componente curricular",
    ]);
    expect(linhas[1]).toEqual(["Componente curricular", "Arte"]);
    expect(linhas[3]).toEqual(["Indicador", "Valor", "Descrição"]);
    expect(linhas[4]).toEqual([
      "Módulos",
      105,
      "Quantidade de vagas disponibilizadas",
    ]);
    expect(linhas[9]).toEqual([
      "Turmas ativas",
      16,
      "Quantidade de turmas ativas no EOL.",
    ]);
    expect(linhas[11]).toEqual(["Unidades educacionais"]);
    expect(linhas[12][0]).toBe("Código de lotação");
    expect(linhas[13]).toEqual([
      "091488",
      "CECI",
      "Cidade Tiradentes",
      "Itaquera",
      105,
      108,
      8,
      "+5 disponíveis",
    ]);

    expect(await screen.findByText("Sucesso!", {}, ESPERA)).toBeInTheDocument();
    expect(screen.getByText("O relatório foi baixado.")).toBeInTheDocument();
  });

  it("mostra erro quando a exportacao XLSX falha", async () => {
    mockExportarAbasXlsx.mockRejectedValueOnce(new Error("falha"));
    renderNaCasca(<GestaoUnidadesEducacionais />);

    await userEvent.click(
      screen.getByRole("button", { name: "Exportar relatório" }),
    );

    expect(await screen.findByText("Erro!", {}, ESPERA)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Não conseguimos baixar o relatório. Por favor, tente novamente!",
      ),
    ).toBeInTheDocument();
  });

  it("nao mostra notificacao quando a exportacao nao acontece", async () => {
    mockExportarAbasXlsx.mockResolvedValueOnce(false);
    renderNaCasca(<GestaoUnidadesEducacionais />);

    await userEvent.click(
      screen.getByRole("button", { name: "Exportar relatório" }),
    );

    expect(mockExportarAbasXlsx).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Sucesso!")).not.toBeInTheDocument();
    expect(screen.queryByText("Erro!")).not.toBeInTheDocument();
  });
});
