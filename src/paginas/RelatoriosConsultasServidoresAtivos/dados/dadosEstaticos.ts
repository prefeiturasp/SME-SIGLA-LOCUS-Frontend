import type { OpcaoSelecao } from "@/servicos/recursos/unidadesEducacionais/tipos";
import { opcoesFiltros as opcoesGestao } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

export interface CampoDetalheServidor {
  rotulo: string;
  valor: string;
}

export interface SecaoDetalheServidor {
  titulo: string;
  descricao: string;
  campos: CampoDetalheServidor[];
}

export const detalhesServidorEstatico: SecaoDetalheServidor[] = [
  {
    titulo: "Identificação do servidor",
    descricao:
      "Informações que permitem identificar a pessoa e localizar seu registro.",
    campos: [
      { rotulo: "Nome completo", valor: "João Passos de Almeida" },
      { rotulo: "R.F", valor: "123.456.7" },
      { rotulo: "CPF", valor: "123.456.789-10" },
    ],
  },
  {
    titulo: "Vínculo funcional",
    descricao:
      "Informações sobre o vínculo administrativo do servidor e seu cargo.",
    campos: [
      { rotulo: "Vínculo", valor: "1" },
      { rotulo: "CL", valor: "01" },
      { rotulo: "Cargo atual", valor: "1234567 - Professor Ensino Infantil" },
      { rotulo: "Função", valor: "Professor Ensino Infantil" },
    ],
  },
  {
    titulo: "Lotação",
    descricao:
      "Permite identificar a unidade à qual o servidor está vinculado.",
    campos: [
      { rotulo: "Código", valor: "1234567" },
      { rotulo: "Tipo de lotação", valor: "Definitiva" },
      { rotulo: "DRE", valor: "Butantã" },
      { rotulo: "UE", valor: "Alípio Correa Neto, Prof." },
      { rotulo: "Tipo da unidade", valor: "EMEF" },
    ],
  },
  {
    titulo: "Local de exercício",
    descricao:
      "Permite identificar a unidade onde o servidor exerce suas atividades.",
    campos: [
      { rotulo: "Código", valor: "1234567" },
      { rotulo: "DRE", valor: "Butantã" },
      { rotulo: "UE", valor: "Alípio Correa Neto, Prof." },
      { rotulo: "Tipo da unidade", valor: "EMEF" },
    ],
  },
  {
    titulo: "Atuação profissional",
    descricao:
      "Informações que caracterizam a atividade desempenhada pelo servidor.",
    campos: [
      {
        rotulo: "Grupo de atividade",
        valor: "Apoio à secretaria escolar e famílias",
      },
      { rotulo: "Atividade", valor: "Regência" },
    ],
  },
  {
    titulo: "Classificação e condições do vínculo",
    descricao:
      "Informações complementares que podem influenciar a situação funcional do servidor.",
    campos: [
      { rotulo: "Classificação geral", valor: "52" },
      { rotulo: "Classificação PCD", valor: "0" },
      { rotulo: "Classificação NNA", valor: "0" },
      { rotulo: "Tipo de vaga", valor: "xxx" },
      { rotulo: "Liminar", valor: "Sim" },
      { rotulo: "Tipo de laudo", valor: "xxx" },
    ],
  },
  {
    titulo: "Ingresso e movimentação funcional",
    descricao: "Informações sobre as etapas de ingresso do servidor.",
    campos: [
      { rotulo: "Data da convocação", valor: "00/00/0000" },
      { rotulo: "Data da escolha", valor: "00/00/0000" },
      { rotulo: "Data da nomeação", valor: "00/00/0000" },
    ],
  },
  {
    titulo: "Atualização cadastral e afastamento",
    descricao:
      "O motivo da última atualização é um dado de histórico cadastral; já o retorno do afastamento está relacionado à situação funcional.",
    campos: [
      { rotulo: "Retorno do afastamento", valor: "00/00/0000" },
      { rotulo: "Motivo da última atualização", valor: "xxx" },
    ],
  },
];

export const MENSAGEM_FILTRO_OBRIGATORIO =
  "Preencha pelo menos um campo para buscar.";

export const TOTAL_SERVIDORES = 100;
export const TAMANHO_PAGINA_SERVIDORES = 10;

export type ChaveColunaServidor =
  | "nome"
  | "rf"
  | "cpf"
  | "cl"
  | "vinculo"
  | "cargoAtual"
  | "funcao"
  | "atividade"
  | "classificacao"
  | "dataConvocacao"
  | "dataEscolha"
  | "dataRetornoAfastamento"
  | "grupoAtividade"
  | "liminar"
  | "localExercicio"
  | "lotacao";

export interface SubcolunaServidor {
  chave: keyof ServidorAtivo;
  titulo: string;
}

export interface DefinicaoColunaServidor {
  chave: ChaveColunaServidor;
  titulo: string;
  fixa?: boolean;
  subcolunas?: SubcolunaServidor[];
}

export const LIMITE_COLUNAS_SERVIDORES = 7;

export const COLUNAS_TABELA_SERVIDORES: DefinicaoColunaServidor[] = [
  { chave: "nome", titulo: "Nome", fixa: true },
  { chave: "rf", titulo: "R.F" },
  { chave: "cpf", titulo: "CPF" },
  { chave: "cl", titulo: "CL" },
  { chave: "vinculo", titulo: "Vínculo" },
  { chave: "cargoAtual", titulo: "Cargo atual" },
  { chave: "funcao", titulo: "Função" },
  { chave: "atividade", titulo: "Atividade" },
  {
    chave: "classificacao",
    titulo: "Classificação",
    subcolunas: [
      { chave: "classificacaoGeral", titulo: "Geral" },
      { chave: "classificacaoPcd", titulo: "PCD" },
      { chave: "classificacaoNna", titulo: "NNA" },
    ],
  },
  { chave: "dataConvocacao", titulo: "Data da convocação" },
  { chave: "dataEscolha", titulo: "Data da escolha" },
  {
    chave: "dataRetornoAfastamento",
    titulo: "Data do retorno do afastamento",
  },
  { chave: "grupoAtividade", titulo: "Grupo de atividade" },
  { chave: "liminar", titulo: "Liminar" },
  { chave: "localExercicio", titulo: "Local de exercício" },
  { chave: "lotacao", titulo: "Lotação" },
];

export const CHAVES_COLUNAS_PADRAO: ChaveColunaServidor[] = [
  "nome",
  "rf",
  "cpf",
  "cl",
  "vinculo",
  "cargoAtual",
  "funcao",
];

export interface ServidorAtivo {
  id: string;
  nome: string;
  rf: string;
  cpf: string;
  cl: string;
  vinculo: string;
  cargoAtual: string;
  funcao: string;
  atividade: string;
  classificacaoGeral: string;
  classificacaoPcd: string;
  classificacaoNna: string;
  dataConvocacao: string;
  dataEscolha: string;
  dataRetornoAfastamento: string;
  grupoAtividade: string;
  liminar: string;
  localExercicio: string;
  lotacao: string;
}

const servidorBase: Omit<ServidorAtivo, "id" | "nome"> = {
  rf: "123.456.7",
  cpf: "000.000.000-00",
  cl: "01",
  vinculo: "1",
  cargoAtual: "1234567 - Professor Ensino Infantil",
  funcao: "Professor Ensino Infantil",
  atividade: "Regência",
  classificacaoGeral: "52",
  classificacaoPcd: "0",
  classificacaoNna: "0",
  dataConvocacao: "00/00/0000",
  dataEscolha: "00/00/0000",
  dataRetornoAfastamento: "00/00/0000",
  grupoAtividade: "Apoio à secretaria escolar e famílias",
  liminar: "Sim",
  localExercicio: "Alípio Correa Neto, Prof.",
  lotacao: "Alípio Correa Neto, Prof.",
};

/** Quantidade suficiente para o seletor de pageSize (10/20/50/100) refletir na tabela. */
export const servidoresAtivosEstaticos: ServidorAtivo[] = Array.from(
  { length: 100 },
  (_, indice) => ({
    id: String(indice + 1),
    nome: `João Passos de Almeida ${indice + 1}`,
    ...servidorBase,
  }),
);

export const opcoesFiltrosServidores = {
  dre: opcoesGestao.dre,
  unidadeEducacional: [
    { value: "emef-1", label: "EMEF João da Silva" },
    { value: "emei-1", label: "EMEI Maria Aparecida" },
    { value: "cei-1", label: "CEI Jardim das Flores" },
  ] satisfies OpcaoSelecao[],
  cargoAtual: [
    { value: "pei", label: "Professor de Ensino Fundamental II e Médio" },
    { value: "pef1", label: "Professor de Ensino Fundamental I" },
    { value: "adjunto", label: "Professor Adjunto" },
  ] satisfies OpcaoSelecao[],
  tipoLaudo: [
    { value: "readaptacao", label: "Readaptação" },
    { value: "restricao", label: "Restrição" },
  ] satisfies OpcaoSelecao[],
  grupoAtividades: [
    { value: "grupo-a", label: "Grupo A" },
    { value: "grupo-b", label: "Grupo B" },
  ] satisfies OpcaoSelecao[],
  tipoVaga: [
    { value: "livre", label: "Livre" },
    { value: "ocupada", label: "Ocupada" },
  ] satisfies OpcaoSelecao[],
  liminar: [
    { value: "sim", label: "Sim" },
    { value: "nao", label: "Não" },
  ] satisfies OpcaoSelecao[],
};
