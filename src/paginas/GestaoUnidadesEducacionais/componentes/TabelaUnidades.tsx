import { DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CabecalhoCard } from "@/componentes/CabecalhoCard";
import { CampoRotulado } from "@/componentes/CampoRotulado";
import { ColunaComInfo } from "@/componentes/ColunaComInfo";
import { criarPaginacaoPadrao, TagVagas, Tabela } from "@/estilos";
import { TAMANHO_PAGINA } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import { DICAS_COLUNAS_UNIDADE } from "@/textos/unidadesEducacionais";
import type { UnidadeEducacional } from "@/tipos/unidadesEducacionais";
import { formatarNumeroPadded } from "@/utilitarios/formatadores";

const { RangePicker } = DatePicker;

const colunas: ColumnsType<UnidadeEducacional> = [
  {
    title: "Código de lotação",
    dataIndex: "codigoLotacao",
    key: "codigoLotacao",
  },
  { title: "Tipo", dataIndex: "tipo", key: "tipo" },
  { title: "Unidade Educacional", dataIndex: "nome", key: "nome" },
  { title: "DRE", dataIndex: "dre", key: "dre" },
  {
    title: (
      <ColunaComInfo titulo="Módulo" dica={DICAS_COLUNAS_UNIDADE.modulo} />
    ),
    dataIndex: "modulo",
    key: "modulo",
  },
  {
    title: (
      <ColunaComInfo titulo="Lotação" dica={DICAS_COLUNAS_UNIDADE.lotacao} />
    ),
    dataIndex: "lotacao",
    key: "lotacao",
  },
  {
    title: (
      <ColunaComInfo
        titulo="Afastados"
        dica={DICAS_COLUNAS_UNIDADE.afastados}
      />
    ),
    dataIndex: "afastados",
    key: "afastados",
    render: (valor: number) => formatarNumeroPadded(valor),
  },
  {
    title: <ColunaComInfo titulo="Vagas" dica={DICAS_COLUNAS_UNIDADE.vagas} />,
    dataIndex: "saldoVagas",
    key: "saldoVagas",
    render: (saldo: number) => <TagVagas saldo={saldo} />,
  },
];

export interface TabelaUnidadesProps {
  unidades: UnidadeEducacional[];
  total: number;
  carregando: boolean;
  aoSelecionarUnidade?: (unidade: UnidadeEducacional) => void;
}

export function TabelaUnidades({
  unidades,
  total,
  carregando,
  aoSelecionarUnidade,
}: TabelaUnidadesProps) {
  return (
    <section>
      <div style={{ padding: "0 8px" }}>
        <CabecalhoCard
          titulo="Unidades educacionais"
          descricao="Clique em uma unidade educacional para conferir os módulos de cada componente curricular. Você também pode selecionar um período para consultar as movimentações realizadas nesse intervalo."
          acao={
            <CampoRotulado id="periodo" rotulo="Selecione um período">
              <RangePicker
                id="periodo"
                format="DD/MM/YYYY"
                placeholder={["00/00/0000", "00/00/0000"]}
              />
            </CampoRotulado>
          }
        />
      </div>

      <Tabela
        rowKey="codigoLotacao"
        columns={colunas}
        dataSource={unidades}
        loading={carregando}
        rowClassName={(_, indice) => (indice % 2 === 1 ? "linhaPar" : "")}
        onRow={(unidade) => ({
          onClick: () => aoSelecionarUnidade?.(unidade),
          role: aoSelecionarUnidade ? "button" : undefined,
          tabIndex: aoSelecionarUnidade ? 0 : undefined,
          onKeyDown: (evento) => {
            if (
              aoSelecionarUnidade &&
              (evento.key === "Enter" || evento.key === " ")
            ) {
              evento.preventDefault();
              aoSelecionarUnidade(unidade);
            }
          },
        })}
        pagination={criarPaginacaoPadrao({
          total,
          pageSize: TAMANHO_PAGINA,
        })}
      />
    </section>
  );
}

export default TabelaUnidades;
