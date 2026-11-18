import type { UnidadeEducacional } from "@/servicos/recursos/unidadesEducacionais/tipos";
import { linhasUnidades } from "../dadosEstaticos";
import {
  montarAbaRelatorioUnidades,
  NOME_ABA_UNIDADES,
} from "../montarPlanilhaUnidades";

const CABECALHO_UNIDADES = [
  "Código de lotação",
  "Tipo",
  "Unidade Educacional",
  "DRE",
  "Módulo",
  "Lotação",
  "Afastados",
  "Vagas",
];

function unidade(dados: Partial<UnidadeEducacional> = {}): UnidadeEducacional {
  return {
    codigoLotacao: "091488",
    tipo: "CECI",
    nome: "Cidade Tiradentes",
    dre: "Itaquera",
    modulo: 105,
    lotacao: 108,
    afastados: 8,
    saldoVagas: 5,
    ...dados,
  };
}

describe("montarAbaRelatorioUnidades", () => {
  it("gera a aba Unidades educacionais", () => {
    const aba = montarAbaRelatorioUnidades([unidade()]);

    expect(aba.nome).toBe(NOME_ABA_UNIDADES);
    expect(NOME_ABA_UNIDADES).toBe("Unidades educacionais");
  });

  it("monta a tabela de unidades com o texto de vagas igual ao da tela", () => {
    const aba = montarAbaRelatorioUnidades([
      unidade(),
      unidade({
        codigoLotacao: "091977",
        nome: "Dom Paulo Evaristo Arns",
        dre: "São Miguel",
        modulo: 27,
        lotacao: 33,
        afastados: 2,
        saldoVagas: -4,
      }),
      unidade({ codigoLotacao: "093855", afastados: 0, saldoVagas: 0 }),
    ]);

    expect(aba.linhas).toEqual([
      CABECALHO_UNIDADES,
      [
        "091488",
        "CECI",
        "Cidade Tiradentes",
        "Itaquera",
        105,
        108,
        8,
        "+5 disponíveis",
      ],
      [
        "091977",
        "CECI",
        "Dom Paulo Evaristo Arns",
        "São Miguel",
        27,
        33,
        2,
        "-4 excedentes",
      ],
      [
        "093855",
        "CECI",
        "Cidade Tiradentes",
        "Itaquera",
        105,
        108,
        0,
        "Completo",
      ],
    ]);
  });

  it("mantem o codigo de lotacao como texto, preservando o zero a esquerda", () => {
    const aba = montarAbaRelatorioUnidades([unidade()]);

    expect(aba.linhas[1][0]).toBe("091488");
  });

  it("exporta so o cabecalho quando nao ha unidades", () => {
    const aba = montarAbaRelatorioUnidades([]);

    expect(aba.linhas).toEqual([CABECALHO_UNIDADES]);
  });

  it("cobre todas as unidades dos dados estaticos da tela", () => {
    const aba = montarAbaRelatorioUnidades(linhasUnidades);

    expect(aba.linhas).toHaveLength(1 + linhasUnidades.length);
  });
});
