import { Fragment } from "react";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import { partesDestacadas } from "@/utilitarios/formatadores";
import { partesDaSugestao } from "../utilitarios";

export interface RotuloSugestaoServidorProps {
  servidor: ServidorResumo;
  /** Texto digitado no campo; o trecho correspondente do nome fica em negrito. */
  termo: string;
}

/** "123.456.7 - **Gabriel Nascim**ento Arantes [CPF 000.000.000-00]" */
export function RotuloSugestaoServidor({
  servidor,
  termo,
}: RotuloSugestaoServidorProps) {
  const { prefixo, nome, sufixo } = partesDaSugestao(servidor);

  return (
    <>
      {prefixo}
      {partesDestacadas(nome, termo).map((parte, indice) =>
        parte.destaque ? (
          <strong key={indice}>{parte.texto}</strong>
        ) : (
          <Fragment key={indice}>{parte.texto}</Fragment>
        ),
      )}
      {sufixo}
    </>
  );
}

export default RotuloSugestaoServidor;
