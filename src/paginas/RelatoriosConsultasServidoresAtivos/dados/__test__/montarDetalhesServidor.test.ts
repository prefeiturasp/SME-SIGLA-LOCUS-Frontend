import { servidoresAtivosEstaticos } from "../dadosEstaticos";
import { montarDetalhesServidor } from "../montarDetalhesServidor";

function campos(indice: number, secao: string) {
  const detalhes = montarDetalhesServidor(servidoresAtivosEstaticos[indice]);
  const encontrada = detalhes.find((item) => item.titulo === secao);
  return Object.fromEntries(
    (encontrada?.campos ?? []).map((campo) => [campo.rotulo, campo.valor]),
  );
}

describe("montarDetalhesServidor", () => {
  it("usa os dados do servidor na identificacao e no vinculo", () => {
    const servidor = servidoresAtivosEstaticos[3];

    expect(campos(3, "Identificação do servidor")).toEqual({
      "Nome completo": servidor.nome,
      "R.F": servidor.rf,
      CPF: servidor.cpf,
    });
    expect(campos(3, "Vínculo funcional")).toEqual({
      Vínculo: servidor.vinculo,
      CL: servidor.cl,
      "Cargo atual": servidor.cargoAtual,
      Função: servidor.funcao,
    });
  });

  it("traduz os codigos de DRE, tipo de vaga e tipo de laudo", () => {
    expect(campos(0, "Lotação")).toMatchObject({
      DRE: "Butantã",
      UE: "EMEF João da Silva",
      "Tipo da unidade": "EMEF",
    });
    expect(campos(0, "Classificação e condições do vínculo")).toMatchObject({
      "Tipo de vaga": "Livre",
      "Tipo de laudo": "Readaptação",
    });
  });

  it("mostra local de exercicio diferente da lotacao quando houver", () => {
    expect(campos(4, "Lotação")).toMatchObject({
      DRE: "Itaquera",
      UE: "EMEI Maria Aparecida",
    });
    expect(campos(4, "Local de exercício")).toEqual({
      Código: "017205",
      DRE: "Butantã",
      UE: "EMEF Alípio Correa Neto, Prof.",
      "Tipo da unidade": "EMEF",
    });
  });

  it("descreve a situacao de afastamento do servidor", () => {
    expect(campos(0, "Atualização cadastral e afastamento")).toMatchObject({
      "Retorno do afastamento": "10/01/2024",
      "Motivo da última atualização": "Retorno de afastamento",
    });
    expect(campos(1, "Atualização cadastral e afastamento")).toMatchObject({
      "Retorno do afastamento": "Sem afastamento registrado",
      "Motivo da última atualização": "Alteração de jornada de trabalho",
    });
  });

  it("gera detalhes diferentes para servidores diferentes", () => {
    const primeiro = montarDetalhesServidor(servidoresAtivosEstaticos[0]);
    const segundo = montarDetalhesServidor(servidoresAtivosEstaticos[1]);

    expect(primeiro).not.toEqual(segundo);
  });
});
