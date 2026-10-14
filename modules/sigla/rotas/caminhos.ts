import { SIGLA_BASENAME } from "@sigla/base";

/**
 * Paths relativos a `/sigla/*` (usar em `<Route path>`).
 * `navigate` e redirects usam `CAMINHOS` (absolutos no router do Locus).
 */
export const ROTAS_RELATIVAS = {
  login: "login",
  esqueciSenha: "esqueci-minha-senha",
  esqueciSenhaSucesso: "esqueci-minha-senha-sucesso",
  criarNovaSenha: "criar-nova-senha/:uid/:token",
  novaSenhaSucesso: "senha-alterada",
} as const;

export const CAMINHOS = {
  inicio: SIGLA_BASENAME,
  login: `${SIGLA_BASENAME}/${ROTAS_RELATIVAS.login}`,
  esqueciSenha: `${SIGLA_BASENAME}/${ROTAS_RELATIVAS.esqueciSenha}`,
  esqueciSenhaSucesso: `${SIGLA_BASENAME}/${ROTAS_RELATIVAS.esqueciSenhaSucesso}`,
  criarNovaSenha: `${SIGLA_BASENAME}/${ROTAS_RELATIVAS.criarNovaSenha}`,
  novaSenhaSucesso: `${SIGLA_BASENAME}/${ROTAS_RELATIVAS.novaSenhaSucesso}`,
} as const;

export type Caminho = (typeof CAMINHOS)[keyof typeof CAMINHOS];
