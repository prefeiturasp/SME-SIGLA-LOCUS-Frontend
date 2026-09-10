import { Button, Modal } from "antd";
import type { ReactNode } from "react";
import { spacing } from "@/estilos/tokens/tokens";

const LARGURA = 530;
const ALTURA = 198;

export interface ModalConfirmacaoProps {
  aberto: boolean;
  titulo: string;
  mensagem: ReactNode;
  textoConfirmar: string;
  textoCancelar?: string;
  /** Exibe o botao de confirmacao com borda vermelha e fundo branco. */
  perigo?: boolean;
  iconeConfirmar?: ReactNode;
  confirmando?: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
  /** Botao extra opcional a direita (ex.: Salvar). */
  textoAcaoExtra?: string;
  aoAcaoExtra?: () => void;
  confirmandoAcaoExtra?: boolean;
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
  textoAcaoExtra,
  aoAcaoExtra,
  confirmandoAcaoExtra = false,
}: ModalConfirmacaoProps) {
  const botoes = [
    <Button key="cancelar" type="default" onClick={aoCancelar}>
      {textoCancelar}
    </Button>,
        <Button
          key="confirmar"
          type="default"
          danger={perigo}
          loading={confirmando}
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
        onClick={aoAcaoExtra}
      >
        {textoAcaoExtra}
      </Button>,
    );
  }

  return (
    <Modal
      open={aberto}
      title={titulo}
      onCancel={aoCancelar}
      destroyOnHidden
      width={LARGURA}
      styles={{
        content: {
          height: ALTURA,
          display: "flex",
          flexDirection: "column",
        },
        header: {
          paddingTop: 4,
          paddingBottom: spacing.md,
          paddingInline: 0,
        },
        body: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingTop: 0,
          paddingBottom: 5,
          paddingInline: 0,
        },
        footer: {
          marginTop: "auto",
          paddingTop: 20,
          paddingInline: 8,
        },
      }}
      footer={botoes}
    >
      {mensagem}
    </Modal>
  );
}

export default ModalConfirmacao;
