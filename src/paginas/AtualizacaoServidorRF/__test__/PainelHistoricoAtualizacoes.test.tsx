import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { historicoAtualizacoesEstatico } from "../dados/dadosEstaticos";
import { PainelHistoricoAtualizacoes } from "../componentes/PainelHistoricoAtualizacoes";

function renderizarPainel(aoFechar = jest.fn()) {
  render(
    <ComProvedores>
      <PainelHistoricoAtualizacoes
        aberto
        registros={historicoAtualizacoesEstatico}
        aoFechar={aoFechar}
      />
    </ComProvedores>,
  );
  return aoFechar;
}

describe("PainelHistoricoAtualizacoes", () => {
  it("exibe titulo, descricao e as colunas da tabela", () => {
    renderizarPainel();

    const painel = screen.getByRole("dialog");
    expect(
      within(painel).getByText("Histórico de atualizações"),
    ).toBeInTheDocument();
    expect(
      within(painel).getByText(
        "Consulte os motivos e as datas das atualizações realizadas no cadastro.",
      ),
    ).toBeInTheDocument();

    for (const coluna of ["Motivo", "Data", "Portaria", "Documento"]) {
      expect(
        within(painel).getByRole("columnheader", { name: coluna }),
      ).toBeInTheDocument();
    }
  });

  it("lista os registros com data formatada e traco sem documento", () => {
    renderizarPainel();

    const linha = screen.getByText("Realocação").closest("tr") as HTMLElement;
    expect(within(linha).getByText("15/03/2026")).toBeInTheDocument();
    expect(within(linha).getByText("184/2026")).toBeInTheDocument();
    expect(within(linha).getByText("-")).toBeInTheDocument();

    expect(screen.getByText("Retorno afastamento")).toBeInTheDocument();
    expect(screen.getByText("Fixação de lotação")).toBeInTheDocument();
    expect(screen.getByText("Ingresso")).toBeInTheDocument();
    expect(screen.getByText("08/03/2021")).toBeInTheDocument();
  });

  it("exibe o documento quando informado", () => {
    render(
      <ComProvedores>
        <PainelHistoricoAtualizacoes
          aberto
          registros={[
            {
              id: "a1",
              motivo: "Realocação",
              data: "2026-03-15",
              portaria: "184/2026",
              documento: "SEI 6016.2026/0001234-5",
            },
          ]}
          aoFechar={jest.fn()}
        />
      </ComProvedores>,
    );

    expect(screen.getByText("SEI 6016.2026/0001234-5")).toBeInTheDocument();
  });

  it("dispara aoFechar ao clicar no botao Fechar do rodape", async () => {
    const aoFechar = renderizarPainel();

    const rodape = document.querySelector(".ant-drawer-footer") as HTMLElement;
    await userEvent.click(
      within(rodape).getByRole("button", { name: "Fechar" }),
    );

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });
});
