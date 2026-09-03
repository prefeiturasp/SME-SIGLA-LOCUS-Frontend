import type { ReactNode } from "react";
import {
  StatCartao,
  StatIcone,
  StatLegenda,
  StatLinhaRotulo,
  StatRotulo,
  StatValor,
} from "@/estilos";

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
    <StatCartao>
      <StatValor>{valor}</StatValor>
      <StatLinhaRotulo>
        <StatIcone aria-hidden>{icone}</StatIcone>
        <StatRotulo>{rotulo}</StatRotulo>
      </StatLinhaRotulo>
      <StatLegenda>{legenda}</StatLegenda>
    </StatCartao>
  );
}

export default CartaoStat;
