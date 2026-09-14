import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Typography } from "antd";
import IlustracaoIndisponivel from "@/assets/sad-locus.svg?react";
import { CardVazio, CardVazioImagem, CardVazioTitulo } from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export interface UnidadeIndisponivelProps {
  aoAtualizar?: () => void;
}

export function UnidadeIndisponivel({ aoAtualizar }: UnidadeIndisponivelProps) {
  return (
    <CardVazio>
      <CardVazioImagem>
        <IlustracaoIndisponivel
          width={LARGURA_ILUSTRACAO}
          height={ALTURA_ILUSTRACAO}
          role="presentation"
        />
      </CardVazioImagem>
      <CardVazioTitulo>
        Esta informação não está mais disponível!
      </CardVazioTitulo>
      <Text type="secondary">
        Este UE não existe ou foi excluída por outro usuário e não pode mais ser
        editada. Atualize a página para exibir as informações mais recentes.
      </Text>
      <Button
        type="primary"
        icon={<RefreshIcon fontSize="small" />}
        onClick={aoAtualizar}
      >
        Atualizar página
      </Button>
    </CardVazio>
  );
}

export default UnidadeIndisponivel;
