import { useCallback, useMemo, useState } from "react";
import {
  servidoresAtivosEstaticos,
  type SecaoDetalheServidor,
  type ServidorAtivo,
} from "../dados/dadosEstaticos";
import { filtrarServidores } from "../dados/filtrarServidores";
import { montarDetalhesServidor } from "../dados/montarDetalhesServidor";
import type { FiltrosServidores } from "../componentes/CardFormFiltrosServidores";

export interface EstadoServidoresAtivos {
  detalhes: SecaoDetalheServidor[];
  servidores: ServidorAtivo[];
  totalServidores: number;
  buscaRealizada: boolean;
  buscarServidores: (filtros: FiltrosServidores) => void;
  limparFiltros: () => void;
  painelDetalhesAberto: boolean;
  abrirPainelDetalhes: (servidor: ServidorAtivo) => void;
  fecharPainelDetalhes: () => void;
}

export function useServidoresAtivos(): EstadoServidoresAtivos {
  const [painelDetalhesAberto, setPainelDetalhesAberto] = useState(false);
  const [servidorSelecionado, setServidorSelecionado] =
    useState<ServidorAtivo | null>(null);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [servidores, setServidores] = useState<ServidorAtivo[]>([]);

  const abrirPainelDetalhes = useCallback((servidor: ServidorAtivo) => {
    setServidorSelecionado(servidor);
    setPainelDetalhesAberto(true);
  }, []);
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

  const detalhes = useMemo(
    () =>
      servidorSelecionado ? montarDetalhesServidor(servidorSelecionado) : [],
    [servidorSelecionado],
  );

  return useMemo(
    () => ({
      detalhes,
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
      detalhes,
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
