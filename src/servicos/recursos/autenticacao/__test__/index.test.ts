import {
  encerrarSessao,
  obterUsuarioLogado,
  URL_SIGLA,
  urlPortalSigla,
  usuarioLogado,
  USUARIO_MOCK,
} from "../index";

describe("obterUsuarioLogado", () => {
  afterEach(() => localStorage.clear());

  it("cai no mock quando o JSON do storage e invalido", () => {
    localStorage.setItem("USUARIO", "{ nao e json");
    expect(obterUsuarioLogado()).toEqual(USUARIO_MOCK);
  });
});

describe("usuarioLogado", () => {
  afterEach(() => localStorage.clear());

  it("retorna true quando existe TOKEN", () => {
    localStorage.setItem("TOKEN", "abc");
    expect(usuarioLogado()).toBe(true);
  });

  it("retorna false quando nao existe TOKEN", () => {
    expect(usuarioLogado()).toBe(false);
  });
});

describe("urlPortalSigla", () => {
  it("expõe o path do portal fora do ambiente local", () => {
    expect(URL_SIGLA).toBe("/sigla/");
    expect(urlPortalSigla("qa")).toBe("/sigla/");
    expect(urlPortalSigla(undefined)).toBe("/sigla/");
  });

  it("usa SIGLA_URL quando ENVIRONMENT=local", () => {
    expect(urlPortalSigla("local", "http://localhost:5173")).toBe(
      "http://localhost:5173/",
    );
    expect(urlPortalSigla("local", "http://localhost:5173/")).toBe(
      "http://localhost:5173/",
    );
  });

  it("mantém URL_SIGLA em local sem SIGLA_URL", () => {
    expect(urlPortalSigla("local", undefined)).toBe("/sigla/");
  });
});

describe("encerrarSessao", () => {
  afterEach(() => localStorage.clear());

  it("limpa TOKEN e USUARIO do storage e dispara o efeito de saida", () => {
    localStorage.setItem("TOKEN", "abc");
    localStorage.setItem("USUARIO", JSON.stringify(USUARIO_MOCK));
    const aoFinalizar = jest.fn();

    encerrarSessao(aoFinalizar);

    expect(localStorage.getItem("TOKEN")).toBeNull();
    expect(localStorage.getItem("USUARIO")).toBeNull();
    expect(aoFinalizar).toHaveBeenCalledTimes(1);
  });
});
