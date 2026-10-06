import { Alert, Collapse, Divider, Form, Segmented } from "antd";
import styled, { css } from "styled-components";
import { CardTituloIcone } from "@/estilos";

export const IdentidadeServidor = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const LinhaNome = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const DivisorCard = styled(Divider)`
  margin: ${({ theme }) => theme.spacing.md}px 0;
`;

export const CampoIdentificacao = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const RotuloCampo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ValorCampo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const IconeDestaque = styled(CardTituloIcone)<{ $alerta?: boolean }>`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  & svg {
    width: 22px;
    height: 22px;
  }

  ${({ $alerta, theme }) =>
    $alerta &&
    css`
      background: ${theme.colors.errorBackground};
      color: ${theme.colors.error};
    `}
`;

export const RotuloSecao = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  min-width: 0;
`;

export const TextosSecao = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
`;

export const BlocoInformacoes = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const InformacoesCadastroSecoes = styled(Collapse)`
  background: transparent;

  .ant-collapse-item {
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.layout.radius}px !important;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.layout.cardShadow};
  }

  .ant-collapse-item:last-child {
    margin-bottom: 0;
  }

  .ant-collapse-header {
    align-items: center !important;
    padding: ${({ theme }) => theme.spacing.md}px !important;
    background: ${({ theme }) => theme.colors.white};
  }

  .ant-collapse-header-text {
    flex: 1;
    min-width: 0;
  }

  .ant-collapse-expand-icon {
    color: ${({ theme }) => theme.colors.secondaryText};
    transform: none !important;
  }

  .ant-collapse-expand-icon svg {
    transition: transform 0.2s;
  }

  .ant-collapse-item-active .ant-collapse-expand-icon svg {
    transform: rotate(180deg);
  }

  .ant-collapse-content {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.white};
  }

  .ant-collapse-content-box {
    padding: ${({ theme }) => theme.spacing.md}px !important;
  }
`;

export const TituloGrupo = styled.h3`
  margin: ${({ theme }) => theme.spacing.lg}px 0
    ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};

  &:first-child {
    margin-top: 0;
  }
`;

export const AlternadorUnidade = styled(Segmented)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  background: ${({ theme }) => theme.colors.completeBackground};

  .ant-segmented-item {
    flex: 1;
  }

  .ant-segmented-item-label {
    font-weight: 600;
  }

  .ant-segmented-item:not(.ant-segmented-item-selected) {
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

export const RealocadoSecao = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
  min-height: ${({ theme }) => theme.layout.controlHeight}px;
`;

/** Faixa rosa do encerramento. Não há alerta desse tipo no estilo compartilhado. */
export const AvisoVacancia = styled(Alert)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.errorBackground};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.errorBackground};

  .ant-alert-message,
  .ant-alert-icon {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const FormularioRegistrarAtualizacao = styled(Form)`
  .ant-picker {
    width: 100%;
  }

  textarea.ant-input {
    resize: none;
  }

  .ant-form-item:last-child {
    margin-bottom: 0;
  }
`;
