import {
  ehTermoNumerico,
  formatarCpf,
  formatarRf,
  partesDestacadas,
  partesDestacadasPorDigitos,
} from "../formatadores";

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

describe("ehTermoNumerico", () => {
  it("aceita digitos com ou sem mascara", () => {
    expect(ehTermoNumerico("1234")).toBe(true);
    expect(ehTermoNumerico("045.783.708-02")).toBe(true);
  });

  it("recusa termo com letras ou sem digito algum", () => {
    expect(ehTermoNumerico("gabriel 123")).toBe(false);
    expect(ehTermoNumerico("")).toBe(false);
    expect(ehTermoNumerico(".-")).toBe(false);
  });
});

describe("partesDestacadasPorDigitos", () => {
  it("destaca o inicio do numero, com a mascara que fica no meio do trecho", () => {
    expect(partesDestacadasPorDigitos("123.456.7", "1234")).toEqual([
      { texto: "123.4", destaque: true },
      { texto: "56.7", destaque: false },
    ]);
  });

  it("aceita o termo digitado com mascara", () => {
    expect(partesDestacadasPorDigitos("045.783.708-02", "045.7")).toEqual([
      { texto: "045.7", destaque: true },
      { texto: "83.708-02", destaque: false },
    ]);
  });

  it("nao leva para o destaque a mascara que vem depois do ultimo digito", () => {
    expect(partesDestacadasPorDigitos("123.456.7", "123")).toEqual([
      { texto: "123", destaque: true },
      { texto: ".456.7", destaque: false },
    ]);
  });

  it("destaca o numero inteiro quando o termo e o numero completo", () => {
    expect(partesDestacadasPorDigitos("123.456.7", "123.456.7")).toEqual([
      { texto: "123.456.7", destaque: true },
    ]);
  });

  it("nao destaca quando o numero nao comeca com o termo", () => {
    expect(partesDestacadasPorDigitos("123.456.7", "456")).toEqual([
      { texto: "123.456.7", destaque: false },
    ]);
  });

  it("nao destaca com termo de letras ou vazio", () => {
    const semDestaque = [{ texto: "123.456.7", destaque: false }];

    expect(partesDestacadasPorDigitos("123.456.7", "gabriel 123")).toEqual(
      semDestaque,
    );
    expect(partesDestacadasPorDigitos("123.456.7", "")).toEqual(semDestaque);
  });
});
