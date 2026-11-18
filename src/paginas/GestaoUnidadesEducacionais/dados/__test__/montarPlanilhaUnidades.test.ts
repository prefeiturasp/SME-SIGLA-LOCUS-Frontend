import type {
  PainelComponente,
  UnidadeEducacional,
} from "@/servicos/recursos/unidadesEducacionais/tipos";
import { estatisticasPainel, linhasUnidades } from "../dadosEstaticos";
import {
  montarAbaRelatorioUnidades,
  montarLinhasIndicadores,
  NOME_ABA_UNIDADES,
} from "../montarPlanilhaUnidades";

const CABECALHO_UNIDADES = [
  "Código de lotação",
  "Tipo",
  "Unidade Educacional",
  "DRE",
  "Módulo",
  "Lotação",
  "Afastados",
  "Vagas",
];

const PAINEL: PainelComponente = {
  componente: "Matemática",
  estatisticas: [
    { chave: "modulos", valor: 105, rotulo: "Módulos", legenda: "Vagas" },
    { chave: "lotacao", valor: 108, rotulo: "Lotação", legenda: "Lotados" },
  ],
};

const LINHAS_PAINEL = [
  ["Painel de informações por componente curricular"],
  ["Componente curricular", "Matemática"],
  [],
  ["Indicador", "Valor", "Descrição"],
  ["Módulos", 105, "Vagas"],
  ["Lotação", 108, "Lotados"],
  [],
  ["Unidades educacionais"],
];

function unidade(dados: Partial<UnidadeEducacional> = {}): UnidadeEducacional {
  return {
    codigoLotacao: "091488",
    tipo: "CECI",
    nome: "Cidade Tiradentes",
    dre: "Itaquera",
    modulo: 105,
    lotacao: 108,
    afastados: 8,
    saldoVagas: 5,
    ...dados,
  };
}

describe("montarLinhasIndicadores", () => {
  it("lista cada indicador com valor e descricao abaixo do cabecalho", () => {
    expect(montarLinhasIndicadores(PAINEL.estatisticas)).toEqual([
      ["Indicador", "Valor", "Descrição"],
      ["Módulos", 105, "Vagas"],
      ["Lotação", 108, "Lotados"],
    ]);
  });

  it("devolve so o cabecalho quando nao ha indicadores", () => {
    expect(montarLinhasIndicadores([])).toEqual([
      ["Indicador", "Valor", "Descrição"],
    ]);
  });
});

describe("montarAbaRelatorioUnidades", () => {
  it("gera a aba Unidades educacionais", () => {
    const aba = montarAbaRelatorioUnidades(PAINEL, [unidade()]);

    expect(aba.nome).toBe(NOME_ABA_UNIDADES);
    expect(NOME_ABA_UNIDADES).toBe("Unidades educacionais");
  });

  it("coloca o painel no topo e a tabela de unidades abaixo, com o texto de vagas da tela", () => {
    const aba = montarAbaRelatorioUnidades(PAINEL, [
      unidade(),
      unidade({
        codigoLotacao: "091977",
        nome: "Dom Paulo Evaristo Arns",
        dre: "São Miguel",
        modulo: 27,
        lotacao: 33,
        afastados: 2,
        saldoVagas: -4,
      }),
      unidade({ codigoLotacao: "093855", afastados: 0, saldoVagas: 0 }),
    ]);

    expect(aba.linhas).toEqual([
      ...LINHAS_PAINEL,
      CABECALHO_UNIDADES,
      [
        "091488",
        "CECI",
        "Cidade Tiradentes",
        "Itaquera",
        105,
        108,
        8,
        "+5 disponíveis",
      ],
      [
        "091977",
        "CECI",
        "Dom Paulo Evaristo Arns",
        "São Miguel",
        27,
        33,
        2,
        "-4 excedentes",
      ],
      [
        "093855",
        "CECI",
        "Cidade Tiradentes",
        "Itaquera",
        105,
        108,
        0,
        "Completo",
      ],
    ]);
  });

  it("mantem o codigo de lotacao como texto, preservando o zero a esquerda", () => {
    const aba = montarAbaRelatorioUnidades(PAINEL, [unidade()]);

    expect(aba.linhas[LINHAS_PAINEL.length + 1][0]).toBe("091488");
  });

  it("mantem o painel e o cabecalho da tabela quando nao ha unidades", () => {
    const aba = montarAbaRelatorioUnidades(PAINEL, []);

    expect(aba.linhas).toEqual([...LINHAS_PAINEL, CABECALHO_UNIDADES]);
  });

  it("gera o painel vazio quando nao ha painel", () => {
    const aba = montarAbaRelatorioUnidades(undefined, []);

    expect(aba.linhas).toEqual([
      ["Painel de informações por componente curricular"],
      ["Componente curricular", ""],
      [],
      ["Indicador", "Valor", "Descrição"],
      [],
      ["Unidades educacionais"],
      CABECALHO_UNIDADES,
    ]);
  });

  it("cobre todos os indicadores e unidades dos dados estaticos da tela", () => {
    const aba = montarAbaRelatorioUnidades(
      { componente: "Arte", estatisticas: estatisticasPainel },
      linhasUnidades,
    );

    expect(aba.linhas).toHaveLength(
      7 + estatisticasPainel.length + linhasUnidades.length,
    );
  });
});
