import { z } from "zod";

export const servidorResumoSchema = z.object({
  rf: z.string(),
  nome: z.string(),
  cpf: z.string(),
});
export type ServidorResumo = z.infer<typeof servidorResumoSchema>;

export const listaServidoresSchema = z.array(servidorResumoSchema);

export class ServidorNaoEncontradoError extends Error {
  readonly codigo = "SERVIDOR_NAO_ENCONTRADO" as const;

  constructor(mensagem = "Servidor não encontrado") {
    super(mensagem);
    this.name = "ServidorNaoEncontradoError";
  }
}
