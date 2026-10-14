import { Outlet } from "react-router-dom";
import {
  LayoutConteudo,
  LayoutConteudoInterno,
  LayoutCorpo,
  LayoutRaiz,
} from "@sigla/estilos";

export function LayoutBase() {
  return (
    <LayoutRaiz>
      <LayoutCorpo>
        <LayoutConteudo>
          <LayoutConteudoInterno>
            <Outlet />
          </LayoutConteudoInterno>
        </LayoutConteudo>
      </LayoutCorpo>
    </LayoutRaiz>
  );
}

export default LayoutBase;
