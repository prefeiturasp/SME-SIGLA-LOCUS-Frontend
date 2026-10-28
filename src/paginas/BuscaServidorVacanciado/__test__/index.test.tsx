import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  type InitialEntry,
} from "react-router-dom";
import { ROTULO_FECHAR_MODAL } from "@/componentes/ModalBase";
import { AtualizacaoServidorVacanciado } from "@/paginas/AtualizacaoServidorVacanciado";
import { BuscaServidorRF } from "@/paginas/BuscaServidorRF";
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
  const navigate = useNavigate();

  return (
    <>
      <p>{pathname}</p>
      <button type="button" onClick={() => navigate(-1)}>
        Voltar no histórico
      </button>
      <Outlet />
    </>
  );
}

function renderNaRota(
  rota: InitialEntry = CAMINHOS.cadastroAtualizacaoVacancia,
) {
  return render(
    <ComProvedores rota={rota}>
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
          <Route
            path={CAMINHOS.cadastroAtualizacaoRF}
            element={<BuscaServidorRF />}
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

describe("modal de perfil reativado", () => {
  const BUSCA_COM_RF_REATIVADO: InitialEntry = {
    pathname: CAMINHOS.cadastroAtualizacaoVacancia,
    state: { rfReativado: RF_GABRIEL },
  };

  function modalSucesso(): Promise<HTMLElement> {
    return screen.findByRole("dialog", { name: "Perfil reativado!" });
  }

  function aguardarFechar(): Promise<void> {
    return waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Perfil reativado!" }),
      ).not.toBeInTheDocument(),
    );
  }

  async function pesquisarPorRF() {
    await userEvent.click(
      within(await modalSucesso()).getByRole("button", {
        name: "Pesquisar por RF",
      }),
    );
    expect(
      await screen.findByText(CAMINHOS.cadastroAtualizacaoRF),
    ).toBeInTheDocument();
  }

  it("nao abre sem uma reativacao", () => {
    renderNaRota();

    expect(
      screen.queryByRole("dialog", { name: "Perfil reativado!" }),
    ).not.toBeInTheDocument();
  });

  it("abre ao chegar da reativacao e fecha sem sair da busca", async () => {
    renderNaRota(BUSCA_COM_RF_REATIVADO);
    const sucesso = await modalSucesso();

    expect(within(sucesso).getByText("“pesquisar por RF”").tagName).toBe(
      "STRONG",
    );

    await userEvent.click(
      within(sucesso).getByRole("button", { name: "Fechar" }),
    );

    await aguardarFechar();
    expect(
      screen.getByText(CAMINHOS.cadastroAtualizacaoVacancia),
    ).toBeInTheDocument();
  });

  it("fecha pelo X sem sair da busca", async () => {
    renderNaRota(BUSCA_COM_RF_REATIVADO);

    await userEvent.click(
      within(await modalSucesso()).getByRole("button", {
        name: ROTULO_FECHAR_MODAL,
      }),
    );

    await aguardarFechar();
    expect(
      screen.getByText(CAMINHOS.cadastroAtualizacaoVacancia),
    ).toBeInTheDocument();
  });

  it("leva para a busca por RF com o RF reativado preenchido", async () => {
    renderNaRota(BUSCA_COM_RF_REATIVADO);

    await pesquisarPorRF();

    expect(campoBusca()).toHaveValue(RF_GABRIEL);
  });

  it("nao reabre ao voltar da busca por RF", async () => {
    renderNaRota(BUSCA_COM_RF_REATIVADO);
    await pesquisarPorRF();

    await userEvent.click(
      screen.getByRole("button", { name: "Voltar no histórico" }),
    );

    expect(
      await screen.findByText(CAMINHOS.cadastroAtualizacaoVacancia),
    ).toBeInTheDocument();
    await aguardarFechar();
  });
});
