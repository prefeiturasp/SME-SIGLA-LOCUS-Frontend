import styled from "styled-components";
import { GridCardsDados } from "@/estilos";

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
