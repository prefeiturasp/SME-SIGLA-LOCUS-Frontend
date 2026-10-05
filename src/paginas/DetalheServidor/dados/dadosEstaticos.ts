export interface ServidorCadastro {
  nome: string;
  situacao: string;
  complemento: string;
  registroFuncional: string;
  cpf: string;
  cargoAtual: string;
  codigoCargo: string;
}

/** Cadastro exibido enquanto não há back-end. */
export const servidorEstatico: ServidorCadastro = {
  nome: "Gabriel Nascimento Arantes",
  situacao: "Ativo",
  complemento: "Cadastro funcional individual",
  registroFuncional: "123.456.7",
  cpf: "123.456.789-10",
  cargoAtual: "Professor de Educação Infantil e Ensino Fundamental I",
  codigoCargo: "1234",
};

function opcoes(rotulos: string[]) {
  return rotulos.map((rotulo) => ({ value: rotulo, label: rotulo }));
}

export const opcoesSituacaoCargoBase = opcoes([
  "Ativo",
  "Afastado",
  "Em exercício",
  "Encerrado",
]);

export const dadosFuncionaisEstaticos = {
  cl: "01",
  vinculo: "01",
  situacaoCargoBase: "Ativo",
};

export const opcoesAtividade = opcoes([
  "Regência",
  "Afastado",
  "Carol ALT",
  "CIEJA Regência",
  "CMCT",
  "Coord UAB",
  "Entidade",
  "Laudo médico",
  "POSL",
  "Proj em EMEBS",
  "PAP",
]);

export const opcoesTipoVaga = opcoes([
  "Vaga definitiva",
  "Vaga precária",
  "Sem vaga ocupada",
]);

export const atividadeEstatica = {
  atividade: "Regência",
  tipoVaga: "Vaga definitiva",
  realocado: false,
};

export type AbaUnidade = "lotacao" | "exercicio";

export const opcoesTipoLotacao = opcoes(["Definitiva", "Precária"]);

export const opcoesTipoLaudo = opcoes([
  "Temporário",
  "Trabalho",
  "Definitivo",
  "Grupo",
]);

export const opcoesAtividadeReadaptacao = opcoes([
  "Docente",
  "Apoio à equipe gestora",
  "Apoio à secretaria escolar e famílias",
]);

export const lotacaoEstatica = {
  codigoEol: "123.456.7",
  tipo: "EMEF",
  dre: "DRE Butantã",
  nomeUnidade: "EMEF Alípio Correa Neto, Prof.",
  tipoLotacao: "Definitiva",
};

export const exercicioEstatico = {
  codigoEol: "123.456.7",
  tipo: "EMEF",
  dre: "DRE Butantã",
  nomeUnidade: "EMEF Alípio Correa Neto, Prof.",
  tipoLotacao: "Precária",
};

export const concursoEstatico = {
  classificacaoGeral: "142",
  dataConvocacao: "2021-02-12",
  dataEscolha: "2021-02-22",
  dataNomeacao: "2021-03-08",
};

export const encerramentoEstatico = {
  dataEscolha: "2021-02-22",
  aviso: "Ao informar a data, esta pessoa aparecerá somente em Vacância.",
  ajuda:
    "Informe esta data somente quando o cargo base deixar de estar ativo no sistema.",
};
