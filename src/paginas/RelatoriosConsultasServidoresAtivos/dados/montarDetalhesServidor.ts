import {
  opcoesFiltrosServidores,
  SEM_RETORNO_AFASTAMENTO,
  type SecaoDetalheServidor,
  type ServidorAtivo,
} from "./dadosEstaticos";

function rotuloOpcao(
  opcoes: readonly { value: string; label: string }[],
  valor: string,
): string {
  return opcoes.find((opcao) => opcao.value === valor)?.label ?? valor;
}

export function montarDetalhesServidor(
  servidor: ServidorAtivo,
): SecaoDetalheServidor[] {
  const dre = rotuloOpcao(opcoesFiltrosServidores.dre, servidor.dre);
  const dreExercicio = rotuloOpcao(
    opcoesFiltrosServidores.dre,
    servidor.dreExercicio,
  );

  return [
    {
      titulo: "Identificação do servidor",
      descricao:
        "Informações que permitem identificar a pessoa e localizar seu registro.",
      campos: [
        { rotulo: "Nome completo", valor: servidor.nome },
        { rotulo: "R.F", valor: servidor.rf },
        { rotulo: "CPF", valor: servidor.cpf },
      ],
    },
    {
      titulo: "Vínculo funcional",
      descricao:
        "Informações sobre o vínculo administrativo do servidor e seu cargo.",
      campos: [
        { rotulo: "Vínculo", valor: servidor.vinculo },
        { rotulo: "CL", valor: servidor.cl },
        { rotulo: "Cargo atual", valor: servidor.cargoAtual },
        { rotulo: "Função", valor: servidor.funcao },
      ],
    },
    {
      titulo: "Lotação",
      descricao:
        "Permite identificar a unidade à qual o servidor está vinculado.",
      campos: [
        { rotulo: "Código", valor: servidor.codigoLotacao },
        { rotulo: "Tipo de lotação", valor: servidor.tipoLotacao },
        { rotulo: "DRE", valor: dre },
        { rotulo: "UE", valor: servidor.lotacao },
        { rotulo: "Tipo da unidade", valor: servidor.tipoUnidadeLotacao },
      ],
    },
    {
      titulo: "Local de exercício",
      descricao:
        "Permite identificar a unidade onde o servidor exerce suas atividades.",
      campos: [
        { rotulo: "Código", valor: servidor.codigoExercicio },
        { rotulo: "DRE", valor: dreExercicio },
        { rotulo: "UE", valor: servidor.localExercicio },
        { rotulo: "Tipo da unidade", valor: servidor.tipoUnidadeExercicio },
      ],
    },
    {
      titulo: "Atuação profissional",
      descricao:
        "Informações que caracterizam a atividade desempenhada pelo servidor.",
      campos: [
        { rotulo: "Grupo de atividade", valor: servidor.grupoAtividade },
        { rotulo: "Atividade", valor: servidor.atividade },
      ],
    },
    {
      titulo: "Classificação e condições do vínculo",
      descricao:
        "Informações complementares que podem influenciar a situação funcional do servidor.",
      campos: [
        { rotulo: "Classificação geral", valor: servidor.classificacaoGeral },
        { rotulo: "Classificação PCD", valor: servidor.classificacaoPcd },
        { rotulo: "Classificação NNA", valor: servidor.classificacaoNna },
        {
          rotulo: "Tipo de vaga",
          valor: rotuloOpcao(
            opcoesFiltrosServidores.tipoVaga,
            servidor.tipoVaga,
          ),
        },
        { rotulo: "Liminar", valor: servidor.liminar },
        {
          rotulo: "Tipo de laudo",
          valor: rotuloOpcao(
            opcoesFiltrosServidores.tipoLaudo,
            servidor.tipoLaudo,
          ),
        },
      ],
    },
    {
      titulo: "Ingresso e movimentação funcional",
      descricao: "Informações sobre as etapas de ingresso do servidor.",
      campos: [
        { rotulo: "Data da convocação", valor: servidor.dataConvocacao },
        { rotulo: "Data da escolha", valor: servidor.dataEscolha },
        { rotulo: "Data da nomeação", valor: servidor.dataNomeacao },
      ],
    },
    {
      titulo: "Atualização cadastral e afastamento",
      descricao:
        "O motivo da última atualização é um dado de histórico cadastral; já o retorno do afastamento está relacionado à situação funcional.",
      campos: [
        {
          rotulo: "Retorno do afastamento",
          valor:
            servidor.dataRetornoAfastamento === SEM_RETORNO_AFASTAMENTO
              ? "Sem afastamento registrado"
              : servidor.dataRetornoAfastamento,
        },
        {
          rotulo: "Data da última atualização",
          valor: servidor.dataUltimaAtualizacao,
        },
        {
          rotulo: "Motivo da última atualização",
          valor: servidor.motivoUltimaAtualizacao,
        },
      ],
    },
  ];
}
