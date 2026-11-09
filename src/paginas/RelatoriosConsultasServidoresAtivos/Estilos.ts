import { Alert, DatePicker, Typography } from "antd";
import styled from "styled-components";
import { GridCardsDados } from "@/estilos";

const { Title } = Typography;

export const ListaSecoesDetalhes = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const SecaoDetalhes = styled.section`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.white};
`;

export const CabecalhoSecaoDetalhes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBorder};
  background: ${({ theme }) => theme.colors.blueBackground};
`;

export const DescricaoSecaoDetalhes = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const CamposSecaoDetalhes = styled(GridCardsDados)`
  row-gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
`;

export const CampoDetalhe = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
`;

export const RotuloCampoDetalhe = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ValorCampoDetalhe = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const TituloFiltroServidores = styled(Title).attrs({ level: 4 })`
  margin-top: 0;
`;

export const DatePickerFiltro = styled(DatePicker)`
  width: 100%;
`;

export const AlertaErroFiltro = styled(Alert)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.errorBackground};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.errorBackground};

  .ant-alert-message,
  .ant-alert-icon {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const TabelaServidores = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg}px;

  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.colors.blueBackground};
    font-weight: 700;
  }

  .ant-pagination-options {
    position: absolute;
    inset-inline-end: 0;
  }
`;

export const TituloSeletorColunas = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ListaColunasSeletor = styled.div`
  display: flex;
  min-width: 280px;
  max-height: 360px;
  flex-direction: column;
  overflow: auto;
`;

export const ItemColunaSeletor = styled.div`
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;

  &:nth-child(odd) {
    background: ${({ theme }) => theme.colors.blueBackgroundSoft};
  }
`;