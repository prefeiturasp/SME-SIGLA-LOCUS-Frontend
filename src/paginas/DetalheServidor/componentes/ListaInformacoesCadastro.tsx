import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import type { CollapseProps } from "antd";
import type { ComponentType } from "react";
import { CabecalhoSecao } from "@/componentes/CabecalhoSecao";
import { CardDescricao, CardTitulo } from "@/estilos";
import type { EstadoDetalheServidor } from "../hooks/useDetalheServidor";
import {
  BlocoInformacoes,
  IconeDestaque,
  InformacoesCadastroSecoes,
  RotuloSecao,
  TextosSecao,
} from "../Estilos";
import { CardAtividade } from "./CardAtividade";
import { CardDadosConcurso } from "./CardDadosConcurso";
import { CardDadosFuncionais } from "./CardDadosFuncionais";
import { CardEncerramento } from "./CardEncerramento";
import { CardInformacoesAdicionais } from "./CardInformacoesAdicionais";
import { CardLotacaoExercicio } from "./CardLotacaoExercicio";
import { CardReadaptacao } from "./CardReadaptacao";

export interface ListaInformacoesCadastroProps {
  estado: EstadoDetalheServidor;
}

function Rotulo({
  titulo,
  descricao,
  icone: Icone,
  alerta = false,
}: {
  titulo: string;
  descricao: string;
  icone: ComponentType;
  alerta?: boolean;
}) {
  return (
    <RotuloSecao>
      <IconeDestaque $alerta={alerta} aria-hidden>
        <Icone />
      </IconeDestaque>
      <TextosSecao>
        <CardTitulo>{titulo}</CardTitulo>
        <CardDescricao>{descricao}</CardDescricao>
      </TextosSecao>
    </RotuloSecao>
  );
}

export function ListaInformacoesCadastro({
  estado,
}: ListaInformacoesCadastroProps) {
  const itens: CollapseProps["items"] = [
    {
      key: "dados-funcionais",
      label: (
        <Rotulo
          titulo="Dados funcionais"
          descricao="Identificação e situação do cargo base"
          icone={PersonOutlineIcon}
        />
      ),
      children: (
        <CardDadosFuncionais
          registroFuncional={estado.registroFuncional}
          situacaoCargoBase={estado.situacaoCargoBase}
        />
      ),
    },
    {
      key: "atividade",
      label: (
        <Rotulo
          titulo="Atividade"
          descricao="Atividade atual, afastamento e vaga"
          icone={BarChartOutlinedIcon}
        />
      ),
      children: (
        <CardAtividade
          atividade={estado.atividade}
          tipoVaga={estado.tipoVaga}
          dataRetorno={estado.dataRetorno}
          realocado={estado.realocado}
        />
      ),
    },
    {
      key: "lotacao-exercicio",
      label: (
        <Rotulo
          titulo="Lotação e exercício"
          descricao="Unidades de lotação e de exercício"
          icone={ApartmentOutlinedIcon}
        />
      ),
      children: (
        <CardLotacaoExercicio
          aba={estado.abaUnidade}
          codigoEol={estado.codigoEol}
          tipoLotacao={estado.tipoLotacao}
        />
      ),
    },
    {
      key: "dados-concurso",
      label: (
        <Rotulo
          titulo="Dados do concurso"
          descricao="Classificação e etapas de ingresso"
          icone={DescriptionOutlinedIcon}
        />
      ),
      children: (
        <CardDadosConcurso
          classificacaoGeral={estado.classificacaoGeral}
          classificacaoNna={estado.classificacaoNna}
          classificacaoPcd={estado.classificacaoPcd}
          dataConvocacao={estado.dataConvocacao}
          dataEscolha={estado.dataEscolhaConcurso}
          dataNomeacao={estado.dataNomeacao}
        />
      ),
    },
    {
      key: "informacoes-adicionais",
      label: (
        <Rotulo
          titulo="Informações adicionais"
          descricao="Condições complementares do cadastro"
          icone={InfoOutlinedIcon}
        />
      ),
      children: (
        <CardInformacoesAdicionais
          liminar={estado.liminar}
          remocao={estado.remocao}
        />
      ),
    },
    {
      key: "readaptacao-funcional",
      label: (
        <Rotulo
          titulo="Readaptação funcional"
          descricao="Consulte os motivos e as datas das atualizações realizadas no cadastro."
          icone={EditOutlinedIcon}
        />
      ),
      children: (
        <CardReadaptacao
          tipoLaudo={estado.tipoLaudo}
          atividade={estado.atividadeReadaptacao}
        />
      ),
    },
    {
      key: "encerramento-vinculo",
      label: (
        <Rotulo
          titulo="Encerramento do vínculo"
          descricao="Alterações nesta data afetam o status do cadastro."
          icone={ShieldOutlinedIcon}
          alerta
        />
      ),
      children: (
        <CardEncerramento dataEscolha={estado.dataEscolhaEncerramento} />
      ),
    },
  ];

  return (
    <BlocoInformacoes>
      <CabecalhoSecao
        titulo="Informações do cadastro"
        descricao="Os campos de identificação do servidor não podem ser editados."
      />

      <InformacoesCadastroSecoes
        bordered={false}
        expandIconPosition="end"
        expandIcon={() => (
          <ExpandMoreRoundedIcon aria-hidden fontSize="small" />
        )}
        items={itens}
      />
    </BlocoInformacoes>
  );
}

export default ListaInformacoesCadastro;
