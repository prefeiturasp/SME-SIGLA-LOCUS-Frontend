import type { AbaExportacaoXlsx, CelulaXlsx } from "@/hooks/useExportarXlsx";
import { montarLinhasIndicadores } from "@/paginas/GestaoUnidadesEducacionais/dados/montarPlanilhaUnidades";
import { textoSaldoVagas } from "@/servicos/recursos/unidadesEducacionais/textos";
import type { DetalheUnidade } from "@/servicos/recursos/unidadesEducacionais/tipos";
import type { LinhaTabelaComponentes } from "../utilitarios";

export const NOME_ABA_DETALHE = "Unidade educacional";

const CABECALHO_COMPONENTES: CelulaXlsx[] = [
  "Componente curricular",
  "Módulo",
  "Lotação",
  "Afastados",
  "Vacâncias",
  "Vagas",
];

function linhaComponente(linha: LinhaTabelaComponentes): CelulaXlsx[] {
  if (linha.tipo === "grupo") return [linha.rotulo];

  return [
    linha.componente,
    linha.modulo,
    linha.lotacao,
    linha.afastados,
    linha.vacancias,
    textoSaldoVagas(linha.saldoVagas),
  ];
}

export function montarAbaRelatorioDetalhe(
  unidade: DetalheUnidade | undefined,
  linhas: readonly LinhaTabelaComponentes[],
): AbaExportacaoXlsx {
  const identificacao: CelulaXlsx[][] = unidade
    ? [
        ["Unidade educacional", `${unidade.tipo} ${unidade.nome}`],
        ["DRE", unidade.dre],
        ["Código de lotação", unidade.codigoLotacao],
        [],
      ]
    : [];

  return {
    nome: NOME_ABA_DETALHE,
    linhas: [
      ...identificacao,
      ["Informações da unidade educacional"],
      ...montarLinhasIndicadores(unidade?.estatisticas ?? []),
      [],
      ["Dados por componente curricular"],
      CABECALHO_COMPONENTES,
      ...linhas.map(linhaComponente),
    ],
  };
}
