import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { reiniciarModulosSalvos } from "@/dados/unidadesEducacionais";
import { ComProvedores } from "@/testes/renderizarComTema";
import { DetalheUnidadeEducacional } from "../index";

const ESPERA = { timeout: 5000 };

function renderNaCasca(codigo = "091488") {
  return render(
    <ComProvedores rota={`/cadastro/unidade-educacional/${codigo}`}>
      <Routes>
        <Route element={<LayoutBase />}>
          <Route
            path={CAMINHOS.cadastroDetalheUE}
            element={<DetalheUnidadeEducacional />}
          />
        </Route>
      </Routes>
    </ComProvedores>,
  );
}

describe("DetalheUnidadeEducacional (integração com a casca)", () => {
  beforeEach(() => reiniciarModulosSalvos());

  it("renderiza cabecalho, subtitulo e cartoes dentro do layout", async () => {
    renderNaCasca();

    expect(
      await screen.findByRole(
        "heading",
        { name: "CECI Cidade Tiradentes" },
        ESPERA,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("DRE Itaquera | Código 091488"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Informações da unidade educacional"),
    ).toBeInTheDocument();
    const informacoes = screen
      .getByText("Informações da unidade educacional")
      .closest(".ant-card") as HTMLElement;
    expect(within(informacoes).getByText("Módulos")).toBeInTheDocument();
    expect(within(informacoes).getByText("Lotação")).toBeInTheDocument();
    expect(within(informacoes).getByText("Afastados")).toBeInTheDocument();
    expect(within(informacoes).getByText("Vagas")).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(within(breadcrumb).getByText("Início")).toBeInTheDocument();
    expect(within(breadcrumb).getByText("Cadastro")).toBeInTheDocument();
    expect(
      within(breadcrumb).getByText("Unidade Educacional"),
    ).toBeInTheDocument();
  });

  it("mantem Salvar desabilitado ate existir alteracao", async () => {
    renderNaCasca();

    const salvar = await screen.findByRole(
      "button",
      { name: "Salvar" },
      ESPERA,
    );
    expect(salvar).toBeDisabled();

    const campoArte = await screen.findByLabelText(
      "Módulo de Arte",
      {},
      ESPERA,
    );
    await userEvent.clear(campoArte);
    await userEvent.type(campoArte, "9");

    await waitFor(() => expect(salvar).toBeEnabled());
  });

  it("exibe o estado de nao encontrada para codigo inexistente", async () => {
    renderNaCasca("999999");

    expect(
      await screen.findByText("Unidade educacional não encontrada", {}, ESPERA),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Voltar para a listagem" }),
    ).toBeInTheDocument();
  });
});
