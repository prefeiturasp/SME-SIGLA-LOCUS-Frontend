import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { tema } from "@sigla/estilos/tokens/tokens";
import { SelecaoSistemas } from "../index";

function renderPagina() {
  return render(
    <ThemeProvider theme={tema as never}>
      <MemoryRouter initialEntries={["/sigla"]}>
        <Routes>
          <Route path="/sigla" element={<SelecaoSistemas />} />
          <Route path="/sigla/login" element={<h1>Login</h1>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe("SelecaoSistemas", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("mostra a saudacao, os dois sistemas e o usuario logado", () => {
    localStorage.setItem("TOKEN", "token");
    localStorage.setItem("USUARIO", "1234567");
    localStorage.setItem("NOME_USUARIO", "Marcus Paulo de Souza Andrade");

    renderPagina();

    expect(
      screen.getByRole("heading", { name: "Olá, Marcus Paulo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Escolha o sistema que deseja acessar",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Selecione uma das opções para continuar"),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "SIGLA" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Prefeitura de São Paulo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Marcus Paulo de Souza Andrade"),
    ).toBeInTheDocument();
    expect(screen.getByText("RF: 1234567")).toBeInTheDocument();

    const alvo = screen.getByRole("link", { name: /Acessar ALVO/ });
    expect(alvo).toHaveAttribute("href", "/alvo/");
    expect(alvo).toHaveTextContent("Alocação de Vagas Online");
    expect(alvo).toHaveTextContent(
      "Gerencie a alocação e o preenchimento de vagas.",
    );
    expect(screen.getByRole("img", { name: "ALVO" })).toBeInTheDocument();

    const locus = screen.getByRole("link", { name: /Acessar LOCUS/ });
    expect(locus).toHaveAttribute("href", "/locus/");
    expect(locus).toHaveTextContent(
      "Lotação e Controle Unificado de Servidores",
    );
    expect(locus).toHaveTextContent(
      "Gerencie a lotação e consulte informações dos servidores.",
    );
    expect(screen.getByRole("img", { name: "LOCUS" })).toBeInTheDocument();
  });

  it("mostra traco no RF quando o usuario nao tem registro", () => {
    localStorage.setItem("NOME_USUARIO", "Vitor");

    renderPagina();

    expect(screen.getByRole("heading", { name: "Olá, Vitor" })).toBeInTheDocument();
    expect(screen.getByText("RF: —")).toBeInTheDocument();
  });

  it("encerra a sessao e volta para o login", async () => {
    localStorage.setItem("TOKEN", "token");
    localStorage.setItem("USUARIO", "007007");
    localStorage.setItem("NOME_USUARIO", "vitor teste sigla");

    renderPagina();

    await userEvent.click(screen.getByRole("button", { name: "Sair" }));

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(localStorage.getItem("TOKEN")).toBeNull();
    expect(localStorage.getItem("USUARIO")).toBeNull();
    expect(localStorage.getItem("NOME_USUARIO")).toBeNull();
  });
});
