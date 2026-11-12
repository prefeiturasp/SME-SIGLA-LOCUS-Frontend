import { useMemo, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, Card, Flex, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import { criarPaginacaoPadrao } from "@/estilos";
import {
  TAMANHO_PAGINA_SERVIDORES,
  type DefinicaoColunaServidor,
  type ServidorAtivo,
} from "../dados/dadosEstaticos";
import { TabelaServidores } from "../Estilos";

const LARGURA_SUBCOLUNA = 80;

function criarColuna(
  coluna: DefinicaoColunaServidor,
): ColumnsType<ServidorAtivo>[number] {
  if (coluna.subcolunas) {
    return {
      title: coluna.titulo,
      key: coluna.chave,
      children: coluna.subcolunas.map((subcoluna) => ({
        title: subcoluna.titulo,
        dataIndex: subcoluna.chave,
        key: subcoluna.chave,
        width: LARGURA_SUBCOLUNA,
      })),
    };
  }

  return {
    title: coluna.titulo,
    dataIndex: coluna.chave,
    key: coluna.chave,
    fixed: coluna.fixa ? "left" : undefined,
    ellipsis: true,
  };
}

export interface CardTabelaServidoresProps {
  servidores: ServidorAtivo[];
  total: number;
  colunasVisiveis: DefinicaoColunaServidor[];
  aoPersonalizarColunas: () => void;
  aoVerDetalhes: (servidor: ServidorAtivo) => void;
}

export function CardTabelaServidores({
  servidores,
  total,
  colunasVisiveis,
  aoPersonalizarColunas,
  aoVerDetalhes,
}: CardTabelaServidoresProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(TAMANHO_PAGINA_SERVIDORES);

  const colunasTabela = useMemo<ColumnsType<ServidorAtivo>>(() => {
    return [
      ...colunasVisiveis.map(criarColuna),
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
            <Tooltip title="Personalizar colunas">
              <Button
                type="default"
                aria-label="Personalizar colunas"
                icon={<TuneIcon fontSize="small" />}
                onClick={aoPersonalizarColunas}
              />
            </Tooltip>
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
