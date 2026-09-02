import { unidadesEducacionaisServico } from "../index";
import {
  respostaListagemSchema,
  painelComponenteSchema,
} from "../tipos";
import { TOTAL_REGISTROS, TAMANHO_PAGINA } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

describe("unidadesEducacionaisServico.listar", () => {
  it("retorna uma listagem valida contra o schema", async () => {
    const resposta = await unidadesEducacionaisServico.listar();

    expect(() => respostaListagemSchema.parse(resposta)).not.toThrow();
    expect(resposta.itens).toHaveLength(10);
    expect(resposta.total).toBe(TOTAL_REGISTROS);
    expect(resposta.tamanhoPagina).toBe(TAMANHO_PAGINA);
  });

  it("inclui a unidade Cidade Tiradentes com saldo positivo", async () => {
    const { itens } = await unidadesEducacionaisServico.listar();
    const cidadeTiradentes = itens.find(
      (u) => u.nome === "Cidade Tiradentes",
    );

    expect(cidadeTiradentes?.saldoVagas).toBe(5);
  });
});

describe("unidadesEducacionaisServico.painel", () => {
  it("retorna o painel do componente pedido, valido contra o schema", async () => {
    const painel = await unidadesEducacionaisServico.painel("Biologia");

    expect(() => painelComponenteSchema.parse(painel)).not.toThrow();
    expect(painel.componente).toBe("Biologia");
    expect(painel.estatisticas).toHaveLength(6);
  });
});
