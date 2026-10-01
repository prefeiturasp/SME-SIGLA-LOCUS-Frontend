import { MENSAGENS_BUSCA_SERVIDOR } from "@/paginas/validacoes/buscarServidor";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import {
  formatarCpf,
  formatarRf,
  normalizarTexto,
  somenteDigitos,
} from "@/utilitarios/formatadores";

export interface PartesSugestao {
  prefixo: string;
  nome: string;
  sufixo: string;
}

/** Fonte unica do formato: o rotulo da lista so destaca o nome. */
export function partesDaSugestao({
  rf,
  nome,
  cpf,
}: ServidorResumo): PartesSugestao {
  return {
    prefixo: `${formatarRf(rf)} - `,
    nome,
    sufixo: ` [CPF ${formatarCpf(cpf)}]`,
  };
}

/**
 * Texto da sugestao, que tambem vai para o campo ao escolher o servidor.
 *
 * @example
 * textoDaSugestao(servidor)
 * // "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]"
 */
export function textoDaSugestao(servidor: ServidorResumo): string {
  const { prefixo, nome, sufixo } = partesDaSugestao(servidor);
  return `${prefixo}${nome}${sufixo}`;
}

export type ResultadoBuscaServidor =
  | { situacao: "encontrado"; servidor: ServidorResumo }
  | { situacao: "naoEncontrado" }
  | { situacao: "varios"; mensagem: string };

function correspondeExatamente(
  servidor: ServidorResumo,
  termo: string,
): boolean {
  const digitos = somenteDigitos(termo);
  if (digitos && (servidor.rf === digitos || servidor.cpf === digitos)) {
    return true;
  }
  return normalizarTexto(servidor.nome) === normalizarTexto(termo);
}

/**
 * Decide qual servidor a busca encontrou: o de RF, CPF ou nome exato; senao,
 * o unico resultado. Com varios resultados, devolve a mensagem para o campo.
 */
export function resolverServidorDaBusca(
  termo: string,
  resultados: ServidorResumo[],
): ResultadoBuscaServidor {
  if (resultados.length === 0) return { situacao: "naoEncontrado" };

  const servidor =
    resultados.find((item) => correspondeExatamente(item, termo)) ??
    (resultados.length === 1 ? resultados[0] : undefined);

  if (servidor) return { situacao: "encontrado", servidor };

  return {
    situacao: "varios",
    mensagem: MENSAGENS_BUSCA_SERVIDOR.maisDeUmServidor,
  };
}
