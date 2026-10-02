import { z } from "zod";

export const servidorResumoSchema = z.object({
  rf: z.string(),
  nome: z.string(),
  cpf: z.string(),
});
export type ServidorResumo = z.infer<typeof servidorResumoSchema>;

export const listaServidoresSchema = z.array(servidorResumoSchema);
