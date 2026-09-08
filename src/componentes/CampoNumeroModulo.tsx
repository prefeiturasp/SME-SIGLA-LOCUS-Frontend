import { CampoNumeroEstilizado } from "@/estilos";
import { formatarNumeroPadded } from "@/utilitarios/formatadores";

export interface CampoNumeroModuloProps {
  valor: number;
  rotuloAcessivel: string;
  minimo?: number;
  maximo?: number;
  desabilitado?: boolean;
  aoAlterar: (valor: number) => void;
}

/**
 * Campo numerico com spinner da coluna Modulo.
 *
 * Exibe o valor com zero a esquerda ("03") sem deixar de operar sobre numeros:
 * o par formatter/parser cuida da conversao.
 */
export function CampoNumeroModulo({
  valor,
  rotuloAcessivel,
  minimo = 0,
  maximo = 999,
  desabilitado = false,
  aoAlterar,
}: CampoNumeroModuloProps) {
  return (
    <CampoNumeroEstilizado
      value={valor}
      min={minimo}
      max={maximo}
      precision={0}
      disabled={desabilitado}
      aria-label={rotuloAcessivel}
      formatter={(v) =>
        v === undefined || v === "" ? "" : formatarNumeroPadded(Number(v))
      }
      parser={(v) => Number((v ?? "").replace(/\D/g, "")) || minimo}
      onChange={(v) => aoAlterar(typeof v === "number" ? v : minimo)}
    />
  );
}

export default CampoNumeroModulo;
