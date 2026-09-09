import { useCallback, useMemo, useState } from "react";
import { useDadosEstaticos } from "@/hooks/useDadosEstaticos";
import { unidadesEducacionaisServico } from "@/dados/unidadesEducacionais";
import type {
  FiltrosUnidades,
  PainelComponente,
  UnidadeEducacional,
} from "@/tipos/unidadesEducacionais";
import { opcoesComponenteCurricular } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

const COMPONENTE_PADRAO = opcoesComponenteCurricular[0]?.value ?? "Arte";

export interface EstadoGestaoUnidades {
  unidades: UnidadeEducacional[];
  total: number;
  painel: PainelComponente | undefined;
  componenteSelecionado: string;
  carregando: boolean;
  erro: boolean;
  selecionarComponente: (componente: string) => void;
  aplicarFiltros: (filtros: FiltrosUnidades) => void;
  limparFiltros: () => void;
}

export function useGestaoUnidades(): EstadoGestaoUnidades {
  const [componenteSelecionado, setComponenteSelecionado] =
    useState(COMPONENTE_PADRAO);
  const [filtros, setFiltros] = useState<FiltrosUnidades>({});

  const listagem = useDadosEstaticos(
    useCallback(() => unidadesEducacionaisServico.listar(filtros), [filtros]),
    [filtros],
  );

  const painelQuery = useDadosEstaticos(
    useCallback(
      () => unidadesEducacionaisServico.painel(componenteSelecionado),
      [componenteSelecionado],
    ),
    [componenteSelecionado],
  );

  return useMemo(
    () => ({
      unidades: listagem.dados?.itens ?? [],
      total: listagem.dados?.total ?? 0,
      painel: painelQuery.dados,
      componenteSelecionado,
      carregando: listagem.carregando || painelQuery.carregando,
      erro: listagem.erro || painelQuery.erro,
      selecionarComponente: setComponenteSelecionado,
      aplicarFiltros: (novos: FiltrosUnidades) =>
        setFiltros((atuais) => ({ ...atuais, ...novos })),
      limparFiltros: () => setFiltros({}),
    }),
    [
      listagem.dados,
      listagem.carregando,
      listagem.erro,
      painelQuery.dados,
      painelQuery.carregando,
      painelQuery.erro,
      componenteSelecionado,
    ],
  );
}

export default useGestaoUnidades;
