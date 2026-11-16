import { useCallback, useMemo, useState } from "react";
import {
  CHAVES_COLUNAS_PADRAO,
  COLUNAS_TABELA_SERVIDORES,
  LIMITE_COLUNAS_SERVIDORES,
  type ChaveColunaServidor,
  type DefinicaoColunaServidor,
} from "../dados/dadosEstaticos";

export interface EstadoColunasServidores {
  colunas: DefinicaoColunaServidor[];
  colunasVisiveis: DefinicaoColunaServidor[];
  selecao: ChaveColunaServidor[];
  limite: number;
  alertaLimite: boolean;
  painelAberto: boolean;
  abrirPainel: () => void;
  fecharPainel: () => void;
  alternarColuna: (chave: ChaveColunaServidor, marcada: boolean) => void;
  salvar: () => void;
}

const colunasPorChave = new Map(
  COLUNAS_TABELA_SERVIDORES.map((coluna) => [coluna.chave, coluna]),
);

export function useColunasServidores(): EstadoColunasServidores {
  const [chavesVisiveis, setChavesVisiveis] = useState<ChaveColunaServidor[]>(
    CHAVES_COLUNAS_PADRAO,
  );
  const [selecao, setSelecao] = useState<ChaveColunaServidor[]>(
    CHAVES_COLUNAS_PADRAO,
  );
  const [alertaLimite, setAlertaLimite] = useState(false);
  const [painelAberto, setPainelAberto] = useState(false);

  const abrirPainel = useCallback(() => {
    setSelecao(chavesVisiveis);
    setAlertaLimite(false);
    setPainelAberto(true);
  }, [chavesVisiveis]);

  const fecharPainel = useCallback(() => setPainelAberto(false), []);

  const alternarColuna = useCallback(
    (chave: ChaveColunaServidor, marcada: boolean) => {
      if (colunasPorChave.get(chave)?.fixa) return;

      if (!marcada) {
        setSelecao(selecao.filter((item) => item !== chave));
        setAlertaLimite(false);
        return;
      }

      if (selecao.includes(chave)) return;

      if (selecao.length >= LIMITE_COLUNAS_SERVIDORES) {
        setAlertaLimite(true);
        return;
      }

      setSelecao([...selecao, chave]);
    },
    [selecao],
  );

  const salvar = useCallback(() => {
    setChavesVisiveis(selecao);
    setPainelAberto(false);
  }, [selecao]);

  const colunasVisiveis = useMemo(
    () =>
      chavesVisiveis.flatMap((chave) => {
        const coluna = colunasPorChave.get(chave);
        return coluna ? [coluna] : [];
      }),
    [chavesVisiveis],
  );

  return useMemo(
    () => ({
      colunas: COLUNAS_TABELA_SERVIDORES,
      colunasVisiveis,
      selecao,
      limite: LIMITE_COLUNAS_SERVIDORES,
      alertaLimite,
      painelAberto,
      abrirPainel,
      fecharPainel,
      alternarColuna,
      salvar,
    }),
    [
      colunasVisiveis,
      selecao,
      alertaLimite,
      painelAberto,
      abrirPainel,
      fecharPainel,
      alternarColuna,
      salvar,
    ],
  );
}

export default useColunasServidores;
