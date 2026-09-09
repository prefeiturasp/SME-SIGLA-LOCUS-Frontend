import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import { Card, Typography } from "antd";
import { CardDados } from "@/componentes/CardDados";
import { GradeCartoesStat } from "@/estilos";
import type { EstatisticaPainel } from "@/tipos/unidadesEducacionais";

const { Title, Paragraph } = Typography;

export interface CardInformacoesUnidadeProps {
  estatisticas: EstatisticaPainel[];
}

export function CardInformacoesUnidade({
  estatisticas,
}: CardInformacoesUnidadeProps) {
  const modulos = estatisticas.find((item) => item.chave === "modulos");
  const lotacao = estatisticas.find((item) => item.chave === "lotacao");
  const afastados = estatisticas.find((item) => item.chave === "afastados");
  const vagas = estatisticas.find((item) => item.chave === "vagas");

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
        <CardDados
          valor="105"
          titulo="Módulos"
          descricao="Quantidade de vagas disponibilizadas"
          icone={<ViewModuleOutlinedIcon />}
        />
        <CardDados
          valor="108"
          titulo="Lotação"
          descricao="Quantidade de professores alocados"
          icone={<GroupsOutlinedIcon />}
        />
        <CardDados
          valor="8"
          titulo="Afastados"
          descricao="Quantidade de afastamentos temporários"
          icone={<PersonRemoveOutlinedIcon />}
        />
        <CardDados
          valor="5"
          titulo="Vagas"
          descricao="Quantidade de vagas ainda disponíveis"
          icone={<EventSeatOutlinedIcon />}
        />
      </GradeCartoesStat>
    </Card>
  );
}

export default CardInformacoesUnidade;
