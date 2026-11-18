import { textoSaldoVagas } from "../textos";

describe("textoSaldoVagas", () => {
  it("indica vagas disponiveis quando o saldo e positivo", () => {
    expect(textoSaldoVagas(5)).toBe("+5 disponíveis");
  });

  it("indica professores excedentes quando o saldo e negativo", () => {
    expect(textoSaldoVagas(-4)).toBe("-4 excedentes");
  });

  it("indica completo quando o saldo e zero", () => {
    expect(textoSaldoVagas(0)).toBe("Completo");
  });
});
