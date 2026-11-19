import {
  encerrarSessao,
  obterUsuarioLogado,
  SIGLA_LOGIN_PATH,
  urlLogin,
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

describe("urlLogin", () => {
  it("expõe o path de login do portal fora do ambiente local", () => {
    expect(SIGLA_LOGIN_PATH).toBe("/sigla/login");
    expect(urlLogin("qa")).toBe("/sigla/login");
    expect(urlLogin(undefined)).toBe("/sigla/login");
  });

  it("usa SIGLA_URL/login quando ENVIRONMENT=local", () => {
    expect(urlLogin("local", "http://localhost:5173")).toBe(
      "http://localhost:5173/login",
    );
    expect(urlLogin("local", "http://localhost:5173/")).toBe(
      "http://localhost:5173/login",
    );
  });

  it("mantém SIGLA_LOGIN_PATH em local sem SIGLA_URL", () => {
    expect(urlLogin("local", undefined)).toBe("/sigla/login");
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
