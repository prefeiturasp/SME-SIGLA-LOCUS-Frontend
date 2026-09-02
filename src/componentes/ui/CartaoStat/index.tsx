import type { ReactNode } from "react";
import estilos from "./estilos.module.css";

export interface CartaoStatProps {
  valor: number | string;
  rotulo: string;
  legenda: string;
  icone: ReactNode;
}

/**
 * Cartao de estatistica do "Painel de informações por componente curricular":
 * numero em destaque, icone + rotulo, e uma legenda auxiliar.
 */
export function CartaoStat({ valor, rotulo, legenda, icone }: CartaoStatProps) {
  return (
    <div className={estilos.cartao}>
      <span className={estilos.valor}>{valor}</span>
      <div className={estilos.linhaRotulo}>
        <span className={estilos.icone} aria-hidden>
          {icone}
        </span>
        <span className={estilos.rotulo}>{rotulo}</span>
      </div>
      <span className={estilos.legenda}>{legenda}</span>
    </div>
  );
}

export default CartaoStat;
