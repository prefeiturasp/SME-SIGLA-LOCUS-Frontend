import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Typography } from "antd";
import styled from "styled-components";
import IlustracaoSemUnidades from "@/assets/ilustracao-sem-unidades.svg?react";

const { Text } = Typography;

const LARGURA_BOTAO = 150;
const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Ilustracao = styled(IlustracaoSemUnidades)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Titulo = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSizeSubtitle}px;
  font-weight: 700;
`;

const BotaoRegistrarUE = styled(Button)`
  width: ${LARGURA_BOTAO}px;
  height: ${({ theme }) => theme.layout.controlHeight}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export interface UnidadesSemDadosProps {
  /** Acionado pelo botao "Registrar UE". */
  aoRegistrar?: () => void;
}

/**
 * Estado vazio da listagem de unidades educacionais.
 *
 * Exibido no lugar das linhas da tabela quando nenhuma UE esta cadastrada,
 * convidando o usuario a registrar a primeira.
 */
export function UnidadesSemDados({ aoRegistrar }: UnidadesSemDadosProps) {
  return (
    <Container>
      <Ilustracao
        width={LARGURA_ILUSTRACAO}
        height={ALTURA_ILUSTRACAO}
        role="presentation"
      />
      <Titulo>Não há unidades educacionais cadastradas</Titulo>
      <Text type="secondary">Que tal registrar a primeira UE agora?</Text>
      <BotaoRegistrarUE
        type="primary"
        icon={<AddRoundedIcon fontSize="small" />}
        onClick={aoRegistrar}
      >
        Registrar UE
      </BotaoRegistrarUE>
    </Container>
  );
}

export default UnidadesSemDados;
