import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "antd";
import { CabecalhoColunaInfo } from "@/estilos";

export interface ColunaComInfoProps {
  titulo: string;
  dica: string;
}

/**
 * Cabecalho de coluna de tabela com icone de informacao e tooltip.
 *
 * O rotulo acessivel fica no `span` que envolve o icone: os SVGs do MUI vem
 * com `aria-hidden`, o que os tira da arvore de acessibilidade.
 */
export function ColunaComInfo({ titulo, dica }: ColunaComInfoProps) {
  return (
    <CabecalhoColunaInfo>
      {titulo}
      <Tooltip title={dica}>
        <span role="img" aria-label={dica} style={{ display: "inline-flex" }}>
          <InfoOutlinedIcon fontSize="inherit" />
        </span>
      </Tooltip>
    </CabecalhoColunaInfo>
  );
}

export default ColunaComInfo;
