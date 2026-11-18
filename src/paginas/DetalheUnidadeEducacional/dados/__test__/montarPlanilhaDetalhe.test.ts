import type {
  ComponenteCurricularDetalhe,
  DetalheUnidade,
} from "@/servicos/recursos/unidadesEducacionais/tipos";
import { montarLinhasAgrupadas } from "../../utilitarios";
import { componentesDetalhe, detalhesPorCodigo } from "../dadosEstaticos";
import {
  montarAbaRelatorioDetalhe,
  NOME_ABA_DETALHE,
} from "../montarPlanilhaDetalhe";

const CABECALHO_COMPONENTES = [
  "Componente curricular",
  "Módulo",
  "Lotação",
  "Afastados",
  "Vacâncias",
  "Vagas",
];

function componente(
  dados: Partial<ComponenteCurricularDetalhe>,
): ComponenteCurricularDetalhe {
  return {
    id: "arte",
    componente: "Arte",
    grupo: "baseComum",
    modulo: 3,
    lotacao: 5,
    afastados: 0,
    vacancias: 0,
    saldoVagas: -2,
    ...dados,
  };
}

const UNIDADE: DetalheUnidade = {
  codigoLotacao: "091977",
  tipo: "CECI",
  nome: "Dom Paulo Evaristo Arns",
  dre: "São Miguel",
  estatisticas: [
    { chave: "modulos", valor: 27, rotulo: "Módulos", legenda: "Previstas" },
    { chave: "vagas", valor: -4, rotulo: "Vagas", legenda: "Disponíveis" },
  ],
  componentes: [],
};

describe("montarAbaRelatorioDetalhe", () => {
  it("gera a aba Unidade educacional", () => {
    expect(montarAbaRelatorioDetalhe(UNIDADE, []).nome).toBe(NOME_ABA_DETALHE);
    expect(NOME_ABA_DETALHE).toBe("Unidade educacional");
  });

  it("coloca identificacao e painel no topo e a tabela agrupada abaixo", () => {
    const linhas = montarLinhasAgrupadas([
      componente({}),
      componente({
        id: "biologia",
        componente: "Biologia",
        modulo: 6,
        lotacao: 6,
        afastados: 2,
        saldoVagas: 2,
      }),
      componente({
        id: "ciencias",
        componente: "Ciências",
        modulo: 5,
        lotacao: 3,
        vacancias: 1,
        saldoVagas: 0,
      }),
      componente({
        id: "ingles",
        componente: "Inglês",
        grupo: "linguagensAdicionais",
        modulo: 4,
        lotacao: 8,
        afastados: 2,
        vacancias: 1,
        saldoVagas: -1,
      }),
    ]);

    expect(montarAbaRelatorioDetalhe(UNIDADE, linhas).linhas).toEqual([
      ["Unidade educacional", "CECI Dom Paulo Evaristo Arns"],
      ["DRE", "São Miguel"],
      ["Código de lotação", "091977"],
      [],
      ["Informações da unidade educacional"],
      ["Indicador", "Valor", "Descrição"],
      ["Módulos", 27, "Previstas"],
      ["Vagas", -4, "Disponíveis"],
      [],
      ["Dados por componente curricular"],
      CABECALHO_COMPONENTES,
      ["Base comum"],
      ["Arte", 3, 5, 0, 0, "-2 excedentes"],
      ["Biologia", 6, 6, 2, 0, "+2 disponíveis"],
      ["Ciências", 5, 3, 0, 1, "Completo"],
      ["Linguagens adicionais"],
      ["Inglês", 4, 8, 2, 1, "-1 excedentes"],
    ]);
  });

  it("mantem painel e cabecalho da tabela quando o filtro nao retorna componentes", () => {
    expect(montarAbaRelatorioDetalhe(UNIDADE, []).linhas.slice(-2)).toEqual([
      ["Dados por componente curricular"],
      CABECALHO_COMPONENTES,
    ]);
  });

  it("omite a identificacao e deixa o painel sem indicadores quando nao ha unidade", () => {
    expect(montarAbaRelatorioDetalhe(undefined, []).linhas).toEqual([
      ["Informações da unidade educacional"],
      ["Indicador", "Valor", "Descrição"],
      [],
      ["Dados por componente curricular"],
      CABECALHO_COMPONENTES,
    ]);
  });

  it("cobre os indicadores e todos os componentes dos dados estaticos da tela", () => {
    const unidade = detalhesPorCodigo["091488"];
    const linhas = montarLinhasAgrupadas(componentesDetalhe);
    const aba = montarAbaRelatorioDetalhe(unidade, linhas);

    expect(aba.linhas.slice(5, 10)).toEqual([
      ["Indicador", "Valor", "Descrição"],
      ["Módulos", 105, "Quantidade de vagas disponibilizadas"],
      ["Lotação", 108, "Quantidade de professores alocados"],
      ["Afastados", 8, "Quantidade de afastamentos temporários"],
      ["Vagas", 5, "Quantidade de vagas ainda disponíveis"],
    ]);
    expect(aba.linhas).toHaveLength(13 + linhas.length);
  });
});
