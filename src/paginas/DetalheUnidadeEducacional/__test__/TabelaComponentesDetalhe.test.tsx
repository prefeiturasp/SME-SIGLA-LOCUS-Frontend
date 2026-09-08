import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { componentesDetalhe } from "../dados/dadosEstaticos";
import { montarLinhasAgrupadas } from "../utilitarios";
import { TabelaComponentesDetalhe } from "../componentes/TabelaComponentesDetalhe";

const linhas = montarLinhasAgrupadas(componentesDetalhe);

interface Opcoes {
  somenteLeitura?: boolean;
  aoAbrirLotacao?: jest.Mock;
  aoAbrirAfastados?: jest.Mock;
  aoAlterarModulo?: jest.Mock;
}

function renderizarTabela({
  somenteLeitura = false,
  aoAbrirLotacao = jest.fn(),
  aoAbrirAfastados = jest.fn(),
  aoAlterarModulo = jest.fn(),
}: Opcoes = {}) {
  render(
    <ComProvedores>
      <TabelaComponentesDetalhe
        linhas={linhas}
        totalComponentes={componentesDetalhe.length}
        componentesExibidos={componentesDetalhe.length}
        carregando={false}
        somenteLeitura={somenteLeitura}
        aoAlterarModulo={aoAlterarModulo}
        aoAbrirLotacao={aoAbrirLotacao}
        aoAbrirAfastados={aoAbrirAfastados}
      />
    </ComProvedores>,
  );
  return { aoAbrirLotacao, aoAbrirAfastados, aoAlterarModulo };
}

describe("TabelaComponentesDetalhe", () => {
  it("renderiza as linhas de grupo ocupando a largura da tabela", () => {
    renderizarTabela();

    const celulaGrupo = screen.getByText("Base comum").closest("td");
    expect(celulaGrupo).toHaveAttribute("colspan", "6");

    expect(screen.getByText("Linguagens adicionais")).toBeInTheDocument();
  });

  it("aplica a zebra contando apenas as linhas de componente", () => {
    const { container } = render(
      <ComProvedores>
        <TabelaComponentesDetalhe
          linhas={linhas}
          totalComponentes={22}
          componentesExibidos={22}
          carregando={false}
          aoAlterarModulo={jest.fn()}
          aoAbrirLotacao={jest.fn()}
          aoAbrirAfastados={jest.fn()}
        />
      </ComProvedores>,
    );

    const corpo = container.querySelectorAll(".ant-table-tbody > tr");
    // 1a linha e o cabecalho do grupo; a zebra so comeca na 2a de componente.
    expect(corpo[0]).toHaveClass("linhaGrupo");
    expect(corpo[1]).not.toHaveClass("linhaPar");
    expect(corpo[2]).toHaveClass("linhaPar");
  });

  it("exibe a contagem de componentes no rodape", () => {
    renderizarTabela();
    expect(
      screen.getByText("Mostrando 22 de 22 componentes"),
    ).toBeInTheDocument();
  });

  it("abre o painel ao clicar no numero de afastados", async () => {
    const { aoAbrirAfastados } = renderizarTabela();

    await userEvent.click(screen.getByLabelText("Afastados de Biologia"));
    expect(aoAbrirAfastados).toHaveBeenCalledWith(
      expect.objectContaining({ componente: "Biologia" }),
    );
  });

  it("exibe a lotacao como input somente leitura", () => {
    renderizarTabela();

    const campoLotacao = screen.getByLabelText("Lotação de Arte");
    expect(campoLotacao).toHaveAttribute("readonly");
    expect(campoLotacao).toHaveValue("5");
  });

  it("nao abre painel quando o valor e zero", async () => {
    const { aoAbrirAfastados } = renderizarTabela();

    // Arte tem 0 afastados no mock.
    await userEvent.click(screen.getByLabelText("Afastados de Arte"));
    expect(aoAbrirAfastados).not.toHaveBeenCalled();
  });

  it("desabilita a edicao no modo somente leitura", async () => {
    const { aoAbrirLotacao, aoAbrirAfastados } = renderizarTabela({
      somenteLeitura: true,
    });

    expect(screen.getByLabelText("Módulo de Arte")).toBeDisabled();
    expect(screen.getByLabelText("Lotação de Arte")).toHaveAttribute(
      "readonly",
    );

    await userEvent.click(screen.getByLabelText("Lotação de Arte"));
    await userEvent.click(screen.getByLabelText("Afastados de Biologia"));
    expect(aoAbrirLotacao).not.toHaveBeenCalled();
    expect(aoAbrirAfastados).not.toHaveBeenCalled();
  });
});
