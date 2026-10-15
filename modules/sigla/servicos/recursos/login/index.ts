import type { AxiosRequestConfig } from "axios";
import { httpAdminUsuarios } from "../../http";
import type { ILoginRequest, ILoginResponse } from "./ILogin";

export type { ILoginRequest, ILoginResponse };

export const URL = {
  login: () => `/api/v1/login/`,
};

export const postLogin = (
  payload: ILoginRequest,
  axiosRequestConfig?: AxiosRequestConfig,
) => {
  const { signal, abort } = new AbortController();

  const response = httpAdminUsuarios
    .post<ILoginResponse>(URL.login(), payload, {
      signal,
      ...axiosRequestConfig,
    })
    .then((resposta) => resposta.data);

  return {
    response,
    abort,
  };
};
