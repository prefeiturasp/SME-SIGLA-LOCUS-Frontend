import logoPrefeitura from "@sigla/assets/logo-prefeitura.png";
import { LoginRodape, LogoPrefeitura } from "../Estilos";

type RodapePrefeituraProps = {
  solto?: boolean;
  compacto?: boolean;
  perto?: boolean;
};

export function RodapePrefeitura({
  solto = false,
  compacto = false,
  perto = false,
}: RodapePrefeituraProps) {
  return (
    <LoginRodape $solto={solto} $compacto={compacto} $perto={perto}>
      <LogoPrefeitura src={logoPrefeitura} alt="Prefeitura de São Paulo" />
    </LoginRodape>
  );
}

export default RodapePrefeitura;
