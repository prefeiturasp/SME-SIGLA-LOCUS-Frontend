import { ChipNumero, NumeroSimples } from "@/estilos";
import { formatarNumeroPadded } from "@/utilitarios/formatadores";

export interface ChipNumeroClicavelProps {
  valor: number;
  /** Descreve a acao para leitores de tela, ex.: "Ver lotação de Arte". */
  rotuloAcessivel: string;
  /** Ausente (ou valor zero) renderiza apenas o numero, sem interacao. */
  aoClicar?: () => void;
}

/**
 * Numero clicavel das colunas Lotacao e Afastados.
 *
 * Valor zero nao abre painel — o mockup mostra apenas "0" sem borda.
 */
export function ChipNumeroClicavel({
  valor,
  rotuloAcessivel,
  aoClicar,
}: ChipNumeroClicavelProps) {
  if (valor === 0 || !aoClicar) {
    return <NumeroSimples>{valor}</NumeroSimples>;
  }

  return (
    <ChipNumero type="button" aria-label={rotuloAcessivel} onClick={aoClicar}>
      {formatarNumeroPadded(valor)}
    </ChipNumero>
  );
}

export default ChipNumeroClicavel;
