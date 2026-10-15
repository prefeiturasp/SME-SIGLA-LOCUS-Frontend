import {
  CAMINHOS,
  breadcrumbDaRota,
  caminhoAtualizacaoRegistroFuncional,
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
  const INICIO_COM_LINK = {
    titulo: "Início",
    caminho: "/cadastro/gestao-unidades-educacionais",
  };

  it("mostra so Inicio na Gestao das UEs, que e a tela inicial", () => {
    expect(breadcrumbDaRota(CAMINHOS.cadastroGestaoUnidades)).toEqual([
      { titulo: "Início" },
    ]);
  });

  it("liga Inicio a Gestao das UEs no registro de UE", () => {
    expect(breadcrumbDaRota(CAMINHOS.cadastroRegistrarUE)).toEqual([
      INICIO_COM_LINK,
      { titulo: "Registrar Unidade Educacional" },
    ]);
  });

  it("resolve a rota de detalhe com parametro", () => {
    expect(breadcrumbDaRota("/cadastro/unidade-educacional/091488")).toEqual([
      INICIO_COM_LINK,
      { titulo: "Unidade Educacional" },
    ]);
  });

  it("nomeia a rota de atualizacao por registro funcional", () => {
    expect(breadcrumbDaRota(CAMINHOS.cadastroAtualizacaoRF)).toEqual([
      INICIO_COM_LINK,
      { titulo: "Cadastro" },
      { titulo: "Atualização" },
      { titulo: "Por registro funcional (RF)" },
    ]);
  });

  it("resolve a atualizacao pelo RF da pessoa servidora", () => {
    expect(caminhoAtualizacaoRegistroFuncional("123.456.7")).toBe(
      "/cadastro/atualizacao/registro-funcional/123.456.7",
    );

    expect(
      breadcrumbDaRota(caminhoAtualizacaoRegistroFuncional("123.456.7")),
    ).toEqual([
      INICIO_COM_LINK,
      { titulo: "Cadastro" },
      { titulo: "Atualização" },
      { titulo: "Por registro funcional (RF)" },
    ]);
  });

  it("nomeia a rota de pagina nao encontrada", () => {
    expect(breadcrumbDaRota(CAMINHOS.naoEncontrado)).toEqual([
      INICIO_COM_LINK,
      { titulo: "Página não encontrada" },
    ]);
  });

  it("volta ao fallback em rota desconhecida", () => {
    expect(breadcrumbDaRota("/rota/inexistente")).toEqual([
      { titulo: "Início" },
    ]);
  });
});
