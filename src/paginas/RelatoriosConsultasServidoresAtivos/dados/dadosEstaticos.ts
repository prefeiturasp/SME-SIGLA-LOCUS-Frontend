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
      { rotulo: "Nome completo", valor: "Maria Silva Santos" },
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

export const TITULO_CARD_RESULTADOS_SERVIDORES = "Filtrar servidores";

export const DESCRICAO_CARD_RESULTADOS_SERVIDORES =
  "A lista reúne os servidores que correspondem aos filtros aplicados. Para mais informações sobre um servidor, clique em 'Mais detalhes'.";

export const MENSAGEM_SEM_RESULTADOS_TITULO =
  "Não encontramos dados para esta busca";

export const MENSAGEM_SEM_RESULTADOS_DESCRICAO =
  "Experimente remover alguns filtros ou selecionar outros critérios de busca.";

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
  cargoAtualCodigo: string;
  funcao: string;
  atividade: string;
  classificacaoGeral: string;
  classificacaoPcd: string;
  classificacaoNna: string;
  dataConvocacao: string;
  dataEscolha: string;
  dataRetornoAfastamento: string;
  grupoAtividade: string;
  grupoAtividadesCodigo: string;
  liminar: string;
  liminarCodigo: string;
  localExercicio: string;
  lotacao: string;
  dre: string;
  unidadeEducacional: string;
  tipoLaudo: string;
  tipoVaga: string;
}

/**
 * 30 nomes (sempre 3 palavras), com o padrão:
 * 3 Maria → 2 Pedro → 20 nomes distintos → 2 Ricardo → 3 Lúcia.
 * Alguns sobrenomes se repetem (Silva, Costa, Lima, Rocha, Santos, etc.).
 */
export const NOMES_SERVIDORES_ESTATICOS = [
  // 3 com mesmo primeiro nome
  "Maria Silva Santos",
  "Maria Oliveira Costa",
  "Maria Souza Lima Campos",
  // 2 com mesmo primeiro nome
  "Pedro Almeida Rocha",
  "Pedro Ferreira Dias",
  // nomes distintos (com sobrenomes compartilhados)
  "Ana Beatriz Nunes",
  "Carlos Farias Eduardo Silva Campos",
  "Fernanda Ribeiro Alves",
  "Lucas Mendes Costa",
  "Juliana  Farias Barbosa Freitas",
  "Rafael Campos Duarte",
  "Patricia Araujo Lima",
  "Bruno Teixeira Lopes",
  "Camila Martins Vieira",
  "Gustavo Pereira Rocha",
  "Larissa Correia Monteiro",
  "Thiago Batista Santos",
  "Amanda Cardoso Nogueira",
  "Diego Moreira Cunha Nunes",
  "Beatriz Farias Rezende",
  "Henrique Vasconcelos Prado",
  "Isabela Henriques Paiva",
  "Felipe Borges Tavares",
  "Natalia Aparicio Gomes",
  "Eduardo Duarte Brandao Nunes",
  // 2 com mesmo primeiro nome
  "Ricardo Nascimento Prado",
  "Ricardo Borges Alves Campos",
  // 3 com mesmo primeiro nome
  "Lucia Aparicio Gomes",
  "Lucia Henriques Paiva",
  "Lucia Vasconcelos Brandao",
] as const;

const cargosRotulo: Record<string, string> = {
  pei: "Professor de Ensino Fundamental II e Médio",
  pef1: "Professor de Ensino Fundamental I",
  adjunto: "Professor Adjunto",
};

const gruposRotulo: Record<string, string> = {
  "grupo-a": "Grupo A",
  "grupo-b": "Grupo B",
};

const unidadesRotulo: Record<string, string> = {
  "emef-1": "EMEF João da Silva",
  "emei-1": "EMEI Maria Aparecida",
  "cei-1": "CEI Jardim das Flores",
};

function montarServidor(
  indice: number,
  nome: string,
  extras: Partial<ServidorAtivo> = {},
): ServidorAtivo {
  const cargoAtualCodigo = extras.cargoAtualCodigo ?? "pei";
  const grupoAtividadesCodigo = extras.grupoAtividadesCodigo ?? "grupo-a";
  const liminarCodigo =
    extras.liminarCodigo ?? (indice % 3 === 0 ? "sim" : "nao");
  const unidadeEducacional = extras.unidadeEducacional ?? "emef-1";

  return {
    id: String(indice + 1),
    nome,
    rf: `${String(100 + indice).padStart(3, "0")}.${String(200 + indice).padStart(3, "0")}.${indice % 10}`,
    cpf: `${String(100 + indice).padStart(3, "0")}.${String(200 + indice).padStart(3, "0")}.${String(300 + indice).padStart(3, "0")}-${String(indice).padStart(2, "0")}`,
    cl: String((indice % 5) + 1).padStart(2, "0"),
    vinculo: String((indice % 3) + 1),
    cargoAtualCodigo,
    cargoAtual: `${1000000 + indice} - ${cargosRotulo[cargoAtualCodigo]}`,
    funcao: cargosRotulo[cargoAtualCodigo],
    atividade: indice % 2 === 0 ? "Regência" : "Apoio pedagógico",
    classificacaoGeral: String(40 + (indice % 30)),
    classificacaoPcd: indice % 7 === 0 ? "1" : "0",
    classificacaoNna: indice % 11 === 0 ? "1" : "0",
    dataConvocacao: "01/02/2020",
    dataEscolha: "15/03/2020",
    dataRetornoAfastamento:
      extras.dataRetornoAfastamento ??
      (indice % 4 === 0 ? "10/01/2024" : "00/00/0000"),
    grupoAtividadesCodigo,
    grupoAtividade: gruposRotulo[grupoAtividadesCodigo],
    liminarCodigo,
    liminar: liminarCodigo === "sim" ? "Sim" : "Não",
    unidadeEducacional,
    localExercicio: unidadesRotulo[unidadeEducacional],
    lotacao: unidadesRotulo[unidadeEducacional],
    dre: extras.dre ?? (indice % 2 === 0 ? "butanta" : "itaquera"),
    tipoLaudo:
      extras.tipoLaudo ?? (indice % 2 === 0 ? "readaptacao" : "restricao"),
    tipoVaga: extras.tipoVaga ?? (indice % 2 === 0 ? "livre" : "ocupada"),
  };
}

export const servidoresAtivosEstaticos: ServidorAtivo[] =
  NOMES_SERVIDORES_ESTATICOS.map((nome, indice) => {
    if (indice < 3) {
      return montarServidor(indice, nome, {
        dre: "butanta",
        unidadeEducacional: "emef-1",
        cargoAtualCodigo: "pei",
        liminarCodigo: "sim",
      });
    }
    if (indice < 5) {
      return montarServidor(indice, nome, {
        dre: "itaquera",
        unidadeEducacional: "emei-1",
        cargoAtualCodigo: "pef1",
        liminarCodigo: "nao",
      });
    }
    if (indice >= 25 && indice < 27) {
      return montarServidor(indice, nome, {
        dre: "sao-miguel",
        unidadeEducacional: "cei-1",
        cargoAtualCodigo: "adjunto",
        grupoAtividadesCodigo: "grupo-b",
      });
    }
    if (indice >= 27) {
      return montarServidor(indice, nome, {
        dre: "butanta",
        unidadeEducacional: "emef-1",
        tipoLaudo: "restricao",
        tipoVaga: "ocupada",
      });
    }
    return montarServidor(indice, nome);
  });

export const TOTAL_SERVIDORES = servidoresAtivosEstaticos.length;

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
