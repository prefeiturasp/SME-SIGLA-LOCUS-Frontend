import { z } from "zod";

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

export function obterEnvironment(): string | undefined {
  const valor = window.__ENV__?.ENVIRONMENT;
  return valor || undefined;
}

/**
 * Só em ENVIRONMENT=local: lê TOKEN, USUARIO e NOME_USUARIO da query,
 * grava no localStorage se ainda não existirem e remove os params da URL.
 * No Locus, USUARIO é persistido como JSON `{ rf, nome }`.
 */
export function aplicarSessaoDaQuery(
  search: string = window.location.search,
  environment: string | undefined = obterEnvironment(),
): boolean {
  if (environment !== "local") {
    return false;
  }

  const params = new URLSearchParams(search);
  let aplicou = false;

  const token = params.get("TOKEN");
  if (token && !localStorage.getItem("TOKEN")) {
    localStorage.setItem("TOKEN", token);
    aplicou = true;
  }
  params.delete("TOKEN");

  const rf = params.get("USUARIO");
  const nome = params.get("NOME_USUARIO");
  if (rf && !localStorage.getItem("USUARIO")) {
    const usuario: UsuarioLogado = {
      rf,
      nome: nome || "Usuário",
    };
    localStorage.setItem("USUARIO", JSON.stringify(usuario));
    aplicou = true;
  }
  params.delete("USUARIO");
  params.delete("NOME_USUARIO");

  const sobrouQuery = params.toString();
  const novaUrl =
    window.location.pathname +
    (sobrouQuery ? `?${sobrouQuery}` : "") +
    window.location.hash;

  window.history.replaceState(null, "", novaUrl);
  return aplicou;
}
