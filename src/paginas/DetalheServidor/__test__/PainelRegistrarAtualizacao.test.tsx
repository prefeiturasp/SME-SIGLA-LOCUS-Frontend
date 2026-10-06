import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import {
  CAMINHOS,
  caminhoAtualizacaoRegistroFuncional,
} from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import {
  opcoesMotivoAtualizacao,
  servidorEstatico,
} from "../dados/dadosEstaticos";
import { DetalheServidor } from "../index";

function renderPagina() {
  return render(
    <ComProvedores
      rota={caminhoAtualizacaoRegistroFuncional(
        servidorEstatico.registroFuncional,
      )}
    >
      <Routes>
        <Route
          path={CAMINHOS.cadastroAtualizacaoRegistroFuncional}
          element={<DetalheServidor />}
        />
      </Routes>
    </ComProvedores>,
  );
}

async function abrirPainel(usuario: UserEvent): Promise<HTMLElement> {
  await usuario.click(screen.getByRole("button", { name: "Nova atualização" }));
  return screen.findByRole("dialog");
}

function campoMotivo(): HTMLElement {
  return screen.getByRole("combobox", { name: "Motivo da atualização" });
}

function opcaoMotivo(texto: string): Promise<HTMLElement> {
  return screen.findByText(
    (_, elemento) =>
      Boolean(elemento?.classList.contains("ant-select-item-option-content")) &&
      elemento?.textContent === texto,
  );
}

async function escolherMotivo(usuario: UserEvent, motivo: string) {
  await usuario.click(campoMotivo());
  await usuario.type(campoMotivo(), motivo);
  await usuario.click(await opcaoMotivo(motivo));
}

async function informarData(usuario: UserEvent, data: string) {
  const campo = screen.getByLabelText("Data do documento");
  await usuario.click(campo);
  await usuario.type(campo, data);
  await usuario.keyboard("{Enter}");
}

async function registrar(usuario: UserEvent) {
  await usuario.click(
    screen.getByRole("button", { name: "Registrar atualização" }),
  );
}

async function esperarPainelFechar() {
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
}

describe("opcoesMotivoAtualizacao", () => {
  it("lista os 94 motivos sem repeticao, na ordem do prototipo", () => {
    const rotulos = opcoesMotivoAtualizacao.map((opcao) => opcao.label);

    expect(rotulos).toHaveLength(94);
    expect(new Set(rotulos).size).toBe(94);
    expect(rotulos[0]).toBe("Afastamento por cargo eletivo");
    expect(rotulos[93]).toBe("Trabalho readaptação funcional");
  });
});

describe("PainelRegistrarAtualizacao", () => {
  it("comeca fechado e abre ao clicar em Nova atualizacao", async () => {
    const usuario = userEvent.setup();
    renderPagina();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const painel = await abrirPainel(usuario);

    expect(
      within(painel).getByText("Registrar atualização", {
        selector: ".ant-drawer-title",
      }),
    ).toBeInTheDocument();
    expect(
      within(painel).getByText(
        "Informe o motivo e a data do documento para registrar as alterações no histórico.",
      ),
    ).toBeInTheDocument();
    expect(campoMotivo()).toBeInTheDocument();
    expect(within(painel).getByText("Selecione")).toBeInTheDocument();
    expect(screen.getByLabelText("Data do documento")).toHaveAttribute(
      "placeholder",
      "00/00/0000",
    );
    expect(screen.getByLabelText("Documento (opcional)")).toHaveAttribute(
      "placeholder",
      "Exemplo: Portaria nº 123/2026",
    );
    expect(
      within(painel).getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(
      within(painel).getByRole("button", { name: "Registrar atualização" }),
    ).toBeInTheDocument();
  });

  it("exige motivo e data do documento ao registrar", async () => {
    const usuario = userEvent.setup();
    renderPagina();
    const painel = await abrirPainel(usuario);

    await registrar(usuario);

    expect(within(painel).getAllByText("Campo obrigatório")).toHaveLength(2);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("limpa o erro do motivo ao selecionar uma opcao", async () => {
    const usuario = userEvent.setup();
    renderPagina();
    const painel = await abrirPainel(usuario);
    await registrar(usuario);

    await escolherMotivo(usuario, "Falecimento");

    await waitFor(() =>
      expect(within(painel).getAllByText("Campo obrigatório")).toHaveLength(1),
    );
  });

  it("descarta o preenchido ao cancelar e reabre limpo", async () => {
    const usuario = userEvent.setup();
    renderPagina();
    const painel = await abrirPainel(usuario);
    await registrar(usuario);
    await usuario.type(
      screen.getByLabelText("Documento (opcional)"),
      "Portaria nº 1/2026",
    );

    await usuario.click(
      within(painel).getByRole("button", { name: "Cancelar" }),
    );
    await esperarPainelFechar();

    const reaberto = await abrirPainel(usuario);
    expect(screen.getByLabelText("Documento (opcional)")).toHaveValue("");
    expect(
      within(reaberto).queryByText("Campo obrigatório"),
    ).not.toBeInTheDocument();
  });

  it("fecha pelo botao Fechar do cabecalho", async () => {
    const usuario = userEvent.setup();
    renderPagina();
    const painel = await abrirPainel(usuario);

    await usuario.click(within(painel).getByRole("button", { name: "Fechar" }));

    await esperarPainelFechar();
  });

  it("notifica o sucesso e fecha quando motivo e data foram informados", async () => {
    const usuario = userEvent.setup();
    renderPagina();
    await abrirPainel(usuario);
    await escolherMotivo(usuario, "Falecimento");
    await informarData(usuario, "15/03/2026");

    await registrar(usuario);

    expect(
      await screen.findByText("A atualização foi registrada."),
    ).toBeInTheDocument();
    await esperarPainelFechar();
  });
});
