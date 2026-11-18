import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import { Card, Typography } from "antd";
import type { ReactNode } from "react";
import { CardDados } from "@/componentes/CardDados";
import { GridCardsDados } from "@/estilos";
import type { EstatisticaPainel } from "@/servicos/recursos/unidadesEducacionais/tipos";

const { Title, Paragraph } = Typography;

const ICONES_ESTATISTICA: Record<string, ReactNode> = {
  modulos: <ViewModuleOutlinedIcon />,
  lotacao: <GroupsOutlinedIcon />,
  afastados: <PersonRemoveOutlinedIcon />,
  vagas: <EventSeatOutlinedIcon />,
};

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

      <GridCardsDados $colunas={4}>
        {estatisticas.map((estatistica) => (
          <CardDados
            key={estatistica.chave}
            valor={estatistica.valor}
            titulo={estatistica.rotulo}
            descricao={estatistica.legenda}
            icone={ICONES_ESTATISTICA[estatistica.chave]}
          />
        ))}
      </GridCardsDados>
    </Card>
  );
}

export default CardInformacoesUnidade;
