import type { AbaExportacaoXlsx, CelulaXlsx } from "@/hooks/useExportarXlsx";
import { textoSaldoVagas } from "@/servicos/recursos/unidadesEducacionais/textos";
import type { UnidadeEducacional } from "@/servicos/recursos/unidadesEducacionais/tipos";

export const NOME_ABA_UNIDADES = "Unidades educacionais";

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

export function montarAbaRelatorioUnidades(
  unidades: readonly UnidadeEducacional[],
): AbaExportacaoXlsx {
  const linhas = unidades.map((unidade) => [
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
    linhas: [CABECALHO_UNIDADES, ...linhas],
  };
}
