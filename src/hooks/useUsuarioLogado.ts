import { useMemo } from "react";
import {
  obterUsuarioLogado,
  type UsuarioLogado,
} from "@/servicos/recursos/autenticacao";

/**
 * Expõe o usuario atualmente logado para a casca do sistema (TopoBar).
 *
 * PROTOTIPO: resolve de forma sincrona via `obterUsuarioLogado` (mock/storage).
 * Quando houver login real, trocar por uma query/estado global sem mudar a
 * assinatura consumida pelos componentes.
 */
export function useUsuarioLogado(): UsuarioLogado {
  return useMemo(() => obterUsuarioLogado(), []);
}

export default useUsuarioLogado;
