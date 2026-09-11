import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabelaUnidades } from "../TabelaUnidades";
import { linhasUnidades } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import { ComTema } from "@/testes/renderizarComTema";

describe("TabelaUnidades", () => {
  it("renderiza uma linha por unidade e a contagem total", () => {
    render(
      <ComTema>
        <TabelaUnidades
          unidades={linhasUnidades}
          total={5985}
          carregando={false}
        />
      </ComTema>,
    );

    expect(screen.getByText("Cidade Tiradentes")).toBeInTheDocument();
    expect(screen.getByText("Matheus Pacheco")).toBeInTheDocument();
    expect(
      screen.getByText("Mostrando 1-10 de 5.985 registro(s)"),
    ).toBeInTheDocument();
  });

  it("mostra o chip de vagas de acordo com o saldo da unidade", () => {
    render(
      <ComTema>
        <TabelaUnidades
          unidades={linhasUnidades}
          total={5985}
          carregando={false}
        />
      </ComTema>,
    );

    expect(screen.getByText("+5 disponíveis")).toBeInTheDocument();
  });

  it("nao mostra o estado vazio quando existem unidades", () => {
    render(
      <ComTema>
        <TabelaUnidades
          unidades={linhasUnidades}
          total={5985}
          carregando={false}
        />
      </ComTema>,
    );

    expect(
      screen.queryByText("Não há unidades educacionais cadastradas"),
    ).not.toBeInTheDocument();
  });

  describe("sem unidades cadastradas", () => {
    it("mostra a mensagem, o subtitulo e o botao de registrar", () => {
      render(
        <ComTema>
          <TabelaUnidades unidades={[]} total={0} carregando={false} />
        </ComTema>,
      );

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
      render(
        <ComTema>
          <TabelaUnidades unidades={[]} total={0} carregando={false} />
        </ComTema>,
      );

      expect(screen.queryByText(/Mostrando/)).not.toBeInTheDocument();
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
            aoRegistrar={aoRegistrar}
          />
        </ComTema>,
      );

      await usuario.click(screen.getByRole("button", { name: /Registrar UE/ }));

      expect(aoRegistrar).toHaveBeenCalledTimes(1);
    });
  });
});
