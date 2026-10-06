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

export interface RegistroAtualizacao {
  id: string;
  motivo: string;
  data: string;
  portaria: string;
  documento?: string;
}

export const historicoAtualizacoesEstatico: RegistroAtualizacao[] = [
  {
    id: "a1",
    motivo: "Realocação",
    data: "2026-03-15",
    portaria: "184/2026",
  },
  {
    id: "a2",
    motivo: "Retorno afastamento",
    data: "2026-01-10",
    portaria: "125/2026",
  },
  {
    id: "a3",
    motivo: "Fixação de lotação",
    data: "2025-08-20",
    portaria: "328/2025",
  },
  {
    id: "a4",
    motivo: "Ingresso",
    data: "2021-03-08",
    portaria: "491/2021",
  },
];

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

export const opcoesMotivoAtualizacao = opcoes([
  "Afastamento por cargo eletivo",
  "Afastamento fora da SME",
  "Afastamento sindical",
  "Afastamento Assembleia Legislativa",
  "Afastamento Câmara Municipal",
  "Anulação de posse",
  "Aposentadoria",
  "Aposentadoria com mandado de segurança",
  "Ass. pedag. polo formação",
  "Caráter excepcional designação",
  "CEFAI designação",
  "Cessação readaptação funcional",
  "Cessação caráter excepcional",
  "Cessação classe bilíngue",
  "Cessação afastamento Câmara Municipal",
  "Cessação afastamento sindical",
  "Cessação ass. pedag. polo formação",
  "Cessação CEFAI",
  "Cessação CIEJA",
  "Cessação CMCT",
  "Cessação coordenador de CELP",
  "Cessação coordenador de polo",
  "Cessação entidade",
  "Cessação gestor",
  "Cessação NAAPA",
  "Cessação PAAI",
  "Cessação PAEE",
  "Cessação PAP",
  "Cessação POA",
  "Cessação POED",
  "Cessação POEI",
  "Cessação POSL",
  "Cessação professor de CELP",
  "Cessação projeto em EMEBS",
  "Cessação realocação",
  "Cessação CIEJA S.T.E",
  "CEU regência",
  "CIEJA designação",
  "CIEJA regência",
  "CIEJA S.T.E",
  "Classe bilíngue designação",
  "CMCT designação",
  "Coordenador interno do polo da UAB",
  "Definitivo readaptação funcional",
  "Demissão",
  "Designação coordenador de CELP",
  "Designação professor de CELP",
  "Designação",
  "Designação gestor",
  "Entidade designação",
  "Escolha definitiva",
  "Escolha precária",
  "Exoneração",
  "Exoneração art. 125",
  "Exoneração art. 126",
  "Exoneração cargo alternativo",
  "Exoneração insubsistente",
  "Falecimento",
  "Fechado sem documento",
  "Fixação de lotação",
  "Ingresso",
  "Licença acompanhamento marido",
  "Licença interesse particular",
  "Liminar",
  "NAAPA designação",
  "Nomeação",
  "Nomeação acesso",
  "Nomeação acesso com mandado",
  "Nomeação com mandado",
  "Nomeação insubsistente",
  "Nomeado período fechado",
  "PAAI designação",
  "PAEE designação",
  "POA designação",
  "POED designação",
  "POEI designação",
  "POSL designação",
  "Prorrogação caráter excepcional designação",
  "Prorrogação CIEJA S.T.E",
  "Prorrogação NAAPA designação",
  "Prorrogação PAAI designação",
  "Psicopedagogo designação",
  "RE efetivação",
  "Readmissão",
  "Realocação",
  "Reassunção",
  "Regência em EMEBS designação",
  "Remanejamento COARP",
  "Remoção por permuta",
  "Retorno afastamento",
  "Temporário readaptação funcional",
  "Torna insubsistente",
  "Torna insubsistente sem efeito",
  "Trabalho readaptação funcional",
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
