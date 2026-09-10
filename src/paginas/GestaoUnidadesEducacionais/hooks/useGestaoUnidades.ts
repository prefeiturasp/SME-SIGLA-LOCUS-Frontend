import { useMemo, useState } from "react";
import type {
  FiltrosUnidades,
  PainelComponente,
  UnidadeEducacional,
} from "@/servicos/recursos/unidadesEducacionais/tipos";
import {
  estatisticasPainel,
  linhasUnidades,
  opcoesComponenteCurricular,
  TOTAL_REGISTROS,
} from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

const COMPONENTE_PADRAO =
  opcoesComponenteCurricular[0]?.value ?? "Arte";

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
  const [, setFiltros] = useState<FiltrosUnidades>({});

  // Dados estaticos: os filtros ainda nao recortam a listagem, que sai
  // inteira do mock. `carregando`/`erro` seguem na interface porque a
  // tabela os consome; voltam a variar quando a API entrar.
  const painel = useMemo<PainelComponente>(
    () => ({
      componente: componenteSelecionado,
      estatisticas: estatisticasPainel,
    }),
    [componenteSelecionado],
  );

  return useMemo(
    () => ({
      unidades: linhasUnidades,
      total: TOTAL_REGISTROS,
      painel,
      componenteSelecionado,
      carregando: false,
      erro: false,
      selecionarComponente: setComponenteSelecionado,
      aplicarFiltros: (novos: FiltrosUnidades) =>
        setFiltros((atuais) => ({ ...atuais, ...novos })),
      limparFiltros: () => setFiltros({}),
    }),
    [painel, componenteSelecionado],
  );
}

export default useGestaoUnidades;
