import dayjs from "dayjs";
import { validarRegistroAtualizacao } from "../registrarAtualizacao";
import { MENSAGENS_VALIDACAO } from "../registrarUnidadeEducacional";

describe("validarRegistroAtualizacao", () => {
  it("exige motivo e data do documento", () => {
    expect(
      validarRegistroAtualizacao({ motivo: undefined, dataDocumento: null }),
    ).toEqual({
      ok: false,
      erroMotivo: MENSAGENS_VALIDACAO.campoObrigatorio,
      erroDataDocumento: MENSAGENS_VALIDACAO.campoObrigatorio,
    });
  });

  it("aponta somente a data quando o motivo foi informado", () => {
    expect(
      validarRegistroAtualizacao({ motivo: "Ingresso", dataDocumento: null }),
    ).toEqual({
      ok: false,
      erroDataDocumento: MENSAGENS_VALIDACAO.campoObrigatorio,
    });
  });

  it("aponta somente o motivo quando a data foi informada", () => {
    expect(
      validarRegistroAtualizacao({
        motivo: "  ",
        dataDocumento: dayjs("2026-03-15"),
      }),
    ).toEqual({
      ok: false,
      erroMotivo: MENSAGENS_VALIDACAO.campoObrigatorio,
    });
  });

  it("aceita motivo e data preenchidos", () => {
    expect(
      validarRegistroAtualizacao({
        motivo: "Ingresso",
        dataDocumento: dayjs("2026-03-15"),
      }),
    ).toEqual({ ok: true });
  });
});
