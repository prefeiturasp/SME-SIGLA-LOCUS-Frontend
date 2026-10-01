import type { ReactNode } from "react";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { MENSAGENS_BUSCA_SERVIDOR } from "@/paginas/validacoes/buscarServidor";
import {
  pesquisarServidores,
  type ServidorResumo,
} from "@/servicos/recursos/servidores";
import { ComProvedores } from "@/testes/renderizarComTema";
import { useAtualizacaoRegistroFuncional } from "../useAtualizacaoRegistroFuncional";

// Mantem o servico real (mock estatico) e permite simular a latencia da API.
jest.mock("@/servicos/recursos/servidores", () => {
  const real = jest.requireActual("@/servicos/recursos/servidores");
  return { ...real, pesquisarServidores: jest.fn(real.pesquisarServidores) };
});

const pesquisarMock = jest.mocked(pesquisarServidores);

function renderizarHook() {
  return renderHook(() => useAtualizacaoRegistroFuncional(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ComProvedores>{children}</ComProvedores>
    ),
  });
}

function nomes(servidores: ServidorResumo[]): string[] {
  return servidores.map(({ nome }) => nome);
}

function respostaControlada() {
  let resolver: (valor: ServidorResumo[]) => void = () => {};
  const response = new Promise<ServidorResumo[]>((resolve) => {
    resolver = resolve;
  });
  return { consulta: { response, abort: jest.fn() }, resolver };
}

describe("useAtualizacaoRegistroFuncional", () => {
  afterEach(() => pesquisarMock.mockClear());

  it("so sugere servidores a partir de 3 caracteres", async () => {
    const { result } = renderizarHook();

    await act(async () => result.current.alterarTermo("ma"));
    expect(result.current.sugestoes).toEqual([]);

    act(() => result.current.alterarTermo("mar"));
    await waitFor(() =>
      expect(nomes(result.current.sugestoes)).toEqual([
        "Maria Aparecida dos Santos",
        "Maria Clara Souza Ribeiro",
      ]),
    );

    act(() => result.current.alterarTermo("ma"));
    expect(result.current.sugestoes).toEqual([]);
  });

  it("ignora a resposta de uma consulta mais antiga", async () => {
    const antiga = respostaControlada();
    const recente = respostaControlada();
    pesquisarMock
      .mockReturnValueOnce(antiga.consulta)
      .mockReturnValueOnce(recente.consulta);
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("mar"));
    act(() => result.current.alterarTermo("ana"));
    const ana: ServidorResumo = {
      rf: "7311452",
      nome: "Ana Beatriz Conceição Lima",
      cpf: "39145678201",
    };
    await act(async () => recente.resolver([ana]));
    await act(async () =>
      antiga.resolver([
        {
          rf: "8123409",
          nome: "Maria Aparecida dos Santos",
          cpf: "51738204603",
        },
      ]),
    );

    expect(result.current.sugestoes).toEqual([ana]);
  });

  it("descarta sugestoes que chegam depois de clicar em buscar", async () => {
    const pendente = respostaControlada();
    pesquisarMock.mockReturnValueOnce(pendente.consulta);
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("gab"));
    await act(() => result.current.buscarServidor());
    await act(async () =>
      pendente.resolver([
        {
          rf: "1234567",
          nome: "Gabriel Nascimento Arantes",
          cpf: "04578370802",
        },
      ]),
    );

    expect(result.current.sugestoes).toEqual([]);
  });

  it("exige o termo ao buscar", async () => {
    const { result } = renderizarHook();

    await act(() => result.current.buscarServidor());

    expect(result.current.erroBusca).toBe(
      MENSAGENS_BUSCA_SERVIDOR.campoObrigatorio,
    );
    expect(pesquisarMock).not.toHaveBeenCalled();
  });

  it("guarda o servidor encontrado pelo RF", async () => {
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("8123417"));
    await act(() => result.current.buscarServidor());

    expect(result.current.servidorEncontrado).toEqual({
      rf: "8123417",
      nome: "Maria Clara Souza Ribeiro",
      cpf: "62849315704",
    });
    expect(result.current.erroBusca).toBeUndefined();
  });

  it("marca sem resultado, sem erro no campo, quando o servidor nao existe", async () => {
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("zzz"));
    await act(() => result.current.buscarServidor());

    expect(result.current.semResultado).toBe(true);
    expect(result.current.erroBusca).toBeUndefined();
    expect(result.current.servidorEncontrado).toBeUndefined();
  });

  it("deixa de marcar sem resultado quando uma nova busca encontra", async () => {
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("zzz"));
    await act(() => result.current.buscarServidor());
    act(() => result.current.alterarTermo("8123417"));
    await act(() => result.current.buscarServidor());

    expect(result.current.semResultado).toBe(false);
  });

  it("pede para escolher na lista quando o termo casa com varios", async () => {
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("maria"));
    await act(() => result.current.buscarServidor());

    expect(result.current.erroBusca).toBe(
      MENSAGENS_BUSCA_SERVIDOR.maisDeUmServidor,
    );
  });

  it("limpa o erro, o sem resultado e o servidor encontrado ao alterar o termo", async () => {
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("maria"));
    await act(() => result.current.buscarServidor());
    act(() => result.current.alterarTermo("8123417"));
    expect(result.current.erroBusca).toBeUndefined();

    act(() => result.current.alterarTermo("zzz"));
    await act(() => result.current.buscarServidor());
    act(() => result.current.alterarTermo("zz"));
    expect(result.current.semResultado).toBe(false);

    act(() => result.current.alterarTermo("8123417"));

    await act(() => result.current.buscarServidor());
    act(() => result.current.alterarTermo("812341"));
    expect(result.current.servidorEncontrado).toBeUndefined();
  });

  describe("ao escolher uma sugestao", () => {
    const GABRIEL_ARANTES: ServidorResumo = {
      rf: "1234567",
      nome: "Gabriel Nascimento Arantes",
      cpf: "04578370802",
    };

    it("poe o texto completo da sugestao no termo e fecha a lista", async () => {
      const { result } = renderizarHook();

      act(() => result.current.alterarTermo("gabriel nascim"));
      await waitFor(() =>
        expect(result.current.sugestoes.length).toBeGreaterThan(0),
      );
      act(() => result.current.selecionarServidor(GABRIEL_ARANTES));

      expect(result.current.termo).toBe(
        "123.456.7 - Gabriel Nascimento Arantes [CPF 045.783.708-02]",
      );
      expect(result.current.sugestoes).toEqual([]);
    });

    it("busca o servidor escolhido, mesmo com o texto completo no campo", async () => {
      const { result } = renderizarHook();

      act(() => result.current.selecionarServidor(GABRIEL_ARANTES));
      await act(() => result.current.buscarServidor());

      expect(result.current.servidorEncontrado).toEqual(GABRIEL_ARANTES);
      expect(result.current.semResultado).toBe(false);
      expect(result.current.erroBusca).toBeUndefined();
    });

    it("volta a buscar pelo que foi digitado se o campo mudar depois", async () => {
      const { result } = renderizarHook();

      act(() => result.current.selecionarServidor(GABRIEL_ARANTES));
      act(() => result.current.alterarTermo("zzz"));
      await act(() => result.current.buscarServidor());

      expect(result.current.semResultado).toBe(true);
      expect(result.current.servidorEncontrado).toBeUndefined();
    });

    it("ignora sugestoes que chegam depois da escolha", async () => {
      const pendente = respostaControlada();
      pesquisarMock.mockReturnValueOnce(pendente.consulta);
      const { result } = renderizarHook();

      act(() => result.current.alterarTermo("gabriel nascim"));
      act(() => result.current.selecionarServidor(GABRIEL_ARANTES));
      await act(async () => pendente.resolver([GABRIEL_ARANTES]));

      expect(result.current.sugestoes).toEqual([]);
    });
  });

  it("avisa com notificacao quando a consulta falha", async () => {
    pesquisarMock.mockReturnValueOnce({
      response: Promise.reject(new Error("falha de rede")),
      abort: jest.fn(),
    });
    const { result } = renderizarHook();

    act(() => result.current.alterarTermo("x"));
    await act(() => result.current.buscarServidor());

    expect(
      await screen.findByText(
        "Não conseguimos buscar o servidor. Por favor, tente novamente!",
      ),
    ).toBeInTheDocument();
    expect(result.current.buscando).toBe(false);
  });
});
