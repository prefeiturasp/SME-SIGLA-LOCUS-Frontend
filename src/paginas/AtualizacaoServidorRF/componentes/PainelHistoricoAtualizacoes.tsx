import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PainelLateral } from "@/componentes/PainelLateral";
import type { RegistroAtualizacao } from "../dados/dadosEstaticos";

const SEM_VALOR = "-";

const colunas: ColumnsType<RegistroAtualizacao> = [
  { title: "Motivo", dataIndex: "motivo", key: "motivo" },
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
    width: 120,
    render: (data: string) => dayjs(data).format("DD/MM/YYYY"),
  },
  { title: "Portaria", dataIndex: "portaria", key: "portaria", width: 120 },
  {
    title: "Documento",
    dataIndex: "documento",
    key: "documento",
    render: (documento?: string) => documento ?? SEM_VALOR,
  },
];

export interface PainelHistoricoAtualizacoesProps {
  aberto: boolean;
  registros: RegistroAtualizacao[];
  aoFechar: () => void;
}

export function PainelHistoricoAtualizacoes({
  aberto,
  registros,
  aoFechar,
}: PainelHistoricoAtualizacoesProps) {
  return (
    <PainelLateral
      aberto={aberto}
      titulo="Histórico de atualizações"
      descricao="Consulte os motivos e as datas das atualizações realizadas no cadastro."
      aoFechar={aoFechar}
      rodape={
        <Button type="default" onClick={aoFechar}>
          Fechar
        </Button>
      }
    >
      <Table
        rowKey="id"
        columns={colunas}
        dataSource={registros}
        pagination={false}
        rowClassName={(_, indice) => (indice % 2 === 1 ? "linhaPar" : "")}
      />
    </PainelLateral>
  );
}

export default PainelHistoricoAtualizacoes;
