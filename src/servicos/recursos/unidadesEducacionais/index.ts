import type { AxiosRequestConfig } from "axios";
import {
  linhasUnidades,
  estatisticasPainel,
  TAMANHO_PAGINA,
  TOTAL_REGISTROS,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import { lotacoesConsultaExemplo } from "@/paginas/RegistrarUnidadeEducacional/dados/dadosEstaticos";
import {
  dadosLotacaoConsultaSchema,
  LotacaoNaoEncontradaError,
  painelComponenteSchema,
  payloadRegistrarUnidadeSchema,
  respostaListagemSchema,
  respostaRegistrarUnidadeSchema,
  type DadosLotacaoConsulta,
  type FiltrosUnidades,
  type PainelComponente,
  type PayloadRegistrarUnidade,
  type RespostaListagem,
  type RespostaRegistrarUnidade,
} from "./tipos";

export * from "./tipos";

/**
 * Rotas HTTP da tela Registrar UE.
 */
export const URL = {
  consultarLotacao: (codigo: string) =>
    `/api/v1/unidades-educacionais/lotacao/${encodeURIComponent(codigo)}/`,
  registrar: () => `/api/v1/unidades-educacionais/`,
};

function deveSimularErroRegistro(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("erro") === "1";
}

export const unidadesEducacionaisServico = {
  listar: (filtros?: FiltrosUnidades): Promise<RespostaListagem> => {
    const resposta = respostaListagemSchema.parse({
      itens: linhasUnidades,
      total: TOTAL_REGISTROS,
      pagina: filtros?.pagina ?? 1,
      tamanhoPagina: filtros?.tamanhoPagina ?? TAMANHO_PAGINA,
    });
    return Promise.resolve(resposta);
  },

  painel: (componente: string): Promise<PainelComponente> => {
    const painel = painelComponenteSchema.parse({
      componente,
      estatisticas: estatisticasPainel,
    });
    return Promise.resolve(painel);
  },
};

export const consultarLotacao = (
  codigo: string,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { abort } = new AbortController();
  const codigoNormalizado = codigo.trim();

  const response: Promise<DadosLotacaoConsulta> = Promise.resolve().then(() => {
    const encontrado = lotacoesConsultaExemplo[codigoNormalizado];

    if (!encontrado) {
      throw new LotacaoNaoEncontradaError();
    }

    return dadosLotacaoConsultaSchema.parse({
      codigoLotacao: codigoNormalizado,
      ...encontrado,
    });
  });

  return { response, abort };
};

export const registrar = (
  payload: PayloadRegistrarUnidade,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { abort } = new AbortController();
  payloadRegistrarUnidadeSchema.parse(payload);

  const response: Promise<RespostaRegistrarUnidade> = deveSimularErroRegistro()
    ? Promise.reject(new Error("Erro simulado no registro da UE"))
    : Promise.resolve(
        respostaRegistrarUnidadeSchema.parse({
          sucesso: true,
          mensagem: "A unidade educacional foi registrada.",
        }),
      );

  return { response, abort };
};

export default unidadesEducacionaisServico;
