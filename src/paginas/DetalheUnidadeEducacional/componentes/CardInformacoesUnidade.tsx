import { Card, Typography } from "antd";
import { CartaoStat } from "@/componentes/CartaoStat";
import { iconeDaEstatistica } from "@/componentes/iconesEstatistica";
import { GradeCartoesStat } from "@/estilos";
import type { EstatisticaPainel } from "@/servicos/recursos/unidadesEducacionais/tipos";

const { Title, Paragraph } = Typography;

export interface CardInformacoesUnidadeProps {
  estatisticas: EstatisticaPainel[];
}

export function CardInformacoesUnidade({
  estatisticas,
}: CardInformacoesUnidadeProps) {
  return (
    <Card>
      <Title level={4} style={{ marginTop: 0 }}>
        Informações da unidade educacional
      </Title>
      <Paragraph>
        Quadro de professores. Compare o módulo previsto com quem está lotado e
        a quantidade de afastados dentro da unidade educacional.
      </Paragraph>

      <GradeCartoesStat $colunas={4}>
        {estatisticas.map((estatistica) => (
          <CartaoStat
            key={estatistica.chave}
            valor={estatistica.valor}
            rotulo={estatistica.rotulo}
            legenda={estatistica.legenda}
            icone={iconeDaEstatistica(estatistica.chave)}
          />
        ))}
      </GradeCartoesStat>
    </Card>
  );
}

export default CardInformacoesUnidade;
