import type { ReactNode } from "react";
import { PaginaAcoes, PaginaCabecalho, PaginaTitulo } from "@/estilos";

export interface CabecalhoPaginaProps {
  titulo: string;
  acoes?: ReactNode;
}

export function CabecalhoPagina({ titulo, acoes }: CabecalhoPaginaProps) {
  return (
    <PaginaCabecalho>
      <PaginaTitulo>{titulo}</PaginaTitulo>
      {acoes ? <PaginaAcoes>{acoes}</PaginaAcoes> : null}
    </PaginaCabecalho>
  );
}

export default CabecalhoPagina;
