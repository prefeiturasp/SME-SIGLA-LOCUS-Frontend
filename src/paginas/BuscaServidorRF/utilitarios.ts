import { MENSAGENS_BUSCA_SERVIDOR } from "@/paginas/validacoes/buscarServidor";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import {
  formatarCpf,
  formatarRf,
  normalizarTexto,
  somenteDigitos,
} from "@/utilitarios/formatadores";

export interface TrechoSugestao {
  texto: string;
  
  destaque?: "nome" | "digitos";
}

export function partesDaSugestao({
  rf,
  nome,
  cpf,
}: ServidorResumo): TrechoSugestao[] {
  return [
    { texto: formatarRf(rf), destaque: "digitos" },
    { texto: " - " },
    { texto: nome, destaque: "nome" },
    { texto: " [CPF " },
    { texto: formatarCpf(cpf), destaque: "digitos" },
    { texto: "]" },
  ];
}


export function textoDaSugestao(servidor: ServidorResumo): string {
  return partesDaSugestao(servidor)
    .map(({ texto }) => texto)
    .join("");
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
