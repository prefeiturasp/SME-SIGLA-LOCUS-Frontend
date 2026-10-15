import {
  filtrarServidores,
  pesquisarServidores,
  type ServidorResumo,
} from "..";

const SERVIDORES: ServidorResumo[] = [
  { rf: "7311452", nome: "Ana Beatriz Conceição Lima", cpf: "39145678201" },
  { rf: "7311460", nome: "João Pedro Araújo Santos", cpf: "28473619502" },
  { rf: "8123409", nome: "Maria Aparecida dos Santos", cpf: "51738204603" },
];

function rfs(servidores: ServidorResumo[]): string[] {
  return servidores.map(({ rf }) => rf);
}

describe("filtrarServidores", () => {
  it("encontra pelo nome sem diferenciar acentos e maiusculas", () => {
    expect(rfs(filtrarServidores(SERVIDORES, "conceicao"))).toEqual([
      "7311452",
    ]);
    expect(rfs(filtrarServidores(SERVIDORES, "JOÃO"))).toEqual(["7311460"]);
  });

  it("encontra por qualquer trecho do nome", () => {
    expect(rfs(filtrarServidores(SERVIDORES, "santos"))).toEqual([
      "7311460",
      "8123409",
    ]);
  });

  it("encontra pelo inicio do RF", () => {
    expect(rfs(filtrarServidores(SERVIDORES, "73114"))).toEqual([
      "7311452",
      "7311460",
    ]);
  });

  it("encontra pelo CPF com ou sem mascara", () => {
    expect(rfs(filtrarServidores(SERVIDORES, "517.382.046-03"))).toEqual([
      "8123409",
    ]);
    expect(rfs(filtrarServidores(SERVIDORES, "517382"))).toEqual(["8123409"]);
  });

  it("nao casa numero que aparece so no meio do RF ou do CPF", () => {
    expect(filtrarServidores(SERVIDORES, "1145")).toEqual([]);
  });

  it("devolve vazio para termo em branco ou so com pontuacao", () => {
    expect(filtrarServidores(SERVIDORES, "   ")).toEqual([]);
    expect(filtrarServidores(SERVIDORES, ".-.")).toEqual([]);
  });

  it("ordena os servidores pelo nome", () => {
    const fora: ServidorResumo[] = [
      { rf: "1000003", nome: "Gabriel Nascimento Souza Cruz", cpf: "1" },
      { rf: "1000001", nome: "Gabriel Nascimento de Andrade", cpf: "2" },
      { rf: "1000002", nome: "Gabriel Nascimento Arantes", cpf: "3" },
    ];

    expect(rfs(filtrarServidores(fora, "gabriel"))).toEqual([
      "1000002",
      "1000001",
      "1000003",
    ]);
  });

  it("devolve no maximo 50 servidores", () => {
    const muitos = Array.from({ length: 60 }, (_, i) => ({
      rf: String(7000000 + i),
      nome: `Servidor ${i}`,
      cpf: String(10000000000 + i),
    }));

    expect(filtrarServidores(muitos, "servidor")).toHaveLength(50);
  });
});

describe("pesquisarServidores", () => {
  it("resolve os servidores do mock que casam com o termo", async () => {
    const resultado = await pesquisarServidores("maria").response;

    expect(resultado.map(({ nome }) => nome)).toEqual([
      "Maria Aparecida dos Santos",
      "Maria Clara Souza Ribeiro",
    ]);
  });

  it("permite cancelar a consulta", () => {
    const { abort } = pesquisarServidores("maria");

    expect(() => abort()).not.toThrow();
  });
});
