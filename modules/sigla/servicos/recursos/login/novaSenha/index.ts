import type { AxiosRequestConfig } from "axios";
import { httpAdminUsuarios } from "@sigla/servicos/http";
import type { INovaSenhaRequest, INovaSenhaResponse } from "./INovaSenha";

export type { INovaSenhaRequest, INovaSenhaResponse };

export const URL = {
  novaSenha: () => `/api/v1/criar-nova-senha/`,
};

export const postNovaSenha = (
  payload: INovaSenhaRequest,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { signal, abort } = new AbortController();

  const response = httpAdminUsuarios
    .post<INovaSenhaResponse>(URL.novaSenha(), payload, {
      signal,
      ...axiosRequestConfig,
    })
    .then((resposta) => resposta.data);

  return {
    response,
    abort,
  };
};
