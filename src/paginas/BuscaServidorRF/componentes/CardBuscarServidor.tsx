import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button, Card, ConfigProvider, Form, Typography } from "antd";
import { LinhaCampoCentralizada } from "@/estilos";
import { temaListaSugestoes } from "@/estilos/temas/temaAntd";
import type { ServidorResumo } from "@/servicos/recursos/servidores";
import { CampoBuscaServidor } from "../Estilos";
import { textoDaSugestao } from "../utilitarios";
import { RotuloSugestaoServidor } from "./RotuloSugestaoServidor";

const { Title, Paragraph } = Typography;

const ALTURA_LISTA_SUGESTOES = 320;

export interface CardBuscarServidorProps {
  termo: string;
  sugestoes: ServidorResumo[];
  erroBusca?: string;
  buscando: boolean;
  aoAlterarTermo: (valor: string) => void;
  aoSelecionarServidor: (servidor: ServidorResumo) => void;
  aoBuscar: () => void;
}

// So vem no onChange quando o valor e de uma sugestao.
function servidorDaOpcao(opcao: unknown): ServidorResumo | undefined {
  return (opcao as { servidor?: ServidorResumo } | undefined)?.servidor;
}

export function CardBuscarServidor({
  termo,
  sugestoes,
  erroBusca,
  buscando,
  aoAlterarTermo,
  aoSelecionarServidor,
  aoBuscar,
}: CardBuscarServidorProps) {
  const opcoes = sugestoes.map((servidor) => ({
    value: textoDaSugestao(servidor),
    label: <RotuloSugestaoServidor servidor={servidor} termo={termo} />,
    servidor,
  }));

  return (
    <Card>
      <Title level={4} style={{ marginTop: 0 }}>
        Buscar servidor
      </Title>
      <Paragraph>
        Pesquise pelo nome, RF ou CPF para consultar o cadastro funcional.
      </Paragraph>

      <Form layout="vertical">
        <Form.Item
          label="Nome, RF ou CPF"
          validateStatus={erroBusca ? "error" : undefined}
          help={erroBusca}
          style={{ marginBottom: 0 }}
        >
          <LinhaCampoCentralizada>
            <ConfigProvider theme={temaListaSugestoes}>
              <CampoBuscaServidor
                aria-label="Nome, RF ou CPF"
                placeholder="Digite o nome, RF ou CPF..."
                value={termo}
                options={opcoes}
                listHeight={ALTURA_LISTA_SUGESTOES}
                status={erroBusca ? "error" : undefined}
                onChange={(valor, opcao) => {
                  const servidor = servidorDaOpcao(opcao);
                  if (servidor) aoSelecionarServidor(servidor);
                  else aoAlterarTermo(String(valor ?? ""));
                }}
              />
            </ConfigProvider>
            <Button
              type="primary"
              icon={<SearchOutlinedIcon fontSize="small" />}
              loading={buscando}
              onClick={aoBuscar}
            >
              Buscar servidor
            </Button>
          </LinhaCampoCentralizada>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CardBuscarServidor;
