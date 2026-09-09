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
  LotacaoNaoEncontradaError,
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
} from "@/tipos/unidadesEducacionais";

export * from "@/tipos/unidadesEducacionais";

function deveSimularErroRegistro(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("erro") === "1";
}

export const unidadesEducacionaisServico = {
  listar: async (filtros?: FiltrosUnidades): Promise<RespostaListagem> => ({
    itens: linhasUnidades,
    total: TOTAL_REGISTROS,
    pagina: filtros?.pagina ?? 1,
    tamanhoPagina: filtros?.tamanhoPagina ?? TAMANHO_PAGINA,
  }),

  painel: async (componente: string): Promise<PainelComponente> => ({
    componente,
    estatisticas: estatisticasPainel,
  }),
};

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
  obterDetalhe: async (codigo: string): Promise<DetalheUnidade> => {
    const encontrado = detalhesPorCodigo[codigo];

    if (!encontrado) {
      throw new UnidadeNaoEncontradaError();
    }

    return aplicarModulosSalvos(encontrado);
  },

  listarProfessoresLotados: async (
    _codigo: string,
    componenteId: string,
  ): Promise<ProfessorLotado[]> =>
    professoresLotadosPorComponente[componenteId] ?? professoresLotadosPadrao,

  listarProfessoresAfastados: async (
    _codigo: string,
    componenteId: string,
  ): Promise<ProfessorAfastado[]> =>
    professoresAfastadosPorComponente[componenteId] ??
    professoresAfastadosPadrao,

  listarHistorico: async (_codigo: string): Promise<RegistroHistorico[]> =>
    historicoExemplo,

  obterVersaoHistorica: async (
    codigo: string,
    _idRegistro: string,
  ): Promise<DetalheUnidade> => {
    const encontrado = detalhesPorCodigo[codigo];

    if (!encontrado) {
      throw new UnidadeNaoEncontradaError();
    }

    return encontrado;
  },
};

export async function salvarModulos(
  payload: PayloadSalvarModulos,
): Promise<RespostaOperacao> {
  const salvos =
    modulosSalvos.get(payload.codigoLotacao) ?? new Map<string, number>();

  payload.alteracoes.forEach(({ componenteId, modulo }) => {
    salvos.set(componenteId, modulo);
  });
  modulosSalvos.set(payload.codigoLotacao, salvos);

  return {
    sucesso: true,
    mensagem: "As alterações foram salvas.",
  };
}

export async function excluirUnidade(
  codigo: string,
): Promise<RespostaOperacao> {
  if (!detalhesPorCodigo[codigo]) {
    throw new UnidadeNaoEncontradaError();
  }

  return {
    sucesso: true,
    mensagem: "A unidade educacional foi excluída.",
  };
}

export function reiniciarModulosSalvos(): void {
  modulosSalvos.clear();
}

export async function consultarLotacao(
  codigo: string,
): Promise<DadosLotacaoConsulta> {
  const codigoNormalizado = codigo.trim();
  const encontrado = lotacoesConsultaExemplo[codigoNormalizado];

  if (!encontrado) {
    throw new LotacaoNaoEncontradaError();
  }

  return {
    codigoLotacao: codigoNormalizado,
    ...encontrado,
  };
}

export async function registrar(
  _payload: PayloadRegistrarUnidade,
): Promise<RespostaRegistrarUnidade> {
  if (deveSimularErroRegistro()) {
    throw new Error("Erro simulado no registro da UE");
  }

  return {
    sucesso: true,
    mensagem: "A unidade educacional foi registrada.",
  };
}

export default unidadesEducacionaisServico;
