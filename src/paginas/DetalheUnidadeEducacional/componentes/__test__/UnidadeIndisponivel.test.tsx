import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComTema } from "@/testes/renderizarComTema";
import { UnidadeIndisponivel } from "../UnidadeIndisponivel";

describe("UnidadeIndisponivel", () => {
  function renderizar(aoAtualizar?: jest.Mock) {
    render(
      <ComTema>
        <UnidadeIndisponivel aoAtualizar={aoAtualizar} />
      </ComTema>,
    );
  }

  it("mostra o titulo de informacao indisponivel", () => {
    renderizar();

    expect(
      screen.getByText("Esta informação não está mais disponível!"),
    ).toBeInTheDocument();
  });

  it("explica que a UE nao existe mais e orienta a atualizar", () => {
    renderizar();

    expect(
      screen.getByText(/não existe ou foi excluída por outro usuário/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Atualize a página para exibir as informações mais recentes/),
    ).toBeInTheDocument();
  });

  it("oferece o botao de atualizar a pagina", () => {
    renderizar();

    expect(
      screen.getByRole("button", { name: /Atualizar página/ }),
    ).toBeInTheDocument();
  });

  it("aciona aoAtualizar no clique do botao", async () => {
    const aoAtualizar = jest.fn();
    const usuario = userEvent.setup();
    renderizar(aoAtualizar);

    await usuario.click(
      screen.getByRole("button", { name: /Atualizar página/ }),
    );

    expect(aoAtualizar).toHaveBeenCalledTimes(1);
  });
});
