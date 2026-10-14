import { useMutation } from "@tanstack/react-query";
import { postNovaSenha } from "@sigla/servicos/recursos/login/novaSenha";
import type { INovaSenhaRequest } from "@sigla/servicos/recursos/login/novaSenha";

export const usePostNovaSenha = () => {
  return useMutation({
    mutationFn: (payload: INovaSenhaRequest) => postNovaSenha(payload).response,
  });
};
