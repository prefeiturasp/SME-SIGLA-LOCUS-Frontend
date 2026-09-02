import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { layout as tokensLayout } from "@/estilos/tokens/tokens";
import { encerrarSessao } from "@/servicos/recursos/autenticacao";
import logoLocus from "@/assets/logo-locus.svg";
import { ITENS_MENU, menuItemAtivo } from "./itens";
import estilos from "./estilos.module.css";

const { Sider } = Layout;

export function MenuLateral() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const itensMenu = useMemo(
    () =>
      ITENS_MENU.map(({ key, label, icone: Icone, path }) => ({
        key: key,
        icon: <Icone fontSize="inherit" />,
        label: label,
        disabled: !path,
        onClick: path ? () => navigate(path) : undefined,
      })),
    [navigate],
  );

  const chaveAtiva = menuItemAtivo(pathname);

  return (
    <Sider
      width={tokensLayout.menuWidth}
      className={estilos.sider}
      theme="dark"
    >
      <div className={estilos.logo}>
        <img src={logoLocus} alt="LOCUS" />
      </div>

      <Menu
        mode="inline"
        theme="dark"
        className={estilos.menu}
        selectedKeys={chaveAtiva ? [chaveAtiva] : []}
        items={itensMenu}
      />

      <div className={estilos.rodapeMenu}>
        <button
          type="button"
          className={estilos.botaoSair}
          onClick={() => encerrarSessao()}
          aria-label="Sair"
        >
          <LogoutOutlinedIcon fontSize="inherit" />
        </button>
      </div>
    </Sider>
  );
}

export default MenuLateral;
