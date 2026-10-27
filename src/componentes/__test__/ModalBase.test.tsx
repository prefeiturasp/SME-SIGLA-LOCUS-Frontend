import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ModalBase,
  ROTULO_FECHAR_MODAL,
  type ModalBaseProps,
} from "../ModalBase";
import { ComProvedores } from "@/testes/renderizarComTema";

function renderizarModal(props: Partial<ModalBaseProps> = {}) {
  const aoConfirmar = jest.fn();
  const aoCancelar = jest.fn();

  render(
    <ComProvedores>
      <ModalBase
        aberto
        titulo="Excluir Unidade Educacional"
        mensagem="A ação não poderá ser desfeita e as informações serão deletadas. Tem certeza que deseja continuar?"
        textoConfirmar="Excluir UE"
        perigo
        aoConfirmar={aoConfirmar}
        aoCancelar={aoCancelar}
        {...props}
      />
    </ComProvedores>,
  );
  return { aoConfirmar, aoCancelar };
}

function botaoFechar(): HTMLElement {
  return screen.getByRole("button", { name: ROTULO_FECHAR_MODAL });
}

function pressionarEsc() {
  fireEvent.keyDown(screen.getByRole("dialog"), {
    key: "Escape",
    keyCode: 27,
  });
}

describe("ModalBase", () => {
  it("nao renderiza quando fechado", () => {
    renderizarModal({ aberto: false });
    expect(
      screen.queryByText("Excluir Unidade Educacional"),
    ).not.toBeInTheDocument();
  });

  it("renderiza titulo e mensagem quando aberto", () => {
    renderizarModal();

    expect(screen.getByText("Excluir Unidade Educacional")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A ação não poderá ser desfeita e as informações serão deletadas. Tem certeza que deseja continuar?",
      ),
    ).toBeInTheDocument();
  });

  it("dispara os callbacks de confirmar e cancelar", async () => {
    const { aoConfirmar, aoCancelar } = renderizarModal();

    await userEvent.click(screen.getByRole("button", { name: "Excluir UE" }));
    expect(aoConfirmar).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(aoCancelar).toHaveBeenCalledTimes(1);
  });

  it("exibe o botao de confirmacao carregando", () => {
    renderizarModal({ confirmando: true });

    expect(
      screen.getByRole("button", { name: /Excluir UE/ }),
    ).toHaveClass("ant-btn-loading");
  });

  it("mantem o botao de confirmacao sem destaque por padrao", () => {
    renderizarModal();

    expect(screen.getByRole("button", { name: "Excluir UE" })).not.toHaveClass(
      "ant-btn-primary",
    );
  });

  it("destaca o botao de confirmacao quando primario", () => {
    renderizarModal({ confirmarPrimario: true });

    expect(screen.getByRole("button", { name: "Excluir UE" })).toHaveClass(
      "ant-btn-primary",
    );
  });

  it("fecha pelo X e pelo Esc com aoCancelar", async () => {
    const { aoCancelar } = renderizarModal();

    await userEvent.click(botaoFechar());
    pressionarEsc();

    expect(aoCancelar).toHaveBeenCalledTimes(2);
  });

  it("troca o cancelar pela acao secundaria e mantem o X fechando", async () => {
    const aoAcaoSecundaria = jest.fn();
    const { aoCancelar } = renderizarModal({
      textoAcaoSecundaria: "Pesquisar por RF",
      aoAcaoSecundaria,
    });

    expect(
      screen.queryByRole("button", { name: "Cancelar" }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Pesquisar por RF" }),
    );
    expect(aoAcaoSecundaria).toHaveBeenCalledTimes(1);
    expect(aoCancelar).not.toHaveBeenCalled();

    await userEvent.click(botaoFechar());
    expect(aoCancelar).toHaveBeenCalledTimes(1);
  });

  it("bloqueia o fechamento enquanto confirma", () => {
    const { aoCancelar } = renderizarModal({ confirmando: true });

    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(botaoFechar()).toBeDisabled();

    pressionarEsc();

    expect(aoCancelar).not.toHaveBeenCalled();
  });

  it("bloqueia as demais acoes enquanto a acao extra executa", () => {
    renderizarModal({
      textoAcaoExtra: "Salvar",
      aoAcaoExtra: jest.fn(),
      confirmandoAcaoExtra: true,
    });

    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Excluir UE" })).toBeDisabled();
    expect(botaoFechar()).toBeDisabled();
  });
});
