import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChipNumeroClicavel } from "../ChipNumeroClicavel";
import { renderizarComTema } from "@/testes/renderizarComTema";

describe("ChipNumeroClicavel", () => {
  it("renderiza botao com zero a esquerda quando o valor e maior que zero", async () => {
    const aoClicar = jest.fn();
    renderizarComTema(
      <ChipNumeroClicavel
        valor={5}
        rotuloAcessivel="Ver lotação de Arte"
        aoClicar={aoClicar}
      />,
    );

    const botao = screen.getByRole("button", { name: "Ver lotação de Arte" });
    expect(botao).toHaveTextContent("05");

    await userEvent.click(botao);
    expect(aoClicar).toHaveBeenCalledTimes(1);
  });

  it("nao e clicavel quando o valor e zero", () => {
    renderizarComTema(
      <ChipNumeroClicavel
        valor={0}
        rotuloAcessivel="Ver lotação de Arte"
        aoClicar={jest.fn()}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("nao e clicavel quando nao recebe callback", () => {
    renderizarComTema(
      <ChipNumeroClicavel valor={7} rotuloAcessivel="Ver lotação de Arte" />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
