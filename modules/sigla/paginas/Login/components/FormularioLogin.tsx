import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { CampoFormulario, InputForm, InputSenhaForm, LabelCampo } from "@sigla/estilos";
import { CAMINHOS } from "@sigla/rotas/caminhos";
import { useLogin } from "../hooks/useLogin";
import {
  AlertaLogin,
  BotaoAcessar,
  LinkEsqueciSenha,
  LoginConteudoForm,
  LoginFormulario,
  MensagemErro,
} from "../Estilos";
import { RodapePrefeitura } from "./RodapePrefeitura";

export function FormularioLogin() {
  const navigate = useNavigate();
  const { loading, alert, fecharAlerta, control, handleSubmit, errors } =
    useLogin();

  return (
    <LoginFormulario onSubmit={handleSubmit}>
      <LoginConteudoForm>
        {alert ? (
          <AlertaLogin
            message={alert.message}
            description={alert.description}
            type={alert.type}
            onClose={fecharAlerta}
            icon={alert.type === "error" ? <CloseCircleOutlined /> : undefined}
            $iconeContorno={alert.type === "error"}
            $fundoErro={alert.type === "error"}
            $tituloComoDescricao={Boolean(alert.description)}
          />
        ) : null}

        <CampoFormulario>
          <LabelCampo htmlFor="usuario">Registro funcional (RF)</LabelCampo>
          <Controller
            name="usuario"
            control={control}
            render={({ field }) => (
              <InputForm
                {...field}
                id="usuario"
                placeholder="Digite o RF"
                autoComplete="username"
                status={errors.usuario ? "error" : undefined}
              />
            )}
          />
          {errors.usuario ? (
            <MensagemErro>{errors.usuario.message}</MensagemErro>
          ) : null}
        </CampoFormulario>

        <CampoFormulario>
          <LabelCampo htmlFor="senha">Senha</LabelCampo>
          <Controller
            name="senha"
            control={control}
            render={({ field }) => (
              <InputSenhaForm
                {...field}
                id="senha"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                status={errors.senha ? "error" : undefined}
              />
            )}
          />
          {errors.senha ? (
            <MensagemErro>{errors.senha.message}</MensagemErro>
          ) : null}
        </CampoFormulario>

        <BotaoAcessar loading={loading}>Acessar</BotaoAcessar>

        <LinkEsqueciSenha
          type="button"
          onClick={() => navigate(CAMINHOS.esqueciSenha)}
        >
          Esqueci minha senha
        </LinkEsqueciSenha>

        <RodapePrefeitura perto />
      </LoginConteudoForm>
    </LoginFormulario>
  );
}

export default FormularioLogin;
