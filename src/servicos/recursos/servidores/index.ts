import type { AxiosRequestConfig } from "axios";
import { servidoresExemplo } from "@/paginas/BuscaServidorRF/dados/dadosEstaticos";
import {
  ehTermoNumerico,
  normalizarTexto,
  somenteDigitos,
} from "@/utilitarios/formatadores";
import {
  respostaOperacaoSchema,
  type RespostaOperacao,
} from "../unidadesEducacionais/tipos";
import {
  listaServidoresSchema,
  ServidorNaoEncontradoError,
  type ServidorResumo,
} from "./tipos";

export * from "./tipos";

export const URL = {
  pesquisar: () => `/api/v1/servidores/`,
  reativar: (rf: string) =>
    `/api/v1/servidores/${encodeURIComponent(rf)}/reativar/`,
};

function deveSimularErroReativacao(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("erro") === "1";
}

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

export const reativarServidor = (
  rf: string,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const controlador = new AbortController();

  const response: Promise<RespostaOperacao> = Promise.resolve().then(() => {
    if (deveSimularErroReativacao()) {
      throw new Error("Erro simulado na reativação do servidor");
    }

    if (!servidoresExemplo.some((servidor) => servidor.rf === rf)) {
      throw new ServidorNaoEncontradoError();
    }

    return respostaOperacaoSchema.parse({
      sucesso: true,
      mensagem: "O perfil do servidor foi reativado.",
    });
  });

  return { response, abort: () => controlador.abort() };
};
