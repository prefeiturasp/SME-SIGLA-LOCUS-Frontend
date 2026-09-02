import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { unidadesEducacionaisServico } from "@/servicos/recursos/unidadesEducacionais";
import type {
  FiltrosUnidades,
  PainelComponente,
  UnidadeEducacional,
} from "@/servicos/recursos/unidadesEducacionais/tipos";
import { opcoesComponenteCurricular } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";

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
  const [filtros, setFiltros] = useState<FiltrosUnidades>({});

  const listagem = useQuery({
    queryKey: ["unidades-educacionais", filtros],
    queryFn: () => unidadesEducacionaisServico.listar(filtros),
  });

  const painelQuery = useQuery({
    queryKey: ["painel-componente", componenteSelecionado],
    queryFn: () => unidadesEducacionaisServico.painel(componenteSelecionado),
  });

  return useMemo(
    () => ({
      unidades: listagem.data?.itens ?? [],
      total: listagem.data?.total ?? 0,
      painel: painelQuery.data,
      componenteSelecionado,
      carregando: listagem.isLoading || painelQuery.isLoading,
      erro: listagem.isError || painelQuery.isError,
      selecionarComponente: setComponenteSelecionado,
      aplicarFiltros: (novos: FiltrosUnidades) =>
        setFiltros((atuais) => ({ ...atuais, ...novos })),
      limparFiltros: () => setFiltros({}),
    }),
    [
      listagem.data,
      listagem.isLoading,
      listagem.isError,
      painelQuery.data,
      painelQuery.isLoading,
      painelQuery.isError,
      componenteSelecionado,
    ],
  );
}

export default useGestaoUnidades;
