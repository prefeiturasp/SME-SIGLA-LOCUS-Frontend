import { MENSAGENS_BUSCA_SERVIDOR } from "@/paginas/validacoes/buscarServidor";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import {
  partesDaSugestao,
  resolverServidorDaBusca,
  textoDaSugestao,
} from "../utilitarios";

const ANA: ServidorResumo = {
  rf: "7311452",
  nome: "Ana Beatriz Conceição Lima",
  cpf: "39145678201",
};
const MARIA_APARECIDA: ServidorResumo = {
  rf: "8123409",
  nome: "Maria Aparecida dos Santos",
  cpf: "51738204603",
};
const MARIA_CLARA: ServidorResumo = {
  rf: "8123417",
  nome: "Maria Clara Souza Ribeiro",
  cpf: "62849315704",
};

const GABRIEL_ARANTES: ServidorResumo = {
  rf: "1234567",
  nome: "Gabriel Nascimento Arantes",
  cpf: "04578370802",
};

describe("partesDaSugestao", () => {
  it("devolve os trechos em ordem, marcando o que pode ser destacado", () => {
    expect(partesDaSugestao(GABRIEL_ARANTES)).toEqual([
      { texto: "123.456.7", destaque: "digitos" },
      { texto: " - " },
      { texto: "Gabriel Nascimento Arantes", destaque: "nome" },
      { texto: " [CPF " },
      { texto: "045.783.708-02", destaque: "digitos" },
      { texto: "]" },
    ]);
  });
});

describe("textoDaSugestao", () => {
  it("monta o texto com RF e CPF formatados, como no Figma", () => {
    expect(textoDaSugestao(GABRIEL_ARANTES)).toBe(
      "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
    );
  });
});

describe("resolverServidorDaBusca", () => {
  it("escolhe o servidor de RF exato entre varios resultados", () => {
    expect(
      resolverServidorDaBusca("8123409", [MARIA_APARECIDA, MARIA_CLARA]),
    ).toEqual({ situacao: "encontrado", servidor: MARIA_APARECIDA });
  });

  it("escolhe o servidor de CPF exato, mesmo com mascara", () => {
    expect(
      resolverServidorDaBusca("628.493.157-04", [MARIA_APARECIDA, MARIA_CLARA]),
    ).toEqual({ situacao: "encontrado", servidor: MARIA_CLARA });
  });

  it("escolhe o servidor de nome completo, sem diferenciar acentos", () => {
    const homonimoMaisLongo: ServidorResumo = {
      rf: "8123425",
      nome: "Maria Clara Souza Ribeiro Neto",
      cpf: "73849315705",
    };

    expect(
      resolverServidorDaBusca("MARIA CLARA SOUZA RIBEIRO", [
        homonimoMaisLongo,
        MARIA_CLARA,
      ]),
    ).toEqual({ situacao: "encontrado", servidor: MARIA_CLARA });
  });

  it("usa o unico resultado quando nao ha correspondencia exata", () => {
    expect(resolverServidorDaBusca("conceicao", [ANA])).toEqual({
      situacao: "encontrado",
      servidor: ANA,
    });
  });

  it("indica quando nenhum servidor foi encontrado", () => {
    expect(resolverServidorDaBusca("zzz", [])).toEqual({
      situacao: "naoEncontrado",
    });
  });

  it("pede para escolher na lista quando ha mais de um resultado", () => {
    expect(
      resolverServidorDaBusca("maria", [MARIA_APARECIDA, MARIA_CLARA]),
    ).toEqual({
      situacao: "varios",
      mensagem: MENSAGENS_BUSCA_SERVIDOR.maisDeUmServidor,
    });
  });
});
