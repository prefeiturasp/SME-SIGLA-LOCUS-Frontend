import { formatarCpf, formatarRf, partesDestacadas } from "../formatadores";

describe("formatarRf", () => {
  it("formata o RF de 7 digitos como 123.456.7", () => {
    expect(formatarRf("1234567")).toBe("123.456.7");
  });

  it("devolve sem alteracao o RF fora do tamanho esperado", () => {
    expect(formatarRf("12345")).toBe("12345");
  });
});

describe("formatarCpf", () => {
  it("formata o CPF de 11 digitos como 123.456.789-01", () => {
    expect(formatarCpf("12345678901")).toBe("123.456.789-01");
  });

  it("devolve sem alteracao o CPF fora do tamanho esperado", () => {
    expect(formatarCpf("123")).toBe("123");
  });
});

describe("partesDestacadas", () => {
  it("destaca o trecho digitado mantendo a grafia original", () => {
    expect(
      partesDestacadas("Gabriel Nascimento Arantes", "gabriel nascim"),
    ).toEqual([
      { texto: "Gabriel Nascim", destaque: true },
      { texto: "ento Arantes", destaque: false },
    ]);
  });

  it("encontra o trecho no meio do texto sem diferenciar acentos", () => {
    expect(partesDestacadas("Ana Conceição Lima", "conceicao")).toEqual([
      { texto: "Ana ", destaque: false },
      { texto: "Conceição", destaque: true },
      { texto: " Lima", destaque: false },
    ]);
  });

  it("nao destaca nada quando o termo nao aparece ou esta vazio", () => {
    expect(partesDestacadas("Ana Lima", "zzz")).toEqual([
      { texto: "Ana Lima", destaque: false },
    ]);
    expect(partesDestacadas("Ana Lima", "  ")).toEqual([
      { texto: "Ana Lima", destaque: false },
    ]);
  });
});
