import type { ReactNode } from "react";
import { act, renderHook, screen } from "@testing-library/react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { CAMINHOS, caminhoAtualizacaoVacanciaServidor } from "@/rotas/caminhos";
import * as servico from "@/servicos/recursos/servidores";
import { ComProvedores } from "@/testes/renderizarComTema";
import { useReativarPerfil } from "../useReativarPerfil";

const RF_EXISTENTE = "1234567";
const RF_INEXISTENTE = "0000000";

function DestinoBusca() {
  const { state } = useLocation();
  const tipoNavegacao = useNavigationType();

  return <p>{`${tipoNavegacao} ${JSON.stringify(state)}`}</p>;
}

function montarHook(rf = RF_EXISTENTE) {
  const { result } = renderHook(() => useReativarPerfil(rf), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ComProvedores rota={caminhoAtualizacaoVacanciaServidor(rf)}>
        <Routes>
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacanciaServidor}
            element={children}
          />
          <Route
            path={CAMINHOS.cadastroAtualizacaoVacancia}
            element={<DestinoBusca />}
          />
        </Routes>
      </ComProvedores>
    ),
  });
  return result;
}

describe("useReativarPerfil", () => {
  afterEach(() => jest.restoreAllMocks());

  it("abre e fecha o modal de confirmacao", () => {
    const result = montarHook();

    act(() => result.current.abrirModal());
    expect(result.current.modalAberto).toBe(true);

    act(() => result.current.fecharModal());
    expect(result.current.modalAberto).toBe(false);
  });

  it("reativa e substitui a ficha pela busca com o RF reativado", async () => {
    const reativar = jest.spyOn(servico, "reativarServidor");
    const result = montarHook();

    act(() => result.current.abrirModal());
    await act(async () => {
      await result.current.confirmarReativacao();
    });

    expect(reativar).toHaveBeenCalledWith(RF_EXISTENTE);
    expect(
      screen.getByText(`REPLACE {"rfReativado":"${RF_EXISTENTE}"}`),
    ).toBeInTheDocument();
  });

  it("mantem o modal aberto e avisa quando a reativacao falha", async () => {
    const result = montarHook(RF_INEXISTENTE);

    act(() => result.current.abrirModal());
    await act(async () => {
      await result.current.confirmarReativacao();
    });

    expect(result.current.modalAberto).toBe(true);
    expect(result.current.reativando).toBe(false);
    expect(
      await screen.findByText(
        "Não conseguimos reativar o perfil. Por favor, tente novamente!",
      ),
    ).toBeInTheDocument();
  });

  it("ignora o fechamento enquanto a reativacao esta em andamento", () => {
    jest.spyOn(servico, "reativarServidor").mockReturnValue({
      response: new Promise(() => {}),
      abort: () => {},
    });
    const result = montarHook();

    act(() => result.current.abrirModal());
    act(() => {
      void result.current.confirmarReativacao();
    });
    expect(result.current.reativando).toBe(true);

    act(() => result.current.fecharModal());

    expect(result.current.modalAberto).toBe(true);
  });
});
