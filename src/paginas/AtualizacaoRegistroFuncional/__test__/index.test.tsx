import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { AtualizacaoRegistroFuncional } from "../index";

function renderNaCasca() {
  return render(
    <ComProvedores rota="/cadastro/atualizacao/registro-funcional">
      <Routes>
        <Route element={<LayoutBase />}>
          <Route
            path={CAMINHOS.cadastroAtualizacaoRF}
            element={<AtualizacaoRegistroFuncional />}
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

function textosDasSugestoes(): string[] {
  return [...document.querySelectorAll(".ant-select-item-option-content")].map(
    (opcao) => opcao.textContent ?? "",
  );
}

function sugestao(texto: string): Promise<HTMLElement> {
  return screen.findByText(
    (_, elemento) =>
      Boolean(elemento?.classList.contains("ant-select-item-option-content")) &&
      elemento?.textContent === texto,
  );
}

describe("AtualizacaoRegistroFuncional (integração com a casca)", () => {
  it("renderiza titulo, descricao, breadcrumb e o card de busca", () => {
    renderNaCasca();

    expect(
      screen.getByRole("heading", {
        name: "Atualização por registro funcional (RF)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Consulte ou atualize os dados funcionais de uma pessoa servidora.",
      ),
    ).toBeInTheDocument();

    const breadcrumb = document.querySelector(".ant-breadcrumb") as HTMLElement;
    expect(
      within(breadcrumb).getByText("Por registro funcional (RF)"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Buscar servidor" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Pesquise pelo nome, RF ou CPF para consultar o cadastro funcional.",
      ),
    ).toBeInTheDocument();
    expect(campoBusca()).toBeInTheDocument();
    expect(screen.getByText("Digite o nome, RF ou CPF...")).toBeInTheDocument();
  });

  it("sugere servidores ao digitar e poe o texto da sugestao no campo ao escolher", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "mar");

    const opcao = await sugestao(
      "812.341.7 - Maria Clara Souza Ribeiro [CPF 628.493.157-04]",
    );
    expect(
      await sugestao(
        "812.340.9 - Maria Aparecida dos Santos [CPF 517.382.046-03]",
      ),
    ).toBeInTheDocument();

    await userEvent.click(opcao);

    expect(campoBusca()).toHaveValue(
      "812.341.7 - Maria Clara Souza Ribeiro [CPF 628.493.157-04]",
    );
  });

  it("encontra o servidor escolhido na lista ao clicar em Buscar servidor", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "Gabriel Nascim");
    await userEvent.click(
      await sugestao(
        "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
      ),
    );
    expect(campoBusca()).toHaveValue(
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
    );
    await buscar();

    expect(
      screen.queryByText("Não encontramos nenhuma pessoa"),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector(".ant-form-item-explain-error"),
    ).not.toBeInTheDocument();
  });

  it("destaca em negrito o trecho digitado no nome", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "mar");

    const opcao = await sugestao(
      "812.341.7 - Maria Clara Souza Ribeiro [CPF 628.493.157-04]",
    );
    expect(within(opcao).getByText("Mar").tagName).toBe("STRONG");
    expect(opcao.querySelectorAll("strong")).toHaveLength(1);
  });

  it("destaca em negrito o inicio do RF digitado", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "1234");

    const opcao = await sugestao(
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
    );
    expect(within(opcao).getByText("123.4").tagName).toBe("STRONG");
    expect(opcao.querySelectorAll("strong")).toHaveLength(1);
  });

  it("destaca em negrito o inicio do CPF digitado, mesmo com mascara", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "045.7");

    const opcao = await sugestao(
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
    );
    expect(within(opcao).getByText("045.7").tagName).toBe("STRONG");
    expect(opcao.querySelectorAll("strong")).toHaveLength(1);
  });

  it("mostra o rotulo do campo com CPF em maiusculas", () => {
    renderNaCasca();

    expect(screen.getByText("Nome, RF ou CPF")).toBeInTheDocument();
  });

  it("lista as sugestoes do exemplo do Figma em ordem alfabetica", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "Gabriel Nascim");

    await sugestao(
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
    );
    expect(textosDasSugestoes().slice(0, 4)).toEqual([
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
      "134.567.8 - Gabriel Nascimento Bragança de Almeida [CPF 049.999.544-95]",
      "145.678.9 - Gabriel Nascimento Caruso Souza [CPF 054.215.380-70]",
      "156.789.0 - Gabriel Nascimento de Andrade [CPF 058.430.846-99]",
    ]);
  });

  it("exige o termo ao buscar", async () => {
    renderNaCasca();

    await buscar();

    expect(await screen.findByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("mostra o sad-locus quando nenhuma pessoa e encontrada", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "Gabriel Nascim0dhd@!#");
    await buscar();

    expect(
      await screen.findByText("Não encontramos nenhuma pessoa"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Verifique se os dados inseridos estão corretos e tente novamente.",
      ),
    ).toBeInTheDocument();
    expect(
      document.querySelector(".ant-form-item-explain-error"),
    ).not.toBeInTheDocument();
  });

  it("tira o sad-locus quando o termo e alterado", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "zzz");
    await buscar();
    await screen.findByText("Não encontramos nenhuma pessoa");
    await userEvent.type(campoBusca(), "z");

    expect(
      screen.queryByText("Não encontramos nenhuma pessoa"),
    ).not.toBeInTheDocument();
  });

  it("pede para escolher na lista quando varios servidores casam", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "maria");
    await buscar();

    expect(
      await screen.findByText(
        "Mais de um servidor encontrado. Selecione na lista.",
      ),
    ).toBeInTheDocument();
  });

  it("nao mostra erro quando o servidor e encontrado", async () => {
    renderNaCasca();

    await userEvent.type(campoBusca(), "8123417");
    await buscar();

    expect(
      screen.queryByText("Não encontramos nenhuma pessoa"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Campo obrigatório")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Mais de um servidor encontrado. Selecione na lista."),
    ).not.toBeInTheDocument();
  });
});
