import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Typography } from "antd";
import IlustracaoSemUnidades from "@/assets/sad-locus.svg?react";
import {
  EstadoVazioBotao,
  EstadoVazioContainer,
  EstadoVazioIlustracao,
  EstadoVazioTitulo,
} from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export interface UnidadesSemDadosProps {
  aoRegistrar?: () => void;
}

export function UnidadesSemDados({ aoRegistrar }: UnidadesSemDadosProps) {
  return (
    <EstadoVazioContainer>
      <EstadoVazioIlustracao>
        <IlustracaoSemUnidades
          width={LARGURA_ILUSTRACAO}
          height={ALTURA_ILUSTRACAO}
          role="presentation"
        />
      </EstadoVazioIlustracao>
      <EstadoVazioTitulo>
        Não há unidades educacionais cadastradas
      </EstadoVazioTitulo>
      <Text type="secondary">Que tal registrar a primeira UE agora?</Text>
      <EstadoVazioBotao
        type="primary"
        icon={<AddRoundedIcon fontSize="small" />}
        onClick={aoRegistrar}
      >
        Registrar UE
      </EstadoVazioBotao>
    </EstadoVazioContainer>
  );
}

export default UnidadesSemDados;
