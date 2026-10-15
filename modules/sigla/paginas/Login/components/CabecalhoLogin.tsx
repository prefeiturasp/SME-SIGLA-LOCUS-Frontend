import { LogoSigla } from "@sigla/componentes/LogoSigla";
import { LoginCabecalho, LoginSubtitulo, LoginTitulo } from "../Estilos";

type CabecalhoLoginProps = {
  titulo?: string;
  subtitulo?: string;
};

export function CabecalhoLogin({ titulo, subtitulo }: CabecalhoLoginProps) {
  const subtituloExibido =
    subtitulo ??
    (titulo ? undefined : "Sistema Integrado de Gestão de Lotação e Alocação");

  return (
    <LoginCabecalho>
      {titulo ? <LoginTitulo>{titulo}</LoginTitulo> : <LogoSigla />}
      {subtituloExibido ? (
        <LoginSubtitulo>{subtituloExibido}</LoginSubtitulo>
      ) : null}
    </LoginCabecalho>
  );
}

export default CabecalhoLogin;
