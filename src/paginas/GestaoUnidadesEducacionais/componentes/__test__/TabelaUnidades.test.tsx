import { render, screen } from "@testing-library/react";
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
});
