import type { AxiosRequestConfig } from "axios";
import { servidoresExemplo } from "@/paginas/AtualizacaoRegistroFuncional/dados/dadosEstaticos";
import {
  ehTermoNumerico,
  normalizarTexto,
  somenteDigitos,
} from "@/utilitarios/formatadores";
import { listaServidoresSchema, type ServidorResumo } from "./tipos";

export * from "./tipos";

export const URL = {
  pesquisar: () => `/api/v1/servidores/`,
};

export const LIMITE_SUGESTOES = 50;

function casaComTermo(termo: string): (servidor: ServidorResumo) => boolean {
  if (ehTermoNumerico(termo)) {
    const digitos = somenteDigitos(termo);
    return ({ rf, cpf }) => rf.startsWith(digitos) || cpf.startsWith(digitos);
  }

  const nome = normalizarTexto(termo);
  return (servidor) => normalizarTexto(servidor.nome).includes(nome);
}

export function filtrarServidores(
  servidores: ServidorResumo[],
  termo: string,
  limite = LIMITE_SUGESTOES,
): ServidorResumo[] {
  const termoLimpo = termo.trim();
  if (!termoLimpo) return [];

  return servidores
    .filter(casaComTermo(termoLimpo))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    .slice(0, limite);
}

export const pesquisarServidores = (
  termo: string,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const controlador = new AbortController();

  const response: Promise<ServidorResumo[]> = Promise.resolve().then(() =>
    listaServidoresSchema.parse(filtrarServidores(servidoresExemplo, termo)),
  );

  return { response, abort: () => controlador.abort() };
};
