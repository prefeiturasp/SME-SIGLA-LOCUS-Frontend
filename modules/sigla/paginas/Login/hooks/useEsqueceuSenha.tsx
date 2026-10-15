import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaEsqueceuSenha,
  type DadosEsqueceuSenha,
} from "../formValidacaoSchema";
import { usePostEsqueceuSenha } from "./usePostEsqueceuSenha";
import type {
  IEsqueceuSenhaRequest,
  IEsqueceuSenhaResponse,
} from "@sigla/servicos/recursos/login/esqueceuSenha";
import { CAMINHOS } from "@sigla/rotas/caminhos";

type AlertaEsqueceuSenha = {
  type: "success" | "error";
  message: string;
  description?: string;
};

function mensagemDoErro(erro: unknown, fallback: string): string {
  return erro instanceof Error && erro.message ? erro.message : fallback;
}

function payloadEsqueceuSenha(valor: string): IEsqueceuSenhaRequest {
  const texto = valor.trim();
  if (/^\d+$/.test(texto)) {
    return { rf: texto };
  }
  return { email: texto };
}

function alertaUsuarioNaoEncontrado(
  payload: IEsqueceuSenhaRequest,
): AlertaEsqueceuSenha {
  if ("rf" in payload) {
    return {
      type: "error",
      message: "Usuário não encontrado!",
      description:
        "Verifique se o RF digitado está correto e tente novamente.",
    };
  }

  return {
    type: "error",
    message: "E-mail não encontrado!",
    description:
      "Verifique se o e-mail digitado está correto e tente novamente.",
  };
}

function ehUsuarioNaoEncontrado(erro: unknown): boolean {
  if (!isAxiosError(erro) || erro.response?.status !== 404) return false;
  const detalhe = (erro.response.data as { detail?: string } | undefined)
    ?.detail;
  return detalhe === "Usuário não encontrado";
}

export const useEsqueceuSenha = () => {
  const [alert, setAlert] = useState<AlertaEsqueceuSenha | null>(null);
  const navigate = useNavigate();
  const esqueceuSenhaMutation = usePostEsqueceuSenha();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DadosEsqueceuSenha>({
    resolver: zodResolver(schemaEsqueceuSenha),
    mode: "onChange",
    defaultValues: {
      rf: "",
    },
  });

  const isButtonDisabled = !isValid;

  const onFinish = async (values: DadosEsqueceuSenha) => {
    setAlert(null);
    const payload = payloadEsqueceuSenha(values.rf);

    esqueceuSenhaMutation.mutate(payload, {
      onSuccess: (data: IEsqueceuSenhaResponse) => {
        navigate(CAMINHOS.esqueciSenhaSucesso, {
          state: {
            usuarioEmail: data?.email,
            usuarioRf: data?.usuario,
          },
        });
      },
      onError: (error: unknown) => {
        if (ehUsuarioNaoEncontrado(error)) {
          setAlert(alertaUsuarioNaoEncontrado(payload));
          return;
        }

        setAlert({
          type: "error",
          message: mensagemDoErro(
            error,
            "Erro ao enviar e-mail de recuperação. Tente novamente.",
          ),
        });
      },
    });
  };

  const handleBackToLogin = () => {
    navigate(CAMINHOS.login);
  };

  return {
    loading: esqueceuSenhaMutation.isPending,
    alert,
    fecharAlerta: () => setAlert(null),
    control,
    handleSubmit: handleSubmit(onFinish),
    errors,
    isButtonDisabled,
    handleBackToLogin,
  };
};
