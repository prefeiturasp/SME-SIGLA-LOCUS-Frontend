import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PainelSubmenu } from "../PainelSubmenu";
import type { SubitemMenu } from "../MenuLateral.itens";
import { ComProvedores } from "@/testes/renderizarComTema";

const ROTA_RF = "/rota/rf";

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
        path: ROTA_RF,
      },
    ],
  },
  { key: "classificacao", label: "Classificação" },
];

function renderizarPainel(caminhoAtual = "/rota/qualquer") {
  const aoNavegar = jest.fn();
  const aoFechar = jest.fn();

  render(
    <ComProvedores>
      <PainelSubmenu
        aberto
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

function item(rotulo: string): HTMLElement {
  return screen.getByRole("menuitem", { name: rotulo });
}

function rotulosVisiveis(): (string | null)[] {
  return screen.getAllByRole("menuitem").map(({ textContent }) => textContent);
}

async function expandirAtualizacao() {
  await userEvent.click(item("Atualização"));
  await screen.findByRole("menuitem", { name: "Por registro funcional (RF)" });
}

describe("PainelSubmenu", () => {
  it("abre com o titulo e so os itens de primeiro nivel, na ordem recebida", () => {
    renderizarPainel();

    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(rotulosVisiveis()).toEqual([
      "Inclusão",
      "Atualização",
      "Classificação",
    ]);
    expect(item("Atualização")).toHaveAttribute("aria-expanded", "false");
  });

  it("lista os filhos na ordem recebida ao expandir o grupo", async () => {
    renderizarPainel();

    await expandirAtualizacao();

    expect(item("Atualização")).toHaveAttribute("aria-expanded", "true");
    expect(rotulosVisiveis()).toEqual([
      "Inclusão",
      "Atualização",
      "Unidade de exercício",
      "Por registro funcional (RF)",
      "Classificação",
    ]);
  });

  it("desabilita o grupo sem filhos e os itens sem rota", async () => {
    renderizarPainel();
    await expandirAtualizacao();

    expect(item("Inclusão")).toHaveAttribute("aria-disabled", "true");
    expect(item("Classificação")).toHaveAttribute("aria-disabled", "true");
    expect(item("Unidade de exercício")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(item("Atualização")).not.toHaveAttribute("aria-disabled", "true");
    expect(item("Por registro funcional (RF)")).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("nao expande o grupo sem filhos", async () => {
    renderizarPainel();

    await userEvent.click(item("Inclusão"));

    expect(item("Inclusão")).toHaveAttribute("aria-expanded", "false");
  });

  it("navega para a rota do item clicado", async () => {
    const { aoNavegar } = renderizarPainel();
    await expandirAtualizacao();

    await userEvent.click(item("Por registro funcional (RF)"));

    expect(aoNavegar).toHaveBeenCalledTimes(1);
    expect(aoNavegar).toHaveBeenCalledWith(ROTA_RF);
  });

  it("nao navega ao clicar em grupo ou em item sem rota", async () => {
    const { aoNavegar } = renderizarPainel();
    await expandirAtualizacao();

    await userEvent.click(item("Unidade de exercício"));
    await userEvent.click(item("Classificação"));
    await userEvent.click(item("Atualização"));

    expect(aoNavegar).not.toHaveBeenCalled();
  });

  it("ja abre com o grupo expandido e so o item da rota atual selecionado", () => {
    renderizarPainel(ROTA_RF);

    expect(item("Atualização")).toHaveAttribute("aria-expanded", "true");
    expect(item("Por registro funcional (RF)")).toHaveClass(
      "ant-menu-item-selected",
    );
    expect(document.querySelectorAll(".ant-menu-item-selected")).toHaveLength(
      1,
    );
  });

  it("nao seleciona item algum quando a rota atual nao e do painel", async () => {
    renderizarPainel();
    await expandirAtualizacao();

    expect(document.querySelectorAll(".ant-menu-item-selected")).toHaveLength(
      0,
    );
  });

  it("pede para fechar ao pressionar Esc", () => {
    const { aoFechar } = renderizarPainel();

    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape", keyCode: 27 });

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });

  it("pede para fechar ao clicar fora do painel", async () => {
    const { aoFechar } = renderizarPainel();

    await userEvent.click(
      document.querySelector(".ant-drawer-mask") as HTMLElement,
    );

    expect(aoFechar).toHaveBeenCalledTimes(1);
  });
});
