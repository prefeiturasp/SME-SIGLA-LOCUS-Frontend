import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

function normalizarBase(valor: string | undefined): string {
  const base = (valor || "/").trim() || "/";
  if (base === "/") return "/";
  const comBarra = base.startsWith("/") ? base : `/${base}`;
  return comBarra.endsWith("/") ? comBarra : `${comBarra}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("VITE_BASE_PATH", env.VITE_BASE_PATH);
  return {
    // Path publico da app (ex.: /locus/ em QA). Afeta assets e import.meta.env.BASE_URL.
    base: normalizarBase(env.VITE_BASE_PATH),
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
