import {
  linhasUnidades,
  estatisticasPainel,
  TAMANHO_PAGINA,
  TOTAL_REGISTROS,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import {
  painelComponenteSchema,
  respostaListagemSchema,
  type FiltrosUnidades,
  type PainelComponente,
  type RespostaListagem,
} from "./tipos";

export * from "./tipos";

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

export default unidadesEducacionaisServico;
