import {
  CAMINHOS,
  breadcrumbDaRota,
  caminhoDetalheUE,
  casarPadrao,
} from "../caminhos";

describe("caminhoDetalheUE", () => {
  it("substitui o parametro pelo codigo", () => {
    expect(caminhoDetalheUE("091488")).toBe(
      "/cadastro/unidade-educacional/091488",
    );
  });

  it("codifica codigos com caracteres especiais", () => {
    expect(caminhoDetalheUE("09/1488")).toBe(
      "/cadastro/unidade-educacional/09%2F1488",
    );
  });
});

describe("casarPadrao", () => {
  it("extrai os parametros quando o padrao casa", () => {
    expect(
      casarPadrao(
        CAMINHOS.cadastroDetalheUE,
        "/cadastro/unidade-educacional/091488",
      ),
    ).toEqual({ codigoLotacao: "091488" });
  });

  it("rejeita quando a quantidade de segmentos difere", () => {
    expect(
      casarPadrao(CAMINHOS.cadastroDetalheUE, "/cadastro/unidade-educacional"),
    ).toBeUndefined();
  });

  it("rejeita quando um segmento fixo difere", () => {
    expect(
      casarPadrao(CAMINHOS.cadastroDetalheUE, "/cadastro/outra-coisa/091488"),
    ).toBeUndefined();
  });
});

describe("breadcrumbDaRota", () => {
  it("mantem o lookup exato das rotas existentes", () => {
    expect(breadcrumbDaRota(CAMINHOS.cadastroGestaoUnidades)).toEqual([
      { titulo: "Início" },
      { titulo: "Cadastro", caminho: CAMINHOS.cadastroGestaoUnidades },
    ]);

    expect(breadcrumbDaRota(CAMINHOS.cadastroRegistrarUE).at(-1)).toEqual({
      titulo: "Registrar Unidade Educacional",
    });
  });

  it("resolve a rota de detalhe com parametro", () => {
    expect(breadcrumbDaRota("/cadastro/unidade-educacional/091488")).toEqual([
      { titulo: "Início" },
      { titulo: "Cadastro", caminho: CAMINHOS.cadastroGestaoUnidades },
      { titulo: "Unidade Educacional" },
    ]);
  });

  it("volta ao fallback em rota desconhecida", () => {
    expect(breadcrumbDaRota("/rota/inexistente")).toEqual([
      { titulo: "Início" },
    ]);
  });
});
