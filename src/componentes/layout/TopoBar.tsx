import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import brasaoPrefeitura from "@/assets/prefeitura-sao-paulo.png";
import {
  BotaoSairTopo,
  BreadcrumbTopo,
  Topo,
  TopoBrasao,
  TopoDireita,
  TopoEsquerda,
  TopoIconeSair,
  TopoUsuario,
  TopoUsuarioNome,
  TopoUsuarioRf,
} from "@/estilos";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";
import { encerrarSessao } from "@/servicos/recursos/autenticacao";
import { breadcrumbDaRota } from "@/rotas/caminhos";

export interface TopoBarProps {
  aoSair?: () => void;
}

export function TopoBar({ aoSair = () => encerrarSessao() }: TopoBarProps) {
  const { pathname } = useLocation();
  const usuario = useUsuarioLogado();

  const itensBreadcrumb = useMemo(
    () =>
      breadcrumbDaRota(pathname).map((item) => ({
        title: item.caminho ? (
          <Link to={item.caminho}>{item.titulo}</Link>
        ) : (
          item.titulo
        ),
      })),
    [pathname],
  );

  return (
    <Topo>
      <TopoEsquerda>
        <TopoBrasao src={brasaoPrefeitura} alt="Prefeitura de São Paulo" />
        <BreadcrumbTopo separator=">" items={itensBreadcrumb} />
      </TopoEsquerda>

      <TopoDireita>
        <TopoUsuario>
          <TopoUsuarioRf>RF: {usuario.rf}</TopoUsuarioRf>
          <TopoUsuarioNome>{usuario.nome}</TopoUsuarioNome>
        </TopoUsuario>
        <BotaoSairTopo type="button" onClick={aoSair} aria-label="Sair">
          <TopoIconeSair aria-hidden>
            <PowerSettingsNewOutlinedIcon fontSize="inherit" />
          </TopoIconeSair>
          Sair
        </BotaoSairTopo>
      </TopoDireita>
    </Topo>
  );
}

export default TopoBar;
