import { render, screen } from "@testing-library/react";
import { ComProvedores } from "@/testes/renderizarComTema";
import * as autenticacao from "@/servicos/recursos/autenticacao";
import { RotasApp } from "../index";

describe("RotasApp", () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

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

  it("com TOKEN, /sigla leva para a tela inicial do Locus", async () => {
    localStorage.setItem("TOKEN", "token-teste");

    render(
      <ComProvedores rota="/sigla">
        <RotasApp />
      </ComProvedores>,
    );

    expect(
      await screen.findByRole("heading", {
        name: "Gestão das unidades educacionais",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Não encontramos esta página..."),
    ).not.toBeInTheDocument();
  });

  it("sem TOKEN, /sigla redireciona para a URL publica do Sigla", () => {
    const redirecionar = jest
      .spyOn(autenticacao, "redirectSigla")
      .mockImplementation(() => undefined);

    render(
      <ComProvedores rota="/sigla">
        <RotasApp />
      </ComProvedores>,
    );

    expect(redirecionar).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("Não encontramos esta página..."),
    ).not.toBeInTheDocument();
  });
});
