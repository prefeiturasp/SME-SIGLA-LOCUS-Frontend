import { act, renderHook } from "@testing-library/react";
import {
  CHAVES_COLUNAS_PADRAO,
  COLUNAS_TABELA_SERVIDORES,
  LIMITE_COLUNAS_SERVIDORES,
} from "../../dados/dadosEstaticos";
import { useColunasServidores } from "../useColunasServidores";

function chavesVisiveis(
  colunas: ReturnType<typeof useColunasServidores>["colunasVisiveis"],
) {
  return colunas.map((coluna) => coluna.chave);
}

describe("useColunasServidores", () => {
  it("inicia com as colunas padrao visiveis e o painel fechado", () => {
    const { result } = renderHook(() => useColunasServidores());

    expect(result.current.colunas).toBe(COLUNAS_TABELA_SERVIDORES);
    expect(chavesVisiveis(result.current.colunasVisiveis)).toEqual(
      CHAVES_COLUNAS_PADRAO,
    );
    expect(result.current.selecao).toEqual(CHAVES_COLUNAS_PADRAO);
    expect(result.current.limite).toBe(LIMITE_COLUNAS_SERVIDORES);
    expect(result.current.alertaLimite).toBe(false);
    expect(result.current.painelAberto).toBe(false);
  });

  it("abre e fecha o painel", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    expect(result.current.painelAberto).toBe(true);

    act(() => result.current.fecharPainel());
    expect(result.current.painelAberto).toBe(false);
  });

  it("desmarca uma coluna sem alterar a tabela antes de salvar", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("cpf", false));

    expect(result.current.selecao).not.toContain("cpf");
    expect(chavesVisiveis(result.current.colunasVisiveis)).toContain("cpf");
  });

  it("exibe alerta ao tentar marcar alem do limite", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("atividade", true));

    expect(result.current.alertaLimite).toBe(true);
    expect(result.current.selecao).toEqual(CHAVES_COLUNAS_PADRAO);
  });

  it("esconde o alerta ao desmarcar uma coluna", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("atividade", true));
    act(() => result.current.alternarColuna("cpf", false));

    expect(result.current.alertaLimite).toBe(false);
  });

  it("adiciona a coluna marcada ao final da selecao", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("cpf", false));
    act(() => result.current.alternarColuna("classificacao", true));

    expect(result.current.selecao).toEqual([
      "nome",
      "rf",
      "cl",
      "vinculo",
      "cargoAtual",
      "funcao",
      "classificacao",
    ]);
  });

  it("ignora marcar uma coluna que ja esta selecionada", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("cpf", false));
    act(() => result.current.alternarColuna("rf", true));

    expect(result.current.selecao).toHaveLength(
      LIMITE_COLUNAS_SERVIDORES - 1,
    );
    expect(result.current.alertaLimite).toBe(false);
  });

  it("nao permite desmarcar a coluna fixa", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("nome", false));

    expect(result.current.selecao).toContain("nome");
  });

  it("salva a selecao na ordem escolhida e fecha o painel", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("cpf", false));
    act(() => result.current.alternarColuna("lotacao", true));
    act(() => result.current.salvar());

    expect(result.current.painelAberto).toBe(false);
    expect(chavesVisiveis(result.current.colunasVisiveis)).toEqual([
      "nome",
      "rf",
      "cl",
      "vinculo",
      "cargoAtual",
      "funcao",
      "lotacao",
    ]);
  });

  it("descarta a selecao nao salva ao reabrir o painel", () => {
    const { result } = renderHook(() => useColunasServidores());

    act(() => result.current.abrirPainel());
    act(() => result.current.alternarColuna("cpf", false));
    act(() => result.current.alternarColuna("atividade", true));
    act(() => result.current.fecharPainel());

    expect(chavesVisiveis(result.current.colunasVisiveis)).toEqual(
      CHAVES_COLUNAS_PADRAO,
    );

    act(() => result.current.abrirPainel());

    expect(result.current.selecao).toEqual(CHAVES_COLUNAS_PADRAO);
    expect(result.current.alertaLimite).toBe(false);
  });
});
