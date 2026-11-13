import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComProvedores } from "@/testes/renderizarComTema";
import { PainelMaisDetalhes } from "../componentes/PainelMaisDetalhes";
import { servidoresAtivosEstaticos } from "../dados/dadosEstaticos";
import { montarDetalhesServidor } from "../dados/montarDetalhesServidor";

const servidor = servidoresAtivosEstaticos[0];
const detalhes = montarDetalhesServidor(servidor);

function renderizarPainel(aoFechar = jest.fn()) {
  render(
    <ComProvedores>
      <PainelMaisDetalhes aberto secoes={detalhes} aoFechar={aoFechar} />
    </ComProvedores>,
  );
  return aoFechar;
}

describe("PainelMaisDetalhes", () => {
  it("exibe titulo e descricao do painel", () => {
    renderizarPainel();

    const painel = screen.getByRole("dialog");
    expect(within(painel).getByText("Mais detalhes")).toBeInTheDocument();
    expect(
      within(painel).getByText(
        "Confira todos os dados do servidor selecionado.",
      ),
    ).toBeInTheDocument();
  });

  it("exibe todas as secoes com titulo e descricao", () => {
    renderizarPainel();

    for (const secao of detalhes) {
      const regiao = screen.getByRole("region", { name: secao.titulo });
      expect(within(regiao).getByText(secao.titulo)).toBeInTheDocument();
      expect(within(regiao).getByText(secao.descricao)).toBeInTheDocument();
    }
  });

  it("exibe rotulo e valor dos campos de cada secao", () => {
    renderizarPainel();

    const identificacao = screen.getByRole("region", {
      name: "Identificação do servidor",
    });
    expect(
      within(identificacao).getByText("Nome completo"),
    ).toBeInTheDocument();
    expect(within(identificacao).getByText(servidor.nome)).toBeInTheDocument();
    expect(within(identificacao).getByText(servidor.rf)).toBeInTheDocument();
    expect(within(identificacao).getByText(servidor.cpf)).toBeInTheDocument();

    const lotacao = screen.getByRole("region", { name: "Lotação" });
    expect(within(lotacao).getByText("Tipo de lotação")).toBeInTheDocument();
    expect(within(lotacao).getByText("Definitiva")).toBeInTheDocument();
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
