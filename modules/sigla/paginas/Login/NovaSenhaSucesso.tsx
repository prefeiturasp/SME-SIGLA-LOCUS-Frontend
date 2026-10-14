import { useNavigate } from "react-router-dom";
import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { RodapePrefeitura } from "./components/RodapePrefeitura";
import { CAMINHOS } from "@sigla/rotas/caminhos";
import {
  AlertaLogin,
  BotaoAcessar,
  LoginFormulario,
  LoginPaginaLateral,
  LoginTitulo,
  PainelLateralLogin,
  SecaoTituloLogin,
} from "./Estilos";

export function NovaSenhaSucesso() {
  const navigate = useNavigate();

  return (
    <LoginPaginaLateral>
      <PainelLateralLogin>
        <CabecalhoLogin />

        <SecaoTituloLogin>
          <LoginTitulo>Recuperação de senha</LoginTitulo>
        </SecaoTituloLogin>

        <AlertaLogin
          message="Você já pode acessar o Sigla com sua nova senha."
          type="success"
          closable={false}
        />

        <LoginFormulario>
          <BotaoAcessar
            htmlType="button"
            onClick={() => navigate(CAMINHOS.login)}
          >
            Acessar agora
          </BotaoAcessar>
        </LoginFormulario>

        <RodapePrefeitura />
      </PainelLateralLogin>
    </LoginPaginaLateral>
  );
}

export default NovaSenhaSucesso;
