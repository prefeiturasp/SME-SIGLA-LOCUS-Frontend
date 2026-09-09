import { Card, Select } from "antd";
import { CabecalhoCard } from "@/componentes/CabecalhoCard";
import { CampoRotulado } from "@/componentes/CampoRotulado";
import { CardDados } from "@/componentes/CardDados";
import { iconeDaEstatistica } from "@/componentes/iconesEstatistica";
import { GradeCartoesStat } from "@/estilos";
import type {
  EstatisticaPainel,
  OpcaoSelecao,
} from "@/tipos/unidadesEducacionais";

const LARGURA_FILTRO = 306;

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
      <div style={{ marginBottom: 24 }}>
        <CabecalhoCard
          titulo="Painel de informações por componente curricular"
          descricao="Estes são dados de todas as unidades educacionais considerando o componente curricular selecionado no filtro."
          larguraAcao={LARGURA_FILTRO}
          acao={
            <CampoRotulado
              id="componente-curricular"
              rotulo="Componente curricular"
            >
              <Select
                id="componente-curricular"
                style={{ width: "100%" }}
                value={componenteSelecionado}
                onChange={aoSelecionarComponente}
                options={opcoesComponente}
              />
            </CampoRotulado>
          }
        />
      </div>

      <GradeCartoesStat $colunas={3}>
        {estatisticas.map((stat) => (
          <CardDados
            key={stat.chave}
            valor={stat.valor}
            titulo={stat.rotulo}
            descricao={stat.legenda}
            icone={iconeDaEstatistica(stat.chave)}
          />
        ))}
      </GradeCartoesStat>
    </Card>
  );
}

export default CardComponenteCurricular;
