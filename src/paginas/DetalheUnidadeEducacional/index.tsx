import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ModalConfirmacao } from "@/componentes/ModalConfirmacao";
import { ConteudoPagina } from "@/estilos";
import { CAMINHOS } from "@/rotas/caminhos";
import { BannerVersaoHistorica } from "./componentes/BannerVersaoHistorica";
import { CardComponentesDetalhe } from "./componentes/CardComponentesDetalhe";
import { CardInformacoesUnidade } from "./componentes/CardInformacoesUnidade";
import { LinhaHistoricoAlteracoes } from "./componentes/LinhaHistoricoAlteracoes";
import { useDetalheUnidade } from "./hooks/useDetalheUnidade";

export function DetalheUnidadeEducacional() {
  const navigate = useNavigate();
  const estado = useDetalheUnidade();
  const { unidade, somenteLeitura, versaoVisualizada } = estado;

  if (estado.naoEncontrada) {
    return (
      <Result
        status="404"
        title="Unidade educacional não encontrada"
        subTitle="Verifique o código de lotação e tente novamente."
        extra={
          <Button
            type="primary"
            onClick={() => navigate(CAMINHOS.cadastroGestaoUnidades)}
          >
            Voltar para a listagem
          </Button>
        }
      />
    );
  }

  return (
    <>
      <CabecalhoPagina
        titulo={
          unidade ? `${unidade.tipo} ${unidade.nome}` : "Unidade educacional"
        }
        subtitulo={
          unidade
            ? `DRE ${unidade.dre} | Código ${unidade.codigoLotacao}`
            : undefined
        }
        acoes={
          <>
            <Button
              type="default"
              icon={<ArrowBackRoundedIcon fontSize="small" />}
              onClick={estado.voltar}
            >
              Voltar
            </Button>
            <Button
              type="default"
              icon={<FileUploadOutlinedIcon fontSize="small" />}
            >
              Exportar relatório
            </Button>
            {!somenteLeitura ? (
              <>
                <Button
                  type="default"
                  danger
                  icon={<DeleteOutlineIcon fontSize="small" />}
                  onClick={estado.abrirModalExclusao}
                >
                  Excluir UE
                </Button>
                <Button
                  type="primary"
                  disabled={!estado.possuiAlteracoes}
                  loading={estado.salvando}
                  onClick={estado.salvar}
                >
                  Salvar
                </Button>
              </>
            ) : null}
          </>
        }
      />

      <ConteudoPagina>
        {somenteLeitura && versaoVisualizada ? (
          <BannerVersaoHistorica
            data={versaoVisualizada.data}
            aoVoltar={estado.voltarVersaoAtual}
          />
        ) : null}

        <CardInformacoesUnidade estatisticas={unidade?.estatisticas ?? []} />

        <CardComponentesDetalhe
          linhas={estado.linhas}
          opcoesComponente={estado.opcoesComponente}
          componenteSelecionado={estado.componenteSelecionado}
          filtroSituacao={estado.filtroSituacao}
          totalComponentes={estado.totalComponentes}
          componentesExibidos={estado.componentesExibidos}
          carregando={estado.carregando}
          somenteLeitura={somenteLeitura}
          aoSelecionarComponente={estado.selecionarComponente}
          aoSelecionarFiltroSituacao={estado.selecionarFiltroSituacao}
          aoAlterarModulo={estado.alterarModulo}
          aoAbrirLotacao={estado.abrirPainelLotacao}
          aoAbrirAfastados={estado.abrirPainelAfastados}
        />

        <LinhaHistoricoAlteracoes aoAbrir={estado.abrirPainelHistorico} />
      </ConteudoPagina>

      <ModalConfirmacao
        aberto={estado.modalSaidaAberto}
        titulo="Descartar alterações"
        mensagem="Há alterações não salvas nesta unidade educacional. Se sair agora, elas serão perdidas. Tem certeza que deseja continuar?"
        textoConfirmar="Sair sem salvar"
        perigo
        aoConfirmar={estado.confirmarSaida}
        aoCancelar={estado.fecharModalSaida}
      />
    </>
  );
}

export default DetalheUnidadeEducacional;
