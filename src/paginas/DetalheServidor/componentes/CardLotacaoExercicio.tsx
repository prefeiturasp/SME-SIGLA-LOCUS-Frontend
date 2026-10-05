import { Col, Form, Row } from "antd";
import { InputForm, SelectForm } from "@/estilos";
import {
  exercicioEstatico,
  lotacaoEstatica,
  opcoesTipoLotacao,
  type AbaUnidade,
} from "../dados/dadosEstaticos";
import { AlternadorUnidade } from "../Estilos";

const OPCOES_ABA = [
  { label: "Unidade de lotação", value: "lotacao" },
  { label: "Unidade de exercício", value: "exercicio" },
];

export interface CardLotacaoExercicioProps {
  aba: AbaUnidade;
  codigoEol: string;
  tipoLotacao?: string;
}

export function CardLotacaoExercicio({
  aba,
  codigoEol,
  tipoLotacao,
}: CardLotacaoExercicioProps) {
  const unidade = aba === "lotacao" ? lotacaoEstatica : exercicioEstatico;

  return (
    <Form layout="vertical">
      <AlternadorUnidade block value={aba} options={OPCOES_ABA} />

      <Form.Item
        label="Código EOL"
        htmlFor="codigo-eol"
        style={{ marginBottom: 16 }}
      >
        <InputForm id="codigo-eol" readOnly value={codigoEol} />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12} xl={6}>
          <Form.Item
            label="Tipo"
            htmlFor="tipo-unidade"
            style={{ marginBottom: 0 }}
          >
            <InputForm id="tipo-unidade" disabled value={unidade.tipo} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Form.Item
            label="Diretoria Regional de Educação"
            htmlFor="dre-unidade"
            style={{ marginBottom: 0 }}
          >
            <InputForm id="dre-unidade" disabled value={unidade.dre} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Form.Item
            label="Nome da Unidade Educacional"
            htmlFor="nome-unidade"
            style={{ marginBottom: 0 }}
          >
            <InputForm id="nome-unidade" disabled value={unidade.nomeUnidade} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Form.Item label="Tipo de lotação" style={{ marginBottom: 0 }}>
            <SelectForm
              aria-label="Tipo de lotação"
              placeholder="Selecione"
              value={tipoLotacao}
              options={opcoesTipoLotacao}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CardLotacaoExercicio;
