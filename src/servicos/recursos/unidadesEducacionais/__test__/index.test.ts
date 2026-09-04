import {
  consultarLotacao,
  registrar,
  unidadesEducacionaisServico,
  URL,
} from "../index";
import {
  dadosLotacaoConsultaSchema,
  LotacaoNaoEncontradaError,
  respostaListagemSchema,
  respostaRegistrarUnidadeSchema,
} from "../tipos";
import {
  TOTAL_REGISTROS,
  TAMANHO_PAGINA,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

describe("URL Registrar UE", () => {
  it("monta as rotas de consulta e registro", () => {
    expect(URL.consultarLotacao("123")).toBe(
      "/api/v1/unidades-educacionais/lotacao/123/",
    );
    expect(URL.registrar()).toBe("/api/v1/unidades-educacionais/");
  });
});

describe("unidadesEducacionaisServico (mock Gestao)", () => {
  it("listar continua retornando dados estaticos", async () => {
    const resposta = await unidadesEducacionaisServico.listar();
    expect(() => respostaListagemSchema.parse(resposta)).not.toThrow();
    expect(resposta.itens).toHaveLength(10);
    expect(resposta.total).toBe(TOTAL_REGISTROS);
    expect(resposta.tamanhoPagina).toBe(TAMANHO_PAGINA);
  });
});

describe("consultarLotacao (padrao Alvo)", () => {
  it("retorna { response, abort } com dados mockados", async () => {
    const { response, abort } = consultarLotacao("123");
    const dados = await response;

    expect(typeof abort).toBe("function");
    expect(() => dadosLotacaoConsultaSchema.parse(dados)).not.toThrow();
    expect(dados).toEqual({
      codigoLotacao: "123",
      tipoUnidade: "EMEF",
      dre: "itaquera",
      nome: "EMEF Prof. Maria da Silva",
    });
  });

  it("rejeita codigo inexistente com LotacaoNaoEncontradaError", async () => {
    const { response } = consultarLotacao("999");
    await expect(response).rejects.toBeInstanceOf(LotacaoNaoEncontradaError);
  });
});

describe("registrar (padrao Alvo)", () => {
  const payloadValido = {
    codigoLotacao: "123",
    tipoUnidade: "EMEF",
    dre: "itaquera",
    nome: "EMEF Prof. Maria da Silva",
    escolaMunicipalizada: false,
    ensinoFundamentalI: false,
    ejaModular: false,
    saoPauloIntegral: false,
    contabilizarUE: true,
    componentes: [{ componente: "Arte", quantidadeModulos: 10 }],
  };

  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("retorna { response, abort } apos validar payload", async () => {
    const { response, abort } = registrar(payloadValido);
    const dados = await response;

    expect(typeof abort).toBe("function");
    expect(() => respostaRegistrarUnidadeSchema.parse(dados)).not.toThrow();
    expect(dados.sucesso).toBe(true);
  });

  it("rejeita quando a URL tem ?erro=1 (demo do toast de erro)", async () => {
    window.history.replaceState({}, "", "/?erro=1");

    const { response } = registrar(payloadValido);
    await expect(response).rejects.toThrow("Erro simulado no registro da UE");
  });
});
