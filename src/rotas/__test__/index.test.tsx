import { render, screen } from "@testing-library/react";
import { ComProvedores } from "@/testes/renderizarComTema";
import { RotasApp } from "../index";

describe("RotasApp", () => {
  it("abre a atualizacao por registro funcional na rota do menu", async () => {
    render(
      <ComProvedores rota="/cadastro/atualizacao/registro-funcional">
        <RotasApp />
      </ComProvedores>,
    );

    expect(
      await screen.findByRole("heading", {
        name: "Atualização por registro funcional (RF)",
      }),
    ).toBeInTheDocument();
  });
});
