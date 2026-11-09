import { useCallback, useMemo, useState } from "react";
import {
  COLUNAS_TABELA_SERVIDORES,
  detalhesServidorEstatico,
  servidoresAtivosEstaticos,
  TOTAL_SERVIDORES,
  type ChaveColunaServidor,
  type DefinicaoColunaServidor,
  type SecaoDetalheServidor,
  type ServidorAtivo,
} from "../dados/dadosEstaticos";
import type { FiltrosServidores } from "../componentes/CardFormFiltrosServidores";

export interface EstadoServidoresAtivos {
  detalhes: SecaoDetalheServidor[];
  servidores: ServidorAtivo[];
  totalServidores: number;
  buscaRealizada: boolean;
  buscarServidores: (filtros: FiltrosServidores) => void;
  limparFiltros: () => void;
  colunas: DefinicaoColunaServidor[];
  colunasVisiveis: DefinicaoColunaServidor[];
  definirVisibilidadeColuna: (
    chave: ChaveColunaServidor,
    visivel: boolean,
  ) => void;
  painelDetalhesAberto: boolean;
  abrirPainelDetalhes: () => void;
  fecharPainelDetalhes: () => void;
}

export function useServidoresAtivos(): EstadoServidoresAtivos {
  const [painelDetalhesAberto, setPainelDetalhesAberto] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [colunas, setColunas] = useState<DefinicaoColunaServidor[]>(
    COLUNAS_TABELA_SERVIDORES,
  );

  const abrirPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(true),
    [],
  );
  const fecharPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(false),
    [],
  );

  const buscarServidores = useCallback((_filtros: FiltrosServidores) => {
    setBuscaRealizada(true);
  }, []);

  const limparFiltros = useCallback(() => {
    setBuscaRealizada(false);
  }, []);

  const definirVisibilidadeColuna = useCallback(
    (chave: ChaveColunaServidor, visivel: boolean) => {
      setColunas((atuais) =>
        atuais.map((coluna) => {
          if (coluna.chave !== chave || coluna.fixa) return coluna;
          return { ...coluna, visivel };
        }),
      );
    },
    [],
  );

  const colunasVisiveis = useMemo(
    () => colunas.filter((coluna) => coluna.visivel || coluna.fixa),
    [colunas],
  );

  return useMemo(
    () => ({
      detalhes: detalhesServidorEstatico,
      servidores: servidoresAtivosEstaticos,
      totalServidores: TOTAL_SERVIDORES,
      buscaRealizada,
      buscarServidores,
      limparFiltros,
      colunas,
      colunasVisiveis,
      definirVisibilidadeColuna,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    }),
    [
      buscaRealizada,
      buscarServidores,
      limparFiltros,
      colunas,
      colunasVisiveis,
      definirVisibilidadeColuna,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    ],
  );
}

export default useServidoresAtivos;
