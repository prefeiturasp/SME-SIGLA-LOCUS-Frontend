import { useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDadosEstaticos } from "@/hooks/useDadosEstaticos";
import { PainelLateral } from "@/componentes/PainelLateral";
import { unidadesEducacionaisDetalheServico } from "@/dados/unidadesEducacionais";
import {
  ROTULO_TIPO_AFASTAMENTO,
  type ProfessorAfastado,
  type TipoAfastamento,
} from "@/tipos/unidadesEducacionais";

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
  const { dados, carregando } = useDadosEstaticos(
    useCallback(
      () =>
        unidadesEducacionaisDetalheServico.listarProfessoresAfastados(
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
      titulo="Afastados"
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

export default PainelAfastados;
