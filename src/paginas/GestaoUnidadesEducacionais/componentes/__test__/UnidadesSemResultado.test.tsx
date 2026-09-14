import { render, screen } from "@testing-library/react";
import { ComTema } from "@/testes/renderizarComTema";
import { UnidadesSemResultado } from "../UnidadesSemResultado";

describe("UnidadesSemResultado", () => {
  function renderizar() {
    render(
      <ComTema>
        <UnidadesSemResultado />
      </ComTema>,
    );
  }

  it("mostra o titulo da busca sem resultado", () => {
    renderizar();

    expect(
      screen.getByText("Não encontramos dados para esta busca"),
    ).toBeInTheDocument();
  });

  it("orienta a revisar os filtros aplicados", () => {
    renderizar();

    expect(
      screen.getByText(
        "Experimente remover alguns filtros ou selecionar outros critérios de busca.",
      ),
    ).toBeInTheDocument();
  });

  it("nao oferece nenhuma acao ao usuario", () => {
    renderizar();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
