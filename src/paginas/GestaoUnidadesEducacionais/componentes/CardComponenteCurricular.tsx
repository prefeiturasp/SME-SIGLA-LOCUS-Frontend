import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import type { ReactNode } from "react";
import { Card, Select, Typography } from "antd";
import { CartaoStat } from "@/componentes/ui/CartaoStat";
import type {
  EstatisticaPainel,
  OpcaoSelecao,
} from "@/servicos/recursos/unidadesEducacionais/tipos";

const { Title, Paragraph } = Typography;

const ICONE_POR_CHAVE: Record<string, ReactNode> = {
  modulos: <GroupsOutlinedIcon />,
  lotacao: <ViewModuleOutlinedIcon />,
  afastados: <PersonRemoveOutlinedIcon />,
  vagas: <EventSeatOutlinedIcon />,
  unidades: <ApartmentOutlinedIcon />,
  turmas: <Groups3OutlinedIcon />,
};

export interface CardComponenteCurricularProps {
  estatisticas: EstatisticaPainel[];
  opcoesComponente: OpcaoSelecao[];
  componenteSelecionado: string;
  aoSelecionarComponente: (componente: string) => void;
}

export function CardComponenteCurricular({
  estatisticas,
  opcoesComponente,
  componenteSelecionado,
  aoSelecionarComponente,
}: CardComponenteCurricularProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <Title level={4} style={{ marginTop: 0 }}>
            Painel de informações por componente curricular
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            Estes são dados de todas as unidades educacionais considerando o
            componente curricular selecionado no filtro.
          </Paragraph>
        </div>
        <div style={{ width: 306 }}>
          <label
            style={{ display: "block", fontWeight: 700, marginBottom: 8 }}
            htmlFor="componente-curricular"
          >
            Componente curricular
          </label>
          <Select
            id="componente-curricular"
            style={{ width: "100%" }}
            value={componenteSelecionado}
            onChange={aoSelecionarComponente}
            options={opcoesComponente}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {estatisticas.map((stat) => (
          <CartaoStat
            key={stat.chave}
            valor={stat.valor}
            rotulo={stat.rotulo}
            legenda={stat.legenda}
            icone={ICONE_POR_CHAVE[stat.chave] ?? <GroupsOutlinedIcon />}
          />
        ))}
      </div>
    </Card>
  );
}

export default CardComponenteCurricular;
