import { z } from "zod";

/**
 * Contratos do recurso "unidades educacionais".
 *
 * Schemas Zod validam mocks e futuras respostas HTTP.
 */

/** Saldo de vagas de uma unidade: disponivel, excedente ou completo. */
export const situacaoVagasSchema = z.enum([
  "disponivel",
  "excedente",
  "completo",
]);
export type SituacaoVagas = z.infer<typeof situacaoVagasSchema>;

export const unidadeEducacionalSchema = z.object({
  codigoLotacao: z.string(),
  tipo: z.string(),
  nome: z.string(),
  dre: z.string(),
  modulo: z.number().int().nonnegative(),
  lotacao: z.number().int().nonnegative(),
  afastados: z.number().int().nonnegative(),
  /** Saldo de vagas: positivo = disponiveis, negativo = excedentes, 0 = completo. */
  saldoVagas: z.number().int(),
});
export type UnidadeEducacional = z.infer<typeof unidadeEducacionalSchema>;

export const estatisticaPainelSchema = z.object({
  chave: z.string(),
  valor: z.number(),
  rotulo: z.string(),
  legenda: z.string(),
});
export type EstatisticaPainel = z.infer<typeof estatisticaPainelSchema>;

export const painelComponenteSchema = z.object({
  componente: z.string(),
  estatisticas: z.array(estatisticaPainelSchema),
});
export type PainelComponente = z.infer<typeof painelComponenteSchema>;

export const opcaoSelecaoSchema = z.object({
  value: z.string(),
  label: z.string(),
});
export type OpcaoSelecao = z.infer<typeof opcaoSelecaoSchema>;

export const respostaListagemSchema = z.object({
  itens: z.array(unidadeEducacionalSchema),
  total: z.number().int().nonnegative(),
  pagina: z.number().int().positive(),
  tamanhoPagina: z.number().int().positive(),
});
export type RespostaListagem = z.infer<typeof respostaListagemSchema>;

/** Filtros da busca de unidades. Todos opcionais (protótipo nao aplica). */
export interface FiltrosUnidades {
  componente?: string;
  cargo?: string;
  estruturaHierarquica?: string;
  codigoLotacao?: string;
  tipoUnidade?: string;
  dre?: string;
  nomeUnidade?: string;
  escolasMunicipalizadas?: string;
  anoMunicipalizacao?: string;
  ensinoFundamentalI?: string;
  ejaModular?: string;
  saoPauloIntegral?: string;
  unidadeContabilizada?: string;
  pagina?: number;
  tamanhoPagina?: number;
}

/**
 * Deriva a situacao textual da coluna "Vagas" a partir do saldo numerico.
 */
export function situacaoDoSaldo(saldo: number): SituacaoVagas {
  if (saldo > 0) return "disponivel";
  if (saldo < 0) return "excedente";
  return "completo";
}

/** Resposta da consulta de lotacao (preenche dados da UE). */
export const dadosLotacaoConsultaSchema = z.object({
  codigoLotacao: z.string(),
  tipoUnidade: z.string(),
  dre: z.string(),
  nome: z.string(),
});
export type DadosLotacaoConsulta = z.infer<typeof dadosLotacaoConsultaSchema>;

export const componenteRegistrarSchema = z.object({
  componente: z.string(),
  quantidadeModulos: z.number().int().nonnegative(),
});
export type ComponenteRegistrar = z.infer<typeof componenteRegistrarSchema>;

/** Payload de criacao de unidade educacional. */
export const payloadRegistrarUnidadeSchema = z.object({
  codigoLotacao: z.string().min(1),
  tipoUnidade: z.string().min(1),
  dre: z.string().min(1),
  nome: z.string().min(1),
  anoMunicipalizacao: z.string().optional(),
  escolaMunicipalizada: z.boolean(),
  ensinoFundamentalI: z.boolean(),
  ejaModular: z.boolean(),
  saoPauloIntegral: z.boolean(),
  contabilizarUE: z.boolean(),
  motivoNaoContabilizacao: z.string().optional(),
  componentes: z.array(componenteRegistrarSchema),
});
export type PayloadRegistrarUnidade = z.infer<
  typeof payloadRegistrarUnidadeSchema
>;

export const respostaRegistrarUnidadeSchema = z.object({
  sucesso: z.boolean(),
  mensagem: z.string().optional(),
});
export type RespostaRegistrarUnidade = z.infer<
  typeof respostaRegistrarUnidadeSchema
>;

/** Erro de dominio: lotacao inexistente (mock ou API 404). */
export class LotacaoNaoEncontradaError extends Error {
  readonly codigo = "LOTACAO_NAO_ENCONTRADA" as const;

  constructor(mensagem = "Código de lotação incorreto") {
    super(mensagem);
    this.name = "LotacaoNaoEncontradaError";
  }
}
