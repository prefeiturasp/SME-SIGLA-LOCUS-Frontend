import type { ReactNode } from "react";
import { Typography } from "antd";
import IlustracaoPadrao from "@/assets/sad-locus.svg?react";
import { CardVazio, CardVazioImagem, CardVazioTitulo } from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;
const MARGEM_TOPO_PADRAO = 100;

export interface PaginaErroProps {
  titulo: string;
  descricao?: ReactNode;
  acao?: ReactNode;
  ilustracao?: ReactNode;
  /** Distancia do topo em px; 100 nas paginas de erro, menor dentro da tela. */
  margemTopo?: number;
}

export function PaginaErro({
  titulo,
  descricao,
  acao,
  ilustracao,
  margemTopo = MARGEM_TOPO_PADRAO,
}: PaginaErroProps) {
  return (
    <CardVazio style={{ marginTop: margemTopo }}>
      <CardVazioImagem>
        {ilustracao ?? (
          <IlustracaoPadrao
            width={LARGURA_ILUSTRACAO}
            height={ALTURA_ILUSTRACAO}
            role="presentation"
          />
        )}
      </CardVazioImagem>
      <CardVazioTitulo>{titulo}</CardVazioTitulo>
      {descricao ? <Text type="secondary">{descricao}</Text> : null}
      {acao ?? null}
    </CardVazio>
  );
}

export default PaginaErro;
