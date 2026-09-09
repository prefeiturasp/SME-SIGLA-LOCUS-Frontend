import { useMemo } from "react";
import {
  obterUsuarioLogado,
  type UsuarioLogado,
} from "@/auth";

export function useUsuarioLogado(): UsuarioLogado {
  return useMemo(() => obterUsuarioLogado(), []);
}

export default useUsuarioLogado;
