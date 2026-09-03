import type { SvgIconProps } from "@mui/material/SvgIcon";
import { IconeExcluirLixeira } from "@/estilos";

export type IconeExcluirProps = SvgIconProps;

/**
 * Lixeira padrao do Locus (tabelas, menu Remocao, acoes de exclusao).
 * Usa a variante Outline para ficar alinhada aos demais icones do menu.
 * A cor herda do contexto (botao danger, item de menu, etc.).
 */
export function IconeExcluir({
  fontSize = "small",
  ...props
}: IconeExcluirProps) {
  return <IconeExcluirLixeira fontSize={fontSize} aria-hidden {...props} />;
}

export default IconeExcluir;
