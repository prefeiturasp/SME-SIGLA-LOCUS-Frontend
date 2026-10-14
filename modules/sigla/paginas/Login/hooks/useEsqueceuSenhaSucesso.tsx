import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CAMINHOS } from "@sigla/rotas/caminhos";

type EstadoSucesso = {
  usuarioEmail?: string;
  usuarioRf?: string;
};

export const useEsqueceuSenhaSucesso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const estado = (location.state ?? {}) as EstadoSucesso;
  const [alertaVisivel, setAlertaVisivel] = useState(true);

  const usuarioEmail = estado.usuarioEmail;
  const usuarioRf = estado.usuarioRf;

  useEffect(() => {
    if (!usuarioRf && !usuarioEmail) {
      navigate(CAMINHOS.login);
    }
  }, [usuarioRf, usuarioEmail, navigate]);

  const handleBackToLogin = () => {
    navigate(CAMINHOS.login);
  };

  return {
    loading: false,
    usuarioEmail,
    usuarioRf,
    alertaVisivel,
    fecharAlerta: () => setAlertaVisivel(false),
    handleBackToLogin,
  };
};
