import { render, screen } from "@testing-library/react";
import { TabelaUnidades } from "../TabelaUnidades";
import { linhasUnidades } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

describe("TabelaUnidades", () => {
  it("renderiza uma linha por unidade e a contagem total", () => {
    render(
      <TabelaUnidades
        unidades={linhasUnidades}
        total={5985}
        carregando={false}
      />,
    );

    expect(screen.getByText("Cidade Tiradentes")).toBeInTheDocument();
    expect(screen.getByText("Matheus Pacheco")).toBeInTheDocument();
    expect(
      screen.getByText("Mostrando 1-10 de 5.985 registro(s)"),
    ).toBeInTheDocument();
  });

  it("mostra o chip de vagas de acordo com o saldo da unidade", () => {
    render(
      <TabelaUnidades
        unidades={linhasUnidades}
        total={5985}
        carregando={false}
      />,
    );

    expect(screen.getByText("+5 disponíveis")).toBeInTheDocument();
    expect(screen.getByText("-4 excedentes")).toBeInTheDocument();
    expect(screen.getAllByText("Completo").length).toBeGreaterThan(0);
  });
});
