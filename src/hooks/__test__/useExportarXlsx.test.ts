import { act, renderHook } from "@testing-library/react";
import { useExportarXlsx } from "../useExportarXlsx";

const mockWriteFile = jest.fn();
const mockBookAppendSheet = jest.fn();
const mockBookNew = jest.fn((..._args: unknown[]) => ({}));
const mockAoaToSheet = jest.fn((..._args: unknown[]) => ({}));

jest.mock(
  "xlsx",
  () => ({
    utils: {
      aoa_to_sheet: (...args: unknown[]) => mockAoaToSheet(...args),
      book_new: (...args: unknown[]) => mockBookNew(...args),
      book_append_sheet: (...args: unknown[]) => mockBookAppendSheet(...args),
    },
    writeFile: (...args: unknown[]) => mockWriteFile(...args),
  }),
  { virtual: true },
);

describe("useExportarXlsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("nao exporta quando nao ha colunas", async () => {
    const { result } = renderHook(() => useExportarXlsx());
    let exportou = true;

    await act(async () => {
      exportou = await result.current.exportarXlsx([{ nome: "Ana" }], []);
    });

    expect(exportou).toBe(false);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("gera planilha com cabecalho e linhas na ordem das colunas", async () => {
    const { result } = renderHook(() => useExportarXlsx());
    let exportou = false;

    await act(async () => {
      exportou = await result.current.exportarXlsx(
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

    expect(exportou).toBe(true);
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

  it("propaga o erro quando a geracao do arquivo falha", async () => {
    mockWriteFile.mockImplementationOnce(() => {
      throw new Error("falha ao gravar");
    });
    const { result } = renderHook(() => useExportarXlsx());

    await expect(
      act(async () => {
        await result.current.exportarXlsx(
          [{ nome: "Ana" }],
          [{ chave: "nome", titulo: "Nome" }],
        );
      }),
    ).rejects.toThrow("falha ao gravar");

    expect(result.current.exportando).toBe(false);
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

  describe("exportarAbasXlsx", () => {
    it("nao exporta quando nao ha abas", async () => {
      const { result } = renderHook(() => useExportarXlsx());
      let exportou = true;

      await act(async () => {
        exportou = await result.current.exportarAbasXlsx([]);
      });

      expect(exportou).toBe(false);
      expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it("gera uma planilha por aba, na ordem e com o nome informado", async () => {
      const { result } = renderHook(() => useExportarXlsx());
      let exportou = false;

      await act(async () => {
        exportou = await result.current.exportarAbasXlsx(
          [
            {
              nome: "Painel",
              linhas: [["Componente curricular", "Arte"], [], ["Módulos", 105]],
            },
            {
              nome: "Unidades educacionais",
              linhas: [
                ["Código de lotação", "Vagas"],
                ["091488", "+5 disponíveis"],
              ],
            },
          ],
          "relatorio-gestao-unidades",
        );
      });

      expect(exportou).toBe(true);
      expect(mockAoaToSheet).toHaveBeenNthCalledWith(1, [
        ["Componente curricular", "Arte"],
        [],
        ["Módulos", 105],
      ]);
      expect(mockAoaToSheet).toHaveBeenNthCalledWith(2, [
        ["Código de lotação", "Vagas"],
        ["091488", "+5 disponíveis"],
      ]);
      expect(
        mockBookAppendSheet.mock.calls.map((chamada) => chamada[2]),
      ).toEqual(["Painel", "Unidades educacionais"]);
      expect(mockWriteFile).toHaveBeenCalledTimes(1);
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.anything(),
        expect.stringMatching(
          /^relatorio-gestao-unidades-\d{4}-\d{2}-\d{2}\.xlsx$/,
        ),
      );
    });

    it("propaga o erro e libera o estado de exportacao", async () => {
      mockWriteFile.mockImplementationOnce(() => {
        throw new Error("falha ao gravar");
      });
      const { result } = renderHook(() => useExportarXlsx());

      await expect(
        act(async () => {
          await result.current.exportarAbasXlsx([
            { nome: "Painel", linhas: [["Componente curricular", "Arte"]] },
          ]);
        }),
      ).rejects.toThrow("falha ao gravar");

      expect(result.current.exportando).toBe(false);
    });
  });
});
