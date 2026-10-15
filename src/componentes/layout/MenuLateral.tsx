import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logoLocus from "@/assets/logo-locus.svg";
import {
  BotaoSairMenu,
  MenuLateralMenu,
  MenuLogo,
  MenuLogoImagem,
  MenuRodape,
  MenuSider,
} from "@/estilos";
import { layout as tokensLayout } from "@/estilos/tokens/tokens";
import { encerrarSessao } from "@/servicos/recursos/autenticacao";
import { ITENS_MENU, menuItemAtivo } from "./MenuLateral.itens";
import { PainelSubmenu } from "./PainelSubmenu";

export function MenuLateral() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [chavePainel, setChavePainel] = useState<string>();
  const [rotaAnterior, setRotaAnterior] = useState(pathname);

  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setChavePainel(undefined);
  }

  const fecharPainel = useCallback(() => setChavePainel(undefined), []);

  const alternarPainel = useCallback((chave: string) => {
    setChavePainel((atual) => (atual === chave ? undefined : chave));
  }, []);

  const navegar = useCallback(
    (path: string) => {
      fecharPainel();
      navigate(path);
    },
    [fecharPainel, navigate],
  );

  const itensMenu = useMemo(
    () =>
      ITENS_MENU.map(({ key, label, icone: Icone, path, submenu }) => ({
        key: key,
        icon: <Icone fontSize="inherit" />,
        label: label,
        disabled: !path && !submenu,
        onClick: submenu
          ? () => alternarPainel(key)
          : path
            ? () => navegar(path)
            : undefined,
      })),
    [alternarPainel, navegar],
  );

  const chaveAtiva = chavePainel ?? menuItemAtivo(pathname);
  const itemDoPainel = ITENS_MENU.find((item) => item.key === chavePainel);

  return (
    <MenuSider width={tokensLayout.menuWidth}>
      <MenuLogo>
        <MenuLogoImagem src={logoLocus} alt="Locus" />
      </MenuLogo>

      <MenuLateralMenu
        mode="inline"
        selectedKeys={chaveAtiva ? [chaveAtiva] : []}
        items={itensMenu}
      />

      <MenuRodape>
        <BotaoSairMenu
          type="button"
          onClick={() => encerrarSessao()}
          aria-label="Sair"
        >
          <LogoutOutlinedIcon fontSize="inherit" />
        </BotaoSairMenu>
      </MenuRodape>

      <PainelSubmenu
        aberto={Boolean(itemDoPainel)}
        titulo={itemDoPainel?.label ?? ""}
        itens={itemDoPainel?.submenu ?? []}
        caminhoAtual={pathname}
        aoNavegar={navegar}
        aoFechar={fecharPainel}
      />
    </MenuSider>
  );
}

export default MenuLateral;
