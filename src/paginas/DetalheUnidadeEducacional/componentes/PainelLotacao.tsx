import { useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDadosEstaticos } from "@/hooks/useDadosEstaticos";
import { PainelLateral } from "@/componentes/PainelLateral";
import { unidadesEducacionaisDetalheServico } from "@/dados/unidadesEducacionais";
import {
  ROTULO_TIPO_VAGA,
  type ProfessorLotado,
  type TipoVaga,
} from "@/tipos/unidadesEducacionais";

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
  codigoLotacao,
  componenteId,
  nomeComponente,
  aoFechar,
}: PainelLotacaoProps) {
  const { dados, carregando } = useDadosEstaticos(
    useCallback(
      () =>
        unidadesEducacionaisDetalheServico.listarProfessoresLotados(
          codigoLotacao,
          componenteId ?? "",
        ),
      [codigoLotacao, componenteId],
    ),
    [codigoLotacao, componenteId],
    aberto && Boolean(componenteId),
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
        loading={carregando}
        pagination={false}
      />
    </PainelLateral>
  );
}

export default PainelLotacao;
