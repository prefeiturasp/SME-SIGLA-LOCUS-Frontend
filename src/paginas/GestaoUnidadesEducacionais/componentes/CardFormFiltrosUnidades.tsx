import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Col, Form, Input, Row, Select, Typography } from "antd";
import {
  CardFormulario,
  PrimaryButton,
  SecondaryButton,
} from "@/estilos";
import { opcoesFiltros } from "@/paginas/GestaoUnidadesEducacionais/dados/dadosEstaticos";
import type { FiltrosUnidades } from "@/servicos/recursos/unidadesEducacionais/tipos";

const { Title, Paragraph } = Typography;

export interface CardFormFiltrosUnidadesProps {
  aoBuscar: (filtros: FiltrosUnidades) => void;
  aoLimpar: () => void;
}

interface CampoProps {
  label: string;
  children: React.ReactNode;
  ajuda?: string;
}

function Campo({ label, children, ajuda }: CampoProps) {
  return (
    <Col xs={24} sm={12} lg={6}>
      <Form.Item label={label} style={{ marginBottom: 8 }} help={ajuda}>
        {children}
      </Form.Item>
    </Col>
  );
}

export function CardFormFiltrosUnidades({
  aoBuscar,
  aoLimpar,
}: CardFormFiltrosUnidadesProps) {
  const [form] = Form.useForm();

  return (
    <CardFormulario>
      <Title level={4} style={{ marginTop: 0 }}>
        Filtrar unidades
      </Title>
      <Paragraph>
        Consulte a distribuição de professores, capacidade de módulos e
        informações das unidades educacionais da Rede Municipal de Ensino.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={(valores) => aoBuscar(valores as FiltrosUnidades)}
      >
        <Row gutter={16}>
          <Campo label="Cargo">
            <Select
              placeholder="Selecione"
              allowClear
              options={opcoesFiltros.cargo}
            />
          </Campo>
          <Campo label="Estrutura hierárquica (E.H)">
            <Input placeholder="Exemplo: 123456789012345" />
          </Campo>
          <Campo label="Código de lotação">
            <Input placeholder="Exemplo: 1234567" />
          </Campo>
          <Campo label="Tipo da unidade">
            <Select
              placeholder="Selecione"
              allowClear
              options={opcoesFiltros.tipoUnidade}
            />
          </Campo>

          <Campo label="Diretoria Regional de Educação (DRE)">
            <Select
              placeholder="Selecione"
              allowClear
              options={opcoesFiltros.dre}
            />
          </Campo>
          <Campo label="Nome da unidade educacional">
            <Input placeholder="Exemplo: João da Silva" />
          </Campo>
          <Campo label="Escolas municipalizadas">
            <Select
              defaultValue="todos"
              options={opcoesFiltros.simNaoTodos}
            />
          </Campo>
          <Campo label="Ano da municipalização">
            <Select
              placeholder="Selecione"
              allowClear
              options={opcoesFiltros.anoMunicipalizacao}
            />
          </Campo>

          <Campo
            label="Ensino fundamental I"
            ajuda="Escolas que oferecem ensino fundamental."
          >
            <Select
              defaultValue="todos"
              options={opcoesFiltros.simNaoTodos}
            />
          </Campo>
          <Campo
            label="EJA Modular"
            ajuda="Escolas com EJA na modalidade modular."
          >
            <Select
              defaultValue="todos"
              options={opcoesFiltros.simNaoTodos}
            />
          </Campo>
          <Campo
            label="São Paulo Integral"
            ajuda="Escolas do programa São Paulo Integral."
          >
            <Select
              defaultValue="todos"
              options={opcoesFiltros.simNaoTodos}
            />
          </Campo>
          <Campo
            label="Unidade contabilizada"
            ajuda="Escolas contabilizadas nos cálculos do sistema."
          >
            <Select
              defaultValue="todos"
              options={opcoesFiltros.simNaoTodos}
            />
          </Campo>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 16,
              paddingTop: 16,
            }}
          >
            <SecondaryButton
              onClick={() => {
                form.resetFields();
                aoLimpar();
              }}
            >
              Limpar filtros
            </SecondaryButton>
            <PrimaryButton
              htmlType="submit"
              icon={<SearchOutlinedIcon fontSize="small" />}
            >
              Buscar unidade
            </PrimaryButton>
          </Col>
        </Row>
      </Form>
    </CardFormulario>
  );
}

export default CardFormFiltrosUnidades;
