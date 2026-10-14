import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaNovaSenha } from "../formValidacaoSchema";
import { usePostNovaSenha } from "./usePostNovaSenha";
import type { INovaSenhaRequest } from "@sigla/servicos/recursos/login/novaSenha";
import { CAMINHOS } from "@sigla/rotas/caminhos";
import type { DadosNovaSenha } from "../formValidacaoSchema";

function mensagemDoErro(erro: unknown, fallback: string): string {
  return erro instanceof Error && erro.message ? erro.message : fallback;
}

export const useNovaSenha = () => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const novaSenhaMutation = usePostNovaSenha();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DadosNovaSenha>({
    resolver: zodResolver(schemaNovaSenha),
    mode: "onChange",
    defaultValues: {
      nova_senha: "",
      confirmar_senha: "",
    },
  });

  const novaSenhaValue = watch("nova_senha");
  const confirmarSenhaValue = watch("confirmar_senha");
  const [digitacaoIniciada, setDigitacaoIniciada] = useState(false);

  useEffect(() => {
    if (novaSenhaValue) setDigitacaoIniciada(true);
  }, [novaSenhaValue]);

  const hasMinLength = Boolean(
    novaSenhaValue && novaSenhaValue.length >= 8 && novaSenhaValue.length <= 12,
  );
  const hasLowerCase = Boolean(novaSenhaValue && /[a-z]/.test(novaSenhaValue));
  const hasUpperCase = Boolean(novaSenhaValue && /[A-Z]/.test(novaSenhaValue));
  const hasNumber = Boolean(novaSenhaValue && /[0-9]/.test(novaSenhaValue));
  const hasSpecialChar = Boolean(
    novaSenhaValue && /[#$@!%&*?]/.test(novaSenhaValue),
  );
  const hasNoSpaces = Boolean(novaSenhaValue && !/\s/.test(novaSenhaValue));
  const hasNoAccents = Boolean(
    novaSenhaValue && !/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(novaSenhaValue),
  );

  const isButtonDisabled =
    !novaSenhaValue ||
    !confirmarSenhaValue ||
    !hasMinLength ||
    !hasLowerCase ||
    !hasUpperCase ||
    !hasNumber ||
    !hasSpecialChar ||
    !hasNoSpaces ||
    !hasNoAccents ||
    novaSenhaValue !== confirmarSenhaValue;

  const onFinish = async (values: DadosNovaSenha) => {
    setAlert(null);

    if (!uid || !token) {
      setAlert({
        type: "error",
        message: "Link de recuperação inválido.",
      });
      return;
    }

    const payload: INovaSenhaRequest = {
      uid,
      token,
      nova_senha: values.nova_senha,
      confirmar_senha: values.confirmar_senha,
    };

    novaSenhaMutation.mutate(payload, {
      onSuccess: () => {
        navigate(CAMINHOS.novaSenhaSucesso);
      },
      onError: (error: unknown) => {
        setAlert({
          type: "error",
          message: mensagemDoErro(
            error,
            "Erro ao alterar senha. Tente novamente.",
          ),
        });
      },
    });
  };

  const handleCancel = () => {
    navigate(CAMINHOS.login);
  };

  return {
    loading: novaSenhaMutation.isPending,
    alert,
    fecharAlerta: () => setAlert(null),
    control,
    handleSubmit: handleSubmit(onFinish),
    errors,
    isButtonDisabled,
    hasMinLength,
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    hasNoSpaces,
    hasNoAccents,
    avaliarRequisitos: digitacaoIniciada,
    handleCancel,
  };
};
