import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, Card, Flex, Tooltip } from "antd";
import IlustracaoSemDados from "@/assets/sad-locus.svg?react";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import {
  DESCRICAO_CARD_RESULTADOS_SERVIDORES,
  MENSAGEM_SEM_RESULTADOS_DESCRICAO,
  MENSAGEM_SEM_RESULTADOS_TITULO,
  TITULO_CARD_RESULTADOS_SERVIDORES,
} from "../dados/dadosEstaticos";
import {
  ConteudoSemResultadosServidores,
  DescricaoSemResultadosServidores,
  TituloSemResultadosServidores,
} from "../Estilos";

const LARGURA_ILUSTRACAO = 181;
const ALTURA_ILUSTRACAO = 207;

export function CardServidoresSemResultados() {
  return (
    <Card>
      <CabecalhoSecao
        titulo={TITULO_CARD_RESULTADOS_SERVIDORES}
        descricao={DESCRICAO_CARD_RESULTADOS_SERVIDORES}
        acao={
          <Flex gap="small">
            <Tooltip title="Personalizar colunas">
              <Button
                type="default"
                aria-label="Personalizar colunas"
                icon={<TuneIcon fontSize="small" />}
                disabled
              />
            </Tooltip>
            <Button
              type="default"
              icon={<FileUploadOutlinedIcon fontSize="small" />}
              disabled
            >
              Exportar relatório
            </Button>
          </Flex>
        }
      />

      <ConteudoSemResultadosServidores>
        <IlustracaoSemDados
          width={LARGURA_ILUSTRACAO}
          height={ALTURA_ILUSTRACAO}
          role="presentation"
        />
        <TituloSemResultadosServidores>
          {MENSAGEM_SEM_RESULTADOS_TITULO}
        </TituloSemResultadosServidores>
        <DescricaoSemResultadosServidores>
          {MENSAGEM_SEM_RESULTADOS_DESCRICAO}
        </DescricaoSemResultadosServidores>
      </ConteudoSemResultadosServidores>
    </Card>
  );
}

export default CardServidoresSemResultados;
