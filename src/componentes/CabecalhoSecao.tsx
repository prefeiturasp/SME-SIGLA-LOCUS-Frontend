import type { ReactNode } from "react";
import { Typography } from "antd";
import { SecaoAcao, SecaoCabecalho, SecaoTextos } from "@/estilos";

const { Title, Paragraph } = Typography;

export interface CabecalhoSecaoProps {
  titulo: string;
  descricao?: ReactNode;
  /** Controle exibido a direita (select rotulado, seletor de periodo, botao). */
  acao?: ReactNode;
  larguraAcao?: number;
}

/** Cabecalho de card: titulo e descricao a esquerda, controle a direita. */
export function CabecalhoSecao({
  titulo,
  descricao,
  acao,
  larguraAcao,
}: CabecalhoSecaoProps) {
  return (
    <SecaoCabecalho>
      <SecaoTextos>
        <Title level={4} style={{ marginTop: 0 }}>
          {titulo}
        </Title>
        {descricao ? (
          <Paragraph style={{ marginBottom: 0 }}>{descricao}</Paragraph>
        ) : null}
      </SecaoTextos>
      {acao ? <SecaoAcao $largura={larguraAcao}>{acao}</SecaoAcao> : null}
    </SecaoCabecalho>
  );
}

export default CabecalhoSecao;
