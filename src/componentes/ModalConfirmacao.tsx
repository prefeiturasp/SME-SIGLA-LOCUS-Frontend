import { Button, Modal } from "antd";
import type { ReactNode } from "react";

export interface ModalConfirmacaoProps {
  aberto: boolean;
  titulo: string;
  mensagem: ReactNode;
  textoConfirmar: string;
  textoCancelar?: string;
  /** Exibe o botao de confirmacao em vermelho (acao destrutiva). */
  perigo?: boolean;
  iconeConfirmar?: ReactNode;
  confirmando?: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

/** Modal de confirmacao padrao do Locus. */
export function ModalConfirmacao({
  aberto,
  titulo,
  mensagem,
  textoConfirmar,
  textoCancelar = "Cancelar",
  perigo = false,
  iconeConfirmar,
  confirmando = false,
  aoConfirmar,
  aoCancelar,
}: ModalConfirmacaoProps) {
  return (
    <Modal
      open={aberto}
      title={titulo}
      onCancel={aoCancelar}
      destroyOnHidden
      footer={[
        <Button key="cancelar" type="default" onClick={aoCancelar}>
          {textoCancelar}
        </Button>,
        <Button
          key="confirmar"
          type="primary"
          danger={perigo}
          loading={confirmando}
          icon={iconeConfirmar}
          onClick={aoConfirmar}
        >
          {textoConfirmar}
        </Button>,
      ]}
    >
      {mensagem}
    </Modal>
  );
}

export default ModalConfirmacao;
