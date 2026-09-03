import logoPrefSP from "@/assets/logo_PrefSP_sem fundo_horizontal_preto_monocromático 1.png";
import { Rodape, RodapeBrasao, RodapeVersao } from "@/estilos";

export const VERSAO_SISTEMA = "v2.3";

export function RodapeBar() {
  return (
    <Rodape>
      <RodapeBrasao src={logoPrefSP} alt="Prefeitura de São Paulo" />
      <RodapeVersao>
        Versão {VERSAO_SISTEMA} - Homologada para Google Chrome e Firefox.
      </RodapeVersao>
    </Rodape>
  );
}

export default RodapeBar;
