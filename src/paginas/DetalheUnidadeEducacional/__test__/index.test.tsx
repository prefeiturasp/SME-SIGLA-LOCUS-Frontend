import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { reiniciarModulosSalvos } from "@/servicos/recursos/unidadesEducacionais";
import { ComProvedores } from "@/testes/renderizarComTema";
import { DetalheUnidadeEducacional } from "../index";

/**
 * A casca completa + query assincrona pode passar do 1s padrao do findBy*
 * quando a suite roda em paralelo.
 */
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

    // breadcrumb da casca resolvido pela rota com parametro
    const breadcrumb = document.querySelector(
      ".ant-breadcrumb",
    ) as HTMLElement;
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

    const campoArte = await screen.findByLabelText("Módulo de Arte", {}, ESPERA);
    await userEvent.clear(campoArte);
    await userEvent.type(campoArte, "9");

    await waitFor(() => expect(salvar).toBeEnabled());
  });

  // Os casos que verificavam a abertura do painel de lotacao e do modal de
  // exclusao foram removidos junto com a renderizacao desses overlays. Quando
  // eles voltarem a ser renderizados, os testes devem voltar tambem.


  it("exibe o estado de nao encontrada para codigo inexistente", async () => {
    renderNaCasca("999999");

    expect(
      await screen.findByText(
        "Unidade educacional não encontrada",
        {},
        ESPERA,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Voltar para a listagem" }),
    ).toBeInTheDocument();
  });
});
