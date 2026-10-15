import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginRequest } from "@sigla/servicos/recursos/login";
import { CAMINHOS } from "@sigla/rotas/caminhos";
import { schemaLogin } from "../formValidacaoSchema";
import { usePostLogin } from "./usePostLogin";

type AlertaLoginEstado = {
  type: "success" | "error";
  message: string;
  description?: string;
};

export const useLogin = () => {
  const [alert, setAlert] = useState<AlertaLoginEstado | null>(null);
  const navigate = useNavigate();
  const loginMutation = usePostLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  const onFinish = async (values: ILoginRequest) => {
    setAlert(null);

    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate(CAMINHOS.inicio, { replace: true });
      },
      onError: () => {
        setAlert({ type: "error", message: "Usuário ou senha inválidos." });
      },
    });
  };

  return {
    loading: loginMutation.isPending,
    alert,
    fecharAlerta: () => setAlert(null),
    control,
    handleSubmit: handleSubmit(onFinish),
    errors,
  };
};
