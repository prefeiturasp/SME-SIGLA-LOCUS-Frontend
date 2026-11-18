import type { AbaExportacaoXlsx, CelulaXlsx } from "@/hooks/useExportarXlsx";
import { textoSaldoVagas } from "@/servicos/recursos/unidadesEducacionais/textos";
import type {
  EstatisticaPainel,
  PainelComponente,
  UnidadeEducacional,
} from "@/servicos/recursos/unidadesEducacionais/tipos";

export const NOME_ABA_UNIDADES = "Unidades educacionais";

const CABECALHO_INDICADORES: CelulaXlsx[] = ["Indicador", "Valor", "Descrição"];

const CABECALHO_UNIDADES: CelulaXlsx[] = [
  "Código de lotação",
  "Tipo",
  "Unidade Educacional",
  "DRE",
  "Módulo",
  "Lotação",
  "Afastados",
  "Vagas",
];

export function montarLinhasIndicadores(
  estatisticas: readonly EstatisticaPainel[],
): CelulaXlsx[][] {
  return [
    CABECALHO_INDICADORES,
    ...estatisticas.map((estatistica) => [
      estatistica.rotulo,
      estatistica.valor,
      estatistica.legenda,
    ]),
  ];
}

export function montarAbaRelatorioUnidades(
  painel: PainelComponente | undefined,
  unidades: readonly UnidadeEducacional[],
): AbaExportacaoXlsx {
  const linhasUnidades = unidades.map((unidade) => [
    unidade.codigoLotacao,
    unidade.tipo,
    unidade.nome,
    unidade.dre,
    unidade.modulo,
    unidade.lotacao,
    unidade.afastados,
    textoSaldoVagas(unidade.saldoVagas),
  ]);

  return {
    nome: NOME_ABA_UNIDADES,
    linhas: [
      ["Painel de informações por componente curricular"],
      ["Componente curricular", painel?.componente ?? ""],
      [],
      ...montarLinhasIndicadores(painel?.estatisticas ?? []),
      [],
      ["Unidades educacionais"],
      CABECALHO_UNIDADES,
      ...linhasUnidades,
    ],
  };
}
