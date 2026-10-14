import { AvisoImportante, AvisoTexto, AvisoTitulo } from "../Estilos";

export function AvisoImportanteLogin() {
  return (
    <AvisoImportante>
      <AvisoTitulo>Importante: </AvisoTitulo>
      <AvisoTexto>
        Ao alterar a sua senha, ela se tornará padrão e será utilizada para
        acessar todos os sistemas da SME aos quais você já possui acesso.
      </AvisoTexto>
    </AvisoImportante>
  );
}

export default AvisoImportanteLogin;
