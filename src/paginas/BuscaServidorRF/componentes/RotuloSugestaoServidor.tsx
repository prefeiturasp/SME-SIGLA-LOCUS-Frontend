import { Fragment } from "react";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import {
  partesDestacadas,
  partesDestacadasPorDigitos,
  type ParteTexto,
} from "@/utilitarios/formatadores";
import { partesDaSugestao, type TrechoSugestao } from "../utilitarios";

export interface RotuloSugestaoServidorProps {
  servidor: ServidorResumo;
  termo: string;
}

function partesDoTrecho(
  { texto, destaque }: TrechoSugestao,
  termo: string,
): ParteTexto[] {
  if (destaque === "nome") return partesDestacadas(texto, termo);
  if (destaque === "digitos") return partesDestacadasPorDigitos(texto, termo);
  return [{ texto, destaque: false }];
}

export function RotuloSugestaoServidor({
  servidor,
  termo,
}: RotuloSugestaoServidorProps) {
  const partes = partesDaSugestao(servidor).flatMap((trecho) =>
    partesDoTrecho(trecho, termo),
  );

  return (
    <>
      {partes.map((parte, indice) =>
        parte.destaque ? (
          <strong key={indice}>{parte.texto}</strong>
        ) : (
          <Fragment key={indice}>{parte.texto}</Fragment>
        ),
      )}
    </>
  );
}

export default RotuloSugestaoServidor;
