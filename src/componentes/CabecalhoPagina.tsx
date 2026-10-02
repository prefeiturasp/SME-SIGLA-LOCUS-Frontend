import type { ReactNode } from "react";
import {
  PaginaAcoes,
  PaginaCabecalho,
  PaginaDescricao,
  PaginaSubtitulo,
  PaginaTextos,
  PaginaTitulo,
} from "@/estilos";

export interface CabecalhoPaginaProps {
  titulo: string;
  subtitulo?: ReactNode;
  /** Texto de apoio abaixo do titulo, na cor do texto principal. */
  descricao?: ReactNode;
  acoes?: ReactNode;
}

export function CabecalhoPagina({
  titulo,
  subtitulo,
  descricao,
  acoes,
}: CabecalhoPaginaProps) {
  return (
    <PaginaCabecalho>
      <PaginaTextos>
        <PaginaTitulo>{titulo}</PaginaTitulo>
        {subtitulo ? <PaginaSubtitulo>{subtitulo}</PaginaSubtitulo> : null}
        {descricao ? <PaginaDescricao>{descricao}</PaginaDescricao> : null}
      </PaginaTextos>
      {acoes ? <PaginaAcoes>{acoes}</PaginaAcoes> : null}
    </PaginaCabecalho>
  );
}

export default CabecalhoPagina;
