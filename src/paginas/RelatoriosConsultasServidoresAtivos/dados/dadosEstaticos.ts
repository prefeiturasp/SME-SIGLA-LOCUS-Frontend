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
