import { Navigate } from "react-router-dom";
import { estaAutenticado } from "@sigla/servicos/recursos/autenticacao";
import { CAMINHOS } from "./caminhos";

interface AuthGuardProps {
  children: React.ReactNode;
}

/** Exige TOKEN; sem autenticação redireciona para /login. */
export function RotaProtegida({ children }: AuthGuardProps) {
  if (!estaAutenticado()) {
    return <Navigate to={CAMINHOS.login} replace />;
  }

  return <>{children}</>;
}

/** Para telas publicas (login): se ja autenticado, vai para /. */
export function RotaPublicaSomenteDeslogado({ children }: AuthGuardProps) {
  if (estaAutenticado()) {
    return <Navigate to={CAMINHOS.inicio} replace />;
  }

  return <>{children}</>;
}

export default RotaProtegida;
