import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { PainelPersonalizarColunas } from "../componentes/PainelPersonalizarColunas";
import {
  CHAVES_COLUNAS_PADRAO,
  COLUNAS_TABELA_SERVIDORES,
  LIMITE_COLUNAS_SERVIDORES,
  type ChaveColunaServidor,
} from "../dados/dadosEstaticos";

const MENSAGEM_LIMITE = `Os ${LIMITE_COLUNAS_SERVIDORES} itens padrão já estão selecionados. Para personalizar as colunas, desmarque os itens que deseja remover e selecione outros de sua preferência.`;

interface OpcoesRender {
  selecao?: ChaveColunaServidor[];
  exibirAlertaLimite?: boolean;
}

function renderizarPainel({
  selecao = CHAVES_COLUNAS_PADRAO,
  exibirAlertaLimite = false,
}: OpcoesRender = {}) {
  const aoAlternar = jest.fn();
  const aoSalvar = jest.fn();
  const aoFechar = jest.fn();

  render(
    <ComProvedores>
      <PainelPersonalizarColunas
        aberto
        colunas={COLUNAS_TABELA_SERVIDORES}
        selecao={selecao}
        limite={LIMITE_COLUNAS_SERVIDORES}
        exibirAlertaLimite={exibirAlertaLimite}
        aoAlternar={aoAlternar}
        aoSalvar={aoSalvar}
        aoFechar={aoFechar}
      />
    </ComProvedores>,
  );

  return { aoAlternar, aoSalvar, aoFechar };
}

function rodape() {
  return document.querySelector(".ant-drawer-footer") as HTMLElement;
}

describe("PainelPersonalizarColunas", () => {
  it("exibe titulo, instrucao e titulo da lista", () => {
    renderizarPainel();

    const painel = screen.getByRole("dialog");
    expect(within(painel).getByText("Personalizar colunas")).toBeInTheDocument();
    expect(
      within(painel).getByText(
        `Selecione até ${LIMITE_COLUNAS_SERVIDORES} informações`,
        { exact: false },
      ),
    ).toBeInTheDocument();
    expect(
      within(painel).getByText("Colunas da tabela de servidores"),
    ).toBeInTheDocument();
  });

  it("lista todas as colunas em ordem alfabetica", () => {
    renderizarPainel();

    const rotulos = screen
      .getAllByRole("checkbox")
      .map((checkbox) => checkbox.closest("label")?.textContent);
    const esperado = COLUNAS_TABELA_SERVIDORES.map((coluna) => coluna.titulo)
      .slice()
      .sort((a, b) => a.localeCompare(b, "pt-BR"));

    expect(rotulos).toEqual(esperado);
  });

  it("marca apenas as colunas selecionadas", () => {
    renderizarPainel();

    for (const coluna of COLUNAS_TABELA_SERVIDORES) {
      const checkbox = screen.getByRole("checkbox", { name: coluna.titulo });
      if (CHAVES_COLUNAS_PADRAO.includes(coluna.chave)) {
        expect(checkbox).toBeChecked();
      } else {
        expect(checkbox).not.toBeChecked();
      }
    }
  });

  it("desabilita a coluna fixa", () => {
    renderizarPainel();

    expect(screen.getByRole("checkbox", { name: "Nome" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "CPF" })).toBeEnabled();
  });

  it("exibe o contador de colunas selecionadas", () => {
    renderizarPainel({ selecao: ["nome", "rf", "cpf"] });

    const contador = screen.getByText("selecionados", { exact: false });
    expect(contador).toHaveTextContent(
      `3 de ${LIMITE_COLUNAS_SERVIDORES} selecionados`,
    );
  });

  it("dispara aoAlternar ao marcar e desmarcar colunas", async () => {
    const { aoAlternar } = renderizarPainel();

    await userEvent.click(screen.getByRole("checkbox", { name: "Atividade" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "CPF" }));

    expect(aoAlternar).toHaveBeenNthCalledWith(1, "atividade", true);
    expect(aoAlternar).toHaveBeenNthCalledWith(2, "cpf", false);
  });

  it("exibe o alerta de limite apenas quando solicitado", () => {
    renderizarPainel({ exibirAlertaLimite: true });

    expect(screen.getByRole("alert")).toHaveTextContent(MENSAGEM_LIMITE);
  });

  it("nao exibe o alerta de limite por padrao", () => {
    renderizarPainel();

    expect(screen.queryByText(MENSAGEM_LIMITE)).not.toBeInTheDocument();
  });

  it("dispara aoSalvar ao clicar em Salvar", async () => {
    const { aoSalvar, aoFechar } = renderizarPainel();

    await userEvent.click(
      within(rodape()).getByRole("button", { name: "Salvar" }),
    );

    expect(aoSalvar).toHaveBeenCalledTimes(1);
    expect(aoFechar).not.toHaveBeenCalled();
  });

  it("dispara aoFechar ao clicar em Cancelar", async () => {
    const { aoSalvar, aoFechar } = renderizarPainel();

    await userEvent.click(
      within(rodape()).getByRole("button", { name: "Cancelar" }),
    );

    expect(aoFechar).toHaveBeenCalledTimes(1);
    expect(aoSalvar).not.toHaveBeenCalled();
  });

  it("dispara aoFechar ao clicar no botao Fechar do cabecalho", async () => {
    const { aoFechar } = renderizarPainel();

    await userEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });
});
