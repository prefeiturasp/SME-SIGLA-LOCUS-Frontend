import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CabecalhoPagina } from "@/componentes/CabecalhoPagina";
import { EstadoErroPagina } from "@/componentes/EstadoErroPagina";
import { ConteudoPagina } from "@/estilos";
import { CAMINHOS } from "@/rotas/caminhos";

export function NaoEncontrado() {
  const navigate = useNavigate();

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
        <EstadoErroPagina
          titulo="Não encontramos esta página..."
          descricao="A página que você procura não está disponível ou o endereço pode estar incorreto. Volte à tela inicial para continuar."
          acao={
            <Button
              type="primary"
              icon={<HomeOutlinedIcon fontSize="small" />}
              onClick={() => navigate(CAMINHOS.cadastroGestaoUnidades)}
            >
              Ir para tela inicial
            </Button>
          }
        />
      </ConteudoPagina>
    </>
  );
}

export default NaoEncontrado;
