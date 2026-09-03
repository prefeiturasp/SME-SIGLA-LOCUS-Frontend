import { useCallback, useMemo } from "react";
import { App } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

/** Placement padrao do toast Locus (topo da tela). */
const PLACEMENT_PADRAO: NotificationPlacement = "top";

export interface OpcoesNotificacao {
  titulo: string;
  texto: string;
  placement?: NotificationPlacement;
}

/**
 * Toast / notificacao padrao do Locus.
 * Preferir este hook (ou `useToast` reexportado em `@/estilos`) em todas as paginas.
 */
export function useNotificacao() {
  const { notification } = App.useApp();

  const sucesso = useCallback(
    ({ titulo, texto, placement = PLACEMENT_PADRAO }: OpcoesNotificacao) => {
      notification.success({
        message: titulo,
        description: texto,
        placement,
      });
    },
    [notification],
  );

  const erro = useCallback(
    ({ titulo, texto, placement = PLACEMENT_PADRAO }: OpcoesNotificacao) => {
      notification.error({
        message: titulo,
        description: texto,
        placement,
      });
    },
    [notification],
  );

  const info = useCallback(
    ({ titulo, texto, placement = PLACEMENT_PADRAO }: OpcoesNotificacao) => {
      notification.info({
        message: titulo,
        description: texto,
        placement,
      });
    },
    [notification],
  );

  const aviso = useCallback(
    ({ titulo, texto, placement = PLACEMENT_PADRAO }: OpcoesNotificacao) => {
      notification.warning({
        message: titulo,
        description: texto,
        placement,
      });
    },
    [notification],
  );

  return useMemo(
    () => ({
      sucesso,
      erro,
      info,
      aviso,
    }),
    [sucesso, erro, info, aviso],
  );
}

export default useNotificacao;
