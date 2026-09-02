import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DatePicker, Table, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChipVagas } from "@/componentes/ui/ChipVagas";
import { TAMANHO_PAGINA } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import type { UnidadeEducacional } from "@/servicos/recursos/unidadesEducacionais/tipos";
import estilos from "./TabelaUnidades.module.css";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

/** "Mostrando 1-N de TOTAL registro(s)" para o `showTotal` da paginacao. */
function textoContagem(total: number, [inicio, fim]: [number, number]): string {
  return `Mostrando ${inicio}-${fim} de ${total.toLocaleString(
    "pt-BR",
  )} registro(s)`;
}

function cabecalhoComInfo(titulo: string, dica: string) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {titulo}
      <Tooltip title={dica}>
        <InfoOutlinedIcon fontSize="inherit" />
      </Tooltip>
    </span>
  );
}

const colunas: ColumnsType<UnidadeEducacional> = [
  { title: "Código de lotação", dataIndex: "codigoLotacao", key: "codigoLotacao" },
  { title: "Tipo", dataIndex: "tipo", key: "tipo" },
  { title: "Unidade Educacional", dataIndex: "nome", key: "nome" },
  { title: "DRE", dataIndex: "dre", key: "dre" },
  {
    title: cabecalhoComInfo(
      "Módulo",
      "Quantidade total de vagas previstas na unidade educacional, estejam elas ocupadas ou não.",
    ),
    dataIndex: "modulo",
    key: "modulo",
  },
  {
    title: cabecalhoComInfo(
      "Lotação",
      "Quantidade de professores atualmente lotados na unidade educacional.",
    ),
    dataIndex: "lotacao",
    key: "lotacao",
  },
  {
    title: cabecalhoComInfo(
      "Afastados",
      "Quantidade de professores temporariamente afastados de suas atividades.",
    ),
    dataIndex: "afastados",
    key: "afastados",
    render: (valor: number) => String(valor).padStart(2, "0"),
  },
  {
    title: cabecalhoComInfo(
      "Vagas",
      "Valores negativos indicam professores excedentes. Valores positivos indicam vagas disponíveis.",
    ),
    dataIndex: "saldoVagas",
    key: "saldoVagas",
    render: (saldo: number) => <ChipVagas saldo={saldo} />,
  },
];

export interface TabelaUnidadesEscolares {
  unidades: UnidadeEducacional[];
  total: number;
  carregando: boolean;
}

export function TabelaUnidades({
  unidades,
  total,
  carregando,
}: TabelaUnidadesEscolares) {
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
          padding: "0 8px",
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <Title level={4} style={{ marginTop: 0 }}>
            Unidades educacionais
          </Title>
          <Paragraph>
            Clique em uma unidade educacional para conferir os módulos de cada
            componente curricular. Você também pode selecionar um período para
            consultar as movimentações realizadas nesse intervalo.
          </Paragraph>
        </div>
        <div>
          <label
            style={{ display: "block", fontWeight: 700, marginBottom: 8 }}
            htmlFor="periodo"
          >
            Selecione um período
          </label>
          <RangePicker
            id="periodo"
            format="DD/MM/YYYY"
            placeholder={["00/00/0000", "00/00/0000"]}
          />
        </div>
      </div>

      <Table<UnidadeEducacional>
        className={estilos.tabela}
        rowKey="codigoLotacao"
        columns={colunas}
        dataSource={unidades}
        loading={carregando}
        rowClassName={(_, indice) =>
          indice % 2 === 1 ? "linhaPar" : ""
        }
        pagination={{
          total,
          pageSize: TAMANHO_PAGINA,
          showSizeChanger: false,
          showTotal: (totalReg, intervalo) =>
            textoContagem(totalReg, intervalo),
        }}
      />
    </section>
  );
}

export default TabelaUnidades;
