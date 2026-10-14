import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { RodapePrefeitura } from "./components/RodapePrefeitura";
import { useEsqueceuSenhaSucesso } from "./hooks/useEsqueceuSenhaSucesso";
import {
  AlertaLogin,
  BotaoAcessar,
  LoginCard,
  LoginFormulario,
  LoginPagina,
  LoginTitulo,
  SecaoTituloLogin,
} from "./Estilos";

export function EsqueceuSenhaSucesso() {
  const {
    loading,
    usuarioEmail,
    alertaVisivel,
    fecharAlerta,
    handleBackToLogin,
  } = useEsqueceuSenhaSucesso();

  return (
    <LoginPagina>
      <LoginCard>
        <CabecalhoLogin />

        <SecaoTituloLogin>
          <LoginTitulo>Recuperação de senha</LoginTitulo>
        </SecaoTituloLogin>

        {alertaVisivel ? (
          <AlertaLogin
            message={
              <>
                Seu link de recuperação de senha foi enviado para{" "}
                <strong>{usuarioEmail}</strong>
              </>
            }
            description="Verifique sua caixa de entrada ou lixo eletrônico."
            type="success"
            onClose={fecharAlerta}
          />
        ) : null}

        <LoginFormulario>
          <BotaoAcessar
            htmlType="button"
            onClick={handleBackToLogin}
            loading={loading}
          >
            Continuar
          </BotaoAcessar>

          <RodapePrefeitura />
        </LoginFormulario>
      </LoginCard>
    </LoginPagina>
  );
}

export default EsqueceuSenhaSucesso;
