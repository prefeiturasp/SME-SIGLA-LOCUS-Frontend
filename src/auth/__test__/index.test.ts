import { encerrarSessao, obterUsuarioLogado, USUARIO_MOCK } from "../index";

describe("obterUsuarioLogado", () => {
  afterEach(() => localStorage.clear());

  it("cai no mock quando o JSON do storage e invalido", () => {
    localStorage.setItem("USUARIO", "{ nao e json");
    expect(obterUsuarioLogado()).toEqual(USUARIO_MOCK);
  });
});

describe("encerrarSessao", () => {
  afterEach(() => localStorage.clear());

  it("limpa USUARIO do storage e dispara o efeito de saida", () => {
    localStorage.setItem("USUARIO", JSON.stringify(USUARIO_MOCK));
    const aoFinalizar = jest.fn();

    encerrarSessao(aoFinalizar);

    expect(localStorage.getItem("USUARIO")).toBeNull();
    expect(aoFinalizar).toHaveBeenCalledTimes(1);
  });
});
