import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { useExportarXlsx } from "@/hooks/useExportarXlsx";
import { useNotificacao } from "@/hooks/useNotificacao";
import { ConteudoPagina } from "@/estilos";
import { CAMINHOS, caminhoDetalheUE } from "@/rotas/caminhos";
import { opcoesComponenteCurricular } from "./dados/dadosEstaticos";
import { montarAbaRelatorioUnidades } from "./dados/montarPlanilhaUnidades";
import { useGestaoUnidades } from "./hooks/useGestaoUnidades";
import { CardComponenteCurricular } from "./componentes/CardComponenteCurricular";
import { CardFormFiltrosUnidades } from "./componentes/CardFormFiltrosUnidades";
import { TabelaUnidades } from "./componentes/TabelaUnidades";

export function GestaoUnidadesEducacionais() {
  const navigate = useNavigate();
  const { exportarAbasXlsx, exportando } = useExportarXlsx();
  const notificacao = useNotificacao();
  const {
    unidades,
    total,
    componenteSelecionado,
    statusListagem,
    carregando,
    selecionarComponente,
    aplicarFiltros,
    limparFiltros,
  } = useGestaoUnidades();

  const aoExportarRelatorio = useCallback(async () => {
    try {
      const exportou = await exportarAbasXlsx(
        [montarAbaRelatorioUnidades(unidades)],
        "relatorio-gestao-unidades",
      );
      if (!exportou) return;

      notificacao.sucesso({
        titulo: "Sucesso!",
        texto: "O relatório foi baixado.",
      });
    } catch {
      notificacao.erro({
        titulo: "Erro!",
        texto:
          "Não conseguimos baixar o relatório. Por favor, tente novamente!",
      });
    }
  }, [exportarAbasXlsx, notificacao, unidades]);

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
              loading={exportando}
              onClick={aoExportarRelatorio}
            >
              Exportar relatório
            </Button>
          </>
        }
      />

      <ConteudoPagina>
        <CardComponenteCurricular
          opcoesComponente={opcoesComponenteCurricular}
          componenteSelecionado={componenteSelecionado}
          aoSelecionarComponente={selecionarComponente}
        />

        <CardFormFiltrosUnidades
          aoBuscar={aplicarFiltros}
          aoLimpar={limparFiltros}
        />

        <TabelaUnidades
          unidades={unidades}
          total={total}
          carregando={carregando}
          statusListagem={statusListagem}
          aoSelecionarUnidade={(unidade) =>
            navigate(caminhoDetalheUE(unidade.codigoLotacao))
          }
          aoRegistrar={() => navigate(CAMINHOS.cadastroRegistrarUE)}
        />
      </ConteudoPagina>
    </>
  );
}

export default GestaoUnidadesEducacionais;
