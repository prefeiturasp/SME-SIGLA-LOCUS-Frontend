import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/estilos/global/global.css";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error('Elemento "#root" nao encontrado no index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
