import {
  ITENS_MENU,
  localizarSubitemAtivo,
  menuItemAtivo,
  type SubitemMenu,
} from "../MenuLateral.itens";

function rotasDoSubmenu(itens: SubitemMenu[]): string[] {
  return itens.flatMap(({ path, filhos }) => [
    ...(path ? [path] : []),
    ...rotasDoSubmenu(filhos ?? []),
  ]);
}

function chavesDoSubmenu(itens: SubitemMenu[]): string[] {
  return itens.flatMap(({ key, filhos }) => [
    key,
    ...chavesDoSubmenu(filhos ?? []),
  ]);
}

const SUBMENU_CADASTRO =
  ITENS_MENU.find(({ key }) => key === "cadastro")?.submenu ?? [];

describe("menuItemAtivo", () => {
  it.each([
    ["/cadastro/gestao-unidades-educacionais", "inicio"],
    ["/cadastro/registrar-unidade-educacional", "inicio"],
    ["/cadastro/unidade-educacional/091488", "inicio"],
    ["/cadastro/atualizacao/registro-funcional", "cadastro"],
    ["/cadastro/rota-ainda-inexistente", "cadastro"],
    ["/vagas/listagem", "vagas"],
    ["/pagina-nao-encontrada", ""],
  ])("em %s ativa o item '%s'", (rota, chaveEsperada) => {
    expect(menuItemAtivo(rota)).toBe(chaveEsperada);
  });

  it("ativa o item dono do painel em todas as rotas do seu submenu", () => {
    const comSubmenu = ITENS_MENU.filter(({ submenu }) => submenu);

    expect(comSubmenu.length).toBeGreaterThan(0);
    comSubmenu.forEach(({ key, submenu = [] }) => {
      const rotas = rotasDoSubmenu(submenu);

      expect(rotas.length).toBeGreaterThan(0);
      rotas.forEach((rota) => expect(menuItemAtivo(rota)).toBe(key));
    });
  });
});

describe("ITENS_MENU", () => {
  it("nao repete chaves entre os itens e os subitens", () => {
    const chaves = ITENS_MENU.flatMap(({ key, submenu }) => [
      key,
      ...chavesDoSubmenu(submenu ?? []),
    ]);

    expect(new Set(chaves).size).toBe(chaves.length);
  });
});

describe("localizarSubitemAtivo", () => {
  it("localiza a tela de atualizacao por RF dentro do grupo Atualização", () => {
    expect(
      localizarSubitemAtivo(
        SUBMENU_CADASTRO,
        "/cadastro/atualizacao/registro-funcional",
      ),
    ).toEqual({
      chave: "cadastro-atualizacao-registro-funcional",
      chavesPais: ["cadastro-atualizacao"],
    });
  });

  it("acumula todos os grupos acima do subitem, do externo ao interno", () => {
    const itens: SubitemMenu[] = [
      {
        key: "externo",
        label: "Externo",
        filhos: [
          {
            key: "interno",
            label: "Interno",
            filhos: [{ key: "folha", label: "Folha", path: "/rota/folha" }],
          },
        ],
      },
    ];

    expect(localizarSubitemAtivo(itens, "/rota/folha")).toEqual({
      chave: "folha",
      chavesPais: ["externo", "interno"],
    });
  });

  it("localiza o subitem de primeiro nivel sem grupos acima", () => {
    const itens: SubitemMenu[] = [
      { key: "folha", label: "Folha", path: "/rota/folha" },
    ];

    expect(localizarSubitemAtivo(itens, "/rota/folha")).toEqual({
      chave: "folha",
      chavesPais: [],
    });
  });

  it.each([
    "/cadastro/atualizacao/registro-funcional/123",
    "/cadastro/atualizacao",
    "/cadastro/gestao-unidades-educacionais",
  ])("nao localiza subitem em %s", (rota) => {
    expect(localizarSubitemAtivo(SUBMENU_CADASTRO, rota)).toBeUndefined();
  });
});
