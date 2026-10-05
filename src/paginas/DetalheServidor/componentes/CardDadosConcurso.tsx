import { Col, Form, Row } from "antd";
import type { Dayjs } from "dayjs";
import { InputForm } from "@/estilos";
import { CampoData, TituloGrupo } from "../Estilos";

export interface CardDadosConcursoProps {
  classificacaoGeral: string;
  classificacaoNna: string;
  classificacaoPcd: string;
  dataConvocacao: Dayjs | null;
  dataEscolha: Dayjs | null;
  dataNomeacao: Dayjs | null;
}

export function CardDadosConcurso({
  classificacaoGeral,
  classificacaoNna,
  classificacaoPcd,
  dataConvocacao,
  dataEscolha,
  dataNomeacao,
}: CardDadosConcursoProps) {
  return (
    <Form layout="vertical">
      <TituloGrupo>Classificação</TituloGrupo>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Classificação geral"
            htmlFor="classificacao-geral"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="classificacao-geral"
              readOnly
              value={classificacaoGeral}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Classificação NNA"
            htmlFor="classificacao-nna"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="classificacao-nna"
              readOnly
              placeholder="Exemplo: 100"
              value={classificacaoNna}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Classificação PCD"
            htmlFor="classificacao-pcd"
            style={{ marginBottom: 16 }}
          >
            <InputForm
              id="classificacao-pcd"
              readOnly
              placeholder="Exemplo: 100"
              value={classificacaoPcd}
            />
          </Form.Item>
        </Col>
      </Row>

      <TituloGrupo>Etapas de ingresso</TituloGrupo>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Data da convocação"
            htmlFor="data-convocacao"
            style={{ marginBottom: 16 }}
          >
            <CampoData
              id="data-convocacao"
              format="DD/MM/YYYY"
              placeholder="00/00/0000"
              allowClear={false}
              inputReadOnly
              value={dataConvocacao}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Data da escolha"
            htmlFor="data-escolha-concurso"
            style={{ marginBottom: 16 }}
          >
            <CampoData
              id="data-escolha-concurso"
              format="DD/MM/YYYY"
              placeholder="00/00/0000"
              allowClear={false}
              inputReadOnly
              value={dataEscolha}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Data da nomeação"
            htmlFor="data-nomeacao"
            style={{ marginBottom: 0 }}
          >
            <CampoData
              id="data-nomeacao"
              format="DD/MM/YYYY"
              placeholder="00/00/0000"
              allowClear={false}
              inputReadOnly
              value={dataNomeacao}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default CardDadosConcurso;
