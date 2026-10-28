import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ModalBase } from "@/componentes/ModalBase";
import { ConteudoPagina } from "@/estilos";
import { CardServidor } from "@/paginas/AtualizacaoServidorRF/componentes/CardServidor";
import { ListaInformacoesCadastro } from "@/paginas/AtualizacaoServidorRF/componentes/ListaInformacoesCadastro";
import { PainelHistoricoAtualizacoes } from "@/paginas/AtualizacaoServidorRF/componentes/PainelHistoricoAtualizacoes";
import {
  CampoIdentificacao,
  RotuloCampo,
  ValorCampo,
} from "@/paginas/AtualizacaoServidorRF/Estilos";
import { useDetalheServidor } from "@/paginas/AtualizacaoServidorRF/hooks/useDetalheServidor";
import { CAMINHOS } from "@/rotas/caminhos";
import { useReativarPerfil } from "./hooks/useReativarPerfil";

const DATA_VAZIA = "00/00/0000";

const DATAS_VACANCIA = [
  { rotulo: "Data da vacância", valor: DATA_VAZIA },
  { rotulo: "Data da publicação no D.O", valor: DATA_VAZIA },
] as const;

export function AtualizacaoServidorVacanciado() {
  const estado = useDetalheServidor();
  const navigate = useNavigate();
  const reativacao = useReativarPerfil(estado.registroFuncional);

  return (
    <>
      <CabecalhoPagina
        titulo="Vacância"
        descricao="Consulte ou atualize os dados funcionais de uma pessoa servidora vacanciada."
        acoes={
          <>
            <Button
              type="default"
              onClick={() => navigate(CAMINHOS.cadastroAtualizacaoVacancia)}
            >
              Voltar
            </Button>
            <Button
              type="default"
              icon={<AccessTimeOutlinedIcon fontSize="small" />}
              onClick={estado.abrirPainelHistorico}
            >
              Histórico de atualizações
            </Button>
            <Button
              type="default"
              icon={<ReplayOutlinedIcon fontSize="small" />}
              onClick={reativacao.abrirModal}
            >
              Reativar perfil
            </Button>
          </>
        }
      />

      <ConteudoPagina>
        <CardServidor
          servidor={{ ...estado.servidor, situacao: "Vacanciado" }}
          rotuloCargo="Último cargo"
          varianteSituacao="neutro"
          lateral={DATAS_VACANCIA.map((data) => (
            <CampoIdentificacao key={data.rotulo} $semQuebra>
              <RotuloCampo>{data.rotulo}</RotuloCampo>
              <ValorCampo>{data.valor}</ValorCampo>
            </CampoIdentificacao>
          ))}
        />
        <ListaInformacoesCadastro
          estado={estado}
          exibirEncerramento={false}
          desabilitado
        />
      </ConteudoPagina>

      <PainelHistoricoAtualizacoes
        aberto={estado.painelHistoricoAberto}
        registros={estado.historico}
        aoFechar={estado.fecharPainelHistorico}
      />

      <ModalBase
        aberto={reativacao.modalAberto}
        titulo="Reativar perfil"
        mensagem="Este perfil está inativo por motivo de vacância. Ao reativar, o servidor será contabilizado entre os lotados da unidade educacional. Deseja reativar o perfil?"
        textoConfirmar="Reativar perfil"
        confirmarPrimario
        confirmando={reativacao.reativando}
        aoConfirmar={reativacao.confirmarReativacao}
        aoCancelar={reativacao.fecharModal}
      />
    </>
  );
}

export default AtualizacaoServidorVacanciado;
