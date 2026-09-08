import { screen } from "@testing-library/react";
import { CampoRotulado } from "../CampoRotulado";
import { renderizarComTema } from "@/testes/renderizarComTema";

describe("CampoRotulado", () => {
  it("associa o rotulo ao controle pelo id", () => {
    renderizarComTema(
      <CampoRotulado id="componente" rotulo="Componente curricular">
        <input id="componente" />
      </CampoRotulado>,
    );

    expect(screen.getByLabelText("Componente curricular")).toBeInTheDocument();
  });
});
