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
  describe("modo editavel", () => {
    let mocks: ReturnType<typeof renderizarTabela>;

    manterMontado();

    beforeAll(() => {
      mocks = renderizarTabela();
    });

    beforeEach(() => {
      mocks.aoAbrirLotacao.mockClear();
      mocks.aoAbrirAfastados.mockClear();
      mocks.aoAlterarModulo.mockClear();
    });

    it("renderiza as linhas de grupo ocupando a largura da tabela", () => {
      const celulaGrupo = screen.getByText("Base comum").closest("td");
      expect(celulaGrupo).toHaveAttribute("colspan", "6");

      expect(screen.getByText("Linguagens adicionais")).toBeInTheDocument();
    });

    it("exibe a contagem de componentes no rodape", () => {
      expect(
        screen.getByText("Mostrando 22 de 22 componentes"),
      ).toBeInTheDocument();
    });

    it("exibe a lotacao como input somente leitura", () => {
      const campoLotacao = screen.getByLabelText("Lotação de Arte");
      expect(campoLotacao).toHaveAttribute("readonly");
      expect(campoLotacao).toHaveValue("5");
    });

    it("abre o painel ao clicar no numero de afastados", async () => {
      await userEvent.click(screen.getByLabelText("Afastados de Biologia"));
      expect(mocks.aoAbrirAfastados).toHaveBeenCalledWith(
        expect.objectContaining({ componente: "Biologia" }),
      );
    });

    it("abre o painel ao clicar no numero de lotacao", async () => {
      await userEvent.click(screen.getByLabelText("Lotação de Arte"));
      expect(mocks.aoAbrirLotacao).toHaveBeenCalledWith(
        expect.objectContaining({ componente: "Arte" }),
      );
    });

    it("nao abre painel quando o valor e zero", async () => {
      await userEvent.click(screen.getByLabelText("Afastados de Arte"));
      expect(mocks.aoAbrirAfastados).not.toHaveBeenCalled();
    });
  });

  it("nao abre painel de lotacao quando o valor e zero", async () => {
    const aoAbrirLotacao = jest.fn();
    const linhasComZero = montarLinhasAgrupadas([
      {
        ...componentesDetalhe[0],
        id: "sem-lotacao",
        componente: "Sem lotação",
        lotacao: 0,
      },
    ]);

    render(
      <ComProvedores>
        <TabelaComponentesDetalhe
          linhas={linhasComZero}
          totalComponentes={1}
          componentesExibidos={1}
          carregando={false}
          aoAlterarModulo={jest.fn()}
          aoAbrirLotacao={aoAbrirLotacao}
          aoAbrirAfastados={jest.fn()}
        />
      </ComProvedores>,
    );

    await userEvent.click(screen.getByLabelText("Lotação de Sem lotação"));
    expect(aoAbrirLotacao).not.toHaveBeenCalled();
  });

  it("desabilita a edicao no modo somente leitura", async () => {
    const { aoAbrirAfastados, aoAbrirLotacao } = renderizarTabela({
      somenteLeitura: true,
    });

    expect(screen.getByLabelText("Módulo de Arte")).toBeDisabled();
    expect(screen.getByLabelText("Lotação de Arte")).toHaveAttribute(
      "readonly",
    );

    await userEvent.click(screen.getByLabelText("Afastados de Biologia"));
    expect(aoAbrirAfastados).not.toHaveBeenCalled();

    await userEvent.click(screen.getByLabelText("Lotação de Arte"));
    expect(aoAbrirLotacao).not.toHaveBeenCalled();
  });
});
