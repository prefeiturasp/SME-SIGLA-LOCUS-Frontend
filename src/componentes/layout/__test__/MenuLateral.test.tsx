import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { encerrarSessao } from "@/servicos/recursos/autenticacao";
import { ComTema } from "@/testes/renderizarComTema";
import { MenuLateral } from "../MenuLateral";

jest.mock("@/servicos/recursos/autenticacao", () => ({
  encerrarSessao: jest.fn(),
}));

const ROTA_GESTAO = "/cadastro/gestao-unidades-educacionais";
const ROTA_REGISTRAR = "/cadastro/registrar-unidade-educacional";
const ROTA_RF = "/cadastro/atualizacao/registro-funcional";
const SELECIONADO = "ant-menu-item-selected";

function renderComRota(rota: string) {
  return render(
    <ComTema>
      <MemoryRouter initialEntries={[rota]}>
        <MenuLateral />
        <Link to={ROTA_REGISTRAR}>Ir para registrar</Link>
        <Link to={ROTA_GESTAO}>Ir para gestão</Link>
        <Routes>
          <Route path={ROTA_GESTAO} element={<p>Tela de gestão</p>} />
          <Route path={ROTA_REGISTRAR} element={<p>Tela de registrar</p>} />
          <Route path={ROTA_RF} element={<p>Tela de atualização por RF</p>} />
        </Routes>
      </MemoryRouter>
    </ComTema>,
  );
}

function itemDoMenu(rotulo: string): HTMLElement {
  return screen.getByRole("menuitem", { name: rotulo });
}

function painel(): HTMLElement | null {
  return document.querySelector(".ant-drawer-open");
}

async function abrirPainelCadastro() {
  await userEvent.click(itemDoMenu("Cadastro"));
  await waitFor(() => expect(painel()).toBeInTheDocument());
}

describe("MenuLateral", () => {
  it("renderiza a logo e os sete itens, com Início primeiro", async () => {
    renderComRota(ROTA_GESTAO);

    expect(screen.getByRole("img", { name: "Locus" })).toBeInTheDocument();
    const itens = await screen.findAllByRole("menuitem");
    expect(itens.map((item) => item.textContent)).toEqual([
      "Início",
      "Cadastro",
      "Relatórios consultas",
      "Data base",
      "Vagas",
      "Remoção",
      "Integração",
    ]);
  });

  it("habilita so Início e Cadastro, os unicos com destino", () => {
    renderComRota(ROTA_GESTAO);

    expect(itemDoMenu("Início")).not.toHaveAttribute("aria-disabled", "true");
    expect(itemDoMenu("Cadastro")).not.toHaveAttribute("aria-disabled", "true");
    [
      "Relatórios consultas",
      "Data base",
      "Vagas",
      "Remoção",
      "Integração",
    ].forEach((rotulo) =>
      expect(itemDoMenu(rotulo)).toHaveAttribute("aria-disabled", "true"),
    );
  });

  it("aplica o tema escuro ao menu", () => {
    renderComRota(ROTA_GESTAO);

    expect(screen.getByRole("menu")).toHaveClass("ant-menu-dark");
  });

  it("seleciona apenas o item da rota atual", () => {
    renderComRota(ROTA_RF);

    expect(itemDoMenu("Cadastro")).toHaveClass(SELECIONADO);
    expect(document.querySelectorAll(`.${SELECIONADO}`)).toHaveLength(1);
  });

  it("vai para a Gestão das UEs pelo Início e passa a seleciona-lo", async () => {
    renderComRota(ROTA_RF);

    await userEvent.click(itemDoMenu("Início"));

    expect(await screen.findByText("Tela de gestão")).toBeInTheDocument();
    expect(itemDoMenu("Início")).toHaveClass(SELECIONADO);
    expect(itemDoMenu("Cadastro")).not.toHaveClass(SELECIONADO);
    expect(painel()).not.toBeInTheDocument();
  });

  it("abre o painel de Cadastro sem sair da tela e move a selecao para Cadastro", async () => {
    renderComRota(ROTA_GESTAO);

    await abrirPainelCadastro();

    expect(painel()).toHaveTextContent("Cadastro");
    expect(painel()).toHaveTextContent("Atualização");
    expect(screen.getByText("Tela de gestão")).toBeInTheDocument();
    expect(itemDoMenu("Cadastro")).toHaveClass(SELECIONADO);
    expect(itemDoMenu("Início")).not.toHaveClass(SELECIONADO);
  });

  it("fecha o painel no segundo clique e devolve a selecao ao item da rota", async () => {
    renderComRota(ROTA_GESTAO);
    await abrirPainelCadastro();

    await userEvent.click(itemDoMenu("Cadastro"));

    await waitFor(() => expect(painel()).not.toBeInTheDocument());
    expect(itemDoMenu("Início")).toHaveClass(SELECIONADO);
    expect(itemDoMenu("Cadastro")).not.toHaveClass(SELECIONADO);
  });

  it("vai para a tela de RF por Atualização > Por registro funcional (RF) e fecha o painel", async () => {
    renderComRota(ROTA_GESTAO);
    await abrirPainelCadastro();

    await userEvent.click(screen.getByText("Atualização"));
    await userEvent.click(
      await screen.findByText("Por registro funcional (RF)"),
    );

    expect(
      await screen.findByText("Tela de atualização por RF"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Tela de gestão")).not.toBeInTheDocument();
    await waitFor(() => expect(painel()).not.toBeInTheDocument());
    expect(itemDoMenu("Cadastro")).toHaveClass(SELECIONADO);
  });

  it("reabre o painel na tela de RF com o item da tela ja selecionado", async () => {
    renderComRota(ROTA_RF);

    await abrirPainelCadastro();

    expect(
      screen
        .getByText("Por registro funcional (RF)")
        .closest('[role="menuitem"]'),
    ).toHaveClass(SELECIONADO);
  });

  it("fecha o painel ao escolher o subitem da tela em que ja esta", async () => {
    renderComRota(ROTA_RF);
    await abrirPainelCadastro();

    await userEvent.click(screen.getByText("Por registro funcional (RF)"));

    await waitFor(() => expect(painel()).not.toBeInTheDocument());
    expect(screen.getByText("Tela de atualização por RF")).toBeInTheDocument();
  });

  it("fecha o painel quando a rota muda por fora do menu e nao o reabre ao voltar", async () => {
    renderComRota(ROTA_GESTAO);
    await abrirPainelCadastro();

    await userEvent.click(screen.getByText("Ir para registrar"));

    expect(await screen.findByText("Tela de registrar")).toBeInTheDocument();
    await waitFor(() => expect(painel()).not.toBeInTheDocument());

    await userEvent.click(screen.getByText("Ir para gestão"));

    expect(await screen.findByText("Tela de gestão")).toBeInTheDocument();
    expect(painel()).not.toBeInTheDocument();
  });

  it("encerra a sessao pelo botao Sair", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(screen.getByRole("button", { name: "Sair" }));

    expect(encerrarSessao).toHaveBeenCalledTimes(1);
  });
});
