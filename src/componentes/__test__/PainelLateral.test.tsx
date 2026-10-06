import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PainelLateral } from "../PainelLateral";
import { ComProvedores } from "@/testes/renderizarComTema";

function renderizarPainel(aberto: boolean, aoFechar = jest.fn()) {
  render(
    <ComProvedores>
      <PainelLateral
        aberto={aberto}
        titulo="Lotação"
        descricao="Confira os professores em atividades neste componente curricular."
        contexto="Componente curricular: Arte"
        aoFechar={aoFechar}
      >
        <p>conteudo do painel</p>
      </PainelLateral>
    </ComProvedores>,
  );
  return aoFechar;
}

describe("PainelLateral", () => {
  it("nao renderiza o conteudo quando fechado", () => {
    renderizarPainel(false);
    expect(screen.queryByText("conteudo do painel")).not.toBeInTheDocument();
  });

  it("renderiza titulo, descricao, contexto e conteudo quando aberto", () => {
    renderizarPainel(true);

    expect(screen.getByText("Lotação")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Confira os professores em atividades neste componente curricular.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Componente curricular: Arte")).toBeInTheDocument();
    expect(screen.getByText("conteudo do painel")).toBeInTheDocument();
  });

  it("nao renderiza rodape quando nao informado", () => {
    renderizarPainel(true);

    expect(document.querySelector(".ant-drawer-footer")).toBeNull();
  });

  it("renderiza o rodape informado", () => {
    render(
      <ComProvedores>
        <PainelLateral
          aberto
          titulo="Lotação"
          aoFechar={jest.fn()}
          rodape={<button type="button">Confirmar</button>}
        >
          <p>conteudo do painel</p>
        </PainelLateral>
      </ComProvedores>,
    );

    const rodape = document.querySelector(".ant-drawer-footer") as HTMLElement;
    expect(
      within(rodape).getByRole("button", { name: "Confirmar" }),
    ).toBeInTheDocument();
  });

  it("dispara aoFechar ao clicar no botao de fechar", async () => {
    const aoFechar = renderizarPainel(true);

    await userEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });

  it("nao renderiza rodape quando nao informado", () => {
    renderizarPainel(true);

    expect(document.querySelector(".ant-drawer-footer")).not.toBeInTheDocument();
  });

  it("renderiza o rodape quando informado", () => {
    render(
      <ComProvedores>
        <PainelLateral
          aberto
          titulo="Lotação"
          aoFechar={jest.fn()}
          rodape={<button type="button">acao do rodape</button>}
        >
          <p>conteudo do painel</p>
        </PainelLateral>
      </ComProvedores>,
    );

    const rodape = document.querySelector(".ant-drawer-footer") as HTMLElement;
    expect(
      within(rodape).getByRole("button", { name: "acao do rodape" }),
    ).toBeInTheDocument();
  });
});
