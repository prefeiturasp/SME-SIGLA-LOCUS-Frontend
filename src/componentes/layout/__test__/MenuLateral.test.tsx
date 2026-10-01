import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { MenuLateral } from "../MenuLateral";
import { ComTema } from "@/testes/renderizarComTema";

const ROTA_GESTAO = "/cadastro/gestao-unidades-educacionais";
const ROTA_RF = "/cadastro/atualizacao/registro-funcional";

function renderComRota(rota: string) {
  return render(
    <ComTema>
      <MemoryRouter initialEntries={[rota]}>
        <MenuLateral />
        <Link to="/cadastro/registrar-unidade-educacional">Link externo</Link>
        <Link to={ROTA_GESTAO}>Link para gestão</Link>
        <Routes>
          <Route path={ROTA_GESTAO} element={<p>Tela de gestão</p>} />
          <Route path={ROTA_RF} element={<p>Tela de atualização por RF</p>} />
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>
    </ComTema>,
  );
}

function itemDoMenu(rotulo: string): HTMLElement {
  return screen.getByRole("menuitem", { name: rotulo });
}

function painelAberto(): boolean {
  return document.querySelector(".ant-drawer-open") !== null;
}

describe("MenuLateral", () => {
  it("renderiza a logo LOCUS e os sete itens, com Início primeiro", async () => {
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

  it("usa o tema escuro do antd, que pinta o item ativo de azul", async () => {
    renderComRota(ROTA_GESTAO);

    await screen.findAllByRole("menuitem");
    const menu = document.querySelector(".ant-layout-sider ul.ant-menu-root");
    expect(menu).toHaveClass("ant-menu-dark");
  });

  it("destaca Início na Gestão das unidades educacionais", async () => {
    renderComRota(ROTA_GESTAO);

    await waitFor(() => {
      expect(itemDoMenu("Início").className).toMatch(/selected/);
    });
    expect(itemDoMenu("Cadastro").className).not.toMatch(/selected/);
  });

  it("destaca Cadastro na tela de atualização por RF", async () => {
    renderComRota(ROTA_RF);

    await waitFor(() => {
      expect(itemDoMenu("Cadastro").className).toMatch(/selected/);
    });
    expect(itemDoMenu("Início").className).not.toMatch(/selected/);
  });

  it("nao destaca Início nem Cadastro em outra seção", async () => {
    renderComRota("/vagas/listagem");

    await waitFor(() => {
      expect(itemDoMenu("Vagas")).toBeInTheDocument();
    });
    expect(itemDoMenu("Início").className).not.toMatch(/selected/);
    expect(itemDoMenu("Cadastro").className).not.toMatch(/selected/);
  });

  it("navega para a Gestão das unidades educacionais pelo Início", async () => {
    renderComRota(ROTA_RF);

    await userEvent.click(itemDoMenu("Início"));

    expect(await screen.findByText("Tela de gestão")).toBeInTheDocument();
  });

  it("abre o painel de Cadastro sem navegar e destaca Cadastro", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(itemDoMenu("Cadastro"));

    expect(await screen.findByText("Inclusão")).toBeInTheDocument();
    expect(screen.getByText("Atualização")).toBeInTheDocument();
    expect(screen.getByText("Classificação")).toBeInTheDocument();
    expect(screen.getByText("Tela de gestão")).toBeInTheDocument();
    expect(itemDoMenu("Cadastro").className).toMatch(/selected/);
    expect(itemDoMenu("Início").className).not.toMatch(/selected/);
  });

  it("fecha o painel no segundo clique e volta a destacar o item da rota", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(itemDoMenu("Cadastro"));
    await screen.findByText("Atualização");
    await userEvent.click(itemDoMenu("Cadastro"));

    await waitFor(() => expect(painelAberto()).toBe(false));
    expect(itemDoMenu("Início").className).toMatch(/selected/);
  });

  it("navega por Atualização > Por registro funcional (RF) e fecha o painel", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(itemDoMenu("Cadastro"));
    await userEvent.click(await screen.findByText("Atualização"));
    await userEvent.click(
      await screen.findByText("Por registro funcional (RF)"),
    );

    expect(
      await screen.findByText("Tela de atualização por RF"),
    ).toBeInTheDocument();
    await waitFor(() => expect(painelAberto()).toBe(false));
  });

  it("nao reabre o painel ao voltar para a rota em que ele foi aberto", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(itemDoMenu("Cadastro"));
    await screen.findByText("Atualização");
    await userEvent.click(screen.getByText("Link externo"));
    await waitFor(() => expect(painelAberto()).toBe(false));
    await userEvent.click(screen.getByText("Link para gestão"));

    expect(await screen.findByText("Tela de gestão")).toBeInTheDocument();
    expect(painelAberto()).toBe(false);
  });

  it("fecha o painel quando a rota muda fora do menu", async () => {
    renderComRota(ROTA_GESTAO);

    await userEvent.click(itemDoMenu("Cadastro"));
    await screen.findByText("Atualização");
    await userEvent.click(screen.getByText("Link externo"));

    await waitFor(() => expect(painelAberto()).toBe(false));
  });
});
