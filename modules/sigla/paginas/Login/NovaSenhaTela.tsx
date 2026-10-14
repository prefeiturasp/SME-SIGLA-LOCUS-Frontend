import { CheckCircleFilled } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import { CampoFormulario, InputSenhaForm, LabelCampo } from "@sigla/estilos";
import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { RodapePrefeitura } from "./components/RodapePrefeitura";
import { useNovaSenha } from "./hooks/useNovaSenha";
import {
  AlertaLogin,
  BotaoAcessar,
  BotaoVoltar,
  ItemRequisito,
  ListaRequisitos,
  LoginFormulario,
  LoginPaginaLateral,
  LoginSubtitulo,
  LoginTitulo,
  MensagemErro,
  PainelLateralLogin,
  SecaoTituloLogin,
  TituloRequisitos,
} from "./Estilos";

export function NovaSenhaTela() {
  const {
    loading,
    alert,
    fecharAlerta,
    control,
    handleSubmit,
    errors,
    hasMinLength,
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    hasNoSpaces,
    hasNoAccents,
    avaliarRequisitos,
    handleCancel,
  } = useNovaSenha();

  return (
    <LoginPaginaLateral>
      <PainelLateralLogin>
        <CabecalhoLogin />

        <SecaoTituloLogin>
          <LoginTitulo>Crie uma nova senha</LoginTitulo>
          <LoginSubtitulo>
            Esta será sua nova senha de acesso ao Sigla.
          </LoginSubtitulo>
        </SecaoTituloLogin>

        {alert ? (
          <AlertaLogin
            message={alert.message}
            type={alert.type}
            onClose={fecharAlerta}
          />
        ) : null}

        <LoginFormulario onSubmit={handleSubmit}>
          <CampoFormulario>
            <LabelCampo htmlFor="nova_senha">Nova senha</LabelCampo>
            <Controller
              name="nova_senha"
              control={control}
              render={({ field }) => (
                <InputSenhaForm
                  {...field}
                  id="nova_senha"
                  placeholder="Digite sua senha"
                  status={errors.nova_senha ? "error" : undefined}
                />
              )}
            />
            {errors.nova_senha ? (
              <MensagemErro>{errors.nova_senha.message}</MensagemErro>
            ) : null}
          </CampoFormulario>

          <ListaRequisitos>
            <TituloRequisitos>
              Por questões de segurança, a senha deve seguir os seguintes
              critérios:
            </TituloRequisitos>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasLowerCase}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Ao menos uma letra minúscula</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasUpperCase}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Ao menos uma letra maiúscula</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasMinLength}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Entre 8 e 12 caracteres</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasNumber}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Ao menos um caracter numérico</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasSpecialChar}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Ao menos um caracter especial (#$@!%&*?)</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasNoSpaces}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Não deve conter espaços em branco</span>
            </ItemRequisito>
            <ItemRequisito $avaliado={avaliarRequisitos} $atendido={hasNoAccents}>
              {avaliarRequisitos ? <CheckCircleFilled /> : null}
              <span>Não deve conter caracteres acentuados</span>
            </ItemRequisito>
          </ListaRequisitos>

          <CampoFormulario>
            <LabelCampo htmlFor="confirmar_senha">
              Confirmação da nova senha
            </LabelCampo>
            <Controller
              name="confirmar_senha"
              control={control}
              render={({ field }) => (
                <InputSenhaForm
                  {...field}
                  id="confirmar_senha"
                  placeholder="Digite sua senha"
                  status={errors.confirmar_senha ? "error" : undefined}
                />
              )}
            />
            {errors.confirmar_senha ? (
              <MensagemErro>{errors.confirmar_senha.message}</MensagemErro>
            ) : null}
          </CampoFormulario>

          {/* <AvisoImportanteLogin /> */}

          <BotaoAcessar loading={loading}>Salvar senha</BotaoAcessar>

          <BotaoVoltar onClick={handleCancel}>Cancelar</BotaoVoltar>

          <RodapePrefeitura />
        </LoginFormulario>
      </PainelLateralLogin>
    </LoginPaginaLateral>
  );
}

export default NovaSenhaTela;
