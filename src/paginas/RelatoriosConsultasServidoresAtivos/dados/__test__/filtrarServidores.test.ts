import {
  servidoresAtivosEstaticos,
} from "../dadosEstaticos";
import { filtrarServidores } from "../filtrarServidores";

describe("filtrarServidores", () => {
  it("retorna lista vazia quando o nome nao existe", () => {
    const resultado = filtrarServidores(servidoresAtivosEstaticos, {
      nome: "Xablau Inexistente Pessoa",
    });

    expect(resultado).toHaveLength(0);
  });

  it("combina nome e liminar", () => {
    const resultado = filtrarServidores(servidoresAtivosEstaticos, {
      nome: "Maria",
      liminar: "sim",
    });

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((s) => s.liminarCodigo === "sim")).toBe(true);
  });
});
