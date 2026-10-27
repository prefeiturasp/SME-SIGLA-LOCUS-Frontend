import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CAMINHOS,
  type EstadoNavegacaoBuscaServidor,
  type EstadoNavegacaoVacancia,
} from "@/rotas/caminhos";

export interface EstadoPerfilReativado {
  aberto: boolean;
  fechar: () => void;
  pesquisarPorRF: () => void;
}

export function usePerfilReativado(): EstadoPerfilReativado {
  const { pathname, search, hash, state } = useLocation();
  const navigate = useNavigate();
  const rfDoEstado = (state as EstadoNavegacaoVacancia | null)?.rfReativado;
  const [rfReativado, setRfReativado] = useState(rfDoEstado);

  useEffect(() => {
    if (!rfDoEstado) return;
    navigate({ pathname, search, hash }, { replace: true, state: null });
  }, [rfDoEstado, pathname, search, hash, navigate]);

  const fechar = useCallback(() => setRfReativado(undefined), []);

  const pesquisarPorRF = useCallback(() => {
    const estado: EstadoNavegacaoBuscaServidor = { termoBusca: rfReativado };
    navigate(CAMINHOS.cadastroAtualizacaoRF, { state: estado });
  }, [navigate, rfReativado]);

  return useMemo(
    () => ({ aberto: Boolean(rfReativado), fechar, pesquisarPorRF }),
    [rfReativado, fechar, pesquisarPorRF],
  );
}

export default usePerfilReativado;
