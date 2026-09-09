import {
  consultarLotacao,
  excluirUnidade,
  registrar,
  reiniciarModulosSalvos,
  salvarModulos,
  unidadesEducacionaisDetalheServico,
  unidadesEducacionaisServico,
} from "@/dados/unidadesEducacionais";
import {
  dadosLotacaoConsultaSchema,
  detalheUnidadeSchema,
  LotacaoNaoEncontradaError,
  payloadSalvarModulosSchema,
  respostaListagemSchema,
  respostaRegistrarUnidadeSchema,
  UnidadeNaoEncontradaError,
} from "@/tipos/unidadesEducacionais";
import {
  TOTAL_REGISTROS,
  TAMANHO_PAGINA,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

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
  it("retorna os dados estaticos da lotacao", async () => {
    const dados = await consultarLotacao("123");

    expect(() => dadosLotacaoConsultaSchema.parse(dados)).not.toThrow();
    expect(dados).toEqual({
      codigoLotacao: "123",
      tipoUnidade: "EMEF",
      dre: "itaquera",
      nome: "EMEF Prof. Maria da Silva",
    });
  });

  it("rejeita codigo inexistente com LotacaoNaoEncontradaError", async () => {
    await expect(consultarLotacao("999")).rejects.toBeInstanceOf(
      LotacaoNaoEncontradaError,
    );
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

  it("registra e devolve a resposta de sucesso", async () => {
    const dados = await registrar(payloadValido);

    expect(() => respostaRegistrarUnidadeSchema.parse(dados)).not.toThrow();
    expect(dados.sucesso).toBe(true);
  });

  it("rejeita quando a URL tem ?erro=1 (demo do toast de erro)", async () => {
    window.history.replaceState({}, "", "/?erro=1");

    await expect(registrar(payloadValido)).rejects.toThrow(
      "Erro simulado no registro da UE",
    );
  });
});

describe("detalhe da unidade educacional", () => {
  beforeEach(() => reiniciarModulosSalvos());

  it("resolve um detalhe valido pelo codigo de lotacao", async () => {
    const detalhe =
      await unidadesEducacionaisDetalheServico.obterDetalhe("091488");

    expect(() => detalheUnidadeSchema.parse(detalhe)).not.toThrow();
    expect(detalhe.nome).toBe("Cidade Tiradentes");
    expect(detalhe.componentes).toHaveLength(22);
  });

  it("rejeita codigo inexistente com UnidadeNaoEncontradaError", async () => {
    await expect(
      unidadesEducacionaisDetalheServico.obterDetalhe("999999"),
    ).rejects.toBeInstanceOf(UnidadeNaoEncontradaError);
  });

  it("persiste os modulos salvos e recalcula as vagas", async () => {
    const antes =
      await unidadesEducacionaisDetalheServico.obterDetalhe("091488");
    const arteAntes = antes.componentes.find((c) => c.id === "arte");
    expect(arteAntes).toMatchObject({ modulo: 3, saldoVagas: -2 });

    await salvarModulos({
      codigoLotacao: "091488",
      alteracoes: [{ componenteId: "arte", modulo: 6 }],
    });

    const depois =
      await unidadesEducacionaisDetalheServico.obterDetalhe("091488");
    const arteDepois = depois.componentes.find((c) => c.id === "arte");
    expect(arteDepois).toMatchObject({ modulo: 6, saldoVagas: 1 });
  });

  it("nao aplica os modulos salvos na versao historica", async () => {
    await salvarModulos({
      codigoLotacao: "091488",
      alteracoes: [{ componenteId: "arte", modulo: 6 }],
    });

    const versao =
      await unidadesEducacionaisDetalheServico.obterVersaoHistorica(
        "091488",
        "h1",
      );

    expect(versao.componentes.find((c) => c.id === "arte")?.modulo).toBe(3);
  });

  it("recusa payload de salvamento sem alteracoes", () => {
    expect(() =>
      payloadSalvarModulosSchema.parse({
        codigoLotacao: "091488",
        alteracoes: [],
      }),
    ).toThrow();
  });

  it("exclui uma unidade existente e rejeita uma inexistente", async () => {
    await expect(excluirUnidade("091488")).resolves.toMatchObject({
      sucesso: true,
    });

    await expect(excluirUnidade("999999")).rejects.toBeInstanceOf(
      UnidadeNaoEncontradaError,
    );
  });

  it("lista professores lotados, afastados e o historico", async () => {
    const lotados =
      await unidadesEducacionaisDetalheServico.listarProfessoresLotados(
        "091488",
        "arte",
      );
    expect(lotados[0]).toMatchObject({ nome: "João da Silva" });

    const afastados =
      await unidadesEducacionaisDetalheServico.listarProfessoresAfastados(
        "091488",
        "biologia",
      );
    expect(afastados).toHaveLength(2);

    const historico =
      await unidadesEducacionaisDetalheServico.listarHistorico("091488");
    expect(historico).toHaveLength(3);
  });
});
