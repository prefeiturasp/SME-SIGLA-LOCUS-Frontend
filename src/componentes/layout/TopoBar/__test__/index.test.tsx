import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { TopoBar } from "../index";

function renderComRota(rota: string) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <TopoBar />
    </MemoryRouter>,
  );
}

describe("TopoBar", () => {
  it("mostra a logo da Prefeitura e o breadcrumb da rota de cadastro", () => {
    renderComRota("/cadastro/gestao-unidades-educacionais");

    expect(
      screen.getByRole("img", { name: /prefeitura de são paulo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Cadastro")).toBeInTheDocument();
  });

  it("exibe o RF e o nome do usuario logado", () => {
    renderComRota("/cadastro/gestao-unidades-educacionais");

    expect(screen.getByText(/RF:\s*1234567/i)).toBeInTheDocument();
    expect(
      screen.getByText("Marcus Paulo de Souza Andrade"),
    ).toBeInTheDocument();
  });

  it("chama o handler de sair ao clicar no botao Sair", async () => {
    const aoSair = jest.fn();
    render(
      <MemoryRouter initialEntries={["/cadastro/gestao-unidades-educacionais"]}>
        <TopoBar aoSair={aoSair} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole("button", { name: /sair/i }));

    expect(aoSair).toHaveBeenCalledTimes(1);
  });
});
