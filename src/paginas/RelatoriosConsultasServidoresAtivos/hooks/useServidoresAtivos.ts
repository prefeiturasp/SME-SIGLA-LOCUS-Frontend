import { useCallback, useMemo, useState } from "react";
import {
  detalhesServidorEstatico,
  type SecaoDetalheServidor,
} from "../dados/dadosEstaticos";

export interface EstadoServidoresAtivos {
  detalhes: SecaoDetalheServidor[];
  painelDetalhesAberto: boolean;
  abrirPainelDetalhes: () => void;
  fecharPainelDetalhes: () => void;
}

export function useServidoresAtivos(): EstadoServidoresAtivos {
  const [painelDetalhesAberto, setPainelDetalhesAberto] = useState(false);
  const abrirPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(true),
    [],
  );
  const fecharPainelDetalhes = useCallback(
    () => setPainelDetalhesAberto(false),
    [],
  );

  return useMemo(
    () => ({
      detalhes: detalhesServidorEstatico,
      painelDetalhesAberto,
      abrirPainelDetalhes,
      fecharPainelDetalhes,
    }),
    [painelDetalhesAberto, abrirPainelDetalhes, fecharPainelDetalhes],
  );
}

export default useServidoresAtivos;
