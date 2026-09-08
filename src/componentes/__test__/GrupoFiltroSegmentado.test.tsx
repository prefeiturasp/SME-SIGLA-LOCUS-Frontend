import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GrupoFiltroSegmentado } from "../GrupoFiltroSegmentado";
import { ComProvedores } from "@/testes/renderizarComTema";

const opcoes = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "comVagas", rotulo: "Com vagas" },
  { valor: "comExcedente", rotulo: "Com excedente" },
  { valor: "comAfastados", rotulo: "Com afastados" },
];

describe("GrupoFiltroSegmentado", () => {
  it("renderiza todas as opcoes e marca a selecionada", () => {
    render(
      <ComProvedores>
        <GrupoFiltroSegmentado
          opcoes={opcoes}
          valor="todos"
          aoSelecionar={jest.fn()}
        />
      </ComProvedores>,
    );

    opcoes.forEach(({ rotulo }) => {
      expect(screen.getByText(rotulo)).toBeInTheDocument();
    });

    expect(screen.getByRole("radio", { name: "Todos" })).toBeChecked();
  });

  it("dispara aoSelecionar com o valor da opcao clicada", async () => {
    const aoSelecionar = jest.fn();
    render(
      <ComProvedores>
        <GrupoFiltroSegmentado
          opcoes={opcoes}
          valor="todos"
          aoSelecionar={aoSelecionar}
        />
      </ComProvedores>,
    );

    await userEvent.click(screen.getByText("Com vagas"));

    expect(aoSelecionar).toHaveBeenCalledWith("comVagas");
  });
});
