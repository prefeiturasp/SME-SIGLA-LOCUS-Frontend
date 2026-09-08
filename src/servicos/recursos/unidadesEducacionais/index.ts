import type { AxiosRequestConfig } from "axios";
import {
  linhasUnidades,
  estatisticasPainel,
  TAMANHO_PAGINA,
  TOTAL_REGISTROS,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import {
  detalhesPorCodigo,
  historicoExemplo,
  professoresAfastadosPadrao,
  professoresAfastadosPorComponente,
  professoresLotadosPadrao,
  professoresLotadosPorComponente,
} from "@/paginas/DetalheUnidadeEducacional/dados/dadosEstaticos";
import { lotacoesConsultaExemplo } from "@/paginas/RegistrarUnidadeEducacional/dados/dadosEstaticos";
import {
  dadosLotacaoConsultaSchema,
  LotacaoNaoEncontradaError,
  painelComponenteSchema,
  payloadRegistrarUnidadeSchema,
  respostaListagemSchema,
  respostaRegistrarUnidadeSchema,
  detalheUnidadeSchema,
  professorAfastadoSchema,
  professorLotadoSchema,
  registroHistoricoSchema,
  payloadSalvarModulosSchema,
  respostaOperacaoSchema,
  UnidadeNaoEncontradaError,
  type DadosLotacaoConsulta,
  type DetalheUnidade,
  type PayloadSalvarModulos,
  type ProfessorAfastado,
  type ProfessorLotado,
  type RegistroHistorico,
  type RespostaOperacao,
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
  detalhe: (codigo: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/`,
  excluir: (codigo: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/`,
  salvarModulos: (codigo: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/modulos/`,
  professoresLotados: (codigo: string, componenteId: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/componentes/${encodeURIComponent(componenteId)}/lotados/`,
  professoresAfastados: (codigo: string, componenteId: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/componentes/${encodeURIComponent(componenteId)}/afastados/`,
  historico: (codigo: string) =>
    `/api/v1/unidades-educacionais/${encodeURIComponent(codigo)}/historico/`,
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

/**
 * Estado mutavel dos modulos salvos, por codigo de lotacao e componente.
 *
 * Sem isso o refetch apos salvar recarrega o dado estatico e desfaz a edicao
 * do usuario na tela.
 *
 * TODO: substituir por chamada HTTP real.
 */
const modulosSalvos = new Map<string, Map<string, number>>();

function aplicarModulosSalvos(detalhe: DetalheUnidade): DetalheUnidade {
  const salvos = modulosSalvos.get(detalhe.codigoLotacao);
  if (!salvos || salvos.size === 0) return detalhe;

  return {
    ...detalhe,
    componentes: detalhe.componentes.map((componente) => {
      const modulo = salvos.get(componente.id);
      if (modulo === undefined) return componente;

      const diferenca = modulo - componente.modulo;
      return {
        ...componente,
        modulo,
        saldoVagas: componente.saldoVagas + diferenca,
      };
    }),
  };
}

export const unidadesEducacionaisDetalheServico = {
  obterDetalhe: (codigo: string): Promise<DetalheUnidade> => {
    const encontrado = detalhesPorCodigo[codigo];

    if (!encontrado) {
      return Promise.reject(new UnidadeNaoEncontradaError());
    }

    return Promise.resolve(
      detalheUnidadeSchema.parse(aplicarModulosSalvos(encontrado)),
    );
  },

  listarProfessoresLotados: (
    _codigo: string,
    componenteId: string,
  ): Promise<ProfessorLotado[]> =>
    Promise.resolve(
      (
        professoresLotadosPorComponente[componenteId] ??
        professoresLotadosPadrao
      ).map((professor) => professorLotadoSchema.parse(professor)),
    ),

  listarProfessoresAfastados: (
    _codigo: string,
    componenteId: string,
  ): Promise<ProfessorAfastado[]> =>
    Promise.resolve(
      (
        professoresAfastadosPorComponente[componenteId] ??
        professoresAfastadosPadrao
      ).map((professor) => professorAfastadoSchema.parse(professor)),
    ),

  listarHistorico: (_codigo: string): Promise<RegistroHistorico[]> =>
    Promise.resolve(
      historicoExemplo.map((registro) =>
        registroHistoricoSchema.parse(registro),
      ),
    ),

  /**
   * Versao anterior do registro, para o modo somente leitura.
   *
   * O mock devolve o detalhe original (sem as edicoes salvas), que e o que
   * uma versao historica representa.
   */
  obterVersaoHistorica: (
    codigo: string,
    _idRegistro: string,
  ): Promise<DetalheUnidade> => {
    const encontrado = detalhesPorCodigo[codigo];

    if (!encontrado) {
      return Promise.reject(new UnidadeNaoEncontradaError());
    }

    return Promise.resolve(detalheUnidadeSchema.parse(encontrado));
  },
};

export const salvarModulos = (
  payload: PayloadSalvarModulos,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { abort } = new AbortController();
  payloadSalvarModulosSchema.parse(payload);

  const response: Promise<RespostaOperacao> = Promise.resolve().then(() => {
    const salvos =
      modulosSalvos.get(payload.codigoLotacao) ?? new Map<string, number>();

    payload.alteracoes.forEach(({ componenteId, modulo }) => {
      salvos.set(componenteId, modulo);
    });
    modulosSalvos.set(payload.codigoLotacao, salvos);

    return respostaOperacaoSchema.parse({
      sucesso: true,
      mensagem: "As alterações foram salvas.",
    });
  });

  return { response, abort };
};

export const excluirUnidade = (
  codigo: string,
  _axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { abort } = new AbortController();

  const response: Promise<RespostaOperacao> = Promise.resolve().then(() => {
    if (!detalhesPorCodigo[codigo]) {
      throw new UnidadeNaoEncontradaError();
    }

    return respostaOperacaoSchema.parse({
      sucesso: true,
      mensagem: "A unidade educacional foi excluída.",
    });
  });

  return { response, abort };
};

/** Limpa o estado mutavel do mock. Uso exclusivo dos testes. */
export function reiniciarModulosSalvos(): void {
  modulosSalvos.clear();
}

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
