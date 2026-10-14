import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { FormularioLogin } from "./components/FormularioLogin";
import { LoginCard, LoginPagina } from "./Estilos";

export function Login() {
  return (
    <LoginPagina>
      <LoginCard>
        <CabecalhoLogin />
        <FormularioLogin />
      </LoginCard>
    </LoginPagina>
  );
}

export default Login;
