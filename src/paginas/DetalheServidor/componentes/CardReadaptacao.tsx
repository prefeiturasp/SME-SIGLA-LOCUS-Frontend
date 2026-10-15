import { Col, Form, Row } from "antd";
import { SelectForm } from "@/estilos";
import {
  opcoesAtividadeReadaptacao,
  opcoesTipoLaudo,
} from "../dados/dadosEstaticos";

export interface CardReadaptacaoProps {
  tipoLaudo?: string;
  atividade?: string;
}

export function CardReadaptacao({
  tipoLaudo,
  atividade,
}: CardReadaptacaoProps) {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Tipo de laudo" style={{ marginBottom: 0 }}>
            <SelectForm
              aria-label="Tipo de laudo"
              placeholder="Selecione"
              value={tipoLaudo}
              options={opcoesTipoLaudo}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Atividade" style={{ marginBottom: 0 }}>
            <SelectForm
              aria-label="Atividade"
              placeholder="Selecione"
              value={atividade}
              options={opcoesAtividadeReadaptacao}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CardReadaptacao;
