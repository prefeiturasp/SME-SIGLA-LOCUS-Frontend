export interface ILoginRequest {
  usuario: string;
  senha: string;
}

export interface ILoginResponse {
  token: string;
  codigoRf: string;
  login?: string;
  nome?: string;
  first_name?: string;
  usuario: {
    id: string;
    nome?: string;
    first_name?: string;
    name?: string;
    email?: string;
  };
}
