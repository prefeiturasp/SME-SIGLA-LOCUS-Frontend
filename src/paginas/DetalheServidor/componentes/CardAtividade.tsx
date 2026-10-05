import { Col, Form, Row, Switch, Typography } from "antd";
import type { Dayjs } from "dayjs";
import { SelectForm } from "@/estilos";
import { opcoesAtividade, opcoesTipoVaga } from "../dados/dadosEstaticos";
import { CampoData, LinhaInterruptor } from "../Estilos";

const { Text } = Typography;

export interface CardAtividadeProps {
  atividade: string;
  tipoVaga: string;
  dataRetorno: Dayjs | null;
  realocado: boolean;
}

export function CardAtividade({
  atividade,
  tipoVaga,
  dataRetorno,
  realocado,
}: CardAtividadeProps) {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Atividade" style={{ marginBottom: 16 }}>
            <SelectForm
              aria-label="Atividade"
              placeholder="Selecione"
              value={atividade}
              options={opcoesAtividade}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Data de retorno do afastamento"
            htmlFor="data-retorno-afastamento"
            style={{ marginBottom: 16 }}
          >
            <CampoData
              id="data-retorno-afastamento"
              format="DD/MM/YYYY"
              placeholder="00/00/0000"
              allowClear={false}
              inputReadOnly
              value={dataRetorno}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Tipo de vaga ocupada" style={{ marginBottom: 0 }}>
            <SelectForm
              aria-label="Tipo de vaga ocupada"
              placeholder="Selecione"
              value={tipoVaga}
              options={opcoesTipoVaga}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Realocado" style={{ marginBottom: 0 }}>
            <LinhaInterruptor>
              <Text style={{ fontSize: 13 }}>
                Selecione caso o servidor tenha sido realocado.
              </Text>
              <Switch
                checked={realocado}
                checkedChildren="Sim"
                unCheckedChildren="Não"
                aria-label="Realocado"
              />
            </LinhaInterruptor>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CardAtividade;
