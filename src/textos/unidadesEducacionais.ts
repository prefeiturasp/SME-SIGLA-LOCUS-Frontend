
export const LEGENDAS_ESTATISTICA = {
  modulos: "Quantidade de vagas disponibilizadas",
  lotacao: "Quantidade de professores alocados",
  afastados: "Quantidade de afastamentos temporários",
  vagas: "Quantidade de vagas ainda disponíveis",
} as const;

const DICA_VAGAS =
  "Valores negativos indicam professores excedentes. Valores positivos indicam vagas disponíveis.";

export const DICAS_COLUNAS_UNIDADE = {
  modulo:
    "Quantidade total de vagas previstas na unidade educacional, estejam elas ocupadas ou não.",
  lotacao:
    "Quantidade de professores atualmente lotados na unidade educacional.",
  afastados:
    "Quantidade de professores temporariamente afastados de suas atividades.",
  vagas: DICA_VAGAS,
} as const;

export const DICAS_COLUNAS_COMPONENTE = {
  modulo:
    "Quantidade total de vagas previstas para este componente curricular na unidade educacional, estejam elas ocupadas ou não.",
  lotacao:
    "Quantidade de professores deste componente curricular atualmente lotados na unidade educacional.",
  afastados:
    "Quantidade de professores deste componente curricular que estão temporariamente afastados de suas atividades na unidade educacional.",
  vacancia:
    "Quantidade de professores deste componente curricular cuja situação resultou na abertura de vagas na unidade escolar.",
  vagas: DICA_VAGAS,
} as const;
