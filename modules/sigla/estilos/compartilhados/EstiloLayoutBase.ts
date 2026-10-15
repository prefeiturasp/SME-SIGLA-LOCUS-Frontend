import { Layout } from "antd";
import styled from "styled-components";

const { Header: AntHeader, Content: AntContent, Footer: AntFooter } = Layout;

export const LayoutRaiz = styled(Layout)`
  min-height: 100vh;
`;

export const LayoutCorpo = styled(Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const LayoutHeader = styled(AntHeader)`
  padding: 0;
`;

export const LayoutConteudo = styled(AntContent)`
  flex: 1;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.appBackground};
`;

export const LayoutConteudoInterno = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const LayoutFooter = styled(AntFooter)`
  padding: 0;
`;
