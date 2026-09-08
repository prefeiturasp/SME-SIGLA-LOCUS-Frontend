import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { DetalheUnidadeEducacional } from "@/paginas/DetalheUnidadeEducacional";
import { GestaoUnidadesEducacionais } from "@/paginas/GestaoUnidadesEducacionais";
import { RegistrarUnidadeEducacional } from "@/paginas/RegistrarUnidadeEducacional";
import { NaoEncontrado } from "@/paginas/NaoEncontrado";
import { CAMINHOS } from "./caminhos";

export function RotasApp() {
  return (
    <Routes>
      <Route element={<LayoutBase />}>
        <Route
          path={CAMINHOS.cadastroGestaoUnidades}
          element={<GestaoUnidadesEducacionais />}
        />
        <Route
          path={CAMINHOS.cadastroRegistrarUE}
          element={<RegistrarUnidadeEducacional />}
        />
        <Route
          path={CAMINHOS.cadastroDetalheUE}
          element={<DetalheUnidadeEducacional />}
        />
        <Route
          index
          element={
            <Navigate to={CAMINHOS.cadastroGestaoUnidades} replace />
          }
        />
      </Route>
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}

export default RotasApp;
