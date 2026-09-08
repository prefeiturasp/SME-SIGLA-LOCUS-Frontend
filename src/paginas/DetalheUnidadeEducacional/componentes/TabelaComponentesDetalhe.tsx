import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CampoNumeroModulo } from "@/componentes/CampoNumeroModulo";
import { ChipNumeroClicavel } from "@/componentes/ChipNumeroClicavel";
import { ColunaComInfo } from "@/componentes/ColunaComInfo";
import {
  RotuloGrupo,
  Tabela,
  TagVagas,
  textoContagemComponentes,
} from "@/estilos";
import { DICAS_COLUNAS_COMPONENTE } from "@/servicos/recursos/unidadesEducacionais/textos";
import type { ComponenteCurricularDetalhe } from "@/servicos/recursos/unidadesEducacionais/tipos";
import type { LinhaTabelaComponentes } from "../utilitarios";

/** Quantidade de colunas da tabela; usada no colSpan das linhas de grupo. */
const TOTAL_COLUNAS = 6;

export interface TabelaComponentesDetalheProps {
  linhas: LinhaTabelaComponentes[];
  totalComponentes: number;
  componentesExibidos: number;
  carregando: boolean;
  somenteLeitura?: boolean;
  aoAlterarModulo: (componenteId: string, valor: number) => void;
  aoAbrirLotacao: (componente: ComponenteCurricularDetalhe) => void;
  aoAbrirAfastados: (componente: ComponenteCurricularDetalhe) => void;
}

/**
 * Celula de uma linha de cabecalho de grupo: a primeira coluna ocupa a
 * largura toda e as demais somem.
 */
function celulaGrupo(
  linha: LinhaTabelaComponentes,
  indiceColuna: number,
  totalColunas: number,
) {
  if (linha.tipo !== "grupo") return {};
  return { colSpan: indiceColuna === 0 ? totalColunas : 0 };
}

export function TabelaComponentesDetalhe({
  linhas,
  totalComponentes,
  componentesExibidos,
  carregando,
  somenteLeitura = false,
  aoAlterarModulo,
  aoAbrirLotacao,
  aoAbrirAfastados,
}: TabelaComponentesDetalheProps) {
  const colunas: ColumnsType<LinhaTabelaComponentes> = [
    {
      title: "Componente curricular",
      key: "componente",
      onCell: (linha) => celulaGrupo(linha, 0, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? (
          <RotuloGrupo>{linha.rotulo}</RotuloGrupo>
        ) : (
          linha.componente
        ),
    },
    {
      title: (
        <ColunaComInfo titulo="Módulo" dica={DICAS_COLUNAS_COMPONENTE.modulo} />
      ),
      key: "modulo",
      align: "center",
      width: 140,
      onCell: (linha) => celulaGrupo(linha, 1, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? null : (
          <CampoNumeroModulo
            valor={linha.modulo}
            desabilitado={somenteLeitura}
            rotuloAcessivel={`Módulo de ${linha.componente}`}
            aoAlterar={(valor) => aoAlterarModulo(linha.id, valor)}
          />
        ),
    },
    {
      title: (
        <ColunaComInfo
          titulo="Lotação"
          dica={DICAS_COLUNAS_COMPONENTE.lotacao}
        />
      ),
      key: "lotacao",
      align: "center",
      width: 120,
      onCell: (linha) => celulaGrupo(linha, 2, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? null : (
          <ChipNumeroClicavel
            valor={linha.lotacao}
            rotuloAcessivel={`Ver lotação de ${linha.componente}`}
            aoClicar={
              somenteLeitura ? undefined : () => aoAbrirLotacao(linha)
            }
          />
        ),
    },
    {
      title: (
        <ColunaComInfo
          titulo="Afastados"
          dica={DICAS_COLUNAS_COMPONENTE.afastados}
        />
      ),
      key: "afastados",
      align: "center",
      width: 120,
      onCell: (linha) => celulaGrupo(linha, 3, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? null : (
          <ChipNumeroClicavel
            valor={linha.afastados}
            rotuloAcessivel={`Ver afastados de ${linha.componente}`}
            aoClicar={
              somenteLeitura ? undefined : () => aoAbrirAfastados(linha)
            }
          />
        ),
    },
    {
      title: (
        <ColunaComInfo
          titulo="Vacâncias"
          dica={DICAS_COLUNAS_COMPONENTE.vacancia}
        />
      ),
      key: "vacancias",
      align: "center",
      width: 120,
      onCell: (linha) => celulaGrupo(linha, 4, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? null : linha.vacancias,
    },
    {
      title: (
        <ColunaComInfo titulo="Vagas" dica={DICAS_COLUNAS_COMPONENTE.vagas} />
      ),
      key: "saldoVagas",
      align: "center",
      width: 160,
      onCell: (linha) => celulaGrupo(linha, 5, TOTAL_COLUNAS),
      render: (_, linha) =>
        linha.tipo === "grupo" ? null : <TagVagas saldo={linha.saldoVagas} />,
    },
  ];

  return (
    <Tabela
      $linhasClicaveis={false}
      rowKey="id"
      columns={colunas}
      dataSource={linhas}
      loading={carregando}
      pagination={false}
      rowClassName={(linha) => (linha as LinhaTabelaComponentes).classe}
      summary={() => (
        <Table.Summary>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={TOTAL_COLUNAS}>
              <strong>
                {textoContagemComponentes(componentesExibidos, totalComponentes)}
              </strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
}

export default TabelaComponentesDetalhe;
