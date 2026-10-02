import { z } from "zod";
import { MENSAGENS_VALIDACAO } from "./registrarUnidadeEducacional";

export const MENSAGENS_BUSCA_SERVIDOR = {
  campoObrigatorio: MENSAGENS_VALIDACAO.campoObrigatorio,
  maisDeUmServidor: "Mais de um servidor encontrado. Selecione na lista.",
} as const;

export const termoBuscaServidorSchema = z
  .string()
  .trim()
  .min(1, { message: MENSAGENS_BUSCA_SERVIDOR.campoObrigatorio });

export type ResultadoValidacaoTermo =
  { ok: true; termo: string } | { ok: false; mensagem: string };

export function validarTermoBuscaServidor(
  termo: string,
): ResultadoValidacaoTermo {
  const resultado = termoBuscaServidorSchema.safeParse(termo);

  if (!resultado.success) {
    return {
      ok: false,
      mensagem:
        resultado.error.issues[0]?.message ??
        MENSAGENS_BUSCA_SERVIDOR.campoObrigatorio,
    };
  }

  return { ok: true, termo: resultado.data };
}
