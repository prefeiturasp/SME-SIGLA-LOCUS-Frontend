import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MenuLateral } from "../index";
import { CAMINHOS } from "@/rotas/caminhos";

function renderComRota(rota: string) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <MenuLateral />
    </MemoryRouter>,
  );
}

describe("MenuLateral", () => {
  it("renderiza a logo LOCUS e os seis itens do menu", async () => {
    renderComRota(CAMINHOS.cadastroGestaoUnidades);

    expect(screen.getByRole("img", { name: /locus/i })).toBeInTheDocument();
    for (const rotulo of [
      "Cadastro",
      "Relatórios consultas",
      "Data base",
      "Vagas",
      "Remoção",
      "Integração",
    ]) {
      expect(await screen.findByText(rotulo)).toBeInTheDocument();
    }
  });

  it("destaca o item Cadastro quando a rota atual e de cadastro", async () => {
    renderComRota(CAMINHOS.cadastroGestaoUnidades);

    await waitFor(() => {
      const itemCadastro = screen.getByText("Cadastro").closest("li");
      expect(itemCadastro?.className).toMatch(/selected/);
    });
  });

  it("nao destaca Cadastro quando a rota atual e de outra secao", async () => {
    renderComRota("/vagas/listagem");

    await waitFor(() => {
      const itemCadastro = screen.getByText("Cadastro").closest("li");
      expect(itemCadastro?.className ?? "").not.toMatch(/selected/);
    });
  });
});
