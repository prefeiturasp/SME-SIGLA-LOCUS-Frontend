import {
  ORDEM_GRUPOS,
  ROTULO_GRUPO_COMPONENTE,
  type ComponenteCurricularDetalhe,
} from "@/servicos/recursos/unidadesEducacionais/tipos";

export interface LinhaGrupo {
  tipo: "grupo";
  id: string;
  rotulo: string;
  classe: string;
}

export type LinhaComponente = {
  tipo: "componente";
  classe: string;
} & ComponenteCurricularDetalhe;

export type LinhaTabelaComponentes = LinhaGrupo | LinhaComponente;

/**
 * Achata os componentes em linhas de tabela, com os cabecalhos de grupo
 * intercalados. A zebra conta so as linhas de componente — pelo indice da
 * tabela, cada cabecalho injetado dessincronizaria as faixas.
 */
export function montarLinhasAgrupadas(
  componentes: ComponenteCurricularDetalhe[],
): LinhaTabelaComponentes[] {
  const linhas: LinhaTabelaComponentes[] = [];
  let indiceComponente = 0;

  ORDEM_GRUPOS.forEach((grupo) => {
    const doGrupo = componentes.filter(
      (componente) => componente.grupo === grupo,
    );
    if (doGrupo.length === 0) return;

    linhas.push({
      tipo: "grupo",
      id: `grupo-${grupo}`,
      rotulo: ROTULO_GRUPO_COMPONENTE[grupo],
      classe: "linhaGrupo",
    });

    doGrupo.forEach((componente) => {
      linhas.push({
        tipo: "componente",
        classe: indiceComponente % 2 === 1 ? "linhaPar" : "",
        ...componente,
      });
      indiceComponente += 1;
    });
  });

  return linhas;
}
