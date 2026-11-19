export function hidratarEnvLocal(): void {
  if (typeof window === "undefined") return;

  window.__ENV__ = {
    ...(window.__ENV__ ?? {}),
    ENVIRONMENT:
      import.meta.env.ENVIRONMENT || window.__ENV__?.ENVIRONMENT || "",
    SIGLA_URL: import.meta.env.SIGLA_URL || window.__ENV__?.SIGLA_URL || "",
  };
}
