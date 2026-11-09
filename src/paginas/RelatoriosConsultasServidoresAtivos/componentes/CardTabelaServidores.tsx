import { useMemo, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, Card, Flex, Popover, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import { criarPaginacaoPadrao } from "@/estilos";
import {
  TAMANHO_PAGINA_SERVIDORES,
  type ChaveColunaServidor,
  type DefinicaoColunaServidor,
  type ServidorAtivo,
} from "../dados/dadosEstaticos";
import { TabelaServidores } from "../Estilos";
import { SeletorColunasServidores } from "./SeletorColunasServidores";

export interface CardTabelaServidoresProps {
  servidores: ServidorAtivo[];
  total: number;
  colunas: DefinicaoColunaServidor[];
  colunasVisiveis: DefinicaoColunaServidor[];
  aoAlterarColuna: (chave: ChaveColunaServidor, visivel: boolean) => void;
  aoVerDetalhes: (servidor: ServidorAtivo) => void;
}

export function CardTabelaServidores({
  servidores,
  total,
  colunas,
  colunasVisiveis,
  aoAlterarColuna,
  aoVerDetalhes,
}: CardTabelaServidoresProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(TAMANHO_PAGINA_SERVIDORES);

  const colunasTabela = useMemo<ColumnsType<ServidorAtivo>>(() => {
    const dados: ColumnsType<ServidorAtivo> = colunasVisiveis.map((coluna) => ({
      title: coluna.titulo,
      dataIndex: coluna.chave,
      key: coluna.chave,
      fixed: coluna.fixa ? "left" : undefined,
      ellipsis: true,
    }));

    return [
      ...dados,
      {
        title: "",
        key: "acoes",
        fixed: "right",
        width: 150,
        render: (_, servidor) => (
          <Button type="default" onClick={() => aoVerDetalhes(servidor)}>
            Mais detalhes
          </Button>
        ),
      },
    ];
  }, [aoVerDetalhes, colunasVisiveis]);

  return (
    <Card>
      <CabecalhoSecao
        titulo="Filtrar servidores"
        descricao="A lista reúne os servidores que correspondem aos filtros aplicados. Para mais informações sobre um servidor, clique em 'Mais detalhes'."
        acao={
          <Flex gap="small">
            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <SeletorColunasServidores
                  colunas={colunas}
                  aoAlterar={aoAlterarColuna}
                />
              }
            >
              <Button
                type="default"
                aria-label="Colunas da tabela"
                icon={<TuneIcon fontSize="small" />}
              />
            </Popover>
            <Button
              type="default"
              icon={<FileUploadOutlinedIcon fontSize="small" />}
            >
              Exportar relatório
            </Button>
          </Flex>
        }
      />

      <TabelaServidores>
        <Table
          rowKey="id"
          columns={colunasTabela}
          dataSource={servidores}
          scroll={{ x: true }}
          rowClassName={(_, indice) => (indice % 2 === 1 ? "linhaPar" : "")}
          pagination={{
            ...criarPaginacaoPadrao({
              total,
              pageSize: tamanhoPagina,
              paginaAtual,
              showSizeChanger: true,
            }),
            onChange: (pagina, pageSize) => {
              setPaginaAtual(pagina);
              setTamanhoPagina(pageSize ?? TAMANHO_PAGINA_SERVIDORES);
            },
          }}
        />
      </TabelaServidores>
    </Card>
  );
}

export default CardTabelaServidores;
