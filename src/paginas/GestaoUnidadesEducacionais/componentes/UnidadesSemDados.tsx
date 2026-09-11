import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Typography } from "antd";
import IlustracaoSemUnidades from "@/assets/sad-locus.svg?react";
import { CardVazio, CardVazioImagem, CardVazioTitulo } from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export interface UnidadesSemDadosProps {
  aoRegistrar?: () => void;
}

export function UnidadesSemDados({ aoRegistrar }: UnidadesSemDadosProps) {
  return (
    <CardVazio>
      <CardVazioImagem>
        <IlustracaoSemUnidades
          width={LARGURA_ILUSTRACAO}
          height={ALTURA_ILUSTRACAO}
          role="presentation"
        />
      </CardVazioImagem>
      <CardVazioTitulo>
        Não há unidades educacionais cadastradas
      </CardVazioTitulo>
      <Text type="secondary">Que tal registrar a primeira UE agora?</Text>
      <Button
        type="primary"
        icon={<AddRoundedIcon fontSize="small" />}
        onClick={aoRegistrar}
      >
        Registrar UE
      </Button>
    </CardVazio>
  );
}

export default UnidadesSemDados;
