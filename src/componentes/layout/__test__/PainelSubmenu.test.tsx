import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PainelSubmenu } from "../PainelSubmenu";
import type { SubitemMenu } from "../MenuLateral.itens";
import { ComProvedores } from "@/testes/renderizarComTema";

const ITENS: SubitemMenu[] = [
  { key: "inclusao", label: "Inclusão", filhos: [] },
  {
    key: "atualizacao",
    label: "Atualização",
    filhos: [
      { key: "atualizacao-exercicio", label: "Unidade de exercício" },
      {
        key: "atualizacao-rf",
        label: "Por registro funcional (RF)",
        path: "/rota/rf",
      },
    ],
  },
  { key: "classificacao", label: "Classificação" },
];

function renderizarPainel({
  aberto = true,
  caminhoAtual = "/rota/qualquer",
} = {}) {
  const aoNavegar = jest.fn();
  const aoFechar = jest.fn();

  render(
    <ComProvedores>
      <PainelSubmenu
        aberto={aberto}
        titulo="Cadastro"
        itens={ITENS}
        caminhoAtual={caminhoAtual}
        aoNavegar={aoNavegar}
        aoFechar={aoFechar}
      />
    </ComProvedores>,
  );

  return { aoNavegar, aoFechar };
}

function itemDeMenu(rotulo: string): HTMLElement | null {
  return screen.getByText(rotulo).closest('[role="menuitem"]');
}

describe("PainelSubmenu", () => {
  it("nao renderiza nada quando fechado", () => {
    renderizarPainel({ aberto: false });

    expect(screen.queryByText("Cadastro")).not.toBeInTheDocument();
    expect(screen.queryByText("Atualização")).not.toBeInTheDocument();
  });

  it("mostra o titulo e os itens de primeiro nivel com os grupos fechados", () => {
    renderizarPainel();

    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(screen.getByText("Inclusão")).toBeInTheDocument();
    expect(screen.getByText("Atualização")).toBeInTheDocument();
    expect(screen.getByText("Classificação")).toBeInTheDocument();
    expect(
      screen.queryByText("Por registro funcional (RF)"),
    ).not.toBeInTheDocument();
  });

  it("desabilita o grupo sem filhos e o item sem rota", () => {
    renderizarPainel();

    expect(itemDeMenu("Inclusão")).toHaveAttribute("aria-disabled", "true");
    expect(itemDeMenu("Classificação")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(itemDeMenu("Atualização")).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("expande o grupo e navega pelo item que tem rota", async () => {
    const { aoNavegar } = renderizarPainel();

    await userEvent.click(screen.getByText("Atualização"));
    await userEvent.click(
      await screen.findByText("Por registro funcional (RF)"),
    );

    expect(aoNavegar).toHaveBeenCalledTimes(1);
    expect(aoNavegar).toHaveBeenCalledWith("/rota/rf");
  });

  it("nao navega pelo item que ainda nao tem rota", async () => {
    const { aoNavegar } = renderizarPainel();

    await userEvent.click(screen.getByText("Atualização"));
    await userEvent.click(await screen.findByText("Unidade de exercício"));

    expect(aoNavegar).not.toHaveBeenCalled();
  });

  it("abre o grupo e destaca o item da rota atual", () => {
    renderizarPainel({ caminhoAtual: "/rota/rf" });

    expect(itemDeMenu("Por registro funcional (RF)")?.className).toMatch(
      /selected/,
    );
  });

  it("fecha ao pressionar Esc dentro do painel", () => {
    const { aoFechar } = renderizarPainel();

    // O rc-drawer le event.keyCode, que o user-event v14 nao preenche;
    // o navegador envia 27.
    fireEvent.keyDown(screen.getByRole("menu"), {
      key: "Escape",
      keyCode: 27,
    });

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });

  it("fecha ao clicar fora do painel", async () => {
    const { aoFechar } = renderizarPainel();

    const mascara = document.querySelector(".ant-drawer-mask");
    expect(mascara).not.toBeNull();
    await userEvent.click(mascara as HTMLElement);

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });
});
