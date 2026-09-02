import type { ReactNode } from "react";
import estilos from "./estilos.module.css";

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
    <div className={estilos.cabecalho}>
      <h1 className={estilos.titulo}>{titulo}</h1>
      {acoes ? <div className={estilos.acoes}>{acoes}</div> : null}
    </div>
  );
}

export default CabecalhoPagina;
