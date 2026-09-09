import { FormItem, SelectForm } from "@/estilos";
import type { OpcaoSelecao } from "@/tipos/unidadesEducacionais";
import { SegmentadoComBorda } from "../Estilos";
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
      <FormItem
        label="Componente curricular"
        layout="vertical"
        style={{ width: LARGURA_SELECT, marginBottom: 0 }}
      >
        <SelectForm
          id="filtro-componente"
          allowClear
          placeholder="Selecione"
          value={componenteSelecionado}
          onChange={(valor) =>
            aoSelecionarComponente(valor as string | undefined)
          }
          options={opcoesComponente}
        />
      </FormItem>

      <SegmentadoComBorda
        aria-label="Filtrar componentes por situação"
        value={filtroSituacao}
        onChange={(novoValor) =>
          aoSelecionarFiltroSituacao(novoValor as FiltroSituacao)
        }
        options={OPCOES_FILTRO_SITUACAO.map(({ valor, rotulo }) => ({
          label: rotulo,
          value: valor,
        }))}
      />
    </div>
  );
}

export default FiltrosComponentes;
