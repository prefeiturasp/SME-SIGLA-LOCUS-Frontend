import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabelaUnidades } from "../TabelaUnidades";
import { linhasUnidades } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import { ComProvedores, ComTema } from "@/testes/renderizarComTema";

function renderizarTabela(aoSelecionarUnidade?: jest.Mock) {
  render(
    <ComProvedores>
      <TabelaUnidades
        unidades={linhasUnidades}
        total={linhasUnidades.length}
        carregando={false}
        statusListagem="comDados"
        aoSelecionarUnidade={aoSelecionarUnidade}
      />
    </ComProvedores>,
  );
}

function campoPeriodoInicial() {
  return screen.getAllByPlaceholderText("00/00/0000")[0];
}

describe("TabelaUnidades", () => {
  describe("listagem com dados", () => {
    manterMontado();

    beforeAll(() => {
      render(
        <ComTema>
          <TabelaUnidades
            unidades={linhasUnidades}
            total={5985}
            carregando={false}
            statusListagem="comDados"
          />
        </ComTema>,
      );
    });

    it("renderiza uma linha por unidade e a contagem total", () => {
      expect(screen.getByText("Cidade Tiradentes")).toBeInTheDocument();
      expect(screen.getByText("Matheus Pacheco")).toBeInTheDocument();
      expect(
        screen.getByText("Mostrando 1-10 de 5.985 registro(s)"),
      ).toBeInTheDocument();
    });

    it("mostra o chip de vagas de acordo com o saldo da unidade", () => {
      expect(screen.getByText("+5 disponíveis")).toBeInTheDocument();
    });
  });

  it("renderiza as dicas das colunas", () => {
    renderizarTabela();

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

  function linhaDaUnidade() {
    return screen.getByText("Cidade Tiradentes").closest("tr");
  }

  it("sinaliza as linhas como clicaveis quando ha callback de selecao", () => {
    renderizarTabela(jest.fn());

    expect(linhaDaUnidade()).toHaveClass("linhaClicavel");
  });

  it("nao sinaliza as linhas como clicaveis sem callback de selecao", () => {
    renderizarTabela();

    expect(linhaDaUnidade()).not.toHaveClass("linhaClicavel");
  });

  it("nao mostra nenhum estado vazio quando existem unidades", () => {
    renderizarTabela();

    expect(
      screen.queryByText("Não há unidades educacionais cadastradas"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Não encontramos dados para esta busca"),
    ).not.toBeInTheDocument();
  });

  it("mantem o campo de periodo habilitado quando existem unidades", () => {
    renderizarTabela();

    expect(campoPeriodoInicial()).toBeEnabled();
  });

  describe("sem unidades cadastradas", () => {
    describe("conteudo exibido", () => {
      manterMontado();

      beforeAll(() => {
        render(
          <ComTema>
            <TabelaUnidades
              unidades={[]}
              total={0}
              carregando={false}
              statusListagem="semCadastro"
            />
          </ComTema>,
        );
      });

      it("mostra a mensagem, o subtitulo e o botao de registrar", () => {
        expect(
          screen.getByText("Não há unidades educacionais cadastradas"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Que tal registrar a primeira UE agora?"),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /Registrar UE/ }),
        ).toBeInTheDocument();
      });

      it("esconde a paginacao", () => {
        expect(screen.queryByText(/Mostrando/)).not.toBeInTheDocument();
      });

      it("mantem o campo de periodo habilitado", () => {
        expect(campoPeriodoInicial()).toBeEnabled();
      });
    });

    it("aciona aoRegistrar no clique do botao", async () => {
      const aoRegistrar = jest.fn();
      const usuario = userEvent.setup();

      render(
        <ComTema>
          <TabelaUnidades
            unidades={[]}
            total={0}
            carregando={false}
            statusListagem="semCadastro"
            aoRegistrar={aoRegistrar}
          />
        </ComTema>,
      );

      await usuario.click(screen.getByRole("button", { name: /Registrar UE/ }));

      expect(aoRegistrar).toHaveBeenCalledTimes(1);
    });
  });

  describe("busca sem resultado", () => {
    // Todos os casos deste bloco apenas leem o DOM, entao compartilham um render.
    manterMontado();

    beforeAll(() => {
      render(
        <ComTema>
          <TabelaUnidades
            unidades={[]}
            total={0}
            carregando={false}
            statusListagem="semResultado"
            aoRegistrar={jest.fn()}
          />
        </ComTema>,
      );
    });

    it("mostra a mensagem e a orientacao de revisar os filtros", () => {
      expect(
        screen.getByText("Não encontramos dados para esta busca"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Experimente remover alguns filtros ou selecionar outros critérios de busca.",
        ),
      ).toBeInTheDocument();
    });

    it("nao mostra a mensagem de nenhuma unidade cadastrada", () => {
      expect(
        screen.queryByText("Não há unidades educacionais cadastradas"),
      ).not.toBeInTheDocument();
    });

    it("nao oferece o botao de registrar UE", () => {
      expect(
        screen.queryByRole("button", { name: /Registrar UE/ }),
      ).not.toBeInTheDocument();
    });

    it("esconde a paginacao", () => {
      expect(screen.queryByText(/Mostrando/)).not.toBeInTheDocument();
    });

    it("desabilita o campo de periodo", () => {
      expect(campoPeriodoInicial()).toBeDisabled();
    });
  });
});
