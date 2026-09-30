import { useMemo } from "react";
import {
  obterUsuarioLogado,
  type UsuarioLogado,
} from "@/servicos/recursos/autenticacao";

export function useUsuarioLogado(): UsuarioLogado {
  return useMemo(() => obterUsuarioLogado(), []);
}

export default useUsuarioLogado;
