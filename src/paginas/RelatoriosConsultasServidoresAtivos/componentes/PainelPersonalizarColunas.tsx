import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button, Checkbox, Typography } from "antd";
import { PainelLateral } from "@/componentes/PainelLateral";
import type {
  ChaveColunaServidor,
  DefinicaoColunaServidor,
} from "../dados/dadosEstaticos";
import {
  AlertaLimiteColunas,
  ContadorColunasSelecionadas,
  ConteudoPersonalizarColunas,
  ItemColunaSeletor,
  ListaColunasSeletor,
  TituloSeletorColunas,
} from "../Estilos";

const { Paragraph } = Typography;

export interface PainelPersonalizarColunasProps {
  aberto: boolean;
  colunas: DefinicaoColunaServidor[];
  selecao: ChaveColunaServidor[];
  limite: number;
  exibirAlertaLimite: boolean;
  aoAlternar: (chave: ChaveColunaServidor, marcada: boolean) => void;
  aoSalvar: () => void;
  aoFechar: () => void;
}

export function PainelPersonalizarColunas({
  aberto,
  colunas,
  selecao,
  limite,
  exibirAlertaLimite,
  aoAlternar,
  aoSalvar,
  aoFechar,
}: PainelPersonalizarColunasProps) {
  const opcoes = colunas
    .slice()
    .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));

  return (
    <PainelLateral
      aberto={aberto}
      titulo="Personalizar colunas"
      aoFechar={aoFechar}
      rodape={
        <>
          <Button type="default" onClick={aoFechar}>
            Cancelar
          </Button>
          <Button type="primary" onClick={aoSalvar}>
            Salvar
          </Button>
        </>
      }
    >
      <ConteudoPersonalizarColunas>
        <Paragraph>
          Selecione até {limite} informações para compor as colunas da tabela
          e defina a ordem de exibição. As demais informações estarão
          disponíveis em &quot;Mais detalhes&quot;.
        </Paragraph>
        <TituloSeletorColunas>
          Colunas da tabela de servidores
        </TituloSeletorColunas>
        <ListaColunasSeletor>
          {opcoes.map((coluna) => {
            const marcada = selecao.includes(coluna.chave);
            return (
              <ItemColunaSeletor key={coluna.chave}>
                <Checkbox
                  checked={marcada}
                  disabled={coluna.fixa}
                  onChange={(evento) =>
                    aoAlternar(coluna.chave, evento.target.checked)
                  }
                >
                  {coluna.titulo}
                </Checkbox>
              </ItemColunaSeletor>
            );
          })}
        </ListaColunasSeletor>
        <ContadorColunasSelecionadas>
          <strong>{selecao.length}</strong> de <strong>{limite}</strong>{" "}
          selecionados
        </ContadorColunasSelecionadas>
        {exibirAlertaLimite ? (
          <AlertaLimiteColunas
            type="error"
            showIcon
            icon={<InfoOutlinedIcon fontSize="small" />}
            message={`Os ${limite} itens padrão já estão selecionados. Para personalizar as colunas, desmarque os itens que deseja remover e selecione outros de sua preferência.`}
          />
        ) : null}
      </ConteudoPersonalizarColunas>
    </PainelLateral>
  );
}

export default PainelPersonalizarColunas;
