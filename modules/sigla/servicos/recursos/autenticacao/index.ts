export interface UsuarioLogado {
  rf: string;
  nome: string;
}

export function estaAutenticado(): boolean {
  try {
    return Boolean(localStorage.getItem("TOKEN"));
  } catch {
    return false;
  }
}

export function obterUsuarioLogado(): UsuarioLogado {
  try {
    const rf = localStorage.getItem("USUARIO") ?? "";
    const nome = localStorage.getItem("NOME_USUARIO") ?? "Usuário";
    return { rf, nome };
  } catch {
    return { rf: "", nome: "Usuário" };
  }
}

/** Retorna o primeiro e o segundo nome para a saudacao (ex.: "Marcus Paulo"). */
export function nomeSaudacaoDoUsuario(nomeCompleto: string): string {
  const partes = nomeCompleto.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "Usuário";
  if (partes.length === 1) return partes[0];
  return `${partes[0]} ${partes[1]}`;
}

export function encerrarSessao(
  aoFinalizar: () => void = () => {
    window.location.href = "/sigla/login";
  },
): void {
  try {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USUARIO");
    localStorage.removeItem("NOME_USUARIO");
  } catch {
    // storage indisponivel
  }
  aoFinalizar();
}
