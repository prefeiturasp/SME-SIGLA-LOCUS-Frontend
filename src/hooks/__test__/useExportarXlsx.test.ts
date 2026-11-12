import { act, renderHook } from "@testing-library/react";
import { useExportarXlsx } from "../useExportarXlsx";

const mockWriteFile = jest.fn();
const mockBookAppendSheet = jest.fn();
const mockBookNew = jest.fn((..._args: unknown[]) => ({}));
const mockAoaToSheet = jest.fn((..._args: unknown[]) => ({}));

jest.mock("xlsx", () => ({
  utils: {
    aoa_to_sheet: (...args: unknown[]) => mockAoaToSheet(...args),
    book_new: (...args: unknown[]) => mockBookNew(...args),
    book_append_sheet: (...args: unknown[]) => mockBookAppendSheet(...args),
  },
  writeFile: (...args: unknown[]) => mockWriteFile(...args),
}));

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
});
