import { Outlet } from "react-router-dom";
import {
  LayoutConteudo,
  LayoutConteudoInterno,
  LayoutCorpo,
  LayoutFooter,
  LayoutHeader,
  LayoutRaiz,
} from "@/estilos";
import { MenuLateral } from "./MenuLateral";
import { RodapeBar } from "./RodapeBar";
import { TopoBar } from "./TopoBar";

export function LayoutBase() {
  return (
    <LayoutRaiz hasSider>
      <MenuLateral />
      <LayoutCorpo>
        <LayoutHeader>
          <TopoBar />
        </LayoutHeader>
        <LayoutConteudo>
          <LayoutConteudoInterno>
            <Outlet />
          </LayoutConteudoInterno>
        </LayoutConteudo>
        <LayoutFooter>
          <RodapeBar />
        </LayoutFooter>
      </LayoutCorpo>
    </LayoutRaiz>
  );
}

export default LayoutBase;
