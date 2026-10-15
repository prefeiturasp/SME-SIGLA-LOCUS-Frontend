import { Providers } from "./providers";
import { RotasApp } from "@sigla/rotas";

/** Entrada temporaria do Sigla montada em /sigla no Locus. */
export function SiglaApp() {
  return (
    <Providers>
      <RotasApp />
    </Providers>
  );
}

export default SiglaApp;
