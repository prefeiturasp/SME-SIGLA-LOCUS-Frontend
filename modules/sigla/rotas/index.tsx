import { Navigate, Route, Routes } from "react-router-dom";
import { EsqueceuSenhaSucesso } from "@sigla/paginas/Login/EsqueceuSenhaSucesso";
import { EsqueceuSenhaTela } from "@sigla/paginas/Login/EsqueceuSenhaTela";
import { Login } from "@sigla/paginas/Login";
import { NovaSenhaSucesso } from "@sigla/paginas/Login/NovaSenhaSucesso";
import { NovaSenhaTela } from "@sigla/paginas/Login/NovaSenhaTela";
import { SelecaoSistemas } from "@sigla/paginas/SelecaoSistemas";
import { estaAutenticado } from "@sigla/servicos/recursos/autenticacao";
import { RotaProtegida, RotaPublicaSomenteDeslogado } from "./AuthGuard";
import { CAMINHOS, ROTAS_RELATIVAS } from "./caminhos";

export function RotasApp() {
  return (
    <Routes>
      <Route
        index
        element={
          <RotaProtegida>
            <SelecaoSistemas />
          </RotaProtegida>
        }
      />
      <Route
        path={ROTAS_RELATIVAS.login}
        element={
          <RotaPublicaSomenteDeslogado>
            <Login />
          </RotaPublicaSomenteDeslogado>
        }
      />
      <Route
        path={ROTAS_RELATIVAS.esqueciSenha}
        element={<EsqueceuSenhaTela />}
      />
      <Route
        path={ROTAS_RELATIVAS.esqueciSenhaSucesso}
        element={<EsqueceuSenhaSucesso />}
      />
      <Route
        path={ROTAS_RELATIVAS.criarNovaSenha}
        element={<NovaSenhaTela />}
      />
      <Route
        path={ROTAS_RELATIVAS.novaSenhaSucesso}
        element={<NovaSenhaSucesso />}
      />
      <Route
        path="*"
        element={
          <Navigate
            to={estaAutenticado() ? CAMINHOS.inicio : CAMINHOS.login}
            replace
          />
        }
      />
    </Routes>
  );
}

export default RotasApp;
