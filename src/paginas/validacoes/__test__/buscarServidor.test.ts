import {
  MENSAGENS_BUSCA_SERVIDOR,
  validarTermoBuscaServidor,
} from "../buscarServidor";

describe("validarTermoBuscaServidor", () => {
  it("exige o termo de busca", () => {
    expect(validarTermoBuscaServidor("   ")).toEqual({
      ok: false,
      mensagem: MENSAGENS_BUSCA_SERVIDOR.campoObrigatorio,
    });
  });

  it("devolve o termo sem espacos nas pontas", () => {
    expect(validarTermoBuscaServidor("  maria ")).toEqual({
      ok: true,
      termo: "maria",
    });
  });
});
