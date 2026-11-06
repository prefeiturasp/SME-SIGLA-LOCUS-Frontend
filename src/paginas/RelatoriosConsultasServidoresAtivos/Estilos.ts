import { Alert, DatePicker, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

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
