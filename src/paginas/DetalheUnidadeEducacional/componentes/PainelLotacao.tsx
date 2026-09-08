import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PainelLateral } from "@/componentes/PainelLateral";
import { unidadesEducacionaisDetalheServico } from "@/servicos/recursos/unidadesEducacionais";
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
  codigoLotacao,
  componenteId,
  nomeComponente,
  aoFechar,
}: PainelLotacaoProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["professores-lotados", codigoLotacao, componenteId],
    queryFn: () =>
      unidadesEducacionaisDetalheServico.listarProfessoresLotados(
        codigoLotacao,
        componenteId ?? "",
      ),
    enabled: aberto && Boolean(componenteId),
  });

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
        dataSource={data ?? []}
        loading={isLoading}
        pagination={false}
      />
    </PainelLateral>
  );
}

export default PainelLotacao;
