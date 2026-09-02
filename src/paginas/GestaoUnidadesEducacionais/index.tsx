import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button } from "antd";
import { CabecalhoPagina } from "@/componentes/ui/CabecalhoPagina";
import { opcoesComponenteCurricular } from "./dados/dadosEstaticos";
import { useGestaoUnidades } from "./hooks/useGestaoUnidades";
import { CardComponenteCurricular } from "./componentes/CardComponenteCurricular";
import { CardFormFiltrosUnidades } from "./componentes/CardFormFiltrosUnidades";
import { TabelaUnidades } from "./componentes/TabelaUnidades";

export function GestaoUnidadesEducacionais() {
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "16px 32px",
        }}
      >
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
      </div>
    </>
  );
}

export default GestaoUnidadesEducacionais;
