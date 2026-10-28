import { render, screen } from "@testing-library/react";
import { ComProvedores } from "@/testes/renderizarComTema";
import { RotasApp } from "../index";

// Mock da aplicação SIGLA para evitar carregar seus serviços HTTP
jest.mock("../../../modules/sigla/app/App", () => ({
  __esModule: true,
  SiglaApp: () => null,
}));

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

  it("abre a atualizacao de vacancia na rota do menu", async () => {
    render(
      <ComProvedores rota="/cadastro/atualizacao/vacancia">
        <RotasApp />
      </ComProvedores>,
    );

    expect(
      await screen.findByRole("heading", { name: "Vacância" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Não encontramos esta página..."),
    ).not.toBeInTheDocument();
  });
});
