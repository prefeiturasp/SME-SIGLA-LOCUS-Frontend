import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  CAMINHOS,
  caminhoAtualizacaoVacanciaServidor,
} from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { AtualizacaoVacancia } from "../index";
import { VacanciaServidor } from "../Servidor";

const RF_MARIA_CLARA = "8123417";
const SUGESTAO_MARIA_CLARA =
  "812.341.7 - Maria Clara Souza Ribeiro [CPF 628.493.157-04]";

function Casca() {
  const { pathname } = useLocation();

  return (
    <>
      <p>{pathname}</p>
      <Outlet />
    </>
  );
}

function renderNaRota() {
  return render(
    <ComProvedores rota={CAMINHOS.cadastroAtualizacaoVacancia}>
      <Routes>
        <Route element={<Casca />}>
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacancia}
            element={<AtualizacaoVacancia />}
          />
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacanciaServidor}
            element={<VacanciaServidor />}
          />
        </Route>
      </Routes>
    </ComProvedores>,
  );
}

function campoBusca(): HTMLElement {
  return screen.getByRole("combobox", { name: "Nome, RF ou CPF" });
}

async function buscar() {
  await userEvent.click(
    screen.getByRole("button", { name: "Buscar servidor" }),
  );
}

function sugestao(texto: string): Promise<HTMLElement> {
  return screen.findByText(
    (_, elemento) =>
      Boolean(elemento?.classList.contains("ant-select-item-option-content")) &&
      elemento?.textContent === texto,
  );
}

describe("AtualizacaoVacancia", () => {
  it("abre a ficha ao buscar um RF existente", async () => {
    renderNaRota();

    await userEvent.type(campoBusca(), RF_MARIA_CLARA);
    await buscar();

    expect(
      await screen.findByText(caminhoAtualizacaoVacanciaServidor(RF_MARIA_CLARA)),
    ).toBeInTheDocument();
  });

  it("abre a ficha pelo RF da sugestao escolhida", async () => {
    renderNaRota();

    await userEvent.type(campoBusca(), "Maria Clara");
    await userEvent.click(await sugestao(SUGESTAO_MARIA_CLARA));
    await buscar();

    expect(
      await screen.findByText(caminhoAtualizacaoVacanciaServidor(RF_MARIA_CLARA)),
    ).toBeInTheDocument();
  });

  it("avisa quando ninguem e encontrado e esconde o aviso ao alterar o termo", async () => {
    renderNaRota();

    await userEvent.type(campoBusca(), "zzz");
    await buscar();

    expect(
      await screen.findByText("Não encontramos nenhuma pessoa"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CAMINHOS.cadastroAtualizacaoVacancia),
    ).toBeInTheDocument();

    await userEvent.type(campoBusca(), "z");

    expect(
      screen.queryByText("Não encontramos nenhuma pessoa"),
    ).not.toBeInTheDocument();
  });
});
