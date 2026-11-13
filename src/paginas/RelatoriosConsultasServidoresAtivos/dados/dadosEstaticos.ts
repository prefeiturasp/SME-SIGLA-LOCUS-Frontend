import dayjs from "dayjs";
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
  tipoLotacao: string;
  codigoLotacao: string;
  tipoUnidadeLotacao: string;
  codigoExercicio: string;
  dreExercicio: string;
  tipoUnidadeExercicio: string;
  dataNomeacao: string;
  dataUltimaAtualizacao: string;
  motivoUltimaAtualizacao: string;
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

interface UnidadeEstatica {
  nome: string;
  codigo: string;
  tipo: string;
  dre: string;
}

const unidadesEstaticas: Record<string, UnidadeEstatica> = {
  "emef-1": {
    nome: "EMEF João da Silva",
    codigo: "019453",
    tipo: "EMEF",
    dre: "butanta",
  },
  "emei-1": {
    nome: "EMEI Maria Aparecida",
    codigo: "092118",
    tipo: "EMEI",
    dre: "itaquera",
  },
  "cei-1": {
    nome: "CEI Jardim das Flores",
    codigo: "400567",
    tipo: "CEI DIRET",
    dre: "sao-miguel",
  },
  "emef-alipio": {
    nome: "EMEF Alípio Correa Neto, Prof.",
    codigo: "017205",
    tipo: "EMEF",
    dre: "butanta",
  },
};

const funcoesPorCargo: Record<string, string[]> = {
  pei: [
    "Professor regente",
    "Professor de apoio pedagógico (PAP)",
    "Professor orientador de informática educativa (POIE)",
  ],
  pef1: ["Professor regente", "Professor orientador de sala de leitura"],
  adjunto: ["Professor em módulo", "Professor regente"],
};

const motivosAtualizacao = [
  "Atualização de endereço",
  "Alteração de jornada de trabalho",
  "Mudança de lotação",
  "Inclusão de laudo médico",
  "Atualização de dados bancários",
];

export const SEM_RETORNO_AFASTAMENTO = "00/00/0000";

function formatarData(data: dayjs.Dayjs): string {
  return data.format("DD/MM/YYYY");
}

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
  const dre = extras.dre ?? (indice % 2 === 0 ? "butanta" : "itaquera");
  const unidadeLotacao = unidadesEstaticas[unidadeEducacional];
  const exerceEmOutraUnidade = indice % 5 === 4;
  const unidadeExercicio = exerceEmOutraUnidade
    ? unidadesEstaticas["emef-alipio"]
    : unidadeLotacao;
  const funcoes = funcoesPorCargo[cargoAtualCodigo];
  const dataRetornoAfastamento =
    extras.dataRetornoAfastamento ??
    (indice % 4 === 0 ? "10/01/2024" : SEM_RETORNO_AFASTAMENTO);
  const convocacao = dayjs(
    new Date(2016 + (indice % 7), indice % 12, (indice % 27) + 1),
  );

  return {
    id: String(indice + 1),
    nome,
    rf: `${String(100 + indice).padStart(3, "0")}.${String(200 + indice).padStart(3, "0")}.${indice % 10}`,
    cpf: `${String(100 + indice).padStart(3, "0")}.${String(200 + indice).padStart(3, "0")}.${String(300 + indice).padStart(3, "0")}-${String(indice).padStart(2, "0")}`,
    cl: String((indice % 5) + 1).padStart(2, "0"),
    vinculo: String((indice % 3) + 1),
    cargoAtualCodigo,
    cargoAtual: `${1000000 + indice} - ${cargosRotulo[cargoAtualCodigo]}`,
    funcao: funcoes[indice % funcoes.length],
    atividade: indice % 2 === 0 ? "Regência" : "Apoio pedagógico",
    classificacaoGeral: String(40 + (indice % 30)),
    classificacaoPcd: indice % 7 === 0 ? "1" : "0",
    classificacaoNna: indice % 11 === 0 ? "1" : "0",
    dataConvocacao: formatarData(convocacao),
    dataEscolha: formatarData(convocacao.add(14 + (indice % 5), "day")),
    dataRetornoAfastamento,
    grupoAtividadesCodigo,
    grupoAtividade: gruposRotulo[grupoAtividadesCodigo],
    liminarCodigo,
    liminar: liminarCodigo === "sim" ? "Sim" : "Não",
    unidadeEducacional,
    localExercicio: unidadeExercicio.nome,
    lotacao: unidadeLotacao.nome,
    dre,
    tipoLaudo:
      extras.tipoLaudo ?? (indice % 2 === 0 ? "readaptacao" : "restricao"),
    tipoVaga: extras.tipoVaga ?? (indice % 2 === 0 ? "livre" : "ocupada"),
    tipoLotacao: indice % 4 === 1 ? "Provisória" : "Definitiva",
    codigoLotacao: unidadeLotacao.codigo,
    tipoUnidadeLotacao: unidadeLotacao.tipo,
    codigoExercicio: unidadeExercicio.codigo,
    dreExercicio: exerceEmOutraUnidade ? unidadeExercicio.dre : dre,
    tipoUnidadeExercicio: unidadeExercicio.tipo,
    dataNomeacao: formatarData(convocacao.add(45 + (indice % 10), "day")),
    dataUltimaAtualizacao: formatarData(
      dayjs(
        new Date(2024 + (indice % 2), (indice * 5) % 12, (indice % 27) + 1),
      ),
    ),
    motivoUltimaAtualizacao:
      dataRetornoAfastamento === SEM_RETORNO_AFASTAMENTO
        ? motivosAtualizacao[indice % motivosAtualizacao.length]
        : "Retorno de afastamento",
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
