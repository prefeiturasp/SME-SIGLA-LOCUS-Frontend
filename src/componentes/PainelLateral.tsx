import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Drawer, Typography } from "antd";
import type { CSSProperties, ReactNode } from "react";
import { PainelRodape } from "@/estilos";

const { Paragraph, Text } = Typography;

const LARGURA_PADRAO = "50%";
const ESTILO_RODAPE: CSSProperties = { borderTop: "none", padding: "16px 24px" };

export interface PainelLateralProps {
  aberto: boolean;
  titulo: string;
  descricao?: ReactNode;
  contexto?: ReactNode;
  largura?: number | string;
  /** Acoes fixas na base do painel, alinhadas a direita. */
  rodape?: ReactNode;
  aoFechar: () => void;
  children: ReactNode;
}

export function PainelLateral({
  aberto,
  titulo,
  descricao,
  contexto,
  largura = LARGURA_PADRAO,
  rodape,
  aoFechar,
  children,
}: PainelLateralProps) {
  return (
    <Drawer
      open={aberto}
      title={titulo}
      width={largura}
      placement="right"
      onClose={aoFechar}
      closable={false}
      destroyOnHidden
      footer={rodape ? <PainelRodape>{rodape}</PainelRodape> : undefined}
      styles={{ footer: ESTILO_RODAPE }}
      extra={
        <Button
          type="default"
          aria-label="Fechar"
          onClick={aoFechar}
          icon={<CloseRoundedIcon fontSize="small" />}
        />
      }
    >
      {descricao ? <Paragraph>{descricao}</Paragraph> : null}
      {contexto ? (
        <Paragraph>
          <Text strong>{contexto}</Text>
        </Paragraph>
      ) : null}
      {children}
    </Drawer>
  );
}

export default PainelLateral;
