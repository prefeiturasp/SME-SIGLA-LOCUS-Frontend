/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_LOCUS_API_URL?: string;
  readonly VITE_BASE_PATH?: string;
  /** Somente uso local: quando "local", aplica sessão via query string. */
  readonly ENVIRONMENT?: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __ENV__?: Record<string, string>;
}
