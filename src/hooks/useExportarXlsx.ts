import { useCallback, useState } from "react";
import * as XLSX from "xlsx";

export interface ColunaExportacaoXlsx {
  chave: string;
  titulo: string;
}

function valorCelula(valor: unknown): string | number {
  if (valor == null) return "";
  if (typeof valor === "string" || typeof valor === "number") return valor;
  return String(valor);
}

/** Monta e baixa um .xlsx com as colunas informadas (ordem/visibilidade do chamador). */
export function useExportarXlsx() {
  const [exportando, setExportando] = useState(false);

  const exportarXlsx = useCallback(
    async <T extends object>(
      linhas: readonly T[],
      colunas: readonly ColunaExportacaoXlsx[],
      nomeArquivo = "relatorio",
    ) => {
      if (exportando || colunas.length === 0) return;

      setExportando(true);

      try {
        const cabecalho = colunas.map((coluna) => coluna.titulo);
        const corpo = linhas.map((linha) => {
          const registro = linha as Record<string, unknown>;
          return colunas.map((coluna) => valorCelula(registro[coluna.chave]));
        });

        const planilha = XLSX.utils.aoa_to_sheet([cabecalho, ...corpo]);
        const pasta = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(pasta, planilha, "Servidores");

        const hoje = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(pasta, `${nomeArquivo}-${hoje}.xlsx`);
      } finally {
        setExportando(false);
      }
    },
    [exportando],
  );

  return { exportarXlsx, exportando };
}

export default useExportarXlsx;
