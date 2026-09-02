import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { breadcrumbDaRota } from "@/rotas/caminhos";
import { useUsuarioLogado } from "@/hooks/useUsuarioLogado";
import { encerrarSessao } from "@/servicos/recursos/autenticacao";
import brasaoPrefeitura from "@/assets/prefeitura-sao-paulo.png";
import estilos from "./estilos.module.css";

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
    <div className={estilos.topo}>
      <div className={estilos.esquerda}>
        <img
          className={estilos.brasao}
          src={brasaoPrefeitura}
          alt="Prefeitura de São Paulo"
        />
        <Breadcrumb
          className={estilos.breadcrumb}
          separator=">"
          items={itensBreadcrumb}
        />
      </div>

      <div className={estilos.direita}>
        <div className={estilos.usuario}>
          <span className={estilos.usuarioRf}>RF: {usuario.rf}</span>
          <span className={estilos.usuarioNome}>{usuario.nome}</span>
        </div>
        <button
          type="button"
          className={estilos.botaoSair}
          onClick={aoSair}
          aria-label="Sair"
        >
          <span className={estilos.iconeSair} aria-hidden>
            <PowerSettingsNewOutlinedIcon fontSize="inherit" />
          </span>
          Sair
        </button>
      </div>
    </div>
  );
}

export default TopoBar;
