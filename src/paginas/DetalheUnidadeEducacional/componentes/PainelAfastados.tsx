import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PainelLateral } from "@/componentes/PainelLateral";
import { unidadesEducacionaisDetalheServico } from "@/servicos/recursos/unidadesEducacionais";
import {
  ROTULO_TIPO_AFASTAMENTO,
  type ProfessorAfastado,
  type TipoAfastamento,
} from "@/servicos/recursos/unidadesEducacionais/tipos";

const colunas: ColumnsType<ProfessorAfastado> = [
  { title: "Nome", dataIndex: "nome", key: "nome" },
  { title: "RF", dataIndex: "rf", key: "rf", width: 140 },
  {
    title: "Tipo de afastamento",
    dataIndex: "tipoAfastamento",
    key: "tipoAfastamento",
    width: 220,
    render: (tipo: TipoAfastamento) => ROTULO_TIPO_AFASTAMENTO[tipo],
  },
];

export interface PainelAfastadosProps {
  aberto: boolean;
  codigoLotacao: string;
  componenteId?: string;
  nomeComponente?: string;
  aoFechar: () => void;
}

export function PainelAfastados({
  aberto,
  codigoLotacao,
  componenteId,
  nomeComponente,
  aoFechar,
}: PainelAfastadosProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["professores-afastados", codigoLotacao, componenteId],
    queryFn: () =>
      unidadesEducacionaisDetalheServico.listarProfessoresAfastados(
        codigoLotacao,
        componenteId ?? "",
      ),
    enabled: aberto && Boolean(componenteId),
  });

  return (
    <PainelLateral
      aberto={aberto}
      titulo="Afastados"
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

export default PainelAfastados;
