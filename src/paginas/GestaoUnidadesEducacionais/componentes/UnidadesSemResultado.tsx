import { Typography } from "antd";
import IlustracaoSemResultado from "@/assets/sad-locus.svg?react";
import { CardVazio, CardVazioImagem, CardVazioTitulo } from "@/estilos";

const { Text } = Typography;

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export function UnidadesSemResultado() {
  return (
    <CardVazio>
      <CardVazioImagem>
        <IlustracaoSemResultado
          width={LARGURA_ILUSTRACAO}
          height={ALTURA_ILUSTRACAO}
          role="presentation"
        />
      </CardVazioImagem>
      <CardVazioTitulo>Não encontramos dados para esta busca</CardVazioTitulo>
      <Text type="secondary">
        Experimente remover alguns filtros ou selecionar outros critérios de
        busca.
      </Text>
    </CardVazio>
  );
}

export default UnidadesSemResultado;
