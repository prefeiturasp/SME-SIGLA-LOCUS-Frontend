import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Drawer, Typography } from "antd";
import type { CSSProperties, ReactNode } from "react";
import { spacing } from "@/estilos/tokens/tokens";

const { Paragraph, Text } = Typography;

const LARGURA_PADRAO = "50%";

/** Rodape alinhado ao conteudo do painel, sem a linha divisoria do Drawer. */
const ESTILO_RODAPE: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: spacing.sm,
  padding: spacing.lg,
  borderTop: "none",
};

export interface PainelLateralProps {
  aberto: boolean;
  titulo: string;
  descricao?: ReactNode;
  contexto?: ReactNode;
  largura?: number | string;
  /** Acoes fixas no rodape do painel, alinhadas a direita. */
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
      footer={rodape}
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
