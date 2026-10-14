import type { AxiosRequestConfig } from "axios";
import { httpAdminUsuarios } from "@sigla/servicos/http";
import type {
  IEsqueceuSenhaRequest,
  IEsqueceuSenhaResponse,
} from "./IEsqueceuSenha";

export type { IEsqueceuSenhaRequest, IEsqueceuSenhaResponse };

export const URL = {
  esqueceuSenha: () => `/api/v1/esqueci-minha-senha/`,
};

export const postEsqueceuSenha = (
  payload: IEsqueceuSenhaRequest,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { signal, abort } = new AbortController();

  const response = httpAdminUsuarios
    .post<IEsqueceuSenhaResponse>(URL.esqueceuSenha(), payload, {
      signal,
      ...axiosRequestConfig,
    })
    .then((resposta) => resposta.data);

  return {
    response,
    abort,
  };
};
