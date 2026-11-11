import { useCallback, useMemo, useState } from "react";
import {
  detalhesServidorEstatico,
  servidoresAtivosEstaticos,
  TOTAL_SERVIDORES,
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
  painelDetalhesAberto: boolean;
  abrirPainelDetalhes: () => void;
  fecharPainelDetalhes: () => void;
}

export function useServidoresAtivos(): EstadoServidoresAtivos {
  const [painelDetalhesAberto, setPainelDetalhesAberto] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

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

  return useMemo(
    () => ({
      detalhes: detalhesServidorEstatico,
      servidores: servidoresAtivosEstaticos,
      totalServidores: TOTAL_SERVIDORES,
      buscaRealizada,
      buscarServidores,
      limparFiltros,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    }),
    [
      buscaRealizada,
      buscarServidores,
      limparFiltros,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    ],
  );
}

export default useServidoresAtivos;
