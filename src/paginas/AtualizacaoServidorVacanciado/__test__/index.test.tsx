import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { BuscaServidorVacanciado } from "@/paginas/BuscaServidorVacanciado";
import { CAMINHOS, caminhoAtualizacaoVacanciaServidor } from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { AtualizacaoServidorVacanciado } from "../index";

const RF_GABRIEL = "1234567";
const RF_INEXISTENTE = "0000000";

function Casca() {
  const { pathname } = useLocation();

  return (
    <>
      <p>{pathname}</p>
      <Outlet />
    </>
  );
}

function renderNaFicha(rf = RF_GABRIEL) {
  return render(
    <ComProvedores rota={caminhoAtualizacaoVacanciaServidor(rf)}>
      <Routes>
        <Route element={<Casca />}>
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacanciaServidor}
            element={<AtualizacaoServidorVacanciado />}
          />
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacancia}
            element={<BuscaServidorVacanciado />}
          />
        </Route>
      </Routes>
    </ComProvedores>,
  );
}

async function abrirConfirmacao(rf = RF_GABRIEL): Promise<HTMLElement> {
  renderNaFicha(rf);

  await userEvent.click(
    screen.getByRole("button", { name: "Reativar perfil" }),
  );

  return screen.findByRole("dialog", { name: "Reativar perfil" });
}

async function confirmarReativacao(confirmacao: HTMLElement) {
  await userEvent.click(
    within(confirmacao).getByRole("button", { name: "Reativar perfil" }),
  );
}

describe("AtualizacaoServidorVacanciado", () => {
  it("abre a confirmacao de reativacao e cancela sem sair da ficha", async () => {
    const confirmacao = await abrirConfirmacao();

    expect(
      within(confirmacao).getByText(
        "Este perfil está inativo por motivo de vacância. Ao reativar, o servidor será contabilizado entre os lotados da unidade educacional. Deseja reativar o perfil?",
      ),
    ).toBeInTheDocument();

    await userEvent.click(
      within(confirmacao).getByRole("button", { name: "Cancelar" }),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Reativar perfil" }),
      ).not.toBeInTheDocument(),
    );
    expect(
      screen.getByText(caminhoAtualizacaoVacanciaServidor(RF_GABRIEL)),
    ).toBeInTheDocument();
  });

  it("reativa o perfil e mostra o sucesso na busca de vacancia", async () => {
    await confirmarReativacao(await abrirConfirmacao());

    expect(
      await screen.findByRole("dialog", { name: "Perfil reativado!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CAMINHOS.cadastroAtualizacaoVacancia),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "Reativar perfil" }),
    ).not.toBeInTheDocument();
  });

  it("mantem a confirmacao aberta quando a reativacao falha", async () => {
    await confirmarReativacao(await abrirConfirmacao(RF_INEXISTENTE));

    expect(
      await screen.findByText(
        "Não conseguimos reativar o perfil. Por favor, tente novamente!",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("dialog", { name: "Reativar perfil" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(caminhoAtualizacaoVacanciaServidor(RF_INEXISTENTE)),
    ).toBeInTheDocument();
  });
});
