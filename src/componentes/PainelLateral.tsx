import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, Typography } from "antd";
import type { ReactNode } from "react";
import { PainelLateralDrawer } from "@/estilos";

const { Paragraph, Text } = Typography;

const LARGURA_PADRAO = "50%";

export interface PainelLateralProps {
  aberto: boolean;
  titulo: string;
  descricao?: ReactNode;
  contexto?: ReactNode;
  largura?: number | string;
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
    <PainelLateralDrawer
      open={aberto}
      title={titulo}
      width={largura}
      placement="right"
      onClose={aoFechar}
      closable={false}
      destroyOnHidden
      footer={rodape}
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
    </PainelLateralDrawer>
  );
}

export default PainelLateral;
