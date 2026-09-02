import brasaoPrefeitura from "@/assets/prefeitura-sao-paulo.png";
import estilos from "./estilos.module.css";

export const VERSAO_SISTEMA = "v2.3";

export function RodapeBar() {
  return (
    <div className={estilos.rodape}>
      <img
        className={estilos.brasao}
        src={brasaoPrefeitura}
        alt="Prefeitura de São Paulo"
      />
      <span className={estilos.versao}>
        Versão {VERSAO_SISTEMA} - Homologada para Google Chrome e Firefox.
      </span>
    </div>
  );
}

export default RodapeBar;
