import { z } from "zod";

/**
 * Recurso de autenticacao.
 *
 * PROTOTIPO: nao ha fluxo de login nesta entrega. O usuario logado vem de um
 * mock fixo (ou do que estiver em `localStorage` sob a chave "USUARIO").
 */

export const usuarioLogadoSchema = z.object({
  rf: z.string(),
  nome: z.string(),
  email: z.string().email().optional(),
});
export type UsuarioLogado = z.infer<typeof usuarioLogadoSchema>;

export const USUARIO_MOCK: UsuarioLogado = {
  rf: "1234567",
  nome: "Marcus Paulo de Souza Andrade",
  email: "marcus.andrade@sme.prefeitura.sp.gov.br",
};

/** Le o usuario logado do `localStorage`, caindo no mock quando ausente/invalido. */
export function obterUsuarioLogado(): UsuarioLogado {
  try {
    const bruto = localStorage.getItem("USUARIO");
    if (bruto) {
      return usuarioLogadoSchema.parse(JSON.parse(bruto));
    }
  } catch {
    // storage indisponivel ou JSON invalido -> usa o mock
  }
  return USUARIO_MOCK;
}

/**
 * Encerra a sessao: limpa o storage e, por padrao, recarrega a aplicacao.
 *
 * @param aoFinalizar - efeito de saida (default: `window.location.reload`).
 *   Injetavel para testes e para trocar por `navigate("/login")` quando houver
 *   fluxo de login.
 */
export function encerrarSessao(
  aoFinalizar: () => void = () => window.location.reload(),
): void {
  try {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USUARIO");
  } catch {
    // ignora storage indisponivel
  }
  aoFinalizar();
}
