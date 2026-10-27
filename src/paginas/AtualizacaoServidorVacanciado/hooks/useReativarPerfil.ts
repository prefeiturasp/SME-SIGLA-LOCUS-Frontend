import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificacao } from "@/hooks/useNotificacao";
import { CAMINHOS, type EstadoNavegacaoVacancia } from "@/rotas/caminhos";
import { API } from "@/servicos";

export interface EstadoReativarPerfil {
  modalAberto: boolean;
  reativando: boolean;
  abrirModal: () => void;
  fecharModal: () => void;
  confirmarReativacao: () => Promise<void>;
}

export function useReativarPerfil(rf: string): EstadoReativarPerfil {
  const navigate = useNavigate();
  const notificacao = useNotificacao();
  const [modalAberto, setModalAberto] = useState(false);
  const [reativando, setReativando] = useState(false);

  const abrirModal = useCallback(() => setModalAberto(true), []);

  const fecharModal = useCallback(() => {
    if (!reativando) setModalAberto(false);
  }, [reativando]);

  const confirmarReativacao = useCallback(async () => {
    setReativando(true);
    try {
      await API.Servidores.reativarServidor(rf).response;

      setModalAberto(false);
      const estado: EstadoNavegacaoVacancia = { rfReativado: rf };
      navigate(CAMINHOS.cadastroAtualizacaoVacancia, {
        replace: true,
        state: estado,
      });
    } catch {
      notificacao.erro({
        titulo: "Erro",
        texto: "Não conseguimos reativar o perfil. Por favor, tente novamente!",
      });
    } finally {
      setReativando(false);
    }
  }, [rf, navigate, notificacao]);

  return useMemo(
    () => ({
      modalAberto,
      reativando,
      abrirModal,
      fecharModal,
      confirmarReativacao,
    }),
    [modalAberto, reativando, abrirModal, fecharModal, confirmarReativacao],
  );
}

export default useReativarPerfil;
