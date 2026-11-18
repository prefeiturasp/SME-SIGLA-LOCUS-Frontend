import { useCallback, useState } from "react";
import * as XLSX from "xlsx";

export interface SubcolunaExportacaoXlsx {
  chave: string;
  titulo: string;
}

export interface ColunaExportacaoXlsx {
  chave: string;
  titulo: string;
  subcolunas?: readonly SubcolunaExportacaoXlsx[];
}

export type CelulaXlsx = string | number;

export interface AbaExportacaoXlsx {
  nome: string;
  linhas: readonly (readonly CelulaXlsx[])[];
}

function valorCelula(valor: unknown): CelulaXlsx {
  if (valor == null) return "";
  if (typeof valor === "string" || typeof valor === "number") return valor;
  return String(valor);
}

function valorClassificacao(
  registro: Record<string, unknown>,
  subcolunas: readonly SubcolunaExportacaoXlsx[],
): string {
  return subcolunas
    .map((subcoluna) => {
      const valor = registro[subcoluna.chave];
      const texto = valor == null || valor === "" ? "0" : valorCelula(valor);
      return `${subcoluna.titulo}: ${texto}`;
    })
    .join("|");
}

function valorColuna(
  registro: Record<string, unknown>,
  coluna: ColunaExportacaoXlsx,
): CelulaXlsx {
  if (coluna.chave === "classificacao" && coluna.subcolunas?.length) {
    return valorClassificacao(registro, coluna.subcolunas);
  }

  return valorCelula(registro[coluna.chave]);
}

function baixarPasta(
  abas: readonly AbaExportacaoXlsx[],
  nomeArquivo: string,
): void {
  const pasta = XLSX.utils.book_new();
  abas.forEach((aba) => {
    const planilha = XLSX.utils.aoa_to_sheet(aba.linhas as CelulaXlsx[][]);
    XLSX.utils.book_append_sheet(pasta, planilha, aba.nome);
  });

  const hoje = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(pasta, `${nomeArquivo}-${hoje}.xlsx`);
}

/** Monta e baixa um .xlsx com as colunas informadas (ordem/visibilidade do chamador). */
export function useExportarXlsx() {
  const [exportando, setExportando] = useState(false);

  const exportarXlsx = useCallback(
    async <T extends object>(
      linhas: readonly T[],
      colunas: readonly ColunaExportacaoXlsx[],
      nomeArquivo = "relatorio",
    ): Promise<boolean> => {
      if (exportando || colunas.length === 0) return false;

      setExportando(true);

      try {
        const cabecalho = colunas.map((coluna) => coluna.titulo);
        const corpo = linhas.map((linha) => {
          const registro = linha as Record<string, unknown>;
          return colunas.map((coluna) => valorColuna(registro, coluna));
        });

        baixarPasta(
          [{ nome: "Servidores", linhas: [cabecalho, ...corpo] }],
          nomeArquivo,
        );
        return true;
      } finally {
        setExportando(false);
      }
    },
    [exportando],
  );

  const exportarAbasXlsx = useCallback(
    async (
      abas: readonly AbaExportacaoXlsx[],
      nomeArquivo = "relatorio",
    ): Promise<boolean> => {
      if (exportando || abas.length === 0) return false;

      setExportando(true);

      try {
        baixarPasta(abas, nomeArquivo);
        return true;
      } finally {
        setExportando(false);
      }
    },
    [exportando],
  );

  return { exportarXlsx, exportarAbasXlsx, exportando };
}

export default useExportarXlsx;
