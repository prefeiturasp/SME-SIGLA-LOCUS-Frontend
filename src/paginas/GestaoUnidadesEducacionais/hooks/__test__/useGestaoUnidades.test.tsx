import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGestaoUnidades } from "../useGestaoUnidades";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("useGestaoUnidades", () => {
  it("carrega listagem e painel do componente selecionado", async () => {
    const { result } = renderHook(() => useGestaoUnidades(), { wrapper });

    await waitFor(() => expect(result.current.carregando).toBe(false));

    expect(result.current.unidades).toHaveLength(10);
    expect(result.current.total).toBe(5985);
    expect(result.current.painel?.estatisticas).toHaveLength(6);
    expect(result.current.componenteSelecionado).toBe("Arte");
  });

  it("troca o componente selecionado e recarrega o painel", async () => {
    const { result } = renderHook(() => useGestaoUnidades(), { wrapper });

    await waitFor(() => expect(result.current.carregando).toBe(false));

    act(() => result.current.selecionarComponente("Matemática"));

    await waitFor(() =>
      expect(result.current.painel?.componente).toBe("Matemática"),
    );
    expect(result.current.componenteSelecionado).toBe("Matemática");
  });

  it("aplica e limpa filtros sem quebrar a listagem", async () => {
    const { result } = renderHook(() => useGestaoUnidades(), { wrapper });

    await waitFor(() => expect(result.current.carregando).toBe(false));

    act(() => result.current.aplicarFiltros({ dre: "itaquera" }));
    await waitFor(() => expect(result.current.unidades).toHaveLength(10));

    act(() => result.current.limparFiltros());
    await waitFor(() => expect(result.current.unidades).toHaveLength(10));
  });
});
