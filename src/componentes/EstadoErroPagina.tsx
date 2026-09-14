import type { ReactNode } from "react";
import { Typography } from "antd";
import IlustracaoPadrao from "@/assets/sad-locus.svg?react";
import { CardVazio, CardVazioImagem, CardVazioTitulo } from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export interface EstadoErroPaginaProps {
  titulo: string;
  descricao?: ReactNode;
  /** Slot da acao principal — normalmente um Button. */
  acao?: ReactNode;
  /** Substitui a ilustracao padrao quando informada. */
  ilustracao?: ReactNode;
}

export function EstadoErroPagina({
  titulo,
  descricao,
  acao,
  ilustracao,
}: EstadoErroPaginaProps) {
  return (
    <CardVazio>
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

export default EstadoErroPagina;
