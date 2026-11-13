import { act, renderHook } from "@testing-library/react";
import { useExportarXlsx } from "../useExportarXlsx";

const mockWriteFile = jest.fn();
const mockBookAppendSheet = jest.fn();
const mockBookNew = jest.fn(() => ({}));
const mockAoaToSheet = jest.fn(() => ({}));

jest.mock(
  "xlsx",
  () => ({
    utils: {
      aoa_to_sheet: (...args: any[]) => mockAoaToSheet(...args),
      book_new: (...args: any[]) => mockBookNew(...args),
      book_append_sheet: (...args: any[]) => mockBookAppendSheet(...args),
    },
    writeFile: (...args: any[]) => mockWriteFile(...args),
  }),
  { virtual: true },
);

describe("useExportarXlsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("nao exporta quando nao ha colunas", async () => {
    const { result } = renderHook(() => useExportarXlsx());

    await act(async () => {
      await result.current.exportarXlsx([{ nome: "Ana" }], []);
    });

    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("gera planilha com cabecalho e linhas na ordem das colunas", async () => {
    const { result } = renderHook(() => useExportarXlsx());

    await act(async () => {
      await result.current.exportarXlsx(
        [
          { nome: "Ana", rf: "1", oculto: "x" },
          { nome: "Bruno", rf: "2", oculto: "y" },
        ],
        [
          { chave: "nome", titulo: "Nome" },
          { chave: "rf", titulo: "R.F" },
        ],
        "relatorio-banco-servidores",
      );
    });

    expect(mockAoaToSheet).toHaveBeenCalledWith([
      ["Nome", "R.F"],
      ["Ana", "1"],
      ["Bruno", "2"],
    ]);
    expect(mockBookAppendSheet).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      "Servidores",
    );
    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringMatching(
        /^relatorio-banco-servidores-\d{4}-\d{2}-\d{2}\.xlsx$/,
      ),
    );
  });

  it("monta classificacao com Geral, PCD e NNA na mesma celula", async () => {
    const { result } = renderHook(() => useExportarXlsx());

    await act(async () => {
      await result.current.exportarXlsx(
        [
          {
            nome: "Ana",
            classificacaoGeral: "52",
            classificacaoPcd: "0",
            classificacaoNna: "0",
          },
          {
            nome: "Bruno",
            classificacaoGeral: "10",
            classificacaoPcd: "",
            classificacaoNna: undefined,
          },
        ],
        [
          { chave: "nome", titulo: "Nome" },
          {
            chave: "classificacao",
            titulo: "Classificação",
            subcolunas: [
              { chave: "classificacaoGeral", titulo: "Geral" },
              { chave: "classificacaoPcd", titulo: "PCD" },
              { chave: "classificacaoNna", titulo: "NNA" },
            ],
          },
        ],
      );
    });

    expect(mockAoaToSheet).toHaveBeenCalledWith([
      ["Nome", "Classificação"],
      ["Ana", "Geral: 52|PCD: 0|NNA: 0"],
      ["Bruno", "Geral: 10|PCD: 0|NNA: 0"],
    ]);
  });
});
