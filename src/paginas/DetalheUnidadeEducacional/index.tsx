import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, Result } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ModalBase } from "@/componentes/ModalBase";
import { ConteudoPagina } from "@/estilos";
import { CAMINHOS } from "@/rotas/caminhos";
import { BannerVersaoHistorica } from "./componentes/BannerVersaoHistorica";
import { CardComponentesDetalhe } from "./componentes/CardComponentesDetalhe";
import { CardInformacoesUnidade } from "./componentes/CardInformacoesUnidade";
import { LinhaHistoricoAlteracoes } from "./componentes/LinhaHistoricoAlteracoes";
import { PainelHistorico } from "./componentes/PainelHistorico";
import { PainelAfastados } from "./componentes/PainelAfastados";
import { PainelLotacao } from "./componentes/PainelLotacao";
import { UnidadeIndisponivel } from "./componentes/UnidadeIndisponivel";
import { useDetalheUnidade } from "./hooks/useDetalheUnidade";
import { useExportarPdf } from "@/hooks/useExportarPdf";

export function DetalheUnidadeEducacional() {
  const navigate = useNavigate();
  const estado = useDetalheUnidade();
  const { exportarPdf, exportando } = useExportarPdf();
  const refConteudo = useRef<HTMLDivElement>(null);
  const { unidade, somenteLeitura, versaoVisualizada } = estado;

  if (estado.indisponivel) {
    return (
      <>
        <CabecalhoPagina
          titulo="Gestão das unidades educacionais"
          acoes={
            <>
              <Button
                type="primary"
                icon={<AddRoundedIcon fontSize="small" />}
                onClick={() => navigate(CAMINHOS.cadastroRegistrarUE)}
              >
                Registrar UE
              </Button>
              <Button
                type="default"
                icon={<FileUploadOutlinedIcon fontSize="small" />}
              >
                Exportar relatório
              </Button>
            </>
          }
        />

        <ConteudoPagina>
          <UnidadeIndisponivel
            aoAtualizar={() => window.location.reload()}
          />
        </ConteudoPagina>
      </>
    );
  }

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
              loading={exportando}
              onClick={() =>
                exportarPdf(
                  refConteudo,
                  unidade
                    ? `relatorio-ue-${unidade.codigoLotacao}`
                    : "relatorio-ue",
                )
              }
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

      <ConteudoPagina ref={refConteudo}>
        {somenteLeitura && versaoVisualizada ? (
          <BannerVersaoHistorica
            data={versaoVisualizada.data}
            aoVoltar={estado.voltarVersaoAtual}
          />
        ) : null}

        <CardInformacoesUnidade />

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

      <ModalBase
        aberto={estado.modalExclusaoAberto}
        titulo="Excluir Unidade Educacional"
        mensagem="A ação não poderá ser desfeita e as informações serão deletadas. Tem certeza que deseja continuar?"
        textoConfirmar="Excluir UE"
        perigo
        iconeConfirmar={<DeleteOutlineIcon fontSize="small" />}
        confirmando={estado.excluindo}
        aoConfirmar={estado.confirmarExclusao}
        aoCancelar={estado.fecharModalExclusao}
      />

      <ModalBase
        aberto={estado.modalSaidaAberto}
        titulo="As alterações não foram salvas!"
        mensagem="Você fez alterações que ainda não foram salvas. Se sair agora, elas serão perdidas. Tem certeza que deseja continuar?"
        textoCancelar="Continuar editando"
        textoConfirmar="Sair sem salvar"
        aoConfirmar={estado.confirmarSaida}
        aoCancelar={estado.fecharModalSaida}
        textoAcaoExtra="Salvar"
        aoAcaoExtra={estado.salvarESair}
        confirmandoAcaoExtra={estado.salvando}
      />

      <PainelHistorico
        aberto={estado.painelHistoricoAberto}
        registros={estado.historico}
        aoFechar={estado.fecharPainelHistorico}
        aoVisualizar={estado.visualizarVersao}
      />

      <PainelLotacao
        aberto={estado.painelProfessores?.tipo === "lotacao"}
        codigoLotacao={unidade?.codigoLotacao ?? ""}
        componenteId={estado.painelProfessores?.componente.id}
        nomeComponente={estado.painelProfessores?.componente.componente}
        aoFechar={estado.fecharPainelProfessores}
      />

      <PainelAfastados
        aberto={estado.painelProfessores?.tipo === "afastados"}
        codigoLotacao={unidade?.codigoLotacao ?? ""}
        componenteId={estado.painelProfessores?.componente.id}
        nomeComponente={estado.painelProfessores?.componente.componente}
        aoFechar={estado.fecharPainelProfessores}
      />
    </>
  );
}

export default DetalheUnidadeEducacional;
