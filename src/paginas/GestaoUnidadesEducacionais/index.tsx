import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { ConteudoPagina } from "@/estilos";
import { CAMINHOS } from "@/rotas/caminhos";
import { opcoesComponenteCurricular } from "./dados/dadosEstaticos";
import { useGestaoUnidades } from "./hooks/useGestaoUnidades";
import { CardComponenteCurricular } from "./componentes/CardComponenteCurricular";
import { CardFormFiltrosUnidades } from "./componentes/CardFormFiltrosUnidades";
import { TabelaUnidades } from "./componentes/TabelaUnidades";

export function GestaoUnidadesEducacionais() {
  const navigate = useNavigate();
  const {
    unidades,
    total,
    painel,
    componenteSelecionado,
    carregando,
    selecionarComponente,
    aplicarFiltros,
    limparFiltros,
  } = useGestaoUnidades();

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
        <CardComponenteCurricular
          estatisticas={painel?.estatisticas ?? []}
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
        />
      </ConteudoPagina>
    </>
  );
}

export default GestaoUnidadesEducacionais;
