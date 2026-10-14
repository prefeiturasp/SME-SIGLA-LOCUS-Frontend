import { Alert, Button } from "antd";
import styled from "styled-components";
import fundoLogin from "@sigla/assets/fundo_login.png";

export const LoginPagina = styled.div`
  position: relative;
  display: flex;
  align-items: safe center;
  justify-content: flex-end;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xl * 2}px
    ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xl}px;
  overflow: auto;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        ${({ theme }) => theme.colors.loginOverlay},
        ${({ theme }) => theme.colors.loginOverlay}
      ),
      url(${fundoLogin}) center / cover no-repeat;
    z-index: 0;
  }
`;

export const LoginCard = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38%;
  height: ${({ theme }) => theme.layout.loginCardHeight}px;
  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.layout.radiusCard}px;
  box-shadow: ${({ theme }) => theme.layout.cardShadow};
`;

export const LoginPaginaLateral = styled(LoginPagina)`
  align-items: stretch;
  height: 100vh;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
`;

export const PainelLateralLogin = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg}px 80px
    ${({ theme }) => theme.spacing.lg}px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};

  > *:first-child {
    margin-top: ${({ theme }) => theme.spacing.xl}px;
  }

  h1 {
    font-size: 20px;
    color: #1c1d22;
  }

  p,
  label {
    font-size: 14px;
    color: #1c1d22;
  }

  li {
    font-size: 14px;
  }

  form {
    flex: none;
    min-height: auto;
    overflow: visible;
  }

  form > *:last-child {
    margin-top: 48px;
  }
`;

export const LoginCabecalho = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xl + theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
`;

export const LoginTitulo = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizeTitle}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightTitle};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const LoginSubtitulo = styled.p`
  margin: 0;
  max-width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 400;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

/** Titulo + texto de apoio abaixo do logo, alinhados a esquerda. */
export const SecaoTituloLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  text-align: left;
`;

export const LoginFormulario = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;

export const LoginConteudoForm = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  width: 100%;
`;

/** Bloco que acompanha o conteúdo: cresce com o alerta e deixa o rodapé logo abaixo. */
export const LoginBlocoForm = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 100%;
`;

export const LoginRodape = styled.div<{
  $solto?: boolean;
  $compacto?: boolean;
  $perto?: boolean;
}>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin-top: ${({ $solto, $compacto, $perto, theme }) => {
    if ($perto) return "60px";
    if (!$solto) return "auto";
    return $compacto ? `${theme.spacing.sm}px` : `${theme.spacing.xl}px`;
  }};
  padding-top: ${({ $compacto, $perto, theme }) => {
    if ($perto) return "0";
    return $compacto ? "20px" : `${theme.spacing.md}px`;
  }};
  padding-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const BotaoAcessar = styled(Button).attrs({
  type: "primary",
  htmlType: "submit",
  block: true,
})`
  flex-shrink: 0;
  height: ${({ theme }) => theme.layout.controlHeight}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 600;
`;

export const LinkEsqueciSenha = styled.button`
  display: block;
  flex-shrink: 0;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding: 0;
  border: none;
  background: none;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.link};
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;

export const LogoPrefeitura = styled.img`
  display: block;
  width: auto;
  max-width: 180px;
  height: auto;
`;

export const MensagemErro = styled.p`
  margin: ${({ theme }) => theme.spacing.xs}px 0 0;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.error};
`;

export const AlertaLogin = styled(Alert).attrs({
  showIcon: true,
  closable: true,
})<{
  $tituloComoDescricao?: boolean;
  $iconeContorno?: boolean;
  $semBorda?: boolean;
  $fundoErro?: boolean;
}>`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  ${({ $semBorda }) =>
    $semBorda
      ? `
    &,
    &.ant-alert-error {
      border-color: transparent;
    }
  `
      : ""}

  ${({ $iconeContorno, theme }) =>
    $iconeContorno
      ? `
    .ant-alert-icon {
      color: ${theme.colors.error};
    }
  `
      : ""}

  ${({ $fundoErro }) =>
    $fundoErro
      ? `
    &.ant-alert-error {
      background: #b40c311a;
      border-color: transparent;
    }
  `
      : ""}

  ${({ $tituloComoDescricao, theme }) =>
    $tituloComoDescricao
      ? `
    .ant-alert-message,
    &.ant-alert-with-description .ant-alert-message {
      font-size: ${theme.typography.fontSizeBase}px;
      font-weight: 700;
      line-height: 1.5;
    }

    .ant-alert-description,
    &.ant-alert-with-description .ant-alert-description {
      font-size: ${theme.typography.fontSizeBase}px;
    }
  `
      : ""}
`;

export const BotaoVoltar = styled(Button).attrs({
  block: true,
})`
  flex-shrink: 0;
  height: ${({ theme }) => theme.layout.controlHeight}px;
  min-height: ${({ theme }) => theme.layout.controlHeight}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const AvisoImportante = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.stripedBackground};
`;

export const AvisoTitulo = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const AvisoTexto = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ListaRequisitos = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  padding: 0;
  list-style: none;
`;

export const TituloRequisitos = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ItemRequisito = styled.li<{
  $atendido: boolean;
  $avaliado: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  color: ${({ $atendido, $avaliado, theme }) => {
    if (!$avaliado) return theme.colors.primaryText;
    return $atendido ? theme.colors.success : theme.colors.error;
  }};
`;
