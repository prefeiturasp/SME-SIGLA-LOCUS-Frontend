import {
  NOMES_SERVIDORES_ESTATICOS,
  servidoresAtivosEstaticos,
} from "../dadosEstaticos";
import { filtrarServidores } from "../filtrarServidores";

describe("filtrarServidores", () => {
  it("mantem 30 servidores com nomes de 3 palavras", () => {
    expect(servidoresAtivosEstaticos).toHaveLength(30);
    expect(NOMES_SERVIDORES_ESTATICOS).toHaveLength(30);
    for (const nome of NOMES_SERVIDORES_ESTATICOS) {
      expect(nome.trim().split(/\s+/)).toHaveLength(3);
    }
  });

  it("filtra por primeiro nome repetido (Maria)", () => {
    const resultado = filtrarServidores(servidoresAtivosEstaticos, {
      nome: "Maria",
    });

    expect(resultado).toHaveLength(3);
    expect(resultado.map((s) => s.nome)).toEqual([
      "Maria Silva Santos",
      "Maria Oliveira Costa",
      "Maria Souza Lima",
    ]);
  });

  it("filtra por sobrenome compartilhado (Silva)", () => {
    const resultado = filtrarServidores(servidoresAtivosEstaticos, {
      nome: "Silva",
    });

    expect(resultado.map((s) => s.nome)).toEqual([
      "Maria Silva Santos",
      "Carlos Eduardo Silva",
    ]);
  });

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
