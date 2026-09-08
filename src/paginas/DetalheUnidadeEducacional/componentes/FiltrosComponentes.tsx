import { Select } from "antd";
import { CampoRotulado } from "@/componentes/CampoRotulado";
import { GrupoFiltroSegmentado } from "@/componentes/GrupoFiltroSegmentado";
import type { OpcaoSelecao } from "@/servicos/recursos/unidadesEducacionais/tipos";
import {
  OPCOES_FILTRO_SITUACAO,
  type FiltroSituacao,
} from "../hooks/useDetalheUnidade";

const LARGURA_SELECT = 420;

export interface FiltrosComponentesProps {
  opcoesComponente: OpcaoSelecao[];
  componenteSelecionado?: string;
  filtroSituacao: FiltroSituacao;
  aoSelecionarComponente: (valor?: string) => void;
  aoSelecionarFiltroSituacao: (valor: FiltroSituacao) => void;
}

export function FiltrosComponentes({
  opcoesComponente,
  componenteSelecionado,
  filtroSituacao,
  aoSelecionarComponente,
  aoSelecionarFiltroSituacao,
}: FiltrosComponentesProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
        marginBottom: 24,
      }}
    >
      <CampoRotulado
        id="filtro-componente"
        rotulo="Componente curricular"
        largura={LARGURA_SELECT}
      >
        <Select
          id="filtro-componente"
          style={{ width: "100%" }}
          allowClear
          placeholder="Selecione"
          value={componenteSelecionado}
          onChange={aoSelecionarComponente}
          options={opcoesComponente}
        />
      </CampoRotulado>

      <GrupoFiltroSegmentado
        opcoes={OPCOES_FILTRO_SITUACAO}
        valor={filtroSituacao}
        aoSelecionar={aoSelecionarFiltroSituacao}
        rotuloAcessivel="Filtrar componentes por situação"
      />
    </div>
  );
}

export default FiltrosComponentes;
