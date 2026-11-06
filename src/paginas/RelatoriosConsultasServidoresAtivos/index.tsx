import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ConteudoPagina } from "@/estilos";
import { CardFormFiltrosServidores } from "./componentes/CardFormFiltrosServidores";

export function ServidoresAtivos() {
  return (
    <>
      <CabecalhoPagina titulo="Banco de servidores" />
      <ConteudoPagina>
        <CardFormFiltrosServidores />
      </ConteudoPagina>
    </>
  );
}

export default ServidoresAtivos;
