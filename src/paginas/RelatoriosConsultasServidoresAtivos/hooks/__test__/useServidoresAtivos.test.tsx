import { act, renderHook } from "@testing-library/react";
import { servidoresAtivosEstaticos } from "../../dados/dadosEstaticos";
import { useServidoresAtivos } from "../useServidoresAtivos";

describe("useServidoresAtivos", () => {
  it("nao expoe servidores antes da busca", () => {
    const { result } = renderHook(() => useServidoresAtivos());

    expect(result.current.buscaRealizada).toBe(false);
    expect(result.current.servidores).toHaveLength(0);
  });

  it("filtra servidores ao buscar e limpa ao resetar", () => {
    const { result } = renderHook(() => useServidoresAtivos());

    act(() => {
      result.current.buscarServidores({ nome: "Pedro" });
    });

    expect(result.current.buscaRealizada).toBe(true);
    expect(result.current.servidores).toHaveLength(2);
    expect(result.current.totalServidores).toBe(2);

    act(() => {
      result.current.limparFiltros();
    });

    expect(result.current.buscaRealizada).toBe(false);
    expect(result.current.servidores).toHaveLength(0);
  });

  it("retorna lista vazia quando nenhum servidor corresponde", () => {
    const { result } = renderHook(() => useServidoresAtivos());

    act(() => {
      result.current.buscarServidores({ nome: "Nome Que Nao Existe" });
    });

    expect(result.current.buscaRealizada).toBe(true);
    expect(result.current.servidores).toHaveLength(0);
  });

  it("monta os detalhes do servidor escolhido ao abrir o painel", () => {
    const { result } = renderHook(() => useServidoresAtivos());
    const servidor = servidoresAtivosEstaticos[2];

    expect(result.current.detalhes).toHaveLength(0);

    act(() => {
      result.current.abrirPainelDetalhes(servidor);
    });

    expect(result.current.painelDetalhesAberto).toBe(true);
    expect(result.current.detalhes[0].campos).toEqual([
      { rotulo: "Nome completo", valor: servidor.nome },
      { rotulo: "R.F", valor: servidor.rf },
      { rotulo: "CPF", valor: servidor.cpf },
    ]);
  });
});
