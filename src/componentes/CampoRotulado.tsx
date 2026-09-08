import type { ReactNode } from "react";
import { CampoRotuladoLabel, CampoRotuladoRaiz } from "@/estilos";

export interface CampoRotuladoProps {
  /** Deve ser o mesmo `id` do controle em `children`. */
  id: string;
  rotulo: string;
  largura?: number;
  children: ReactNode;
}

/** Rotulo em negrito acima de um controle de formulario. */
export function CampoRotulado({
  id,
  rotulo,
  largura,
  children,
}: CampoRotuladoProps) {
  return (
    <CampoRotuladoRaiz $largura={largura}>
      <CampoRotuladoLabel htmlFor={id}>{rotulo}</CampoRotuladoLabel>
      {children}
    </CampoRotuladoRaiz>
  );
}

export default CampoRotulado;
