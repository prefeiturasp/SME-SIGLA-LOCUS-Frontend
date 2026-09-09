import { useMemo } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PainelLateral } from "@/componentes/PainelLateral";
import {
  professoresLotadosPadrao,
  professoresLotadosPorComponente,
} from "@/paginas/DetalheUnidadeEducacional/dados/dadosEstaticos";
import {
  ROTULO_TIPO_VAGA,
  type ProfessorLotado,
  type TipoVaga,
} from "@/servicos/recursos/unidadesEducacionais/tipos";

const colunas: ColumnsType<ProfessorLotado> = [
  { title: "Nome", dataIndex: "nome", key: "nome" },
  { title: "RF", dataIndex: "rf", key: "rf", width: 140 },
  {
    title: "Tipo de vaga",
    dataIndex: "tipoVaga",
    key: "tipoVaga",
    width: 160,
    render: (tipo: TipoVaga) => ROTULO_TIPO_VAGA[tipo],
  },
];

export interface PainelLotacaoProps {
  aberto: boolean;
  codigoLotacao: string;
  componenteId?: string;
  nomeComponente?: string;
  aoFechar: () => void;
}

export function PainelLotacao({
  aberto,
  codigoLotacao: _codigoLotacao,
  componenteId,
  nomeComponente,
  aoFechar,
}: PainelLotacaoProps) {
  const dados = useMemo(
    () =>
      componenteId
        ? (professoresLotadosPorComponente[componenteId] ??
          professoresLotadosPadrao)
        : [],
    [componenteId],
  );

  return (
    <PainelLateral
      aberto={aberto}
      titulo="Lotação"
      descricao="Confira os professores em atividades neste componente curricular."
      contexto={`Componente curricular: ${nomeComponente ?? ""}`}
      aoFechar={aoFechar}
    >
      <Table
        rowKey="nome"
        columns={colunas}
        dataSource={dados ?? []}
        pagination={false}
      />
    </PainelLateral>
  );
}

export default PainelLotacao;
