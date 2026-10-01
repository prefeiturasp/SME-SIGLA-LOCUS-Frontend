import {
  localizarSubitemAtivo,
  menuItemAtivo,
  type SubitemMenu,
} from "../MenuLateral.itens";

describe("menuItemAtivo", () => {
  it.each([
    ["/cadastro/gestao-unidades-educacionais", "inicio"],
    ["/cadastro/registrar-unidade-educacional", "inicio"],
    ["/cadastro/unidade-educacional/091488", "inicio"],
    ["/cadastro/atualizacao/registro-funcional", "cadastro"],
    ["/vagas/listagem", "vagas"],
    ["/pagina-nao-encontrada", ""],
  ])("em %s ativa o item '%s'", (rota, chaveEsperada) => {
    expect(menuItemAtivo(rota)).toBe(chaveEsperada);
  });
});

describe("localizarSubitemAtivo", () => {
  const itens: SubitemMenu[] = [
    { key: "grupo-a", label: "A", filhos: [] },
    {
      key: "grupo-b",
      label: "B",
      filhos: [
        { key: "b-1", label: "B1" },
        { key: "b-2", label: "B2", path: "/rota/b2" },
      ],
    },
    { key: "folha-c", label: "C", path: "/rota/c" },
  ];

  it("devolve a chave do subitem e a do grupo acima dele", () => {
    expect(localizarSubitemAtivo(itens, "/rota/b2")).toEqual({
      chave: "b-2",
      chavesPais: ["grupo-b"],
    });
  });

  it("encontra a folha de primeiro nivel sem grupos acima", () => {
    expect(localizarSubitemAtivo(itens, "/rota/c")).toEqual({
      chave: "folha-c",
      chavesPais: [],
    });
  });

  it("nao casa rota que so comeca igual", () => {
    expect(localizarSubitemAtivo(itens, "/rota/c/detalhe")).toBeUndefined();
  });

  it("devolve undefined quando nenhuma rota casa", () => {
    expect(localizarSubitemAtivo(itens, "/outra")).toBeUndefined();
  });
});
