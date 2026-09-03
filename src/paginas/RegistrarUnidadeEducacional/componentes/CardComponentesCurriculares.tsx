import { Tooltip, Typography } from "antd";
import { IconeExcluir } from "@/componentes/IconeExcluir";
import {
  BotaoExcluir,
  CabecalhoListaDados,
  CardFormulario,
  ColunaListaAcao,
  ColunaListaCentralizada,
  ColunaListaTexto,
  CorpoListaDados,
  EstadoVazio,
  EstadoVazioTexto,
  EstadoVazioTitulo,
  ItemListaDados,
  ListaDados,
} from "@/estilos";
import type { ComponenteCurricularAdicionado } from "../hooks/useRegistrarUnidadeEducacional";
import { FormularioAdicionarComponenteCurricular } from "./FormularioAdicionarComponenteCurricular";

const { Title, Paragraph } = Typography;

export interface CardComponentesCurricularesProps {
  componentes: ComponenteCurricularAdicionado[];
  componenteSelecionado?: string;
  quantidadeModulos: string;
  erroComponenteCurricular?: string;
  aoSelecionarComponente: (valor?: string) => void;
  aoAlterarQuantidade: (valor: string) => void;
  aoAdicionar: () => void;
  aoRemover: (id: string) => void;
}

function formatarModulos(quantidade: number): string {
  return String(quantidade).padStart(2, "0");
}

export function CardComponentesCurriculares({
  componentes,
  componenteSelecionado,
  quantidadeModulos,
  erroComponenteCurricular,
  aoSelecionarComponente,
  aoAlterarQuantidade,
  aoAdicionar,
  aoRemover,
}: CardComponentesCurricularesProps) {
  return (
    <CardFormulario>
      <Title level={4} style={{ marginTop: 0 }}>
        Componentes curriculares
      </Title>
      <Paragraph>
        Adicione os componentes curriculares oferecidos pela unidade e informe a
        quantidade de módulos prevista para cada um.
      </Paragraph>

      <FormularioAdicionarComponenteCurricular
        componenteSelecionado={componenteSelecionado}
        quantidadeModulos={quantidadeModulos}
        erroComponenteCurricular={erroComponenteCurricular}
        aoSelecionarComponente={aoSelecionarComponente}
        aoAlterarQuantidade={aoAlterarQuantidade}
        aoAdicionar={aoAdicionar}
      />

      {componentes.length === 0 ? (
        <EstadoVazio>
          <EstadoVazioTitulo>Nenhum componente adicionado</EstadoVazioTitulo>
          <EstadoVazioTexto>
            Selecione um componente curricular e informe a quantidade de
            módulos.
          </EstadoVazioTexto>
        </EstadoVazio>
      ) : (
        <ListaDados>
          <CabecalhoListaDados role="row">
            <ColunaListaTexto>Componente curricular</ColunaListaTexto>
            <ColunaListaCentralizada>Módulos</ColunaListaCentralizada>
            <ColunaListaAcao aria-hidden />
          </CabecalhoListaDados>

          <CorpoListaDados>
            {componentes.map((item) => (
              <ItemListaDados key={item.id} role="row">
                <ColunaListaTexto>{item.componente}</ColunaListaTexto>
                <ColunaListaCentralizada>
                  {formatarModulos(item.quantidadeModulos)}
                </ColunaListaCentralizada>
                <ColunaListaAcao>
                  <Tooltip title="Excluir componente">
                    <BotaoExcluir
                      icon={<IconeExcluir fontSize="small" />}
                      onClick={() => aoRemover(item.id)}
                      aria-label="Excluir componente"
                    />
                  </Tooltip>
                </ColunaListaAcao>
              </ItemListaDados>
            ))}
          </CorpoListaDados>
        </ListaDados>
      )}
    </CardFormulario>
  );
}

export default CardComponentesCurriculares;
