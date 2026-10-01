import { useMemo } from "react";
import type { MenuProps } from "antd";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PainelSubmenuDrawer, PainelSubmenuMenu } from "@/estilos";
import { layout } from "@/estilos/tokens/tokens";
import { localizarSubitemAtivo, type SubitemMenu } from "./MenuLateral.itens";

type ItemMenuAntd = Required<MenuProps>["items"][number];

export interface PainelSubmenuProps {
  aberto: boolean;
  titulo: string;
  itens: SubitemMenu[];
  caminhoAtual: string;
  aoNavegar: (path: string) => void;
  aoFechar: () => void;
}

function paraItensDoMenu(itens: SubitemMenu[]): ItemMenuAntd[] {
  return itens.map(({ key, label, path, filhos }) =>
    filhos
      ? {
          key,
          label,
          disabled: filhos.length === 0,
          children: paraItensDoMenu(filhos),
        }
      : { key, label, disabled: !path },
  );
}

function caminhosPorChave(
  itens: SubitemMenu[],
  mapa = new Map<string, string>(),
): Map<string, string> {
  for (const { key, path, filhos } of itens) {
    if (path) mapa.set(key, path);
    if (filhos) caminhosPorChave(filhos, mapa);
  }
  return mapa;
}

/* Sem animacao: o deslize padrao do Drawer passava por cima do menu lateral,
   e os grupos abrem e fecham na hora. */
const SEM_ANIMACAO = {
  motionAppear: false,
  motionEnter: false,
  motionLeave: false,
};

/** Painel aberto ao lado do menu lateral, abaixo do cabeçalho. */
export function PainelSubmenu({
  aberto,
  titulo,
  itens,
  caminhoAtual,
  aoNavegar,
  aoFechar,
}: PainelSubmenuProps) {
  const itensMenu = useMemo(() => paraItensDoMenu(itens), [itens]);
  const caminhos = useMemo(() => caminhosPorChave(itens), [itens]);
  const ativo = localizarSubitemAtivo(itens, caminhoAtual);

  return (
    <PainelSubmenuDrawer
      open={aberto}
      placement="left"
      width={layout.submenuWidth}
      title={titulo}
      closable={false}
      destroyOnHidden
      onClose={aoFechar}
      rootStyle={{ top: layout.headerHeight, left: layout.menuWidth }}
      styles={{ mask: { background: "transparent" } }}
      motion={SEM_ANIMACAO}
      maskMotion={SEM_ANIMACAO}
    >
      <PainelSubmenuMenu
        mode="inline"
        motion={SEM_ANIMACAO}
        inlineIndent={layout.submenuIndent}
        items={itensMenu}
        selectedKeys={ativo ? [ativo.chave] : []}
        defaultOpenKeys={ativo?.chavesPais}
        expandIcon={({ isOpen }) =>
          isOpen ? (
            <ExpandLessIcon fontSize="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="inherit" />
          )
        }
        onClick={({ key }) => {
          const path = caminhos.get(key);
          if (path) aoNavegar(path);
        }}
      />
    </PainelSubmenuDrawer>
  );
}

export default PainelSubmenu;
