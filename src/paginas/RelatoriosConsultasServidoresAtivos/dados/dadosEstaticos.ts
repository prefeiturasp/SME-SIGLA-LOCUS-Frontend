import type { OpcaoSelecao } from "@/servicos/recursos/unidadesEducacionais/tipos";
import { opcoesFiltros as opcoesGestao } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

export const MENSAGEM_FILTRO_OBRIGATORIO =
  "Preencha pelo menos um campo para buscar.";

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
