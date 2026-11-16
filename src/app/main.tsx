import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { hidratarEnvLocal } from "@/config/hidratarEnvLocal";
import { aplicarSessaoDaQuery } from "@/servicos/recursos/autenticacao";
import { App } from "./App";

hidratarEnvLocal();
aplicarSessaoDaQuery();

const container = document.getElementById("root");
if (!container) {
  throw new Error('Elemento "#root" nao encontrado no index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
