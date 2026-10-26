import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutBase } from "@/componentes/layout/LayoutBase";
import { AtualizacaoServidorRF } from "@/paginas/AtualizacaoServidorRF";
import { AtualizacaoServidorVacanciado } from "@/paginas/AtualizacaoServidorVacanciado";
import { BuscaServidorRF } from "@/paginas/BuscaServidorRF";
import { BuscaServidorVacanciado } from "@/paginas/BuscaServidorVacanciado";
import { DetalheUnidadeEducacional } from "@/paginas/DetalheUnidadeEducacional";
import { GestaoUnidadesEducacionais } from "@/paginas/GestaoUnidadesEducacionais";
import { RegistrarUnidadeEducacional } from "@/paginas/RegistrarUnidadeEducacional";
import { NaoEncontrado } from "@/paginas/NaoEncontrado";
import { SiglaApp } from "../../modules/sigla/app/App";
import { CAMINHOS } from "./caminhos";

export function RotasApp() {
  return (
    <Routes>
      <Route path="/sigla/*" element={<SiglaApp />} />
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
          path={CAMINHOS.cadastroAtualizacaoRF}
          element={<BuscaServidorRF />}
        />
        <Route
          path={CAMINHOS.cadastroAtualizacaoRegistroFuncional}
          element={<AtualizacaoServidorRF />}
        />
        <Route
          path={CAMINHOS.cadastroAtualizacaoVacancia}
          element={<BuscaServidorVacanciado />}
        />
        <Route
          path={CAMINHOS.cadastroAtualizacaoVacanciaServidor}
          element={<AtualizacaoServidorVacanciado />}
        />
        <Route
          index
          element={<Navigate to={CAMINHOS.cadastroGestaoUnidades} replace />}
        />
        <Route path={CAMINHOS.naoEncontrado} element={<NaoEncontrado />} />
        <Route
          path="*"
          element={<Navigate to={CAMINHOS.naoEncontrado} replace />}
        />
      </Route>
    </Routes>
  );
}

export default RotasApp;
