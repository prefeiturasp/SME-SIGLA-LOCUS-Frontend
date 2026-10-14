import { z } from "zod";

const mensagemObrigatorio = "Insira um RF ou e-mail válido";

export const schemaLogin = z.object({
  usuario: z
    .string()
    .min(1, mensagemObrigatorio)
    .regex(/^\d+$/, "RF deve conter apenas números"),
  senha: z.string().min(1, "Campo obrigatório"),
});

export const schemaEsqueceuSenha = z.object({
  rf: z
    .string()
    .min(1, mensagemObrigatorio)
    .superRefine((valor, ctx) => {
      const texto = valor.trim();

      if (/^\d+$/.test(texto)) return;

      if (/^\d/.test(texto)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Digite um RF ou e-mail válido.",
        });
        return;
      }

      const emailValido = z.string().email().safeParse(texto).success;
      if (!emailValido) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Digite um RF ou e-mail válido.",
        });
      }
    }),
});

export const schemaNovaSenha = z
  .object({
    nova_senha: z
      .string()
      .min(1, "Campo obrigatório")
      .min(8, "A senha deve ter entre 8 e 12 caracteres")
      .max(12, "A senha deve ter entre 8 e 12 caracteres")
      .regex(/[a-z]/, "Ao menos uma letra minúscula")
      .regex(/[A-Z]/, "Ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Ao menos um caracter numérico")
      .regex(/[#$@!%&*?]/, "Ao menos um caracter especial (#$@!%&*?)")
      .refine((value) => !/\s/.test(value), "Não deve conter espaços em branco")
      .refine(
        (value) => !/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(value),
        "Não deve conter caracteres acentuados",
      ),
    confirmar_senha: z.string().min(1, "Campo obrigatório"),
  })
  .refine((dados) => dados.nova_senha === dados.confirmar_senha, {
    message: "As senhas não coincidem",
    path: ["confirmar_senha"],
  });

export type DadosLogin = z.infer<typeof schemaLogin>;
export type DadosEsqueceuSenha = z.infer<typeof schemaEsqueceuSenha>;
export type DadosNovaSenha = z.infer<typeof schemaNovaSenha>;
