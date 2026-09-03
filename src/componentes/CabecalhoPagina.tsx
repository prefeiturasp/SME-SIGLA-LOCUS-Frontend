import type { ReactNode } from "react";
import { PaginaAcoes, PaginaCabecalho, PaginaTitulo } from "@/estilos";

export interface CabecalhoPaginaProps {
  titulo: string;
  /** Botoes / acoes exibidos a direita do titulo. */
  acoes?: ReactNode;
}

/**
 * Cabecalho padrao de pagina: titulo a esquerda, area de acoes a direita.
 */
export function CabecalhoPagina({ titulo, acoes }: CabecalhoPaginaProps) {
  return (
    <PaginaCabecalho>
      <PaginaTitulo>{titulo}</PaginaTitulo>
      {acoes ? <PaginaAcoes>{acoes}</PaginaAcoes> : null}
    </PaginaCabecalho>
  );
}

export default CabecalhoPagina;
