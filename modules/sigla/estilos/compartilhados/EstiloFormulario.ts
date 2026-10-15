import { Form, Input } from "antd";
import styled from "styled-components";

const { Password } = Input;

/** Label padrao acima do campo. */
export const LabelCampo = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.labelText};
`;

/** Input de texto reutilizavel (RF, CPF, busca, etc.). */
export const InputForm = styled(Input)`
  width: 100%;
  min-width: 0;

  &.ant-input-status-error,
  &.ant-input-status-error:hover,
  &.ant-input-status-error:focus {
    border-color: ${({ theme }) => theme.colors.error} !important;
  }
`;

/** Input de senha reutilizavel. */
export const InputSenhaForm = styled(Password)`
  width: 100%;
  min-width: 0;

  &.ant-input-affix-wrapper-status-error,
  &.ant-input-affix-wrapper-status-error:hover,
  &.ant-input-affix-wrapper-status-error:focus,
  &.ant-input-affix-wrapper-status-error-focused {
    border-color: ${({ theme }) => theme.colors.error} !important;
  }
`;

/** Form.Item alinhado ao padrao do sistema. */
export const FormItem = styled(Form.Item)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  .ant-form-item-label {
    padding-bottom: ${({ theme }) => theme.spacing.sm}px;

    > label {
      font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
      color: ${({ theme }) => theme.colors.labelText};
      height: auto;
    }
  }
`;

/** Agrupa label + campo quando nao se usa Form.Item do antd. */
export const CampoFormulario = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;
