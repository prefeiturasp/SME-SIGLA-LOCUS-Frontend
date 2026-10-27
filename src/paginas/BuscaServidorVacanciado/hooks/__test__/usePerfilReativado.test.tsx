import type { ReactNode } from "react";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import {
  Route,
  Routes,
  useLocation,
  type InitialEntry,
} from "react-router-dom";
import { CAMINHOS } from "@/rotas/caminhos";
import { ComProvedores } from "@/testes/renderizarComTema";
import { usePerfilReativado } from "../usePerfilReativado";

const RF = "1234567";

function Sonda() {
  const { pathname, search, hash, state } = useLocation();

  return <p>{`${pathname}${search}${hash} ${JSON.stringify(state)}`}</p>;
}

function montarHook(entrada: InitialEntry) {
  const { result } = renderHook(() => usePerfilReativado(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ComProvedores rota={entrada}>
        <Routes>
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacancia}
            element={
              <>
                {children}
                <Sonda />
              </>
            }
          />
          <Route path={CAMINHOS.cadastroAtualizacaoRF} element={<Sonda />} />
        </Routes>
      </ComProvedores>
    ),
  });
  return result;
}

function entradaComRfReativado(): InitialEntry {
  return {
    pathname: CAMINHOS.cadastroAtualizacaoVacancia,
    search: "?status=1",
    hash: "#topo",
    state: { rfReativado: RF },
  };
}

describe("usePerfilReativado", () => {
  it("fica fechado sem RF reativado na navegacao", () => {
    const result = montarHook(CAMINHOS.cadastroAtualizacaoVacancia);

    expect(result.current.aberto).toBe(false);
  });

  it("abre e limpa o estado da navegacao mantendo busca e ancora", async () => {
    const result = montarHook(entradaComRfReativado());

    expect(result.current.aberto).toBe(true);
    await waitFor(() =>
      expect(
        screen.getByText(
          `${CAMINHOS.cadastroAtualizacaoVacancia}?status=1#topo null`,
        ),
      ).toBeInTheDocument(),
    );
    expect(result.current.aberto).toBe(true);
  });

  it("fecha sem sair da busca de vacancia", () => {
    const result = montarHook(entradaComRfReativado());

    act(() => result.current.fechar());

    expect(result.current.aberto).toBe(false);
  });

  it("leva para a busca por RF com o RF reativado preenchido", () => {
    const result = montarHook(entradaComRfReativado());

    act(() => result.current.pesquisarPorRF());

    expect(
      screen.getByText(
        `${CAMINHOS.cadastroAtualizacaoRF} {"termoBusca":"${RF}"}`,
      ),
    ).toBeInTheDocument();
  });
});
