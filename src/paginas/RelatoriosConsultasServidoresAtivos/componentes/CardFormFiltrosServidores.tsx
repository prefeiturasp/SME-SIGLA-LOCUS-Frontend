import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import { FormItem } from "@/estilos";
import {
  MENSAGEM_FILTRO_OBRIGATORIO,
  opcoesFiltrosServidores,
} from "../dados/dadosEstaticos";
import {
  AlertaErroFiltro,
  DatePickerFiltro,
  TituloFiltroServidores,
} from "../Estilos";

const { Paragraph } = Typography;

export type FiltrosServidores = {
  nome?: string;
  rf?: string;
  cpf?: string;
  dre?: string;
  unidadeEducacional?: string;
  cargoAtual?: string;
  tipoLaudo?: string;
  grupoAtividades?: string;
  tipoVaga?: string;
  liminar?: string;
  retornoAfastamento?: Dayjs | null;
};

export interface CardFormFiltrosServidoresProps {
  aoBuscar?: (filtros: FiltrosServidores) => void;
  aoLimpar?: () => void;
}

function campoPreenchido(valor: unknown): boolean {
  if (valor == null) return false;
  if (typeof valor === "string") return valor.trim().length > 0;
  return true;
}

function temPeloMenosUmFiltro(valores: FiltrosServidores): boolean {
  return Object.values(valores).some(campoPreenchido);
}

export function CardFormFiltrosServidores({
  aoBuscar,
  aoLimpar,
}: CardFormFiltrosServidoresProps) {
  const [form] = Form.useForm<FiltrosServidores>();
  const [erroFiltro, setErroFiltro] = useState<string>();
  const dreSelecionada = Form.useWatch("dre", form);

  return (
    <Card>
      <TituloFiltroServidores>Filtrar servidores</TituloFiltroServidores>
      <Paragraph>
        Consulte as informações dos servidores com perfis ativos na SME. Se
        necessário, utilize os filtros para refinar a sua busca.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => {
          if (erroFiltro) setErroFiltro(undefined);
        }}
        onFinish={(valores) => {
          if (!temPeloMenosUmFiltro(valores)) {
            setErroFiltro(MENSAGEM_FILTRO_OBRIGATORIO);
            return;
          }

          setErroFiltro(undefined);
          aoBuscar?.(valores);
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Nome do servidor" name="nome">
              <Input placeholder="Exemplo: João da Silva" allowClear />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="R.F" name="rf">
              <Input placeholder="000.000.0" allowClear />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="CPF" name="cpf">
              <Input placeholder="000.000.000-00" allowClear />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Diretoria Regional de Educação (DRE)" name="dre">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.dre}
                onChange={() => {
                  form.setFieldValue("unidadeEducacional", undefined);
                }}
              />
            </FormItem>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Unidade educacional" name="unidadeEducacional">
              <Select
                placeholder="Selecione"
                allowClear
                disabled={!dreSelecionada}
                options={opcoesFiltrosServidores.unidadeEducacional}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Cargo atual" name="cargoAtual">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.cargoAtual}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Tipo de laudo" name="tipoLaudo">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.tipoLaudo}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <FormItem label="Grupo de atividades" name="grupoAtividades">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.grupoAtividades}
              />
            </FormItem>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <FormItem label="Tipo de vaga" name="tipoVaga">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.tipoVaga}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <FormItem label="Liminar" name="liminar">
              <Select
                placeholder="Selecione"
                allowClear
                options={opcoesFiltrosServidores.liminar}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <FormItem label="Retorno do afastamento" name="retornoAfastamento">
              <DatePickerFiltro
                format="DD/MM/YYYY"
                placeholder="00/00/0000"
              />
            </FormItem>
          </Col>

          {erroFiltro ? (
            <>
              <Col span={24} />
              <Col xs={24} sm={12} lg={8}>
                <AlertaErroFiltro
                  type="error"
                  showIcon
                  closable
                  message={erroFiltro}
                  onClose={() => setErroFiltro(undefined)}
                />
              </Col>
            </>
          ) : null}

          <Col span={24}>
            <Flex justify="flex-end" gap="middle">
              <Button
                type="default"
                onClick={() => {
                  form.resetFields();
                  setErroFiltro(undefined);
                  aoLimpar?.();
                }}
              >
                Limpar filtros
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlinedIcon fontSize="small" />}
              >
                Buscar
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default CardFormFiltrosServidores;
