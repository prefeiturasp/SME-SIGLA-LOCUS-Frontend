import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { NaoEncontrado } from "../index";

function renderizar() {
  return render(
    <ComProvedores rota="/rota/que/nao/existe">
      <Routes>
        <Route path="*" element={<NaoEncontrado />} />
        <Route
          path={CAMINHOS.cadastroGestaoUnidades}
          element={<h1>Gestão das unidades educacionais (listagem)</h1>}
        />
      </Routes>
    </ComProvedores>,
  );
}

describe("NaoEncontrado", () => {
  it("mostra o titulo e a orientacao da pagina nao encontrada", () => {
    renderizar();

    expect(
      screen.getByText("Não encontramos esta página..."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A página que você procura não está disponível/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Volte à tela inicial para continuar/),
    ).toBeInTheDocument();
  });

  it("mostra o cabecalho da gestao de UEs", () => {
    renderizar();

    expect(
      screen.getByRole("heading", { name: "Gestão das unidades educacionais" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Registrar UE/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Exportar relatório/ }),
    ).toBeInTheDocument();
  });

  it("oferece o botao de ir para a tela inicial", () => {
    renderizar();

    expect(
      screen.getByRole("button", { name: /Ir para tela inicial/ }),
    ).toBeInTheDocument();
  });

  it("navega para a listagem ao clicar em ir para tela inicial", async () => {
    const usuario = userEvent.setup();
    renderizar();

    await usuario.click(
      screen.getByRole("button", { name: /Ir para tela inicial/ }),
    );

    expect(
      screen.getByText("Gestão das unidades educacionais (listagem)"),
    ).toBeInTheDocument();
  });
});
