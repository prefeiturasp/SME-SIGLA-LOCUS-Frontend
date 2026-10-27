import { Button } from "antd";
import type { ReactNode } from "react";
import { ModalPadrao } from "@/estilos";

export const ROTULO_FECHAR_MODAL = "Fechar modal";

export interface ModalBaseProps {
  aberto: boolean;
  titulo: string;
  mensagem: ReactNode;
  textoConfirmar: string;
  textoCancelar?: string;
  perigo?: boolean;
  confirmarPrimario?: boolean;
  iconeConfirmar?: ReactNode;
  confirmando?: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
  textoAcaoSecundaria?: string;
  aoAcaoSecundaria?: () => void;
  textoAcaoExtra?: string;
  aoAcaoExtra?: () => void;
  confirmandoAcaoExtra?: boolean;
}

/** Modal base de confirmacao padrao do Locus. */
export function ModalBase({
  aberto,
  titulo,
  mensagem,
  textoConfirmar,
  textoCancelar = "Cancelar",
  perigo = false,
  confirmarPrimario = false,
  iconeConfirmar,
  confirmando = false,
  aoConfirmar,
  aoCancelar,
  textoAcaoSecundaria,
  aoAcaoSecundaria,
  textoAcaoExtra,
  aoAcaoExtra,
  confirmandoAcaoExtra = false,
}: ModalBaseProps) {
  const ocupado = confirmando || confirmandoAcaoExtra;
  const possuiAcaoSecundaria = Boolean(textoAcaoSecundaria && aoAcaoSecundaria);

  const botoes = [
    <Button
      key="secundario"
      type="default"
      disabled={ocupado}
      onClick={possuiAcaoSecundaria ? aoAcaoSecundaria : aoCancelar}
    >
      {possuiAcaoSecundaria ? textoAcaoSecundaria : textoCancelar}
    </Button>,
    <Button
      key="confirmar"
      type={confirmarPrimario ? "primary" : "default"}
      danger={perigo}
      loading={confirmando}
      disabled={confirmandoAcaoExtra}
      icon={iconeConfirmar}
      onClick={aoConfirmar}
    >
      {textoConfirmar}
    </Button>,
  ];

  if (textoAcaoExtra && aoAcaoExtra) {
    botoes.push(
      <Button
        key="acao-extra"
        type="primary"
        loading={confirmandoAcaoExtra}
        disabled={confirmando}
        onClick={aoAcaoExtra}
      >
        {textoAcaoExtra}
      </Button>,
    );
  }

  return (
    <ModalPadrao
      open={aberto}
      title={titulo}
      onCancel={aoCancelar}
      closable={{ "aria-label": ROTULO_FECHAR_MODAL, disabled: ocupado }}
      maskClosable={!ocupado}
      keyboard={!ocupado}
      destroyOnHidden
      footer={botoes}
    >
      {mensagem}
    </ModalPadrao>
  );
}

export default ModalBase;
