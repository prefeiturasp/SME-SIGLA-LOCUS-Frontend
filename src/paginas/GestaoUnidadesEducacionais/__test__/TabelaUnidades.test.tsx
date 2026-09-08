import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { linhasUnidades } from "../dados/dadosEstaticos";
import { TabelaUnidades } from "../componentes/TabelaUnidades";

function renderizarTabela(aoSelecionarUnidade?: jest.Mock) {
  render(
    <ComProvedores>
      <TabelaUnidades
        unidades={linhasUnidades}
        total={linhasUnidades.length}
        carregando={false}
        aoSelecionarUnidade={aoSelecionarUnidade}
      />
    </ComProvedores>,
  );
}

describe("TabelaUnidades", () => {
  it("renderiza as unidades e as dicas das colunas", () => {
    renderizarTabela();

    expect(screen.getByText("Cidade Tiradentes")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Quantidade de professores atualmente lotados na unidade educacional.",
      }),
    ).toBeInTheDocument();
  });

  it("chama aoSelecionarUnidade ao clicar na linha", async () => {
    const aoSelecionarUnidade = jest.fn();
    renderizarTabela(aoSelecionarUnidade);

    await userEvent.click(screen.getByText("Cidade Tiradentes"));

    expect(aoSelecionarUnidade).toHaveBeenCalledWith(
      expect.objectContaining({ codigoLotacao: "091488" }),
    );
  });

  it("nao quebra quando nao recebe o callback de selecao", async () => {
    renderizarTabela();

    await userEvent.click(screen.getByText("Cidade Tiradentes"));

    expect(screen.getByText("Cidade Tiradentes")).toBeInTheDocument();
  });
});
