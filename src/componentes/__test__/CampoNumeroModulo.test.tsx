import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CampoNumeroModulo } from "../CampoNumeroModulo";
import { ComProvedores } from "@/testes/renderizarComTema";

describe("CampoNumeroModulo", () => {
  it("exibe o valor com zero a esquerda", () => {
    render(
      <ComProvedores>
        <CampoNumeroModulo
          valor={3}
          rotuloAcessivel="Módulo de Arte"
          aoAlterar={jest.fn()}
        />
      </ComProvedores>,
    );

    expect(screen.getByLabelText("Módulo de Arte")).toHaveValue("03");
  });

  it("emite numero ao digitar", async () => {
    const aoAlterar = jest.fn();
    render(
      <ComProvedores>
        <CampoNumeroModulo
          valor={3}
          rotuloAcessivel="Módulo de Arte"
          aoAlterar={aoAlterar}
        />
      </ComProvedores>,
    );

    const campo = screen.getByLabelText("Módulo de Arte");
    await userEvent.clear(campo);
    await userEvent.type(campo, "7");

    expect(aoAlterar).toHaveBeenCalled();
    aoAlterar.mock.calls.forEach(([valor]) => {
      expect(typeof valor).toBe("number");
    });
    expect(aoAlterar).toHaveBeenLastCalledWith(7);
  });

  it("nunca propaga null ao limpar o campo", async () => {
    const aoAlterar = jest.fn();
    render(
      <ComProvedores>
        <CampoNumeroModulo
          valor={3}
          rotuloAcessivel="Módulo de Arte"
          minimo={0}
          aoAlterar={aoAlterar}
        />
      </ComProvedores>,
    );

    await userEvent.clear(screen.getByLabelText("Módulo de Arte"));

    expect(aoAlterar).toHaveBeenCalled();
    aoAlterar.mock.calls.forEach(([valor]) => {
      expect(valor).not.toBeNull();
      expect(typeof valor).toBe("number");
    });
  });

  it("desabilita o campo no modo somente leitura", () => {
    render(
      <ComProvedores>
        <CampoNumeroModulo
          valor={3}
          rotuloAcessivel="Módulo de Arte"
          desabilitado
          aoAlterar={jest.fn()}
        />
      </ComProvedores>,
    );

    expect(screen.getByLabelText("Módulo de Arte")).toBeDisabled();
  });
});
