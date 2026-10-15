export type IEsqueceuSenhaRequest = { rf: string } | { email: string };

export interface IEsqueceuSenhaResponse {
  success: boolean;
  message: string;
  email?: string;
  usuario?: string;
  timestamp?: string;
}
