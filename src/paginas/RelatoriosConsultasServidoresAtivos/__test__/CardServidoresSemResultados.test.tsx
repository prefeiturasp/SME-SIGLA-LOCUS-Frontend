import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { CardServidoresSemResultados } from "../componentes/CardServidoresSemResultados";
import {
  DESCRICAO_CARD_RESULTADOS_SERVIDORES,
  MENSAGEM_SEM_RESULTADOS_DESCRICAO,
  MENSAGEM_SEM_RESULTADOS_TITULO,
  TITULO_CARD_RESULTADOS_SERVIDORES,
} from "../dados/dadosEstaticos";

describe("CardServidoresSemResultados", () => {
  it("exibe titulo, subtitulo e mensagem de busca sem dados", () => {
    render(
      <ComProvedores>
        <CardServidoresSemResultados />
      </ComProvedores>,
    );

    expect(
      screen.getByRole("heading", { name: TITULO_CARD_RESULTADOS_SERVIDORES }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(DESCRICAO_CARD_RESULTADOS_SERVIDORES),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MENSAGEM_SEM_RESULTADOS_TITULO),
    ).toBeInTheDocument();
    expect(
      screen.getByText(MENSAGEM_SEM_RESULTADOS_DESCRICAO),
    ).toBeInTheDocument();
  });

  it("mantem os botoes do cabecalho desabilitados", () => {
    render(
      <ComProvedores>
        <CardServidoresSemResultados />
      </ComProvedores>,
    );

    expect(
      screen.getByRole("button", { name: "Personalizar colunas" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Exportar relatório" }),
    ).toBeDisabled();
  });
});
