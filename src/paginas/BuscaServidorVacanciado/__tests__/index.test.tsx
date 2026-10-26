import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AtualizacaoServidorVacanciado } from "@/paginas/AtualizacaoServidorVacanciado";
import {
  CAMINHOS,
  caminhoAtualizacaoVacanciaServidor,
} from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { BuscaServidorVacanciado } from "../index";

const RF_GABRIEL = "1234567";
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
            element={<BuscaServidorVacanciado />}
          />
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacanciaServidor}
            element={<AtualizacaoServidorVacanciado />}
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

describe("BuscaServidorVacanciado", () => {
  it("abre a ficha ao buscar um RF existente", async () => {
    renderNaRota();

    await userEvent.type(campoBusca(), RF_GABRIEL);
    await buscar();

    expect(
      await screen.findByText(caminhoAtualizacaoVacanciaServidor(RF_GABRIEL)),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Vacância" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Gabriel Nascimento Arantes")).toBeInTheDocument();
    expect(screen.getByText("Vacanciado")).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: /Dados funcionais/ }),
    );
    expect(
      screen.getByRole("combobox", {
        name: "Situação funcional do cargo base",
      }),
    ).toBeDisabled();
    await userEvent.click(
      screen.getByRole("button", { name: /Lotação e exercício/ }),
    );
    expect(screen.getByText("Definitiva")).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("radio", { name: "Unidade de exercício" }),
    );
    expect(screen.getByText("Precária")).toBeInTheDocument();
    expect(screen.queryByText("Definitiva")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Nova atualização" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Encerramento do vínculo"),
    ).not.toBeInTheDocument();
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
