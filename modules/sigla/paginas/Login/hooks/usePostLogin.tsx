import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@sigla/servicos/recursos/login";
import type { ILoginRequest, ILoginResponse } from "@sigla/servicos/recursos/login";

function nomeDoUsuario(data: ILoginResponse): string | undefined {
  return (
    data.usuario?.first_name ??
    data.usuario?.nome ??
    data.usuario?.name ??
    data.first_name ??
    data.nome
  );
}

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (payload: ILoginRequest) => postLogin(payload).response,
    onSuccess: (data) => {
      localStorage.setItem("TOKEN", data.token);
      const usuario = data.login ?? data.codigoRf;
      localStorage.setItem("USUARIO", usuario);
      const nome = nomeDoUsuario(data);
      if (nome) localStorage.setItem("NOME_USUARIO", nome);
    },
  });
};
