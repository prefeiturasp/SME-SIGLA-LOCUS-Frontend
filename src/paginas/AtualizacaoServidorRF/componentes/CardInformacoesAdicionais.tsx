import { List, Switch, Typography } from "antd";

const { Text } = Typography;

export interface CardInformacoesAdicionaisProps {
  liminar: boolean;
  remocao: boolean;
  desabilitado?: boolean;
}

export function CardInformacoesAdicionais({
  liminar,
  remocao,
  desabilitado = false,
}: CardInformacoesAdicionaisProps) {
  return (
    <List itemLayout="horizontal">
      <List.Item
        actions={[
          <Switch
            key="liminar"
            checked={liminar}
            disabled={desabilitado}
            checkedChildren="Sim"
            unCheckedChildren="Não"
            aria-label="Liminar"
          />,
        ]}
      >
        <List.Item.Meta
          title={<Text strong>Liminar</Text>}
          description={
            <Text style={{ fontSize: 13 }}>
              Indique se há liminar relacionada ao cadastro.
            </Text>
          }
        />
      </List.Item>
      <List.Item
        actions={[
          <Switch
            key="remocao"
            checked={remocao}
            disabled={desabilitado}
            checkedChildren="Sim"
            unCheckedChildren="Não"
            aria-label="Remoção"
          />,
        ]}
      >
        <List.Item.Meta
          title={<Text strong>Remoção</Text>}
          description={
            <Text style={{ fontSize: 13 }}>Indique se houve remoção.</Text>
          }
        />
      </List.Item>
    </List>
  );
}

export default CardInformacoesAdicionais;
