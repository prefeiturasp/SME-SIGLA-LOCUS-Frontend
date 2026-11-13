import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { CardTabelaServidores } from "../componentes/CardTabelaServidores";
import {
  CHAVES_COLUNAS_PADRAO,
  COLUNAS_TABELA_SERVIDORES,
  servidoresAtivosEstaticos,
  type ChaveColunaServidor,
} from "../dados/dadosEstaticos";

function colunasPorChaves(chaves: ChaveColunaServidor[]) {
  return chaves.map(
    (chave) =>
      COLUNAS_TABELA_SERVIDORES.find((coluna) => coluna.chave === chave)!,
  );
}

function renderizarTabela(chaves: ChaveColunaServidor[] = CHAVES_COLUNAS_PADRAO) {
  const aoPersonalizarColunas = jest.fn();
  const aoVerDetalhes = jest.fn();

  render(
    <ComProvedores>
      <CardTabelaServidores
        servidores={servidoresAtivosEstaticos.slice(0, 3)}
        total={3}
        colunasVisiveis={colunasPorChaves(chaves)}
        aoPersonalizarColunas={aoPersonalizarColunas}
        aoVerDetalhes={aoVerDetalhes}
      />
    </ComProvedores>,
  );

  return { aoPersonalizarColunas, aoVerDetalhes };
}

function cabecalho() {
  return document.querySelector(".ant-table-thead") as HTMLElement;
}

describe("CardTabelaServidores", () => {
  it("exibe apenas os cabecalhos das colunas visiveis", () => {
    renderizarTabela();

    const titulos = within(cabecalho())
      .getAllByRole("columnheader")
      .map((celula) => celula.textContent)
      .filter(Boolean);

    expect(titulos).toEqual(
      colunasPorChaves(CHAVES_COLUNAS_PADRAO).map((coluna) => coluna.titulo),
    );
    expect(
      within(cabecalho()).queryByText("Atividade"),
    ).not.toBeInTheDocument();
  });

  it("respeita a ordem das colunas visiveis", () => {
    renderizarTabela(["nome", "lotacao", "rf"]);

    const titulos = within(cabecalho())
      .getAllByRole("columnheader")
      .map((celula) => celula.textContent)
      .filter(Boolean);

    expect(titulos).toEqual(["Nome", "Lotação", "R.F"]);
  });

  it("agrupa a classificacao nas subcolunas Geral, PCD e NNA", () => {
    renderizarTabela(["nome", "classificacao"]);

    const linhasCabecalho = within(cabecalho()).getAllByRole("row");
    expect(linhasCabecalho).toHaveLength(2);

    const agrupador = within(linhasCabecalho[0]).getByText("Classificação");
    expect(agrupador.closest("th")).toHaveAttribute("colspan", "3");

    const subcolunas = within(linhasCabecalho[1])
      .getAllByRole("columnheader")
      .map((celula) => celula.textContent);
    expect(subcolunas).toEqual(["Geral", "PCD", "NNA"]);

    const primeiraLinha = document.querySelector(
      ".ant-table-tbody tr[data-row-key='1']",
    ) as HTMLElement;
    const celulas = within(primeiraLinha)
      .getAllByRole("cell")
      .map((celula) => celula.textContent);
    expect(celulas).toEqual(
      expect.arrayContaining(["40", "1", "1"]),
    );
  });

  it("dispara aoPersonalizarColunas ao clicar no botao de personalizar", async () => {
    const { aoPersonalizarColunas } = renderizarTabela();

    await userEvent.click(
      screen.getByRole("button", { name: "Personalizar colunas" }),
    );

    expect(aoPersonalizarColunas).toHaveBeenCalledTimes(1);
  });

  it("dispara aoVerDetalhes com o servidor da linha", async () => {
    const { aoVerDetalhes } = renderizarTabela();

    const [primeiroBotao] = screen.getAllByRole("button", {
      name: "Mais detalhes",
    });
    await userEvent.click(primeiroBotao);

    expect(aoVerDetalhes).toHaveBeenCalledWith(servidoresAtivosEstaticos[0]);
  });
});
