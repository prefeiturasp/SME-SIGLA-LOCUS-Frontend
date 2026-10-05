import { Col, Form, Row } from "antd";
import { InputForm, SelectForm } from "@/estilos";
import {
  dadosFuncionaisEstaticos,
  opcoesSituacaoCargoBase,
  servidorEstatico,
} from "../dados/dadosEstaticos";

export interface CardDadosFuncionaisProps {
  registroFuncional: string;
  situacaoCargoBase: string;
}

export function CardDadosFuncionais({
  registroFuncional,
  situacaoCargoBase,
}: CardDadosFuncionaisProps) {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Registro funcional (RF)"
            htmlFor="rf-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm id="rf-funcional" disabled value={registroFuncional} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="CL"
            htmlFor="cl-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="cl-funcional"
              disabled
              value={dadosFuncionaisEstaticos.cl}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Vínculo"
            htmlFor="vinculo-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="vinculo-funcional"
              disabled
              value={dadosFuncionaisEstaticos.vinculo}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            label="CPF"
            htmlFor="cpf-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="cpf-funcional"
              disabled
              value={servidorEstatico.cpf}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Cargo atual"
            htmlFor="cargo-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="cargo-funcional"
              disabled
              value={servidorEstatico.cargoAtual}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Código do cargo"
            htmlFor="codigo-cargo-funcional"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="codigo-cargo-funcional"
              disabled
              value={servidorEstatico.codigoCargo}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Situação funcional do cargo base"
            style={{ marginBottom: 0 }}
          >
            <SelectForm
              aria-label="Situação funcional do cargo base"
              placeholder="Selecione"
              value={situacaoCargoBase}
              options={opcoesSituacaoCargoBase}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CardDadosFuncionais;
