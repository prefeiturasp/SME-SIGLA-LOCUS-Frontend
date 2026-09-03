import type { OpcaoSelecao } from "@/servicos/recursos/unidadesEducacionais/tipos";
import {
  opcoesComponenteCurricular,
  opcoesFiltros,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

export const opcoesRegistrarUnidadeEducacional = {
  tipoUnidade: opcoesFiltros.tipoUnidade,
  dre: opcoesFiltros.dre,
  anoMunicipalizacao: opcoesFiltros.anoMunicipalizacao,
  componenteCurricular: opcoesComponenteCurricular,
} as const;

export interface CaracteristicaUnidade {
  chave: keyof CaracteristicasPadrao;
  titulo: string;
  descricao: string;
  valorPadrao: boolean;
  exibeAnoMunicipalizacao?: boolean;
  exibeMotivoNaoContabilizacao?: boolean;
}

export interface CaracteristicasPadrao {
  escolaMunicipalizada: boolean;
  ensinoFundamentalI: boolean;
  ejaModular: boolean;
  saoPauloIntegral: boolean;
  contabilizarUE: boolean;
}

export const caracteristicasUnidade: CaracteristicaUnidade[] = [
  {
    chave: "escolaMunicipalizada",
    titulo: "Escola Municipalizada",
    descricao:
      "Se a unidade educacional for municipalizada, selecione abaixo o ano da municipalização.",
    valorPadrao: false,
    exibeAnoMunicipalizacao: true,
  },
  {
    chave: "ensinoFundamentalI",
    titulo: "Ensino fundamental I",
    descricao: "A unidade educacional possui ensino fundamental I.",
    valorPadrao: false,
  },
  {
    chave: "ejaModular",
    titulo: "EJA Modular",
    descricao:
      "A unidade educacional possui Ensino de Jovens e Adultos na modalidade Modular.",
    valorPadrao: false,
  },
  {
    chave: "saoPauloIntegral",
    titulo: "São Paulo Integral",
    descricao:
      "A unidade educacional faz parte do programa São Paulo Integral.",
    valorPadrao: false,
  },
  {
    chave: "contabilizarUE",
    titulo: "Contabilizar UE",
    descricao: "A unidade será contabilizada nos cálculos do LOCUS.",
    valorPadrao: true,
    exibeMotivoNaoContabilizacao: true,
  },
];

export const caracteristicasPadrao: CaracteristicasPadrao =
  caracteristicasUnidade.reduce(
    (acc, item) => ({ ...acc, [item.chave]: item.valorPadrao }),
    {} as CaracteristicasPadrao,
  );

export interface DadosLotacaoConsultaMock {
  tipoUnidade: string;
  dre: string;
  nome: string;
}

export const lotacoesConsultaExemplo: Record<
  string,
  DadosLotacaoConsultaMock
> = {
  "123": {
    tipoUnidade: "EMEF",
    dre: "itaquera",
    nome: "EMEF Prof. Maria da Silva",
  },
  "456": {
    tipoUnidade: "EMEI",
    dre: "butanta",
    nome: "EMEI Jardim das Flores",
  },
  "789": {
    tipoUnidade: "CEI",
    dre: "sao-miguel",
    nome: "CEI Vila Nova",
  },
};

export type { OpcaoSelecao };
