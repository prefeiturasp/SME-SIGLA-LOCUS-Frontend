import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import {
  ConteudoPagina,
  PrimaryButton,
  SecondaryButton,
} from "@/estilos";
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
            <PrimaryButton
              icon={<AddRoundedIcon fontSize="small" />}
              onClick={() => navigate(CAMINHOS.cadastroRegistrarUE)}
            >
              Registrar UE
            </PrimaryButton>
            <SecondaryButton
              icon={<FileUploadOutlinedIcon fontSize="small" />}
            >
              Exportar relatório
            </SecondaryButton>
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
