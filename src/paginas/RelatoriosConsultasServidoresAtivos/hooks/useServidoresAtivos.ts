import { useCallback, useMemo, useState } from "react";
import {
  detalhesServidorEstatico,
  servidoresAtivosEstaticos,
  type SecaoDetalheServidor,
  type ServidorAtivo,
} from "../dados/dadosEstaticos";
import { filtrarServidores } from "../dados/filtrarServidores";
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
  const [servidores, setServidores] = useState<ServidorAtivo[]>([]);

  const abrirPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(true),
    [],
  );
  const fecharPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(false),
    [],
  );

  const buscarServidores = useCallback((filtros: FiltrosServidores) => {
    setServidores(filtrarServidores(servidoresAtivosEstaticos, filtros));
    setBuscaRealizada(true);
  }, []);

  const limparFiltros = useCallback(() => {
    setServidores([]);
    setBuscaRealizada(false);
  }, []);

  return useMemo(
    () => ({
      detalhes: detalhesServidorEstatico,
      servidores,
      totalServidores: servidores.length,
      buscaRealizada,
      buscarServidores,
      limparFiltros,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    }),
    [
      servidores,
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
